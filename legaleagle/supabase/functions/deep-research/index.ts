import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { url, query, task_id } = body;

    if (!url && !task_id) {
      throw new Error("URL or task_id is required");
    }

    // Replace with your actual Crawl4AI VPS IP/Domain
    const CRAWL4AI_URL = Deno.env.get("CRAWL4AI_URL") || "http://localhost:11235";
    const CRAWL4AI_API_TOKEN = Deno.env.get("CRAWL4AI_API_TOKEN") || "";

    if (task_id) {
      // Polling existing task
      console.log(`Polling task ID: ${task_id}`);
      const pollReq = await fetch(`${CRAWL4AI_URL}/task/${task_id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${CRAWL4AI_API_TOKEN}`
        }
      });

      if (!pollReq.ok) {
        const errText = await pollReq.text();
        console.error("Crawl4AI Polling Error:", errText);
        throw new Error(`Crawl4AI polling failed with status ${pollReq.status}`);
      }

      const pollRes = await pollReq.json();
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Polled successfully",
          data: pollRes 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    console.log(`Sending crawl request for URL: ${url}`);

    const crawlReq = await fetch(`${CRAWL4AI_URL}/crawl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CRAWL4AI_API_TOKEN}`
      },
      body: JSON.stringify({
        urls: url,
        priority: 10
      })
    });

    if (!crawlReq.ok) {
      const errText = await crawlReq.text();
      console.error("Crawl4AI Error:", errText);
      throw new Error(`Crawl4AI failed with status ${crawlReq.status}`);
    }

    const crawlRes = await crawlReq.json();
    console.log("Crawl Result ID/Data:", crawlRes.task_id || "Direct Result");

    // In a real production environment, you might need to poll the task_id if it's asynchronous.
    // For simplicity, we assume synchronous/fast return or a polling endpoint.
    // We will return the task_id and let the client handle polling if needed, or if it returns directly:

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Crawl request successful",
        data: crawlRes 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in deep-research edge function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
