import requests
from bs4 import BeautifulSoup
import pandas as pd

url = 'https://www.fantasypros.com/nfl/adp/overall.php'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')
tables = soup.find_all('table')
print(f"Found {len(tables)} tables.")
if len(tables) > 0:
    for i, table in enumerate(tables):
        print(f"Table {i} ID: {table.get('id')}, Class: {table.get('class')}")
        try:
            df = pd.read_html(str(table))[0]
            print(df.head())
        except Exception as e:
            print(f"Error parsing table {i}: {e}")
