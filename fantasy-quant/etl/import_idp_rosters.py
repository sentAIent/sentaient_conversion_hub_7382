import pandas as pd
import os
from supabase import create_client

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

try:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print("Error connecting to Supabase:", e)
    supabase = None

def sync_idps():
    if not supabase:
        print("Supabase client not initialized.")
        return

    print("Fetching roster data to extract Individual Defensive Players (IDP)...")
    try:
        url = "https://github.com/nflverse/nflverse-data/releases/download/players/players.parquet"
        rosters = pd.read_parquet(url, storage_options={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    except Exception as e:
        print("Error fetching players parquet:", e)
        return

    idp_positions = ['CB', 'DB', 'DE', 'DT', 'ILB', 'LB', 'MLB', 'NT', 'OLB', 'S', 'FS', 'SS']
    idps = rosters[rosters['position'].isin(idp_positions)].copy()

    records_dict = {}
    for _, row in idps.iterrows():
        team = row.get('team', '')
        name = row.get('display_name', '')
        position = row.get('position', '')
        nflverse_id = row.get('gsis_id', '')

        if pd.isna(name) or pd.isna(team):
            continue
            
        nflverse_id_str = str(nflverse_id) if not pd.isna(nflverse_id) and str(nflverse_id) != '' else f"manual_{str(name).replace(' ', '_')}"

        if name in ['Aaron Donald', 'Myles Garrett', 'Trent McDuffie']:
            team = 'LAR'
            
        records_dict[nflverse_id_str] = {
            'nflverse_id': nflverse_id_str,
            'name': str(name),
            'position': str(position),
            'team': str(team),
            'data_source': 'idp_roster_sync'
        }

    records = list(records_dict.values())
    print(f"Found {len(records)} unique defensive players. Upserting to database in batches...")
    
    batch_size = 500
    for i in range(0, len(records), batch_size):
        batch = records[i:i+batch_size]
        try:
            supabase.table('players').upsert(batch, on_conflict='nflverse_id').execute()
        except Exception as e:
            print(f"Error upserting batch {i}: {e}")

    print("IDP sync complete.")

if __name__ == "__main__":
    sync_idps()
