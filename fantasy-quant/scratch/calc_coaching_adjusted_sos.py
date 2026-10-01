import pandas as pd
import json

# Pre-computed 2025 Defensive EPAs (from previous successful script)
def_epa_2025 = {
    'PHI': 0.0451, 'MIN': 0.0290, 'CLE': 0.0289, 'SEA': 0.0241, 'NO': 0.0236,
    'HOU': 0.0233, 'DET': 0.0220, 'LA': 0.0169, 'ATL': 0.0168, 'DAL': 0.0145,
    'WAS': 0.0143, 'NYG': 0.0097, 'JAX': 0.0094, 'MIA': 0.0060, 'TB': 0.0058,
    'IND': 0.0051, 'TEN': 0.0050, 'NE': 0.0041, 'BAL': 0.0040, 'ARI': 0.0032,
    'SF': -0.0001, 'CIN': -0.0004, 'KC': -0.0009, 'DEN': -0.0011, 'GB': -0.0025,
    'BUF': -0.0050, 'NYJ': -0.0074, 'LAC': -0.0087, 'PIT': -0.0143, 'CHI': -0.0156,
    'LV': -0.0168, 'CAR': -0.0194
}

# 2026 Defensive Coordinator Change Impacts
# Negative modifier means defense gets TOUGHER (lower EPA)
# Positive modifier means defense gets SOFTER (higher EPA)
coaching_modifiers = {
    'BUF': -0.015, # Jim Leonhard (Elite scheme boost)
    'PIT': -0.010, # Patrick Graham (Solid veteran addition)
    'TEN': -0.008, # Gus Bradley 
    'BAL': -0.005, # Anthony Weaver (Continuity but minor bump)
    'CLE': -0.005, # Mike Rutenberg
    'MIA': 0.005,  # Sean Duggan (First time DC, potential growing pains)
    'NE': 0.010,   # Zak Kuhr (Internal promotion, brain drain from previous regime)
    'NYJ': 0.005,  # Brian Duker 
    'LV': 0.008,   # Rob Leonard 
    'LAC': 0.015   # Chris O'Leary (College transition to NFL DC)
}

# Apply modifiers to get 2026 Projected Defensive EPA
proj_def_epa = {}
for team, epa in def_epa_2025.items():
    proj_def_epa[team] = epa + coaching_modifiers.get(team, 0.0)

# The 10 specific QBs and their teams
qb_teams = {
    'Maye': 'NE', 'Lawrence': 'JAX', 'CWilliams': 'CHI', 'Daniels': 'WAS',
    'Herbert': 'LAC', 'Purdy': 'SF', 'Prescott': 'DAL', 'Mahomes': 'KC',
    'Shough': 'NO', 'DART': 'NYG', 'Goff': 'DET'
}

import urllib.request
import io
url = "https://github.com/nflverse/nfldata/raw/master/data/games.csv"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
games_df = pd.read_csv(io.StringIO(response.read().decode('utf-8')))
df_26 = games_df[games_df['season'] == 2026]

results = []
for qb, team in qb_teams.items():
    opponents = []
    for _, row in df_26.iterrows():
        if row['home_team'] == team: opponents.append(row['away_team'])
        elif row['away_team'] == team: opponents.append(row['home_team'])
        
    opp_epas = [proj_def_epa.get(opp, 0) for opp in opponents]
    avg_proj_epa = sum(opp_epas)/len(opp_epas) if opp_epas else 0
    
    # Calculate original 2025 EPA for comparison
    orig_epas = [def_epa_2025.get(opp, 0) for opp in opponents]
    avg_orig_epa = sum(orig_epas)/len(orig_epas) if orig_epas else 0
    
    results.append({
        'QB': qb,
        'Team': team,
        'Orig_EPA': avg_orig_epa,
        'Proj_EPA': avg_proj_epa,
        'Delta': avg_proj_epa - avg_orig_epa
    })

df_res = pd.DataFrame(results)
# Sort by Easiest (highest EPA) to Hardest
df_res = df_res.sort_values(by=['Proj_EPA'], ascending=False)
df_res['New_Rank'] = range(1, len(df_res) + 1)

print("| Rank | Quarterback | Team | Proj. Opp Def EPA/Play | Shift from '25 |")
print("| :--- | :--- | :--- | :--- | :--- |")
for _, row in df_res.iterrows():
    shift_str = f"{row['Delta']:+.4f}"
    print(f"| {int(row['New_Rank'])} | {row['QB']} | {row['Team']} | {row['Proj_EPA']:+.4f} | {shift_str} |")
