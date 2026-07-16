import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      user_id,
      bankroll_id,
      bet_type,
      target_id,
      market,
      line,
      selection,
      odds,
      wager,
      to_win
    } = body;

    if (!user_id || !bankroll_id || !bet_type || !market || !selection || !odds || !wager || !to_win) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Validate bankroll exists and has enough funds
    const { data: bankroll, error: brError } = await supabase
      .from('virtual_bankrolls')
      .select('balance, id')
      .eq('id', bankroll_id)
      .eq('user_id', user_id)
      .single();

    if (brError || !bankroll) {
      return NextResponse.json({ error: 'Bankroll not found' }, { status: 404 });
    }

    if (bankroll.balance < wager) {
      return NextResponse.json({ error: 'Insufficient funds in this bankroll' }, { status: 400 });
    }

    // 2. Deduct funds and insert bet within a transaction (simulated with RPC or consecutive calls)
    // For now, we do consecutive calls. In production we'd want an RPC or Supabase transaction.
    
    // Deduct
    const { error: updateError } = await supabase
      .from('virtual_bankrolls')
      .update({ balance: bankroll.balance - wager })
      .eq('id', bankroll_id);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to deduct funds' }, { status: 500 });
    }

    // Insert bet
    const { data: newBet, error: insertError } = await supabase
      .from('paper_bets')
      .insert({
        user_id,
        bankroll_id,
        bet_type,
        target_id,
        market,
        line,
        selection,
        odds,
        wager,
        to_win,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      // Rollback deduction
      await supabase
        .from('virtual_bankrolls')
        .update({ balance: bankroll.balance })
        .eq('id', bankroll_id);
      return NextResponse.json({ error: 'Failed to place bet' }, { status: 500 });
    }

    return NextResponse.json({ success: true, bet: newBet, newBalance: bankroll.balance - wager });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
