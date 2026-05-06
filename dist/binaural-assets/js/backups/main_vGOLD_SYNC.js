/**
 * Mindwave Studio Core - Restored "PERFECT" Version (March 12th Afternoon)
 * ──────────────────────────────────────────────────────────────────────────
 * Main Entry Point for the Afternoon March 12th Restoration.
 */

import { setupUI } from './ui/controls_v3.js';
// Force-Link 3D Engine for PRO Stability
import { initVisualizer, getVisualizer, preloadVisualizer } from './visuals/visualizer_lazy.js';
import { state } from './state.js';

async function bootPRO() {
    console.log('[PRO] Hard-Boot Sequence Initiated...');
    const canvas = document.getElementById('visualizer');
    if (!canvas) {
        console.error('[PRO] Canvas target missing!');
        return;
    }

    // Direct instantiation to bypass Lazy-Load race conditions
    const viz = await initVisualizer();
    window.viz3D = viz; 
    
    // Force immediate visibility
    canvas.style.opacity = '1';
    console.log('[PRO] Visualizer Hard-Linked. Active Modes:', Array.from(viz.activeModes));
}

// window.NUCLEAR_MAIN_LOADED ... removed here to avoid confusion
window.NUCLEAR_MAIN_LOADED = "V213_BOIL_REPAIRED";
console.log("[Main] LOADED VERSION: V213_BOIL_REPAIRED");

const initApp = async () => {
    console.log('[Main] Initializing ULTRASYNC Version Boot Sequence...');

    try {
        // 1. Initialize UI Controls FIRST to populate 'els' object (for els.canvas)
        setupUI();

        // 2. Hard-Boot Visualizer Engine now that 'els' is ready
        await bootPRO();

        // 3. Apply Visual Defaults now that viz3D is confirmed
        const viz = getVisualizer();
        if (viz) {
            // Force a default mode if nothing is active
            if (viz.activeModes.size === 0) {
                console.log('[Main] Forcing default mode: cymatics');
                viz.toggleMode('cymatics');
            }
            if (window.dispatchEvent) {
                window.dispatchEvent(new Event('visualizerReady'));
            }
        }

        // 4. Remove Loading Screen with Fade
        const loader = document.getElementById('loadingScreen');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
                console.log('[Main] Boot Sequence Complete. Welcome to Mindwave.');
            }, 800);
        }

        // 5. Initial Theme Check
        document.body.classList.add('theme-slate');
    } catch (err) {
        console.error('[Main] Initialization error:', err);
    }
};

// Start When Ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

window.NUCLEAR_MAIN_LOADED = "V213_BOIL_REPAIRED";
console.log("[Main] LOADED VERSION: V213_BOIL_REPAIRED");

// Global Help Functions (Restored)
window.startOnboarding = (force = false) => {
    console.log('[Main] Onboarding requested (Legacy Mock)');
    alert("Mindwave Tutorial: Use the top sliders to adjust frequencies and the bottom icons to change visuals.");
};
