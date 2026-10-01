import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // We just need the distinct ranks. We can fetch all and aggregate in JS.
    // The table has 2176 rows. It's fast to fetch them all.
    let data: any[] = [];
    let hasMore = true;
    let offset = 0;
    const limit = 1000;

    while (hasMore) {
      const { data: chunk, error } = await supabase
        .from('positional_sos_heatmaps')
        .select('opponent, position, sos_rank')
        .range(offset, offset + limit - 1);

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      if (chunk && chunk.length > 0) {
        data = [...data, ...chunk];
        offset += limit;
      } else {
        hasMore = false;
      }

      if (chunk && chunk.length < limit) {
        hasMore = false;
      }
    }

    const defenseMap: Record<string, any> = {};

    data.forEach((row: any) => {
      if (!row.opponent || row.opponent === 'BYE') return;
      
      const defTeam = row.opponent.replace('@', '');
      
      if (!defenseMap[defTeam]) {
        defenseMap[defTeam] = { team: defTeam, QB: 0, RB: 0, WR: 0, TE: 0 };
      }
      
      defenseMap[defTeam][row.position] = row.sos_rank;
    });

    const results = Object.values(defenseMap).map(def => {
      // Calculate an average rank to sort by "Best defense" (Highest average rank = least points allowed)
      def.avgRank = (def.QB + def.RB + def.WR + def.TE) / 4;
      return def;
    });

    // Sort by Best Defense (highest rank = 32) to Worst (lowest rank = 1)
    results.sort((a, b) => b.avgRank - a.avgRank);

    return NextResponse.json({
      success: true,
      data: results
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
