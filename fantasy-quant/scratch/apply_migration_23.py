import os
import psycopg2
from urllib.parse import urlparse
from dotenv import load_dotenv

load_dotenv('.env.local')

db_url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
# Wait, I don't have the direct postgres connection string, but I can use supabase REST API via python.
# Actually I can use the supabase-py client to execute raw sql via rpc, but usually there's no exec_sql rpc.
# I'll just write a script that connects if we have postgres url, else wait, I used supabase client previously.
