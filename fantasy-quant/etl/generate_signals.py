import os
import sys
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Missing Supabase credentials")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def generate_signals():
    print("--- Generating Premium Player Signals ---")
    
    # 1. Clear existing signals for the current context (e.g. week 14, 2023)
    # We'll use hardcoded 2023 Week 14 for now to match our other scripts
    season = 2023
    week = 14
    
    print(f"Cleaning old signals for {season} Week {week}...")
    # NOTE: Since there's no bulk delete without matching ids in python client easily, 
    # we just let upsert do its job, or we can fetch and delete. 
    # For now we'll just upsert new signals.
    
    signals_to_insert = []
    
    # Fetch players and injuries
    print("Fetching active injuries...")
    injuries_res = supabase.table("player_injuries").select("player_id, injury_status, practice_status").eq("season", season).eq("week", week).execute()
    injuries = injuries_res.data
    
    for inj in injuries:
        player_id = inj["player_id"]
        status = str(inj.get("injury_status", "")).lower()
        
        if 'out' in status or 'ir' in status:
            signals_to_insert.append({
                "player_id": player_id,
                "season": season,
                "week": week,
                "signal_type": "NEGATIVE",
                "category": "INJURY",
                "description": f"Player is declared OUT."
            })
        elif 'doubtful' in status or 'questionable' in status:
            signals_to_insert.append({
                "player_id": player_id,
                "season": season,
                "week": week,
                "signal_type": "NEGATIVE",
                "category": "INJURY",
                "description": f"Player is {status.upper()}, carries playing time risk."
            })

    # In a real scenario, we'd also process:
    # - Opponent Defense (Schedule strength)
    # - Opportunity (e.g., Starter ahead of them is OUT -> POSITIVE for this player)
    
    # Let's add some mock POSITIVE opportunity signals for demonstration
    # We will pick 2 random players to give positive signals to.
    players_res = supabase.table("players").select("id, name").limit(5).execute()
    for idx, p in enumerate(players_res.data):
        if idx < 2:
            signals_to_insert.append({
                "player_id": p["id"],
                "season": season,
                "week": week,
                "signal_type": "POSITIVE",
                "category": "OPPORTUNITY",
                "description": f"Favorable matchup: Opposing defense ranks poorly against {p['name']}'s position."
            })
            
    if signals_to_insert:
        print(f"Inserting {len(signals_to_insert)} signals...")
        
        # We don't have a UNIQUE constraint that fits perfectly for upserting multiple signals per player, 
        # so we will delete existing ones for this week and then insert.
        supabase.table("player_signals").delete().eq("season", season).eq("week", week).execute()
        
        chunk_size = 500
        for i in range(0, len(signals_to_insert), chunk_size):
            supabase.table("player_signals").insert(signals_to_insert[i:i+chunk_size]).execute()
            
        print("Signal generation complete!")
    else:
        print("No signals generated.")

if __name__ == "__main__":
    generate_signals()
