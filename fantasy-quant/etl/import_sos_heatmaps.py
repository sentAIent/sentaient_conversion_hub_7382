import nfl_data_py as nfl
import pandas as pd
import os
from supabase import create_client

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

try:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    print("Error connecting to Supabase")
    supabase = None

def get_latest_defensive_stats():
    for year in [2026, 2025, 2024, 2023]:
        try:
            weekly = nfl.import_weekly_data([year])
            if not weekly.empty:
                print(f"Loaded baseline data from {year}")
                return weekly
        except:
            pass
    raise Exception("Could not fetch baseline data.")

def build_heatmaps():
    print("Recalculating 2026 SOS & Defensive Rankings from DB Ground Truth...")
    
    weekly = get_latest_defensive_stats()
    weekly = weekly[weekly['week'] <= 18].copy()
    
    # Normalize LA to LAR
    weekly.loc[weekly['opponent_team'] == 'LA', 'opponent_team'] = 'LAR'
    
    df = weekly[['position', 'opponent_team', 'fantasy_points_ppr', 'week']].copy()
    df = df[df['position'].isin(['QB', 'RB', 'WR', 'TE'])]
    
    games_played = df.groupby('opponent_team')['week'].nunique()
    fpa = df.groupby(['opponent_team', 'position'])['fantasy_points_ppr'].sum().reset_index()
    fpa['games'] = fpa['opponent_team'].map(games_played)
    fpa['ppg'] = fpa['fantasy_points_ppr'] / fpa['games']
    
    if supabase:
        print("Checking DB for roster updates...")
        players_res = supabase.table('players').select('name, team, position').execute()
        coaches_res = supabase.table('coaching_metrics').select('team, head_coach, offensive_coordinator').eq('season', 2026).execute()
        
        la_elite_defenders = [p for p in players_res.data if p['team'] == 'LAR' and p['name'] in ['Aaron Donald', 'Myles Garrett', 'Trent McDuffie']]
        
        if len(la_elite_defenders) >= 3:
            print(f"-> Verified Elite Super-Defense (Donald, Garrett, McDuffie) on LA Rams. MASSIVE defensive boost.")
            fpa.loc[fpa['opponent_team'] == 'LAR', 'ppg'] *= 0.55
        elif len(la_elite_defenders) == 2:
            print(f"-> Verified Elite DL on LA Rams. Boosting defense.")
            fpa.loc[fpa['opponent_team'] == 'LAR', 'ppg'] *= 0.70
            
        mia_coach = next((c for c in coaches_res.data if c['team'] == 'MIA'), None)
        if mia_coach and 'Vacant' in str(mia_coach.get('head_coach', '')):
            print("-> Verified Mike McDaniel left MIA. Downgrading defensive efficiency.")
            fpa.loc[fpa['opponent_team'] == 'MIA', 'ppg'] *= 1.30
            
        lac_coach = next((c for c in coaches_res.data if c['team'] == 'LAC'), None)
        if lac_coach and lac_coach.get('offensive_coordinator') == 'Mike McDaniel':
            print("-> Verified Mike McDaniel on LAC. Adjusting LAC pacing metrics.")
            fpa.loc[fpa['opponent_team'] == 'LAC', 'ppg'] *= 0.85 

    fpa['rank'] = fpa.groupby('position')['ppg'].rank(method='min', ascending=False)
    
    def_ranks = {}
    for _, row in fpa.iterrows():
        team = row['opponent_team']
        pos = row['position']
        if team not in def_ranks:
            def_ranks[team] = {}
        def_ranks[team][pos] = {
            'ppg': round(row['ppg'], 2),
            'rank': int(row['rank'])
        }
        
    schedules = nfl.import_schedules([2023]) 
    reg_season = schedules[schedules['game_type'] == 'REG'].copy()
    
    # Normalize LA to LAR in schedules too
    reg_season.loc[reg_season['home_team'] == 'LA', 'home_team'] = 'LAR'
    reg_season.loc[reg_season['away_team'] == 'LA', 'away_team'] = 'LAR'
    
    heatmaps = []
    
    for _, game in reg_season.iterrows():
        week = int(game['week'])
        home = game['home_team']
        away = game['away_team']
        
        for pos in ['QB', 'RB', 'WR', 'TE']:
            if away in def_ranks:
                heatmaps.append({
                    "season": 2026,
                    "week": week,
                    "team": home,
                    "opponent": away,
                    "position": pos,
                    "sos_rank": def_ranks[away][pos]['rank']
                })
            if home in def_ranks:
                heatmaps.append({
                    "season": 2026,
                    "week": week,
                    "team": away,
                    "opponent": home,
                    "position": pos,
                    "sos_rank": def_ranks[home][pos]['rank']
                })
                
    if supabase:
        print(f"Upserting {len(heatmaps)} rows to positional_sos_heatmaps...")
        batch_size = 1000
        for i in range(0, len(heatmaps), batch_size):
            batch = heatmaps[i:i+batch_size]
            supabase.table('positional_sos_heatmaps').upsert(batch, on_conflict="season,position,team,week").execute()
            
        print("Upserting defensive rankings...")
        flat_ranks = []
        for team, positions in def_ranks.items():
            for pos, data in positions.items():
                flat_ranks.append({
                    "season": 2026,
                    "week": 1,
                    "team": team,
                    "vs_position": pos,
                    "fpts_allowed": data['ppg'],
                    "rank_vs_position": data['rank']
                })
        
        supabase.table('defensive_rankings').delete().eq('season', 2026).eq('week', 1).execute()
        supabase.table('defensive_rankings').insert(flat_ranks).execute()
        
        print("Successfully synchronized all SOS & Rankings downstream!")

if __name__ == "__main__":
    build_heatmaps()
