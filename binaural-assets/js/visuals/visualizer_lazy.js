/**
 * Visualizer Lazy Loader
 * Defers loading of Three.js (1.2MB) until first visual interaction
 */

let visualizerModule = null;
let loadPromise = null;
let viz3D = null;

// Placeholder functions that queue actions until module loads
const pendingActions = [];

import { VISUALIZER_VERSION } from '../state.js';

/**
 * Load the visualizer module on demand
 */
async function loadVisualizerModule() {
    if (visualizerModule) return visualizerModule;

    if (loadPromise) return loadPromise;

    console.log(`[LazyViz] Loading visualizer module from ./visualizer_vGOLD_SYNC.js?v=${VISUALIZER_VERSION}`);
    // Added version tracking
    const startTime = performance.now();

    loadPromise = import('./visualizer_vGOLD_SYNC.js').then(module => {
        visualizerModule = module;
        const loadTime = (performance.now() - startTime).toFixed(0);
        console.log(`[LazyViz] Visualizer loaded in ${loadTime}ms`);

        // Execute any pending actions
        pendingActions.forEach(action => action());
        pendingActions.length = 0;

        return module;
    });

    return loadPromise;
}


/**
 * Initialize the visualizer (lazy loads if needed)
 */
export async function initVisualizer() {
    const module = await loadVisualizerModule();
    return module.initVisualizer();
}

/**
 * Get the visualizer instance
 * Returns null if not yet initialized (non-blocking)
 */
export function getVisualizer() {
    if (visualizerModule && typeof visualizerModule.getVisualizer === 'function') {
        const viz = visualizerModule.getVisualizer();
        if (viz) return viz;
    }
    // Fallback to global attachment if module-level lookup fails
    if (window.viz3D) return window.viz3D;
    
    console.warn('[LazyViz] getVisualizer: No instance found in module or global scope.');
    return null;
}

/**
 * Toggle a visual mode
 */
export async function toggleVisual(mode) {
    const module = await loadVisualizerModule();
    return module.toggleVisual(mode);
}

/**
 * Set visual speed
 */
export function setVisualSpeed(speed) {
    if (!visualizerModule) {
        pendingActions.push(() => visualizerModule.setVisualSpeed(speed));
        return;
    }
    return visualizerModule.setVisualSpeed(speed);
}

/**
 * Set visual color
 */
export function setVisualColor(color, mode = null) {
    if (!visualizerModule) {
        pendingActions.push(() => visualizerModule.setVisualColor(color, mode));
        return;
    }
    return visualizerModule.setVisualColor(color, mode);
}

/**
 * Pause visuals
 */
export function pauseVisuals() {
    if (!visualizerModule) return;
    return visualizerModule.pauseVisuals();
}

/**
 * Set visual brightness
 */
export function setVisualBrightness(brightness) {
    if (!visualizerModule) {
        pendingActions.push(() => {
            if (visualizerModule && visualizerModule.setVisualBrightness) visualizerModule.setVisualBrightness(brightness);
        });
        return;
    }
    if (visualizerModule.setVisualBrightness) return visualizerModule.setVisualBrightness(brightness);
}

/**
 * Set visual logo opacity
 */
export function setVisualLogoOpacity(opacity) {
    if (!visualizerModule) {
        pendingActions.push(() => {
            if (visualizerModule && visualizerModule.setVisualLogoOpacity) visualizerModule.setVisualLogoOpacity(opacity);
        });
        return;
    }
    if (visualizerModule.setVisualLogoOpacity) return visualizerModule.setVisualLogoOpacity(opacity);
}

/**
 * Set mouse influence
 */
export function setMouseInfluence(val) {
    if (!visualizerModule) {
        pendingActions.push(() => {
            if (visualizerModule && visualizerModule.setMouseInfluence) visualizerModule.setMouseInfluence(val);
        });
        return;
    }
    if (visualizerModule.setMouseInfluence) return visualizerModule.setMouseInfluence(val);
}

/**
 * Resume visuals
 */
export function resumeVisuals() {
    if (!visualizerModule) {
        pendingActions.push(() => visualizerModule.resumeVisuals());
        return;
    }
    return visualizerModule.resumeVisuals();
}

/**
 * Check if visuals are paused
 */
export function isVisualsPaused() {
    if (!visualizerModule) return true; // Assume paused if not loaded
    return visualizerModule.isVisualsPaused();
}

/**
 * Preload the visualizer in background (call after page is idle)
 * Also initializes the visualizer after loading
 */
export function preloadVisualizer() {
    if (window.isPreloadingViz) return;
    // Note: Visualizer preloading is now managed primarily by main_vGOLD_SYNC.js
    // to prevent redundant initialization race conditions.
    window.isPreloadingViz = true;

    const loadAndInit = async () => {
        console.log('[LazyViz] Preload starting...');
        const module = await loadVisualizerModule();
        if (module && typeof module.initVisualizer === 'function') {
            console.log('[LazyViz] Initializing visualizer core...');
            await module.initVisualizer();
            console.log('[LazyViz] Visualizer core initialized. Dispatching ready event.');
            window.VIZ_READY_DISPATCHED = true;
            window.dispatchEvent(new Event('visualizerReady'));
        }
    };
    requestAnimationFrame(loadAndInit);
}

// Global Attachment for HTML Events
window.getVisualizer = getVisualizer;
window.preloadVisualizer = preloadVisualizer;
window.initVisualizer = initVisualizer;
window.toggleVisual = toggleVisual;
window.setVisualSpeed = setVisualSpeed;
window.setVisualColor = setVisualColor;
window.setVisualBrightness = setVisualBrightness;
window.setVisualLogoOpacity = setVisualLogoOpacity;
window.pauseVisuals = pauseVisuals;
window.resumeVisuals = resumeVisuals;
window.isVisualsPaused = isVisualsPaused;
window.setMouseInfluence = setMouseInfluence;
