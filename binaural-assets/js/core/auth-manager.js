// binaural-assets/js/core/auth-manager.js
import { initFirebase } from '../services/firebase.js';
import { initRevenueCat } from '../services/revenuecat.js';
import { initAuthUI } from '../ui/auth-controller.js';
import { startPresenceHeartbeat, subscribeToPresenceCounts } from '../services/presence-service.js';
import { initPaywall } from '../utils/paywall.js';
import { initAnalytics, trackSignup, trackLogin, trackBeginCheckout, trackPurchase, trackFeatureUse, trackSessionStart, trackSessionEnd, trackPaywallShown, trackUpgradeClick, setUserProperties } from '../utils/analytics.js';
import { recordVisit, syncDailyUsage } from '../services/analytics.js';
import { initSocialProof } from '../services/social-proof.js';

export function initAuthAndServices() {
    console.log("[AuthManager] Initializing Firebase, Auth, & Payments...");
    
    // Expose analytics tracking functions globally
    window.trackSignup = trackSignup;
    window.trackLogin = trackLogin;
    window.trackBeginCheckout = trackBeginCheckout;
    window.trackPurchase = trackPurchase;
    window.trackFeatureUse = trackFeatureUse;
    window.trackSessionStart = trackSessionStart;
    window.trackSessionEnd = trackSessionEnd;
    window.trackPaywallShown = trackPaywallShown;
    window.trackUpgradeClick = trackUpgradeClick;
    window.setUserProperties = setUserProperties;

    try {
        initFirebase();
        initRevenueCat();
        initAuthUI();
        initPresencePulse();
        initPaywall();
        initAnalytics();
        recordVisit();
        syncDailyUsage();

        // Social Proof toasts (only for non-premium users)
        if (localStorage.getItem('mindwave_premium') !== 'true') {
            initSocialProof();
        }
    } catch (e) {
        console.warn("[AuthManager] Services Init Failed (Offline/Mock Mode):", e);
    }
}

/**
 * Real-time Social Presence Pulse
 */
function initPresencePulse() {
    const presenceText = document.getElementById('presenceText');
    if (!presenceText) return;

    // Start tracking this session
    startPresenceHeartbeat();

    // Subscribe to live counts
    subscribeToPresenceCounts((counts) => {
        const total = counts.total || 0;
        const countText = total === 1 ? '1 Mind Active' : `${total} Minds Active`;
        presenceText.textContent = countText;
        presenceText.classList.add('text-white/80');
        presenceText.classList.remove('text-white/50');

        // Optional: Update tooltip with breakdown
        const counter = document.getElementById('presenceCounter');
        if (counter) {
            const breakdown = Object.entries(counts.byPreset)
                .map(([preset, count]) => `${preset}: ${count}`)
                .join(' | ');
            if (breakdown) counter.title = `Pulse: ${breakdown}`;
        }
    });

    console.log('[Presence] Pulse initialized');
}
