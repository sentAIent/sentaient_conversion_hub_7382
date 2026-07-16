import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Missing Supabase credentials")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def seed_contracts():
    print("Fetching top players to seed contracts...")
    # Fetch a few top QBs/WRs to seed with realistic contract data
    res = supabase.table("players").select("id, name").in_("name", ["Patrick Mahomes", "Justin Jefferson", "Christian McCaffrey"]).execute()
    
    players = {p["name"]: p["id"] for p in res.data}
    
    contracts = []
    
    if "Patrick Mahomes" in players:
        contracts.extend([
            {
                "player_id": players["Patrick Mahomes"],
                "signed_date": "2020-07-06",
                "total_value": 450000000,
                "guaranteed_amount": 141481905,
                "years": 10,
                "aav": 45000000,
                "current_cap_hit": 37033381,
                "is_active": True
            },
            {
                "player_id": players["Patrick Mahomes"],
                "signed_date": "2017-07-20",
                "total_value": 16427600,
                "guaranteed_amount": 16427600,
                "years": 4,
                "aav": 4106900,
                "current_cap_hit": None,
                "is_active": False
            }
        ])
        
    if "Justin Jefferson" in players:
        contracts.extend([
            {
                "player_id": players["Justin Jefferson"],
                "signed_date": "2024-06-03",
                "total_value": 140000000,
                "guaranteed_amount": 110000000,
                "years": 4,
                "aav": 35000000,
                "current_cap_hit": 8612000,
                "is_active": True
            },
            {
                "player_id": players["Justin Jefferson"],
                "signed_date": "2020-07-22",
                "total_value": 13122805,
                "guaranteed_amount": 13122805,
                "years": 4,
                "aav": 3280701,
                "current_cap_hit": None,
                "is_active": False
            }
        ])

    if contracts:
        print(f"Inserting {len(contracts)} mock contracts...")
        supabase.table("player_contracts").insert(contracts).execute()
        print("Success!")
    else:
        print("No matching players found to seed.")

if __name__ == "__main__":
    seed_contracts()
