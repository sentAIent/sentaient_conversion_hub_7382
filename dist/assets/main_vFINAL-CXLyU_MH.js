// Mindwave Studio Core
window.NUCLEAR_MAIN_LOADED = true;
// Core Modules for boot
import { setupUI, applyAIIntent, showDisclaimerModal } from './ui/controls_v3.js';
import { initFirebase, registerAuthCallback } from './services/firebase.js';
import { initCompliance } from './compliance.js';
import { initAuthUI } from './ui/auth-controller.js';
import { setupSwipeGestures } from './ui/layout.js';
import { initResizablePanels } from './ui/resize-panels.js';
import { flowManager } from './utils/modal-manager.js';

// Pre-define dynamic imports for performance modeling
const lazy = {
    onboarding: () => import('./ui/onboarding.js?v=FIX_TUTORIAL_V127'),
    pwa: () => import('./utils/pwa-install.js'),
    presence: () => import('./services/presence-service.js'),
    cursor: () => import('./ui/cursor.js'),
    share: () => import('./services/share.js'),
    haptics: () => import('./utils/haptics.js'),
    lockscreen: () => import('./audio/lock-screen.js'),
    email: () => import('./ui/email-capture.js')
};

import { initExitIntent } from './ui/exit-intent.js';
import { initIntentSurvey } from './ui/intent-survey.js';
import { initSocialProof } from './services/social-proof.js';
import { checkReferral } from './services/referral.js';
import { handleError, logErrorToAnalytics } from './utils/error-handler.js';

// Static imports for core non-lazy modules
import { getCloudPresets, syncLocalMixesToCloud } from './services/presets-service.js';
import './utils/ab-testing.js';
import { initPaywall } from './utils/paywall.js';
import { initAnalytics, trackSignup, trackLogin, trackBeginCheckout, trackPurchase, trackFeatureUse, trackSessionStart, trackSessionEnd, trackPaywallShown, trackUpgradeClick, setUserProperties } from './utils/analytics.js';
import { handlePaymentSuccess } from './services/stripe-simple.js';
import { checkSurveyTrigger, showFeedbackSurvey } from './utils/feedback-survey.js';
import { startPresenceHeartbeat, subscribeToPresenceCounts } from './services/presence-service.js';
import { copyShareLink } from './services/share.js';
import { recordVisit, syncDailyUsage } from './services/analytics.js';


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

// Expose onboarding globally (Lazy)
window.startOnboarding = async (force = false) => {
    const { initializeOnboarding: start } = await lazy.onboarding();
    start(force);
};
window.startTutorial = () => window.startOnboarding(true);

window.trackSessionStart = trackSessionStart;
window.trackSessionEnd = trackSessionEnd;
window.trackPaywallShown = trackPaywallShown;
window.trackUpgradeClick = trackUpgradeClick;
window.setUserProperties = setUserProperties;

// Expose Volume Mixers globally
import { setMasterVolume, setBeatsVolume, setAtmosVolume } from './audio/engine.js';
window.setMasterVolume = setMasterVolume;
window.setBeatsVolume = setBeatsVolume;
window.setAtmosVolume = setAtmosVolume;

// Global Error Handlers (must be before anything else)
window.onerror = (message, source, lineno, colno, error) => {
    handleError(error || new Error(message), 'Uncaught');
    logErrorToAnalytics(error || new Error(message), `${source}:${lineno}:${colno}`);
};
window.onunhandledrejection = (event) => {
    handleError(event.reason || new Error('Unhandled rejection'), 'Promise');
    logErrorToAnalytics(event.reason || new Error('Unhandled rejection'), 'UnhandledPromise');
};

// Initialize Application
const initApp = () => {
    console.time('InitApp');
    console.log("[Main] InitApp Calling - Initializing UI...");

    // Check if already initialized to prevent double-init
    if (window.APP_INITIALIZED) return;
    window.APP_INITIALIZED = true;

    // Capture referral codes from URL immediately
    checkReferral();

    // Retention & Personalization
    initExitIntent();

    // Check for first-time session (v5 for new Intent-based flow)
    const onboardingComplete = localStorage.getItem('mindwave_onboarding_complete_v5');

    if (!onboardingComplete) {
        flowManager.enqueue('intent_survey', () => {
            return new Promise((resolve) => {
                const checkAndStartFlow = () => {
                    if (localStorage.getItem('mindwave_disclaimer_accepted') === 'true') {
                        setTimeout(() => {
                            initIntentSurvey((intent) => {
                                console.log('[Main] User intent captured:', intent);
                                // Auto-tune player based on intent
                                if (intent && intent !== 'explore') {
                                    applyAIIntent(intent);
                                }
                                startOnboarding(true, intent);
                                resolve();
                            });
                        }, 1000);
                    } else {
                        if (true) { // Auto-accept disclaimer
                            localStorage.setItem('mindwave_disclaimer_accepted', 'true');
                            setTimeout(checkAndStartFlow, 1000);
                        } else {
                            // Trigger disclaimer automatically if missing
                            showDisclaimerModal();
                            setTimeout(checkAndStartFlow, 1000);
                        }
                    }
                };
                checkAndStartFlow();
            });
        }, 20);
    }
    // Scaling & Stability (Phase 6)
    initSessionMilestones();

    // Init State of the Art Features
    lazy.lockscreen().then(m => m.initLockScreenControls());

    // Done
    console.log("[Main] Mindwave Core v101 Initialized.");

    // Firebase & Auth (non-blocking)
    try {
        initFirebase();
        initAuthUI();
        initPresencePulse();
        initConnectivityListener();
        initPaywall();  // Initialize paywall system
        initAnalytics();  // Initialize Google Analytics
        recordVisit();    // Record daily visit and update streak
        syncDailyUsage(); // Sync any offline usage

        // Social Proof toasts (only for non-premium users)
        if (localStorage.getItem('mindwave_premium') !== 'true') {
            initSocialProof();
        }

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
        console.time('setupUI_Total');
        setupUI();
        console.timeEnd('setupUI_Total');
    } else if (typeof window.setupUI === 'function') {
        console.warn("[Main] setupUI not in scope but found on window. Calling fallback.");
        window.setupUI();
    } else {
        console.error("[Main] setupUI is NOT A FUNCTION! Type:", typeof setupUI);
    }

    // Mobile features
    lazy.haptics().then(m => m.initHaptics());
    setupSwipeGestures();
    console.timeEnd('InitApp');

    // Resizable side panels
    
function setupCymaticListeners() {
    console.log('[Main] Setting up Cymatic UI Listeners');
    
    // Color Pickers
    document.querySelectorAll('.cymatic-color-picker').forEach(picker => {
        picker.addEventListener('input', (e) => {
            const classId = parseInt(e.target.dataset.class);
            const colorIdx = parseInt(e.target.dataset.color);
            const hex = parseInt(e.target.value.replace('#', '0x'), 16);
            if (window.setCymaticColor) {
                window.setCymaticColor(classId, colorIdx, hex);
            }
        });
    });

    // Intensity Sliders (they don't have data-param, they are specifically for intensity)
    document.querySelectorAll('.cymatic-intensity-slider').forEach(slider => {
        slider.addEventListener('input', (e) => {
            const classId = parseInt(e.target.dataset.class);
            // Convert 0-100 to 0.0-1.0
            const val = parseFloat(e.target.value);
            
            // Update UI text display
            const display = e.target.parentElement.querySelector('.value-display');
            if (display) display.textContent = e.target.value + '%';
            
            if (window.setCymaticParam) {
                window.setCymaticParam(classId, 'intensity', val);
            }
        });
    });

    // Advanced Param Sliders
    document.querySelectorAll('.cymatic-param-slider').forEach(slider => {
        slider.addEventListener('input', (e) => {
            const classId = parseInt(e.target.dataset.class);
            const param = e.target.dataset.param;
            const val = parseFloat(e.target.value);
            
            // Update UI text display
            const display = e.target.parentElement.querySelector('.value-display');
            if (display) display.textContent = val.toFixed(1);
            
            if (window.setCymaticParam) {
                window.setCymaticParam(classId, param, val);
            }
        });
    });

    // Toggles
    document.querySelectorAll('.cymatic-param-toggle').forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const classId = parseInt(e.target.dataset.class);
            const param = e.target.dataset.param;
            const val = e.target.checked ? 1.0 : 0.0;
            
            if (window.setCymaticParam) {
                window.setCymaticParam(classId, param, val);
            }
        });
    });
}

    setupCymaticListeners();

    initResizablePanels();

    // Custom Cursor
    lazy.cursor().then(m => m.initCursor());

    // Email Capture (Deferred via Flow)
    flowManager.enqueue('email_capture', () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                lazy.email().then(m => m.initEmailCapture());
                resolve();
            }, 60000);
        });
    }, 10);

    // PWA (Non-blocking)
    lazy.pwa().then(m => m.initPWAInstall());

    // Hide loading screen immediately once core UI is ready
    // Hide loading screen immediately once core UI is ready
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        // FORCE REMOVAL - Critical Path
        console.log('[Main] Removing loading screen immediately (Time: ' + performance.now().toFixed(0) + 'ms)');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.pointerEvents = 'none';

        // Use a short timeout to allow CSS transition, but ensure removal
        setTimeout(() => {
            if (loadingScreen.parentNode) loadingScreen.parentNode.removeChild(loadingScreen);
        }, 500);
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
        const result = await copyShareLink();
        if (result.success) {
            const toast = document.createElement('div');
            toast.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--accent);color:#0f172a;padding:12px 24px;border-radius:12px;font-size:12px;font-weight:bold;z-index:9999;box-shadow:0 0 20px rgba(96,169,255,0.4);`;
            toast.textContent = '🔗 Share link copied!';
            document.body.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    };

    // Onboarding handled by Intent Survey flow above
};

/**
 * Session Intelligence (Phase 6)
 * Tracks user engagement and triggers smart prompts.
 */
function initConnectivityListener() {
    const updateStatus = () => {
        const isOffline = !navigator.onLine;
        document.body.classList.toggle('is-offline', isOffline);

        const offlineIndicator = document.getElementById('offlineIndicator');
        if (offlineIndicator) {
            offlineIndicator.classList.toggle('hidden', !isOffline);
            offlineIndicator.classList.toggle('flex', isOffline);
        }

        if (isOffline) {
            console.log('[Connectivity] App is OFFLINE - Switching to Cache Mode');
        } else {
            console.log('[Connectivity] App is ONLINE');
        }
    };

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus(); // Initial check
}

const initSessionMilestones = () => {
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
    document.addEventListener('DOMContentLoaded', () => {
        // 1. Initialize Compliance Gate
        initCompliance();

        // Remove fallback screen if any
        initApp();
    });
} else {
    initCompliance();
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

// -----------------------------------------------------------------------------
// LEGACY API ADAPTERS
// Restores backward compatibility for legacy HTML hardcoded buttons
// without breaking the modern module architecture.
// -----------------------------------------------------------------------------

window.playMeditationStory = async (storyId, element) => {
    try {
        console.log(`[Legacy API] playMeditationStory called for: ${storyId}`);
        const storiesModule = await import('./content/stories.js');
        if (storiesModule.playStory) {
            storiesModule.playStory(storyId, element);
        } else {
            console.warn('[Legacy API] playStory function not found in stories module.');
        }
    } catch (e) {
        console.error('[Legacy API] Failed to load stories module:', e);
    }
};

const LEGACY_PAD_MAP = {
    0: 'pad',
    1: 'drone',
    2: 'crystal',
    3: 'choir',
    4: 'shimmer',
    5: 'subbass',
    6: 'heartbeat',
    7: 'tibetan'
};

window.triggerDjSound = async (padIndex) => {
    try {
        const soundId = LEGACY_PAD_MAP[padIndex] || padIndex;
        console.log(`[Legacy API] triggerDjSound called for pad: ${padIndex} -> ${soundId}`);
        const djSynth = await import('./audio/dj-synth.js');
        if (djSynth.triggerOneShot) {
            djSynth.triggerOneShot(soundId);
        }
    } catch(e) {
        console.error('[Legacy API] Failed to load dj-synth:', e);
    }
};

window.clearAllDjPads = async () => {
    try {
        console.log('[Legacy API] clearAllDjPads called');
        const djSynth = await import('./audio/dj-synth.js');
        if (djSynth.stopAllLoops) {
            djSynth.stopAllLoops();
        }
    } catch(e) {
        console.error('[Legacy API] Failed to stop DJ loops:', e);
    }
};

window.toggleDjHold = async (padIndex) => {
    try {
        const soundId = LEGACY_PAD_MAP[padIndex] || padIndex;
        console.log(`[Legacy API] toggleDjHold called for pad: ${padIndex} -> ${soundId}`);
        const djSynth = await import('./audio/dj-synth.js');
        if (djSynth.isLoopActive && djSynth.isLoopActive(soundId)) {
            djSynth.stopLoop(soundId);
        } else if (djSynth.startLoop) {
            djSynth.startLoop(soundId);
        }
    } catch(e) {
        console.error('[Legacy API] Failed to toggle DJ hold:', e);
    }
};

window.seekClassicalAudio = (time) => {
    console.log(`[Legacy API] seekClassicalAudio to: ${time}`);
    const audioEl = document.getElementById('classicalAudioPlayer') || document.querySelector('audio.classical');
    if (audioEl) {
        audioEl.currentTime = time;
    }
};

window.updateVisualIntensity = (value, elementId) => {
    console.log(`[Legacy API] updateVisualIntensity value: ${value}`);
    const el = document.getElementById(elementId);
    if (el) el.textContent = value + '%';
    
    // Attempt to route to visualizer engines
    if (window.controls && window.controls.setIntensity) {
        window.controls.setIntensity(value);
    } else if (window.setVisualIntensity) {
        window.setVisualIntensity(value);
    }
};

// ==========================================
// Toggle Observer Effect
// ==========================================
window.toggleObserverEffect = function(isObserved) {
    if (!window.viz3D || !window.viz3D.cymaticsCore) return;
    
    if (window.viz3D.cymaticsCore.activeClassId !== 25) {
        if (window.setCymaticPattern) window.setCymaticPattern(25, 0);
    }
    
    const targetObserver = isObserved ? 1.0 : 0.0;
    const material = window.viz3D.cymaticsCore.materials[25];
    if (material && material.uniforms) {
        if (material.uniforms.uObserver) {
            const start = material.uniforms.uObserver.value;
            const startTime = Date.now();
            const duration = 1000;
            
            function animateObserver() {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                material.uniforms.uObserver.value = start + (targetObserver - start) * ease;
                
                if (progress < 1) requestAnimationFrame(animateObserver);
            }
            animateObserver();
        }
    }
};
