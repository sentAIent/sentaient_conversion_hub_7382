import pandas as pd
import urllib.request
import io

print("Fetching schedules directly...")
url = "https://github.com/nflverse/nfldata/raw/master/data/games.csv"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req)
games_df = pd.read_csv(io.StringIO(response.read().decode('utf-8')))

df_26 = games_df[games_df['season'] == 2026]
df_25 = games_df[games_df['season'] == 2025]

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

results = []
for team in teams:
    opponents = []
    for _, row in df_26.iterrows():
        if row['home_team'] == team: opponents.append(row['away_team'])
        elif row['away_team'] == team: opponents.append(row['home_team'])
        
    opp_pct = [win_pct.get(opp, 0.5) for opp in opponents]
    avg_pct = sum(opp_pct)/len(opp_pct) if opp_pct else 0.5
    
    results.append({
        'Team': team, 
        'Opp_2025_Win_Pct': avg_pct
    })

df_res = pd.DataFrame(results)
# Sort by Easiest (Best) -> Hardest (Worst)
# Easiest = Lowest Opp_2025_Win_Pct
df_res = df_res.sort_values(by=['Opp_2025_Win_Pct'], ascending=[True])
df_res['SOS_Rank'] = range(1, len(df_res) + 1)
df_res = df_res[['SOS_Rank', 'Team', 'Opp_2025_Win_Pct']]

# Print markdown table
print("| Rank | Team | Opp '25 Win % |")
print("| :--- | :--- | :--- |")
for _, row in df_res.iterrows():
    print(f"| {int(row['SOS_Rank'])} | {row['Team']} | {row['Opp_2025_Win_Pct']:.3f} |")
