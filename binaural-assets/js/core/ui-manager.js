// binaural-assets/js/core/ui-manager.js
import { setupUI, applyAIIntent, showDisclaimerModal } from '../ui/controls_v3.js';
import { setupSwipeGestures } from '../ui/layout.js';
import { initResizablePanels } from '../ui/resize-panels.js';
import { flowManager } from '../utils/modal-manager.js';
import { initIntentSurvey } from '../ui/intent-survey.js';
import { initExitIntent } from '../ui/exit-intent.js';
import { checkReferral } from '../services/referral.js';
import { checkSurveyTrigger, showFeedbackSurvey } from '../utils/feedback-survey.js';
import { copyShareLink } from '../services/share.js';
import { getCloudPresets, syncLocalMixesToCloud } from '../services/presets-service.js';
import { initCoachModal, playGreeting } from '../ui/coach-modal.js';
import { captureViralVibe } from '../export/vibe-exporter.js';
import { initPaywallModal } from '../ui/paywall-modal.js';
import { processIncomingReferral } from '../services/referral-engine.js';
import { biometrics } from '../services/biometrics.js';
import { leantime } from '../services/leantime.js';
import { calculateFrequencyFromGoal } from '../services/ai-intent-service.js';
import { applyAIPreset } from '../ui/controls_v3.js';
import { startAudio } from '../audio/engine.js';
import { state } from '../state.js';

// Pre-define dynamic imports for performance modeling
const lazy = {
    onboarding: () => import('../tutorial-walkthrough.js?v=TUTORIAL_V2'),
    pwa: () => import('../utils/pwa-install.js'),
    cursor: () => import('../ui/cursor.js'),
    haptics: () => import('../utils/haptics.js'),
    lockscreen: () => import('../audio/lock-screen.js'),
    email: () => import('../ui/email-capture.js')
};

export function initCoreUI() {
    console.log("[UIManager] Init UI setup...");
    
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
                                console.log('[UIManager] User intent captured:', intent);
                                // Auto-tune player based on intent
                                if (intent && intent !== 'explore') {
                                    applyAIIntent(intent);
                                }
                                playGreeting(intent);
                                startOnboarding(true, intent);
                                resolve();
                            });
                        }, 1000);
                    } else {
                        // Auto-accept disclaimer for now
                        localStorage.setItem('mindwave_disclaimer_accepted', 'true');
                        setTimeout(checkAndStartFlow, 1000);
                    }
                };
                checkAndStartFlow();
            });
        }, 20);
    }

    // Init State of the Art Features
    lazy.lockscreen().then(m => m.initLockScreenControls());

    // Core UI Setup - Critical path
    console.log("[UIManager] Attempting setupUI()...");
    if (typeof setupUI === 'function') {
        setupUI();
    } else if (typeof window.setupUI === 'function') {
        window.setupUI();
    } else {
        console.error("[UIManager] setupUI is NOT A FUNCTION!");
    }

    // Initialize Coach Modal
    initCoachModal();
    
    // Initialize Viral & Revenue Features
    initPaywallModal();
    processIncomingReferral();

    const vibeBtn = document.getElementById('vibeBtn');
    if (vibeBtn) {
        vibeBtn.addEventListener('click', () => {
            captureViralVibe(10000, 'mp4'); // 10 second export
        });
    }

    const bioBtn = document.getElementById('bioBtn');
    if (bioBtn) {
        bioBtn.addEventListener('click', async () => {
            const connected = await biometrics.connect();
            if (connected) {
                bioBtn.style.color = '#10b981'; // Green when connected
            }
        });
    }

    // --- LEANTIME INTEGRATION ---
    const leantimeBtn = document.getElementById('leantimeBtn');
    const authModal = document.getElementById('leantimeAuthModal');
    const tasksModal = document.getElementById('leantimeTasksModal');
    
    if (leantimeBtn) {
        leantimeBtn.addEventListener('click', async () => {
            // Check if already authenticated
            if (leantime.domain && leantime.apiKey) {
                tasksModal.classList.remove('hidden');
                await loadLeantimeTasks();
            } else {
                authModal.classList.remove('hidden');
            }
        });
    }

    document.getElementById('leantimeCancelAuth')?.addEventListener('click', () => {
        authModal.classList.add('hidden');
    });

    document.getElementById('leantimeSaveAuth')?.addEventListener('click', async () => {
        const domain = document.getElementById('leantimeDomain').value;
        const apiKey = document.getElementById('leantimeApiKey').value;
        const btn = document.getElementById('leantimeSaveAuth');
        btn.textContent = 'Connecting...';
        
        const success = await leantime.authenticate(domain, apiKey);
        if (success) {
            authModal.classList.add('hidden');
            tasksModal.classList.remove('hidden');
            await loadLeantimeTasks();
        } else {
            btn.textContent = 'Failed. Try Again';
            setTimeout(() => btn.textContent = 'Connect', 2000);
        }
    });

    document.getElementById('leantimeCloseTasks')?.addEventListener('click', () => {
        tasksModal.classList.add('hidden');
    });

    document.getElementById('pomodoroToggle')?.addEventListener('click', () => leantime.togglePomodoro());
    document.getElementById('pomodoroStop')?.addEventListener('click', () => leantime.stopPomodoro());

    document.getElementById('leantimeToggleUser')?.addEventListener('click', async (e) => {
        e.target.classList.replace('border', 'bg-[var(--accent)]');
        e.target.classList.replace('text-[var(--text-secondary)]', 'text-black');
        
        const teamBtn = document.getElementById('leantimeToggleTeam');
        teamBtn.classList.replace('bg-[var(--accent)]', 'border');
        teamBtn.classList.replace('text-black', 'text-[var(--text-secondary)]');
        
        await loadLeantimeTasks('user');
    });

    document.getElementById('leantimeToggleTeam')?.addEventListener('click', async (e) => {
        e.target.classList.replace('border', 'bg-[var(--accent)]');
        e.target.classList.replace('text-[var(--text-secondary)]', 'text-black');
        
        const userBtn = document.getElementById('leantimeToggleUser');
        userBtn.classList.replace('bg-[var(--accent)]', 'border');
        userBtn.classList.replace('text-black', 'text-[var(--text-secondary)]');
        
        await loadLeantimeTasks('team');
    });

    async function loadLeantimeTasks(scope = 'user') {
        const list = document.getElementById('leantimeTaskList');
        list.innerHTML = '<div class="flex items-center justify-center h-32 text-[var(--text-secondary)]">Fetching...</div>';
        
        const tasks = await leantime.fetchTickets(scope);
        if (tasks.length === 0) {
            list.innerHTML = '<div class="flex items-center justify-center h-32 text-[var(--text-secondary)]">No tasks found.</div>';
            return;
        }

        list.innerHTML = tasks.map(t => `
            <div class="leantime-task-item p-4 rounded-xl border border-[var(--border-color)] bg-black/20 hover:bg-[var(--accent)]/10 cursor-pointer transition-colors" data-title="${t.headline}">
                <div class="font-medium text-white">${t.headline}</div>
                <div class="text-xs text-[var(--text-secondary)] mt-1">${t.type || 'Task'}</div>
            </div>
        `).join('');

        // Bind clicks
        document.querySelectorAll('.leantime-task-item').forEach(item => {
            item.addEventListener('click', async (e) => {
                const title = e.currentTarget.dataset.title;
                tasksModal.classList.add('hidden');
                
                // Trigger Focus Audio
                const intent = 'focus'; // Default to focus for tasks
                const result = calculateFrequencyFromGoal(intent);
                if (result) {
                    await applyAIPreset(result);
                    if (!state.isPlaying) startAudio();
                }
                
                // Start Pomodoro
                leantime.startPomodoro(25, title);
            });
        });
    }
    
    // If onboarding is already complete, play a standard greeting
    if (onboardingComplete) {
        setTimeout(() => {
            const savedIntent = localStorage.getItem('mindwave_last_intent') || 'default';
            playGreeting(savedIntent);
        }, 3000);
    }

    // Mobile features
    lazy.haptics().then(m => m.initHaptics());
    setupSwipeGestures();

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
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.pointerEvents = 'none';
        setTimeout(() => {
            if (loadingScreen.parentNode) loadingScreen.parentNode.removeChild(loadingScreen);
        }, 500);
    }

    // Cloud Presets
    getCloudPresets().then(presets => {
        console.log(`[UIManager] ${presets.length} cloud presets loaded.`);
    });
}

function setupCymaticListeners() {
    console.log('[UIManager] Setting up Cymatic UI Listeners');
    
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

    // Intensity Sliders
    document.querySelectorAll('.cymatic-intensity-slider').forEach(slider => {
        slider.addEventListener('input', (e) => {
            const classId = parseInt(e.target.dataset.class);
            const val = parseFloat(e.target.value);
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

export function initGlobalExports() {
    window.showFeedbackSurvey = showFeedbackSurvey;

    window.startOnboarding = async (force = false, intent = null) => {
        const { initTutorial: start } = await lazy.onboarding();
        start(force, intent);
    };
    window.startTutorial = () => window.startOnboarding(true);

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
}
