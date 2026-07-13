import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { lineup, totalProj, totalSal } = await request.json();

    if (!lineup || !Array.isArray(lineup)) {
      return NextResponse.json({ error: 'Invalid lineup data' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    // If user is logged in, attach their ID. Otherwise, null is fine if the DB allows it.
    // The DB schema we created requires auth.users(id), but actually since it's sharing, 
    // it's best to attach the user_id so they can manage it later.
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized to share' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('shared_lineups')
      .insert([
        {
          user_id: user.id,
          lineup_data: lineup,
          total_projected_pts: totalProj,
          total_salary: totalSal,
        }
      ])
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json({ id: data.id });
  } catch (error: any) {
    console.error('Share Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
