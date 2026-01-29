import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Button from '../ui/Button';
import { STRIPE_PUBLISHABLE_KEY, STRIPE_PRODUCTS, CHECKOUT_SUCCESS_URL, CHECKOUT_CANCEL_URL } from '../../config/stripe';

// Initialize Stripe
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

/**
 * Stripe Checkout Button Component
 * 
 * For client-side only checkout (Stripe Checkout)
 * Note: For production, you should create checkout sessions on your backend
 * This uses Stripe's client-only integration for simplicity
 */
const StripeCheckoutButton = ({
    productKey, // Key from STRIPE_PRODUCTS (e.g., 'aiReadinessAudit')
    variant = 'default',
    size = 'lg',
    fullWidth = false,
    className = '',
    children,
    onBeforeCheckout, // Optional callback before redirect
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const product = STRIPE_PRODUCTS[productKey];

    const handleCheckout = async () => {
        if (!product) {
            setError('Product not found');
            return;
        }

        // Check if using placeholder keys
        if (STRIPE_PUBLISHABLE_KEY.includes('REPLACE') || product.priceId.includes('REPLACE')) {
            // Fallback to booking page if Stripe not configured
            console.warn('Stripe not configured. Redirecting to booking page.');
            window.open('https://sentaient.setmore.com/brian?step=time-slot&products=ab1e4953-92d5-442d-b53b-cf759334c2b4&type=service&staff=429be748-e76f-45c9-9e76-760cf1210fb7&staffSelected=false', '_blank');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Call optional callback
            if (onBeforeCheckout) {
                await onBeforeCheckout();
            }

            const stripe = await stripePromise;

            if (!stripe) {
                throw new Error('Stripe failed to load');
            }

            // Redirect to Stripe Checkout
            const { error: stripeError } = await stripe.redirectToCheckout({
                lineItems: [{ price: product.priceId, quantity: 1 }],
                mode: product.mode,
                successUrl: CHECKOUT_SUCCESS_URL,
                cancelUrl: CHECKOUT_CANCEL_URL,
                // For subscriptions, you might want to collect billing address
                billingAddressCollection: product.mode === 'subscription' ? 'required' : 'auto',
            });

            if (stripeError) {
                throw stripeError;
            }
        } catch (err) {
            console.error('Checkout error:', err);
            setError(err.message || 'An error occurred during checkout');
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <Button
                variant={variant}
                size={size}
                fullWidth={fullWidth}
                className={className}
                onClick={handleCheckout}
                loading={isLoading}
                disabled={isLoading}
            >
                {children || `Buy ${product?.name || 'Product'}`}
            </Button>

            {error && (
                <p className="text-error text-sm mt-2 text-center">{error}</p>
            )}
        </div>
    );
};

export default StripeCheckoutButton;
