import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

serve(async (request) => {
  const signature = request.headers.get('Stripe-Signature')
  
  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  try {
    const body = await request.text()
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    let event;

    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        webhookSecret!,
        undefined,
        cryptoProvider
      )
    } catch (err) {
      console.error(`Webhook signature verification failed.`, err.message)
      return new Response(err.message, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const userId = session.client_reference_id

      if (userId) {
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // Give them unlimited reviews for premium tiers for now, or arbitrary limits
        await supabase
          .from('profiles')
          .update({
            subscription_tier: 'premium',
            is_premium: true,
            reviews_limit: 9999, // practically unlimited for premium
            drafts_limit: 9999
          })
          .eq('id', userId)
          
        console.log(`Successfully upgraded user ${userId}`)
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (err) {
    console.error('Webhook error:', err.message)
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400 }
    )
  }
})
