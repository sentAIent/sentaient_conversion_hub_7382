import pandas as pd
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

url = 'https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries_2023.parquet'
df = pd.read_parquet(url)
print("Columns:", df.columns.tolist())
print(df.head())
