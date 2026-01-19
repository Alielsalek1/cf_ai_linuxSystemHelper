import { routeAgentRequest, type Schedule } from "agents";
import { AIChatAgent } from "@cloudflare/ai-chat";
import {
  generateId,
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
  inferStateFromDistro,
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

## Guidelines
- Use the user's package manager (dnf for Fedora, pacman for Arch, apt for Debian/Ubuntu)
- Respect their desktop environment
- Warn before destructive operations with ⚠️
- Keep responses focused and actionable
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
// State Extraction Patterns
// ============================================

const STATE_PATTERNS: Array<{
  pattern: RegExp;
  extract: (match: RegExpMatchArray) => PartialLinuxUserState;
}> = [
  // Distro detection
  {
    pattern: /\b(?:i(?:'m| am)?\s+(?:using|on|running)|my (?:distro|os|system) is|i use)\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)?)\s*(\d+(?:\.\d+)?)?/i,
    extract: (match) => {
      const distro = match[1].trim();
      const version = match[2] || 'unknown';
      return {
        ...inferStateFromDistro(distro),
        distroVersion: version
      };
    }
  },
  // Desktop environment
  {
    pattern: /\b(?:using|on|running|have)\s+(gnome|kde|plasma|xfce|cinnamon|mate|budgie|lxde|lxqt|i3|sway|hyprland|bspwm|awesome|openbox)/i,
    extract: (match) => ({
      desktop: match[1].toLowerCase().replace('plasma', 'kde') as any
    })
  },
  // GPU detection
  {
    pattern: /\b(?:nvidia|amd|radeon|intel|integrated)\s*(?:gpu|graphics|card)?/i,
    extract: (match) => {
      const gpu = match[0].toLowerCase();
      if (gpu.includes('nvidia')) return { hardware: { gpuVendor: 'nvidia' } as any };
      if (gpu.includes('amd') || gpu.includes('radeon')) return { hardware: { gpuVendor: 'amd' } as any };
      if (gpu.includes('intel') || gpu.includes('integrated')) return { hardware: { gpuVendor: 'intel' } as any };
      return {};
    }
  },
  // Boot type
  {
    pattern: /\b(?:dual[- ]?boot(?:ing)?|wsl2?|virtual\s*(?:machine|box)|vm|vmware|kvm)/i,
    extract: (match) => {
      const boot = match[0].toLowerCase();
      if (boot.includes('dual')) return { bootType: 'dual-windows' as const };
      if (boot.includes('wsl2')) return { bootType: 'wsl2' as const };
      if (boot.includes('wsl')) return { bootType: 'wsl1' as const };
      if (boot.includes('virtualbox')) return { bootType: 'vm-virtualbox' as const };
      if (boot.includes('vmware')) return { bootType: 'vm-vmware' as const };
      if (boot.includes('kvm')) return { bootType: 'vm-kvm' as const };
      if (boot.includes('vm') || boot.includes('virtual')) return { bootType: 'vm-virtualbox' as const };
      return {};
    }
  },
  // Shell
  {
    pattern: /\b(?:using|my shell is|i use)\s+(bash|zsh|fish|nushell)/i,
    extract: (match) => ({
      shell: match[1].toLowerCase() as any
    })
  },
  // Experience level from explicit statements
  {
    pattern: /\bi(?:'m| am)?\s+(?:a\s+)?(?:linux\s+)?(beginner|newbie|new to linux|intermediate|advanced|expert|power user)/i,
    extract: (match) => {
      const level = match[1].toLowerCase();
      if (level.includes('beginner') || level.includes('newbie') || level.includes('new')) {
        return { experienceLevel: 'beginner' as const };
      }
      if (level.includes('intermediate')) {
        return { experienceLevel: 'intermediate' as const };
      }
      return { experienceLevel: 'advanced' as const };
    }
  },
  // Laptop detection
  {
    pattern: /\b(?:laptop|notebook|thinkpad|macbook|dell xps|surface)/i,
    extract: () => ({
      hardware: { formFactor: 'laptop' } as any
    })
  }
];

function extractStateFromMessage(text: string): PartialLinuxUserState {
  let updates: PartialLinuxUserState = {};
  
  for (const { pattern, extract } of STATE_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      const extracted = extract(match);
      updates = mergePartialState(updates, extracted);
    }
  }
  
  return updates;
}

function mergePartialState(a: PartialLinuxUserState, b: PartialLinuxUserState): PartialLinuxUserState {
  return {
    ...a,
    ...b,
    hardware: {
      ...(a.hardware || {}),
      ...(b.hardware || {})
    } as any
  };
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

    // Extract state from user message
    const stateUpdates = extractStateFromMessage(userText);
    if (Object.keys(stateUpdates).length > 0) {
      await this.updateUserState(stateUpdates);
    }

    // Get current user state for system prompt
    const userState = await this.getUserState();

    // Build system prompt based on user's profile
    const effectiveSystemPrompt = buildSystemPrompt(userState);

    // Create Workers AI model
    const workersai = createWorkersAI({ binding: this.env.AI });
    // @ts-expect-error - Llama 3.3 model is valid but not in type definitions
    const model = workersai(LLAMA_MODEL);

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
          maxTokens: 1024
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
