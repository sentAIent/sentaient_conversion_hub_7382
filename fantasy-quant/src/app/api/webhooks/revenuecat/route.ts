import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const event = payload.event;
    
    // Validate authorization header in production
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.REVENUECAT_WEBHOOK_SECRET}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    if (!event || !event.type || !event.app_user_id) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const userId = event.app_user_id; // This maps directly to Supabase auth.uid()

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Should use SERVICE_ROLE for admin overrides in prod
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() {},
        },
      }
    );

    // Map RevenueCat entitlements to our database tiers
    let newTier = 'free';
    
    // RevenueCat event types: INITIAL_PURCHASE, RENEWAL, CANCELLATION, EXPIRATION
    if (event.type === 'INITIAL_PURCHASE' || event.type === 'RENEWAL') {
      if (event.product_id.includes('pro')) newTier = 'pro';
      if (event.product_id.includes('elite')) newTier = 'elite';
    } else if (event.type === 'EXPIRATION') {
      newTier = 'free';
    } else if (event.type === 'CANCELLATION') {
      // Still active until expiration date, handled by EXPIRATION event later
      return NextResponse.json({ success: true, message: 'Cancellation noted, waiting for expiration' });
    }

    const { error } = await supabase
      .from('users')
      .update({ subscription_tier: newTier })
      .eq('id', userId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('RevenueCat Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
