import { NextResponse } from "next/server";
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const draftId = searchParams.get('draftId');

    if (!draftId) {
      return NextResponse.json({ error: "Missing CBS Draft ID" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); }
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Restrict to Pro/Max tiers
    const { data: settings } = await supabase
      .from('user_settings')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    if (!settings || (settings.subscription_tier !== 'pro' && settings.subscription_tier !== 'max')) {
      return NextResponse.json({ error: 'League Sync requires a Pro or Max subscription.' }, { status: 403 });
    }

    // CBS Integration MVP
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // If authenticated, simulate a CBS draft response
    const mockPicks = [
      { manager_name: "CBS Manager X", raw_player_name: "Justin Jefferson", pick_round: 1, pick_number: 1, position: "WR", team: "MIN" },
      { manager_name: "CBS Manager Y", raw_player_name: "Bijan Robinson", pick_round: 1, pick_number: 2, position: "RB", team: "ATL" },
      { manager_name: "CBS Manager Z", raw_player_name: "Amari Cooper", pick_round: 1, pick_number: 3, position: "WR", team: "CLE" },
    ];

    return NextResponse.json({
      platform: "cbs",
      draftId,
      leagueName: "CBS Sports Fantasy",
      data: mockPicks
    });
  } catch (error: any) {
    console.error('Error syncing CBS draft:', error);
    return NextResponse.json({ error: error.message || 'Failed to sync draft' }, { status: 500 });
  }
}
