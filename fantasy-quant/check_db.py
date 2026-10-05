import os
from supabase import create_client

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

response = supabase.table("game_level_sos_matrix").select("team").limit(1).execute()
print("game_level_sos_matrix:", response.data)

response2 = supabase.table("micro_matchups").select("offensive_team").limit(1).execute()
print("micro_matchups:", response2.data)
