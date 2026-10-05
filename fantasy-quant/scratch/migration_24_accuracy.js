const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const sql = `
    CREATE TABLE IF NOT EXISTS projection_accuracy (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      source_id UUID REFERENCES projection_sources(id),
      season INT NOT NULL,
      week INT NOT NULL,
      rmse NUMERIC(10, 4) NOT NULL,
      brier_score NUMERIC(10, 4),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(source_id, season, week)
    );
  `;
  const { error } = await supabase.rpc('exec_sql', { query: sql });
  if (error) {
    console.error("Migration failed:", error);
    // fallback if exec_sql doesn't exist
  } else {
    console.log("Migration 24 applied.");
  }
}
run();
