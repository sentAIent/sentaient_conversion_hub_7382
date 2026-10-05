import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function calculateAccuracy(season, week) {
  console.log(`Calculating projection accuracy for Season ${season}, Week ${week}...`);

  // 1. Fetch actual stats
  const { data: stats, error: statsError } = await supabase
    .from('player_stats_weekly')
    .select('player_id, fantasy_points')
    .eq('season', season)
    .eq('week', week);

  if (statsError) {
    console.error("Error fetching stats:", statsError);
    return;
  }

  if (!stats || stats.length === 0) {
    console.log("No actual stats found for this week. Cannot calculate RMSE yet.");
    return;
  }

  const actualsMap = new Map();
  stats.forEach(s => actualsMap.set(s.player_id, s.fantasy_points));

  // 2. Fetch all projections for this slate
  // Note: slate_id might be stored as 'season_2026' or '2026_1'.
  // Since we don't have week-level slate_ids consistently yet, we'll try matching by a generic slate string if needed
  // or assuming `slate_id` could be `season_2026`. We'll just fetch all projections and match player_id.
  // Ideally, player_projections should be linked by season and week. 
  // For now we'll fetch projections that have updated_at within the week or simply fetch all.
  
  const { data: sources } = await supabase.from('projection_sources').select('*');
  const sourceMap = new Map();
  sources.forEach(s => sourceMap.set(s.id, s.name));

  const { data: projections, error: projError } = await supabase
    .from('player_projections')
    .select('player_id, source_id, projected_pts');

  if (projError) {
    console.error("Error fetching projections:", projError);
    return;
  }

  // 3. Group by source and calculate RMSE
  const sourceErrors = new Map();

  projections.forEach(p => {
    if (actualsMap.has(p.player_id) && p.projected_pts !== null) {
      const actual = actualsMap.get(p.player_id);
      const predicted = p.projected_pts;
      const squaredError = Math.pow(actual - predicted, 2);

      if (!sourceErrors.has(p.source_id)) {
        sourceErrors.set(p.source_id, { sumSqErr: 0, count: 0 });
      }
      
      const st = sourceErrors.get(p.source_id);
      st.sumSqErr += squaredError;
      st.count += 1;
    }
  });

  // 4. Save to projection_accuracy table
  for (const [sourceId, data] of sourceErrors.entries()) {
    if (data.count > 0) {
      const rmse = Math.sqrt(data.sumSqErr / data.count);
      const brier_score = null; // Brier is for probability, we are doing regression (pts)

      console.log(`Source ${sourceMap.get(sourceId) || sourceId}: RMSE = ${rmse.toFixed(4)} (N=${data.count})`);

      const { error: upsertError } = await supabase
        .from('projection_accuracy')
        .upsert({
          source_id: sourceId,
          season: season,
          week: week,
          rmse: rmse,
          brier_score: brier_score
        }, { onConflict: 'source_id,season,week' });

      if (upsertError) {
        console.error("Error upserting accuracy:", upsertError);
      }
    }
  }

  console.log("Accuracy calculation complete.");
}

// Check if running from CLI
if (process.argv[1] === import.meta.url || process.argv[1].endsWith('calculate_accuracy.mjs')) {
  // Use args or default to 2026 week 1
  const season = parseInt(process.argv[2]) || 2026;
  const week = parseInt(process.argv[3]) || 1;
  calculateAccuracy(season, week).then(() => process.exit(0));
}
