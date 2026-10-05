import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
    // Fetch paper account
    const { data: account, error: accountErr } = await supabase
      .from('paper_accounts')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (accountErr && accountErr.code !== 'PGRST116') {
      console.error("Account error:", accountErr);
      return NextResponse.json({ error: "Failed to fetch account" }, { status: 500 });
    }

    const accountId = account?.id;
    let openBets = 0;
    let betsList = [];

    if (accountId) {
      // Fetch bets
      const { data: bets, error: betsErr } = await supabase
        .from('paper_bets')
        .select('*')
        .eq('paper_account_id', accountId)
        .order('created_at', { ascending: false });
        
      if (bets) {
        openBets = bets.filter(b => b.status === 'PENDING').length;
        betsList = bets;
      }
    }

    return NextResponse.json({ 
      balance: account?.balance || 10000, 
      openBets, 
      bets: betsList,
      pnl: 0 // Placeholder for real PnL logic if needed
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bet_type, target_id, stake, details } = await request.json();

    if (!stake || stake <= 0) {
      return NextResponse.json({ error: "Invalid stake amount" }, { status: 400 });
    }

    // Get account
    const { data: account, error: accountErr } = await supabase
      .from('paper_accounts')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (accountErr || !account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    if (account.balance < stake) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
    }

    const newBalance = account.balance - stake;
    
    const { error: updateErr } = await supabase
      .from('paper_accounts')
      .update({ balance: newBalance })
      .eq('id', account.id);

    if (updateErr) {
       return NextResponse.json({ error: "Failed to update balance" }, { status: 500 });
    }

    const { data: bet, error: betErr } = await supabase
      .from('paper_bets')
      .insert({
        user_id: user.id,
        paper_account_id: account.id,
        bet_type,
        target_id,
        stake,
        details
      })
      .select()
      .single();

    if (betErr) {
       // Rollback manually
       await supabase.from('paper_accounts').update({ balance: account.balance }).eq('id', account.id);
       return NextResponse.json({ error: "Failed to place bet" }, { status: 500 });
    }

    return NextResponse.json({ success: true, bet, newBalance });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
