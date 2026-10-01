import nfl_data_py as nfl
import pandas as pd

# Coaching Modifiers (2026 DC changes / roster turnover)
coaching_modifiers = {
    'BUF': -0.015,
    'PIT': -0.010,
    'TEN': -0.008,
    'BAL': -0.005,
    'CLE': -0.005,
    'MIA': 0.005,
    'NE': 0.010,
    'NYJ': 0.005,
    'LV': 0.008,
    'LAC': 0.015
}

try:
    pbp_25 = nfl.import_pbp_data([2025])
    def_epa = pbp_25[pbp_25['play_type'].isin(['pass', 'run'])].groupby('defteam')['epa'].mean().reset_index()
    def_epa = def_epa.set_index('defteam')['epa'].to_dict()
except Exception as e:
    def_epa = {}

proj_def_epa = {}
for team, epa in def_epa.items():
    proj_def_epa[team] = epa + coaching_modifiers.get(team, 0.0)

import urllib.request
import io
url = "https://github.com/nflverse/nfldata/raw/master/data/games.csv"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
games_df = pd.read_csv(io.StringIO(response.read().decode('utf-8')))

# Filter to 2026 Season and Fantasy Playoffs (Weeks 15, 16, 17)
df_26_playoffs = games_df[(games_df['season'] == 2026) & (games_df['week'].isin([15, 16, 17]))]
teams = games_df[games_df['season'] == 2026]['home_team'].unique().tolist()

results = []
for team in teams:
    opponents = []
    # Identify who they play in weeks 15-17
    for _, row in df_26_playoffs.iterrows():
        if row['home_team'] == team: opponents.append(row['away_team'])
        elif row['away_team'] == team: opponents.append(row['home_team'])
        
    opp_epas = [proj_def_epa.get(opp, 0) for opp in opponents if proj_def_epa.get(opp) is not None]
    avg_proj_epa = sum(opp_epas)/len(opp_epas) if opp_epas else 0
    
    orig_epas = [def_epa.get(opp, 0) for opp in opponents if def_epa.get(opp) is not None]
    avg_orig_epa = sum(orig_epas)/len(orig_epas) if orig_epas else 0
    
    results.append({
        'Team': team,
        'Playoff_Opponents': ", ".join(opponents),
        'Orig_EPA': avg_orig_epa,
        'Proj_EPA': avg_proj_epa,
        'Delta': avg_proj_epa - avg_orig_epa
    })

df_res = pd.DataFrame(results)
# Sort by Easiest (highest EPA) to Hardest
df_res = df_res.sort_values(by=['Proj_EPA'], ascending=False)
df_res['New_Rank'] = range(1, len(df_res) + 1)

print("| Playoff Rank | Team | Weeks 15-17 Opponents | Proj. Opp Def EPA/Play |")
print("| :--- | :--- | :--- | :--- |")
for _, row in df_res.iterrows():
    print(f"| {int(row['New_Rank'])} | {row['Team']} | {row['Playoff_Opponents']} | {row['Proj_EPA']:+.4f} |")
