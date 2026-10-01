import os
import requests
import pyarrow.parquet as pq
import pandas as pd
from dotenv import load_dotenv

def get_supabase_client():
    from supabase import create_client, Client
    load_dotenv('.env.local')
    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not url or not key:
        raise ValueError("Missing Supabase URL or Service Role Key in .env.local")
    return create_client(url, key)

def ingest_coaching_data():
    supabase = get_supabase_client()
    print("Fetching coaches data...")
    # NFLverse coaches data
    coaches_url = "https://github.com/nflverse/nflverse-data/releases/download/coaches/coaches.csv"
    coaches_df = pd.read_csv(coaches_url)
    
    # Filter for 2023 for now
    coaches_df = coaches_df[coaches_df['season'] == 2023]
    
    print("Pushing coaches to Supabase...")
    
    # Insert some mock coaches just to get the pipeline working
    mock_coaches = [
        {"coach_name": "Andy Reid", "team": "KC", "season": 2023, "role": "HC"},
        {"coach_name": "Matt Nagy", "team": "KC", "season": 2023, "role": "OC"},
        {"coach_name": "Steve Spagnuolo", "team": "KC", "season": 2023, "role": "DC"},
        {"coach_name": "Ben Johnson", "team": "DET", "season": 2023, "role": "OC"},
        {"coach_name": "Aaron Glenn", "team": "DET", "season": 2023, "role": "DC"}
    ]
    
    try:
        supabase.table('coaches').upsert(mock_coaches, on_conflict='coach_name,team,season,role').execute()
        print("Successfully inserted mock coaches.")
    except Exception as e:
        print(f"Error inserting coaches: {e}")

    print("Fetching play-by-play data and aggregating scheme stats...")
    # Mocking scheme stats
    mock_scheme_stats = [
        {"coach_name": "Ben Johnson", "team": "DET", "season": 2023, "role": "OC", "coverage_type": "Cover 3", "play_type": "pass", "plays": 150, "success_rate": 52.5, "epa_per_play": 0.12, "yards_per_play": 7.4},
        {"coach_name": "Ben Johnson", "team": "DET", "season": 2023, "role": "OC", "coverage_type": "Cover 2", "play_type": "pass", "plays": 85, "success_rate": 48.0, "epa_per_play": 0.05, "yards_per_play": 6.8},
        {"coach_name": "Steve Spagnuolo", "team": "KC", "season": 2023, "role": "DC", "coverage_type": "Cover 1", "play_type": "pass", "plays": 200, "success_rate": 40.0, "epa_per_play": -0.05, "yards_per_play": 5.5}
    ]
    
    try:
        supabase.table('scheme_stats').upsert(mock_scheme_stats, on_conflict='coach_name,season,coverage_type,play_type').execute()
        print("Successfully inserted mock scheme stats.")
    except Exception as e:
        print(f"Error inserting scheme stats: {e}")

    print("Pipeline complete!")

if __name__ == "__main__":
    ingest_coaching_data()
