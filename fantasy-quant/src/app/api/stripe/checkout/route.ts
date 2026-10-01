import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
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

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = user.id;

    const { tier } = await request.json();

    if (!tier) {
      return NextResponse.json({ error: 'Missing tier' }, { status: 400 });
    }

    // SIMULATED STRIPE CHECKOUT
    // In a real implementation, this would call stripe.checkout.sessions.create()
    // and return a session.url to redirect the user to Stripe's hosted checkout.
    
    // Instead, we will simulate a checkout session URL that immediately redirects to success,
    // but in reality we'll just return a mock URL. We'll simulate the webhook event directly for now,
    // or provide a "simulated checkout" page.
    
    // For this simulation, we'll return a simulated URL that just routes back to the app with a success param.
    // However, to simulate the webhook firing, we can actually trigger the webhook ourselves right now asynchronously.

    const simulatedSessionId = `cs_test_${Math.random().toString(36).substring(2, 15)}`;
    
    // Update user tier directly since local webhook simulation fails without Stripe secrets
    if (!process.env.STRIPE_SECRET_KEY) {
      const { createClient } = require('@supabase/supabase-js');
      const serviceRoleSupabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      
      await serviceRoleSupabase
        .from('users')
        .update({ subscription_tier: tier.toLowerCase() })
        .eq('id', userId);
    } else {
      // Trigger simulated webhook in the background (or real checkout URL)
      const webhookUrl = new URL('/api/webhooks/stripe', request.url).toString();
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'checkout.session.completed',
          data: {
            object: {
              id: simulatedSessionId,
              client_reference_id: userId,
              metadata: {
                tier: tier
              }
            }
          }
        })
      }).catch(console.error);
    }

    // Return the URL to redirect the user to (we'll just send them back to the app with a success query param)
    const successUrl = new URL(`/?payment_success=true&tier=${tier}`, request.url).toString();

    return NextResponse.json({ url: successUrl });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
