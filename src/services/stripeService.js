import Stripe from 'stripe';

/**
 * stripeService.js
 * Interfaces with Stripe API to log metered usage records and track credit consumption.
 */
export class StripeService {
    constructor(apiKey = null) {
        const secretKey = apiKey || (typeof process !== 'undefined' ? process.env.STRIPE_SECRET_KEY : null);
        this.stripe = secretKey ? new Stripe(secretKey, { apiVersion: '2023-10-16' }) : null;
    }

    /**
     * Reports user metered credit consumption to Stripe.
     * @param {string} subscriptionItemId Stripe subscription item identifier
     * @param {number} creditsConsumed Number of credit tokens used
     * @returns {Promise<Object>} Stripe usage record details
     */
    async reportUsage(subscriptionItemId, creditsConsumed) {
        if (!this.stripe) {
            console.warn('[StripeBilling] Stripe client not initialized. Falling back to mock billing event.');
            return {
                id: `mock_usage_${Math.random().toString(36).substring(2, 11)}`,
                quantity: Math.ceil(creditsConsumed),
                timestamp: Math.floor(Date.now() / 1000)
            };
        }

        try {
            const record = await this.stripe.subscriptionItems.createUsageRecord(
                subscriptionItemId,
                {
                    quantity: Math.ceil(creditsConsumed),
                    timestamp: Math.floor(Date.now() / 1000),
                    action: 'increment'
                }
            );
            console.log(`[StripeBilling] Logged usage record: ${record.id} with quantity: ${creditsConsumed}`);
            return record;
        } catch (err) {
            console.error('[StripeBilling] Failed to report metered usage metric:', err.message);
            throw err;
        }
    }
    /**
     * Generates a checkout session URL for the AI Companion Subscription.
     * @param {string} userId The Supabase user ID
     * @returns {Promise<string>} The checkout session URL
     */
    async createAiCompanionCheckoutSession(userId) {
        if (!this.stripe) {
            console.warn('[StripeBilling] Stripe client not initialized. Mocking checkout URL.');
            return 'https://mock.stripe.com/checkout/ai_companion';
        }

        try {
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'subscription',
                line_items: [{
                    // You'll need to create this product/price in your Stripe Dashboard
                    price: 'price_ai_companion_monthly', 
                    quantity: 1,
                }],
                metadata: {
                    userId: userId,
                    planId: 'prod_ai_companion_monthly'
                },
                success_url: `${typeof window !== 'undefined' ? window.location.origin : 'https://sentaient.com'}/dashboard?ai_companion_success=true`,
                cancel_url: `${typeof window !== 'undefined' ? window.location.origin : 'https://sentaient.com'}/store`,
            });
            return session.url;
        } catch (err) {
            console.error('[StripeBilling] Failed to create checkout session:', err.message);
            throw err;
        }
    }
}

export default StripeService;
