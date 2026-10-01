import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { player_id: provided_player_id, player_name, combine_stats, historical_stats, tendencies, usage_splits } = await request.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    let player_id = provided_player_id;
    if (!player_id && player_name) {
      const { data: player, error: pErr } = await supabase
        .from('players')
        .select('id')
        .ilike('name', player_name)
        .limit(1)
        .single();
      if (player) {
        player_id = player.id;
      }
    }

    const responses = [];

    if (combine_stats) {
      const { data, error } = await supabase
        .from('player_combine_stats')
        .upsert({ player_id, ...combine_stats }, { onConflict: 'player_id' });
      if (error) throw new Error(`Combine error: ${error.message}`);
      responses.push({ type: 'combine', success: true });
    }

    if (historical_stats && Array.isArray(historical_stats)) {
      const { data, error } = await supabase
        .from('historical_stats')
        .upsert(historical_stats.map(s => ({ player_id, ...s })), { onConflict: 'player_id,level_of_play,season' });
      if (error) throw new Error(`Historical error: ${error.message}`);
      responses.push({ type: 'historical', success: true });
    }

    if (tendencies) {
      const { data, error } = await supabase
        .from('offensive_tendencies')
        .upsert({ ...tendencies }, { onConflict: 'team,season,week' });
      if (error) throw new Error(`Tendency error: ${error.message}`);
      responses.push({ type: 'tendency', success: true });
    }

    if (usage_splits) {
      const { data, error } = await supabase
        .from('player_usage_splits')
        .upsert({ player_id, ...usage_splits }, { onConflict: 'player_id,season,week' });
      if (error) throw new Error(`Usage split error: ${error.message}`);
      responses.push({ type: 'usage_splits', success: true });
    }

    return NextResponse.json({ success: true, ingested: responses });
  } catch (err: any) {
    console.error("Scouting ingestion failed:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
