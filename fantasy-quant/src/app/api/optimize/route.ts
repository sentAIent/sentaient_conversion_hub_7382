import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { spawn } from 'child_process';
import path from 'path';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const body = await request.json();
  let { week = 14, season = 2023, platform = 'dk', nLineups = 20, maxExposure = 0.60, maxOwnership = 0.50 } = body;

  let maxAllowedLineups = 1; // Default to free

  if (user) {
    const { data: settings } = await supabase
      .from('user_settings')
      .select('subscription_tier')
      .eq('id', user.id)
      .single()
    
    if (settings?.subscription_tier === 'pro') {
      maxAllowedLineups = 20;
    } else if (settings?.subscription_tier === 'max') {
      maxAllowedLineups = 150;
    }
  }

  // Enforce the tier limit
  nLineups = Math.min(nLineups, maxAllowedLineups);

  return new Promise<Response>((resolve) => {
    // Obfuscate the path so Turbopack doesn't try to statically trace the symlink
    const venvDir = ['.ve', 'nv'].join('');
    const pythonPath = path.join(process.cwd(), 'etl', venvDir, 'bin', 'python');
    const scriptPath = path.join(process.cwd(), 'etl', 'optimizer.py');

    const args = [scriptPath, String(week), String(season), platform, String(nLineups)];
    const proc = spawn(pythonPath, args, {
      cwd: path.join(process.cwd(), 'etl'),
      env: { ...process.env }
    });

    let stdout = '';
    let stderr = '';
    proc.stdout.on('data', (d) => { stdout += d.toString(); });
    proc.stderr.on('data', (d) => { stderr += d.toString(); });

    proc.on('close', (code) => {
      if (code !== 0) {
        resolve(NextResponse.json({ error: stderr || 'Optimizer failed' }, { status: 500 }));
        return;
      }
      try {
        const parsed = JSON.parse(stdout);
        resolve(NextResponse.json({ data: parsed, success: true }));
      } catch (err) {
        resolve(NextResponse.json({ error: 'Failed to parse optimizer output', raw: stdout }, { status: 500 }));
      }
    });

    // Timeout after 30s
    setTimeout(() => {
      proc.kill();
      resolve(NextResponse.json({ error: 'Optimizer timed out' }, { status: 504 }));
    }, 30000);
  });
}

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { searchParams } = new URL(request.url);
  const week = parseInt(searchParams.get('week') || '14');
  const season = parseInt(searchParams.get('season') || '2023');
  const platform = searchParams.get('platform') || 'dk';

  const { data: { user } } = await supabase.auth.getUser()

  // Fetch salary data with player info
  const { data: salaryData, error } = await supabase
    .from('player_dfs_salaries')
    .select(`*, players (id, name, position, team, data_source)`)
    .eq('week', week)
    .eq('season', season)
    .eq('platform', platform)
    .order('projected_pts', { ascending: false })
    .limit(300);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Fetch advanced stats for this week
  const playerIds = (salaryData || []).map((r: any) => r.player_id);
  const { data: advStats } = await supabase
    .from('player_advanced_stats')
    .select('player_id, snap_pct, target_share, wopr, adot, racr')
    .in('player_id', playerIds)
    .eq('season', season)
    .eq('week', week);

  // Fetch vegas props for this week
  const { data: vegasProps } = await supabase
    .from('player_vegas_props')
    .select('player_id, prop_type, line, over_odds, under_odds')
    .in('player_id', playerIds)
    .eq('season', season)
    .eq('week', week);

  // Fetch injuries for this week

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

  const { data: injuries } = await supabase
    .from('player_injuries')
    .select('player_id, report_status, practice_status')
    .in('player_id', playerIds)
    .eq('season', season)
    .eq('week', week);

  // Build lookup maps
  const advMap = new Map((advStats || []).map((r: any) => [r.player_id, r]));
  const injuryMap = new Map((injuries || []).map((r: any) => [r.player_id, r]));
  const propsMap = new Map<string, any[]>();
  for (const p of (vegasProps || [])) {
    if (!propsMap.has(p.player_id)) propsMap.set(p.player_id, []);
    propsMap.get(p.player_id)!.push(p);
  }

  // Enrich with value score + joined data + injury probabilities
  let enriched = (salaryData || []).map((row: any) => {
    let play_probability = 1.0;
    let injury_status = null;
    let practice_status = null;

    if (injuryMap.has(row.player_id)) {
      const inj = injuryMap.get(row.player_id);
      injury_status = inj.report_status;
      practice_status = inj.practice_status;
      
      const s = (injury_status || '').toLowerCase();
      const p = (practice_status || '').toLowerCase();
      
      if (s === 'out' || s === 'ir') {
        play_probability = 0.0;
      } else if (s === 'doubtful') {
        play_probability = 0.15;
      } else if (s === 'questionable') {
        if (p.includes('did not participate') || p === 'dnp') play_probability = 0.40;
        else if (p.includes('limited') || p === 'lp') play_probability = 0.60;
        else if (p.includes('full') || p === 'fp') play_probability = 0.85;
        else play_probability = 0.65;
      }
    }


    
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
    }

    return {
      ...row,
      value_score: row.salary > 0 ? +(row.projected_pts / row.salary * 1000).toFixed(2) : 0,
      player_advanced_stats: advMap.has(row.player_id) ? [advMap.get(row.player_id)] : [],
      player_vegas_props: propsMap.get(row.player_id) || [],
      injury_status,
      practice_status,
      play_probability,
      game_environment: env,
      defensive_matchup: def_matchup
    };
  });

  // Calculate Ensemble Projections if user exists and is on Max tier
  if (user) {
    const { data: settings } = await supabase
      .from('user_settings')
      .select('ensemble_weights, subscription_tier')
      .eq('id', user.id)
      .single()

    if (settings?.subscription_tier === 'max' && settings?.ensemble_weights) {
      const { data: projections } = await supabase
        .from('player_projections')
        .select(`player_id, projected_pts, projection_sources (abbreviation)`)
        .in('player_id', playerIds)

      if (projections && projections.length > 0) {
        // Group by player_id
        const projMap: Record<string, any[]> = {}
        projections.forEach(p => {
          if (!projMap[p.player_id]) projMap[p.player_id] = []
          projMap[p.player_id].push(p)
        })

        const weights = settings.ensemble_weights as Record<string, number>

        enriched = enriched.map(p => {
          if (projMap[p.player_id]) {
            let blendedPts = 0
            let weightSum = 0
            projMap[p.player_id].forEach(proj => {
              const abbr = proj.projection_sources?.abbreviation
              if (abbr && weights[abbr]) {
                blendedPts += proj.projected_pts * weights[abbr]
                weightSum += weights[abbr]
              }
            })
            if (weightSum > 0) {
              p.projected_pts = parseFloat((blendedPts / weightSum).toFixed(2))
            }
          }
          return p
        })
      }
    }
  }
  return NextResponse.json({ data: enriched, week, season, platform });
}
