import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// This uses service role because webhooks don't have user sessions attached to the request
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, tier } = body;

    if (!user_id || !tier) {
      return NextResponse.json({ error: 'Missing user_id or tier' }, { status: 400 });
    }

    const validTiers = ['free', 'pro', 'elite'];
    if (!validTiers.includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Update user's subscription tier
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ subscription_tier: tier })
      .eq('id', user_id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, user: data });
  } catch (error: any) {
    console.error('Mock webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
