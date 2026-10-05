import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
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
      const { data, error } = await supabase
        .from('creator_profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (!error && data) {
        return NextResponse.json({ data, success: true });
      }
    }
  } catch (err) {
    console.error("DB connection error fetching creator profile:", err);
  }

  // Fallback to mock profile
  const profile = getCurrentUserCreatorProfile();
  return NextResponse.json({ data: profile, success: true, fallback: true });
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
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data, error } = await supabase
        .from('creator_profiles')
        .upsert({
          id: user.id,
          is_creator: body.is_creator,
          bio: body.bio,
          subscription_price: body.subscription_price,
          subscription_price_coins: body.subscription_price_coins,
          stripe_connect_id: body.stripe_connect_id || 'acct_mock' + Math.random().toString(36).substring(7),
          updated_at: new Date()
        })
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ data, success: true });
      }
    }
  } catch (err) {
    console.error("DB connection error updating creator profile:", err);
  }

  // Fallback update mock profile
  const body = await request.json().catch(() => ({}));
  const updated = updateCurrentUserCreatorProfile(body);
  return NextResponse.json({ data: updated, success: true, fallback: true });
}
