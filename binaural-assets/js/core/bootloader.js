// binaural-assets/js/core/bootloader.js
import { initCompliance } from '../compliance.js';
import { initAuthAndServices } from './auth-manager.js';
import { initCoreUI, initGlobalExports } from './ui-manager.js';

export function bootApp() {
    console.time('InitApp');
    console.log("[Bootloader] Booting MindWave Core...");

    if (window.APP_INITIALIZED) return;
    window.APP_INITIALIZED = true;

    // 1. Setup Global Exports (Window bindings)
    initGlobalExports();

    // 2. Initialize UI, intents, haptics, etc.
    initCoreUI();

    // 3. Initialize Firebase, Analytics, Payments (non-blocking)
    initAuthAndServices();

    // 4. Load Content Modules (Stories, Classical, Audio Lib, Journey)
    requestIdleCallback ? requestIdleCallback(loadContentModules) : setTimeout(loadContentModules, 100);

    // Check if survey should be triggered
    setTimeout(() => {
        if (window.checkSurveyTrigger) {
            window.checkSurveyTrigger();
        }
    }, 15000); 

    console.log("[Bootloader] Core Boot Complete.");
    console.timeEnd('InitApp');
}

async function loadContentModules() {
    try {
        const [storiesModule, audioLibModule, journeyModule, classicalModule] = await Promise.all([
            import('../content/stories.js'),
            import('../content/audio-library.js'),
            import('../content/journey.js'),
            import('../content/classical.js')
        ]);

        // Sleep Stories
        if (storiesModule.initStoryPlayer) storiesModule.initStoryPlayer();
        const storyContainer = document.getElementById('storyContainer');
        if (storyContainer && storiesModule.renderStoryCards) {
            storiesModule.renderStoryCards(storyContainer);
        }

        const storyVolumeSlider = document.getElementById('storyVolumeSlider');
        const storyVolumeValue = document.getElementById('storyVolumeValue');
        if (storyVolumeSlider && storiesModule.setStoryVolume) {
            storyVolumeSlider.addEventListener('input', (e) => {
                const vol = parseFloat(e.target.value);
                storiesModule.setStoryVolume(vol);
                if (storyVolumeValue) storyVolumeValue.textContent = Math.round(vol * 100) + '%';
            });
        }

        const stopStoryBtn = document.getElementById('stopStoryBtn');
        if (stopStoryBtn && storiesModule.stopStory) {
            stopStoryBtn.addEventListener('click', storiesModule.stopStory);
        }

        // Classical Library
        if (classicalModule.initClassical) classicalModule.initClassical();

        // Audio Library
        if (audioLibModule.initAudioLibrary) await audioLibModule.initAudioLibrary();
        if (audioLibModule.setupUploadHandler) audioLibModule.setupUploadHandler();

        // Journey Program
        if (journeyModule.initJourney) journeyModule.initJourney();
        const journeyBtn = document.getElementById('journeyBtn');
        const journeyModal = document.getElementById('journeyModal');
        const closeJourneyBtn = document.getElementById('closeJourneyBtn');
        const journeyContainer = document.getElementById('journeyContainer');

        if (journeyBtn && journeyModal) {
            journeyBtn.addEventListener('click', () => {
                journeyModal.classList.remove('hidden');
                if (journeyContainer && journeyModule.renderJourneyUI) {
                    journeyModule.renderJourneyUI(journeyContainer);
                }
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

    } catch (e) {
        console.warn("[Bootloader] Content module loading failed:", e);
    }
}

// Ensure init happens properly
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initCompliance();
        bootApp();
    });
} else {
    initCompliance();
    bootApp();
}
