const https = require('https');
const dotenv = require('dotenv');

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

// Minimal check to ping Supabase and other APIs to ensure they are alive and keys are valid.
async function checkSupabase() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('⚠️ Supabase credentials missing. Skipping Supabase health check.');
    return;
  }

  return new Promise((resolve) => {
    const req = https.request(`${SUPABASE_URL}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    }, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        console.log('✅ Supabase Connection: HEALTHY');
      } else {
        console.error(`❌ Supabase Connection: UNHEALTHY (Status: ${res.statusCode})`);
      }
      resolve();
    });

    req.on('error', (e) => {
      console.error(`❌ Supabase Connection: FAILED (${e.message})`);
      resolve();
    });

    req.end();
  });
}

async function main() {
  console.log('🔍 Starting Key Health Autopilot Check...');
  await checkSupabase();
  // Add other API checks here (e.g., Stripe, Firebase if applicable)
  console.log('🏁 Health check complete.');
}

main();
