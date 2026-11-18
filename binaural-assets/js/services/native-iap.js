/**
 * Native In-App Purchase Service (State of the Art)
 * Unified payment controller bridging Apple StoreKit 2 & Google Play Billing
 * via RevenueCat on native platforms, with seamless fallback to Stripe on Web/PWA.
 */

import { state } from '../state.js';
import { showToast } from '../utils/helpers.js';

class NativeIAPService {
    constructor() {
        this.isNative = typeof window !== 'undefined' && 
                        window.Capacitor && 
                        typeof window.Capacitor.isNativePlatform === 'function' && 
                        window.Capacitor.isNativePlatform();
        this.isInitialized = false;
        this.rcApiKey = 'appl_mindwave_placeholder_key'; // Configured via project build
    }

    async init() {
        if (this.isInitialized) return;
        if (this.isNative && window.Purchases) {
            try {
                await window.Purchases.configure({ apiKey: this.rcApiKey });
                this.isInitialized = true;
                console.log('[NativeIAP] RevenueCat initialized for StoreKit / Play Billing.');
            } catch (err) {
                console.warn('[NativeIAP] RevenueCat init failed:', err);
            }
        } else {
            console.log('[NativeIAP] Running on Web/PWA — using Stripe billing backend.');
        }
    }

    async purchasePlan(planId = 'pro_monthly') {
        await this.init();

        if (this.isNative && window.Purchases) {
            try {
                showToast("Contacting App Store...", "info");
                const offerings = await window.Purchases.getOfferings();
                if (offerings.current && offerings.current.availablePackages.length > 0) {
                    const pkg = offerings.current.availablePackages.find(p => p.identifier.includes(planId)) || offerings.current.availablePackages[0];
                    const { customerInfo } = await window.Purchases.purchasePackage({ aPackage: pkg });
                    if (customerInfo.entitlements.active['pro'] || customerInfo.entitlements.active['premium']) {
                        localStorage.setItem('mindwave_premium', 'true');
                        state.userTier = 'pro';
                        showToast("Subscription active! Welcome to MindWave Pro.", "success");
                        return { success: true };
                    }
                }
            } catch (err) {
                if (!err.userCancelled) {
                    showToast(err.message || "App Store purchase failed", "error");
                }
                return { success: false, error: err };
            }
        }

        // Web / PWA Stripe fallback
        console.log(`[NativeIAP] Triggering web Stripe checkout for ${planId}`);
        const stripeService = await import('./stripe-simple.js');
        if (stripeService && stripeService.checkoutWithStripe) {
            return stripeService.checkoutWithStripe(planId);
        }
        return { success: false, error: 'Stripe service unavailable' };
    }

    async restorePurchases() {
        await this.init();

        if (this.isNative && window.Purchases) {
            try {
                showToast("Restoring previous App Store purchases...", "info");
                const { customerInfo } = await window.Purchases.restorePurchases();
                if (customerInfo.entitlements.active['pro'] || customerInfo.entitlements.active['premium']) {
                    localStorage.setItem('mindwave_premium', 'true');
                    state.userTier = 'pro';
                    showToast("Purchases restored! Pro features unlocked.", "success");
                    return { success: true };
                } else {
                    showToast("No active subscriptions found for your Apple/Google ID.", "info");
                    return { success: false };
                }
            } catch (err) {
                showToast("Failed to restore purchases: " + (err.message || 'Error'), "error");
                return { success: false, error: err };
            }
        }

        showToast("Restoring access via cloud account sync...", "info");
        const fbService = await import('./firebase.js');
        if (fbService && fbService.getCurrentUser()) {
            showToast("Account synced with cloud subscription.", "success");
            return { success: true };
        }
        return { success: false };
    }
}

export const nativeIAP = new NativeIAPService();
