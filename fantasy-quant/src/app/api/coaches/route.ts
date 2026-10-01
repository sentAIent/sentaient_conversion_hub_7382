import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

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

  const { searchParams } = new URL(request.url);
  const team = searchParams.get('team');

  // Try DB first
  try {
    let query = supabase.from('coaches').select(`
      *,
      coaching_contracts (*)
    `);
    
    if (team) {
      query = query.eq('team', team.toUpperCase());
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return NextResponse.json({ data, success: true });
    }
  } catch (err) {
    console.error("DB connection error in coaches API:", err);
  }

  return NextResponse.json({ error: "Failed to fetch data", success: false }, { status: 500 });
}
