import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

async function getCache(key: string) {
  if (!process.env.UPSTASH_REDIS_REST_URL) return null;
  try {
    const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` }
    });
    const json = await res.json();
    return json.result ? JSON.parse(json.result) : null;
  } catch (e) { return null; }
}

async function setCache(key: string, value: any, ttlSeconds: number = 3600) {
  if (!process.env.UPSTASH_REDIS_REST_URL) return;
  try {
    await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/${key}?EX=${ttlSeconds}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
      body: JSON.stringify(value)
    });
  } catch (e) {}
}

export async function GET() {
  const cacheKey = 'screener_players_v2';
  const cached = await getCache(cacheKey);
  if (cached) return NextResponse.json({ data: cached });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch players with their projections instead of player_adp
  const { data: players, error } = await supabase
    .from('players')
    .select(`
      id,
      name,
      position,
      team,
      player_projections (
        projected_pts
      )
    `);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Map projections to a synthetic ADP/rank based on projected points so the Draft Board works
  const mappedPlayers = players.map(p => {
    let totalPts = 0;
    let count = 0;
    if (p.player_projections && p.player_projections.length > 0) {
      for (const proj of p.player_projections) {
        totalPts += Number(proj.projected_pts) || 0;
        count++;
      }
    }
    const avgPts = count > 0 ? totalPts / count : 0;
    return { ...p, _avgPts: avgPts };
  });

  // Sort by average projected points descending
  mappedPlayers.sort((a, b) => b._avgPts - a._avgPts);

  // Assign a rank (1 to N) to serve as ADP for the draft board
  mappedPlayers.forEach((p, index) => {
    // If they have no projections, put them at the very end
    const rank = p._avgPts > 0 ? index + 1 : 999;
    
    // Inject the player_adp shape that DraftBoard.tsx expects
    p.player_adp = [
      { format: 'ppr', adp: rank }
    ];
    delete p._avgPts; // Cleanup temporary field
    delete p.player_projections; 
  });

  await setCache(cacheKey, mappedPlayers, 3600); // 1 hour cache

  return NextResponse.json({ data: mappedPlayers });
}
