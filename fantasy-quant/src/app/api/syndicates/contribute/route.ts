import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
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

  try {
    const body = await request.json();
    const { syndicate_id, amount } = body;
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // 1. Fetch user's bankroll
      const { data: bankroll } = await supabase
        .from('virtual_bankrolls')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (bankroll && bankroll.balance >= amount) {
        // 2. Fetch target syndicate
        const { data: syn } = await supabase
          .from('syndicates')
          .select('*')
          .eq('id', syndicate_id)
          .single();

        if (syn) {
          const newBalance = Math.min(syn.total_target_pool, syn.current_pool_balance + amount);
          const isFunded = newBalance >= syn.total_target_pool;

          // 3. Deduct from bankroll balance
          await supabase
            .from('virtual_bankrolls')
            .update({ balance: bankroll.balance - amount })
            .eq('id', bankroll.id);

          // 4. Update syndicate balance & status
          await supabase
            .from('syndicates')
            .update({ 
              current_pool_balance: newBalance,
              status: isFunded ? 'funded' : syn.status
            })
            .eq('id', syndicate_id);

          // 5. Add or update contribution
          const { data: existingContrib } = await supabase
            .from('syndicate_contributions')
            .select('*')
            .eq('syndicate_id', syndicate_id)
            .eq('user_id', user.id)
            .single();

          let contrib;
          if (existingContrib) {
            const newAmt = existingContrib.amount + amount;
            const { data: res } = await supabase
              .from('syndicate_contributions')
              .update({ 
                amount: newAmt,
                shares_percentage: +((newAmt / newBalance) * 100).toFixed(2)
              })
              .eq('id', existingContrib.id)
              .select()
              .single();
            contrib = res;
          } else {
            const { data: res } = await supabase
              .from('syndicate_contributions')
              .insert({
                syndicate_id,
                user_id: user.id,
                amount,
                shares_percentage: +((amount / newBalance) * 100).toFixed(2)
              })
              .select()
              .single();
            contrib = res;
          }

          return NextResponse.json({ success: true, syndicate: syn, contribution: contrib });
        }
      } else {
        return NextResponse.json({ success: false, error: 'Insufficient virtual coins balance' }, { status: 400 });
      }
    }
  } catch (err) {
    console.error("DB connection error contributing to syndicate:", err);
  }

  // Fallback to memory mock implementation
  const body = await request.json().catch(() => ({}));
  const { syndicate_id, amount } = body;
  const syn = contributeToSyndicate(syndicate_id, amount);

  if (syn) {
    return NextResponse.json({ success: true, syndicate: syn, fallback: true });
  } else {
    return NextResponse.json({ success: false, error: 'Syndicate not found' }, { status: 404 });
  }
}
