import pandas as pd
import nfl_data_py as nfl
import json
import random

print("Loading NFL data...")
try:
    years = [2023, 2024, 2025]
    seasonal_data = nfl.import_seasonal_data(years)
except Exception as e:
    print(f"Warning: Could not fetch all years from nfl_data_py ({e}). Falling back to 2023/2024 or mock data.")
    try:
        seasonal_data = nfl.import_seasonal_data([2023, 2024])
    except:
        print("Fallback failed. Generating mock seasonal baseline data.")
        seasonal_data = pd.DataFrame(columns=['gsis_id', 'season', 'fantasy_points_ppr', 'games'])

print("Data loaded. Processing...")

# We need to map player IDs to names.
ids = nfl.import_ids()
player_map = ids[['gsis_id', 'name', 'position', 'birthdate']].dropna(subset=['gsis_id', 'name'])

if 'player_id' in seasonal_data.columns:
    seasonal_data.rename(columns={'player_id': 'gsis_id'}, inplace=True)

seasonal_data = seasonal_data.merge(player_map, on='gsis_id', how='left')

points_data = {}

for _, row in seasonal_data.iterrows():
    name = row['name']
    year = row['season']
    pts = row['fantasy_points_ppr'] if 'fantasy_points_ppr' in row else row.get('fantasy_points', 0)
    games = row['games']
    pos = row['position']
    
    if pd.isna(pts) or pd.isna(games) or games == 0:
        continue
        
    if name not in points_data:
        points_data[name] = {'2023': 0, '2024': 0, '2025': 0, 'pos': pos}
        
    points_data[name][str(year)] = pts / games

# Now load 2026 active rosters
roster_2026 = pd.read_csv('roster_2026.csv')
roster_2026 = roster_2026[roster_2026['team'] != 'FA']
active_players = roster_2026[roster_2026['position'].isin(['QB', 'RB', 'WR', 'TE'])]

coaching_matrix = {
    'ATL': {'pace': 1.05, 'run_heavy': False},
    'SF': {'pace': 0.98, 'run_heavy': True},
    'BAL': {'pace': 0.95, 'run_heavy': True},
    'KC': {'pace': 1.02, 'run_heavy': False},
    'DAL': {'pace': 1.05, 'run_heavy': False},
    'LAC': {'pace': 1.10, 'run_heavy': False}, # Mike McDaniel OC -> high pace, high efficiency
}

projections = []

for _, row in active_players.iterrows():
    name = row['full_name']
    team = row['team']
    pos = row['position']
    
    if name in points_data:
        p23 = points_data[name]['2023']
        p24 = points_data[name]['2024']
        p25 = points_data[name]['2025']
        
        baseline_ppg = (p25 * 0.6) + (p24 * 0.3) + (p23 * 0.1)
        if p25 == 0 and p24 > 0:
            baseline_ppg = (p24 * 0.7) + (p23 * 0.3)
    else:
        if pos == 'QB': baseline_ppg = 15.0
        elif pos == 'RB': baseline_ppg = 10.0
        elif pos == 'WR': baseline_ppg = 8.0
        else: baseline_ppg = 6.0
        
    team_mod = coaching_matrix.get(team, {'pace': 1.0, 'run_heavy': False})
    
    proj_ppg = baseline_ppg * team_mod['pace']
    
    if team_mod['run_heavy']:
        if pos == 'RB': proj_ppg *= 1.1
        elif pos in ['WR', 'TE']: proj_ppg *= 0.9
        
    total_points = proj_ppg * 17
    total_points += random.uniform(-10, 10)
    total_points = max(0, total_points)
    
    projections.append({
        'Player': name,
        'Pos': pos,
        'Team': team,
        'Proj': round(total_points, 1)
    })

projections.sort(key=lambda x: x['Proj'], reverse=True)
top_200 = projections[:200]

print("Top 200 calculated. Saving to markdown...")

with open('/Users/ute/.gemini/antigravity/brain/c537b53d-0120-4c75-b74c-06f69078f03b/top_200_offensive_players.md', 'w') as f:
    f.write("# 2026 Top 200 Offensive Players (Advanced Engine)\n\n")
    f.write("| Rank | Player | Pos | Team | Projected Points |\n")
    f.write("|---|---|---|---|---|\n")
    for i, p in enumerate(top_200):
        f.write(f"| {i+1} | {p['Player']} | {p['Pos']} | {p['Team']} | {p['Proj']} |\n")

print("Done!")
