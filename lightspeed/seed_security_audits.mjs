import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const securityTasks = [
  { task_name: 'Security Headers', stage: 'Phase 1: Perimeter', details: 'CSP, HSTS, X-Frame-Options, XSS Protection' },
  { task_name: 'SSL/TLS Configuration', stage: 'Phase 1: Perimeter', details: 'Ensure modern TLS is enforced' },
  { task_name: 'Dependency Scanning (SCA)', stage: 'Phase 2: App Sec', details: 'Regularly scan for vulnerable third-party packages' },
  { task_name: 'WAF & Bot Protection', stage: 'Phase 1: Perimeter', details: 'Configure rate limiting and malicious bot blocking' },
  { task_name: 'Secrets Management', stage: 'Phase 2: App Sec', details: 'Audit for hardcoded secrets and env var injection' },
  { task_name: 'Authentication Hardening', stage: 'Phase 3: Identity', details: 'Secure session cookies (HttpOnly/Secure) and MFA' },
  { task_name: 'Data Encryption & Backups', stage: 'Phase 4: Data', details: 'Verify Point-in-Time Recovery and encryption at rest' },
  { task_name: 'CORS Configuration', stage: 'Phase 1: Perimeter', details: 'Restrict API endpoints to verified origins' },
  { task_name: 'Database RLS Audit', stage: 'Phase 4: Data', details: 'Ensure strict Row Level Security on all Supabase tables' },
  { task_name: 'Subdomain Takeover Check', stage: 'Phase 1: Perimeter', details: 'Verify all DNS records point to active resources' },
];

async function seedAudits() {
  // Get all apps
  const { data: apps, error: appsError } = await supabase.from('apps').select('id');
  if (appsError) {
    console.error('Error fetching apps:', appsError);
    return;
  }

  if (!apps || apps.length === 0) {
    console.log('No apps found to seed.');
    return;
  }

  const auditsToInsert = [];
  
  for (const app of apps) {
    for (const task of securityTasks) {
      // For sentaient.com and cloveh2o.com, mark Security Headers as Completed
      let status = 'Pending';
      if (task.task_name === 'Security Headers' && (app.id === 'sentaient.com' || app.id === 'cloveh2o.com')) {
        status = 'Completed';
      }

      auditsToInsert.push({
        app_id: app.id,
        task_name: task.task_name,
        status: status,
        stage: task.stage,
        details: task.details
      });
    }
  }

  const { error: insertError } = await supabase.from('security_audits').upsert(auditsToInsert, { onConflict: 'app_id, task_name' });
  
  if (insertError) {
    console.error('Error inserting security audits:', insertError);
  } else {
    console.log(`Successfully seeded ${auditsToInsert.length} security audit records across ${apps.length} apps.`);
  }
}

seedAudits();
