"""
Phase 4B: Defensive Rankings ETL
Aggregates fantasy points allowed per position per week from player_weekly_stats
"""
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env.local')

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def run():
    print("Loading all weekly stats...")
    # Pull all stats with game + player info
    stats = supabase.table('player_weekly_stats').select(
        'ppr_pts, game_id, player_id, games(week, season, home_team, away_team), players(position, team)'
    ).execute().data

    print(f"  Loaded {len(stats)} stat records")

    # Build per-game defensive data
    # For each stat row, identify the OPPOSING team (the defense being attacked)
    from collections import defaultdict
    defense_data = defaultdict(list)  # (def_team, season, week, position) -> list of ppr_pts

    for row in stats:
        if not row.get('games') or not row.get('players'):
            continue
        game = row['games']
        player = row['players']
        pos = player.get('position')
        if pos not in ('QB', 'RB', 'WR', 'TE'):
            continue
        off_team = player.get('team')
        home = game.get('home_team')
        away = game.get('away_team')
        if not off_team or not home or not away:
            continue
        # The defensive team is whichever team the offensive player is NOT on
        def_team = away if off_team == home else home
        key = (def_team, game['season'], game['week'], pos)
        defense_data[key].append(row.get('ppr_pts') or 0.0)

    # Compute average pts allowed per defense per position per week
    records = []
    for (team, season, week, vs_position), pts_list in defense_data.items():
        avg_pts = sum(pts_list) / len(pts_list) if pts_list else 0
        records.append({
            'team': team,
            'season': season,
            'week': week,
            'vs_position': vs_position,
            'fpts_allowed': round(avg_pts, 2),
        })

    # Compute weekly ranks per position
    from itertools import groupby
    records_by_week_pos = defaultdict(list)
    for r in records:
        records_by_week_pos[(r['season'], r['week'], r['vs_position'])].append(r)

    for group in records_by_week_pos.values():
        group.sort(key=lambda x: x['fpts_allowed'], reverse=True)  # most pts allowed = rank 1 (best matchup)
        for rank, r in enumerate(group, 1):
            r['rank_vs_position'] = rank

    print(f"Upserting {len(records)} defensive ranking records...")
    chunk_size = 500
    for i in range(0, len(records), chunk_size):
        chunk = records[i:i+chunk_size]
        try:
            supabase.table('defensive_rankings').upsert(
                chunk, on_conflict='team,season,week,vs_position'
            ).execute()
        except Exception as e:
            print(f"  Error upserting chunk {i}: {e}")

    print("Defensive Rankings ETL Complete!")

if __name__ == "__main__":
    run()
