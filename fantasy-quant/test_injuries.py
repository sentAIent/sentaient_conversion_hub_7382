import os
import requests
from dotenv import load_dotenv

load_dotenv('.env.local')
url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

res = requests.get(
    f"{url}/rest/v1/player_injuries?limit=1",
    headers={"apikey": key, "Authorization": f"Bearer {key}"}
)
print("Injuries Columns:", list(res.json()[0].keys()) if res.json() else "Table empty")
