/**
 * Mindwave Studio Core - ULTRASYNC_V138 DEFINITIVE
 * ──────────────────────────────────────────────────────────────────────────
 * Main Entry Point for Mindwave Pro Production.
 */

import { setupUI } from './ui/controls_v3.js';
import { preloadVisualizer } from './visuals/visualizer_lazy.js';
import { initFirebase } from './services/firebase.js';
import { initCursor } from './ui/cursor.js';

window.NUCLEAR_MAIN_LOADED = "V138_STABLE";

// Load non-critical content modules after initial render
async function loadContentModules() {
    try {
        // Dynamic imports - only loaded when needed
        const [storiesModule, audioLibModule, journeyModule, classicalModule] = await Promise.all([
            import('./content/stories.js').catch(e => console.warn('stories.js missing', e)),
            import('./content/audio-library.js').catch(e => console.warn('audio-library.js missing', e)),
            import('./content/journey.js').catch(e => console.warn('journey.js missing', e)),
            import('./content/classical.js').catch(e => console.warn('classical.js missing', e))
        ]);

        if (storiesModule) {
            if(storiesModule.initStoryPlayer) storiesModule.initStoryPlayer();
            const storyContainer = document.getElementById('storyContainer');
            if (storyContainer && storiesModule.renderStoryCards) {
                storiesModule.renderStoryCards(storyContainer);
            }

            const storyVolumeSlider = document.getElementById('storyVolumeSlider');
            const storyVolumeValue = document.getElementById('storyVolumeValue');
            if (storyVolumeSlider) {
                storyVolumeSlider.addEventListener('input', (e) => {
                    const vol = parseFloat(e.target.value);
                    if(storiesModule.setStoryVolume) storiesModule.setStoryVolume(vol);
                    if (storyVolumeValue) storyVolumeValue.textContent = Math.round(vol * 100) + '%';
                });
            }

            const stopStoryBtn = document.getElementById('stopStoryBtn');
            if (stopStoryBtn && storiesModule.stopStory) {
                stopStoryBtn.addEventListener('click', storiesModule.stopStory);
            }
        }

        if (classicalModule && classicalModule.initClassical) {
            console.log("[Main] Initializing Classical...");
            classicalModule.initClassical();
            console.log("[Main] Classical initialized successfully");
        }

        if (audioLibModule) {
            if(audioLibModule.initAudioLibrary) await audioLibModule.initAudioLibrary();
            if(audioLibModule.setupUploadHandler) audioLibModule.setupUploadHandler();
        }

        if (journeyModule) {
            if(journeyModule.initJourney) journeyModule.initJourney();
            const journeyBtn = document.getElementById('journeyBtn');
            const journeyModal = document.getElementById('journeyModal');
            const closeJourneyBtn = document.getElementById('closeJourneyBtn');
            const journeyContainer = document.getElementById('journeyContainer');

            if (journeyBtn && journeyModal) {
                journeyBtn.addEventListener('click', () => {
                    journeyModal.classList.remove('hidden');
                    if (journeyContainer && journeyModule.renderJourneyUI) journeyModule.renderJourneyUI(journeyContainer);
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
        }

        console.log("[Main] Content modules loaded successfully");
    } catch (e) {
        console.warn("[Main] Content module loading failed:", e);
    }
}

const initApp = async () => {
    console.log('[Main] Starting V138 Definitive Boot Sequence...');

    try {
        // 1. Initialize Firebase (Mock mode activates if config is missing)
        await initFirebase();

        // 2. Initialize UI Controls
        setupUI();

        // 3. Preload 3D Engine
        preloadVisualizer();

        // 3.5. Initialize Cursors
        initCursor();

        // Load audio library and other content modules
        window.requestIdleCallback ? window.requestIdleCallback(loadContentModules) : setTimeout(loadContentModules, 100);

        // 4. Cleanup Loading State
        const loader = document.getElementById('loadingScreen');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                console.log('[Main] System Operational.');
            }, 800);
        }

    } catch (err) {
        console.error('[Main] Critical Boot Failure:', err);
        // Failsafe: remove loader so user can see something
        const loader = document.getElementById('loadingScreen');
        if (loader) loader.remove();
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
