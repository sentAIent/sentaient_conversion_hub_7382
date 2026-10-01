import pandas as pd
import requests
import time
import math

def fetch_and_ingest_tendencies():
    print("Fetching play-by-play data for tendencies...")
    
    # We will use 2023 for now, but this could be parameterized
    season = 2023
    url = f"https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_{season}.parquet"
    
    try:
        # read_parquet might require pyarrow or fastparquet
        df = pd.read_parquet(url)
    except Exception as e:
        print(f"Error loading parquet: {e}. Make sure pyarrow is installed.")
        return
        
    print(f"Loaded {len(df)} plays. Calculating tendencies...")
    
    # Filter for standard offensive plays
    df = df[(df['play_type'].isin(['pass', 'run'])) & (df['posteam'].notnull())]
    
    # Neutral situations: win probability between 20% and 80%, 1st/2nd down, outside of 2 min warning
    df['neutral_sit'] = (df['wp'] >= 0.20) & (df['wp'] <= 0.80) & (df['down'].isin([1, 2])) & (df['half_seconds_remaining'] > 120)
    
    # Group by team
    teams = df['posteam'].unique()
    
    api_url = "http://localhost:3000/api/ingest/scouting"
    success_count = 0
    fail_count = 0
    
    for team in teams:
        team_plays = df[df['posteam'] == team]
        if len(team_plays) == 0:
            continue
            
        pass_plays = team_plays[team_plays['play_type'] == 'pass']
        run_plays = team_plays[team_plays['play_type'] == 'run']
        
        pass_percent = len(pass_plays) / len(team_plays) * 100
        run_percent = len(run_plays) / len(team_plays) * 100
        
        neutral_plays = team_plays[team_plays['neutral_sit']]
        neutral_pass_plays = neutral_plays[neutral_plays['play_type'] == 'pass']
        
        neutral_pass_rate = 0
        if len(neutral_plays) > 0:
            neutral_pass_rate = len(neutral_pass_plays) / len(neutral_plays) * 100
            
        shotgun_plays = team_plays[team_plays['shotgun'] == 1]
        shotgun_percent = len(shotgun_plays) / len(team_plays) * 100
        
        # Pace: approx seconds per play. For simplicity, just compute total time of possession / plays
        # Actually nflverse has play_clock or drive_time. This is a proxy.
        pace_seconds = 28.5 # hardcode placeholder for now if real metric is too complex to calc quickly
        
        # Calculate positional target shares (WR1/WR2/WR3/WR4, RB1/RB2, TE1)
        pass_attempts = team_plays[(team_plays['play_type'] == 'pass') & (team_plays['receiver_player_name'].notnull())]
        total_targets = len(pass_attempts)
        
        target_counts = pass_attempts.groupby('receiver_player_name').size().reset_index(name='targets')
        target_counts = target_counts.sort_values(by='targets', ascending=False)
        
        # Mock depth charts based on target volume since we don't have explicit positional data mapped easily here
        # We will assume top 4 receivers are WRs, top TE is top remaining, etc. for the sake of the mock
        wr_shares = {}
        rb_shares = {}
        te_shares = {}
        if total_targets > 0:
            for i in range(min(4, len(target_counts))):
                player = target_counts.iloc[i]
                wr_shares[f"wr{i+1}_target_share"] = round((player['targets'] / total_targets) * 100, 2)
                
            # Mock RB1/RB2 as 5th and 6th highest targeted
            for i, rb_idx in enumerate(range(4, min(6, len(target_counts)))):
                player = target_counts.iloc[rb_idx]
                rb_shares[f"rb{i+1}_target_share"] = round((player['targets'] / total_targets) * 100, 2)
                
            # Mock TE1 as 7th
            if len(target_counts) > 6:
                player = target_counts.iloc[6]
                te_shares["te1_target_share"] = round((player['targets'] / total_targets) * 100, 2)
        
        payload = {
            "tendencies": {
                "team": str(team),
                "season": season,
                "week": None, # null means season avg
                "run_percent": round(run_percent, 2),
                "pass_percent": round(pass_percent, 2),
                "neutral_pass_rate": round(neutral_pass_rate, 2),
                "shotgun_percent": round(shotgun_percent, 2),
                "pace_seconds_per_play": pace_seconds,
                **wr_shares,
                **rb_shares,
                **te_shares
            }
        }
        
        try:
            res = requests.post(api_url, json=payload)
            if res.status_code == 200:
                success_count += 1
            else:
                fail_count += 1
        except Exception as e:
            print(f"Error posting tendency for {team}: {e}")
            fail_count += 1
            
        time.sleep(0.01)
        
    print(f"Finished ingesting tendencies. Success: {success_count}, Failed: {fail_count}")

if __name__ == "__main__":
    fetch_and_ingest_tendencies()
