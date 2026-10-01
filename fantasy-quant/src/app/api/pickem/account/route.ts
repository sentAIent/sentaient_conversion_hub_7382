import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_123', {
  apiVersion: '2023-10-16' as any,
});

async function getGeofencedState(request: Request): Promise<string> {
  let userState = 'NY';
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
  const ipToQuery = (ip && ip !== '127.0.0.1' && ip !== '::1') ? ip : '8.8.8.8'; // fallback to NY/US test IP locally
  
  if (process.env.IPINFO_TOKEN) {
    try {
      const geoRes = await fetch(`https://ipinfo.io/${ipToQuery}?token=${process.env.IPINFO_TOKEN}`);
      if (geoRes.ok) {
        const geoJson = await geoRes.json();
        if (geoJson.region) {
          const region = geoJson.region.toLowerCase();
          if (region.includes('new york')) userState = 'NY';
          else if (region.includes('california')) userState = 'CA';
          else if (region.includes('texas')) userState = 'TX';
          else if (region.includes('washington')) userState = 'WA';
          else if (region.includes('idaho')) userState = 'ID';
          else if (region.includes('nevada')) userState = 'NV';
          else userState = geoJson.region;
        }
      }
    } catch (err) {
      console.error("IP Geolocation lookup failed:", err);
    }
  }
  return userState;
}

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

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      let { data: account, error } = await supabase
        .from('real_money_accounts')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      // Auto-resolve geofenced state on loading lobby
      const geofencedState = await getGeofencedState(request);

      if (!error && account) {
        if (account.state_residency !== geofencedState) {
          const { data: updated } = await supabase
            .from('real_money_accounts')
            .update({ state_residency: geofencedState })
            .eq('user_id', user.id)
            .select()
            .single();
          account = updated;
        }
        return NextResponse.json({ data: account, success: true });
      } else if (error && error.code === 'PGRST116') {
        // Account does not exist yet, initialize it
        const { data: newAccount } = await supabase
          .from('real_money_accounts')
          .insert({
            user_id: user.id,
            balance: 0.00,
            kyc_status: 'unverified',
            state_residency: geofencedState,
          })
          .select()
          .single();
        return NextResponse.json({ data: newAccount, success: true });
      }
    }
  } catch (err) {
    console.error("DB connection error fetching real-money account:", err);
  }

  // Fallback
  const account = getRealMoneyAccount();
  return NextResponse.json({ data: account, success: true, fallback: true });
}

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
    const { action, fullName, dob, ssnLast4, address, state, depositAmount } = body;
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      if (action === 'kyc') {
        // Enforce legal age of 18
        if (dob) {
          const birthDate = new Date(dob);
          const age = new Date().getFullYear() - birthDate.getFullYear();
          if (age < 18) {
            return NextResponse.json({ success: false, error: 'Users must be at least 18 years old to wager.' }, { status: 400 });
          }
        }

        const { data: key, error } = await supabase
          .from('real_money_accounts')
          .upsert({
            user_id: user.id,
            kyc_status: 'verified',
            kyc_data: { fullName, dob, ssnLast4, address },
            state_residency: state,
            updated_at: new Date()
          })
          .select()
          .single();

        if (!error && key) {
          return NextResponse.json({ data: key, success: true });
        }
      }

      if (action === 'deposit') {
        if (!process.env.STRIPE_SECRET_KEY) {
          return NextResponse.json({ success: false, error: 'Stripe payments are not configured on the server.' }, { status: 400 });
        }

        // Create Stripe Checkout session redirect
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Fantasy Quant Wallet Deposit',
                description: `$${depositAmount} funds deposit to real-money wallet`,
              },
              unit_amount: Math.round(parseFloat(depositAmount) * 100), // in cents
            },
            quantity: 1,
          }],
          mode: 'payment',
          metadata: {
            type: 'deposit',
            deposit_amount: depositAmount
          },
          client_reference_id: user.id,
          success_url: `${request.headers.get('origin')}/paper-trading/pickem?deposit=success`,
          cancel_url: `${request.headers.get('origin')}/paper-trading/pickem?deposit=cancel`,
        });

        return NextResponse.json({ sessionUrl: session.url, success: true });
      }

      if (action === 'change_state') {
        const { data: updated, error } = await supabase
          .from('real_money_accounts')
          .update({ state_residency: state })
          .eq('user_id', user.id)
          .select()
          .single();
        if (!error && updated) {
          return NextResponse.json({ data: updated, success: true });
        }
      }
    }
  } catch (err: any) {
    console.error("DB connection error updating real-money account:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }

  // Fallback
  const bodyMock = await request.json().catch(() => ({}));
  let account = getRealMoneyAccount();

  if (bodyMock.action === 'kyc') {
    account = updateKyc(bodyMock.fullName, bodyMock.dob, bodyMock.ssnLast4, bodyMock.address, bodyMock.state);
  } else if (bodyMock.action === 'deposit') {
    account = depositFunds(parseFloat(bodyMock.depositAmount));
  } else if (bodyMock.action === 'change_state') {
    account = changeStateResidency(bodyMock.state);
  }

  return NextResponse.json({ data: account, success: true, fallback: true });
}
