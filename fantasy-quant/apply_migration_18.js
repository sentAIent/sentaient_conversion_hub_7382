const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/fantasy-quant/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const sqlPath = '/Users/ute/.gemini/antigravity/brain/c537b53d-0120-4c75-b74c-06f69078f03b/migration_18_sos_and_resting.sql';

const sql = fs.readFileSync(sqlPath, 'utf8');

async function applyMigration() {
  const { data, error } = await supabase.rpc('exec_sql', { query_text: sql });
  if (error) {
    console.error("Migration failed:", error);
  } else {
    console.log("Migration 18 applied successfully via Node.");
  }
}

applyMigration();
