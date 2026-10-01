import nfl_data_py as nfl
import pandas as pd

# Load 2026 schedule
df_26 = nfl.import_schedules([2026])

# Teams we care about
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

# Try to load 2025 standings
try:
    pbp_25 = nfl.import_pbp_data([2025])
    # calculate defensive EPA per play for each team
    def_epa = pbp_25[pbp_25['play_type'].isin(['pass', 'run'])].groupby('defteam')['epa'].mean().reset_index()
    def_epa = def_epa.set_index('defteam')['epa'].to_dict()
except Exception as e:
    print("Could not load 2025 PBP", e)
    # Mock some defensive EPAs if missing
    def_epa = {}

# Calculate average opponent def_epa for each team
results = []
for qb, team in teams.items():
    opponents = []
    for _, row in df_26.iterrows():
        if row['home_team'] == team:
            opponents.append(row['away_team'])
        elif row['away_team'] == team:
            opponents.append(row['home_team'])
            
    opp_epas = [def_epa.get(opp, 0) for opp in opponents if def_epa.get(opp) is not None]
    avg_epa = sum(opp_epas)/len(opp_epas) if opp_epas else 0
    results.append({'QB': qb, 'Team': team, 'Avg_Opp_Def_EPA': avg_epa})

df_res = pd.DataFrame(results)
# Sort by easiest schedule (highest defensive EPA allowed -> easiest)
# Wait, higher defensive EPA means defense is WORSE (they give up more EPA). 
# So higher Avg_Opp_Def_EPA = EASIEST schedule.
df_res = df_res.sort_values(by='Avg_Opp_Def_EPA', ascending=False)
df_res['SOS_Rank'] = range(1, len(df_res) + 1)
print(df_res)
