import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { spawn } from 'child_process';
import path from 'path';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

async function getCache(key: string) {
  if (!process.env.UPSTASH_REDIS_REST_URL) return null;
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
      signal: controller.signal
    });
    clearTimeout(id);
    const json = await res.json();
    return json.result ? JSON.parse(json.result) : null;
  } catch (e) { return null; }
}

async function setCache(key: string, value: any, ttlSeconds: number = 3600) {
  if (!process.env.UPSTASH_REDIS_REST_URL) return;
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 1500);
    await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/${key}?EX=${ttlSeconds}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
      body: JSON.stringify(value),
      signal: controller.signal
    });
    clearTimeout(id);
  } catch (e) {}
}

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
  let { week = 14, season = 2026, platform = 'dk', nLineups = 20, maxExposure = 0.60, maxOwnership = 0.50, stackQbWr = true, capTe = true, excludedPlayers = [], lockedPlayers = [] } = body;

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

    const args = [scriptPath, String(week), String(season), platform, String(nLineups), '--json'];
    if (stackQbWr) args.push('--stack-qb-wr');
    if (capTe) args.push('--cap-te');
    args.push(`--max-exposure=${maxExposure}`);
    if (excludedPlayers.length) args.push(`--excluded=${excludedPlayers.join(',')}`);
    if (lockedPlayers.length) args.push(`--locked=${lockedPlayers.join(',')}`);
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
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
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
  
  console.log(`[optimize] API HIT: week=${week} season=${season} platform=${platform}`);

  const { data: { user } } = await supabase.auth.getUser();

  let userWeights: Record<string, number> | null = null;
  if (user) {
    const { data: settings } = await supabase
      .from('user_settings')
      .select('ensemble_weights, subscription_tier')
      .eq('id', user.id)
      .single();

    if (settings?.subscription_tier === 'max' && settings?.ensemble_weights) {
      userWeights = settings.ensemble_weights as Record<string, number>;
    }
  }

  const cacheKey = `optimize_v2_${season}_${week}_${platform}`;
  if (!userWeights) {
    const cached = await getCache(cacheKey);
    if (cached) return NextResponse.json({ data: cached, week, season, platform });
  }

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

  const { data: signals } = await supabase
    .from('player_signals')
    .select('player_id, signal_type, category, description')
    .in('player_id', playerIds)
    .eq('season', season);
    // For Draft, week is null. If we are in DFS, we can check week.
    // For now we will pull all signals for the season.
    // In the future we can filter `.or('week.is.null,week.eq.' + week)`

  // Build lookup maps
  const advMap = new Map((advStats || []).map((r: any) => [r.player_id, r]));
  const injuryMap = new Map((injuries || []).map((r: any) => [r.player_id, r]));
  
  const signalsMap = new Map<string, any[]>();
  for (const s of (signals || [])) {
    if (!signalsMap.has(s.player_id)) signalsMap.set(s.player_id, []);
    signalsMap.get(s.player_id)!.push(s);
  }
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
      injury_status = inj.injury_status;
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

    const player_signals = signalsMap.get(row.player_id) || [];
    let signalBoost = 0;
    for (const s of player_signals) {
      if (s.signal_type === 'POSITIVE') signalBoost += 0.5;
      if (s.signal_type === 'NEGATIVE') signalBoost -= 0.5;
    }

    return {
      ...row,
      signalBoost, // Save this so we can compute value_score later
      player_advanced_stats: advMap.has(row.player_id) ? [advMap.get(row.player_id)] : [],
      player_vegas_props: propsMap.get(row.player_id) || [],
      player_signals: signalsMap.get(row.player_id) || [],
      injury_status,
      practice_status,
      play_probability,
      game_environment: env,
      defensive_matchup: def_matchup
    };
  });

  const { data: projections } = await supabase
    .from('player_projections')
    .select(`player_id, projected_pts, projection_sources (abbreviation)`)
    .in('player_id', playerIds);

  const { data: accuracyData } = await supabase
    .from('projection_accuracy')
    .select(`week, rmse, projection_sources(abbreviation)`)
    .eq('season', season)
    .order('week', { ascending: false });

  // Use the latest week's accuracy for weights
  const rmseWeights: Record<string, number> = {};
  if (accuracyData && accuracyData.length > 0) {
    const latestWeekData = accuracyData.filter((a: any) => a.week === accuracyData[0].week);
    latestWeekData.forEach((a: any) => {
      const abbr = a.projection_sources?.abbreviation;
      if (abbr && a.rmse) {
        rmseWeights[abbr] = 1 / (Number(a.rmse) + 0.5);
      }
    });
  }

  if (projections && projections.length > 0) {
    const projMap: Record<string, any[]> = {};
    projections.forEach(p => {
      if (!projMap[p.player_id]) projMap[p.player_id] = [];
      projMap[p.player_id].push(p);
    });

    enriched = enriched.map(p => {
      if (projMap[p.player_id]) {
        let blendedPts = 0;
        let weightSum = 0;
        const playerProjs = projMap[p.player_id];
        const breakdown: Record<string, number> = {};
        
        if (userWeights) {
          playerProjs.forEach(proj => {
            const abbr = proj.projection_sources?.abbreviation;
            if (abbr) breakdown[abbr] = proj.projected_pts;
            if (abbr && userWeights![abbr]) {
              blendedPts += proj.projected_pts * userWeights![abbr];
              weightSum += userWeights![abbr];
            }
          });
        } else if (Object.keys(rmseWeights).length > 0) {
          // Use Historical Accuracy (RMSE) weighting
          playerProjs.forEach(proj => {
            const abbr = proj.projection_sources?.abbreviation;
            if (abbr) {
              breakdown[abbr] = proj.projected_pts;
              const w = rmseWeights[abbr] || 0.1; // Default low weight if unknown
              blendedPts += proj.projected_pts * w;
              weightSum += w;
            }
          });
        } else {
          // Default: try ESPN first for blended, but collect all for breakdown
          const espnProj = playerProjs.find(proj => proj.projection_sources?.abbreviation === 'ESPN');
          if (espnProj) {
            blendedPts = espnProj.projected_pts;
            weightSum = 1;
          } else {
            // Average them all
            playerProjs.forEach(proj => {
              blendedPts += proj.projected_pts;
              weightSum += 1;
            });
          }
          playerProjs.forEach(proj => {
            const abbr = proj.projection_sources?.abbreviation;
            if (abbr) breakdown[abbr] = proj.projected_pts;
          });
        }
        
        if (weightSum > 0) {
          p.projected_pts = parseFloat((blendedPts / weightSum).toFixed(2));
        }
        p.projections_breakdown = breakdown;
        p.projections_breakdown['AVG'] = p.projected_pts; // Store the final blended as AVG
      } else {
        p.projections_breakdown = { 'AVG': p.projected_pts };
      }
      
      // Calculate value score now that projected_pts is finalized
      p.value_score = p.salary > 0 ? +((p.projected_pts + (p.signalBoost || 0)) / p.salary * 1000).toFixed(2) : 0;
      delete p.signalBoost; // Cleanup
      
      return p;
    });
  } else {
    // No projections found, just calculate value score with existing (synthetic) points
    enriched = enriched.map(p => {
      p.projections_breakdown = { 'AVG': p.projected_pts };
      p.value_score = p.salary > 0 ? +((p.projected_pts + (p.signalBoost || 0)) / p.salary * 1000).toFixed(2) : 0;
      delete p.signalBoost;
      return p;
    });
  }

  if (!userWeights) {
    await setCache(cacheKey, enriched, 3600); // 1 hour cache
  }

  return NextResponse.json({ data: enriched, week, season, platform });
}

