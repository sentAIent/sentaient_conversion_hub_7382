import nfl_data_py as nfl
import pandas as pd
import json
import os
from supabase import create_client

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

try:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print("Warning: Supabase not connected.")
    supabase = None

def build_micro_matchups_from_pbp():
    print("Fetching REAL Play-by-Play data to infer Micro-Matchups...")
    # Fetching 2023 for speed, in prod fetch all years
    pbp = nfl.import_pbp_data([2023])
    
    # Filter to completed passes where we have a receiver and a tackler
    # This is a real-data proxy for "Who was covering who?"
    passes = pbp[(pbp['play_type'] == 'pass') & (pbp['complete_pass'] == 1) & (pbp['receiver_player_name'].notnull()) & (pbp['solo_tackle_1_player_name'].notnull())]
    
    print(f"Found {len(passes)} completed passes with solo tackle data.")
    
    # Group by Game, Receiver, and Tackler (Defender)
    matchup_groups = passes.groupby(['game_id', 'receiver_player_name', 'solo_tackle_1_player_name']).agg(
        posteam=('posteam', 'first'),
        defteam=('defteam', 'first'),
        targets_allowed=('play_id', 'count'), # Proxied by tackles made on them
        yards_allowed=('yards_gained', 'sum')
    ).reset_index()
    
    # Calculate shadow rate proxy (How many of the receiver's total catches in that game were tackled by this specific defender?)
    game_receiver_totals = passes.groupby(['game_id', 'receiver_player_name']).agg(total_catches=('play_id', 'count')).reset_index()
    
    matchups = pd.merge(matchup_groups, game_receiver_totals, on=['game_id', 'receiver_player_name'])
    matchups['shadow_rate_percent'] = round((matchups['targets_allowed'] / matchups['total_catches']) * 100, 2)
    
    # Filter for significant matchups (defender tackled them at least twice)
    significant_matchups = matchups[matchups['targets_allowed'] >= 2].copy()
    print(f"Extracted {len(significant_matchups)} significant micro-matchups.")
    
    records = []
    for _, row in significant_matchups.iterrows():
        records.append({
            "game_id": str(row['game_id']),
            "offensive_player": str(row['receiver_player_name']),
            "offensive_team": str(row['posteam']),
            "defensive_player": str(row['solo_tackle_1_player_name']),
            "defensive_team": str(row['defteam']),
            "shadow_rate_percent": float(row['shadow_rate_percent']),
            "routes_covered": int(row['targets_allowed'] * 3), # Rough proxy for routes based on targets
            "targets_allowed": int(row['targets_allowed']),
            "receptions_allowed": int(row['targets_allowed']),
            "yards_allowed": int(row['yards_allowed']),
            "route_win_rate": float(min(100.0, row['shadow_rate_percent'] * 1.5)) # Proxy
        })
        
    if supabase:
        print("Uploading to Supabase...")
        for i in range(0, len(records), 500):
            batch = records[i:i+500]
            try:
                supabase.table("micro_matchups").upsert(batch, on_conflict="game_id,offensive_player,defensive_player").execute()
            except Exception as e:
                print(f"Insert failed: {e}")
        print("Upload complete.")
    else:
        print("Supabase client not initialized. Writing local JSON.")
        with open("scratch/micro_matchups_sample.json", "w") as f:
            json.dump(records[:10], f, indent=2)

if __name__ == "__main__":
    build_micro_matchups_from_pbp()
