import os
import time
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("VITE_SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: SUPABASE_URL and SUPABASE_KEY must be set.")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

apps = [
    {"id": "interstellar", "name": "Interstellar Game", "type": "Website", "url": "https://interstellar.local"},
    {"id": "mindwave", "name": "Mindwave", "type": "Website", "url": "https://mindwave.local"},
    {"id": "sentaient", "name": "sentaient.com", "type": "Website", "url": "https://sentaient.com"},
    {"id": "cloveh2o", "name": "cloveh2o.com", "type": "Website", "url": "https://cloveh2o.com"},
    {"id": "fantasy-quant", "name": "Fantasy Quant", "type": "Website", "url": "https://fantasyquant.local"},
    {"id": "contango-quant", "name": "Contango Quant", "type": "API", "url": "https://api.contangoquant.local"},
    {"id": "icebreaker", "name": "Icebreaker", "type": "Website", "url": "https://icebreaker.local"},
    {"id": "helu-ai-avatar", "name": "Helu AI Avatar", "type": "Website", "url": "https://heluaiavatar.local"},
    {"id": "matrix", "name": "Matrix", "type": "API", "url": "https://api.matrix.local"},
    {"id": "snowboarders-only", "name": "Snowboarder's Only/Paradise", "type": "Mobile", "url": "https://snowboardersonly.local"},
    {"id": "lightspeed", "name": "LightSpeed", "type": "Website", "url": "https://lightspeed.local"},
    {"id": "liquid", "name": "Liquid", "type": "Website", "url": "https://liquid.local"},
    {"id": "legal-eagle", "name": "Legal Eagle", "type": "Website", "url": "https://legaleagle.local"},
]

def populate():
    print("Populating LightSpeed database with portfolio applications...")
    for app in apps:
        # Check if exists
        res = supabase.table('apps').select('id').eq('id', app['id']).execute()
        if not res.data:
            print(f"Inserting {app['name']}...")
            supabase.table('apps').insert(app).execute()
            
            # Also add mock credentials for some of them so e2e tester can work
            if app['id'] in ['sentaient', 'interstellar', 'mindwave']:
                supabase.table('app_credentials').insert({
                    'app_id': app['id'],
                    'username': f'test_{app["id"]}@domain.com',
                    'password': 'testpassword123!'
                }).execute()
        else:
            print(f"Skipping {app['name']} (Already exists)")
            
    print("Done populating apps!")

if __name__ == "__main__":
    populate()
