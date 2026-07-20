import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

async function checkApps() {
  const res = await fetch(`${supabaseUrl}/rest/v1/apps?select=*`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
  });
  const apps = await res.json();
  console.log("Apps found in DB:", apps?.length || 0);
  console.log(apps);
}
checkApps();
