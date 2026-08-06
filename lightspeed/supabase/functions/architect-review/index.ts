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
    
    // 1. Fetch recent incidents
    const { data: incidents, error: incError } = await supabase
      .from('incidents')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (incError) throw incError;

    // 2. Read the knowledge-graph from the request body
    const reqBody = await req.json();
    const { graph } = reqBody;
    
    if (!graph || !graph.nodes) {
      throw new Error("Missing or invalid knowledge graph in request body.");
    }
    
    const uaGraphStr = JSON.stringify(graph, null, 2);

    const prompt = `You are the AI System Architect Agent. 
    Review the following architecture graph alongside recent security incidents. 
    Recommend 3 concrete architectural changes (e.g. adding WAF, breaking monolith into microservices) to prevent these incidents.
    
    Architecture Graph:
    ${uaGraphStr}

    Recent Incidents:
    ${JSON.stringify(incidents, null, 2)}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const aiData = await response.json();
    const responseText = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    if (!responseText) {
      throw new Error("Failed to generate architecture review.");
    }
    
    console.log("Architectural Recommendations Generated");
    
    // Parse the recommendations or just use a generic format
    // Since Gemini might return markdown, we'll store it as a single recommendation string for the frontend,
    // or simulate an array of objects if needed.
    const upgradeData = {
      component: "System-wide Architecture",
      recommendation: responseText,
      priority: "High"
    };

    // 3. Insert into ai_insights table
    const { error: insertError } = await supabase
      .from('ai_insights')
      .insert({
        insight_type: 'architecture_upgrade',
        data: upgradeData,
        is_active: true
      });
      
    if (insertError) throw insertError;

    return new Response(JSON.stringify({ success: true, recommendations: upgradeData }), {
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
