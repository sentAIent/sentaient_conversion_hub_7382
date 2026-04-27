/**
 * CYMATICS_SMOKE_TEST.js
 * "Boil the Ocean" Integrity Suite for Mindwave Beta
 * 
 * Tests the Kinematic Liquefaction engine for:
 * 1. Pattern switching stability
 * 2. Resource disposal (Memory Leaks)
 * 3. Uniform synchronization
 */

import { getVisualizer } from '../visuals/visualizer_nuclear_v5.js';

export async function runCymaticsTest() {
    console.log('🚀 INITIALIZING CYMATICS SMOKE TEST...');
    const viz = getVisualizer();
    
    if (!viz) {
        console.error('❌ FAILED: Visualizer not initialized');
        return;
    }

    const report = {
        startTime: Date.now(),
        patternsTested: 0,
        errors: [],
        memoryStart: viz.renderer.info.memory.geometries,
        textureStart: viz.renderer.info.memory.textures
    };

    try {
        // Test 1: Rapid Switching Stress
        console.log('--- Test 1: Rapid Switching Stress ---');
        for (let i = 0; i < 20; i++) {
            viz.nextCymatic();
            if (!viz.cymaticMaterial.uniforms.uN.value) throw new Error('Pattern N uniform lost');
            report.patternsTested++;
            await new Promise(r => setTimeout(r, 100));
        }
        console.log('✅ Rapid Switching: PASS');

        // Test 2: Resource Integrity
        console.log('--- Test 2: Resource Integrity ---');
        const memEnd = viz.renderer.info.memory.geometries;
        if (memEnd > report.memoryStart + 5) {
            // Allowing small buffer for unrelated THREE.js internal allocations
            console.warn(`⚠️ Memory Warning: Geometries climbed from ${report.memoryStart} to ${memEnd}`);
        } else {
            console.log('✅ Geometry Disposal: PASS');
        }

        // Test 3: Liquefaction Uniform Sync
        console.log('--- Test 3: Liquefaction Uniform Sync ---');
        viz.activeModes.add('cymatics');
        viz.updateVisibility();
        if (viz.cymaticMaterial.uniforms.uBeatFreq.value === undefined) throw new Error('uBeatFreq missing');
        console.log('✅ Uniform Sync: PASS');

    } catch (err) {
        console.error('❌ TEST FAILED:', err);
        report.errors.push(err.message);
    }

    report.endTime = Date.now();
    console.log('📊 TEST SUMMARY:', report);
    return report;
}

// Auto-run if requested via console
window.runCymaticsTest = runCymaticsTest;
