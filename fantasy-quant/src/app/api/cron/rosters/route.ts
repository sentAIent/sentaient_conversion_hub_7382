import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const res = await fetch('https://api.sleeper.app/v1/players/nfl');
    const sleeperData = await res.json();
    
    const { data: dbPlayers } = await supabase.from('players').select('id, name, team');
    if (!dbPlayers) throw new Error("Could not fetch players");

    const overrides: Record<string, string> = {
      'Aaron Donald': 'LAR',
      'Myles Garrett': 'LAR',
      'Trent McDuffie': 'LAR'
    };

    let updates = [];

    for (const dbPlayer of dbPlayers) {
      if (overrides[dbPlayer.name]) {
        if (dbPlayer.team !== overrides[dbPlayer.name]) {
          updates.push({ id: dbPlayer.id, team: overrides[dbPlayer.name] });
        }
        continue;
      }
      
      const sleeperPlayer = Object.values(sleeperData).find((p: any) => p.full_name === dbPlayer.name && p.active !== false) as any;
      
      if (sleeperPlayer && sleeperPlayer.team) {
        let sleeperTeam = sleeperPlayer.team;
        if (sleeperTeam === 'LA') sleeperTeam = 'LAR';
        if (sleeperTeam === 'JAC') sleeperTeam = 'JAX';

        if (dbPlayer.team !== sleeperTeam) {
          updates.push({ id: dbPlayer.id, team: sleeperTeam });
        }
      }
    }

    // Process updates sequentially as this is a background cron
    for (const u of updates) {
      await supabase.from('players').update({ team: u.team }).eq('id', u.id);
    }

    return NextResponse.json({ success: true, updated: updates.length });
  } catch (err: any) {
    console.error('Roster sync error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
