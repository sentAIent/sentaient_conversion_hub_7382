import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

function createClient(cookieStore: any) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {}
        },
      },
    }
  );
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized', details: authError?.message }, { status: 401 });
    }

    const { data: bets, error } = await supabase
      .from('paper_bets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase Error (GET paper_bets):", error);
      return NextResponse.json({ error: 'Failed to fetch paper bets' }, { status: 500 });
    }

    return NextResponse.json({ data: bets || [], success: true });
  } catch (err: any) {
    console.error("Paper Trading Bets GET API Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized', details: authError?.message }, { status: 401 });
    }

    const body = await request.json();
    const { stake, bet_type, target_id, details } = body;

    // Input Validation
    if (typeof stake !== 'number' || stake <= 0) {
      return NextResponse.json({ error: 'Invalid stake amount. Must be a positive number.' }, { status: 400 });
    }
    if (!bet_type || typeof bet_type !== 'string') {
      return NextResponse.json({ error: 'Invalid bet_type. Must be a string.' }, { status: 400 });
    }
    if (!target_id || typeof target_id !== 'string') {
      return NextResponse.json({ error: 'Invalid target_id. Must be a string.' }, { status: 400 });
    }

    // 1. Fetch paper trading account to check balance
    const { data: account, error: fetchError } = await supabase
      .from('paper_accounts')
      .select('id, balance')
      .eq('user_id', user.id)
      .single();

    if (fetchError || !account) {
      console.error("Paper Trading Account fetch error:", fetchError);
      return NextResponse.json({ error: 'Paper trading account not found' }, { status: 404 });
    }

    if (account.balance < stake) {
      return NextResponse.json({ error: 'Insufficient paper trading balance' }, { status: 400 });
    }

    // 2. Perform the update and insert. 
    // Best practice is to use a PostgreSQL function (RPC) to wrap this in a transaction.
    // If not available, we do sequential with best-effort rollback.
    const newBalance = account.balance - stake;
    const { error: updateError } = await supabase
      .from('paper_accounts')
      .update({ balance: newBalance })
      .eq('id', account.id)
      .eq('user_id', user.id); // Extra security constraint

    if (updateError) {
      console.error("Paper Trading Account update error:", updateError);
      return NextResponse.json({ error: 'Failed to update account balance' }, { status: 500 });
    }

    // 3. Insert the bet
    const { data: newBet, error: insertError } = await supabase
      .from('paper_bets')
      .insert([{
        user_id: user.id,
        paper_account_id: account.id,
        bet_type,
        target_id,
        stake,
        status: 'PENDING',
        details: details || {}
      }])
      .select()
      .single();

    if (insertError) {
      console.error("Paper Bet insert error:", insertError);
      // Best-effort rollback
      await supabase
        .from('paper_accounts')
        .update({ balance: account.balance })
        .eq('id', account.id)
        .eq('user_id', user.id);
        
      return NextResponse.json({ error: 'Failed to place bet. Balance refunded.' }, { status: 500 });
    }

    return NextResponse.json({ data: newBet, newBalance, success: true }, { status: 201 });
  } catch (err: any) {
    console.error("Paper Trading Bets POST Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
