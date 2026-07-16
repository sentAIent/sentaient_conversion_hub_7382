import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env.local')

url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

supabase = create_client(url, key)

# Let's execute SQL to allow public select on player_dfs_salaries
res = supabase.rpc('exec_sql', {'query': 'ALTER TABLE player_dfs_salaries ENABLE ROW LEVEL SECURITY; CREATE POLICY "Allow public read access" ON player_dfs_salaries FOR SELECT USING (true);'}).execute()
print(res)
