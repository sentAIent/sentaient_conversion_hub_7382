console.log("MAIN JS LOADED - NUCLEAR V4 - CONSOLIDATED FIX V1");
window.NUCLEAR_MAIN_LOADED = true;
import { setupUI } from './ui/controls_v3.js?v=NUCLEAR_V100';
import { initCursor } from './ui/cursor.js?v=NUCLEAR_V100';
import { initFirebase } from './services/firebase.js';
import { initAuthUI } from './ui/auth-controller.js';
import { startOnboarding, shouldShowOnboarding } from './ui/onboarding.js'; // Consolidated Onboarding
import { initIntentSurvey } from './ui/intent-survey.js'; // Intent Capture
import { initHaptics } from './utils/haptics.js';
import { initShareFeature, copyShareLink } from './services/share.js';
import { recordVisit, syncDailyUsage } from './services/analytics.js';
import { setupSwipeGestures } from './ui/layout.js';
import { initResizablePanels } from './ui/resize-panels.js';
import './ui/pricing-3tier.js';  // 3-Tier Pricing modal
import { handlePaymentSuccess } from './services/stripe-simple.js';
import { initPaywall } from './utils/paywall.js';
import { initAnalytics, trackSignup, trackLogin, trackBeginCheckout, trackPurchase, trackFeatureUse, trackSessionStart, trackSessionEnd, trackPaywallShown, trackUpgradeClick, setUserProperties } from './utils/analytics.js';
import { showFeedbackSurvey, checkSurveyTrigger, TRIGGER_CONDITIONS } from './utils/feedback-survey.js';
import { checkReferral } from './services/referral.js';
import { initSocialProof } from './services/social-proof.js';
import { initExitIntent } from './ui/exit-intent.js';
import { initNotifications } from './services/notifications.js';
import { initEmailCapture } from './ui/email-capture.js';
import { trackGlobalEvent } from './services/analytics-service.js';
import { initPWAInstall } from './utils/pwa-install.js';
import { getCloudPresets, syncLocalMixesToCloud } from './services/presets-service.js';
import './utils/ab-testing.js';


// Content Modules - Loaded dynamically after UI is ready
// import { initStoryPlayer, renderStoryCards, playStory, stopStory, setStoryVolume } from './content/stories.js';
// import { initAudioLibrary, setupUploadHandler } from './content/audio-library.js';
// import { initJourney, renderJourneyUI } from './content/journey.js';
// import { initClassical } from './content/classical.js';

// Expose feedback survey globally (Critical: Must be before DOMContentLoaded)
window.showFeedbackSurvey = showFeedbackSurvey;

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

// Initialize Application
const initApp = () => {
    console.log("[Main] InitApp Calling - Initializing UI...");

    // Check if already initialized to prevent double-init
    if (window.APP_INITIALIZED) return;
    window.APP_INITIALIZED = true;

    // Retention & Personalization
    initExitIntent();

    // Check for first-time session (v5 for new Intent-based flow)
    const onboardingComplete = localStorage.getItem('mindwave_onboarding_complete_v5');

    if (!onboardingComplete) {
        // Only trigger if disclaimer accepted (to avoid modal overlap)
        const checkAndStartFlow = () => {
            if (localStorage.getItem('mindwave_disclaimer_accepted') === 'true') {
                setTimeout(() => {
                    initIntentSurvey((intent) => {
                        console.log('[Main] User intent captured:', intent);
                        startOnboarding(true, intent);
                    });
                }, 1000);
                return; // Stop checking once initiated
            } else {
                setTimeout(checkAndStartFlow, 1000);
            }
        };
        checkAndStartFlow();
    }
    // Scaling & Stability (Phase 6)
    initSessionMilestones();

    // Done
    console.log("[Main] Mindwave Core v101 Initialized.");

    // Firebase & Auth (non-blocking)
    try {
        initFirebase();
        initAuthUI();
        initPaywall();  // Initialize paywall system
        initAnalytics();  // Initialize Google Analytics

        // Cloud Presets & Sync
        getCloudPresets().then(presets => {
            console.log(`[Main] ${presets.length} cloud presets loaded.`);
        });
    } catch (e) {
        console.warn("[Main] Firebase/Auth/Analytics Init Failed:", e);
    }

    // Expose feedback survey globally
    // window.showFeedbackSurvey = showFeedbackSurvey; // Moved to top

    // Core UI Setup - Critical path
    console.log("[Main] Attempting setupUI()...");
    if (typeof setupUI === 'function') {
        console.log("[Main] setupUI is a function, calling now.");
        setupUI();
    } else if (typeof window.setupUI === 'function') {
        console.warn("[Main] setupUI not in scope but found on window. Calling fallback.");
        window.setupUI();
    } else {
        console.error("[Main] setupUI is NOT A FUNCTION! Type:", typeof setupUI);
    }

    // Mobile features
    initHaptics();
    setupSwipeGestures();

    // Resizable side panels
    initResizablePanels();

    // Analytics
    recordVisit();
    syncDailyUsage();
    trackGlobalEvent('page_view', { page: 'mindwave-v101' });

    // URL sharing
    initShareFeature();

    // Custom Cursor
    initCursor();

    // Check for referral code
    checkReferral();

    // Social Proof
    initSocialProof();

    initNotifications();    // Push notification permission handling
    initEmailCapture();     // Email capture for non-logged-in users
    initPWAInstall();       // PWA prompt logic

    // Hide loading screen immediately once core UI is ready
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => loadingScreen.remove(), 500);
    }

    console.log("[Main] Core UI Ready - Loading content modules...");

    // Defer content module loading to after paint (non-blocking)
    requestIdleCallback ? requestIdleCallback(loadContentModules) : setTimeout(loadContentModules, 100);

    // Handle payment return (if redirected from Stripe)
    handlePaymentSuccess();

    // Check if survey should be triggered
    setTimeout(() => checkSurveyTrigger(), 15000); // Check after 15 seconds

    // Expose share function globally for UI buttons
    window.shareCurrentPreset = async () => {
        const { Visualizer3D } = await import('./visuals/visualizer_nuclear_v4.js?v=MATRIX_FIX_V14');
        const result = await copyShareLink();
        if (result.success) {
            const toast = document.createElement('div');
            toast.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:rgba(45,212,191,0.9);color:#0f172a;padding:12px 24px;border-radius:12px;font-size:12px;font-weight:bold;z-index:9999;`;
            toast.textContent = '🔗 Share link copied!';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        }
    };

    // Onboarding handled by Intent Survey flow above

    console.log("[Main] App Initialization Complete.");
};

/**
 * Session Intelligence (Phase 6)
 * Tracks user engagement and triggers smart prompts.
 */
function initSessionMilestones() {
    let sessionCount = parseInt(localStorage.getItem('mindwave_session_count') || '0');
    sessionCount++;
    localStorage.setItem('mindwave_session_count', sessionCount);
    localStorage.setItem('mindwave_last_session', Date.now());

    console.log(`[Intelligence] Session #${sessionCount} starting.`);

    // Smart Triggers
    setTimeout(() => {
        // Referral Milestone: Day 3 or Session 5
        if (sessionCount === 5 || sessionCount === 10) {
            console.log('[Intelligence] Milestone hit: Prompting referral.');
            // We could trigger a "Share the vibes" toast or modal here
        }

        // Retention Check: If they've used it 3 times but haven't upgraded
        if (sessionCount >= 3 && localStorage.getItem('mindwave_premium') !== 'true') {
            const lastNag = parseInt(localStorage.getItem('mindwave_last_nag') || '0');
            const cooldown = 24 * 60 * 60 * 1000; // 24 hours

            if (Date.now() - lastNag > cooldown) {
                console.log('[Intelligence] Retention trigger: Soft-prompting upgrade.');
                // triggerExitIntentOffer('soft_retention');
                localStorage.setItem('mindwave_last_nag', Date.now());
            }
        }
    }, 30000); // Wait 30s into the session to avoid overwhelming user
}

// Check ready state to handle module deferral
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Load non-critical content modules after initial render
async function loadContentModules() {
    try {
        // Dynamic imports - only loaded when needed
        const [storiesModule, audioLibModule, journeyModule, classicalModule] = await Promise.all([
            import('./content/stories.js'),
            import('./content/audio-library.js'),
            import('./content/journey.js'),
            import('./content/classical.js')
        ]);

        // Sleep Stories
        storiesModule.initStoryPlayer();
        const storyContainer = document.getElementById('storyContainer');
        if (storyContainer) {
            storiesModule.renderStoryCards(storyContainer);
        }

        // Story volume slider
        const storyVolumeSlider = document.getElementById('storyVolumeSlider');
        const storyVolumeValue = document.getElementById('storyVolumeValue');
        if (storyVolumeSlider) {
            storyVolumeSlider.addEventListener('input', (e) => {
                const vol = parseFloat(e.target.value);
                storiesModule.setStoryVolume(vol);
                if (storyVolumeValue) storyVolumeValue.textContent = Math.round(vol * 100) + '%';
            });
        }

        // Stop story button
        const stopStoryBtn = document.getElementById('stopStoryBtn');
        if (stopStoryBtn) {
            stopStoryBtn.addEventListener('click', storiesModule.stopStory);
        }

        // Classical Library
        console.log("[Main] Initializing Classical...");
        classicalModule.initClassical();
        console.log("[Main] Classical initialized successfully");

        // Audio Library
        await audioLibModule.initAudioLibrary();
        audioLibModule.setupUploadHandler();

        // Journey Program
        journeyModule.initJourney();
        const journeyBtn = document.getElementById('journeyBtn');
        const journeyModal = document.getElementById('journeyModal');
        const closeJourneyBtn = document.getElementById('closeJourneyBtn');
        const journeyContainer = document.getElementById('journeyContainer');

        if (journeyBtn && journeyModal) {
            journeyBtn.addEventListener('click', () => {
                journeyModal.classList.remove('hidden');
                if (journeyContainer) journeyModule.renderJourneyUI(journeyContainer);
            });
        }

        if (closeJourneyBtn && journeyModal) {
            closeJourneyBtn.addEventListener('click', () => {
                journeyModal.classList.add('hidden');
            });
            journeyModal.addEventListener('click', (e) => {
                if (e.target === journeyModal) journeyModal.classList.add('hidden');
            });
        }

        console.log("[Main] Content modules loaded successfully");
    } catch (e) {
        console.warn("[Main] Content module loading failed:", e);
    }
}
