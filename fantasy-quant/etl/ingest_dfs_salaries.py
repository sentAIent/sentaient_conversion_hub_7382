"""
Phase 4D: DFS Salary ETL
Generates DraftKings + FanDuel salaries for 2023 season calibrated to
actual player performance. Also computes projected ownership.
"""
import os
import random
import math
from collections import defaultdict
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env.local')

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# DraftKings salary floors/ceilings per position (in $)
DK_SALARY_RANGES = {
    'QB': (5500, 8500),
    'RB': (4000, 9000),
    'WR': (3500, 9000),
    'TE': (2500, 7000),
    'DST': (2200, 4500),
}

# FanDuel salary ranges (slightly different scaling)
FD_SALARY_RANGES = {
    'QB': (6000, 9500),
    'RB': (4500, 9500),
    'WR': (3800, 9500),
    'TE': (2800, 7500),
    'DST': (3000, 5000),
}

# DraftKings lineup constraints
DK_SLOTS = {'QB': 1, 'RB': 2, 'WR': 3, 'TE': 1, 'FLEX': 1, 'DST': 1}
DK_CAP = 50000

# FanDuel lineup constraints (no FLEX)
FD_SLOTS = {'QB': 1, 'RB': 2, 'WR': 3, 'TE': 1, 'K': 1, 'DST': 1}
FD_CAP = 60000

def compute_salary(avg_ppr: float, position: str, salary_range: dict, week_noise: float = 0.0) -> int:
    """Map average PPR points to salary using position-specific scaling."""
    lo, hi = salary_range.get(position, (3000, 7000))

    if avg_ppr <= 0:
        return lo

    # Position-specific max expected points for scaling
    pos_max = {'QB': 35, 'RB': 30, 'WR': 28, 'TE': 22, 'DST': 18}.get(position, 25)

    # Clamp and normalize
    normalized = min(avg_ppr / pos_max, 1.0)

    # Apply sigmoid curve — top players get premium salary bumps
    curved = 1 / (1 + math.exp(-8 * (normalized - 0.5)))

    raw_salary = lo + curved * (hi - lo)

    # Add weekly variance (±5-12%)
    noise = random.uniform(-0.08, 0.10) + week_noise
    raw_salary = raw_salary * (1 + noise)

    # Round to nearest $100 (DK standard)
    return int(round(raw_salary / 100) * 100)

def compute_ownership(salary: int, salary_range: tuple, projected_pts: float, position: str) -> float:
    """
    Estimate projected ownership %.
    High salary + high projection = high ownership (chalk).
    Low salary + decent projection = low ownership (value play).
    """
    lo, hi = salary_range
    salary_pct = (salary - lo) / (hi - lo) if hi > lo else 0.5

    # Stars get 20-35% ownership, value plays 3-12%
    # Base ownership is driven by salary rank
    base_ownership = 0.03 + salary_pct * 0.30

    # Boost for high value score (pts per dollar)
    if salary > 0:
        value_score = projected_pts / salary * 1000
        pos_avg_value = {'QB': 0.5, 'RB': 0.55, 'WR': 0.5, 'TE': 0.45, 'DST': 0.6}.get(position, 0.5)
        if value_score > pos_avg_value * 1.3:  # 30% above average value = ownership boost
            base_ownership *= 1.25

    # Add some noise
    ownership = base_ownership * random.uniform(0.85, 1.15)
    return round(min(0.45, max(0.02, ownership)), 3)

def run():
    print("Loading players + weekly stats from Supabase...")
    stats = supabase.table('player_weekly_stats').select(
        'player_id, ppr_pts, half_ppr_pts, standard_pts, game_id, players(position, team, name), games(week, season)'
    ).execute().data
    print(f"  Loaded {len(stats)} stat records")

    # Compute per-player per-week PPR scores and season averages
    player_info = {}
    player_weekly_pts = defaultdict(dict)  # player_id -> week -> ppr_pts

    for row in stats:
        pid = row['player_id']
        player = row.get('players') or {}
        game = row.get('games') or {}
        pos = player.get('position')
        if pos not in DK_SALARY_RANGES:
            continue
        player_info[pid] = {'position': pos, 'team': player.get('team'), 'name': player.get('name')}
        week = game.get('week')
        if week:
            player_weekly_pts[pid][week] = row.get('ppr_pts') or 0.0

    # Compute rolling 3-game averages for weekly salary variation
    salary_records = []
    all_weeks = list(range(1, 19))

    for pid, info in player_info.items():
        pos = info['position']
        weekly = player_weekly_pts.get(pid, {})
        season_avg = sum(weekly.values()) / len(weekly) if weekly else 0.0

        for week in all_weeks:
            # Rolling 3-game average up to this week (simulates in-week salary setting)
            recent_weeks = [w for w in sorted(weekly.keys()) if w < week][-3:]
            if recent_weeks:
                rolling_avg = sum(weekly[w] for w in recent_weeks) / len(recent_weeks)
            else:
                rolling_avg = season_avg

            # Week-specific noise factor (hot/cold streaks affect salary)
            week_hot = 0.05 if rolling_avg > season_avg * 1.2 else (-0.05 if rolling_avg < season_avg * 0.8 else 0.0)

            # DK salary
            dk_salary = compute_salary(rolling_avg, pos, DK_SALARY_RANGES, week_hot)
            dk_proj = round(rolling_avg * random.uniform(0.9, 1.1), 2)
            dk_ownership = compute_ownership(dk_salary, DK_SALARY_RANGES[pos], dk_proj, pos)

            # FD salary (slightly different scaling)
            fd_salary = compute_salary(rolling_avg, pos, FD_SALARY_RANGES, week_hot)
            fd_proj = round(dk_proj * random.uniform(0.97, 1.03), 2)
            fd_ownership = compute_ownership(fd_salary, FD_SALARY_RANGES[pos], fd_proj, pos)

            salary_records.append({
                'player_id': pid, 'season': 2023, 'week': week,
                'platform': 'dk', 'salary': dk_salary,
                'projected_pts': dk_proj, 'projected_ownership': dk_ownership
            })
            salary_records.append({
                'player_id': pid, 'season': 2023, 'week': week,
                'platform': 'fd', 'salary': fd_salary,
                'projected_pts': fd_proj, 'projected_ownership': fd_ownership
            })

    print(f"Upserting {len(salary_records)} DFS salary records (DK + FD)...")
    chunk_size = 500
    success = 0
    for i in range(0, len(salary_records), chunk_size):
        chunk = salary_records[i:i+chunk_size]
        try:
            supabase.table('player_dfs_salaries').upsert(
                chunk, on_conflict='player_id,season,week,platform'
            ).execute()
            success += len(chunk)
        except Exception as e:
            print(f"  Error upserting chunk {i}: {e}")

    print(f"DFS Salary ETL Complete — {success} records upserted.")
    print(f"  Players with DK salaries: {len(player_info)}")
    print(f"  Weeks covered: 1-18, Platforms: DK + FD")

if __name__ == "__main__":
    run()
