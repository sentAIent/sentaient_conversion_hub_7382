// Stripe configuration
// Replace with your actual Stripe publishable key
// Get from: https://dashboard.stripe.com/apikeys

export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_REPLACE_WITH_YOUR_KEY';

// Product/Price IDs from your Stripe Dashboard
// Create these products at: https://dashboard.stripe.com/products
export const STRIPE_PRODUCTS = {
    aiReadinessAudit: {
        name: 'AI Readiness Audit',
        priceId: import.meta.env.VITE_STRIPE_PRICE_AUDIT || 'price_REPLACE_WITH_AUDIT_PRICE_ID',
        price: 997,
        mode: 'payment', // one-time payment
    },
    aiImplementationStarter: {
        name: 'AI Implementation - Starter',
        priceId: import.meta.env.VITE_STRIPE_PRICE_IMPLEMENTATION_STARTER || 'price_REPLACE_WITH_IMPL_STARTER_ID',
        price: 4997,
        mode: 'payment',
    },
    aiImplementationPro: {
        name: 'AI Implementation - Pro',
        priceId: import.meta.env.VITE_STRIPE_PRICE_IMPLEMENTATION_PRO || 'price_REPLACE_WITH_IMPL_PRO_ID',
        price: 9997,
        mode: 'payment',
    },
    enterpriseMonthly: {
        name: 'Enterprise Partnership',
        priceId: import.meta.env.VITE_STRIPE_PRICE_ENTERPRISE || 'price_REPLACE_WITH_ENTERPRISE_PRICE_ID',
        price: 2997,
        mode: 'subscription', // recurring payment
    },
};

// URLs for checkout redirect
export const CHECKOUT_SUCCESS_URL = `${window.location.origin}/checkout-success`;
export const CHECKOUT_CANCEL_URL = `${window.location.origin}/pricing`;
