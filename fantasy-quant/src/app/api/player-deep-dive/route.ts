import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const team = searchParams.get('team') || 'DAL'; 
  const position = searchParams.get('position') || 'WR';
  const premium = searchParams.get('premium') === 'true'; // Phase 9 Premium Flag

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 1. Fetch game-level SOS and Vegas data for the specific team
    const { data: games, error } = await supabase
      .from('game_level_sos_matrix')
      .select('*')
      .eq('team', team)
      .order('season', { ascending: false })
      .order('week', { ascending: true })
      .limit(51);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // 2. Format hierarchically for the Semantic Zoom UI
    const seasonsMap: any = {};
    
    // In a real scenario, we'd fetch matchups specifically for the requested player.
    // Since our DB query is currently team-level, we fetch team matchups if premium is true.
    let matchupsByGame: any = {};
    if (premium) {
      const gameIds = games?.map(g => g.game_id) || [];
      if (gameIds.length > 0) {
        const { data: matchups } = await supabase
          .from('micro_matchups')
          .select('*')
          .in('game_id', gameIds)
          .eq('offensive_team', team);
          
        if (matchups) {
          matchups.forEach(m => {
            if (!matchupsByGame[m.game_id]) matchupsByGame[m.game_id] = [];
            matchupsByGame[m.game_id].push(m);
          });
        }
      }
    }
    
    (games || []).forEach(game => {
      if (!seasonsMap[game.season]) {
        seasonsMap[game.season] = {
          season: game.season,
          avgImpliedTotal: 0,
          avgOppFpaRank: 0,
          games: []
        };
      }
      
      const rankField = `opp_${position.toLowerCase()}_fpa_rank`;
      const fpaRank = game[rankField] || 16;
      
      seasonsMap[game.season].games.push({
        gameId: game.game_id,
        week: game.week,
        opponent: game.opponent,
        isHome: game.is_home,
        spread: game.spread_line,
        total: game.total_line,
        impliedTotal: game.implied_team_total,
        oppFpaRank: fpaRank,
        matchups: premium ? (matchupsByGame[game.game_id] || []) : null
      });
    });

    // Calculate season averages
    const structuredData = Object.values(seasonsMap).map((s: any) => {
      const validTotals = s.games.map((g:any) => g.impliedTotal).filter(Boolean);
      s.avgImpliedTotal = validTotals.length > 0 ? (validTotals.reduce((a:number,b:number) => a+b, 0) / validTotals.length) : 0;
      
      const validRanks = s.games.map((g:any) => g.oppFpaRank).filter(Boolean);
      s.avgOppFpaRank = validRanks.length > 0 ? (validRanks.reduce((a:number,b:number) => a+b, 0) / validRanks.length) : 0;
      
      return s;
    });

    return NextResponse.json({
      success: true,
      data: structuredData
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
