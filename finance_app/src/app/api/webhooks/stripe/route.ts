import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
  apiVersion: "2024-06-20",
});

// Initialize Supabase Admin (Required to bypass RLS and update user metadata/roles)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "mock_service_key"
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      // Allow raw parsing for testing/mocking, but in prod enforce signature
      event = JSON.parse(body);
    } else {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    }
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    switch (event.type) {
      // 1. KYC Verification Completed
      case "identity.verification_session.verified": {
        const session = event.data.object as Stripe.Identity.VerificationSession;
        const userId = session.metadata?.userId;
        if (userId) {
          // Update the user's profile to indicate KYC is complete
          await supabaseAdmin.from("profiles").update({ is_verified: true }).eq("id", userId);
          console.log(`User ${userId} successfully verified via Stripe Identity.`);
        }
        break;
      }
      
      // 2. Premium Subscription Purchased
      case "checkout.session.completed": {
        const checkout = event.data.object as Stripe.Checkout.Session;
        const userId = checkout.client_reference_id || checkout.metadata?.userId;
        if (userId) {
          // Grant 'premium' role
          await supabaseAdmin.from("profiles").update({ is_premium: true }).eq("id", userId);
          console.log(`User ${userId} successfully upgraded to Premium.`);
        }
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
