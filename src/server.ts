import { routeAgentRequest, type Schedule } from "agents";
import { AIChatAgent } from "@cloudflare/ai-chat";
import {
  generateId,
  generateText,
  streamText,
  type StreamTextOnFinishCallback,
  createUIMessageStream,
  convertToModelMessages,
  createUIMessageStreamResponse,
  type ToolSet
} from "ai";
import { createWorkersAI } from "workers-ai-provider";
import { processToolCalls, cleanupMessages } from "./utils";
import { tools, executions } from "./tools";
import {
  type LinuxUserState,
  createDefaultState,
  mergeState,
  formatStateForAI,
  type ExperienceLevel,
  type PartialLinuxUserState
} from "./types";

// ============================================
// Llama 3.3 Model Configuration
// ============================================

const LLAMA_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

// ============================================
// System Prompt Builder
// ============================================

function buildSystemPrompt(state: LinuxUserState): string {
  const experienceInstructions = getExperienceInstructions(state.experienceLevel);
  const userContext = formatStateForAI(state);
  
  return `You are Tux, a Linux setup assistant. Help users configure and troubleshoot their Linux systems.

${experienceInstructions}

## User Profile
${userContext}

## CRITICAL: Response Length Rules
- Keep responses SHORT and CONCISE (max 150-200 words)
- For complex tasks, break into numbered steps and handle ONE STEP at a time
- After completing a step, ask: "Ready for the next step?" or "Should I continue?"
- Never dump a wall of text - users will lose important information
- Use bullet points and code blocks for clarity
- If a command is long, show ONLY the command without lengthy explanations

## Guidelines
- Use the user's package manager (dnf for Fedora, pacman for Arch, apt for Debian/Ubuntu)
- Respect their desktop environment
- Warn before destructive operations with ⚠️
- When user mentions distro/DE/hardware, acknowledge the update

## Commands
- /reset - Clear profile
- /level beginner|intermediate|advanced - Set experience
- /profile - Show profile
`;
}

function getExperienceInstructions(level: ExperienceLevel): string {
  switch (level) {
    case 'beginner':
      return `## Style: Beginner
Explain commands step-by-step. Warn about risks with ⚠️. Show how to undo.`;
    
    case 'intermediate':
      return `## Style: Intermediate
Clear commands with brief explanations. Mention caveats.`;
    
    case 'advanced':
      return `## Style: Advanced
Concise responses. Commands first, minimal explanation.`;
  }
}

// ============================================
// LLM-Based State Extraction
// ============================================

const STATE_EXTRACTION_PROMPT = `Extract Linux system information from the user's message. Return ONLY a valid JSON object with any detected fields. If nothing is detected, return {}.

Fields to extract (only include if mentioned):
- distro: Linux distribution name (e.g., "fedora", "arch", "ubuntu", "debian", "nixos", "gentoo")
- distroVersion: Version number if mentioned
- packageManager: Infer from distro (dnf=fedora, pacman=arch, apt=debian/ubuntu, zypper=opensuse, emerge=gentoo, nix=nixos)
- desktop: Desktop environment OR window manager OR compositor (e.g., "gnome", "kde", "hyprland", "sway", "niri", "i3", "bspwm")
- shell: Shell being used (bash, zsh, fish, nushell)
- bootType: "single", "dual-windows", "dual-macos", "wsl1", "wsl2", "vm-virtualbox", "vm-vmware", "vm-kvm"
- experienceLevel: "beginner", "intermediate", or "advanced"
- gpuVendor: "nvidia", "amd", or "intel"
- formFactor: "desktop", "laptop", or "server"

Examples:
User: "I'm using Fedora 41 with Hyprland"
Output: {"distro":"fedora","distroVersion":"41","packageManager":"dnf","desktop":"hyprland"}

User: "running arch on my thinkpad with nvidia"
Output: {"distro":"arch","packageManager":"pacman","formFactor":"laptop","gpuVendor":"nvidia"}

User: "I use niri on NixOS"
Output: {"distro":"nixos","packageManager":"nix","desktop":"niri"}

User: "how do I install docker?"
Output: {}

Now extract from this message:`;

/**
 * Use LLM to extract state from user message
 */
async function extractStateWithLLM(
  userText: string,
  model: ReturnType<ReturnType<typeof createWorkersAI>>
): Promise<PartialLinuxUserState> {
  try {
    const result = await generateText({
      model,
      prompt: `${STATE_EXTRACTION_PROMPT}\nUser: "${userText}"\nOutput:`
    });

    const text = result.text.trim();
    
    // Try to extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return {};

    const parsed = JSON.parse(jsonMatch[0]);
    
    // Build the partial state from extracted fields
    const updates: PartialLinuxUserState = {};
    
    if (parsed.distro) updates.distro = parsed.distro.toLowerCase();
    if (parsed.distroVersion) updates.distroVersion = parsed.distroVersion;
    if (parsed.packageManager) updates.packageManager = parsed.packageManager.toLowerCase();
    if (parsed.desktop) updates.desktop = parsed.desktop.toLowerCase();
    if (parsed.shell) updates.shell = parsed.shell.toLowerCase();
    if (parsed.bootType) updates.bootType = parsed.bootType;
    if (parsed.experienceLevel) updates.experienceLevel = parsed.experienceLevel;
    
    // Hardware fields
    if (parsed.gpuVendor || parsed.formFactor) {
      updates.hardware = {} as any;
      if (parsed.gpuVendor) (updates.hardware as any).gpuVendor = parsed.gpuVendor.toLowerCase();
      if (parsed.formFactor) (updates.hardware as any).formFactor = parsed.formFactor.toLowerCase();
    }
    
    return updates;
  } catch (error) {
    console.error('State extraction failed:', error);
    return {};
  }
}

// ============================================
// Chat Agent Implementation
// ============================================

export class Chat extends AIChatAgent<Env> {
  // Persistent state for user's Linux profile
  #userState: LinuxUserState | null = null;

  /**
   * Get or initialize user state from Durable Object storage
   */
  async getUserState(): Promise<LinuxUserState> {
    if (this.#userState) return this.#userState;
    
    const stored = await this.ctx.storage.get<LinuxUserState>('userState');
    this.#userState = stored || createDefaultState();
    return this.#userState;
  }

  /**
   * Update and persist user state
   */
  async updateUserState(updates: PartialLinuxUserState): Promise<LinuxUserState> {
    const current = await this.getUserState();
    this.#userState = mergeState(current, updates);
    await this.ctx.storage.put('userState', this.#userState);
    return this.#userState;
  }

  /**
   * Reset user state to defaults
   */
  async resetUserState(): Promise<void> {
    this.#userState = createDefaultState();
    await this.ctx.storage.put('userState', this.#userState);
    // Don't clear messages here - let the UI handle clearing history
    // The user can click the trash icon to clear chat
  }

  /**
   * Handle slash commands
   */
  async handleCommand(text: string): Promise<string | null> {
    const trimmed = text.trim().toLowerCase();
    console.log('Checking command:', JSON.stringify(trimmed));
    
    if (trimmed === '/reset') {
      console.log('Executing /reset command');
      await this.resetUserState();
      return "🔄 Profile reset! Your conversation history has been cleared.\n\nTell me about your Linux setup (distro, desktop, hardware) or use the buttons to set your profile.";
    }
    
    if (trimmed === '/profile') {
      const state = await this.getUserState();
      return `📋 **Your Current Profile:**\n\n${formatStateForAI(state)}`;
    }
    
    const levelMatch = trimmed.match(/^\/level\s+(beginner|intermediate|advanced)$/);
    if (levelMatch) {
      const level = levelMatch[1] as ExperienceLevel;
      await this.updateUserState({ experienceLevel: level });
      return `✅ Experience level set to **${level}**. I'll adjust my explanations accordingly.`;
    }
    
    return null;
  }

  /**
   * Handles incoming chat messages and manages the response stream
   */
  async onChatMessage(
    onFinish: StreamTextOnFinishCallback<ToolSet>,
    _options?: { abortSignal?: AbortSignal }
  ) {
    // Get the last user message
    const lastMessage = this.messages[this.messages.length - 1];
    const userText = lastMessage?.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map(p => p.text)
      .join(' ') || '';

    // Check for slash commands
    const commandResponse = await this.handleCommand(userText);

    // If it's a command, return the response directly without LLM
    if (commandResponse) {
      console.log('Command detected, sending direct response');
      const messageId = generateId();
      const stream = createUIMessageStream({
        execute: async ({ writer }) => {
          // Start a text block
          writer.write({ type: 'text-start', id: messageId });
          // Write the command response as a text delta
          writer.write({
            type: 'text-delta',
            id: messageId,
            delta: commandResponse
          });
          // End the text block
          writer.write({ type: 'text-end', id: messageId });
        }
      });
      return createUIMessageStreamResponse({ stream });
    }

    // Create Workers AI model (needed for both extraction and response)
    const workersai = createWorkersAI({ binding: this.env.AI });
    // @ts-expect-error - Llama 3.3 model is valid but not in type definitions
    const model = workersai(LLAMA_MODEL);

    // Use LLM to extract state from user message
    const stateUpdates = await extractStateWithLLM(userText, model);
    if (Object.keys(stateUpdates).length > 0) {
      console.log('LLM extracted state:', stateUpdates);
      await this.updateUserState(stateUpdates);
    }

    // Get current user state for system prompt
    const userState = await this.getUserState();

    // Build system prompt based on user's profile
    const effectiveSystemPrompt = buildSystemPrompt(userState);

    // Check if user is asking to schedule something
    const wantsSchedule = /\b(remind|schedule|later|in \d+ (minutes?|hours?|days?))\b/i.test(userText);

    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        // Clean up incomplete tool calls to prevent API errors
        const cleanedMessages = cleanupMessages(this.messages);

        // Process any pending tool calls from previous messages
        const processedMessages = await processToolCalls({
          messages: cleanedMessages,
          dataStream: writer,
          tools: wantsSchedule ? tools : {},
          executions
        });

        const result = streamText({
          system: effectiveSystemPrompt,
          messages: await convertToModelMessages(processedMessages),
          model,
          // Only provide tools if user wants to schedule something
          ...(wantsSchedule ? { tools } : {}),
          // @ts-expect-error - Type mismatch with conditional tools
          onFinish,
          maxSteps: 5,
          // Safety limit - model is instructed to keep responses short
          maxTokens: 2048
        });

        writer.merge(result.toUIMessageStream());
      }
    });

    return createUIMessageStreamResponse({ stream });
  }

  /**
   * Execute a scheduled task
   */
  async executeTask(description: string, _task: Schedule<string>) {
    await this.saveMessages([
      ...this.messages,
      {
        id: generateId(),
        role: "user",
        parts: [
          {
            type: "text",
            text: `Running scheduled task: ${description}`
          }
        ],
        metadata: {
          createdAt: new Date()
        }
      }
    ]);
  }
}

// ============================================
// Worker Entry Point
// ============================================

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext) {
    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === "/health") {
      return Response.json({ status: "ok", model: LLAMA_MODEL });
    }

    // API endpoint to get/update user state
    if (url.pathname === "/api/state" && request.method === "GET") {
      // This would need to be routed through the agent
      return Response.json({ message: "Use the chat agent to manage state" });
    }

    return (
      // Route the request to our agent or return 404 if not found
      (await routeAgentRequest(request, env)) ||
      new Response("Not found", { status: 404 })
    );
  }
} satisfies ExportedHandler<Env>;
