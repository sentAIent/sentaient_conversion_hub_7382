/**
 * Mindwave Engine Smoke Test (V1.0)
 * ─────────────────────────────────────────────────────────────────────────────
 * Run this in the browser console to verify the visualizer's state.
 */

window.verifyEngine = () => {
    console.group('%c MINDWAVE SMOKE TEST ', 'background: #0f172a; color: #2dd4bf; font-weight: bold; padding: 4px;');
    
    // 1. Core Check
    const viz = window.getVisualizer ? window.getVisualizer() : null;
    if (!viz) {
        console.error('❌ CRITICAL: Visualizer instance not found.');
        return;
    }
    console.log('✅ Visualizer3D Instance: Found');

    // 2. State Check
    if (viz.initialized) {
        console.log('✅ Initialization: Complete');
    } else {
        console.warn('⚠️ Initialization: Pending...');
    }

    // 3. Render Loop Check
    const lastRender = viz.lastFrameRenderTime;
    setTimeout(() => {
        if (viz.lastFrameRenderTime > lastRender) {
            console.log('✅ Render Loop: Oscillating (Active)');
        } else {
            console.error('❌ Render Loop: STALLED.');
        }
    }, 100);

    // 4. Mode Mapping Check
    const activeModes = Array.from(viz.activeModes || []);
    console.log('ℹ️ Active Modes:', activeModes.length > 0 ? activeModes.join(', ') : 'None');

    // 5. DOM Binding Check
    const criticalButtons = ['cymaticsBtn', 'oceanBtn', 'snowflakeBtn'];
    criticalButtons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            console.log(`✅ DOM Binding: #${id} found`);
        } else {
            console.error(`❌ DOM Binding: #${id} MISSING.`);
        }
    });

    // 6. Version Verify
    console.log(`ℹ️ Main Version: ${window.NUCLEAR_MAIN_LOADED || 'Unknown'}`);
    
    console.groupEnd();
    return "TEST COMPLETE";
};
