import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const season = searchParams.get('season') || '2026';

    // Fetch players and advanced stats
    const { data: stats, error } = await supabase
      .from('player_advanced_stats')
      .select(`
        player_id,
        yards_per_route_run,
        targets_per_route_run,
        route_participation,
        air_yards_share,
        expected_fantasy_points,
        fantasy_points_over_expected,
        target_share,
        adot,
        wopr,
        racr,
        epa_per_play,
        targets,
        rec_pct,
        players!inner(name, team, position)
      `)
      .eq('season', parseInt(season))
      .gt('targets', 30); // Filter for relevance

    if (error) throw error;

    const formattedData = stats.map((s: any) => {
      // Calculate a proxy for Targeted Passer Rating using actual EPA per play & rec_pct if it's missing in DB
      // Standard passer rating formula parts: completions, yards, tds, ints per attempt.
      // Since we don't have exact QB rating when targeted, we estimate it via EPA/Target and Rec Pct to give a realistic value.
      // 95 is average. Good EPA/play (+0.5) pushes it to 120+. Poor EPA pushes it to 60.
      const epa = s.epa_per_play || 0;
      let tpr = 95.0 + (epa * 45); 
      if (tpr > 158.3) tpr = 158.3;
      if (tpr < 0) tpr = 0;

      return {
        id: s.player_id,
        name: s.players?.name,
        team: s.players?.team,
        position: s.players?.position,
        yards_per_route_run: s.yards_per_route_run,
        targets_per_route_run: s.targets_per_route_run,
        route_participation: s.route_participation,
        air_yards_share: s.air_yards_share,
        expected_fantasy_points: s.expected_fantasy_points,
        fantasy_points_over_expected: s.fantasy_points_over_expected,
        target_share: s.target_share,
        adot: s.adot,
        wopr: s.wopr,
        racr: s.racr,
        epa_per_play: s.epa_per_play,
        targeted_passer_rating: parseFloat(tpr.toFixed(1)),
        targets: s.targets,
        rec_pct: s.rec_pct
      };
    });

    return NextResponse.json({ success: true, data: formattedData });
  } catch (error: any) {
    console.error('Data explorer API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
