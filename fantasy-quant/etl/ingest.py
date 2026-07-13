import os
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv
import ssl

# Bypass SSL verify on mac
ssl._create_default_https_context = ssl._create_unverified_context

load_dotenv(dotenv_path='../.env.local')

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase URL or Service Role Key in .env.local")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def run_etl():
    print("Fetching Weekly Stats from nflverse...")
    url_weekly = "https://github.com/nflverse/nflverse-data/releases/download/player_stats/player_stats.parquet"
    df = pd.read_parquet(url_weekly)
    
    # Filter for just 2023 season to keep the demo upload quick
    df_2023 = df[df['season'] == 2023].copy()
    print(f"Found {len(df_2023)} stat rows for 2023.")
    
    # --- 1. PLAYERS ---
    print("Extracting Players...")
    players_df = df_2023[['player_id', 'player_display_name', 'position', 'recent_team']].drop_duplicates(subset=['player_id']).dropna(subset=['player_id'])
    
    # We already inserted players in step 1, but we need their UUIDs mapping
    print("Fetching Player UUIDs from Supabase...")
    db_players = supabase.table('players').select('id, nflverse_id').execute().data
    player_id_map = {p['nflverse_id']: p['id'] for p in db_players}
    
    # --- 2. GAMES ---
    print("Extracting and Upserting Games...")
    # Since we don't have the exact schedule dataset, we will synthesize game records
    # using season, week, and recent_team to create a deterministic game_id
    games_df = df_2023[['season', 'week', 'recent_team', 'opponent_team']].drop_duplicates()
    
    game_records = []
    for _, row in games_df.iterrows():
        # Sort teams so SF vs PIT and PIT vs SF generate the same game_id
        teams = sorted([str(row['recent_team']), str(row['opponent_team'])])
        nflverse_game_id = f"{row['season']}_{row['week']:02d}_{teams[0]}_{teams[1]}"
        
        game_records.append({
            'nflverse_game_id': nflverse_game_id,
            'season': row['season'],
            'week': row['week'],
            'home_team': teams[0],
            'away_team': teams[1],
            'stadium': 'Unknown',
            'is_dome': False
        })
    
    # Deduplicate synthesized games
    unique_games = {g['nflverse_game_id']: g for g in game_records}.values()
    game_records = list(unique_games)
    
    # Chunk upload games
    chunk_size = 500
    for i in range(0, len(game_records), chunk_size):
        chunk = game_records[i:i+chunk_size]
        supabase.table('games').upsert(chunk, on_conflict='nflverse_game_id').execute()
        
    print(f"Upserted {len(game_records)} synthetic games.")
    
    # Fetch Games UUIDs
    db_games = supabase.table('games').select('id, nflverse_game_id').execute().data
    game_id_map = {g['nflverse_game_id']: g['id'] for g in db_games}
    
    # --- 3. STATS ---
    print("Preparing Weekly Stats...")
    stat_records = []
    for _, row in df_2023.iterrows():
        p_id = row['player_id']
        if pd.isna(p_id) or p_id not in player_id_map:
            continue
            
        teams = sorted([str(row['recent_team']), str(row['opponent_team'])])
        nflverse_game_id = f"{row['season']}_{row['week']:02d}_{teams[0]}_{teams[1]}"
        
        if nflverse_game_id not in game_id_map:
            continue
            
        stat_records.append({
            'player_id': player_id_map[p_id],
            'game_id': game_id_map[nflverse_game_id],
            'rush_yds': int(row.get('rushing_yards', 0) or 0),
            'rush_tds': int(row.get('rushing_tds', 0) or 0),
            'receptions': int(row.get('receptions', 0) or 0),
            'targets': int(row.get('targets', 0) or 0),
            'rec_yds': int(row.get('receiving_yards', 0) or 0),
            'rec_tds': int(row.get('receiving_tds', 0) or 0),
            'pass_yds': int(row.get('passing_yards', 0) or 0),
            'pass_tds': int(row.get('passing_tds', 0) or 0),
            'interceptions': int(row.get('interceptions', 0) or 0),
            'fumbles_lost': int((row.get('rushing_fumbles_lost', 0) or 0) + (row.get('receiving_fumbles_lost', 0) or 0) + (row.get('sack_fumbles_lost', 0) or 0)),
            'standard_pts': float(row.get('fantasy_points', 0) or 0),
            'half_ppr_pts': float((row.get('fantasy_points', 0) or 0) + ((row.get('receptions', 0) or 0) * 0.5)),
            'ppr_pts': float(row.get('fantasy_points_ppr', 0) or 0)
        })
        
    print(f"Upserting {len(stat_records)} Stats...")
    # Chunk upload stats
    for i in range(0, len(stat_records), chunk_size):
        chunk = stat_records[i:i+chunk_size]
        try:
            supabase.table('player_weekly_stats').upsert(chunk, on_conflict='player_id, game_id').execute()
        except Exception as e:
            print(f"Error upserting stats chunk {i}: {e}")
            
    print("ETL Pipeline Complete! 2023 Historical Data is Live in Supabase.")

if __name__ == "__main__":
    run_etl()
