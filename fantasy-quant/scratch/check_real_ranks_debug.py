import nfl_data_py as nfl
import pandas as pd

weekly = nfl.import_weekly_data([2023])
df = weekly[['position', 'opponent_team', 'fantasy_points_ppr']].copy()
df = df[df['position'].isin(['QB', 'RB', 'WR', 'TE'])]

fpa = df.groupby(['opponent_team', 'position'])['fantasy_points_ppr'].sum().reset_index()
fpa['rank'] = fpa.groupby('position')['fantasy_points_ppr'].rank(method='min', ascending=False)

# Let's see who is Rank 1 and Rank 32 for QB
qbs = fpa[fpa['position'] == 'QB'].sort_values('rank')
print("QB Defenses - Most points allowed (Rank 1) to Least (Rank 32):")
print(qbs.head(5))
print(qbs.tail(5))
