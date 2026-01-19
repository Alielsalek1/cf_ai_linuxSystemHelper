# cf_ai_linuxSystemHelper 🐧

An AI-powered Linux setup and management assistant built on Cloudflare's edge infrastructure.

## ✅ Project Requirements Checklist

| Requirement | Implementation | Status |
|-------------|---------------|--------|
| **LLM** | Llama 3.3 70B on Workers AI (`@cf/meta/llama-3.3-70b-instruct-fp8-fast`) | ✅ |
| **Workflow / Coordination** | Durable Objects with SQLite-backed state persistence | ✅ |
| **User Input** | Real-time chat interface (React + Vite on Pages) | ✅ |
| **Memory / State** | Persistent user profile stored in Durable Object storage | ✅ |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Vite + React)                  │
│  - Chat UI with real-time streaming                             │
│  - Dark/Light theme                                             │
│  - Slash commands (/reset, /profile, /level)                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Cloudflare Workers                          │
│  - Routes requests to Durable Objects                           │
│  - Handles WebSocket connections                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Durable Objects (Chat Agent)                   │
│  - Persistent user state (distro, DE, hardware, experience)    │
│  - Message history with SQLite                                  │
│  - LLM-based state extraction from conversations                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Workers AI (Llama 3.3)                       │
│  - State extraction from user messages                          │
│  - Context-aware Linux assistance                               │
│  - Experience-level adapted responses                           │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Features

### Intelligent State Management
- **LLM-powered detection**: Automatically extracts distro, desktop environment, package manager, hardware info from natural conversation
- **No hardcoding**: Works with ANY Linux distro, compositor, or window manager (including future ones)
- **Persistent memory**: Remembers your setup across sessions

### Adaptive Experience Levels
- **Beginner**: Step-by-step explanations with warnings
- **Intermediate**: Clear commands with brief context
- **Advanced**: Concise, command-first responses

### Smart Responses
- **Package manager awareness**: Uses `dnf` for Fedora, `pacman` for Arch, `apt` for Debian/Ubuntu, etc.
- **Desktop-specific advice**: Tailored to your DE/WM/compositor
- **Step-by-step guidance**: Complex tasks broken into manageable steps

## 🛠️ Tech Stack

- **Runtime**: Cloudflare Workers
- **AI**: Workers AI with Llama 3.3 70B
- **State**: Durable Objects with SQLite
- **Frontend**: React 19 + Vite 7 + Tailwind CSS 4
- **Streaming**: AI SDK UI message streams
- **Agent Framework**: @cloudflare/ai-chat

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/Alielsalek1/cf_ai_cloudflare.git
cd cf_ai_cloudflare

# Install dependencies
npm install

# Run locally
npm run dev

# Deploy to Cloudflare
npm run deploy
```

## 💬 Usage

### Chat Commands
- `/reset` - Clear your profile and start fresh
- `/profile` - View your current Linux profile
- `/level beginner|intermediate|advanced` - Set experience level

### Example Conversations
```
User: I'm using Fedora 41 with Hyprland on my ThinkPad
Tux: Got it! I've noted your setup:
     - Distro: Fedora 41 (dnf)
     - Desktop: Hyprland
     - Hardware: Laptop
     How can I help you today?

User: How do I install Docker?
Tux: **Step 1**: Add the Docker repository
     ```bash
     sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
     ```
     Ready for the next step?
```

## 📄 License

MIT