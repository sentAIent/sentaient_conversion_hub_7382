import nfl_data_py as nfl
import pandas as pd

print("Fetching schedules...")
df_26 = nfl.import_schedules([2026])
df_25 = nfl.import_schedules([2025])

teams = df_26['home_team'].unique().tolist()

# 1. 2025 Win Pct
wins = {}
games = {}
for _, row in df_25.iterrows():
    home = row['home_team']
    away = row['away_team']
    home_score = row.get('home_score', 0)
    away_score = row.get('away_score', 0)
    if pd.isna(home_score) or pd.isna(away_score): continue
    
    wins[home] = wins.get(home, 0)
    wins[away] = wins.get(away, 0)
    games[home] = games.get(home, 0) + 1
    games[away] = games.get(away, 0) + 1
    
    if home_score > away_score: wins[home] += 1
    elif away_score > home_score: wins[away] += 1
    else: 
        wins[home] += 0.5
        wins[away] += 0.5
win_pct = {t: wins[t]/games[t] for t in wins if games[t] > 0}

# 2. 2025 Def EPA
print("Fetching PBP...")
try:
    pbp_25 = nfl.import_pbp_data([2025])
    def_epa = pbp_25[pbp_25['play_type'].isin(['pass', 'run'])].groupby('defteam')['epa'].mean().reset_index()
    def_epa = def_epa.set_index('defteam')['epa'].to_dict()
except Exception as e:
    print("Could not load 2025 PBP", e)
    def_epa = {}

results = []
for team in teams:
    opponents = []
    for _, row in df_26.iterrows():
        if row['home_team'] == team: opponents.append(row['away_team'])
        elif row['away_team'] == team: opponents.append(row['home_team'])
        
    opp_pct = [win_pct.get(opp, 0.5) for opp in opponents]
    avg_pct = sum(opp_pct)/len(opp_pct) if opp_pct else 0.5
    
    opp_epas = [def_epa.get(opp, 0) for opp in opponents if def_epa.get(opp) is not None]
    avg_epa = sum(opp_epas)/len(opp_epas) if opp_epas else 0
    
    results.append({
        'Team': team, 
        'Avg_Opp_Def_EPA': avg_epa,
        'Opp_2025_Win_Pct': avg_pct
    })

df_res = pd.DataFrame(results)
# Sort by Easiest (Best) -> Hardest (Worst)
# Easiest = Highest Avg_Opp_Def_EPA
df_res = df_res.sort_values(by=['Avg_Opp_Def_EPA', 'Opp_2025_Win_Pct'], ascending=[False, True])
df_res['SOS_Rank'] = range(1, len(df_res) + 1)
df_res = df_res[['SOS_Rank', 'Team', 'Opp_2025_Win_Pct', 'Avg_Opp_Def_EPA']]

# Print markdown table
print("| Rank | Team | Opp '25 Win % | Avg Opp. Def EPA/Play |")
print("| :--- | :--- | :--- | :--- |")
for _, row in df_res.iterrows():
    print(f"| {int(row['SOS_Rank'])} | {row['Team']} | {row['Opp_2025_Win_Pct']:.3f} | {row['Avg_Opp_Def_EPA']:+.4f} |")
