import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  console.log("Fetching 2023 DFS salaries...");
  const { data: salaries2023, error } = await supabase.from('player_dfs_salaries').select('*').eq('season', 2023);
  if (error) throw error;
  
  if (!salaries2023 || salaries2023.length === 0) {
    console.log("No 2023 salaries found either. Attempting to fetch 2024...");
  } else {
    console.log(`Found ${salaries2023.length} salaries for 2023. Duplicating to 2026...`);
    const newSalaries = salaries2023.map(s => {
      const copy = { ...s };
      delete copy.id; // Let UUID generate
      copy.season = 2026;
      copy.week = 1;
      return copy;
    });
    
    // Insert in batches of 500
    for(let i=0; i<newSalaries.length; i+=500) {
      const batch = newSalaries.slice(i, i+500);
      const { error: insErr } = await supabase.from('player_dfs_salaries').insert(batch);
      if (insErr) {
        console.error("Insert error:", insErr);
      } else {
        console.log(`Inserted batch ${i} to ${i+500}`);
      }
    }
    console.log("Done!");
  }
}
run();
