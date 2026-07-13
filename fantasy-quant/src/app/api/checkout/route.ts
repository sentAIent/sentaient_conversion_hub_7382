import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Initialize Stripe (use empty string if key not set, to avoid crashing at build time)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_123', {
  apiVersion: '2023-10-16' as any,
})

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { priceId } = await request.json()

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 })
    }

    if (!process.env.STRIPE_SECRET_KEY) {
       return NextResponse.json({ error: 'Stripe is not configured. Missing STRIPE_SECRET_KEY in environment.' }, { status: 500 })
    }

    // Get base URL for success/cancel redirects
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // Fetch user settings to see if they already have a customer ID
    const { data: settings } = await supabase
      .from('user_settings')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    let customerId = settings?.stripe_customer_id

    // If no customer ID exists, we can let Stripe create one during checkout
    // Alternatively, we could create it here first. Let's let Checkout handle it,
    // and we'll pass the user.id as client_reference_id so the webhook can link them.

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/pricing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing?canceled=true`,
      client_reference_id: user.id,
      customer_email: user.email,
    }
    
    if (customerId) {
      // If we already have a customer ID, attach it
      sessionParams.customer = customerId
      delete sessionParams.customer_email
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({ url: session.url })

  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
