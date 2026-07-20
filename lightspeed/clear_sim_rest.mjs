const supabaseUrl = 'https://zbwnpclnxamiynwpdbed.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpid25wY2xueGFtaXlud3BkYmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzk5NDgsImV4cCI6MjA5OTcxNTk0OH0.0GkslQpzdsatDNI5qLuccamMAG_PATIpAW988FIUuO8';

async function request(table, method, queryString = '') {
  const res = await fetch(`${supabaseUrl}/rest/v1/${table}${queryString}`, {
    method,
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed: ${res.status} ${text}`);
  }
}

async function run() {
  console.log('Clearing simulated data...');
  
  await request('web_analytics', 'DELETE', '?session_id=like.sim-session-*');
  await request('metrics', 'DELETE', '?site=eq.sim-site-1');
  await request('metrics', 'DELETE', '?site=eq.sim-app-1');
  
  await request('apps', 'DELETE', '?id=eq.sim-site-1');
  await request('apps', 'DELETE', '?id=eq.sim-app-1');
  
  console.log('Simulation data cleared successfully!');
}

run().catch(console.error);
