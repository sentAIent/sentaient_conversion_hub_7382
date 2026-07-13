import os
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv
import ssl

ssl._create_default_https_context = ssl._create_unverified_context
load_dotenv(dotenv_path='../.env.local')

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase URL or Service Role Key in .env.local")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def run_injuries_etl():
    print("Fetching Injuries from nflverse...")
    url = "https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2023.parquet"
    try:
        df_injuries = pd.read_parquet(url)
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
        return

    print(f"Found {len(df_injuries)} injury records for 2023.")

    # Fetch Player UUIDs
    print("Fetching Player UUIDs from Supabase...")
    db_players = supabase.table('players').select('id, nflverse_id').execute().data
    player_id_map = {p['nflverse_id']: p['id'] for p in db_players}

    # Fetch Games
    print("Fetching Games from Supabase...")
    db_games = supabase.table('games').select('id, season, week, home_team, away_team').eq('season', 2023).execute().data
    
    # Create game mapping for a team in a week
    # key: (season, week, team) -> value: game_id
    team_game_map = {}
    for g in db_games:
        season = g['season']
        week = g['week']
        game_id = g['id']
        team_game_map[(season, week, g['home_team'])] = game_id
        team_game_map[(season, week, g['away_team'])] = game_id

    records = []
    for _, row in df_injuries.iterrows():
        gsis_id = row['gsis_id']
        season = row['season']
        week = row['week']
        team = row['team']
        
        if pd.isna(gsis_id) or gsis_id not in player_id_map:
            continue
            
        player_id = player_id_map[gsis_id]
        
        # Determine game_id if available
        game_id = team_game_map.get((season, week, team))
        
        records.append({
            'player_id': player_id,
            'season': int(season),
            'week': int(week),
            'game_id': game_id,
            'report_primary_injury': str(row.get('report_primary_injury', '')) if pd.notna(row.get('report_primary_injury')) else None,
            'report_status': str(row.get('report_status', '')) if pd.notna(row.get('report_status')) else None,
            'practice_status': str(row.get('practice_status', '')) if pd.notna(row.get('practice_status')) else None,
        })
        
    print(f"Upserting {len(records)} Injury Records...")
    chunk_size = 500
    for i in range(0, len(records), chunk_size):
        chunk = records[i:i+chunk_size]
        try:
            supabase.table('player_injuries').upsert(chunk, on_conflict='player_id, season, week').execute()
        except Exception as e:
            print(f"Error upserting injuries chunk {i}: {e}")
            
    print("Injury ETL Pipeline Complete!")

if __name__ == "__main__":
    run_injuries_etl()
