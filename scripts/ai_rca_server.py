#!/usr/bin/env python3
"""
AI-Powered Root Cause Analysis (RCA) Server
This script ingests error logs (e.g. from Sentry or Datadog), formats them into a prompt,
and securely queries an LLM to automatically suggest a Root Cause and Remediation Plan.
"""

import os
import json
import requests
import sys

def analyze_error(error_traceback):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("❌ OPENAI_API_KEY is missing. Cannot perform RCA.")
        sys.exit(1)

    print("🤖 Initiating AI Root Cause Analysis...")
    
    prompt = f"""
You are an expert Site Reliability Engineer (SRE). Analyze the following stack trace and production error log.
Provide a JSON response with two keys:
1. "root_cause": A brief 2-sentence explanation of what went wrong.
2. "remediation": A 3-step actionable plan to fix the code or infrastructure.

ERROR LOG:
{error_traceback}
"""

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "gpt-4-turbo",
        "messages": [{"role": "system", "content": prompt}],
        "temperature": 0.2,
        "response_format": { "type": "json_object" }
    }

    try:
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        
        rca_result = json.loads(data['choices'][0]['message']['content'])
        
        print("\n==============================")
        print("🎯 AI ROOT CAUSE ANALYSIS")
        print("==============================")
        print(f"ROOT CAUSE:\n{rca_result.get('root_cause', 'N/A')}\n")
        print(f"REMEDIATION PLAN:\n{rca_result.get('remediation', 'N/A')}\n")
        
        # Here you could dispatch this output to a Slack/Discord webhook for the engineering team.
        
    except Exception as e:
        print(f"❌ RCA Analysis failed: {e}")

if __name__ == "__main__":
    # Example usage: python3 scripts/ai_rca_server.py "TypeError: Cannot read properties of undefined (reading 'id') at Dashboard.jsx:42"
    if len(sys.argv) > 1:
        analyze_error(sys.argv[1])
    else:
        print("Usage: python3 ai_rca_server.py '<error_stack_trace>'")
