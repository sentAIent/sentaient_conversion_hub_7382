import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// This function is intended to be called by pg_cron on a daily schedule
serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1. Fetch apps that represent websites (ignoring mobile apps for now)
    const { data: apps, error: appError } = await supabase
      .from('apps')
      .select('*')
      .in('type', ['Website', 'Web App', 'WebApp', 'website', 'web']);
      
    if (appError) throw appError;
    if (!apps || apps.length === 0) {
       return new Response(JSON.stringify({ success: true, message: "No web apps found to scan." }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const auditResults = [];
    const incidents = [];

    // 2. Scan each app
    for (const app of apps) {
      let targetUrl = app.id;
      // Normalizing the URL (assuming app.id might be a domain like 'sentaient.com')
      if (!targetUrl.startsWith('http')) {
        targetUrl = `https://${targetUrl}`;
      }

      console.log(`Scanning: ${targetUrl}`);
      try {
        const response = await fetch(targetUrl, { method: 'HEAD', redirect: 'follow' });
        
        const hsts = response.headers.get('strict-transport-security');
        const csp = response.headers.get('content-security-policy');
        const xFrameOptions = response.headers.get('x-frame-options');

        const isSecure = hsts && csp && xFrameOptions;

        // Construct the audit result for this app
        auditResults.push({
          app_id: app.id,
          task_name: 'Security Headers',
          status: isSecure ? 'Completed' : 'Pending', // Pending/In Progress means it needs fixing
          stage: 'Phase 1: Perimeter',
          details: `CSP: ${csp ? '✓' : '✗'}, HSTS: ${hsts ? '✓' : '✗'}, X-Frame-Options: ${xFrameOptions ? '✓' : '✗'}`
        });

        // 3. Create an incident if it failed the basic scan
        if (!isSecure) {
          incidents.push({
            type: 'security',
            title: `Missing Security Headers on ${app.id}`,
            explanation: `The automated scanner found missing critical security headers on ${targetUrl}. CSP: ${!!csp}, HSTS: ${!!hsts}, X-Frame-Options: ${!!xFrameOptions}.`,
            fix_action: 'Pending AI Analysis...', // We can leave this pending; the analyzer will overwrite it if configured, or just leave it blank for Gemini
            is_fixed: false,
            source: app.id
          });
        }
      } catch (scanError) {
        console.error(`Failed to scan ${targetUrl}:`, scanError);
        
        auditResults.push({
          app_id: app.id,
          task_name: 'Security Headers',
          status: 'Pending',
          stage: 'Phase 1: Perimeter',
          details: `Scan Failed: ${scanError.message}`
        });

        incidents.push({
          type: 'error',
          title: `Security Audit Failed for ${app.id}`,
          explanation: `The automated scanner could not reach ${targetUrl}. Error: ${scanError.message}`,
          fix_action: 'Investigate domain resolution or server uptime.',
          is_fixed: false,
          source: app.id
        });
      }
    }

    // 4. Upsert Audit Results
    if (auditResults.length > 0) {
      const { error: upsertError } = await supabase
        .from('security_audits')
        .upsert(auditResults, { onConflict: 'app_id, task_name' });
        
      if (upsertError) throw upsertError;
    }

    // 5. Insert New Incidents
    if (incidents.length > 0) {
      // Check if open incidents for these titles already exist to prevent spam
      const titles = incidents.map(i => i.title);
      const { data: existingIncidents } = await supabase
        .from('incidents')
        .select('title')
        .in('title', titles)
        .eq('is_fixed', false);

      const existingTitles = new Set((existingIncidents || []).map(i => i.title));
      
      const newIncidents = incidents.filter(i => !existingTitles.has(i.title));
      
      if (newIncidents.length > 0) {
        const { error: incidentError } = await supabase
          .from('incidents')
          .insert(newIncidents);
          
        if (incidentError) throw incidentError;
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      scanned: apps.length,
      auditsUpdated: auditResults.length,
      incidentsCreated: incidents.length
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
