import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@12.1.1?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature')
  
  if (!signature) {
    return new Response('No signature provided', { status: 400 })
  }

  try {
    const body = await req.text()
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    
    // Verify signature
    const event = await stripe.webhooks.signature.verifyPayloadAsync(
      body,
      signature,
      webhookSecret!,
      cryptoProvider
    )

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // IDEMPOTENCY CHECK: Ensure we haven't processed this event before
    const { data: existingEvent, error: selectError } = await supabase
      .from('stripe_events')
      .select('id')
      .eq('id', event.id)
      .single()

    if (existingEvent) {
      console.log(`Event ${event.id} already processed. Skipping.`)
      return new Response(JSON.stringify({ received: true, message: 'Already processed' }), { status: 200 })
    }

    // Process specific events
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      console.log(`Fulfilling checkout session ${session.id}`)
      // Fulfill purchase logic...
    }

    // Log the event to prevent double-processing
    const { error: insertError } = await supabase
      .from('stripe_events')
      .insert([{ id: event.id, type: event.type, data: event.data }])

    if (insertError) throw insertError

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
})
