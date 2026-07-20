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
    const { record } = await req.json(); // Supabase Webhook payload

    // Only process if explanation is a generic error message and not yet analyzed
    if (record.is_fixed || record.explanation.includes('AI Diagnosis')) {
       return new Response(JSON.stringify({ message: "Ignored" }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) throw new Error("Missing GEMINI_API_KEY");

    // 1. Call Gemini to analyze the incident
    const prompt = `You are LightSpeed, an expert AI CTO.
Analyze this technical incident from the ${record.source} system.
Incident Title: ${record.title}
Raw Error/Explanation: ${record.explanation}

Provide a short, extremely concise 1-2 sentence root cause explanation, and a 1-sentence action to fix it.
Format your response exactly like this:
EXPLANATION: [your explanation]
FIX: [your fix action]`;

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    });

    const geminiData = await geminiResponse.json();
    const text = geminiData.candidates[0].content.parts[0].text;
    
    // Parse response
    const expMatch = text.match(/EXPLANATION:\s*(.*)/i);
    const fixMatch = text.match(/FIX:\s*(.*)/i);
    
    const explanation = expMatch ? `🤖 AI Diagnosis: ${expMatch[1].trim()}` : '🤖 AI Diagnosis: Unclear error context.';
    const fix_action = fixMatch ? fixMatch[1].trim() : 'Investigate manually';

    // 2. Update the Incident in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error } = await supabase
      .from('incidents')
      .update({ explanation, fix_action })
      .eq('id', record.id);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, explanation, fix_action }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
