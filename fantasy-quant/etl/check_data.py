import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env.local')

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

player_id = "d4ada4c3-e582-497c-b42c-c67bac7a5f97"
adp = supabase.table('player_adp').select('*').eq('player_id', player_id).execute()
injuries = supabase.table('player_injuries').select('*').eq('player_id', player_id).execute()

print(f"ADP records: {len(adp.data)}")
print(f"Injury records: {len(injuries.data)}")
