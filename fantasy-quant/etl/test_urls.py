import pandas as pd
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

try:
    df_injuries = pd.read_parquet('https://github.com/nflverse/nflverse-data/releases/download/injuries/injuries.parquet')
    print("Injuries Columns:", df_injuries.columns.tolist())
    print("Injuries Sample Rows:", len(df_injuries))
except Exception as e:
    print("Failed to read injuries:", e)

try:
    df_adp = pd.read_parquet('https://github.com/nflverse/nflverse-data/releases/download/adp/adp.parquet')
    print("ADP Columns:", df_adp.columns.tolist())
    print("ADP Sample Rows:", len(df_adp))
except Exception as e:
    print("Failed to read ADP adp.parquet:", e)

try:
    df_adp2 = pd.read_parquet('https://github.com/nflverse/nflverse-data/releases/download/adp/fantasy_adp.parquet')
    print("ADP2 Columns:", df_adp2.columns.tolist())
    print("ADP2 Sample Rows:", len(df_adp2))
except Exception as e:
    print("Failed to read ADP adp/fantasy_adp.parquet:", e)
