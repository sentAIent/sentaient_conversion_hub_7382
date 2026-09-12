// Mindwave Studio Core - Refactored Orchestrator
window.NUCLEAR_MAIN_LOADED = true;

import { handleError, logErrorToAnalytics } from './utils/error-handler.js';
import { handlePaymentSuccess } from './services/stripe-simple.js';

// Expose Volume Mixers globally (critical early bindings)
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

// Handle payment return (if redirected from Stripe)
handlePaymentSuccess();

// Initialize backend maintenance service (Supabase pings)
import { supabaseMaintenance } from './services/supabase-maintenance.js';
supabaseMaintenance.init();

import { deleteUserAccount } from './services/firebase.js';

// Setup Compliance & Viral Features
document.addEventListener('DOMContentLoaded', () => {
    // 1. Delete Account
    const deleteBtn = document.getElementById('deleteAccountBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', async () => {
            if (confirm("Are you sure you want to delete your account? This action is permanent and cannot be undone.")) {
                if (confirm("FINAL WARNING: All your data, presets, and purchases will be lost forever. Proceed?")) {
                    try {
                        await deleteUserAccount();
                        alert("Account deleted successfully.");
                        window.location.reload();
                    } catch (e) {
                        alert("Failed to delete account. You may need to log out and log back in to verify your identity before deleting. Error: " + e.message);
                    }
                }
            }
        });
    }

    // 2. Share Soundscape
    const shareBtn = document.getElementById('shareSoundscapeBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            import('./state.js').then(({ state }) => {
                const shareParam = `${state.baseFrequency}_${state.beatFrequency}_${state.activePresetType || 'custom'}`;
                const shareUrl = new URL(window.location.href);
                shareUrl.searchParams.set('share', shareParam);
                
                navigator.clipboard.writeText(shareUrl.toString()).then(() => {
                    const originalText = shareBtn.innerHTML;
                    shareBtn.innerHTML = `<span class="flex-1 text-left text-[var(--accent)]">Link Copied!</span>`;
                    setTimeout(() => { shareBtn.innerHTML = originalText; }, 2000);
                });
            });
        });
    }

    // 3. Parse Share Link on Load
    const urlParams = new URLSearchParams(window.location.search);
    const shareData = urlParams.get('share');
    if (shareData) {
        const [base, beat, preset] = shareData.split('_');
        import('./state.js').then(({ state }) => {
            if (base) state.baseFrequency = parseFloat(base);
            if (beat) state.beatFrequency = parseFloat(beat);
            if (preset && preset !== 'custom') state.activePresetType = preset;
            
            // Try to force update UI when controls are ready
            setTimeout(() => {
                if (window.updateFrequencies) {
                    window.updateFrequencies(state.baseFrequency, state.beatFrequency);
                }
            }, 1000);
        });
    }
});

// Kickoff Bootloader Sequence
import './core/bootloader.js';
