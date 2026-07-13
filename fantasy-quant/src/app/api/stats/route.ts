import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playerId = searchParams.get('playerId');
  const playerName = searchParams.get('playerName');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let query = supabase
    .from('player_weekly_stats')
    .select(`
      *,
      games (
        season,
        week,
        home_team,
        away_team,
        stadium,
        weather (
          temperature_f,
          wind_speed_mph,
          precipitation_type
        )
      ),
      players (
        name,
        position,
        team
      )
    `);

  if (playerId) {
    query = query.eq('player_id', playerId);
  } else if (playerName) {
    query = query.eq('players.name', playerName).not('players', 'is', null);
  }

  const { data: statsData, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Get the actual player_id from the first stat record
  const resolvedPlayerId = statsData?.[0]?.player_id;

  let adpData = [];
  let injuriesData = [];

  if (resolvedPlayerId) {
    const [adpResponse, injuriesResponse] = await Promise.all([
      supabase.from('player_adp').select('*').eq('player_id', resolvedPlayerId).eq('season', 2023),
      supabase.from('player_injuries').select('*').eq('player_id', resolvedPlayerId).eq('season', 2023)
    ]);
    
    if (adpResponse.error) console.error("ADP Fetch Error:", adpResponse.error);
    if (injuriesResponse.error) console.error("Injuries Fetch Error:", injuriesResponse.error);

    adpData = adpResponse.data || [];
    injuriesData = injuriesResponse.data || [];
  }

  return NextResponse.json({ 
    data: statsData, 
    adp: adpData,
    injuries: injuriesData 
  });
}
