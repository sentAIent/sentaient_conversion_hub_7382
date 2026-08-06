import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Edge function to sync Plaid transactions
serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    // 1. Fetch unprocessed webhooks
    const { data: webhooks, error: webhookError } = await supabaseClient
      .from('plaid_webhooks')
      .select('*')
      .eq('processed', false)
      .limit(50);

    if (webhookError) throw webhookError;

    let processedCount = 0;
    
    // 2. For each webhook, we'd normally call the Plaid /transactions/sync endpoint
    // using the access_token linked to the item_id. 
    // For this implementation, we will mark them as processed.
    for (const webhook of webhooks) {
      console.log(`Processing sync for item ${webhook.item_id}`);
      
      // MOCK: Fetching transactions from Plaid API would go here
      // const plaidResponse = await fetch('https://sandbox.plaid.com/transactions/sync', {...})
      // Insert into transactions table...
      
      // Mark as processed
      await supabaseClient
        .from('plaid_webhooks')
        .update({ processed: true, processed_at: new Date().toISOString() })
        .eq('id', webhook.id);
        
      processedCount++;
    }

    return new Response(JSON.stringify({ success: true, processed: processedCount }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
