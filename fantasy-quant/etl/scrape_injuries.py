import os
import requests
import ssl
from supabase import create_client, Client
from dotenv import load_dotenv

ssl._create_default_https_context = ssl._create_unverified_context
import nfl_data_py as nfl

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Missing Supabase credentials")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_play_probability(status: str, practice: str) -> float:
    s = str(status).lower()
    p = str(practice).lower()
    
    if 'out' in s or 'ir' in s:
        return 0.0
    if 'doubtful' in s:
        return 0.15
    if 'questionable' in s:
        if 'did not participate' in p or 'dnp' in p: return 0.40
        if 'limited' in p or 'lp' in p: return 0.60
        if 'full' in p or 'fp' in p: return 0.85
        return 0.65
    return 1.0

def scrape_injuries():
    print("--- Scraping Official Injury Reports ---")
    
    try:
        df = nfl.import_injuries([2023])
        # Filter to most recent week (e.g. max week or just week 14 for our scenario)
        week = 14
        df_week = df[(df['week'] == week) & (df['season'] == 2023)]
        
        print(f"Found {len(df_week)} injury records for Week {week}...")
        
        # We need to map nfl_data_py's gsis_id to our players table if possible,
        # or map by full_name.
        
        # Let's fetch all players from DB to map
        print("Fetching players from DB...")
        players_res = supabase.table("players").select("id, name").execute()
        player_map = {p['name'].lower(): p['id'] for p in players_res.data}
        
        records_to_upsert = []
        
        for _, row in df_week.iterrows():
            name = str(row['full_name']).lower().replace('.', '').replace("'", "")
            report_status = str(row['report_status'])
            practice_status = str(row['practice_status'])
            
            if name in player_map:
                player_id = player_map[name]
                
                records_to_upsert.append({
                    "player_id": player_id,
                    "season": 2023,
                    "week": week,
                    "injury_status": report_status,
                    "practice_status": practice_status
                })
        
        if records_to_upsert:
            print(f"Upserting {len(records_to_upsert)} injury records...")
            chunk_size = 500
            for i in range(0, len(records_to_upsert), chunk_size):
                supabase.table("player_injuries").upsert(
                    records_to_upsert[i:i+chunk_size], 
                    on_conflict="player_id,season,week"
                ).execute()
            print("Injury scrape complete!")
        else:
            print("No matching players found to upsert.")
            
    except Exception as e:
        print(f"Error scraping injuries: {e}")

if __name__ == "__main__":
    scrape_injuries()
