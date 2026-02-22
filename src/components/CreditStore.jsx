import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../contexts/AuthContext';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import { STRIPE_PUBLISHABLE_KEY, STRIPE_PRODUCTS, CHECKOUT_SUCCESS_URL, CHECKOUT_CANCEL_URL } from '../config/stripe';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// 7 Credit Pack Tiers + Pro Pilot
const creditPacks = [
    {
        id: 'thruster',
        name: 'Thruster',
        credits: 500,
        price: 2.99,
        icon: '🔥',
        badge: null,
    },
    {
        id: 'antigravity',
        name: 'Antigravity',
        credits: 1200,
        price: 5.99,
        icon: '🌀',
        badge: '+20% Bonus',
    },
    {
        id: 'warp',
        name: 'Warp',
        credits: 2800,
        price: 12.99,
        icon: '⚡',
        badge: '+24% Bonus',
    },
    {
        id: 'hyperdrive',
        name: 'Hyperdrive',
        credits: 6500,
        price: 29.99,
        icon: '🚀',
        badge: '+30% Bonus',
        popular: true,
    },
    {
        id: 'lightspeed',
        name: 'Lightspeed',
        credits: 15000,
        price: 59.99,
        icon: '💫',
        badge: '+36% Bonus',
    },
    {
        id: 'eventHorizon',
        name: 'Event Horizon',
        credits: 35000,
        price: 119.99,
        icon: '🌑',
        badge: '+46% Bonus',
    },
    {
        id: 'singularity',
        name: 'Singularity',
        credits: 100000,
        price: 299.99,
        icon: '✨',
        badge: '+67% Bonus',
        elite: true,
    },
];

const CreditStore = ({ isOpen, onClose }) => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(null);
    const [showProPilot, setShowProPilot] = useState(false);

    const handlePurchase = async (pack) => {
        if (!currentUser) {
            window.location.href = '/login';
            return;
        }

        const product = STRIPE_PRODUCTS[pack.id];
        if (!product || product.priceId.includes('REPLACE') || product.priceId.includes('price_')) {
            console.warn('Stripe product not configured. Please set up products in Stripe Dashboard.');
            alert('Store coming soon! Credit packs are being set up.');
            return;
        }

        setLoading(pack.id);
        try {
            const stripe = await stripePromise;
            if (!stripe) throw new Error('Stripe failed to load');

            const { error } = await stripe.redirectToCheckout({
                lineItems: [{ price: product.priceId, quantity: 1 }],
                mode: 'payment',
                successUrl: `${CHECKOUT_SUCCESS_URL}?credits=${pack.credits}`,
                cancelUrl: CHECKOUT_CANCEL_URL,
                clientReferenceId: currentUser.uid,
                metadata: {
                    credits: pack.credits.toString(),
                    productKey: pack.id
                }
            });

            if (error) throw error;
        } catch (err) {
            console.error('Checkout error:', err);
            alert('Unable to process purchase. Please try again.');
        } finally {
            setLoading(null);
        }
    };

    const handleProPilotSubscribe = async () => {
        if (!currentUser) {
            window.location.href = '/login';
            return;
        }

        const product = STRIPE_PRODUCTS.proPilotMonthly;
        if (!product || product.priceId.includes('REPLACE') || product.priceId.includes('price_')) {
            alert('Pro Pilot subscription coming soon!');
            return;
        }

        setLoading('proPilot');
        try {
            const stripe = await stripePromise;
            if (!stripe) throw new Error('Stripe failed to load');

            const { error } = await stripe.redirectToCheckout({
                lineItems: [{ price: product.priceId, quantity: 1 }],
                mode: 'subscription',
                successUrl: `${CHECKOUT_SUCCESS_URL}?subscription=pro_pilot`,
                cancelUrl: CHECKOUT_CANCEL_URL,
                clientReferenceId: currentUser.uid,
                metadata: {
                    type: 'pro_pilot',
                    proPilot: 'true'
                }
            });

            if (error) throw error;
        } catch (err) {
            console.error('Subscription error:', err);
            alert('Unable to process subscription. Please try again.');
        } finally {
            setLoading(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl mx-4 bg-background/95 border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-accent p-6 text-white sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <span>💎</span> Aether Credit Store
                            </h2>
                            <p className="text-sm opacity-90 mt-1">
                                Power up your ship with Aether Credits
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        >
                            <Icon name="X" size={20} />
                        </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        {currentUser && (
                            <div className="flex items-center gap-2 text-sm bg-white/10 px-3 py-2 rounded-lg">
                                <span>Balance:</span>
                                <span className="font-bold text-lg">{currentUser.aetherCredits?.toLocaleString() || 0}</span>
                                <span className="opacity-75">credits</span>
                            </div>
                        )}
                        <button
                            onClick={() => setShowProPilot(!showProPilot)}
                            className="text-sm bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
                        >
                            <span>⭐</span>
                            {showProPilot ? 'Show Credit Packs' : 'Pro Pilot Subscription'}
                        </button>
                    </div>
                </div>

                {showProPilot ? (
                    /* Pro Pilot Subscription */
                    <div className="p-6">
                        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-accent rounded-2xl p-8 text-center">
                            <div className="text-6xl mb-4">🌟</div>
                            <h3 className="text-3xl font-bold text-foreground mb-2">Pro Pilot</h3>
                            <p className="text-muted-foreground mb-6">The ultimate commander experience</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-background/50 rounded-xl p-4">
                                    <div className="text-2xl mb-2">💎</div>
                                    <div className="font-bold text-foreground">2,000 Credits/mo</div>
                                    <div className="text-sm text-muted-foreground">Monthly bonus</div>
                                </div>
                                <div className="bg-background/50 rounded-xl p-4">
                                    <div className="text-2xl mb-2">🚀</div>
                                    <div className="font-bold text-foreground">3 Exclusive Ships</div>
                                    <div className="text-sm text-muted-foreground">Pro-only vessels</div>
                                </div>
                                <div className="bg-background/50 rounded-xl p-4">
                                    <div className="text-2xl mb-2">🎨</div>
                                    <div className="font-bold text-foreground">4 Pro Skins</div>
                                    <div className="text-sm text-muted-foreground">Exclusive designs</div>
                                </div>
                            </div>

                            <div className="text-4xl font-bold text-primary mb-2">
                                $9.99<span className="text-lg text-muted-foreground">/month</span>
                            </div>

                            <Button
                                variant="default"
                                size="lg"
                                className="bg-conversion hover:bg-conversion/90 text-white px-12 mt-4"
                                loading={loading === 'proPilot'}
                                onClick={handleProPilotSubscribe}
                            >
                                Subscribe Now
                            </Button>
                        </div>
                    </div>
                ) : (
                    /* Credit Packs Grid - 7 Packs */
                    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {creditPacks.map((pack) => (
                            <div
                                key={pack.id}
                                className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${pack.popular
                                        ? 'border-accent bg-accent/5 shadow-lg'
                                        : pack.elite
                                            ? 'border-primary bg-primary/5 shadow-xl'
                                            : 'border-border bg-card hover:border-primary/50'
                                    }`}
                            >
                                {/* Popular Badge */}
                                {pack.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                                        BEST VALUE
                                    </div>
                                )}
                                {pack.elite && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                                        ULTIMATE
                                    </div>
                                )}

                                {/* Pack Icon */}
                                <div className="text-3xl text-center mb-2">{pack.icon}</div>

                                {/* Pack Name */}
                                <h3 className="text-md font-bold text-foreground text-center">
                                    {pack.name}
                                </h3>

                                {/* Credits */}
                                <div className="text-center my-2">
                                    <span className="text-xl font-bold text-primary">
                                        {pack.credits.toLocaleString()}
                                    </span>
                                    <span className="text-xs text-muted-foreground ml-1">credits</span>
                                </div>

                                {/* Bonus Badge */}
                                {pack.badge && (
                                    <div className="text-center mb-2">
                                        <span className="bg-success/20 text-success text-xs font-semibold px-2 py-1 rounded-full">
                                            {pack.badge}
                                        </span>
                                    </div>
                                )}

                                {/* Price & Button */}
                                <Button
                                    variant={pack.popular || pack.elite ? 'default' : 'outline'}
                                    fullWidth
                                    size="sm"
                                    className={pack.popular ? 'bg-conversion hover:bg-conversion/90' : pack.elite ? 'bg-primary hover:bg-primary/90' : ''}
                                    loading={loading === pack.id}
                                    onClick={() => handlePurchase(pack)}
                                >
                                    ${pack.price.toFixed(2)}
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="px-6 pb-6">
                    <div className="text-center text-xs text-muted-foreground">
                        <Icon name="Shield" size={12} className="inline mr-1" />
                        Secure checkout powered by Stripe. Credits are non-refundable.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditStore;
