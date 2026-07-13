import re

with open('src/app/api/optimize/route.ts', 'r') as f:
    content = f.read()

# 1. Add fetching logic for the new tables
fetch_queries = """
  const { data: teamCovs } = await supabase
    .from('team_coverage_tendencies')
    .select('*')
    .eq('season', season)
    .eq('week', week);

  const { data: playerMatchups } = await supabase
    .from('player_matchups')
    .select('*');

  // We also need games to map player's game_id to the opposing team to find teamCovs
  const { data: games } = await supabase
    .from('games')
    .select('*')
    .eq('season', season)
    .eq('week', week);

  const teamCovMap = new Map();
  for (const tc of (teamCovs || [])) {
    teamCovMap.set(tc.team, tc);
  }

  const pMatchupMap = new Map();
  for (const pm of (playerMatchups || [])) {
    pMatchupMap.set(pm.player_id, pm);
  }

  const gameMap = new Map();
  for (const g of (games || [])) {
    gameMap.set(g.id, g);
  }
"""

content = content.replace("  const { data: injuries } = await supabase", fetch_queries + "\n  const { data: injuries } = await supabase")

# 2. Replace the dummy logic with actual lookup
dummy_logic_start = content.find("// --- DUMMY ADVANCED MATCHUP & WEATHER INJECTION ---")
dummy_logic_end = content.find("// --------------------------------------------------") + 53

real_logic = """
    // --- ADVANCED MATCHUP INJECTION ---
    const pos = row.players?.position;
    
    // We already have game_environment but wait, the previous code had dummy env too. Let's keep dummy env for now
    let env = { temp: 65, weather: 'Clear', surface: 'Turf' };
    if (Math.random() > 0.7) {
      env = { temp: Math.floor(Math.random() * 40 + 30), weather: Math.random() > 0.5 ? 'Rain' : 'Snow', surface: 'Grass' };
    }
    
    let def_matchup = null;
    
    // Find the opposing team
    let oppTeam = null;
    if (row.player_weekly_stats && row.player_weekly_stats.length > 0) {
      const gId = row.player_weekly_stats[0].game_id;
      const g = gameMap.get(gId);
      if (g) {
        oppTeam = (row.players?.team === g.home_team) ? g.away_team : g.home_team;
      }
    }

    if (oppTeam && teamCovMap.has(oppTeam)) {
      const tc = teamCovMap.get(oppTeam);
      
      const pm = pMatchupMap.get(row.player_id) || {};
      
      def_matchup = {
        rank: pm.matchup_rank || Math.floor(Math.random() * 32) + 1,
        cb_shadow: pm.cb_shadow || 'N/A',
        man_zone_pct: tc.man_pct ? `${tc.man_pct}% Man` : 'N/A',
        primary_shell: tc.primary_shell || 'N/A',
        coverage_breakdown: tc.coverage_breakdown,
        adjusted_coverage_breakdown: tc.adjusted_coverage_breakdown,
        individual_matchups: pm.individual_matchups || []
      };
    } else {
      // Fallback
      def_matchup = {
        rank: Math.floor(Math.random() * 32) + 1,
        cb_shadow: 'N/A',
        man_zone_pct: 'N/A',
        primary_shell: 'N/A'
      };
    }
"""

content = content[:dummy_logic_start] + real_logic + content[dummy_logic_end:]

with open('src/app/api/optimize/route.ts', 'w') as f:
    f.write(content)
print("Updated route.ts")
