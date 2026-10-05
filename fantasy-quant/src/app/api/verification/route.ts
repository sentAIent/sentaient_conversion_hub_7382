import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // We join the players table with the three projection tables
    const { data: players, error } = await supabase
      .from('players')
      .select(`
        id,
        name,
        position,
        team,
        yahoo_projections ( projected_pts ),
        espn_projections ( projected_pts ),
        cbs_projections ( projected_pts )
      `)
      .limit(200);

    if (error) throw error;

    const formattedData = players.map(p => ({
      id: p.id,
      name: p.name,
      position: p.position,
      team: p.team,
      yahoo_pts: p.yahoo_projections?.[0]?.projected_pts ?? null,
      espn_pts: p.espn_projections?.[0]?.projected_pts ?? null,
      cbs_pts: p.cbs_projections?.[0]?.projected_pts ?? null,
    }));

    // Sort by ESPN points descending by default, then fallback to others
    formattedData.sort((a, b) => {
      const aPts = a.espn_pts ?? a.yahoo_pts ?? a.cbs_pts ?? 0;
      const bPts = b.espn_pts ?? b.yahoo_pts ?? b.cbs_pts ?? 0;
      return bPts - aPts;
    });

    return NextResponse.json({ data: formattedData });
  } catch (err: any) {
    console.error('Error fetching verification data:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
