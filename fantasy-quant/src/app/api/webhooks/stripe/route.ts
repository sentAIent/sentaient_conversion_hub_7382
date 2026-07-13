import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_123', {
  apiVersion: '2023-10-16' as any,
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

// We need a service role client to bypass RLS in the webhook
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe webhook not configured' }, { status: 500 })
  }

  const payload = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Link customer to user if client_reference_id is present
        if (session.client_reference_id && session.customer) {
          await supabase
            .from('user_settings')
            .update({ stripe_customer_id: session.customer as string })
            .eq('id', session.client_reference_id)
        }
        break
      }
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        
        // Map product to tier (we'd need product metadata or a lookup table, 
        // for now we'll do a simple mapping based on price ID or product ID)
        // Default to 'pro' for MVP if we can't map it properly.
        let tier = 'pro' 
        const productId = subscription.items.data[0]?.price.product as string
        
        // In a real app, we might do:
        // if (productId === 'prod_XYZ_MAX') tier = 'max'
        // else if (productId === 'prod_ABC_PRO') tier = 'pro'

        // Check if there is metadata on the price
        const priceMeta = subscription.items.data[0]?.price.metadata
        if (priceMeta && priceMeta.tier) {
            tier = priceMeta.tier
        }

        await supabase
          .from('user_settings')
          .update({
            stripe_subscription_id: subscription.id,
            subscription_status: subscription.status,
            subscription_tier: tier,
          })
          .eq('stripe_customer_id', customerId)
        break
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        
        await supabase
          .from('user_settings')
          .update({
            stripe_subscription_id: null,
            subscription_status: 'canceled',
            subscription_tier: 'free',
          })
          .eq('stripe_customer_id', customerId)
        break
      }
      
      default:
        // Unhandled event type
        break
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
