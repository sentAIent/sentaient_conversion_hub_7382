import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { tier, isAnnual } = await req.json()
    
    // Validate inputs
    if (!tier) {
      throw new Error('Tier is required')
    }

    // Get Auth user
    const authHeader = req.headers.get('Authorization')!
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )
    
    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      throw new Error('User not authenticated')
    }

    // Map tier to price ID (these would be your actual Stripe price IDs)
    const priceMap: Record<string, { monthly: string, annual: string }> = {
      starter: { monthly: 'price_starter_monthly_mock', annual: 'price_starter_annual_mock' },
      professional: { monthly: 'price_prof_monthly_mock', annual: 'price_prof_annual_mock' },
      premium: { monthly: 'price_premium_monthly_mock', annual: 'price_premium_annual_mock' },
      elite: { monthly: 'price_elite_monthly_mock', annual: 'price_elite_annual_mock' },
    }

    const tierLower = tier.toLowerCase()
    if (!priceMap[tierLower]) {
        throw new Error(`Invalid tier: ${tier}`)
    }

    const priceId = isAnnual ? priceMap[tierLower].annual : priceMap[tierLower].monthly
    
    const origin = req.headers.get('origin') || 'http://localhost:5173'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/?checkout=cancelled`,
      customer_email: user.email,
      client_reference_id: user.id, // For webhook fulfillment
    })

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
