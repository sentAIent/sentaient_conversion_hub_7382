import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const geminiApiKey = Deno.env.get('GEMINI_API_KEY') || '';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' } })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { record } = await req.json(); // Expected from Supabase DB Webhook on 'apps' insert
    
    if (!record || !record.domain) {
        throw new Error("Invalid payload. Expected a 'domain'.");
    }

    const domain = record.domain;
    
    // In a real scenario, this is where we'd fetch the HTML via fetch(`https://${domain}`) or a scraping API.
    // For now, we simulate a deep research response.
    const simulatedHtmlExtract = `<title>Staging Admin Portal</title><meta name="generator" content="WordPress 5.8"><script src="react.js"></script>`;

    const prompt = `You are the Deep Research / Web Scraping Agent. 
    Analyze the following HTML extract from the newly discovered shadow IT domain: ${domain}.
    Identify the likely tech stack, purpose of the application, and any immediate security risks (e.g. outdated WordPress).
    
    HTML Extract:
    ${simulatedHtmlExtract}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const aiData = await response.json();
    const researchFindings = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to analyze domain.";

    // Update the asset with the research findings
    const { error: updateError } = await supabase
        .from('apps')
        .update({ last_scanned: new Date().toISOString(), metadata: { deep_research: researchFindings } })
        .eq('id', record.id);

    if (updateError) throw updateError;

    return new Response(JSON.stringify({ message: "Research complete", domain, researchFindings }), {
      headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
      status: 400,
    });
  }
});
