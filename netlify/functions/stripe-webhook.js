const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}

const db = admin.firestore();

exports.handler = async (event) => {
    const sig = event.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error('[Stripe Webhook] Missing webhook secret');
        return { statusCode: 500, body: 'Webhook secret not configured' };
    }

    let stripeEvent;

    try {
        stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);
    } catch (err) {
        console.error('[Stripe Webhook] Signature verification failed:', err.message);
        return { statusCode: 400, body: `Webhook Error: ${err.message}` };
    }

    console.log('[Stripe Webhook] Received event:', stripeEvent.type);

    try {
        switch (stripeEvent.type) {
            case 'checkout.session.completed':
                await handleCheckoutComplete(stripeEvent.data.object);
                break;
            case 'customer.subscription.updated':
                await handleSubscriptionUpdate(stripeEvent.data.object);
                break;
            case 'customer.subscription.deleted':
                await handleSubscriptionCancel(stripeEvent.data.object);
                break;
            case 'invoice.payment_succeeded':
                await handlePaymentSuccess(stripeEvent.data.object);
                break;
            default:
                console.log('[Stripe Webhook] Unhandled event type:', stripeEvent.type);
        }

        return { statusCode: 200, body: JSON.stringify({ received: true }) };
    } catch (error) {
        console.error('[Stripe Webhook] Error processing event:', error);
        return { statusCode: 500, body: `Error: ${error.message}` };
    }
};

/**
 * Handle successful checkout - credit packs and Pro Pilot subscriptions
 */
async function handleCheckoutComplete(session) {
    console.log('[Stripe Webhook] Processing checkout.session.completed');

    const userId = session.client_reference_id;
    if (!userId) {
        console.error('[Stripe Webhook] No client_reference_id found');
        return;
    }

    // Check for credit pack purchase via metadata
    const creditAmount = parseInt(session.metadata?.credits) || 0;
    if (creditAmount > 0) {
        await handleCreditPackPurchase(userId, creditAmount, session);
        return;
    }

    // Check for Pro Pilot subscription
    const isProPilot = session.metadata?.type === 'pro_pilot' || session.metadata?.proPilot === 'true';
    const subscriptionId = session.subscription;

    if (subscriptionId && isProPilot) {
        await grantProPilotBenefits(userId, subscriptionId);
    }

    console.log('[Stripe Webhook] Checkout processed for user:', userId);
}

/**
 * Handle credit pack purchase - add credits to user's account
 */
async function handleCreditPackPurchase(userId, creditAmount, session) {
    console.log(`[Stripe Webhook] Crediting ${creditAmount} Aether Credits to user: ${userId}`);

    const userDocRef = db.collection('users').doc(userId);
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
        await userDocRef.update({
            aetherCredits: admin.firestore.FieldValue.increment(creditAmount),
            totalCreditsEarned: admin.firestore.FieldValue.increment(creditAmount),
            lastPurchaseAt: new Date().toISOString(),
        });
    } else {
        // Create user if doesn't exist
        await userDocRef.set({
            aetherCredits: creditAmount,
            totalCreditsEarned: creditAmount,
            upgrades: { thruster: 1, armor: 1, shield: 1, weapon: 1, scanner: 1, collector: 1 },
            stats: { totalPlayTime: 0, gemsCollected: 0, hazardsAvoided: 0, upgradesUnlocked: 0 },
            createdAt: new Date().toISOString(),
            lastPurchaseAt: new Date().toISOString(),
        });
    }

    // Log transaction
    await db.collection('credit_transactions').add({
        userId,
        credits: creditAmount,
        sessionId: session.id,
        productKey: session.metadata?.productKey || 'unknown',
        type: 'purchase',
        createdAt: new Date().toISOString(),
    });

    console.log(`[Stripe Webhook] Successfully credited ${creditAmount} to ${userId}`);
}

/**
 * Grant Pro Pilot subscription benefits
 */
async function grantProPilotBenefits(userId, subscriptionId) {
    console.log(`[Stripe Webhook] Granting Pro Pilot benefits to user: ${userId}`);

    const userDocRef = db.collection('users').doc(userId);
    const userDoc = await userDocRef.get();

    const now = new Date();
    const endDate = new Date(now);
    endDate.setMonth(endDate.getMonth() + 1);

    // Pro Pilot exclusive content
    const proShips = ['quantum-scout', 'star-phoenix', 'nebula-racer'];
    const proSkins = ['pro-gold', 'nebula-streak', 'cosmic-flame', 'void-walker'];

    if (userDoc.exists) {
        const userData = userDoc.data();
        const currentShips = userData.shipConfig?.unlockedShips || ['default'];
        const currentSkins = userData.shipConfig?.unlockedSkins || ['default'];

        const allShips = [...new Set([...currentShips, ...proShips])];
        const allSkins = [...new Set([...currentSkins, ...proSkins])];

        await userDocRef.update({
            'subscription.isProPilot': true,
            'subscription.planId': subscriptionId,
            'subscription.startDate': now.toISOString(),
            'subscription.endDate': endDate.toISOString(),
            'subscription.monthlyCreditsGranted': now.toISOString(),
            aetherCredits: admin.firestore.FieldValue.increment(2000),
            'shipConfig.unlockedShips': allShips,
            'shipConfig.unlockedSkins': allSkins,
        });
    } else {
        await userDocRef.set({
            subscription: {
                isProPilot: true,
                planId: subscriptionId,
                startDate: now.toISOString(),
                endDate: endDate.toISOString(),
                monthlyCreditsGranted: now.toISOString(),
            },
            aetherCredits: 2000,
            shipConfig: {
                selectedShip: 'default',
                unlockedShips: ['default', ...proShips],
                selectedSkin: 'default',
                unlockedSkins: ['default', ...proSkins],
            },
            upgrades: { thruster: 1, armor: 1, shield: 1, weapon: 1, scanner: 1, collector: 1 },
            stats: { totalPlayTime: 0, gemsCollected: 0, hazardsAvoided: 0, upgradesUnlocked: 0 },
            createdAt: new Date().toISOString(),
        });
    }

    console.log(`[Stripe Webhook] Pro Pilot benefits granted to ${userId}`);
}

/**
 * Handle subscription update (renewal)
 */
async function handleSubscriptionUpdate(subscription) {
    console.log('[Stripe Webhook] Processing subscription update');
    // Grant monthly credits on renewal if needed
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionCancel(subscription) {
    console.log('[Stripe Webhook] Processing subscription cancellation');

    const customerId = subscription.customer;

    // Find user by searching subscriptions
    const usersSnapshot = await db.collection('users')
        .where('subscription.planId', '==', subscription.id)
        .limit(1)
        .get();

    if (!usersSnapshot.empty) {
        const userId = usersSnapshot.docs[0].id;
        await db.collection('users').doc(userId).update({
            'subscription.isProPilot': false,
            'subscription.endDate': new Date().toISOString(),
        });
        console.log(`[Stripe Webhook] Pro Pilot revoked for user: ${userId}`);
    }
}

/**
 * Handle successful recurring payment
 */
async function handlePaymentSuccess(invoice) {
    console.log('[Stripe Webhook] Processing payment success');

    const subscriptionId = invoice.subscription;
    if (!subscriptionId) return;

    // Grant monthly credits for Pro Pilot renewal
    const usersSnapshot = await db.collection('users')
        .where('subscription.planId', '==', subscriptionId)
        .where('subscription.isProPilot', '==', true)
        .limit(1)
        .get();

    if (!usersSnapshot.empty) {
        const userDoc = usersSnapshot.docs[0];
        const userData = userDoc.data();
        const lastGranted = userData.subscription?.monthlyCreditsGranted;
        const now = new Date();

        // Check if we should grant this month's credits
        if (!lastGranted || new Date(lastGranted).getMonth() !== now.getMonth()) {
            await userDoc.ref.update({
                aetherCredits: admin.firestore.FieldValue.increment(2000),
                'subscription.monthlyCreditsGranted': now.toISOString(),
                'subscription.endDate': new Date(now.setMonth(now.getMonth() + 1)).toISOString(),
            });
            console.log(`[Stripe Webhook] Monthly credits granted to ${userDoc.id}`);
        }
    }
}
