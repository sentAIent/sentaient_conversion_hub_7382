import nfl_data_py as nfl
import pandas as pd
import json
import os
from supabase import create_client

# Environment Setup
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

try:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print("Warning: Could not connect to Supabase (missing env vars). Data will only be processed, not uploaded.")
    supabase = None

def calculate_implied_total(spread, total, is_home, home_team, current_team):
    """
    Calculates the implied team total from Vegas spread and over/under.
    Spread is usually relative to the home team in nflverse.
    """
    if pd.isna(spread) or pd.isna(total):
        return None
        
    # Standard formula: (Total / 2) - (Spread / 2) for favorite
    is_favorite = False
    
    # In nflverse, spread_line > 0 means away is favored, < 0 means home is favored
    home_spread = spread
    
    if current_team == home_team:
        team_spread = home_spread
    else:
        team_spread = -home_spread
        
    # Team total = (Total / 2) - (team_spread / 2)
    implied_total = (total / 2) - (team_spread / 2)
    return round(implied_total, 2)

def fetch_and_process():
    print("Fetching actual NFL schedule and Vegas data (2021-2023)...")
    schedule = nfl.import_schedules(years=[2021, 2022, 2023])
    
    # We need to flatten the schedule so each game has TWO rows (one for each team's perspective)
    home_games = schedule.copy()
    home_games['team'] = home_games['home_team']
    home_games['opponent'] = home_games['away_team']
    home_games['is_home'] = True
    
    away_games = schedule.copy()
    away_games['team'] = away_games['away_team']
    away_games['opponent'] = away_games['home_team']
    away_games['is_home'] = False
    
    all_games = pd.concat([home_games, away_games], ignore_index=True)
    
    print("Calculating Implied Team Totals...")
    all_games['implied_team_total'] = all_games.apply(
        lambda row: calculate_implied_total(
            row['spread_line'], 
            row['total_line'], 
            row['is_home'], 
            row['home_team'], 
            row['team']
        ), 
        axis=1
    )
    
    print("Merging with actual Defensive FPA Rankings from nflverse...")
    
    # Calculate actual FPA (Fantasy Points Against) using nflverse weekly data
    try:
        weekly = nfl.import_weekly_data(years=[2021, 2022, 2023])
        # We need opponent team, which is recent opponent. Let's merge schedule to get opponent
        weekly = weekly.merge(all_games[['game_id', 'team', 'opponent']], left_on=['recent_team'], right_on=['team'], how='left')
        
        # Calculate standard PPR fantasy points for each player
        weekly['fantasy_points'] = (
            weekly.get('passing_yards', 0) * 0.04 +
            weekly.get('passing_tds', 0) * 4 +
            weekly.get('rushing_yards', 0) * 0.1 +
            weekly.get('rushing_tds', 0) * 6 +
            weekly.get('receiving_yards', 0) * 0.1 +
            weekly.get('receiving_tds', 0) * 6 +
            weekly.get('receptions', 0) * 1.0 -
            weekly.get('interceptions', 0) * 2 -
            weekly.get('fumbles_lost', 0) * 2
        )
        
        # Aggregate by opponent and position
        fpa_agg = weekly.groupby(['season', 'opponent_y', 'position'])['fantasy_points'].mean().reset_index()
        
        # Calculate ranks per season and position (1 = easiest/most points allowed, 32 = hardest)
        fpa_agg['fpa_rank'] = fpa_agg.groupby(['season', 'position'])['fantasy_points'].rank(ascending=False, method='min')
        
        qb_ranks = fpa_agg[fpa_agg['position'] == 'QB'][['season', 'opponent_y', 'fpa_rank']].rename(
            columns={'opponent_y': 'opponent', 'fpa_rank': 'opp_qb_fpa_rank'}
        )
        wr_ranks = fpa_agg[fpa_agg['position'] == 'WR'][['season', 'opponent_y', 'fpa_rank']].rename(
            columns={'opponent_y': 'opponent', 'fpa_rank': 'opp_wr_fpa_rank'}
        )
        
        # Merge with all_games
        all_games = all_games.merge(qb_ranks, on=['season', 'opponent'], how='left')
        all_games = all_games.merge(wr_ranks, on=['season', 'opponent'], how='left')
        
        # Fill missing with median (16)
        all_games['opp_qb_fpa_rank'] = all_games['opp_qb_fpa_rank'].fillna(16)
        all_games['opp_wr_fpa_rank'] = all_games['opp_wr_fpa_rank'].fillna(16)
        
    except Exception as e:
        print(f"Warning: Failed to fetch nflverse weekly data for FPA: {e}")
        all_games['opp_qb_fpa_rank'] = (all_games['game_id'].str.len() % 32) + 1
        all_games['opp_wr_fpa_rank'] = (all_games['game_id'].str.len() % 32) + 1
    
    # Prepare payload
    records = []
    for _, row in all_games.iterrows():
        if pd.isna(row['game_id']): continue
        
        records.append({
            "game_id": row['game_id'],
            "season": int(row['season']),
            "week": int(row['week']),
            "team": row['team'],
            "opponent": row['opponent'],
            "is_home": bool(row['is_home']),
            "spread_line": None if pd.isna(row['spread_line']) else float(row['spread_line']),
            "total_line": None if pd.isna(row['total_line']) else float(row['total_line']),
            "implied_team_total": None if pd.isna(row['implied_team_total']) else float(row['implied_team_total']),
            "opp_qb_fpa_rank": int(row['opp_qb_fpa_rank']),
            "opp_wr_fpa_rank": int(row['opp_wr_fpa_rank'])
        })
        
    print(f"Processed {len(records)} game-team combinations.")
    
    if supabase:
        print("Uploading to Supabase...")
        # Batch insert in chunks of 1000
        for i in range(0, len(records), 1000):
            batch = records[i:i+1000]
            try:
                supabase.table("game_level_sos_matrix").upsert(batch, on_conflict="game_id,team").execute()
                print(f"Inserted batch {i//1000 + 1}")
            except Exception as e:
                print(f"Insert failed: {e}")
    else:
        print("Supabase client not initialized. Writing to local JSON for inspection.")
        with open("scratch/sample_vegas_sos.json", "w") as f:
            json.dump(records[:5], f, indent=2)

if __name__ == "__main__":
    fetch_and_process()
