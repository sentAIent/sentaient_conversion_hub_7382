import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zbwnpclnxamiynwpdbed.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpid25wY2xueGFtaXlud3BkYmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzk5NDgsImV4cCI6MjA5OTcxNTk0OH0.0GkslQpzdsatDNI5qLuccamMAG_PATIpAW988FIUuO8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Generating simulated data...');
  
  const apps = [
    { id: 'sim-site-1', name: 'Simulated E-Commerce', type: 'Website' },
    { id: 'sim-app-1', name: 'Simulated Mobile App', type: 'Mobile' }
  ];
  
  await supabase.from('apps').upsert(apps);
  
  const metrics = [];
  const now = new Date();
  
  for(let i = 0; i < 365 * 4; i++) {
    const d = new Date(now.getTime() - i * 6 * 60 * 60 * 1000);
    const latency = Math.floor(Math.random() * 750) + 50;
    
    metrics.push({
      site: apps[0].id,
      metric_name: 'page_load_time',
      value: latency,
      created_at: d.toISOString()
    });
  }
  
  console.log(`Inserting ${metrics.length} metrics...`);
  for(let i = 0; i < metrics.length; i += 1000) {
    const chunk = metrics.slice(i, i + 1000);
    await supabase.from('metrics').insert(chunk);
  }
  
  const analytics = [];
  const referrers = ['Google', 'Direct', 'Twitter', 'LinkedIn', 'Facebook'];
  const devices = ['Mobile', 'Desktop', 'Tablet'];
  
  for(let i = 0; i < 1500; i++) {
    const d = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const referrer = referrers[Math.floor(Math.random() * referrers.length)];
    const device = devices[Math.floor(Math.random() * devices.length)];
    
    analytics.push({
      site: apps[0].id,
      session_id: `sim-session-${i}`,
      path: '/',
      referrer: referrer,
      device_type: device,
      created_at: d.toISOString()
    });
  }
  
  console.log(`Inserting ${analytics.length} analytics records...`);
  for(let i = 0; i < analytics.length; i += 1000) {
    const chunk = analytics.slice(i, i + 1000);
    await supabase.from('web_analytics').insert(chunk);
  }
  
  console.log('Simulation data inserted successfully!');
}

run().catch(console.error);
