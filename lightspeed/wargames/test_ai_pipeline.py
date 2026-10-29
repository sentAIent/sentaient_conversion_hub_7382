import requests
import json
import time

AI_ENGINE_URL = "http://localhost:8001"

def test_pipeline():
    print("--- Starting LightSpeed AI Pipeline Test ---")
    
    # Wait for server to be up (simulated)
    print("Checking health...")
    try:
        health = requests.get(f"{AI_ENGINE_URL}/health").json()
        print(f"Server is healthy. Mode: {health.get('mode')}")
    except requests.exceptions.ConnectionError:
        print("AI Server is not running. Please start it using 'python3 ai_server.py'")
        return

    # 1. Test PII Redaction
    print("\n[1] Testing PII Redaction via NER...")
    sensitive_log = "Error 500: Database connection failed for user John Doe with password 'SuperSecret123!'."
    print(f"Original Log: {sensitive_log}")
    
    pii_response = requests.post(f"{AI_ENGINE_URL}/redact-pii", json={"text": sensitive_log})
    if pii_response.status_code == 200:
        redacted = pii_response.json()
        print(f"Redacted Log: {redacted['redacted_text']}")
        print(f"Found Entities: {json.dumps(redacted['entities'], indent=2)}")
    else:
        print("PII Redaction failed.")

    # 2. Test Root Cause Analysis
    print("\n[2] Testing Root Cause Analysis (Sequence-to-Sequence)...")
    stack_trace = "ConnectionTimeout: Failed to reach upstream at https://api.contangoquant.local. The server returned a 504 Gateway Timeout after 30000ms. No response from underlying database layer."
    print("Sending stack trace to AI Engine...")
    
    rca_response = requests.post(f"{AI_ENGINE_URL}/analyze-error", json={"logs": stack_trace})
    if rca_response.status_code == 200:
        summary = rca_response.json()['summary']
        print(f"AI RCA Summary: {summary}")
    else:
        print("RCA Generation failed.")
        
    print("\n--- Test Complete ---")

if __name__ == "__main__":
    test_pipeline()
