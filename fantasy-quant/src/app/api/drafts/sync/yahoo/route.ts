import { NextResponse } from "next/server";
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const draftId = searchParams.get('draftId');

    if (!draftId) {
      return NextResponse.json({ error: "Missing Yahoo Draft ID" }, { status: 400 });
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

    // To truly integrate Yahoo, you need to handle OAuth 2.0 flow
    // since Yahoo's API requires a user token.
    // For the MVP, we will simulate the OAuth challenge and return mock Yahoo data
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.includes('Bearer yahoo_mock_token')) {
      return NextResponse.json({ 
        error: "Authentication required", 
        oauthUrl: "https://api.login.yahoo.com/oauth2/request_auth?client_id=YOUR_CLIENT_ID" 
      }, { status: 401 });
    }

    // If authenticated, simulate a Yahoo draft response
    const mockPicks = [
      { manager_name: "Yahoo Manager 1", raw_player_name: "Breece Hall", pick_round: 1, pick_number: 1, position: "RB", team: "NYJ" },
      { manager_name: "Yahoo Manager 2", raw_player_name: "Ja'Marr Chase", pick_round: 1, pick_number: 2, position: "WR", team: "CIN" },
      { manager_name: "Yahoo Manager 3", raw_player_name: "Amon-Ra St. Brown", pick_round: 1, pick_number: 3, position: "WR", team: "DET" },
    ];

    return NextResponse.json({
      platform: "yahoo",
      draftId,
      leagueName: "Yahoo Public 10394",
      data: mockPicks
    });
  } catch (error: any) {
    console.error('Error syncing Yahoo draft:', error);
    return NextResponse.json({ error: error.message || 'Failed to sync draft' }, { status: 500 });
  }
}
