import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function normalizeName(name) {
  const map = {
    "Joshua Allen": "Josh Allen",
    "John Stafford": "Matthew Stafford",
    "Joseph Flacco": "Joe Flacco",
    "Kenneth Walker III": "Kenneth Walker",
    "Patrick Mahomes II": "Patrick Mahomes"
  };
  const cleanName = name.trim();
  return map[cleanName] || cleanName;
}

// Ensure sources exist
async function ensureSource(name, abbrev) {
  let { data } = await supabase.from('projection_sources').select('id').eq('name', name).limit(1);
  if (!data || data.length === 0) {
    const { data: insertData } = await supabase.from('projection_sources').insert({ name, abbreviation: abbrev }).select();
    return insertData[0].id;
  }
  return data[0].id;
}

// Load player dictionary
async function getPlayerDict() {
  const { data: players } = await supabase.from('players').select('id, name');
  const dict = {};
  for (const p of (players || [])) {
    dict[p.name.toLowerCase()] = p.id;
  }
  return dict;
}

async function run() {
  console.log("Ensuring sources exist...");
  const espnId = await ensureSource('ESPN', 'ESPN');
  const cbsId = await ensureSource('CBS Sports', 'CBS');
  const yahooId = await ensureSource('Yahoo Sports', 'YAH');

  const playerDict = await getPlayerDict();
  let inserted = 0;

  console.log("Fetching ESPN data...");
  const espnUrl = "https://fantasy.espn.com/apis/v3/games/ffl/seasons/2026/segments/0/leagues/1?view=kona_player_info";
  try {
    const res = await fetch(espnUrl, {
      headers: {
        'x-fantasy-filter': JSON.stringify({
          "players": { "limit": 300, "sortDraftRanks": { "sortPriority": 100, "sortAsc": true, "value": "STANDARD" } }
        })
      }
    });
    const data = await res.json();
    const players = data.players || [];
    
    for (const p of players) {
      const rawName = p.player.fullName;
      const normalized = normalizeName(rawName);
      const pid = playerDict[normalized.toLowerCase()];
      if (!pid) continue;

      const stats = p.player.stats || [];
      const proj = stats.find(s => s.statSourceId === 1 && s.statSplitTypeId === 0);
      const pts = proj ? proj.appliedTotal : null;

      if (pts !== null && pts > 0) {
        await supabase.from('player_projections').upsert({
          player_id: pid,
          source_id: espnId,
          projected_pts: pts,
          slate_id: 'season_2026'
        }, { onConflict: 'player_id,source_id,slate_id' });
        inserted++;
      }
    }
    console.log(`Finished processing ESPN. Total records so far: ${inserted}`);
  } catch (err) {
    console.error("ESPN fetch failed:", err.message);
  }

  console.log("Fetching CBS data...");
  // Use a generic QB URL just to get some players, then RB, WR, TE
  const cbsPositions = ['QB', 'RB', 'WR', 'TE'];
  for (const pos of cbsPositions) {
    const cbsUrl = `https://www.cbssports.com/fantasy/football/stats/${pos}/2026/restofseason/projections/nonppr/`;
    try {
      const res = await fetch(cbsUrl);
      const html = await res.text();
      const $ = cheerio.load(html);

      const rows = $('.TableBase-table tbody tr');
      for (let i = 0; i < Math.min(rows.length, 50); i++) {
        const el = rows[i];
        const rawName = $(el).find('.CellPlayerName--long a').first().text().trim();
        const fpNode = $(el).find('.TableBase-bodyTd').last().text().trim();
        
        if (!rawName) continue;
        const normalized = normalizeName(rawName);
        const pid = playerDict[normalized.toLowerCase()];
        if (!pid) continue;

        const pts = parseFloat(fpNode);
        if (!isNaN(pts) && pts > 0) {
          await supabase.from('player_projections').upsert({
            player_id: pid,
            source_id: cbsId,
            projected_pts: pts,
            slate_id: 'season_2026'
          }, { onConflict: 'player_id,source_id,slate_id' });
          inserted++;
        }
      }
    } catch (err) {
      console.error(`CBS ${pos} fetch failed:`, err.message);
    }
  }

  console.log("Fetching Yahoo data...");
  try {
    const yahooUrl = "https://football.fantasysports.yahoo.com/f1/projections?format=json";
    const res = await fetch(yahooUrl).catch(() => null);
    if (res && res.ok) {
        // parse and insert real data
        const data = await res.json();
        // logic to insert real data...
    } else {
       console.log("Yahoo public endpoint blocked or failed. Please run locally outside sandbox or provide auth token.");
    }
  } catch (err) {
    console.error("Yahoo fetch failed:", err.message);
  }

  console.log("Fetching Draft Sharks data...");
  try {
    const dsId = await ensureSource('Draft Sharks', 'DS');
    const dsUrl = "https://www.draftsharks.com/api/v1/fantasy-football-rankings";
    const res = await fetch(dsUrl).catch(() => null);
    if (res && res.ok) {
        // parse and insert real data
        const data = await res.json();
        // logic to insert real data...
    } else {
        console.log("Draft Sharks public endpoint failed. Please verify API availability.");
    }
  } catch (err) {
    console.error("Draft Sharks fetch failed:", err.message);
  }

  console.log(`Ingestion complete! Successfully inserted/updated ${inserted} projection records.`);
}

run();
