import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

async function checkMetrics() {
  const res = await fetch(`${supabaseUrl}/rest/v1/metrics?select=id,site,metric_name&limit=5`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
  });
  const metrics = await res.json();
  console.log("Metrics sample:", metrics);
}
checkMetrics();
