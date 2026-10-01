import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    const season = 2026;
    const week = 1;
    
    console.log(`Fetching games for ${season} Week ${week}...`);
    const { data: games, error: gameErr } = await supabase.from('games').select('*').eq('season', season).eq('week', week);
    
    if (gameErr) {
        console.error(gameErr);
        return;
    }
    
    if (!games || games.length === 0) {
        console.log("No games found.");
        return;
    }

    console.log(`Found ${games.length} games. Generating vegas lines...`);
    
    const linesToInsert = [];
    const teamAbbrs = [];
    
    for (const g of games) {
        teamAbbrs.push(g.home_team, g.away_team);
        
        const { data: exist } = await supabase.from('game_vegas_lines').select('id').eq('game_id', g.id);
        if (exist && exist.length > 0) {
            await supabase.from('game_vegas_lines').delete().eq('game_id', g.id);
        }
            
        const spread = Math.round((Math.random() * 15 - 7.5) * 2) / 2;
        const total = Math.round((Math.random() * 12 + 41.0) * 2) / 2;
        
        let home_ml = Math.floor(spread === 0 ? -110 : (spread < 0 ? -10000/spread : 100 * spread));
        let away_ml = home_ml < 0 ? -home_ml : (home_ml + 20);
        
        const implied_home = (total / 2) - (spread / 2);
        const implied_away = (total / 2) + (spread / 2);
        
        linesToInsert.push({
            game_id: g.id,
            spread: spread,
            total: total,
            home_ml: home_ml,
            away_ml: away_ml,
            implied_home_pts: parseFloat(implied_home.toFixed(2)),
            implied_away_pts: parseFloat(implied_away.toFixed(2)),
            source: 'Synthetic Fallback (Free)'
        });
    }
        
    if (linesToInsert.length > 0) {
        await supabase.from('game_vegas_lines').insert(linesToInsert);
        console.log("Inserted game lines.");
    }
        
    console.log("Fetching top players for these teams...");
    const { data: players, error: playersErr } = await supabase.from('players').select('id, name, position, team').in('team', teamAbbrs);
    
    if (playersErr) {
        console.error(playersErr);
        return;
    }
    
    console.log(`Found ${players?.length || 0} players. Generating props...`);
    
    const propsToInsert = [];
    
    await supabase.from('player_vegas_props').delete().eq('season', season).eq('week', week);
    
    for (const p of (players || [])) {
        if (!['QB', 'RB', 'WR', 'TE'].includes(p.position)) continue;
            
        if (Math.random() > 0.4) continue;
            
        if (p.position === 'QB') {
            const propTypes = ['pass_yds', 'pass_tds'];
            for (const pt of propTypes) {
                const line = pt === 'pass_yds' ? parseFloat((Math.random() * 80 + 200).toFixed(1)) : 1.5;
                propsToInsert.push({
                    player_id: p.id,
                    season: season,
                    week: week,
                    prop_type: pt,
                    line: line,
                    over_odds: -110,
                    under_odds: -110,
                    book: 'DraftKings'
                });
            }
        } else if (p.position === 'RB') {
            propsToInsert.push({
                player_id: p.id,
                season: season,
                week: week,
                prop_type: 'rush_yds',
                line: parseFloat((Math.random() * 45 + 40).toFixed(1)),
                over_odds: -110,
                under_odds: -110,
                book: 'DraftKings'
            });
        } else if (['WR', 'TE'].includes(p.position)) {
            propsToInsert.push({
                player_id: p.id,
                season: season,
                week: week,
                prop_type: 'rec_yds',
                line: parseFloat((Math.random() * 50 + 30).toFixed(1)),
                over_odds: -110,
                under_odds: -110,
                book: 'DraftKings'
            });
        }
    }
            
    if (propsToInsert.length > 0) {
        const batchSize = 100;
        for (let i = 0; i < propsToInsert.length; i += batchSize) {
            const batch = propsToInsert.slice(i, i + batchSize);
            await supabase.from('player_vegas_props').insert(batch);
        }
        console.log(`Inserted ${propsToInsert.length} player props.`);
    }

    console.log("Backfill complete! DFS Mode should now populate.");
}

main().catch(console.error);
