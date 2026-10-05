import { NextResponse } from "next/server";
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const draftId = searchParams.get('draftId');

    if (!draftId) {
      return NextResponse.json({ error: "Missing ESPN Draft ID" }, { status: 400 });
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
  
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // If authenticated, simulate an ESPN draft response
    const mockPicks = [
      { manager_name: "ESPN Manager A", raw_player_name: "Christian McCaffrey", pick_round: 1, pick_number: 1, position: "RB", team: "SF" },
      { manager_name: "ESPN Manager B", raw_player_name: "Tyreek Hill", pick_round: 1, pick_number: 2, position: "WR", team: "MIA" },
      { manager_name: "ESPN Manager C", raw_player_name: "CeeDee Lamb", pick_round: 1, pick_number: 3, position: "WR", team: "DAL" },
    ];

    return NextResponse.json({
      platform: "espn",
      draftId,
      leagueName: "ESPN Elite League",
      data: mockPicks
    });
  } catch (error: any) {
    console.error('Error syncing ESPN draft:', error);
    return NextResponse.json({ error: error.message || 'Failed to sync draft' }, { status: 500 });
  }
}
