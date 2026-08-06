import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Basic Authentication: check for a Bearer token or API key
    const authHeader = req.headers.get('authorization');
    const expectedToken = Deno.env.get('WEBHOOK_SECRET_TOKEN');
    
    // In production, you would want a more robust check, but for now we verify a static token if set
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { 
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    const payload = await req.json();

    // Normalizing different webhook formats
    let title = 'Unknown Incident';
    let explanation = 'No explanation provided.';
    let type = 'error';
    let source = 'webhook';

    // GitHub Dependabot/Code Scanning Alert format
    if (payload.alert && payload.repository) {
      type = 'security';
      source = `github:${payload.repository.name}`;
      title = payload.alert.rule?.description || payload.alert.security_advisory?.summary || 'GitHub Security Alert';
      explanation = `Severity: ${payload.alert.rule?.security_severity_level || payload.alert.security_advisory?.severity}. URL: ${payload.alert.html_url}`;
    } 
    // Datadog/Generic Alert format
    else if (payload.title && (payload.body || payload.message)) {
      title = payload.title;
      explanation = payload.body || payload.message;
      source = payload.source || 'datadog';
      type = payload.type || 'error';
    } 
    // Vercel / Netlify Deploy Failures
    else if (payload.type === 'deployment_failed' && payload.payload) {
      title = `Deployment Failed: ${payload.payload.name}`;
      explanation = `Commit: ${payload.payload.commit_message || 'N/A'}, Branch: ${payload.payload.branch}. URL: ${payload.payload.url}`;
      source = payload.payload.name;
    }
    // Fallback: Dump payload
    else {
       title = payload.title || payload.subject || 'Generic Webhook Alert';
       explanation = JSON.stringify(payload).substring(0, 500); // Truncate to 500 chars
       source = payload.source || payload.app || 'unknown';
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data, error } = await supabase
      .from('incidents')
      .insert({
        type,
        title,
        explanation,
        fix_action: 'Pending AI Analysis...', // Leave this pending, webhook trigger for analyze-incident will kick in
        is_fixed: false,
        source
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, incident_id: data.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Webhook Ingestion Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
