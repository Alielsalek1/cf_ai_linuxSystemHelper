# Prompt 1 (Plan)
I have this explanation: 
Cloudflare is a platform that hosts websites, APIs, and now AI apps globally for free (with paid upgrades). For this intern assignment, they want you to build a tiny chat app powered by AI that runs on their platform and remembers conversations.

What the assignment requires (broken down)
You need four pieces in one small app:

LLM = "Large Language Model" (ChatGPT‑like AI). Use their free Llama 3.3 model.

Workflow = backend code that takes your message, adds chat history, calls the AI, and sends reply.

User input = a web page with a chat box.

Memory = save past messages so the AI "remembers" the conversation.

Submit a GitHub repo with that app + a README explaining it.

Core Cloudflare products (only these matter)
Workers = serverless functions (like AWS Lambda, but global). Runs your backend code.

Pages = free static site hosting (your chat UI).

Durable Objects = Workers + memory (state per user).

Workers AI = their free LLMs (Llama 3.3).

"Agents SDK" is optional; it's a helper library to make Durable Objects + AI easier.

and I want to complete a Task with this description: 
Optional Assignment: See instructions below for Cloudflare AI app assignment. SUBMIT GitHub repo URL for the AI project here. (Please do not submit irrelevant repositories.)
Optional Assignment Instructions: We plan to fast track review of candidates who complete an assignment to build a type of AI-powered application on Cloudflare. An AI-powered application should include the following components:
LLM (recommend using Llama 3.3 on Workers AI), or an external LLM of your choice
Workflow / coordination (recommend using Workflows, Workers or Durable Objects)
User input via chat or voice (recommend using Pages or Realtime)
Memory or state
Find additional documentation here.
 
IMPORTANT NOTE:
To be considered, your repository name must be prefixed with cf_ai_, must include a README.md file with project documentation and clear running instructions to try out components (either locally or via deployed link). AI-assisted coding is encouraged, but you must include AI prompts used in PROMPTS.md
 
All work must be original; copying from other submissions is strictly prohibited.

# Prompt 2 (Plan)
Ok, Now you can start implementing step by step and wait for my review after each step. Additionally, after finishing each step tell me in detail what you used and why for me to confirm this step so we can move on to the next one.

For the context of the project. we are making a linux setup and management helper. it should maintain state for chats such as if the user is dual booting or single and also maintain the user's distro and the user's package manager and other relevant things. 

update your plan now so it fits the project instructions

# Prompt 3 (Plan)
State extraction: Use hybrid—AI auto‑detects (more natural) + explicit buttons (reliable). Auto‑detection via a quick LLM call on new messages ("Extract distro/version from: {message}"), then confirm/update state. Buttons for "Set Distro" prevent errors.
​

System prompt tuning: Dynamic based on stored experienceLevel ("beginner"/"intermediate"/"advanced"). Inject into system prompt: {experienceLevel === 'beginner' ? 'Explain simply, step-by-step with warnings' : 'Concise commands only'}. Start neutral, let user set via /level beginner.
​

State reset: Yes, essential. Add /reset or "clear profile" button → this.history = []; this.userDistro = 'unknown';. Respond "Profile reset. Say 'I use Fedora' or use buttons." Good for multi‑user/privacy.

# Prompt 4 (Agent)
ok, start implementing step by step and test this step by step and always await my review on the code.

# Prompt 5 (Agent)
now I have successfully logged in cloudflare with wrangler, we can proceed to step 2. but before we proceed to step 2 I want you to push the changes to github with a meaningful commit message as to maintain a version for step 1 before preceeding with step 2.

# Prompt 6 (Agent)
before proceeding to step 3 make the interface more detailed. you have too few of values and this is a significant limitation.
e.g. make DistroBase (grouped families → maps to pkg mgrs)
and add desktop environments. Add more of these we want to be clear and with as much context and helpfulness as possible as this is too narrow for the linux diversity.

# Prompt 7 (Agent)
good. commit and push what you made to github and proceed to step 3