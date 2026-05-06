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
