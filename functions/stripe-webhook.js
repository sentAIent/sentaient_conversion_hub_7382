const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    admin.initializeApp();
}

const db = admin.firestore();

/**
 * Stripe Webhook Handler
 * Listens for Stripe events and updates Firestore subscription data
 * 
 * SETUP INSTRUCTIONS:
 * 1. Deploy this function: firebase deploy --only functions:stripeWebhook
 * 2. Get the function URL from Firebase Console
 * 3. Add webhook endpoint in Stripe Dashboard → Developers → Webhooks
 * 4. Select events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
 * 5. Copy webhook signing secret and set in Firebase config:
 *    firebase functions:config:set stripe.webhook_secret="whsec_xxxxx"
 * 6. Set Stripe secret key:
 *    firebase functions:config:set stripe.secret_key="sk_live_xxxxx"
 */

const stripe = require('stripe')(functions.config().stripe?.secret_key || process.env.STRIPE_SECRET_KEY);

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = functions.config().stripe?.webhook_secret || process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error('[Stripe Webhook] Missing webhook secret');
        return res.status(500).send('Webhook secret not configured');
    }

    let event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(
            req.rawBody,
            sig,
            webhookSecret
        );
    } catch (err) {
        console.error('[Stripe Webhook] Signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log('[Stripe Webhook] Received event:', event.type);

    try {
        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed':
                await handleCheckoutComplete(event.data.object);
                break;

            case 'customer.subscription.updated':
                await handleSubscriptionUpdate(event.data.object);
                break;

            case 'customer.subscription.deleted':
                await handleSubscriptionCancel(event.data.object);
                break;

            case 'invoice.payment_succeeded':
                await handlePaymentSuccess(event.data.object);
                break;

            case 'invoice.payment_failed':
                await handlePaymentFailed(event.data.object);
                break;

            default:
                console.log('[Stripe Webhook] Unhandled event type:', event.type);
        }

        res.json({ received: true });
    } catch (error) {
        console.error('[Stripe Webhook] Error processing event:', error);
        res.status(500).send(`Error processing webhook: ${error.message}`);
    }
});

/**
 * Handle successful checkout
 * Creates or updates subscription record in Firestore
 */
async function handleCheckoutComplete(session) {
    console.log('[Stripe Webhook] Processing checkout.session.completed');

    const userId = session.client_reference_id;
    if (!userId) {
        console.error('[Stripe Webhook] No client_reference_id found in session');
        return;
    }

    const customerId = session.customer;
    const subscriptionId = session.subscription;

    // If it's a subscription (not one-time payment)
    if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        await updateSubscriptionRecord(userId, customerId, subscription);
    } else {
        // Handle lifetime/one-time purchases
        await updateSubscriptionRecord(userId, customerId, {
            id: `one-time-${Date.now()}`,
            status: 'active',
            metadata: session.metadata,
            created: Math.floor(Date.now() / 1000)
        });
    }

    console.log('[Stripe Webhook] Subscription created for user:', userId);

    // ✅ REVENUE FEATURE: Handle referral approval
    await handleReferralApproval(userId);
}

/**
 * Handle referral approval
 * If the user who just purchased was referred, approve the referral and reward the referrer
 */
async function handleReferralApproval(userId) {
    console.log('[Stripe Webhook] Checking for pending referrals for user:', userId);

    try {
        const referralDoc = await db.collection('referrals').doc(userId).get();
        if (!referralDoc.exists || referralDoc.data().status !== 'pending') {
            console.log('[Stripe Webhook] No pending referral found for user:', userId);
            return;
        }

        const referralData = referralDoc.data();
        const referrerId = referralData.referrerId;

        // 1. Mark referral as approved
        await db.collection('referrals').doc(userId).update({
            status: 'approved',
            approvedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // 2. Grant Reward to Referrer
        await grantReferralBonus(referrerId, 'referrer');

        // 3. Grant Reward to Referred User
        await grantReferralBonus(userId, 'referred');

    } catch (error) {
        console.error('[Stripe Webhook] Error in handleReferralApproval:', error);
    }
}

/**
 * Helper: Grant 30-day bonus to a user
 */
async function grantReferralBonus(uid, role) {
    console.log(`[Stripe Webhook] Granting bonus to ${role}:`, uid);
    const subRef = db.collection('subscriptions').doc(uid);
    const subDoc = await subRef.get();

    if (subDoc.exists) {
        const data = subDoc.data();
        if (data.plan === 'lifetime') return;

        let currentExpiry = data.expiresAt ? (data.expiresAt.toDate ? data.expiresAt.toDate() : new Date(data.expiresAt)) : new Date();
        const newExpiry = new Date(currentExpiry.getTime() + (30 * 24 * 60 * 60 * 1000));

        await subRef.update({
            expiresAt: admin.firestore.Timestamp.fromDate(newExpiry),
            referralCreditsEarned: admin.firestore.FieldValue.increment(role === 'referrer' ? 1 : 0),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
    } else {
        await subRef.set({
            status: 'active',
            plan: 'yogi',
            expiresAt: admin.firestore.Timestamp.fromDate(new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))),
            referralCreditsEarned: role === 'referrer' ? 1 : 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
    }
}

/**
 * Handle subscription updates
 * Updates Firestore when subscription changes (renewal, plan change, etc.)
 */
async function handleSubscriptionUpdate(subscription) {
    console.log('[Stripe Webhook] Processing customer.subscription.updated');

    const customerId = subscription.customer;

    // Find user by customer ID
    const usersSnapshot = await db.collection('subscriptions')
        .where('customerId', '==', customerId)
        .limit(1)
        .get();

    if (usersSnapshot.empty) {
        console.error('[Stripe Webhook] No user found for customer:', customerId);
        return;
    }

    const userId = usersSnapshot.docs[0].id;
    await updateSubscriptionRecord(userId, customerId, subscription);

    console.log('[Stripe Webhook] Subscription updated for user:', userId);
}

/**
 * Handle subscription cancellation
 * Marks subscription as canceled in Firestore
 */
async function handleSubscriptionCancel(subscription) {
    console.log('[Stripe Webhook] Processing customer.subscription.deleted');

    const customerId = subscription.customer;

    // Find user by customer ID
    const usersSnapshot = await db.collection('subscriptions')
        .where('customerId', '==', customerId)
        .limit(1)
        .get();

    if (usersSnapshot.empty) {
        console.error('[Stripe Webhook] No user found for customer:', customerId);
        return;
    }

    const userId = usersSnapshot.docs[0].id;

    await db.collection('subscriptions').doc(userId).update({
        status: 'canceled',
        canceledAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('[Stripe Webhook] Subscription canceled for user:', userId);
}

/**
 * Handle successful payment
 * Updates subscription expiry date
 */
async function handlePaymentSuccess(invoice) {
    console.log('[Stripe Webhook] Processing invoice.payment_succeeded');

    const customerId = invoice.customer;
    const subscriptionId = invoice.subscription;

    if (!subscriptionId) return; // Skip non-subscription invoices

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Find user by customer ID
    const usersSnapshot = await db.collection('subscriptions')
        .where('customerId', '==', customerId)
        .limit(1)
        .get();

    if (usersSnapshot.empty) {
        console.error('[Stripe Webhook] No user found for customer:', customerId);
        return;
    }

    const userId = usersSnapshot.docs[0].id;
    await updateSubscriptionRecord(userId, customerId, subscription);

    console.log('[Stripe Webhook] Payment succeeded for user:', userId);
}

/**
 * Handle failed payment
 * Marks subscription as past_due
 */
async function handlePaymentFailed(invoice) {
    console.log('[Stripe Webhook] Processing invoice.payment_failed');

    const customerId = invoice.customer;

    // Find user by customer ID
    const usersSnapshot = await db.collection('subscriptions')
        .where('customerId', '==', customerId)
        .limit(1)
        .get();

    if (usersSnapshot.empty) {
        console.error('[Stripe Webhook] No user found for customer:', customerId);
        return;
    }

    const userId = usersSnapshot.docs[0].id;

    await db.collection('subscriptions').doc(userId).update({
        status: 'past_due',
        paymentFailed: true,
        lastPaymentAttempt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('[Stripe Webhook] Payment failed for user:', userId);
}

/**
 * Helper: Update subscription record in Firestore
 */
async function updateSubscriptionRecord(userId, customerId, subscription) {
    const plan = determinePlan(subscription);
    const isLifetime = plan === 'lifetime';

    const subscriptionData = {
        subscriptionId: subscription.id,
        customerId: customerId,
        status: subscription.status || 'active',
        plan: plan,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = db.collection('subscriptions').doc(userId);
    const doc = await docRef.get();

    // Add expiration date for non-lifetime plans
    if (!isLifetime && subscription.current_period_end) {
        const stripeExpiry = new Date(subscription.current_period_end * 1000);

        // If user already has an expiresAt (from referrals), don't set it to an earlier date
        if (doc.exists && doc.data().expiresAt) {
            const currentExpiry = doc.data().expiresAt.toDate();
            if (currentExpiry > stripeExpiry) {
                console.log('[Stripe Webhook] Existing expiry is further in future (referral?), keeping it.');
            } else {
                subscriptionData.expiresAt = admin.firestore.Timestamp.fromDate(stripeExpiry);
            }
        } else {
            subscriptionData.expiresAt = admin.firestore.Timestamp.fromDate(stripeExpiry);
        }
    }

    if (!doc.exists) {
        subscriptionData.createdAt = admin.firestore.FieldValue.serverTimestamp();
    }

    await docRef.set(subscriptionData, { merge: true });
}

/**
 * Helper: Determine plan type from subscription
 */
function determinePlan(subscription) {
    // Check metadata first
    if (subscription.metadata?.plan) {
        return subscription.metadata.plan;
    }

    // Check items for price ID (if using Stripe Prices)
    if (subscription.items?.data?.[0]?.price?.recurring) {
        const interval = subscription.items.data[0].price.recurring.interval;
        return interval === 'year' ? 'yearly' : 'monthly';
    }

    // Check if it's a one-time payment (lifetime)
    if (!subscription.current_period_end) {
        return 'lifetime';
    }

    // Default to monthly
    return 'monthly';
}
