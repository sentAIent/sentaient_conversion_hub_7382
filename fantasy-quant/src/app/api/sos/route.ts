import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Cache for 1 hour (3600 seconds) to drastically reduce DB reads
export const revalidate = 3600;
export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const { searchParams } = new URL(request.url);
  const position = searchParams.get('position');

  try {
    let query = supabase.from('strength_of_schedule').select(`
      *,
      players (*)
    `);

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      const flattened = data.map((row: any) => ({
        player_name: row.players?.name || 'Unknown Player',
        position: row.players?.position || 'N/A',
        team: row.players?.team || 'N/A',
        season: row.season,
        historical_sos_rank: row.historical_sos_rank,
        historical_player_rank: row.historical_player_rank ? `Rank ${row.historical_player_rank}` : 'N/A',
        upcoming_sos_rank: row.upcoming_sos_rank,
        upcoming_adjusted_score: row.upcoming_adjusted_score ? Number(row.upcoming_adjusted_score) : 0,
        schedule_delta: row.schedule_delta || 'Neutral',
        weekly_matchups: row.weekly_matchups || []
      }));

      let filtered = flattened;
      if (position) {
        filtered = flattened.filter((row: any) => row.position.toUpperCase() === position.toUpperCase());
      }
      return NextResponse.json({ data: filtered, success: true });
    }
  } catch (err) {
    console.error("DB connection error in SoS API:", err);
  }

  return NextResponse.json({ error: "Failed to fetch data", success: false }, { status: 500 });
}
