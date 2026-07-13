"""
Live Odds ETL — Pulls real DraftKings game lines + player props from The Odds API.
Stores into game_vegas_lines and player_vegas_props.
Run weekly (or on-demand) during the NFL season.

Usage:
  python ingest_odds_live.py              # game lines only (cheap: 1 credit)
  python ingest_odds_live.py --props      # + player props (costs ~1 credit/game)
  python ingest_odds_live.py --props --week 1  # store as specific week
"""
import os
import sys
import json
import time
import argparse
import requests
from datetime import datetime, timezone
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env.local')

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
ODDS_API_KEY = os.environ.get("ODDS_API_KEY")
BASE_URL = "https://api.the-odds-api.com/v4"
BOOK = "draftkings"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ─── DK Player Prop market keys ───────────────────────────────────────────────
PROP_MARKETS = [
    "player_pass_yds",
    "player_pass_tds",
    "player_rush_yds",
    "player_rush_tds",
    "player_reception_yds",
    "player_receptions",
    "player_anytime_td",
]

# Normalize Odds API market key → our DB prop_type
MARKET_TO_PROP = {
    "player_pass_yds":      "pass_yds",
    "player_pass_tds":      "pass_tds",
    "player_rush_yds":      "rush_yds",
    "player_rush_tds":      "rush_tds",
    "player_reception_yds": "rec_yds",
    "player_receptions":    "receptions",
    "player_anytime_td":    "anytime_td",
}

# Full team name → NFL abbreviation (as used in our DB)
TEAM_MAP = {
    "Arizona Cardinals": "ARI", "Atlanta Falcons": "ATL", "Baltimore Ravens": "BAL",
    "Buffalo Bills": "BUF", "Carolina Panthers": "CAR", "Chicago Bears": "CHI",
    "Cincinnati Bengals": "CIN", "Cleveland Browns": "CLE", "Dallas Cowboys": "DAL",
    "Denver Broncos": "DEN", "Detroit Lions": "DET", "Green Bay Packers": "GB",
    "Houston Texans": "HOU", "Indianapolis Colts": "IND", "Jacksonville Jaguars": "JAX",
    "Kansas City Chiefs": "KC", "Las Vegas Raiders": "LV", "Los Angeles Chargers": "LAC",
    "Los Angeles Rams": "LA", "Miami Dolphins": "MIA", "Minnesota Vikings": "MIN",
    "New England Patriots": "NE", "New Orleans Saints": "NO", "New York Giants": "NYG",
    "New York Jets": "NYJ", "Philadelphia Eagles": "PHI", "Pittsburgh Steelers": "PIT",
    "San Francisco 49ers": "SF", "Seattle Seahawks": "SEA", "Tampa Bay Buccaneers": "TB",
    "Tennessee Titans": "TEN", "Washington Commanders": "WAS",
}

def abbrev(full_name: str) -> str:
    return TEAM_MAP.get(full_name, full_name)


def credits_used(resp: requests.Response) -> tuple[str, str]:
    return resp.headers.get("x-requests-used", "?"), resp.headers.get("x-requests-remaining", "?")

def fetch_events() -> list[dict]:
    """Fetch upcoming NFL events. Costs 0 credits."""
    r = requests.get(f"{BASE_URL}/sports/americanfootball_nfl/events",
                     params={"apiKey": ODDS_API_KEY}, timeout=10)
    r.raise_for_status()
    events = r.json()
    print(f"  Events fetched: {len(events)}")
    return events

def fetch_game_lines(events: list[dict]) -> list[dict]:
    """Fetch DK game lines (spreads, totals, h2h) — costs 1 credit total."""
    r = requests.get(f"{BASE_URL}/sports/americanfootball_nfl/odds",
                     params={
                         "apiKey": ODDS_API_KEY,
                         "regions": "us",
                         "markets": "h2h,spreads,totals",
                         "oddsFormat": "american",
                         "bookmakers": BOOK,
                     }, timeout=10)
    r.raise_for_status()
    used, remaining = credits_used(r)
    print(f"  Game lines fetched. Credits used: {used} | Remaining: {remaining}")
    return r.json()

def fetch_props_for_event(event_id: str) -> list[dict]:
    """Fetch player props for a single game — costs 1 credit per call."""
    markets_str = ",".join(PROP_MARKETS)
    r = requests.get(
        f"{BASE_URL}/sports/americanfootball_nfl/events/{event_id}/odds",
        params={
            "apiKey": ODDS_API_KEY,
            "regions": "us",
            "markets": markets_str,
            "oddsFormat": "american",
            "bookmakers": BOOK,
        }, timeout=15)
    if r.status_code == 404:
        return []
    r.raise_for_status()
    used, remaining = credits_used(r)

    data = r.json()
    # API returns either a single game object or an array — normalize
    if isinstance(data, list):
        return data
    return [data]

def infer_week_from_date(commence_time: str) -> int:
    """
    Map a game's commence_time to NFL week number.
    NFL 2026 Week 1 = Sep 10. Each week starts Thursday.
    """
    dt = datetime.fromisoformat(commence_time.replace("Z", "+00:00"))
    # NFL 2026 season opener
    season_start = datetime(2026, 9, 10, tzinfo=timezone.utc)
    delta_days = (dt - season_start).days
    week = max(1, (delta_days // 7) + 1)
    return min(week, 18)

def build_player_name_lookup() -> dict[str, str]:
    """player display_name -> player UUID (best-effort fuzzy match)."""
    rows = supabase.table("players").select("id, name").execute().data
    lookup = {}
    for r in rows:
        name = r.get("name", "").strip()
        if name:
            lookup[name.lower()] = r["id"]
    return lookup

def upsert_game_lines(events: list[dict], game_lines: list[dict], season: int = 2026) -> dict[str, dict]:
    """Upsert game_vegas_lines. Returns event_id -> {game_id, week, home, away} map."""
    # Build event_id -> game_odds lookup
    odds_by_id = {g["id"]: g for g in game_lines}

    # Ensure games exist in our games table (or skip if not)
    existing_games = supabase.table("games").select("id, home_team, away_team, week, season").eq("season", season).execute().data
    game_lookup = {(g["home_team"], g["away_team"]): g for g in existing_games}

    event_to_game = {}
    lines_to_upsert = []

    for event in events:
        eid = event["id"]
        home = abbrev(event["home_team"])
        away = abbrev(event["away_team"])
        week = infer_week_from_date(event["commence_time"])

        # Find matching game in our DB
        game = game_lookup.get((home, away))
        if not game:
            # Try to insert a minimal game record
            try:
                result = supabase.table("games").insert({
                    "season": season, "week": week,
                    "home_team": home, "away_team": away,
                    "game_date": event["commence_time"][:10],
                    "nflverse_game_id": f"{season}_{week:02d}_{away}_{home}"
                }).execute()
                if result.data:
                    game = result.data[0]
                    # Update our lookup in case we process it again somehow
                    game_lookup[(home, away)] = game
            except Exception as e:
                print(f"    Skipping {away} @ {home}: {e}")
                continue

        if not game:
            continue

        game_id = game["id"]
        event_to_game[eid] = {"game_id": game_id, "week": week, "home": home, "away": away}

        odds = odds_by_id.get(eid, {})
        bookmakers = odds.get("bookmakers", [])
        dk_odds = next((b for b in bookmakers if b["key"] == BOOK), None)
        if not dk_odds:
            continue

        mkts = {m["key"]: m["outcomes"] for m in dk_odds["markets"]}

        total_over = next((o["point"] for o in mkts.get("totals", []) if o["name"] == "Over"), None)
        spread_home = next((o["point"] for o in mkts.get("spreads", []) if o["name"] == home), None)
        home_ml = next((o["price"] for o in mkts.get("h2h", []) if o["name"] == home), None)
        away_ml = next((o["price"] for o in mkts.get("h2h", []) if o["name"] == away), None)

        implied_home = implied_away = None
        if total_over and spread_home is not None:
            implied_home = round(total_over / 2 - spread_home / 2, 1)
            implied_away = round(total_over / 2 + spread_home / 2, 1)

        lines_to_upsert.append({
            "game_id": game_id,
            "spread": spread_home,
            "total": total_over,
            "home_ml": home_ml,
            "away_ml": away_ml,
            "implied_home_pts": implied_home,
            "implied_away_pts": implied_away,
            "source": f"DraftKings (Live — {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')})",
        })

    if lines_to_upsert:
        print(f"  Upserting {len(lines_to_upsert)} game lines...")
        for i in range(0, len(lines_to_upsert), 100):
            try:
                supabase.table("game_vegas_lines").upsert(lines_to_upsert[i:i+100], on_conflict="game_id").execute()
            except Exception as e:
                print(f"    Error: {e}")

    return event_to_game

def upsert_props(event_id: str, prop_data: list[dict], event_meta: dict,
                 player_lookup: dict, season: int = 2026):
    """Parse and upsert player props for a single game."""
    game_id = event_meta["game_id"]
    week = event_meta["week"]

    records = []
    for game in prop_data:
        for bk in game.get("bookmakers", []):
            if bk["key"] != BOOK:
                continue
            for market in bk["markets"]:
                prop_type = MARKET_TO_PROP.get(market["key"])
                if not prop_type:
                    continue
                # Each outcome is a player bet
                for outcome in market["outcomes"]:
                    player_name = outcome.get("description", "").strip()
                    bet_name = outcome["name"]  # "Over" or "Under"
                    point = outcome.get("point")
                    price = outcome["price"]

                    if not player_name or point is None:
                        continue

                    player_id = player_lookup.get(player_name.lower())
                    if not player_id:
                        continue

                    # Find or create the record for this player+prop
                    existing = next((r for r in records
                                     if r["player_id"] == player_id and r["prop_type"] == prop_type), None)
                    if not existing:
                        existing = {
                            "player_id": player_id,
                            "game_id": game_id,
                            "season": season,
                            "week": week,
                            "prop_type": prop_type,
                            "line": point,
                            "over_odds": None,
                            "under_odds": None,
                            "book": "DraftKings",
                        }
                        records.append(existing)

                    if bet_name == "Over":
                        existing["over_odds"] = price
                    elif bet_name == "Under":
                        existing["under_odds"] = price

    if records:
        try:
            supabase.table("player_vegas_props").upsert(
                records, on_conflict="player_id,week,season,prop_type,book"
            ).execute()
            print(f"    ✓ {len(records)} props upserted for week {week}")
        except Exception as e:
            print(f"    Error upserting props: {e}")

def run(fetch_props: bool = False, season: int = 2026, max_prop_games: int = 16):
    if not ODDS_API_KEY:
        print("ERROR: ODDS_API_KEY not found in .env.local")
        return

    print(f"\n{'='*60}")
    print(f"Live Odds ETL — DraftKings | Props: {'YES' if fetch_props else 'NO'}")
    print(f"{'='*60}\n")

    # Step 1: Get events
    print("Step 1: Fetching NFL events...")
    events = fetch_events()

    # Step 2: Game lines (1 credit)
    print("\nStep 2: Fetching DK game lines...")
    game_lines = fetch_game_lines(events)

    # Step 3: Upsert game lines
    print("\nStep 3: Upserting game lines to Supabase...")
    event_to_game = upsert_game_lines(events, game_lines, season=season)
    print(f"  {len(event_to_game)} games mapped")

    # Step 4: Player props (optional, ~1 credit/game)
    if fetch_props:
        player_lookup = build_player_name_lookup()
        print(f"\nStep 4: Fetching player props ({min(max_prop_games, len(events))} games, ~{min(max_prop_games, len(events))} credits)...")

        games_with_props = 0
        for i, event in enumerate(events[:max_prop_games]):
            eid = event["id"]
            meta = event_to_game.get(eid)
            if not meta:
                continue
            print(f"  [{i+1}/{min(max_prop_games, len(events))}] {event['away_team']} @ {event['home_team']}...")
            try:
                prop_data = fetch_props_for_event(eid)
                if prop_data:
                    upsert_props(eid, prop_data, meta, player_lookup, season=season)
                    games_with_props += 1
                else:
                    print(f"    No props available yet")
                time.sleep(0.3)  # be gentle with the API
            except Exception as e:
                print(f"    Error: {e}")

        print(f"\n  Props fetched for {games_with_props}/{min(max_prop_games, len(events))} games")

    print(f"\n✅ Live Odds ETL Complete!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--props", action="store_true", help="Fetch player props (costs ~1 credit/game)")
    parser.add_argument("--season", type=int, default=2026)
    parser.add_argument("--max-games", type=int, default=16, help="Max games to fetch props for")
    args = parser.parse_args()
    run(fetch_props=args.props, season=args.season, max_prop_games=args.max_games)
