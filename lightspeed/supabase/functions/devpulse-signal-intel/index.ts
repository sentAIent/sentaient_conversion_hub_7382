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
    
    // 1. Fetch recent unresolved incidents
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: incidents, error } = await supabase
      .from('incidents')
      .select('*')
      .eq('status', 'open')
      .gte('created_at', twentyFourHoursAgo);

    if (error) throw error;
    if (!incidents || incidents.length === 0) {
      return new Response(JSON.stringify({ message: "No recent incidents to summarize." }), { headers: { "Content-Type": "application/json" } });
    }

    // 2. Generate Daily Briefing using Gemini
    const prompt = `You are the DevPulse AI Signal Intelligence Agent. 
    Review the following raw incidents from the last 24 hours and generate a concise, CISO-level "Intelligence Digest". 
    Group similar issues, highlight critical threats, and ignore noise.
    
    Incidents: ${JSON.stringify(incidents, null, 2)}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const aiData = await response.json();
    const briefingText = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate briefing.";

    // 3. Store the briefing (assuming a daily_briefs table exists, otherwise just log it for now)
    console.log("Generated Briefing:", briefingText);

    return new Response(JSON.stringify({ briefing: briefingText }), {
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
