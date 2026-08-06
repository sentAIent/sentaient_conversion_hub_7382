import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const allamaWebhookUrl = Deno.env.get('ALLAMA_WEBHOOK_URL') || 'http://allama:3002/api/webhook';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' } })
  }

  try {
    const payload = await req.json(); // Expected from Supabase DB Webhook on 'incidents' insert/update
    
    // Only dispatch to ALLaMA if the incident is marked as critical or action_required
    if (payload.record && (payload.record.severity === 'critical' || payload.record.status === 'action_required')) {
      const incident = payload.record;

      console.log(`Dispatching Incident ${incident.id} to ALLaMA SOAR...`);

      // Format payload for ALLaMA ingestion
      const soarPayload = {
        source: 'lightspeed-telemetry',
        alert_id: incident.id,
        severity: incident.severity,
        title: incident.title || 'Critical Security Incident',
        description: incident.description,
        timestamp: incident.created_at,
        metadata: incident.metadata || {}
      };

      const response = await fetch(allamaWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(soarPayload)
      });

      if (!response.ok) {
          throw new Error(`ALLaMA responded with status: ${response.status}`);
      }

      console.log("Successfully dispatched to ALLaMA.");
      return new Response(JSON.stringify({ message: "Dispatched to ALLaMA" }), {
        headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ message: "Incident skipped (not critical)" }), {
      headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
      status: 200,
    });
  } catch (error) {
    console.error("Failed to dispatch to ALLaMA:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
      status: 400,
    });
  }
});
