import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env.local')

url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

supabase = create_client(url, key)
res = supabase.table('player_dfs_salaries').select('*').limit(5).execute()
print("Data:", res.data)
