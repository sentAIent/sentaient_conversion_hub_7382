import os
import math
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv('.env.local')

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not url or not key:
    print("Missing Supabase credentials.")
    exit(1)

supabase: Client = create_client(url, key)

def evaluate_week(season: int, week: int):
    print(f"Evaluating accuracy for {season} Week {week}...")
    
    # 1. Fetch actuals
    actuals_res = supabase.table('player_weekly_stats').select('player_id, fantasy_pts_ppr').eq('season', season).eq('week', week).execute()
    actuals = { row['player_id']: row['fantasy_pts_ppr'] for row in actuals_res.data }
    
    if not actuals:
        print("No actual stats found for this week.")
        return

    # 2. Fetch projections
    projections_res = supabase.table('player_projections').select('player_id, source_id, projected_pts').execute()
    
    # Group by source
    source_errors = {}
    
    for proj in projections_res.data:
        pid = proj['player_id']
        source = proj['source_id']
        pts = proj['projected_pts']
        
        if pid in actuals:
            error = (pts - actuals[pid]) ** 2
            if source not in source_errors:
                source_errors[source] = []
            source_errors[source].append(error)
            
    # 3. Calculate RMSE and Insert
    for source, errors in source_errors.items():
        if len(errors) > 0:
            rmse = math.sqrt(sum(errors) / len(errors))
            print(f"Source {source} | RMSE: {rmse:.4f} (n={len(errors)})")
            
            supabase.table('projection_accuracy').upsert({
                'source_id': source,
                'season': season,
                'week': week,
                'rmse': round(rmse, 4),
                'brier_score': None
            }, on_conflict='source_id,season,week').execute()

if __name__ == '__main__':
    # Typically run this on Tuesday morning for the previous week
    evaluate_week(2026, 1)
