/**
 * Mindwave Controls V3 - Restored "PERFECT" Version (March 12th Afternoon)
 * ──────────────────────────────────────────────────────────────────────────
 * FIXED:
 *  1. els.canvas now set so initVisualizer() can find the canvas element
 *  2. Visual buttons now use exclusive setVisualMode() (not a toggle)
 *  3. .active class is applied/removed immediately on click (no 2nd-click lag)
 *  4. Duplicate slider IDs resolved by always taking the first match
 */

import { state, els, THEMES } from '../state_vPERFECT.js';
import {
    updateFrequencies, updateBeatsVolume, updateMasterVolume, updateMasterBalance,
    updateAtmosMaster, updateSoundscape, startAudio, stopAudio
} from '../audio/engine.js';
import {
    setVisualMode, toggleVisual, setVisualSpeed, setVisualColor, setVisualBrightness,
    getVisualizer, pauseVisuals, resumeVisuals
} from '../visuals/visualizer_nuclear_vPERFECT.js';

// Map: button ID → { elementKey, internalMode }
// "internalMode" is what activeModes uses after mapMode() inside the visualizer
const VISUAL_BUTTON_MAP = [
    { btnId: 'sphereBtn',    elKey: 'sphereBtn',    displayMode: 'sphere',       internalMode: 'sphere'      },
    { btnId: 'cubeBtn',      elKey: 'cubeBtn',      displayMode: 'box',          internalMode: 'box'         },
    { btnId: 'dragonBtn',    elKey: 'dragonBtn',    displayMode: 'dragon',       internalMode: 'dragon'      },
    { btnId: 'galaxyBtn',    elKey: 'galaxyBtn',    displayMode: 'galaxy',       internalMode: 'galaxy'      },
    { btnId: 'flowBtn',      elKey: 'flowBtn',      displayMode: 'particles',    internalMode: 'particles'   },
    { btnId: 'lavaBtn',      elKey: 'lavaBtn',      displayMode: 'lava',         internalMode: 'lava'        },
    { btnId: 'fireplaceBtn', elKey: 'fireplaceBtn', displayMode: 'fireplace',    internalMode: 'fireplace'   },
    { btnId: 'rainBtn',      elKey: 'rainBtn',      displayMode: 'rainforest',   internalMode: 'rainforest'  },
    { btnId: 'zenBtn',       elKey: 'zenBtn',       displayMode: 'zengarden',    internalMode: 'zengarden'   },
    { btnId: 'oceanBtn',     elKey: 'oceanBtn',     displayMode: 'ocean',        internalMode: 'ocean'       },
    // PERFECT mapping: UI "Cyber" → internal 'matrix' (2D overlay)
    { btnId: 'cyberBtn',     elKey: 'cyberBtn',     displayMode: 'matrix',       internalMode: 'matrix'      },
    // PERFECT mapping: UI "Matrix" → internal 'cyber' (3D rain)
    { btnId: 'matrixBtn',    elKey: 'matrixBtn',    displayMode: 'interstellar', internalMode: 'cyber'       },
];

export function setupUI() {
    console.log('[Controls] Initializing PERFECT UI Logic...');

    // ── Canvas (CRITICAL – must be set before initVisualizer runs) ──
    els.canvas = document.getElementById('visualizer');

    // ── Sliders (always grab first match in case of duplicate IDs) ──
    els.baseSlider      = document.querySelector('#baseSlider');
    els.beatSlider      = document.querySelector('#beatSlider');
    els.volSlider       = document.querySelector('#volSlider');
    els.masterVolSlider = document.querySelector('#masterVolSlider');
    els.balanceSlider   = document.querySelector('#balanceSlider');

    // ── Value display spans ──
    els.baseValue      = document.getElementById('baseValue');
    els.beatValue      = document.getElementById('beatValue');
    els.volValue       = document.getElementById('volValue');
    els.masterVolValue = document.getElementById('masterVolValue');
    els.balanceValue   = document.getElementById('balanceValue');

    // ── Visual Dock Buttons ──
    VISUAL_BUTTON_MAP.forEach(({ btnId, elKey }) => {
        els[elKey] = document.getElementById(btnId);
    });

    // ── Misc UI ──
    els.leftPanel   = document.getElementById('leftPanel');
    els.rightPanel  = document.getElementById('rightPanel');
    els.leftToggle  = document.getElementById('leftToggle');
    els.rightToggle = document.getElementById('rightToggle');

    // ── Wire up everything ──
    setupSliderListeners();
    setupVisualListeners();
    setupGalaxyControls();
    setupPanelToggles();

    console.log('[Controls] PERFECT UI Ready');
}

// ─────────────────────────────────────────────
// SLIDERS
// ─────────────────────────────────────────────
function setupSliderListeners() {
    if (els.baseSlider) {
        els.baseSlider.addEventListener('input', () => {
            const val = parseFloat(els.baseSlider.value);
            state.baseFrequency = val;
            if (els.baseValue) els.baseValue.textContent = `${val}Hz`;
            updateFrequencies();
        });
    }

    if (els.beatSlider) {
        els.beatSlider.addEventListener('input', () => {
            const val = parseFloat(els.beatSlider.value);
            state.beatFrequency = val;
            if (els.beatValue) els.beatValue.textContent = `${val}Hz`;
            updateFrequencies();
        });
    }

    if (els.volSlider) {
        els.volSlider.addEventListener('input', () => {
            state.binauralVolume = parseFloat(els.volSlider.value);
            if (els.volValue) els.volValue.textContent = `${Math.round(state.binauralVolume * 100)}%`;
            updateBeatsVolume(state.binauralVolume);
        });
    }

    if (els.masterVolSlider) {
        els.masterVolSlider.addEventListener('input', () => {
            state.masterVolume = parseFloat(els.masterVolSlider.value);
            if (els.masterVolValue) els.masterVolValue.textContent = `${Math.round(state.masterVolume * 100)}%`;
            updateMasterVolume(state.masterVolume);
        });
    }

    if (els.balanceSlider) {
        els.balanceSlider.addEventListener('input', () => {
            state.balance = parseFloat(els.balanceSlider.value);
            if (els.balanceValue) els.balanceValue.textContent = state.balance.toFixed(2);
            updateMasterBalance(state.balance);
        });
    }
}

// ─────────────────────────────────────────────
// VISUAL BUTTONS – exclusive switch + active class
// ─────────────────────────────────────────────
function updateVisualActiveStates() {
    const viz = getVisualizer();
    VISUAL_BUTTON_MAP.forEach(({ elKey, internalMode }) => {
        const btn = els[elKey];
        if (!btn) return;
        if (viz && viz.activeModes.has(internalMode)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function setupVisualListeners() {
    VISUAL_BUTTON_MAP.forEach(({ elKey, displayMode }) => {
        const btn = els[elKey];
        if (!btn) return;

        btn.addEventListener('click', () => {
            // Switch to this mode exclusively
            setVisualMode(displayMode);
            // Immediately reflect the new state in the UI
            updateVisualActiveStates();
        });
    });
}

// ─────────────────────────────────────────────
// GALAXY SETTINGS PANEL
// ─────────────────────────────────────────────
function setupGalaxyControls() {
    const rx = document.getElementById('galaxySunRX');
    const ry = document.getElementById('galaxySunRY');
    const rz = document.getElementById('galaxySunRZ');

    const updateSun = () => {
        const viz = getVisualizer();
        if (viz && viz.activeModes.has('galaxy')) {
            if (rx) viz.sunRotationSpeedX = parseFloat(rx.value);
            if (ry) viz.sunRotationSpeedY = parseFloat(ry.value);
            if (rz) viz.sunRotationSpeedZ = parseFloat(rz.value);
        }
    };

    [rx, ry, rz].forEach(el => {
        if (el) el.addEventListener('input', updateSun);
    });
}

// ─────────────────────────────────────────────
// PANEL TOGGLES (left/right drawer)
// ─────────────────────────────────────────────
function setupPanelToggles() {
    const leftPanel  = document.getElementById('leftPanel');
    const rightPanel = document.getElementById('rightPanel');
    const leftToggle = document.getElementById('leftToggle');
    const rightToggle = document.getElementById('rightToggle');
    const closeLeft  = document.getElementById('closeLeftBtn');
    const closeRight = document.getElementById('closeRightBtn');

    const openPanel = (panel) => {
        if (panel) panel.classList.remove('-translate-x-full', 'translate-x-full');
    };
    const closePanel = (panel, dir) => {
        if (panel) panel.classList.add(dir === 'left' ? '-translate-x-full' : 'translate-x-full');
    };

    if (leftToggle && leftPanel) {
        leftToggle.addEventListener('click', () => openPanel(leftPanel));
    }
    if (rightToggle && rightPanel) {
        rightToggle.addEventListener('click', () => openPanel(rightPanel));
    }
    if (closeLeft && leftPanel) {
        closeLeft.addEventListener('click', () => closePanel(leftPanel, 'left'));
    }
    if (closeRight && rightPanel) {
        closeRight.addEventListener('click', () => closePanel(rightPanel, 'right'));
    }
}

// ─────────────────────────────────────────────
// Expose updateVisualActiveStates for external callers (e.g. presets)
// ─────────────────────────────────────────────
export { updateVisualActiveStates };
