import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16' as any, // Cast as any if version mismatch in types
});

/**
 * Creates a Stripe Connect account for a venue/user to receive payouts
 */
export async function createConnectAccount(userId: string, email: string) {
  try {
    const account = await stripe.accounts.create({
      type: 'express',
      email: email,
      metadata: { userId },
    });
    
    // Generate onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.FRONTEND_URL || 'http://localhost:3005'}/dashboard/billing/refresh`,
      return_url: `${process.env.FRONTEND_URL || 'http://localhost:3005'}/dashboard/billing/success`,
      type: 'account_onboarding',
    });

    return { accountId: account.id, url: accountLink.url };
  } catch (error) {
    console.error('Error creating Stripe Connect account:', error);
    throw new Error('Failed to create Connect account');
  }
}

/**
 * Creates a Checkout Session for purchasing a storefront product
 */
export async function createCheckoutSession(
  orderId: string, 
  amountCents: number, 
  productName: string, 
  venueStripeAccountId: string
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3005'}/store/success?orderId=${orderId}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3005'}/store/cancel`,
      payment_intent_data: {
        application_fee_amount: Math.round(amountCents * 0.1), // 10% platform fee
        transfer_data: {
          destination: venueStripeAccountId,
        },
      },
      client_reference_id: orderId,
    });

    return session.url;
  } catch (error) {
    console.error('Error creating Checkout Session:', error);
    throw new Error('Failed to create Checkout Session');
  }
}

/**
 * Transfers funds from the Platform account to a User's Connect account (Cash Out)
 */
export async function processPayout(destinationAccountId: string, amountCents: number) {
  try {
    const transfer = await stripe.transfers.create({
      amount: amountCents,
      currency: 'usd',
      destination: destinationAccountId,
    });
    
    return transfer.id;
  } catch (error) {
    console.error('Error processing payout:', error);
    throw new Error('Failed to process payout');
  }
}
