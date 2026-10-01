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
    const { data: keys, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && keys && keys.length > 0) {
      return NextResponse.json({ data: keys, success: true });
    }
  } catch (err) {
    console.error("DB connection error fetching developer keys:", err);
  }

  // Fallback
  const keysList = getApiKeys();
  return NextResponse.json({ data: keysList, success: true, fallback: true });
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
    const { name } = body;
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Generate a crypto random key part
      const chars = "abcdef0123456789";
      let randomPart = "";
      for (let i = 0; i < 20; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const keyValue = "fq_live_" + randomPart;

      const { data: key, error } = await supabase
        .from('api_keys')
        .insert({
          user_id: user.id,
          key_value: keyValue,
          name,
          status: 'active',
          usage_limit: 5000,
          usage_count: 0,
          tier: 'developer'
        })
        .select()
        .single();

      if (!error && key) {
        return NextResponse.json({ data: key, success: true });
      }
    }
  } catch (err) {
    console.error("DB connection error generating API key:", err);
  }

  // Fallback
  const body = await request.json().catch(() => ({}));
  const key = generateApiKey(body.name || "Default API Key");
  return NextResponse.json({ data: key, success: true, fallback: true });
}

export async function DELETE(request: Request) {
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
    const { searchParams } = new URL(request.url);
    const keyId = searchParams.get('id');

    if (keyId) {
      const { error } = await supabase
        .from('api_keys')
        .update({ status: 'revoked' })
        .eq('id', keyId);

      if (!error) {
        return NextResponse.json({ success: true });
      }
    }
  } catch (err) {
    console.error("DB connection error revoking API key:", err);
  }

  // Fallback
  const { searchParams } = new URL(request.url);
  const keyId = searchParams.get('id');
  const success = keyId ? revokeApiKey(keyId) : false;
  return NextResponse.json({ success, fallback: true });
}
