/**
 * Mindwave Studio Core - Restored "PERFECT" Version (March 12th Afternoon)
 * ──────────────────────────────────────────────────────────────────────────
 * Main Entry Point for the Afternoon March 12th Restoration.
 */

import { setupUI } from './ui/controls_v3.js';
import { preloadVisualizer, getVisualizer } from './visuals/visualizer_lazy.js';
import { state } from './state.js';

// Application State Tracking
window.NUCLEAR_MAIN_LOADED = "V213_BOIL_REPAIRED";
console.log("[Main] LOADED VERSION: V213_BOIL_REPAIRED");

const initApp = () => {
    console.log('[Main] Initializing ULTRASYNC Version Boot Sequence...');

    try {
        // 1. Initialize UI Controls
        setupUI();

        // 2. Preload & Init 3D Engine
        preloadVisualizer();

        // 3. Remove Loading Screen with Fade
        const loader = document.getElementById('loadingScreen');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
                console.log('[Main] Boot Sequence Complete. Welcome to Mindwave.');
            }, 800);
        }

        // 4. Initial Theme Check
        document.body.classList.add('theme-slate'); // Default theme

    } catch (err) {
        console.error('[Main] Initialization error:', err);
    }
};

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Global Help Functions (Restored)
window.startOnboarding = (force = false) => {
    console.log('[Main] Onboarding requested (Legacy Mock)');
    alert("Mindwave Tutorial: Use the top sliders to adjust frequencies and the bottom icons to change visuals.");
};
