import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
    }

    // 1. Get bankrolls
    const { data: bankrolls, error: brError } = await supabase
      .from('virtual_bankrolls')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (brError) {
      return NextResponse.json({ error: brError.message }, { status: 500 });
    }

    // 2. Get recent bets
    const { data: bets, error: betError } = await supabase
      .from('paper_bets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (betError) {
      return NextResponse.json({ error: betError.message }, { status: 500 });
    }

    return NextResponse.json({ bankrolls, bets });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
