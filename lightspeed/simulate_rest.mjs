const supabaseUrl = 'https://zbwnpclnxamiynwpdbed.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpid25wY2xueGFtaXlud3BkYmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzk5NDgsImV4cCI6MjA5OTcxNTk0OH0.0GkslQpzdsatDNI5qLuccamMAG_PATIpAW988FIUuO8';

async function request(table, method, data) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
    method,
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function run() {
  console.log('Generating simulated data...');
  
  const apps = [
    { id: 'sentaient.com', name: 'Sentaient Corporate', type: 'Website' },
    { id: 'cloveh2o.com', name: 'Clove H2O', type: 'Website' },
    { id: 'app.sentaient.com', name: 'Sentaient Web App', type: 'Website' },
    { id: 'sentaient-ios', name: 'Sentaient iOS App', type: 'Mobile' },
    { id: 'sentaient-android', name: 'Sentaient Android App', type: 'Mobile' },
    { id: 'internal-dash', name: 'Internal Dashboard', type: 'Website' },
    { id: 'customer-portal', name: 'Customer Portal', type: 'Website' },
    { id: 'auth-service', name: 'Auth Microservice', type: 'API' },
    { id: 'payment-gateway', name: 'Payment API', type: 'API' },
    { id: 'marketing-site', name: 'Marketing Landing Page', type: 'Website' }
  ];
  
  const idList = apps.map(a => a.id).join(',');
  const existingAppsReq = await fetch(`${supabaseUrl}/rest/v1/apps?id=in.(${idList})`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });
  const existingApps = await existingAppsReq.json();
  const existingIds = existingApps.map(a => a.id);
  
  const appsToInsert = apps.filter(a => !existingIds.includes(a.id));
  if (appsToInsert.length > 0) {
    await request('apps', 'POST', appsToInsert);
  }
  
  const metrics = [];
  const now = new Date();
  
  for(let i = 0; i < 365 * 4; i++) {
    const d = new Date(now.getTime() - i * 6 * 60 * 60 * 1000);
    
    for (const app of apps) {
      const latency = Math.floor(Math.random() * 750) + 50;
      metrics.push({
        site: app.id,
        metric_name: 'page_load_time',
        value: latency,
        created_at: d.toISOString()
      });
    }
  }
  
  console.log(`Inserting ${metrics.length} metrics...`);
  for(let i = 0; i < metrics.length; i += 1000) {
    const chunk = metrics.slice(i, i + 1000);
    await request('metrics', 'POST', chunk);
  }
  
  const analytics = [];
  const referrers = ['Google', 'Direct', 'Twitter', 'LinkedIn', 'Facebook'];
  const devices = ['Mobile', 'Desktop', 'Tablet'];
  
  for(let i = 0; i < 1500; i++) {
    const d = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const referrer = referrers[Math.floor(Math.random() * referrers.length)];
    const device = devices[Math.floor(Math.random() * devices.length)];
    
    for (const app of apps) {
      analytics.push({
        site: app.id,
        session_id: `sim-session-${app.id}-${i}`,
        path: '/',
        referrer: referrer,
        device_type: device,
        created_at: d.toISOString()
      });
    }
  }
  
  console.log(`Inserting ${analytics.length} analytics records...`);
  for(let i = 0; i < analytics.length; i += 1000) {
    const chunk = analytics.slice(i, i + 1000);
    await request('web_analytics', 'POST', chunk);
  }
  
  console.log('Simulation data inserted successfully!');
}

run().catch(console.error);
