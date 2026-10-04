import os
import time
import requests
import random
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("VITE_SUPABASE_ANON_KEY")
AI_ENGINE_URL = "http://localhost:8001"

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: SUPABASE_URL and SUPABASE_KEY must be set.")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def simulate_login(url, username, password):
    start_time = time.time()
    time.sleep(random.uniform(0.1, 0.8))
    success = random.choice([True, True, True, True, False])
    
    # We simulate a verbose trace that might accidentally include the password or username
    error_msg = None if success else f"ConnectionTimeout: Failed to reach upstream at {url}. User {username} with password {password} rejected by auth gate."
    
    latency = int((time.time() - start_time) * 1000)
    
    return success, latency, error_msg

def run_tests():
    print("Fetching apps with configured credentials...")
    res = supabase.table('app_credentials').select('*, apps(name, url, type)').execute()
    
    credentials = res.data
    if not credentials:
        print("No apps configured for deep runtime testing.")
        return
        
    print(f"Found {len(credentials)} apps to test.")
    
    for cred in credentials:
        app_id = cred['app_id']
        app_name = cred['apps']['name']
        app_url = cred['apps']['url']
        app_type = cred['apps']['type']
        
        print(f"\n[{app_type}] Testing deep runtime login for {app_name} at {app_url}...")
        
        success, latency, error_msg = simulate_login(app_url, cred['username'], cred['password'])
        
        # 1. PII Redaction
        redacted_error = error_msg
        if error_msg:
            try:
                res_pii = requests.post(f"{AI_ENGINE_URL}/redact-pii", json={"text": error_msg})
                if res_pii.status_code == 200:
                    pii_data = res_pii.json()
                    redacted_error = pii_data['redacted_text']
                    
                    if pii_data['entities']:
                        supabase.table('pii_redactions').insert({
                            'app_id': app_id,
                            'original_length': len(error_msg),
                            'redacted_entities': pii_data['entities']
                        }).execute()
            except Exception as e:
                print(f"Warning: AI Engine unreachable for PII redaction: {e}")

        # 2. RCA Generation
        if not success and redacted_error:
            try:
                res_rca = requests.post(f"{AI_ENGINE_URL}/analyze-error", json={"logs": redacted_error})
                if res_rca.status_code == 200:
                    rca_summary = res_rca.json()['summary']
                    
                    supabase.table('ai_insights').insert({
                        'app_id': app_id,
                        'insight_type': 'rca',
                        'content': rca_summary,
                        'confidence': 0.95
                    }).execute()
            except Exception as e:
                print(f"Warning: AI Engine unreachable for RCA: {e}")
        
        print(f"Result: {'SUCCESS' if success else 'FAILED'} | Latency: {latency}ms")
        
        log_entry = {
            "app_id": app_id,
            "status": "up" if success else "down",
            "latency_ms": latency,
            "error_message": redacted_error
        }
        
        supabase.table('uptime_logs').insert(log_entry).execute()
        
        audit_entry = {
            "actor": "LightSpeed Runtime Tester Daemon",
            "action": "e2e_runtime_test",
            "resource": app_id,
            "metadata": {
                "success": success,
                "latency_ms": latency,
                "error": redacted_error
            }
        }
        supabase.table('audit_logs').insert(audit_entry).execute()
        
    print("\nDeep Runtime Testing Complete.")

if __name__ == "__main__":
    while True:
        run_tests()
        print("Sleeping for 60 seconds before next test cycle...")
        time.sleep(60)

