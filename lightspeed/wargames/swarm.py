import os
import json
import asyncio
from dotenv import load_dotenv

from google.antigravity import Agent, LocalAgentConfig, types
from google.antigravity.types import TemplatedSystemInstructions

from supabase import create_client, Client

# Load environment variables (GEMINI_API_KEY)
load_dotenv(dotenv_path="../.env")

supabase_url = os.getenv("VITE_SUPABASE_URL")
supabase_key = os.getenv("VITE_SUPABASE_ANON_KEY")

if supabase_url and supabase_key:
    supabase: Client = create_client(supabase_url, supabase_key)
else:
    supabase = None

def post_chatops_message(message: str, sender: str = "Agent"):
    """Posts a message to the ChatOps channel to communicate with the human team."""
    if supabase:
        supabase.table("chatops_messages").insert({
            "sender": sender,
            "message": message,
            "channel": "general"
        }).execute()
        return "Message posted successfully."
    return "Failed to post message: Supabase not configured."

async def main():
    # 1. Read the Architecture Graph
    graph_path = os.path.join(os.path.dirname(__file__), '..', '.ua', 'knowledge-graph.json')
    try:
        with open(graph_path, 'r') as f:
            graph_data = json.load(f)
    except Exception as e:
        print(f"Error loading graph: {e}")
        return

    # 2. Configure the Orchestrator Agent
    # Enable subagents so the Orchestrator can spawn Red and Blue teams
    capabilities = types.CapabilitiesConfig(
        enable_subagents=True
    )

    # Define the Orchestrator's Persona
    orchestrator_identity = """
You are the CISO Orchestrator of an Autonomous Security Operations Center (ASOC).
Your job is to run a continuous wargame against a provided architecture graph.

You MUST use your subagent capabilities to complete this task:
1. First, spawn a subagent named 'RedTeam' with the persona of an aggressive APT (Advanced Persistent Threat) hacker. 
   Feed it the architecture graph and ask it to find 3 concrete zero-day attack vectors or lateral movement paths.
2. Next, spawn a subagent named 'BlueTeam' with the persona of an expert Cloud Defense Architect.
   Feed it the attack vectors found by the RedTeam and ask it to generate concrete mitigations and Infrastructure-as-Code (IaC) snippets to block them.
3. Use the `post_chatops_message` tool to post high-level updates to the #general channel so the human team is aware of what you are finding.
4. Finally, compile a summary report of the wargame.
"""

    templated_si = TemplatedSystemInstructions(
        identity=orchestrator_identity
    )

    config = LocalAgentConfig(
        capabilities=capabilities,
        system_instructions=templated_si,
        tools=[post_chatops_message]
    )

    print("🚀 Initializing Google Antigravity Security Swarm...\n")
    if supabase:
        post_chatops_message("🚀 Starting Autonomous Wargame Simulation...", sender="System")
    
    # 3. Run the Wargame
    async with Agent(config) as agent:
        prompt = f"""
Begin the wargame simulation. 
Here is the current architecture graph:
{json.dumps(graph_data, indent=2)}

Please execute your instructions: Spawn the RedTeam, wait for their attack vectors, then spawn the BlueTeam to mitigate them, and output the final report.
"""
        print("⚔️  Wargame started. Orchestrator is spawning subagents...\n")
        response = await agent.chat(prompt)
        print("================ WARGAME REPORT ================")
        print(await response.text())
        print("================================================")

if __name__ == "__main__":
    asyncio.run(main())
