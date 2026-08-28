"""
Phase 4E: DFS Lineup Optimizer
Multi-lineup GPP generator using Integer Linear Programming (PuLP).
Supports DraftKings and FanDuel with exposure limits.
"""
import os
import json
from pulp import LpProblem, LpMaximize, LpVariable, lpSum, LpBinary, value, PULP_CBC_CMD
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env.local')

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ─── Platform Configurations ──────────────────────────────────────────────────
PLATFORM_CONFIG = {
    'dk': {
        'cap': 50000,
        'slots': {'QB': (1, 1), 'RB': (2, 3), 'WR': (3, 4), 'TE': (1, 2), 'DST': (1, 1)},
        'total_players': 9,
        'flex_positions': {'RB', 'WR', 'TE'},
    },
    'fd': {
        'cap': 60000,
        'slots': {'QB': (1, 1), 'RB': (2, 2), 'WR': (3, 3), 'TE': (1, 1), 'K': (1, 1), 'DST': (1, 1)},
        'total_players': 9,
        'flex_positions': set(),  # FD has no flex
    }
}

def load_player_pool(week: int, season: int, platform: str = 'dk') -> list[dict]:
    """Load player pool with salary + projection for the given week."""
    salaries = supabase.table('player_dfs_salaries').select(
        '*, players(id, name, position, team)'
    ).eq('week', week).eq('season', season).eq('platform', platform).execute().data

    # Fetch injuries
    injuries_data = supabase.table('player_injuries').select('*').eq('week', week).eq('season', season).execute().data
    injuries_map = {row['player_id']: row for row in injuries_data}

    pool = []
    for row in salaries:
        player = row.get('players') or {}
        pos = player.get('position')
        if pos not in ('QB', 'RB', 'WR', 'TE', 'DST', 'K'):
            continue
        if not row.get('salary') or not row.get('projected_pts'):
            continue
            
        pid = row['player_id']
        injury = injuries_map.get(pid, {})
        inj_status = (injury.get('report_status') or '').lower()
        prac_status = (injury.get('practice_status') or '').lower()
        
        play_prob = 1.0
        if inj_status in ('out', 'ir'):
            play_prob = 0.0
        elif inj_status == 'doubtful':
            play_prob = 0.15
        elif inj_status == 'questionable':
            if 'did not participate' in prac_status or prac_status == 'dnp':
                play_prob = 0.40
            elif 'limited' in prac_status or prac_status == 'lp':
                play_prob = 0.60
            elif 'full' in prac_status or prac_status == 'fp':
                play_prob = 0.85
            else:
                play_prob = 0.65
                
        pool.append({
            'player_id': pid,
            'name': player.get('name', 'Unknown'),
            'position': pos,
            'team': player.get('team', ''),
            'salary': row['salary'],
            'projected_pts': row['projected_pts'],
            'projected_ownership': row.get('projected_ownership', 0.15),
            'injury_status': inj_status,
            'play_probability': play_prob,
        })

    return pool

def optimize_lineup(
    pool: list[dict],
    platform: str = 'dk',
    mode: str = 'gpp',  # 'cash' or 'gpp'
    stack_team: str = None,  # force QB+WR/TE stack from this team
    max_ownership: float = None,  # max total ownership sum (GPP contrarian)
    excluded_player_ids: set = None,  # for exposure limiting in multi-lineup
    required_player_ids: set = None,  # forced inclusions
    prev_lineups: list = None,  # to avoid duplicate lineups
    cap_te: bool = True,
) -> dict | None:
    """Generate a single optimized lineup using ILP."""
    config = PLATFORM_CONFIG[platform]
    cap = config['cap']
    total_players = config['total_players']
    excluded_player_ids = excluded_player_ids or set()
    required_player_ids = required_player_ids or set()

    # Filter pool
    eligible = []
    for p in pool:
        if p['player_id'] in excluded_player_ids:
            continue
        # Exclude Out, IR, Doubtful (unless forced via required_player_ids)
        if p['player_id'] not in required_player_ids:
            if p.get('injury_status') in ('out', 'ir', 'doubtful'):
                continue
        eligible.append(p)
        
    if len(eligible) < total_players:
        return None

    # Create binary decision variables
    x = {p['player_id']: LpVariable(f"x_{p['player_id'][:8]}", cat=LpBinary) for p in eligible}

    prob = LpProblem("DFS_GPP_Optimizer", LpMaximize)

    # Objective: maximize projected pts (GPP also penalizes high ownership slightly)
    # We factor in play_probability (e.g. Questionable = 0.65) to penalize injury risks
    if mode == 'gpp':
        # Slightly favor lower-ownership players to differentiate from field
        prob += lpSum(
            (p['projected_pts'] * p.get('play_probability', 1.0) - 0.05 * p['projected_ownership'] * 100) * x[p['player_id']]
            for p in eligible
        )
    else:
        # Cash: pure projection maximization
        prob += lpSum(p['projected_pts'] * p.get('play_probability', 1.0) * x[p['player_id']] for p in eligible)

    # Salary cap constraint
    prob += lpSum(p['salary'] * x[p['player_id']] for p in eligible) <= cap

    # Total roster size
    prob += lpSum(x[p['player_id']] for p in eligible) == total_players

    # Positional constraints (min/max per slot)
    slots = config['slots']
    for pos, (min_count, max_count) in slots.items():
        pos_players = [p for p in eligible if p['position'] == pos]
        prob += lpSum(x[p['player_id']] for p in pos_players) >= min_count
        prob += lpSum(x[p['player_id']] for p in pos_players) <= max_count

    # Hard cap TEs to 1 (No 2-TE lineups for GPPs)
    if cap_te:
        te_players = [p for p in eligible if p['position'] == 'TE']
        if te_players:
            prob += lpSum(x[p['player_id']] for p in te_players) <= 1

    # Stack constraint (QB + at least 1 WR/TE from same team)
    if stack_team:
        team_qbs = [p for p in eligible if p['position'] == 'QB' and p['team'] == stack_team]
        team_pass_catchers = [p for p in eligible if p['position'] in ('WR', 'TE') and p['team'] == stack_team]
        if team_qbs and team_pass_catchers:
            qb_selected = lpSum(x[p['player_id']] for p in team_qbs)
            catchers_selected = lpSum(x[p['player_id']] for p in team_pass_catchers)
            # If QB from team is selected, need at least 1 pass catcher
            prob += catchers_selected >= qb_selected

    # Max aggregate ownership (contrarian GPP mode)
    if max_ownership is not None:
        prob += lpSum(p['projected_ownership'] * x[p['player_id']] for p in eligible) <= max_ownership

    # Required inclusions
    for pid in required_player_ids:
        if pid in x:
            prob += x[pid] == 1

    # Avoid duplicate lineups from previous runs
    if prev_lineups:
        for prev in prev_lineups[-5:]:  # only check last 5 lineups for performance
            prev_ids = {p['player_id'] for p in prev['players']}
            in_prev = [pid for pid in prev_ids if pid in x]
            if in_prev:
                # At least 1 player must differ
                prob += lpSum(x[pid] for pid in in_prev) <= len(in_prev) - 1

    # Solve silently
    prob.solve(PULP_CBC_CMD(msg=0))

    if prob.status != 1:
        return None

    # Extract lineup
    selected = [p for p in eligible if value(x[p['player_id']]) > 0.5]
    total_salary = sum(p['salary'] for p in selected)
    total_pts = sum(p['projected_pts'] for p in selected)
    total_ownership = sum(p['projected_ownership'] for p in selected)

    return {
        'players': selected,
        'total_salary': total_salary,
        'remaining_salary': cap - total_salary,
        'projected_pts': round(total_pts, 2),
        'avg_ownership': round(total_ownership / len(selected) * 100, 1),
        'platform': platform,
        'mode': mode,
    }

def generate_multi_lineup(
    week: int,
    season: int,
    platform: str = 'dk',
    n_lineups: int = 20,
    mode: str = 'gpp',
    stack_qb: bool = True,
    cap_te: bool = True,
    max_player_exposure: float = 0.60,  # player in at most 60% of lineups
    max_ownership_sum: float = None,
    is_json: bool = False,
    excluded_ids: set = None,
    locked_ids: set = None,
) -> list[dict]:
    """
    Generate N diversified lineups with exposure limits.
    
    Args:
        n_lineups: Number of lineups to generate
        max_player_exposure: Max fraction of lineups any single player appears in
        max_ownership_sum: Optional cap on total ownership per lineup (contrarian mode)
    """
    pool = load_player_pool(week, season, platform)
    if not pool:
        return []

    if not is_json: print(f"  Player pool: {len(pool)} players for Week {week}")

    # Find best team to stack (highest implied total)
    # We rotate through top teams across lineups
    from collections import defaultdict
    team_proj = defaultdict(float)
    for p in pool:
        if p['position'] in ('QB', 'WR', 'TE'):
            team_proj[p['team']] += p['projected_pts']
    top_teams = sorted(team_proj.keys(), key=lambda t: -team_proj[t])

    lineups = []
    player_appearances = defaultdict(int)
    max_appearances = max(1, int(n_lineups * max_player_exposure))

    for i in range(n_lineups):
        # Determine players to exclude based on exposure limits
        overexposed = {pid for pid, count in player_appearances.items() if count >= max_appearances}
        if excluded_ids:
            overexposed = overexposed.union(excluded_ids)

        # Rotate stack team
        stack_team = top_teams[i % min(5, len(top_teams))] if stack_qb else None

        lineup = optimize_lineup(
            pool=pool,
            platform=platform,
            mode=mode,
            stack_team=stack_team,
            max_ownership=max_ownership_sum,
            excluded_player_ids=overexposed,
            required_player_ids=locked_ids,
            prev_lineups=lineups,
            cap_te=cap_te,
        )

        if not lineup:
            if not is_json: print(f"  Warning: Could not generate lineup {i+1}")
            continue

        lineups.append(lineup)
        for p in lineup['players']:
            player_appearances[p['player_id']] += 1

        pts = lineup['projected_pts']
        sal = lineup['total_salary']
        own = lineup['avg_ownership']
        if not is_json: print(f"  Lineup {i+1:2d}: {pts:.1f} proj pts | ${sal:,} salary | {own:.1f}% avg ownership")

    return lineups

def format_lineup_output(lineups: list[dict]) -> dict:
    """Format lineups for API response."""
    # Compute player exposure stats
    from collections import defaultdict
    player_counts = defaultdict(int)
    player_names = {}
    for lineup in lineups:
        for p in lineup['players']:
            player_counts[p['player_id']] += 1
            player_names[p['player_id']] = p['name']

    exposure = [
        {
            'player_id': pid,
            'name': player_names[pid],
            'appearances': count,
            'exposure_pct': round(count / len(lineups) * 100, 1)
        }
        for pid, count in sorted(player_counts.items(), key=lambda x: -x[1])
    ]

    return {
        'lineups': lineups,
        'n_lineups': len(lineups),
        'exposure': exposure,
        'avg_projected_pts': round(sum(l['projected_pts'] for l in lineups) / len(lineups), 2) if lineups else 0,
    }

if __name__ == "__main__":
    import sys
    import json
    
    is_json = '--json' in sys.argv
    stack_qb = '--stack-qb-wr' in sys.argv
    cap_te = '--cap-te' in sys.argv
    
    args = [a for a in sys.argv if a not in ('--json', '--stack-qb-wr', '--cap-te')]
    
    week = int(args[1]) if len(args) > 1 else 14
    season = int(args[2]) if len(args) > 2 else 2026
    platform = args[3] if len(args) > 3 else 'dk'
    n = int(args[4]) if len(args) > 4 else 5
    
    # Check for --max-exposure=0.60 format
    max_exposure = 0.60
    excluded_ids = set()
    locked_ids = set()
    for a in sys.argv:
        if a.startswith('--max-exposure='):
            max_exposure = float(a.split('=')[1])
        elif a.startswith('--excluded='):
            val = a.split('=')[1]
            if val: excluded_ids = set(val.split(','))
        elif a.startswith('--locked='):
            val = a.split('=')[1]
            if val: locked_ids = set(val.split(','))
            
    max_own = float(args[6]) if len(args) > 6 else None

    if not is_json:
        print(f"\nGenerating {n} {platform.upper()} GPP lineups for Week {week}, {season}...")
        if stack_qb: print("Enforcing QB + WR/TE stacking.")
        print(f"Max exposure cap: {max_exposure*100}%")
        
    lineups = generate_multi_lineup(
        week=week, 
        season=season, 
        platform=platform, 
        n_lineups=n, 
        stack_qb=stack_qb,
        cap_te=cap_te,
        max_player_exposure=max_exposure, 
        max_ownership_sum=max_own, 
        is_json=is_json,
        excluded_ids=excluded_ids,
        locked_ids=locked_ids
    )
    result = format_lineup_output(lineups)

    if is_json:
        print(json.dumps(result))
    else:
        print(f"\n{'='*60}")
        print(f"Generated {result['n_lineups']} lineups | Avg projected: {result['avg_projected_pts']} pts")
        print(f"\nTop Exposure:")
        for p in result['exposure'][:10]:
            print(f"  {p['name']:<25} {p['exposure_pct']:>5.1f}%")
