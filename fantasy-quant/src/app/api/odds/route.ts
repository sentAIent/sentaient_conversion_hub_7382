import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/odds
 * Returns enriched game lines + player props for a given week/season.
 * Falls back to synthetic 2023 data when live data not yet available.
 *
 * Query params:
 *   week     (default: current NFL week, fallback 1)
 *   season   (default: 2026)
 *   team     (optional: filter by team)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const season = parseInt(searchParams.get('season') || '2026');
  const week = parseInt(searchParams.get('week') || '1');
  const team = searchParams.get('team') || null;

  // ── Game lines ──────────────────────────────────────────────────────────────
  let gameQuery = supabase
    .from('game_vegas_lines')
    .select(`
      *,
      games!inner(id, week, season, home_team, away_team, game_date)
    `)
    .eq('games.season', season)
    .eq('games.week', week);

  if (team) gameQuery = gameQuery.or(`games.home_team.eq.${team},games.away_team.eq.${team}`);

  const { data: gameLines, error: glError } = await gameQuery;
  if (glError) return NextResponse.json({ error: glError.message }, { status: 500 });

  // ── Player props ────────────────────────────────────────────────────────────
  const { data: props, error: propsError } = await supabase
    .from('player_vegas_props')
    .select(`
      *,
      players (id, name, position, team)
    `)
    .eq('season', season)
    .eq('week', week)
    .order('line', { ascending: false });

  // ── Implied team totals lookup (for DFS value) ──────────────────────────────
  const impliedTotals: Record<string, number> = {};
  for (const line of gameLines || []) {
    const g = line.games;
    if (!g) continue;
    if (line.implied_home_pts) impliedTotals[g.home_team] = line.implied_home_pts;
    if (line.implied_away_pts) impliedTotals[g.away_team] = line.implied_away_pts;
  }

  // ── Props by player ─────────────────────────────────────────────────────────
  const propsByPlayer: Record<string, any[]> = {};
  for (const p of props || []) {
    const pid = p.player_id;
    if (!propsByPlayer[pid]) propsByPlayer[pid] = [];
    propsByPlayer[pid].push({
      prop_type: p.prop_type,
      line: p.line,
      over_odds: p.over_odds,
      under_odds: p.under_odds,
      book: p.book,
      player: p.players,
    });
  }

  // ── Live data availability flag ─────────────────────────────────────────────
  const hasLiveData = (gameLines || []).some(
    g => g.source?.includes('Live') || g.source?.includes('DraftKings (Live')
  );

  return NextResponse.json({
    week,
    season,
    gameLines: gameLines || [],
    impliedTotals,
    propsByPlayer,
    propCount: (props || []).length,
    gameCount: (gameLines || []).length,
    hasLiveData,
    source: hasLiveData ? 'DraftKings (Live)' : 'Synthetic (2023 calibrated)',
  });
}

/**
 * POST /api/odds/refresh
 * Triggers a background re-fetch from The Odds API (game lines only, 1 credit).
 */
export async function POST() {
  const ODDS_API_KEY = process.env.ODDS_API_KEY;
  if (!ODDS_API_KEY) {
    return NextResponse.json({ error: 'ODDS_API_KEY not configured' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 5000);
    
    // Fetch current DK game lines
    const r = await fetch(
      `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds?apiKey=${ODDS_API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american&bookmakers=draftkings`,
      { next: { revalidate: 0 }, signal: controller.signal }
    );
    clearTimeout(id);

    if (!r.ok) {
      return NextResponse.json({ error: `Odds API error: ${r.status}` }, { status: 502 });
    }

    const games = await r.json();
    const creditsRemaining = r.headers.get('x-requests-remaining');

    // Return the raw data — client can trigger ETL via server action
    return NextResponse.json({
      gamesCount: games.length,
      creditsRemaining,
      sample: games.slice(0, 3).map((g: any) => ({
        home: g.home_team,
        away: g.away_team,
        commence: g.commence_time,
        dkLines: g.bookmakers?.find((b: any) => b.key === 'draftkings')?.markets?.map((m: any) => m.key),
      })),
      message: `Fetched ${games.length} games from DraftKings. Run python ingest_odds_live.py to persist.`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
