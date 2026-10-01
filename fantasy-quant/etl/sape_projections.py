import os
import json
import math
import requests
from dotenv import load_dotenv
from collections import defaultdict

load_dotenv()

SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

def fetch_data():
    """
    Simulated fetch for required baseline data.
    In production, this integrates with nflverse, vegas lines, and local Supabase tables.
    """
    print("Fetching player baseline, vegas implied totals, and injury reports...")
    
    # Baseline expected volume for a few mock players (based on snap share / past opportunity)
    baseline = {
        'p_mahomes_kc': {'position': 'QB', 'team': 'KC', 'exp_pass_att': 38.0, 'exp_rush_att': 4.5, 'historical_target_share': 0},
        'c_kupp_lar':   {'position': 'WR', 'team': 'LAR', 'exp_targets': 9.5, 'historical_target_share': 0.28},
        'p_nacua_lar':  {'position': 'WR', 'team': 'LAR', 'exp_targets': 8.0, 'historical_target_share': 0.25},
        'c_mccaffrey_sf': {'position': 'RB', 'team': 'SF', 'exp_rush_att': 16.0, 'exp_targets': 5.5, 'historical_target_share': 0.18}
    }
    
    # 2026 Coaching Schemes & Pace Data
    coaching_schemes = {
        'LAR': 'mcvay_spread', # passing tilt
        'KC':  'reid_west_coast',
        'SF':  'shanahan_wide_zone', # rushing tilt
        'ATL': 'stefanski_heavy_run' # rushing tilt
    }
    team_pace = {
        'LAR': 1.05, # fast pace
        'KC':  1.02,
        'SF':  0.95, # slow pace
        'ATL': 0.90
    }
    standings = {
        'KC': {'wins': 13, 'seed_clinched': True},
        'SF': {'wins': 12, 'seed_clinched': False},
        'LAR': {'wins': 8, 'seed_clinched': False}
    }
    
    # Active injury list (e.g., Puka is Out)
    injuries = {
        'p_nacua_lar': 'out'
    }
    
    # Defensive Matchup EPA Multipliers (1.0 = average, >1 = easier matchup)
    matchups = {
        'LAR': 1.15, # Opposing defense is bad against pass
        'KC':  0.95, # Opposing defense is slightly tough
        'SF':  1.08  # Opposing defense is slightly weak against run
    }
    
    # Resting starters for week 17/18
    resting_starters = {
        'c_mccaffrey_sf': 'resting',
        'p_mahomes_kc': 'resting'
    }
    
    # Backups who are starting
    starting_backups = {
        'e_mitchell_sf': {'position': 'RB', 'team': 'SF', 'exp_rush_att': 14.0, 'exp_targets': 3.0, 'is_backup_for': 'c_mccaffrey_sf'},
        'c_wentz_kc': {'position': 'QB', 'team': 'KC', 'exp_pass_att': 32.0, 'exp_rush_att': 2.0, 'is_backup_for': 'p_mahomes_kc'}
    }
    
    baseline.update(starting_backups)
    
    return baseline, injuries, matchups, resting_starters, coaching_schemes, team_pace, standings


def compute_projections(baseline, injuries, matchups, resting_starters, coaching_schemes, team_pace, standings):
    print("Executing SAPE Multi-Variable Impact Model (MVIM)...")
    
    projections = []
    
    # Module 2: The Dynamic Injury Matrix (DIM) - Teammate Target Vacuum
    # Pre-calculate target reallocation for teams with injured receivers
    team_vacated_targets = defaultdict(float)
    team_healthy_receivers = defaultdict(list)
    
    for pid, data in baseline.items():
        team = data['team']
        if injuries.get(pid) == 'out':
            team_vacated_targets[team] += data.get('exp_targets', 0)
        elif data['position'] in ['WR', 'TE', 'RB']:
            team_healthy_receivers[team].append(pid)

    for pid, data in baseline.items():
        if injuries.get(pid) == 'out':
            continue # Don't project out players
            
        team = data['team']
        pos = data['position']
        
        modifier_trail = {}
        
        # 1. Scheme-Adjusted Volume Shifts
        scheme = coaching_schemes.get(team, 'balanced')
        exp_pass = data.get('exp_pass_att', 0)
        exp_rush = data.get('exp_rush_att', 0)
        exp_tgts = data.get('exp_targets', 0)
        
        if scheme in ['shanahan_wide_zone', 'stefanski_heavy_run']:
            # Shift passing volume to rushing volume (Mock logic: 10% shift)
            exp_pass *= 0.9
            exp_tgts *= 0.9
            exp_rush *= 1.1
            modifier_trail['scheme_shift'] = 'run_heavy'
        elif scheme in ['mcvay_spread']:
            # Shift rushing to passing
            exp_pass *= 1.1
            exp_tgts *= 1.1
            exp_rush *= 0.9
            modifier_trail['scheme_shift'] = 'pass_heavy'
            
        # Base Expected Volume (BEV)
        if pos == 'QB':
            base_pts = (exp_pass * 0.5) + (exp_rush * 0.7)
        else:
            base_pts = (exp_tgts * 1.5) + (exp_rush * 0.8)
            
        # Pace of Play Adjustment
        pace_multiplier = team_pace.get(team, 1.0)
        base_pts *= pace_multiplier
        modifier_trail['pace_multiplier'] = pace_multiplier
            
        modifier_trail['base_volume_pts'] = round(base_pts, 2)
        
        # 2. Dynamic Injury Matrix (DIM) Allocation
        injury_adjusted_pts = base_pts
        if pos in ['WR', 'TE', 'RB'] and team_vacated_targets[team] > 0:
            # Reallocate vacated targets based on historical share of remaining players
            # Simplified heuristic: equal distribution among top targets
            healthy_count = len(team_healthy_receivers[team])
            if healthy_count > 0:
                bonus_targets = team_vacated_targets[team] / healthy_count
                bonus_pts = bonus_targets * 1.5
                injury_adjusted_pts += bonus_pts
                modifier_trail['injury_vacuum_bonus_pts'] = round(bonus_pts, 2)
        
        # 3. Matchup Multiplier
        matchup_mult = matchups.get(team, 1.0)
        final_adjusted_pts = injury_adjusted_pts * matchup_mult
        modifier_trail['matchup_multiplier'] = matchup_mult
        
        # 3.5 Resting Starter Backup Boost
        is_backup_for = data.get('is_backup_for')
        if is_backup_for and resting_starters.get(is_backup_for) == 'resting':
            # Boost the projection by 15% because the team gameplan relies heavily on the starter's role
            backup_boost = final_adjusted_pts * 0.15
            final_adjusted_pts += backup_boost
            modifier_trail['resting_starter_backup_boost_pts'] = round(backup_boost, 2)
            
        # 4. Playoff Clinch Rest Risk Probability
        # If week is 15-17 and team clinched seed, high chance of resting starters
        team_standings = standings.get(team, {})
        rest_risk_prob = 0.0
        # Mocking Week 16 context
        if team_standings.get('seed_clinched', False):
            # Starters have 95% rest risk
            if not is_backup_for:
                rest_risk_prob = 0.95
                modifier_trail['rest_risk_prob'] = 0.95
        
        # 5. Standard Deviation for Floor/Ceiling
        # E.g., QBs have less variance (15%), WRs have high variance (35%)
        variance_pct = {'QB': 0.15, 'RB': 0.22, 'WR': 0.35, 'TE': 0.40}.get(pos, 0.25)
        
        floor = final_adjusted_pts * (1 - variance_pct)
        ceiling = final_adjusted_pts * (1 + variance_pct)
        
        projections.append({
            'player_id': pid,
            'season': 2023, # To update to 2026
            'week': 16, # Modeling late season
            'league_type': 'SEASON',
            'base_expected_volume_opportunities': round(exp_tgts + exp_rush, 2),
            'base_projection_ppr': round(base_pts, 2),
            'adjusted_projection_ppr': round(final_adjusted_pts, 2),
            'floor_ppr': round(floor, 2),
            'ceiling_ppr': round(ceiling, 2),
            'rest_risk_prob': rest_risk_prob,
            'modifier_trail': modifier_trail
        })
        
    return projections


def upsert_to_supabase(data):
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("Missing Supabase credentials in .env")
        return
        
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
    }
    
    url = f"{SUPABASE_URL}/rest/v1/player_projections"
    
    print(f"Upserting {len(data)} SAPE projections to Supabase...")
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code in [200, 201]:
        print("Successfully upserted SAPE projections!")
    else:
        print(f"Failed to upsert: {response.status_code} - {response.text}")

if __name__ == "__main__":
    baseline, injuries, matchups, resting_starters, coaching_schemes, team_pace, standings = fetch_data()
    sape_projections = compute_projections(baseline, injuries, matchups, resting_starters, coaching_schemes, team_pace, standings)
    if sape_projections:
        upsert_to_supabase(sape_projections)
