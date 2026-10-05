import os
from supabase import create_client

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Check what columns are in game_level_sos_matrix
res = supabase.table("game_level_sos_matrix").select("*").limit(1).execute()
print("game_level_sos_matrix cols:", res.data[0].keys() if res.data else "Empty")

# Check if we have positional FPA data anywhere else
res2 = supabase.table("positional_fpa").select("*").limit(1).execute()
print("positional_fpa cols:", res2.data[0].keys() if res2.data else "Empty")
