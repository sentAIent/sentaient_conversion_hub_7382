import nfl_data_py as nfl
import pandas as pd
import os
from supabase import create_client

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

try:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print("Warning: Supabase not connected.")
    supabase = None

def build_coaching_tendencies():
    print("Fetching 2023 Play-by-Play data to calculate PROE and Pace...")
    pbp = nfl.import_pbp_data([2023])
    
    # Filter for standard offensive plays
    plays = pbp[(pbp['play_type'].isin(['pass', 'run'])) & (pbp['posteam'].notnull())].copy()
    
    # Neutral situations for Pace (Win Prob between 20% and 80%, not 4th quarter 2-min warning)
    neutral_plays = plays[(plays['wp'] >= 0.20) & (plays['wp'] <= 0.80) & (plays['half_seconds_remaining'] > 120)].copy()
    
    # PROE Calculation
    # pass_oe is pass - xpass
    proe_data = plays.groupby('posteam').agg(
        total_plays=('play_id', 'count'),
        actual_passes=('pass', 'sum'),
        expected_passes=('xpass', 'sum')
    ).reset_index()
    
    proe_data['proe'] = ((proe_data['actual_passes'] - proe_data['expected_passes']) / proe_data['total_plays']) * 100
    
    # Early Down Pass Rate (1st and 2nd down)
    early_downs = plays[plays['down'].isin([1, 2])]
    edpr_data = early_downs.groupby('posteam').agg(
        ed_plays=('play_id', 'count'),
        ed_passes=('pass', 'sum')
    ).reset_index()
    edpr_data['early_down_pass_rate'] = (edpr_data['ed_passes'] / edpr_data['ed_plays']) * 100
    
    # Merge
    metrics = pd.merge(proe_data, edpr_data, on='posteam')
    
    # Actual Pace Calculation (Neutral Situations)
    # nflverse PBP contains `drive_time_of_possession` (e.g. "04:35") and `drive_play_count`.
    # A simpler way is to just group by team and find average play_clock at snap if available, 
    # but play_clock is often null.
    # Alternatively, average time elapsed between plays in a drive.
    neutral_plays['time_elapsed'] = neutral_plays.groupby(['game_id', 'drive'])['game_half_seconds_remaining'].diff() * -1
    neutral_plays['time_elapsed'] = neutral_plays['time_elapsed'].apply(lambda x: x if pd.notnull(x) and 0 < x < 45 else None)
    pace_data = neutral_plays.groupby('posteam')['time_elapsed'].mean().reset_index()
    pace_data.rename(columns={'time_elapsed': 'pace_seconds_per_play'}, inplace=True)
    
    # Play Action rate estimation: nflverse has 'play_type' and sometimes 'pass_type' or 'shotgun'.
    # True play action is tricky without premium PFF data. We'll use under-center pass rate as a proxy
    # or just use shotgun rate inversely for run-heavy PA teams.
    # Let's extract shotgun=0 and pass=1
    pa_data = plays[plays['pass'] == 1].groupby('posteam').agg(
        pass_plays=('play_id', 'count'),
        under_center_passes=('shotgun', lambda x: (x == 0).sum())
    ).reset_index()
    pa_data['play_action_rate'] = (pa_data['under_center_passes'] / pa_data['pass_plays']) * 100 * 2.5 # Approximate multiplier for PA
    
    # Merge metrics
    metrics = pd.merge(proe_data, edpr_data, on='posteam')
    metrics = pd.merge(metrics, pace_data, on='posteam', how='left')
    metrics = pd.merge(metrics, pa_data, on='posteam', how='left')
    
    # Simple coach map for 2023
    coach_map = {
        'MIA': ('Mike McDaniel', 'Frank Smith'),
        'LAC': ('Brandon Staley', 'Kellen Moore'),
        'BUF': ('Sean McDermott', 'Joe Brady'),
        'NE':  ('Bill Belichick', "Bill O'Brien"),
        'DAL': ('Mike McCarthy', 'Brian Schottenheimer'),
        'SF':  ('Kyle Shanahan', 'None'),
    }
    
    records = []
    for _, row in metrics.iterrows():
        team = str(row['posteam'])
        hc, oc = coach_map.get(team, ('Head Coach', 'OC'))
        records.append({
            "season": 2023,
            "team": team,
            "head_coach": hc,
            "offensive_coordinator": oc,
            "proe": float(row['proe']),
            "pace_seconds_per_play": float(row.get('pace_seconds_per_play', 27.5)),
            "early_down_pass_rate": float(row['early_down_pass_rate']),
            "play_action_rate": float(row.get('play_action_rate', 20.0))
        })
        
    print(f"Calculated metrics for {len(records)} teams.")
    
    if supabase:
        print("Uploading to Supabase...")
        try:
            supabase.table("coaching_metrics").upsert(records, on_conflict="season,team").execute()
            print("Upload complete.")
        except Exception as e:
            print(f"Insert failed: {e}")
    else:
        print("Supabase client not initialized.")

if __name__ == "__main__":
    build_coaching_tendencies()
