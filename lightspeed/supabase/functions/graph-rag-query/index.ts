import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { query } = await req.json()
    if (!query) {
      return new Response(JSON.stringify({ error: 'Query is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Load Knowledge Graph data
    let kgData = "";
    try {
      const kgRaw = await Deno.readTextFile("./knowledge-graph.json");
      kgData = kgRaw;
    } catch (e) {
      console.error("Could not load knowledge graph:", e);
      kgData = "No knowledge graph data available.";
    }

    // Call Gemini API
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY is not set' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: `You are an intelligent cybersecurity Graph-RAG assistant. Answer the user's query based ONLY on the provided knowledge graph data.\n\nKnowledge Graph Data:\n${kgData}\n\nUser Query: ${query}` }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    
    let answer = "I couldn't generate an answer.";
    if (data.candidates && data.candidates.length > 0) {
      answer = data.candidates[0].content.parts[0].text;
    }

    return new Response(
      JSON.stringify({ answer }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
