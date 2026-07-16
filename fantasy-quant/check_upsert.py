import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env.local')

url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

supabase = create_client(url, key)
try:
    res = supabase.table('player_dfs_salaries').upsert([{
        'player_id': 'test1', 'season': 2023, 'week': 14, 'platform': 'dk',
        'salary': 5000, 'projected_pts': 15.0, 'projected_ownership': 0.1
    }]).execute()
    print("Success:", res)
except Exception as e:
    print("Error:", e)
