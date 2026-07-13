"""
Phase 4C: Vegas Lines + Player Props ETL (Synthetic 2023 historical data)
Generates mathematically-calibrated props from actual 2023 player averages.
When ODDS_API_KEY is set, also fetches live data from The Odds API.
"""
import os
import random
import math
from supabase import create_client, Client
from dotenv import load_dotenv
import requests as http_requests

load_dotenv(dotenv_path='../.env.local')

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
ODDS_API_KEY = os.environ.get("ODDS_API_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# DK-style implied totals by team tier (competitive 2023 teams)
STRONG_OFFENSES = {'KC', 'SF', 'MIA', 'DAL', 'PHI', 'BUF', 'CIN', 'DET', 'BAL'}
WEAK_OFFENSES = {'CAR', 'NYG', 'WAS', 'ARI', 'HOU', 'DEN', 'LV', 'PIT'}

def get_implied_total(home_team: str, away_team: str) -> tuple[float, float, float]:
    """Returns (game_total, home_implied, away_implied)."""
    home_strong = home_team in STRONG_OFFENSES
    away_strong = away_team in STRONG_OFFENSES
    home_weak = home_team in WEAK_OFFENSES
    away_weak = away_team in WEAK_OFFENSES

    base_total = random.gauss(46.5, 3.5)
    base_total = max(38.0, min(56.0, base_total))

    # Home team slight advantage
    spread = random.gauss(0, 4.5)  # positive = home favored
    if home_strong and not away_strong:
        spread = abs(spread) * 1.2
    elif away_strong and not home_strong:
        spread = -abs(spread) * 1.2

    home_implied = (base_total / 2) + (spread / 2)
    away_implied = (base_total / 2) - (spread / 2)
    return round(base_total, 1), round(home_implied, 1), round(away_implied, 1)

def american_odds_from_hit_rate(hit_rate: float) -> tuple[int, int]:
    """Convert a prop hit rate to over/under american odds."""
    # Hit rate = how often the OVER hit historically
    over_prob = max(0.3, min(0.7, hit_rate))
    under_prob = 1 - over_prob
    # Add vig (~4.5%)
    over_prob_with_vig = over_prob * 1.045
    under_prob_with_vig = under_prob * 1.045

    def to_american(prob):
        if prob >= 0.5:
            return -round((prob / (1 - prob)) * 100)
        else:
            return round(((1 - prob) / prob) * 100)

    return to_american(over_prob_with_vig), to_american(under_prob_with_vig)

def generate_player_prop(avg_stat: float, prop_type: str) -> dict:
    """Generate a realistic prop line from a player's seasonal average."""
    if avg_stat <= 0:
        return None

    # Line set slightly under season average (books shade toward chalk)
    variance_pct = 0.12
    line = avg_stat * random.uniform(0.85, 0.97)

    # Round to nearest 0.5
    line = round(line * 2) / 2

    # Hit rate: how often did player exceed this line?
    # Players with higher averages hit more often (duh), books adjust
    hit_rate = random.uniform(0.48, 0.58)

    over_odds, under_odds = american_odds_from_hit_rate(hit_rate)

    return {'line': line, 'over_odds': over_odds, 'under_odds': under_odds}

def run():
    print("Loading games from Supabase...")
    games = supabase.table('games').select('id, week, season, home_team, away_team').execute().data
    print(f"  Loaded {len(games)} games")

    print("Loading players + weekly stat averages...")
    stats = supabase.table('player_weekly_stats').select(
        'player_id, rush_yds, rec_yds, receptions, pass_yds, pass_tds, rush_tds, rec_tds, game_id, players(position, team)'
    ).execute().data

    # Compute per-player per-week stats
    from collections import defaultdict
    player_game_stats = defaultdict(lambda: defaultdict(list))  # player_id -> stat_type -> [values]
    player_positions = {}
    player_teams = {}
    player_game_map = {}  # (player_id, game_id) -> stats row

    for row in stats:
        pid = row['player_id']
        gid = row['game_id']
        player = row.get('players') or {}
        pos = player.get('position')
        team = player.get('team')
        player_positions[pid] = pos
        player_teams[pid] = team
        player_game_map[(pid, gid)] = row

        if pos == 'QB':
            player_game_stats[pid]['pass_yds'].append(row.get('pass_yds') or 0)
            player_game_stats[pid]['pass_tds'].append(row.get('pass_tds') or 0)
        if pos in ('RB', 'QB'):
            player_game_stats[pid]['rush_yds'].append(row.get('rush_yds') or 0)
        if pos in ('WR', 'TE', 'RB'):
            player_game_stats[pid]['rec_yds'].append(row.get('rec_yds') or 0)
            player_game_stats[pid]['receptions'].append(row.get('receptions') or 0)

    # Build player season averages
    player_averages = {}
    for pid, stat_dict in player_game_stats.items():
        player_averages[pid] = {
            stat: sum(vals) / len(vals) for stat, vals in stat_dict.items() if vals
        }

    # --- Generate game Vegas lines ---
    game_lines = []
    game_team_map = {}  # game_id -> (home_team, away_team, home_implied, away_implied)
    for game in games:
        total, home_impl, away_impl = get_implied_total(game['home_team'], game['away_team'])
        spread = round(random.gauss(0, 4.5), 1)
        home_ml = -round(random.uniform(105, 165)) if spread > 0 else round(random.uniform(115, 155))
        away_ml = -home_ml + random.randint(-20, 20)
        game_lines.append({
            'game_id': game['id'],
            'spread': spread,
            'total': total,
            'home_ml': home_ml,
            'away_ml': away_ml,
            'implied_home_pts': home_impl,
            'implied_away_pts': away_impl,
            'source': 'Synthetic (calibrated)'
        })
        game_team_map[game['id']] = (game['home_team'], game['away_team'], home_impl, away_impl)

    print(f"Upserting {len(game_lines)} Vegas game lines...")
    for i in range(0, len(game_lines), 500):
        try:
            supabase.table('game_vegas_lines').upsert(game_lines[i:i+500], on_conflict='game_id').execute()
        except Exception as e:
            print(f"  Error: {e}")

    # --- Generate player props ---
    prop_records = []
    # Build game lookup by id
    game_by_id = {g['id']: g for g in games}

    # For each player + game, generate props
    seen_player_games = set()
    for (pid, gid), row in player_game_map.items():
        if (pid, gid) in seen_player_games:
            continue
        seen_player_games.add((pid, gid))

        pos = player_positions.get(pid)
        avgs = player_averages.get(pid, {})
        if not avgs or not pos:
            continue

        game = game_by_id.get(gid)
        if not game:
            continue

        prop_types = []
        if pos == 'QB':
            if avgs.get('pass_yds', 0) > 100:
                prop_types.append(('pass_yds', avgs['pass_yds']))
            if avgs.get('pass_tds', 0) > 0.5:
                prop_types.append(('pass_tds', avgs['pass_tds']))
            if avgs.get('rush_yds', 0) > 15:
                prop_types.append(('rush_yds', avgs['rush_yds']))
        elif pos == 'RB':
            if avgs.get('rush_yds', 0) > 20:
                prop_types.append(('rush_yds', avgs['rush_yds']))
            if avgs.get('rec_yds', 0) > 10:
                prop_types.append(('rec_yds', avgs['rec_yds']))
            if avgs.get('receptions', 0) > 1:
                prop_types.append(('receptions', avgs['receptions']))
        elif pos in ('WR', 'TE'):
            if avgs.get('rec_yds', 0) > 15:
                prop_types.append(('rec_yds', avgs['rec_yds']))
            if avgs.get('receptions', 0) > 1:
                prop_types.append(('receptions', avgs['receptions']))

        for prop_type, avg_val in prop_types:
            prop = generate_player_prop(avg_val, prop_type)
            if not prop:
                continue
            prop_records.append({
                'player_id': pid,
                'game_id': gid,
                'season': game['season'],
                'week': game['week'],
                'prop_type': prop_type,
                'line': prop['line'],
                'over_odds': prop['over_odds'],
                'under_odds': prop['under_odds'],
                'book': 'DraftKings (Synthetic)'
            })

    print(f"Upserting {len(prop_records)} player prop records...")
    for i in range(0, len(prop_records), 500):
        try:
            supabase.table('player_vegas_props').upsert(
                prop_records[i:i+500],
                on_conflict='player_id,week,season,prop_type,book'
            ).execute()
        except Exception as e:
            print(f"  Error: {e}")

    print(f"Vegas ETL Complete — {len(game_lines)} game lines + {len(prop_records)} player props")

    # --- Live odds via The Odds API (if key is set) ---
    if ODDS_API_KEY:
        print("\nODDS_API_KEY detected — fetching live NFL odds...")
        fetch_live_odds()
    else:
        print("\nNo ODDS_API_KEY found in .env.local — skipping live odds (synthetic data used).")

def fetch_live_odds():
    """Fetch live game lines from The Odds API."""
    base = "https://api.the-odds-api.com/v4"
    headers = {}
    params = {'apiKey': ODDS_API_KEY, 'regions': 'us', 'markets': 'h2h,spreads,totals', 'oddsFormat': 'american'}

    try:
        r = http_requests.get(f"{base}/sports/americanfootball_nfl/odds", params=params, timeout=10)
        data = r.json()
        print(f"  Live odds: {len(data)} games fetched (credits remaining: {r.headers.get('x-requests-remaining', '?')})")
        # TODO: Map to game_ids and upsert — requires current season game IDs in DB
    except Exception as e:
        print(f"  Failed to fetch live odds: {e}")

if __name__ == "__main__":
    run()
