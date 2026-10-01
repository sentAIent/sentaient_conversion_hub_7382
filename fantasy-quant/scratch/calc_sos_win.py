import nfl_data_py as nfl
import pandas as pd

df_26 = nfl.import_schedules([2026])

teams = {
    'Maye': 'NE',
    'Lawrence': 'JAX',
    'CWilliams': 'CHI',
    'Daniels': 'WAS',
    'Herbert': 'LAC',
    'Purdy': 'SF',
    'Prescott': 'DAL',
    'Mahomes': 'KC',
    'Shough': 'NO',
    'DART': 'NYG',
    'Goff': 'DET'
}

# Fetch 2025 standings (or 2024 if 2025 doesn't exist)
try:
    standings = nfl.import_schedules([2025])
    # calculate win percentage from the schedules. 
    # nfl_data_py doesn't have an import_standings, so we calculate it from games!
    wins = {}
    games = {}
    for _, row in standings.iterrows():
        home = row['home_team']
        away = row['away_team']
        home_score = row.get('home_score', 0)
        away_score = row.get('away_score', 0)
        
        if pd.isna(home_score) or pd.isna(away_score):
            continue
            
        wins[home] = wins.get(home, 0)
        wins[away] = wins.get(away, 0)
        games[home] = games.get(home, 0) + 1
        games[away] = games.get(away, 0) + 1
        
        if home_score > away_score:
            wins[home] += 1
        elif away_score > home_score:
            wins[away] += 1
        else:
            wins[home] += 0.5
            wins[away] += 0.5
            
    win_pct = {t: wins[t]/games[t] for t in wins if games[t] > 0}
except Exception as e:
    win_pct = {}

results = []
for qb, team in teams.items():
    opponents = []
    for _, row in df_26.iterrows():
        if row['home_team'] == team:
            opponents.append(row['away_team'])
        elif row['away_team'] == team:
            opponents.append(row['home_team'])
            
    opp_pct = [win_pct.get(opp, 0.5) for opp in opponents]
    avg_pct = sum(opp_pct)/len(opp_pct) if opp_pct else 0.5
    results.append({'QB': qb, 'Team': team, 'Opp_2025_Win_Pct': round(avg_pct, 3)})

df_res = pd.DataFrame(results)
# Sort by HARDEST schedule first (highest win pct -> hardest)
df_res = df_res.sort_values(by='Opp_2025_Win_Pct', ascending=False)
df_res['SOS_Rank'] = range(1, len(df_res) + 1)
print(df_res.to_string(index=False))
