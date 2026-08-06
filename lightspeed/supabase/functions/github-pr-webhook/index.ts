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
    const payload = await req.json();

    // Only process PR events
    if (!payload.pull_request) {
      return new Response("Not a pull request event", { status: 200 });
    }

    const prTitle = payload.pull_request.title;
    const prBody = payload.pull_request.body || '';
    const diffUrl = payload.pull_request.diff_url;

    // Fetch the raw diff
    const diffResponse = await fetch(diffUrl);
    const diffText = await diffResponse.text();

    const prompt = `You are a Commit Archaeologist and Scope Creep Detector.
    Analyze the following Pull Request.
    Title: ${prTitle}
    Body: ${prBody}
    
    Diff:
    ${diffText.substring(0, 5000)} // Truncating for token limits
    
    Task:
    1. Identify the core intent of the PR.
    2. Flag any "Scope Creep" (changes that seem unrelated to the core intent).
    3. Flag any potential security anti-patterns introduced in the diff.
    
    Provide your response as a concise code review comment.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const aiData = await response.json();
    const reviewComment = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to analyze PR.";

    // In a full implementation, we would POST this comment back to the GitHub PR API.
    console.log(`[PR Review for ${prTitle}]:`, reviewComment);

    return new Response(JSON.stringify({ message: "PR Analyzed", review: reviewComment }), {
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
