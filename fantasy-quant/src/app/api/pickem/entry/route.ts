import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Return entries list
  return NextResponse.json({ data: getPickemEntries(), success: true, fallback: true });
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
    const { legs, entryFee } = body;
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // 1. Fetch user account details
      const { data: account } = await supabase
        .from('real_money_accounts')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (account) {
        // Enforce state geo-blocking check
        if (ILLEGAL_STATES.includes(account.state_residency)) {
          return NextResponse.json({ success: false, error: `Real-money Pick'em is restricted in your state: ${account.state_residency}` }, { status: 403 });
        }

        if (account.kyc_status !== 'verified') {
          return NextResponse.json({ success: false, error: 'KYC Verification is required before placing wagers.' }, { status: 400 });
        }

        const balance = parseFloat(account.balance as any);
        if (balance < entryFee) {
          return NextResponse.json({ success: false, error: 'Insufficient balance.' }, { status: 400 });
        }

        // Deduct balance
        const newBalance = balance - entryFee;
        await supabase
          .from('real_money_accounts')
          .update({ balance: newBalance })
          .eq('user_id', user.id);

        let multiplier = 3.0;
        if (legs.length === 3) multiplier = 5.0;
        if (legs.length === 4) multiplier = 8.0;
        if (legs.length >= 5) multiplier = 10.0;

        // Place entry
        const { data: entry, error } = await supabase
          .from('real_money_entries')
          .insert({
            user_id: user.id,
            entry_fee: entryFee,
            legs,
            multiplier,
            status: 'pending'
          })
          .select()
          .single();

        if (!error && entry) {
          return NextResponse.json({ data: entry, success: true });
        }
      }
    }
  } catch (err) {
    console.error("DB connection error placing Pick'em entry:", err);
  }

  // Fallback
  try {
    const body = await request.json().catch(() => ({}));
    const entry = placePickemEntry(body.legs, parseFloat(body.entryFee));
    return NextResponse.json({ data: entry, success: true, fallback: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
