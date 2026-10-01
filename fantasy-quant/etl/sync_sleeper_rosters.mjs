import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function syncRosters() {
  console.log("Fetching live 2026 roster data from Sleeper API...");
  const res = await fetch('https://api.sleeper.app/v1/players/nfl');
  const sleeperData = await res.json();
  
  console.log("Fetching current database players...");
  const { data: dbPlayers, error } = await supabase.from('players').select('id, name, team');
  if (error) {
    console.error("Failed to fetch players:", error);
    process.exit(1);
  }

  const overrides = {
    'Aaron Donald': 'LAR',
    'Myles Garrett': 'LAR',
    'Trent McDuffie': 'LAR'
  };

  let updates = [];
  let noMatchCount = 0;

  for (const dbPlayer of dbPlayers) {
    // Check overrides first
    if (overrides[dbPlayer.name]) {
      if (dbPlayer.team !== overrides[dbPlayer.name]) {
        updates.push({ ...dbPlayer, team: overrides[dbPlayer.name] });
      }
      continue;
    }

    // Find in Sleeper data (search by full name)
    const sleeperPlayer = Object.values(sleeperData).find(p => p.full_name === dbPlayer.name && p.active !== false);
    
    if (sleeperPlayer && sleeperPlayer.team) {
      let sleeperTeam = sleeperPlayer.team;
      // Normalize JAX -> JAC or LAR -> LA depending on what DB uses. DB uses LAR, JAX.
      if (sleeperTeam === 'LA') sleeperTeam = 'LAR';
      if (sleeperTeam === 'JAC') sleeperTeam = 'JAX';
      if (sleeperTeam === 'LV') sleeperTeam = 'LV';

      if (dbPlayer.team !== sleeperTeam) {
        updates.push({ ...dbPlayer, team: sleeperTeam });
      }
    } else {
      noMatchCount++;
    }
  }

  console.log(`Found ${updates.length} anachronisms/stale teams to update.`);
  console.log(`Could not definitively map ${noMatchCount} players (retired/inactive).`);

  if (updates.length > 0) {
    console.log("Executing massive roster reconciliation...");
    const chunkSize = 500;
    for (let i = 0; i < updates.length; i += chunkSize) {
      const chunk = updates.slice(i, i + chunkSize);
      const { error: upsertErr } = await supabase.from('players').upsert(chunk);
      if (upsertErr) console.error("Error upserting chunk:", upsertErr);
    }
    console.log("Live roster synchronization complete.");
  }
}

syncRosters().catch(console.error).finally(() => process.exit(0));
