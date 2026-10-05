import pandas as pd
url = "https://github.com/nflverse/nflverse-data/releases/download/player_stats/player_stats_2023.parquet"
df = pd.read_parquet(url)
print("Available columns in player_stats:", list(df.columns))
