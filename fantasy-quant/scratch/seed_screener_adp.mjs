import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PLAYERS = [
    ["Christian McCaffrey", "RB", "SF"], ["CeeDee Lamb", "WR", "DAL"], ["Tyreek Hill", "WR", "FA"],
    ["Justin Jefferson", "WR", "MIN"], ["Ja'Marr Chase", "WR", "CIN"], ["Amon-Ra St. Brown", "WR", "DET"],
    ["Breece Hall", "RB", "NYJ"], ["Bijan Robinson", "RB", "ATL"], ["A.J. Brown", "WR", "PHI"],
    ["Puka Nacua", "WR", "LA"], ["Garrett Wilson", "WR", "NYJ"], ["Jahmyr Gibbs", "RB", "DET"],
    ["Jonathan Taylor", "RB", "IND"], ["Saquon Barkley", "RB", "PHI"], ["Kyren Williams", "RB", "LA"],
    ["Marvin Harrison Jr.", "WR", "ARI"], ["Drake London", "WR", "ATL"], ["Chris Olave", "WR", "NO"],
    ["Travis Etienne Jr.", "RB", "JAX"], ["Derrick Henry", "RB", "BAL"], ["De'Von Achane", "RB", "MIA"],
    ["Josh Allen", "QB", "BUF"], ["Jalen Hurts", "QB", "PHI"], ["Patrick Mahomes", "QB", "KC"],
    ["Isiah Pacheco", "RB", "KC"], ["Mike Evans", "WR", "TB"], ["Nico Collins", "WR", "HOU"],
    ["Michael Pittman Jr.", "WR", "IND"], ["Deebo Samuel Sr.", "WR", "SF"], ["Sam LaPorta", "TE", "DET"],
    ["Travis Kelce", "TE", "KC"], ["Josh Jacobs", "RB", "GB"], ["Rachaad White", "RB", "TB"],
    ["Lamar Jackson", "QB", "BAL"], ["C.J. Stroud", "QB", "HOU"], ["Joe Burrow", "QB", "CIN"],
    ["Anthony Richardson", "QB", "IND"], ["Dak Prescott", "QB", "DAL"], ["Kyler Murray", "QB", "ARI"],
    ["Jordan Love", "QB", "GB"], ["Trey McBride", "TE", "ARI"], ["Mark Andrews", "TE", "BAL"],
    ["Dalton Kincaid", "TE", "BUF"], ["George Kittle", "TE", "SF"], ["Kyle Pitts", "TE", "ATL"],
    ["Evan Engram", "TE", "JAX"], ["David Njoku", "TE", "CLE"], ["Jake Ferguson", "TE", "DAL"],
    // Extended WRs/RBs/TEs
    ["DJ Moore", "WR", "CHI"], ["DK Metcalf", "WR", "SEA"], ["DeVonta Smith", "WR", "PHI"],
    ["Cooper Kupp", "WR", "LA"], ["Stefon Diggs", "WR", "HOU"], ["Zay Flowers", "WR", "BAL"],
    ["Tee Higgins", "WR", "CIN"], ["Amari Cooper", "WR", "CLE"], ["George Pickens", "WR", "PIT"],
    ["Keenan Allen", "WR", "CHI"], ["Christian Kirk", "WR", "JAX"], ["Terry McLaurin", "WR", "WAS"],
    ["Alvin Kamara", "RB", "NO"], ["Aaron Jones", "RB", "MIN"], ["Joe Mixon", "RB", "HOU"],
    ["D'Andre Swift", "RB", "CHI"], ["James Cook", "RB", "BUF"], ["Kenneth Walker III", "RB", "SEA"],
    ["Najee Harris", "RB", "PIT"], ["Zamir White", "RB", "LV"], ["Tony Pollard", "RB", "TEN"],
    ["Brian Robinson Jr.", "RB", "WAS"], ["Austin Ekeler", "RB", "WAS"], ["Javonte Williams", "RB", "DEN"],
    ["Brock Purdy", "QB", "SF"], ["Tua Tagovailoa", "QB", "MIA"], ["Jared Goff", "QB", "DET"],
    ["Caleb Williams", "QB", "CHI"], ["Justin Herbert", "QB", "LAC"], ["Jayden Daniels", "QB", "WAS"],
    ["Trevor Lawrence", "QB", "JAX"], ["Matthew Stafford", "QB", "LA"], ["Aaron Rodgers", "QB", "NYJ"],
    ["Dallas Goedert", "TE", "PHI"], ["T.J. Hockenson", "TE", "MIN"], ["Dalton Schultz", "TE", "HOU"],
    ["Cole Kmet", "TE", "CHI"], ["Pat Freiermuth", "TE", "PIT"], ["Luke Musgrave", "TE", "GB"]
];

async function main() {
  console.log('Clearing old player_adp...');
  await supabase.from('player_adp').delete().neq('adp', -1);
  
  console.log('Inserting top players...');
  for (let i = 0; i < PLAYERS.length; i++) {
    const [name, position, team] = PLAYERS[i];
    
    // Check if player exists
    let { data: existing } = await supabase.from('players').select('id').eq('name', name).limit(1);
    let playerId;
    
    if (existing && existing.length > 0) {
      playerId = existing[0].id;
    } else {
      playerId = uuidv4();
      await supabase.from('players').insert({
        id: playerId,
        name,
        position,
        team,
        data_source: 'nflverse'
      });
    }
    
    // Insert ADP
    // Add some random variation to standard and half_ppr to make it look realistic
    const adpBase = i + 1;
    const records = [
      { player_id: playerId, format: 'ppr', adp: adpBase + (Math.random() * 0.5) },
      { player_id: playerId, format: 'standard', adp: adpBase + (Math.random() * 1.5 - 0.5) },
      { player_id: playerId, format: 'half_ppr', adp: adpBase + (Math.random() * 1.0 - 0.2) }
    ];
    
    await supabase.from('player_adp').insert(records);
    if ((i + 1) % 10 === 0) console.log(`Processed ${i + 1}/${PLAYERS.length}`);
  }
  
  console.log('Done.');
}
main();
