import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Insert Mock Players
  const { data: players, error: playerErr } = await supabase
    .from('players')
    .upsert([
      { nflverse_id: '00-0033280', name: 'Christian McCaffrey', position: 'RB', team: 'SF' },
      { nflverse_id: '00-0036322', name: 'Justin Jefferson', position: 'WR', team: 'MIN' },
      { nflverse_id: '00-0034857', name: 'Josh Allen', position: 'QB', team: 'BUF' }
    ], { onConflict: 'nflverse_id' })
    .select();

  if (playerErr) return NextResponse.json({ error: playerErr.message }, { status: 500 });

  // 2. Insert Mock Games
  const { data: games, error: gameErr } = await supabase
    .from('games')
    .upsert([
      { nflverse_game_id: '2023_01_SF_PIT', season: 2023, week: 1, home_team: 'PIT', away_team: 'SF', game_date: '2023-09-10', stadium: 'Acrisure Stadium', is_dome: false },
      { nflverse_game_id: '2023_01_TB_MIN', season: 2023, week: 1, home_team: 'MIN', away_team: 'TB', game_date: '2023-09-10', stadium: 'U.S. Bank Stadium', is_dome: true },
      { nflverse_game_id: '2023_01_BUF_NYJ', season: 2023, week: 1, home_team: 'NYJ', away_team: 'BUF', game_date: '2023-09-11', stadium: 'MetLife Stadium', is_dome: false }
    ], { onConflict: 'nflverse_game_id' })
    .select();

  if (gameErr) return NextResponse.json({ error: gameErr.message }, { status: 500 });

  // 3. Insert Mock Weather
  const weatherData = games.map(g => {
    if (g.is_dome) return { game_id: g.id, temperature_f: 72, wind_speed_mph: 0, precipitation_type: 'None' };
    if (g.home_team === 'NYJ') return { game_id: g.id, temperature_f: 68, wind_speed_mph: 12, precipitation_type: 'Rain' };
    return { game_id: g.id, temperature_f: 75, wind_speed_mph: 5, precipitation_type: 'None' };
  });

  const { error: weatherErr } = await supabase.from('weather').upsert(weatherData, { onConflict: 'game_id' });
  if (weatherErr) return NextResponse.json({ error: weatherErr.message }, { status: 500 });

  // 4. Insert Mock Stats & Calculate Scoring
  // Standard: 1 pt / 10 rush yds, 6 pt / rush TD. 1 pt / 10 rec yds, 6 pt / rec TD. 1 pt / 25 pass yds, 4 pt / pass TD.
  // Half-PPR: Standard + 0.5 pt / reception.
  // PPR: Standard + 1 pt / reception.
  
  const cmc = players.find(p => p.name === 'Christian McCaffrey')!;
  const jj = players.find(p => p.name === 'Justin Jefferson')!;
  const ja = players.find(p => p.name === 'Josh Allen')!;

  const cmcGame = games.find(g => g.away_team === 'SF')!;
  const jjGame = games.find(g => g.home_team === 'MIN')!;
  const jaGame = games.find(g => g.away_team === 'BUF')!;

  const cmcRushYds = 152, cmcRushTds = 1, cmcRec = 3, cmcRecYds = 17, cmcRecTds = 0;
  const cmcStandard = (cmcRushYds / 10) + (cmcRushTds * 6) + (cmcRecYds / 10) + (cmcRecTds * 6);

  const jjRec = 9, jjRecYds = 150, jjRecTds = 0;
  const jjStandard = (jjRecYds / 10) + (jjRecTds * 6);

  const jaPassYds = 236, jaPassTds = 1, jaInt = 3, jaRushYds = 36, jaRushTds = 0;
  const jaStandard = (jaPassYds / 25) + (jaPassTds * 4) + (jaRushYds / 10) + (jaRushTds * 6) - (jaInt * 2);

  const { error: statsErr } = await supabase
    .from('player_weekly_stats')
    .upsert([
      { 
        player_id: cmc.id, game_id: cmcGame.id, 
        rush_yds: cmcRushYds, rush_tds: cmcRushTds, receptions: cmcRec, rec_yds: cmcRecYds, rec_tds: cmcRecTds,
        standard_pts: cmcStandard, half_ppr_pts: cmcStandard + (cmcRec * 0.5), ppr_pts: cmcStandard + cmcRec
      },
      { 
        player_id: jj.id, game_id: jjGame.id, 
        receptions: jjRec, rec_yds: jjRecYds, rec_tds: jjRecTds,
        standard_pts: jjStandard, half_ppr_pts: jjStandard + (jjRec * 0.5), ppr_pts: jjStandard + jjRec
      },
      { 
        player_id: ja.id, game_id: jaGame.id, 
        pass_yds: jaPassYds, pass_tds: jaPassTds, interceptions: jaInt, rush_yds: jaRushYds, rush_tds: jaRushTds,
        standard_pts: jaStandard, half_ppr_pts: jaStandard, ppr_pts: jaStandard // QB catches no passes here
      }
    ], { onConflict: 'player_id, game_id' });

  if (statsErr) return NextResponse.json({ error: statsErr.message }, { status: 500 });

  // 5. Insert Defensive Matchups
  // For team_coverage_tendencies, insert SF, MIN, BUF, PIT, TB, NYJ defenses
  const { error: teamCovErr } = await supabase
    .from('team_coverage_tendencies')
    .upsert([
      {
        team: 'MIN', season: 2023, week: 1,
        man_pct: 35.5, zone_pct: 64.5, primary_shell: 'Cover 3',
        coverage_breakdown: { cover_0: 5, cover_1: 30, cover_2: 10, tampa_2: 5, cover_3: 40, cover_4: 10, cover_6: 0 },
        adjusted_coverage_breakdown: { cover_0: 10, cover_1: 35, cover_2: 5, tampa_2: 0, cover_3: 35, cover_4: 15, cover_6: 0 }
      },
      {
        team: 'PIT', season: 2023, week: 1,
        man_pct: 45.0, zone_pct: 55.0, primary_shell: 'Cover 1',
        coverage_breakdown: { cover_0: 10, cover_1: 35, cover_2: 15, tampa_2: 10, cover_3: 20, cover_4: 10, cover_6: 0 },
        adjusted_coverage_breakdown: { cover_0: 15, cover_1: 45, cover_2: 10, tampa_2: 5, cover_3: 15, cover_4: 10, cover_6: 0 }
      },
      {
        team: 'NYJ', season: 2023, week: 1,
        man_pct: 40.0, zone_pct: 60.0, primary_shell: 'Cover 4',
        coverage_breakdown: { cover_0: 5, cover_1: 35, cover_2: 15, tampa_2: 5, cover_3: 20, cover_4: 20, cover_6: 0 },
        adjusted_coverage_breakdown: { cover_0: 5, cover_1: 30, cover_2: 15, tampa_2: 5, cover_3: 25, cover_4: 20, cover_6: 0 }
      }
    ], { onConflict: 'team, season, week' });

  if (teamCovErr) return NextResponse.json({ error: teamCovErr.message }, { status: 500 });

  // 6. Insert Player Matchups (Offensive player vs Defense)
  // Justin Jefferson vs TB
  // Josh Allen vs NYJ
  // Christian McCaffrey vs PIT
  const { error: pMatchupErr } = await supabase
    .from('player_matchups')
    .upsert([
      {
        player_id: jj.id, game_id: jjGame.id,
        matchup_rank: 8, cb_shadow: 'Carlton Davis',
        individual_matchups: [
          { position: 'CB1', time_pct: 70, grade: 78 },
          { position: 'CB2', time_pct: 15, grade: 65 },
          { position: 'Safety', time_pct: 15, grade: 82 }
        ]
      },
      {
        player_id: cmc.id, game_id: cmcGame.id,
        matchup_rank: 4, cb_shadow: 'N/A',
        individual_matchups: [
          { position: 'LB', time_pct: 60, grade: 85 },
          { position: 'Safety', time_pct: 40, grade: 75 }
        ]
      },
      {
        player_id: ja.id, game_id: jaGame.id,
        matchup_rank: 2, cb_shadow: 'N/A',
        individual_matchups: []
      }
    ], { onConflict: 'player_id, game_id' });

  if (pMatchupErr) return NextResponse.json({ error: pMatchupErr.message }, { status: 500 });

  return NextResponse.json({ success: true, message: 'Mock data ingested successfully.' });
}
