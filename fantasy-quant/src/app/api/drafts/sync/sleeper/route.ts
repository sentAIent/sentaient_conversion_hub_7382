import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// https://docs.sleeper.com/
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const draftId = searchParams.get('draftId');

    if (!draftId) {
      return NextResponse.json({ error: 'Draft ID is required' }, { status: 400 });
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

    // Call sleeper API
    const res = await fetch(`https://api.sleeper.app/v1/draft/${draftId}/picks`);
    if (!res.ok) {
      throw new Error(`Failed to fetch draft from Sleeper: ${res.statusText}`);
    }

    const draftRes = await fetch(`https://api.sleeper.app/v1/draft/${draftId}`);
    const draftData = draftRes.ok ? await draftRes.json() : null;
    const leagueName = draftData?.metadata?.name || `Sleeper Draft ${draftId}`;

    const sleeperPicks = await res.json();
    
    // Map sleeper pick format to our format
    const formattedPicks = sleeperPicks.map((p: any) => ({
      manager_name: p.picked_by,
      raw_player_name: `${p.metadata.first_name} ${p.metadata.last_name}`,
      pick_round: p.round,
      pick_number: p.pick_no,
      sleeper_player_id: p.player_id,
      position: p.metadata.position,
      team: p.metadata.team
    }));

    return NextResponse.json({
      platform: "sleeper",
      draftId,
      leagueName,
      data: formattedPicks
    });
  } catch (error: any) {
    console.error('Error syncing sleeper draft:', error);
    return NextResponse.json({ error: error.message || 'Failed to sync draft' }, { status: 500 });
  }
}
