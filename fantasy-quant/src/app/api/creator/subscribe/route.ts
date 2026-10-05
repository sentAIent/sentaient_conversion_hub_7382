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
    const { creator_id, payment_method } = body;
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // If coins, we check user's virtual bankroll
      if (payment_method === 'coins') {
        const { data: bankroll } = await supabase
          .from('virtual_bankrolls')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        // Let's check creator subscription price
        const { data: creator } = await supabase
          .from('creator_profiles')
          .select('*')
          .eq('id', creator_id)
          .single();

        const cost = creator ? creator.subscription_price_coins : 500;

        if (bankroll && bankroll.balance >= cost) {
          // Deduct from bankroll balance
          await supabase
            .from('virtual_bankrolls')
            .update({ balance: bankroll.balance - cost })
            .eq('id', bankroll.id);

          // Add subscription record
          const { data: sub, error } = await supabase
            .from('creator_subscriptions')
            .insert({
              subscriber_id: user.id,
              creator_id,
              payment_method: 'coins',
              status: 'active',
              expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            })
            .select()
            .single();

          if (!error && sub) {
            return NextResponse.json({ success: true, subscription: sub });
          }
        } else {
          return NextResponse.json({ success: false, error: 'Insufficient virtual coins balance' }, { status: 400 });
        }
      } else {
        // Stripe Connect Checkout Session mock or redirect
        // For demonstration, we simulate Stripe setup and checkout
        const { data: sub } = await supabase
          .from('creator_subscriptions')
          .insert({
            subscriber_id: user.id,
            creator_id,
            payment_method: 'stripe',
            status: 'active',
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          })
          .select()
          .single();

        return NextResponse.json({ 
          success: true, 
          checkoutUrl: 'https://checkout.stripe.com/pay/mock_session_' + Math.random().toString(36).substring(7),
          subscription: sub 
        });
      }
    }
  } catch (err) {
    console.error("DB connection error in subscribe route:", err);
  }

  // Fallback to memory mock implementation
  const body = await request.json().catch(() => ({}));
  const { creator_id, payment_method } = body;
  const sub = addSubscription(creator_id, payment_method);

  return NextResponse.json({ 
    success: true, 
    checkoutUrl: payment_method === 'stripe' ? 'https://checkout.stripe.com/pay/mock_session_' + Math.random().toString(36).substring(7) : undefined,
    subscription: sub,
    fallback: true 
  });
}
