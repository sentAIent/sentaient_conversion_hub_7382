"""
Phase 4A: Advanced Stats ETL
Pulls target share, snap counts, air yards, RACR, WOPR from nflverse via nflreadpy
"""
import os
import nflreadpy as nfl
import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env.local')

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def build_player_lookup():
    """Build gsis_id -> player UUID lookup from Supabase."""
    rows = supabase.table('players').select('id, gsis_id').not_('gsis_id', 'is', None).execute().data
    return {r['gsis_id']: r['id'] for r in rows if r.get('gsis_id')}

def build_game_lookup():
    """Build (season, week, home_team) -> game UUID lookup."""
    rows = supabase.table('games').select('id, season, week, home_team').execute().data
    return {(r['season'], r['week'], r['home_team']): r['id'] for r in rows}

def ingest_receiving_stats(player_lookup: dict):
    """Pull NGS receiving stats: target share, air yards, RACR, WOPR, ADOT."""
    print("Loading NGS receiving stats (2023)...")
    try:
        df = nfl.load_nextgen_stats(seasons=[2023], stat_type='receiving')
        df = df[df['season_type'] == 'REG'].copy()
        print(f"  Loaded {len(df)} receiving records")
    except Exception as e:
        print(f"  Failed to load NGS receiving: {e}")
        return []

    records = []
    for _, row in df.iterrows():
        player_id = player_lookup.get(row.get('player_gsis_id'))
        if not player_id:
            continue
        records.append({
            'player_id': player_id,
            'season': int(row.get('season', 2023)),
            'week': int(row.get('week', 0)),
            'target_share': float(row['target_share']) if pd.notna(row.get('target_share')) else None,
            'air_yards': float(row['avg_yac']) if pd.notna(row.get('avg_yac')) else None,  # avg yards after catch
            'adot': float(row['avg_intended_air_yards']) if pd.notna(row.get('avg_intended_air_yards')) else None,
            'racr': float(row['racr']) if pd.notna(row.get('racr')) else None,
            'wopr': float(row['wopr_x']) if pd.notna(row.get('wopr_x')) else (
                    float(row['wopr']) if pd.notna(row.get('wopr')) else None),
            'targets': int(row['targets']) if pd.notna(row.get('targets')) else None,
            'rec_pct': float(row['catch_percentage']) if pd.notna(row.get('catch_percentage')) else None,
        })
    return records

def ingest_snap_counts(player_lookup: dict):
    """Pull snap count percentages."""
    print("Loading snap counts (2023)...")
    try:
        df = nfl.load_snap_counts(seasons=[2023])
        df = df[df['game_type'] == 'REG'].copy()
        print(f"  Loaded {len(df)} snap count records")
    except Exception as e:
        print(f"  Failed to load snap counts: {e}")
        return []

    records = []
    for _, row in df.iterrows():
        player_id = player_lookup.get(row.get('pfr_id')) or player_lookup.get(row.get('gsis_id'))
        if not player_id:
            continue
        records.append({
            'player_id': player_id,
            'season': int(row.get('season', 2023)),
            'week': int(row.get('week', 0)),
            'snap_pct': float(row['offense_pct']) if pd.notna(row.get('offense_pct')) else None,
        })
    return records

def merge_and_upsert(receiving_records: list, snap_records: list):
    """Merge receiving + snap data keyed on (player_id, season, week) and upsert."""
    # Build lookup from snap data
    snap_lookup = {}
    for r in snap_records:
        key = (r['player_id'], r['season'], r['week'])
        snap_lookup[key] = r.get('snap_pct')

    # Merge snap_pct into receiving records
    for r in receiving_records:
        key = (r['player_id'], r['season'], r['week'])
        r['snap_pct'] = snap_lookup.get(key)

    print(f"Upserting {len(receiving_records)} advanced stat records...")
    chunk_size = 500
    success = 0
    for i in range(0, len(receiving_records), chunk_size):
        chunk = receiving_records[i:i+chunk_size]
        try:
            supabase.table('player_advanced_stats').upsert(
                chunk, on_conflict='player_id,season,week'
            ).execute()
            success += len(chunk)
        except Exception as e:
            print(f"  Error upserting chunk {i}: {e}")

    # Also upsert snap-only records for players not in receiving data
    receiving_keys = {(r['player_id'], r['season'], r['week']) for r in receiving_records}
    snap_only = [r for r in snap_records if (r['player_id'], r['season'], r['week']) not in receiving_keys]
    for i in range(0, len(snap_only), chunk_size):
        chunk = snap_only[i:i+chunk_size]
        try:
            supabase.table('player_advanced_stats').upsert(
                chunk, on_conflict='player_id,season,week'
            ).execute()
            success += len(chunk)
        except Exception as e:
            print(f"  Error upserting snap chunk {i}: {e}")

    print(f"Advanced Stats ETL Complete — {success} records upserted.")

if __name__ == "__main__":
    player_lookup = build_player_lookup()
    print(f"Player lookup: {len(player_lookup)} GSIS IDs mapped")

    receiving = ingest_receiving_stats(player_lookup)
    snaps = ingest_snap_counts(player_lookup)
    merge_and_upsert(receiving, snaps)
