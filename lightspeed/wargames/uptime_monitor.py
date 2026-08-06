import os
import time
import requests
from supabase import create_client, Client
from dotenv import load_dotenv
from concurrent.futures import ThreadPoolExecutor

load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("VITE_SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: SUPABASE_URL and SUPABASE_KEY must be set.")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def check_site(app):
    app_id = app.get('id')
    url = app.get('url')
    
    if not url:
        return
        
    try:
        # Ensure url has scheme
        if not url.startswith('http'):
            url = f'https://{url}'
            
        start_time = time.time()
        response = requests.get(url, timeout=10)
        end_time = time.time()
        
        latency_ms = int((end_time - start_time) * 1000)
        status_code = response.status_code
        
        print(f"Checked {app_id} ({url}): Status {status_code}, {latency_ms}ms")
        
        # Insert metric
        supabase.table("metrics").insert({
            "site": app_id,
            "metric_name": "uptime_ping",
            "value": latency_ms,
            "metadata": {"status_code": status_code, "url": url}
        }).execute()
        
    except requests.RequestException as e:
        print(f"Error checking {app_id} ({url}): {e}")
        # Insert failure metric
        supabase.table("metrics").insert({
            "site": app_id,
            "metric_name": "uptime_ping",
            "value": -1,  # Indicate failure
            "metadata": {"status_code": 0, "error": str(e), "url": url}
        }).execute()

def monitor_loop(interval_seconds=60):
    print(f"Starting uptime monitor... Checking every {interval_seconds} seconds.")
    while True:
        try:
            # Fetch apps
            response = supabase.table("apps").select("*").execute()
            apps = response.data
            
            if apps:
                with ThreadPoolExecutor(max_workers=10) as executor:
                    executor.map(check_site, apps)
            else:
                print("No apps found to monitor.")
                
        except Exception as e:
            print(f"Monitor loop error: {e}")
            
        time.sleep(interval_seconds)

if __name__ == "__main__":
    # Check interval can be configured via env var, default 60s
    interval = int(os.getenv("UPTIME_CHECK_INTERVAL", "60"))
    monitor_loop(interval)
