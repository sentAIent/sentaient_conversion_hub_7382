console.log("MAIN JS LOADED - NUCLEAR V4");
window.NUCLEAR_MAIN_LOADED = true;
import { setupUI } from './ui/controls_v3.js?v=MATRIX_FIX_V15';
import { initCursor } from './ui/cursor.js';
import { initFirebase } from './services/firebase.js';
import { initAuthUI } from './ui/auth-controller.js';
import { startOnboarding, shouldShowOnboarding } from './ui/onboarding_premium.js';
import { initHaptics } from './utils/haptics.js';
import { initShareFeature, copyShareLink } from './services/share.js';
import { recordVisit } from './services/analytics.js';
import { setupSwipeGestures } from './ui/layout.js';
import { initResizablePanels } from './ui/resize-panels.js';
import './ui/pricing-3tier.js';  // 3-Tier Pricing modal (Free/Yogi/Buddha)
import { handlePaymentSuccess } from './services/stripe-simple.js';  // Payment handler
import { initPaywall } from './utils/paywall.js';  // Paywall system
import { initAnalytics, trackSignup, trackLogin, trackBeginCheckout, trackPurchase, trackFeatureUse, trackSessionStart, trackSessionEnd, trackPaywallShown, trackUpgradeClick, setUserProperties } from './utils/analytics.js';  // Analytics
import { showFeedbackSurvey, checkSurveyTrigger, TRIGGER_CONDITIONS } from './utils/feedback-survey.js';  // Feedback system
import { checkReferral } from './services/referral.js'; // Referral tracking
import { initSocialProof } from './services/social-proof.js'; // Social Proof
import { initExitIntent } from './ui/exit-intent.js'; // Exit Intent Popup
import { initNotifications } from './services/notifications.js'; // Push Notifications
import { initEmailCapture } from './ui/email-capture.js'; // Email Capture


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

    // Firebase & Auth (non-blocking)
    try {
        initFirebase();
        initAuthUI();
        initPaywall();  // Initialize paywall system
        initAnalytics();  // Initialize Google Analytics
    } catch (e) {
        console.warn("[Main] Firebase/Auth/Analytics Init Failed:", e);
    }

    // Expose feedback survey globally
    // window.showFeedbackSurvey = showFeedbackSurvey; // Moved to top

    // Core UI Setup - Critical path
    setupUI();

    // Mobile features
    initHaptics();
    setupSwipeGestures();

    // Resizable side panels
    initResizablePanels();

    // Analytics
    recordVisit();

    // URL sharing
    initShareFeature();

    // Custom Cursor
    initCursor();

    // Check for referral code
    checkReferral();

    // Social Proof
    initSocialProof();

    // Phase 3: Retention Features
    initExitIntent();      // Exit intent popup on mouse leave
    initNotifications();    // Push notification permission handling
    initEmailCapture();     // Email capture for non-logged-in users

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

    // Show onboarding for new users (after disclaimer is accepted)
    if (shouldShowOnboarding()) {
        const checkAndStartOnboarding = () => {
            if (localStorage.getItem('mindwave_disclaimer_accepted') === 'true') {
                setTimeout(startOnboarding, 500);
            } else {
                setTimeout(checkAndStartOnboarding, 1000);
            }
        };
        checkAndStartOnboarding();
    }

    console.log("[Main] App Initialization Complete.");
};

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
