import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const syndicateId = searchParams.get('syndicate_id');

  if (!syndicateId) {
    return NextResponse.json({ success: false, error: "Missing syndicate_id" }, { status: 400 });
  }

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
    const { data: chats, error } = await supabase
      .from('syndicate_chats')
      .select('*')
      .eq('syndicate_id', syndicateId)
      .order('created_at', { ascending: true });

    if (!error && chats && chats.length > 0) {
      return NextResponse.json({ data: chats, success: true });
    }
  } catch (err) {
    console.error("DB connection error fetching syndicate chats:", err);
  }

  // Fallback
  const chatsList = getSyndicateChats(syndicateId);
  return NextResponse.json({ data: chatsList, success: true, fallback: true });
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
    const { syndicate_id, username, message } = body;
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: chat, error } = await supabase
        .from('syndicate_chats')
        .insert({
          syndicate_id,
          user_id: user.id,
          username,
          message
        })
        .select()
        .single();

      if (!error && chat) {
        return NextResponse.json({ data: chat, success: true });
      }
    }
  } catch (err) {
    console.error("DB connection error posting syndicate chat:", err);
  }

  // Fallback
  const body = await request.json().catch(() => ({}));
  const chat = addSyndicateChat(body.syndicate_id, body.username || "Anonymous", body.message);
  return NextResponse.json({ data: chat, success: true, fallback: true });
}
