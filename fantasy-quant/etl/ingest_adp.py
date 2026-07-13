import os
import random
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env.local')

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase URL or Service Role Key in .env.local")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def run_adp_etl():
    print("Fetching Players from Supabase...")
    db_players = supabase.table('players').select('id, name, position').execute().data
    
    print(f"Generating synthetic ADP for {len(db_players)} players...")
    records = []
    
    # We will generate synthetic ADP (1.0 to 300.0) based roughly on position
    for player in db_players:
        player_id = player['id']
        pos = player['position']
        
        # Give WRs and RBs higher ADP (lower number)
        base_adp = random.uniform(1.0, 150.0)
        if pos in ['WR', 'RB']:
            base_adp = random.uniform(1.0, 100.0)
        elif pos == 'QB':
            base_adp = random.uniform(20.0, 150.0)
            
        for format_type in ['ppr', 'half_ppr', 'standard']:
            # slight variation per format
            adp_val = round(base_adp + random.uniform(-10.0, 10.0), 1)
            if adp_val < 1.0: adp_val = 1.0
            
            records.append({
                'player_id': player_id,
                'season': 2023,
                'format': format_type,
                'adp': adp_val,
                'source': 'Synthetic FantasyPros'
            })
            
    print(f"Upserting {len(records)} ADP Records...")
    chunk_size = 500
    for i in range(0, len(records), chunk_size):
        chunk = records[i:i+chunk_size]
        try:
            supabase.table('player_adp').upsert(chunk, on_conflict='player_id, season, format').execute()
        except Exception as e:
            print(f"Error upserting ADP chunk {i}: {e}")
            
    print("ADP ETL Pipeline Complete!")

if __name__ == "__main__":
    run_adp_etl()
