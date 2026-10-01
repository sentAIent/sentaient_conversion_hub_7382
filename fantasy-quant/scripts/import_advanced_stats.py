import os
import uuid
import pandas as pd
from dotenv import load_dotenv
from supabase import create_client

load_dotenv('.env.local')
supabase = create_client(
    os.environ.get('NEXT_PUBLIC_SUPABASE_URL'),
    os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
)

def import_advanced_stats():
    print("Fetching nflverse player_stats for 2023...")
    url = "https://github.com/nflverse/nflverse-data/releases/download/player_stats/player_stats_2023.parquet"
    df = pd.read_parquet(url)
    df = df.drop_duplicates(subset=["player_id", "season", "week"])

    # We need to map nflverse_id to our player_id
    # Fetch all players
    res = supabase.table('players').select('id, nflverse_id').execute()
    player_map = {p['nflverse_id']: p['id'] for p in res.data if p.get('nflverse_id')}

    # Fetch existing advanced_stats to know which IDs to upsert
    print("Fetching existing advanced stats to merge...")
    adv_res = supabase.table('player_advanced_stats').select('id, player_id, season, week').execute()
    adv_map = {}
    for a in adv_res.data:
        adv_map[(a['player_id'], a['season'], a['week'])] = a['id']

    upsert_data = []
    
    for _, row in df.iterrows():
        nfl_id = row['player_id']
        if nfl_id not in player_map:
            continue
            
        p_id = player_map[nfl_id]
        season = row['season']
        week = row['week']
        
        # Calculate EPA per play
        total_epa = (row['passing_epa'] if pd.notna(row['passing_epa']) else 0) + \
                    (row['rushing_epa'] if pd.notna(row['rushing_epa']) else 0) + \
                    (row['receiving_epa'] if pd.notna(row['receiving_epa']) else 0)
        
        total_plays = (row['attempts'] if pd.notna(row['attempts']) else 0) + \
                      (row['carries'] if pd.notna(row['carries']) else 0) + \
                      (row['targets'] if pd.notna(row['targets']) else 0)
                      
        epa_per_play = (total_epa / total_plays) if total_plays > 0 else 0
        
        # We don't have xFP directly in this df without complex models, 
        # so we'll approximate a basic linear weight based on targets/carries/air_yards
        # Real xFP models use play-by-play. 
        targets = row['targets'] if pd.notna(row['targets']) else 0
        carries = row['carries'] if pd.notna(row['carries']) else 0
        air_yards = row['receiving_air_yards'] if pd.notna(row['receiving_air_yards']) else 0
        
        # Basic heuristic for xFP (approximate)
        # 1 target ~ 1.8 pts, 1 carry ~ 0.7 pts, 1 air yard ~ 0.05 pts
        xfp = round((targets * 1.8) + (carries * 0.7) + (air_yards * 0.05), 2)
        actual_pts = row['fantasy_points_ppr'] if pd.notna(row['fantasy_points_ppr']) else 0
        fpoe = round(actual_pts - xfp, 2)
        
        yac = row['receiving_yards_after_catch'] if pd.notna(row['receiving_yards_after_catch']) else 0
        air_yards_share = row['air_yards_share'] if pd.notna(row['air_yards_share']) else 0
        
        # Format the record
        record = {
            'player_id': p_id,
            'season': int(season),
            'week': int(week),
            'epa_per_play': round(float(epa_per_play), 2),
            'yards_after_catch': round(float(yac), 2),
            'air_yards_share': round(float(air_yards_share), 2),
            'expected_fantasy_points': float(xfp),
            'fantasy_points_over_expected': float(fpoe),
            'carries': int(carries),
            'targets': int(targets)
        }
        
        if pd.notna(row['target_share']):
            record['target_share'] = round(float(row['target_share']), 2)
        if pd.notna(row['wopr']):
            record['wopr'] = round(float(row['wopr']), 2)
        if pd.notna(row['racr']):
            record['racr'] = round(float(row['racr']), 2)
            
        # Check if we have an existing ID
        existing_id = adv_map.get((p_id, season, week))
        if not existing_id:
            existing_id = str(uuid.uuid4())
        if existing_id:
            record['id'] = existing_id
            
        upsert_data.append(record)
        
        # Batch upsert every 500 rows
        if len(upsert_data) >= 500:
            supabase.table('player_advanced_stats').upsert(upsert_data, on_conflict='player_id,season,week').execute()
            upsert_data = []
            
    if len(upsert_data) > 0:
        supabase.table('player_advanced_stats').upsert(upsert_data, on_conflict='player_id,season,week').execute()

    print("Successfully imported advanced stats!")

if __name__ == "__main__":
    import_advanced_stats()
