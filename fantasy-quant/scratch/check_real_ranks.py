import nfl_data_py as nfl
import pandas as pd

print("Downloading real 2023 weekly data...")
weekly = nfl.import_weekly_data([2023])

# Filter columns
df = weekly[['player_display_name', 'position', 'recent_team', 'opponent_team', 'fantasy_points_ppr']].copy()
df = df[df['position'].isin(['QB', 'RB', 'WR', 'TE'])]

# Sum fantasy points allowed by each defense (opponent_team) to each position
fpa = df.groupby(['opponent_team', 'position'])['fantasy_points_ppr'].sum().reset_index()

# Rank the defenses for each position
# Rank 1 = most points allowed (Easiest matchup = green)
# Rank 32 = fewest points allowed (Hardest matchup = red)
fpa['rank'] = fpa.groupby('position')['fantasy_points_ppr'].rank(method='min', ascending=False)

print(fpa[fpa['opponent_team'] == 'DAL'])
