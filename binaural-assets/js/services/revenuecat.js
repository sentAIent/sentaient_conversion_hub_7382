/**
 * RevenueCat Integration (Mock/Setup)
 * Handles native iOS/Android In-App Purchases (IAP) via Capacitor
 */

export async function initRevenueCat() {
    if (!window.Capacitor || !window.Capacitor.isNativePlatform()) {
        console.log('[RevenueCat] Not native platform, skipping init.');
        return;
    }

    try {
        const { Purchases } = await import('@revenuecat/purchases-capacitor');
        
        const platform = window.Capacitor.getPlatform();
        const apiKey = platform === 'ios' 
            ? import.meta.env.VITE_REVENUECAT_APPLE_KEY 
            : import.meta.env.VITE_REVENUECAT_GOOGLE_KEY;

        if (!apiKey) {
            console.warn(`[RevenueCat] Missing API Key for ${platform}`);
            return;
        }

        console.log(`[RevenueCat] Initializing for ${platform}...`);
        await Purchases.configure({ apiKey });
        console.log('[RevenueCat] Initialization complete.');
    } catch (e) {
        console.error('[RevenueCat] Init error:', e);
    }
}

export async function triggerRevenueCatCheckout(productId, billingPeriod) {
    if (!window.Capacitor || !window.Capacitor.isNativePlatform()) {
        throw new Error('Cannot trigger RevenueCat on Web. Use Stripe.');
    }

    // Mapping MindWave products to RevenueCat product identifiers
    const rcProductId = productId === 'zen' ? 'mindwave_zen_monthly' 
                      : productId === 'thrive' ? 'mindwave_thrive_monthly' 
                      : 'mindwave_eternity_lifetime';

    console.log(`[RevenueCat] Triggering native purchase flow for: ${rcProductId}`);

    try {
        const { Purchases } = await import('@revenuecat/purchases-capacitor');
        
        if (window.showToast) window.showToast('Connecting to App Store...', 'info');
        
        const { customerInfo } = await Purchases.purchaseStoreProduct({
            identifier: rcProductId
        });

        if (typeof customerInfo.entitlements.active['Premium'] !== "undefined") {
            console.log('[RevenueCat] Native purchase successful!');
            
            // Grant local access
            window.__MOCK_PREMIUM = true; // Use existing flag structure
            localStorage.setItem('mindwave_premium', 'true');
            if (billingPeriod === 'oneTime') {
                localStorage.setItem('mindwave_lifetime', 'true');
            }

            if (window.showToast) {
                window.showToast('Purchase Successful! Welcome to Premium.', 'success');
            }
            setTimeout(() => window.location.reload(), 1500);
        }
    } catch (e) {
        if (!e.userCancelled) {
            console.error('[RevenueCat] Purchase error:', e);
            if (window.showToast) window.showToast('Purchase failed. Please try again.', 'error');
        } else {
            console.log('[RevenueCat] Purchase cancelled by user.');
        }
    }
}

export async function checkRevenueCatSubscription() {
    if (!window.Capacitor || !window.Capacitor.isNativePlatform()) return false;
    
    try {
        const { Purchases } = await import('@revenuecat/purchases-capacitor');
        const customerInfo = await Purchases.getCustomerInfo();
        return typeof customerInfo.entitlements.active['Premium'] !== "undefined";
    } catch (e) { 
        console.error('[RevenueCat] Entitlement check failed:', e);
        return false; 
    }
}
