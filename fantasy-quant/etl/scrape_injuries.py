import os
import requests
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def scrape_injuries():
    print("--- Scraping Official Injury Reports ---")
    
    mock_injury_data = [
        {"name": "Tyreek Hill", "status": "Questionable", "prob": 0.50},
        {"name": "Justin Jefferson", "status": "Out", "prob": 0.0},
    ]
    
    for injury in mock_injury_data:
        # Resolve Player ID (fuzzy/exact match by name)
        resp = supabase.table("players").select("id").eq("name", injury["name"]).execute()
        
        if resp.data and len(resp.data) > 0:
            player_id = resp.data[0]["id"]
            
            # Upsert into player_injuries
            payload = {
                "player_id": player_id,
                "season": 2023,
                "week": 14,
                "injury_status": injury["status"],
                "play_probability": injury["prob"]
            }
            
            supabase.table("player_injuries").upsert(payload, on_conflict="player_id,season,week").execute()
            print(f"Updated injury status for {injury['name']}: {injury['status']}")
        else:
            print(f"Player not found in database: {injury['name']}")

if __name__ == "__main__":
    scrape_injuries()
