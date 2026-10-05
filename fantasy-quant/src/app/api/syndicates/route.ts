import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

function createClient(cookieStore: any) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Always use ANON key for RLS on client requests!
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
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
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: syndicates, error } = await supabase
      .from('syndicates')
      .select(`
        *,
        creator:auth.users (id),
        syndicate_contributions (*),
        syndicate_lineups (*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase Error fetching syndicates:", error);
      return NextResponse.json({ error: "Failed to fetch syndicates" }, { status: 500 });
    }

    return NextResponse.json({ data: syndicates || [], success: true });
  } catch (err: any) {
    console.error("API GET /syndicates error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized', details: authError?.message }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, target_contest, contest_entry_fee, max_entries } = body;

    // Input Validation
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Invalid name. Must be a string.' }, { status: 400 });
    }
    if (typeof contest_entry_fee !== 'number' || contest_entry_fee <= 0) {
      return NextResponse.json({ error: 'Invalid contest_entry_fee. Must be a positive number.' }, { status: 400 });
    }
    if (typeof max_entries !== 'number' || max_entries <= 0 || !Number.isInteger(max_entries)) {
      return NextResponse.json({ error: 'Invalid max_entries. Must be a positive integer.' }, { status: 400 });
    }

    const total_target_pool = contest_entry_fee * max_entries;
    
    const { data: syn, error } = await supabase
      .from('syndicates')
      .insert([{
        name,
        creator_id: user.id,
        description: description || '',
        target_contest: target_contest || '',
        contest_entry_fee,
        total_target_pool,
        max_entries,
        current_pool_balance: 0.00,
        status: 'funding'
      }])
      .select()
      .single();

    if (error) {
      console.error("Supabase Error creating syndicate:", error);
      return NextResponse.json({ error: "Failed to create syndicate" }, { status: 500 });
    }

    return NextResponse.json({ data: syn, success: true }, { status: 201 });
  } catch (err: any) {
    console.error("API POST /syndicates error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
