/**
 * Visualizer Lazy Loader
 * Defers loading of Three.js (1.2MB) until first visual interaction
 */

let visualizerModule = null;
let loadPromise = null;
let viz3D = null;

// Placeholder functions that queue actions until module loads
const pendingActions = [];

/**
 * Load the visualizer module on demand
 */
async function loadVisualizerModule() {
    if (visualizerModule) return visualizerModule;

    if (loadPromise) return loadPromise;

    console.log('[LazyViz] Loading visualizer module...');
    const startTime = performance.now();

    loadPromise = import('./visualizer_nuclear_v4.js?v=MATRIX_FIX_V13').then(module => {
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
    if (!visualizerModule) return null;
    return visualizerModule.getVisualizer();
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
export function setVisualColor(color) {
    if (!visualizerModule) {
        pendingActions.push(() => visualizerModule.setVisualColor(color));
        return;
    }
    return visualizerModule.setVisualColor(color);
}

/**
 * Pause visuals
 */
export function pauseVisuals() {
    if (!visualizerModule) return;
    return visualizerModule.pauseVisuals();
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
 */
export function preloadVisualizer() {
    requestIdleCallback ? requestIdleCallback(() => loadVisualizerModule())
        : setTimeout(loadVisualizerModule, 2000);
}
