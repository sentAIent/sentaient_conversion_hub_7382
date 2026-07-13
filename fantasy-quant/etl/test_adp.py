import pandas as pd
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

url = 'https://www.fantasypros.com/nfl/adp/overall.php'
try:
    dfs = pd.read_html(url)
    print(f"Found {len(dfs)} tables.")
    if len(dfs) > 0:
        df = dfs[0]
        print(df.head())
        print("Columns:", df.columns.tolist())
except Exception as e:
    print(f"Failed to scrape {url}: {e}")
