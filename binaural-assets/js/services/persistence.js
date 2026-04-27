/**
 * Persistence Service
 * Handles saving and loading user preferences to LocalStorage.
 * 
 * Keys:
 * - mindwave_prefs: Main preferences object (volumes, theme, lock state)
 */

import { state } from '../state.js';
const STORAGE_KEY = 'mindwave_prefs_v1';
const AUTOSAVE_DELAY = 1000; // 1 second debounce

let saveTimeout = null;

// Default Preferences
const DEFAULTS = {
    theme: 'sentaient', // Default to brand theme
    volumes: {
        master: 0.8,
        binaural: 0.5,
        atmos: 0.3
    },
    visuals: {
        aiLocked: false,
        speed: 1.0,
        brightness: 1.0,
        activeMode: 'particles' // Default mode
    },
    ui: {
        sidebarLeftOpen: false,
        sidebarRightOpen: false
    }
};

/**
 * Load preferences from LocalStorage and apply them to the state/engine.
 * Returns the loaded preferences object for UI synchronization.
 */
export function loadUserPreferences() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return DEFAULTS;

        const prefs = { ...DEFAULTS, ...JSON.parse(raw) };

        // 1. Apply State
        state.aiVisualsLocked = prefs.visuals.aiLocked;

        // 2. Return for UI to handle slider Application
        // (Audio engine might not be ready yet, so we return values for controls.js to apply)
        console.log('[Persistence] Loaded preferences:', prefs);
        return prefs;

    } catch (e) {
        console.error('[Persistence] Failed to load preferences:', e);
        return DEFAULTS;
    }
}

/**
 * Save current application state to LocalStorage.
 * Debounced to prevent excessive writes during slider dragging.
 */
export function saveUserPreferences() {
    if (saveTimeout) clearTimeout(saveTimeout);

    // Dynamic delay based on system performance
    const isHighLoad = state.performanceMonitor?.isSafeModeActive;
    const dynamicDelay = isHighLoad ? AUTOSAVE_DELAY * 5 : AUTOSAVE_DELAY;

    saveTimeout = setTimeout(() => {
        try {
            // Gatrer current state
            const prefs = {
                theme: document.body.dataset.theme || DEFAULTS.theme,
                volumes: {
                    master: state.masterVolume, // Assuming state tracks this or we get from sliders
                    binaural: state.binauralVolume,
                    atmos: state.atmosVolume
                },
                visuals: {
                    aiLocked: state.aiVisualsLocked,
                    speed: state.visualSpeed || 1.0,
                    brightness: state.visualBrightness || 1.0,
                    // activeMode: ... (We might need to ask visualizer for this)
                },
                ui: {
                    sidebarLeftOpen: document.getElementById('leftPanel')?.classList.contains('open') || false,
                    sidebarRightOpen: document.getElementById('rightPanel')?.classList.contains('open') || false
                }
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
            console.log('[Persistence] Saved preferences');
        } catch (e) {
            console.warn('[Persistence] Save failed:', e);
        }
    }, dynamicDelay);
}

/** 
 * AMBASSADOR & AI GENERATOR - PRO UPGRADE (Phases 2 & 3)
 */

export function renderAmbassadorDashboard() {
    const dashboard = document.getElementById('ambassadorDashboard');
    if (!dashboard) return;

    const refCount = state.referralCount || 0;
    const tiers = [
        { name: 'Silver', threshold: 1, discount: '20%', code: 'MW20OFF', icon: '🥈' },
        { name: 'Gold', threshold: 3, discount: '40%', code: 'MW40AMB', icon: '🥇' },
        { name: 'Platinum', threshold: 10, discount: '60%', code: 'MW60VIP', icon: '💎' },
        { name: 'Diamond', threshold: 25, discount: '100%', code: 'MW100LEGEND', icon: '🔥' }
    ];

    let currentTier = null;
    tiers.forEach(t => { if (refCount >= t.threshold) currentTier = t; });

    dashboard.innerHTML = `
        <div class="p-4 rounded-2xl bg-white/5 border border-white/10 mt-4 backdrop-blur-md">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xs font-bold tracking-widest text-[var(--accent)] uppercase">Ambassador Status</h3>
                <span class="text-[10px] bg-[var(--accent)]/20 text-[var(--accent)] px-2 py-0.5 rounded-full font-bold">
                    ${currentTier ? currentTier.name : 'Rookie'}
                </span>
            </div>
            
            <div class="grid grid-cols-4 gap-2 mb-4">
                ${tiers.map(t => `
                    <div class="text-center p-2 rounded-lg ${refCount >= t.threshold ? 'bg-[var(--accent)]/10 border border-[var(--accent)]/30' : 'opacity-30'}">
                        <div class="text-lg mb-1">${t.icon}</div>
                        <div class="text-[9px] font-bold">${t.name}</div>
                        <div class="text-[8px] opacity-60">${t.threshold} Ref</div>
                    </div>
                `).join('')}
            </div>

            ${currentTier ? `
                <div class="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                    <div class="text-[9px] text-green-400 font-bold mb-1">UNLOCKED: ${currentTier.discount} DISCOUNT</div>
                    <div class="text-xs font-mono font-bold tracking-widest bg-black/30 p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform" 
                         onclick="navigator.clipboard.writeText('${currentTier.code}'); showToast('Code Copied!','success')">
                        ${currentTier.code}
                    </div>
                    <div class="text-[8px] opacity-50 mt-2">Click to copy your affiliate code</div>
                </div>
            ` : `
                <div class="text-center py-4 border-2 border-dashed border-white/10 rounded-xl opacity-60">
                    <div class="text-[10px]">Invite ${tiers[0].threshold - refCount} more friends to unlock</div>
                    <div class="text-[9px] font-bold text-[var(--accent)]">20% Discount for your tribe</div>
                </div>
            `}
        </div>
    `;
}

export function renderCymaticProPatterns() {
    const viz = getVisualizer();
    if (!viz || !viz.currentCymaticData) return;

    const panel = document.getElementById('cymaticsPanel');
    if (!panel) return;

    panel.innerHTML = `
        <div class="flex items-center gap-4 bg-black/40 backdrop-blur-xl p-3 rounded-full border border-white/10 shadow-2xl">
            <button onclick="getVisualizer().prevCymatic(); renderCymaticProPatterns()" class="p-2 hover:text-[var(--accent)] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            
            <div class="text-center min-w-[140px]">
                <div class="text-[8px] tracking-[0.2em] opacity-50 font-bold uppercase">RESONANCE MODE</div>
                <div class="text-xs font-bold text-[var(--accent)]">${viz.currentCymaticData.name || 'Pattern'}</div>
                <div class="text-[9px] opacity-40 font-mono">Modal (${viz.currentCymaticData.n}, ${viz.currentCymaticData.m})</div>
            </div>

            <button onclick="getVisualizer().nextCymatic(); renderCymaticProPatterns()" class="p-2 hover:text-[var(--accent)] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
        </div>
    `;
}

window.generateAiZen = async () => {
    const input = document.getElementById('aiZenPrompt');
    if (!input || !input.value) return;

    const btn = document.getElementById('aiGenerateBtn');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="animate-spin mr-2">◌</span>Generating...';
    }

    // Enter Generation State (dropping LOD for "CPU focus")
    if (state.performanceMonitor) state.performanceMonitor.triggerSafeMode();
    showToast('AI Focus Handshake... 🧘', 'info');

    // Simulated multi-stage generation
    await new Promise(r => setTimeout(r, 1500));
    showToast('Calculating Neural Resonance... ⚡', 'info');
    await new Promise(r => setTimeout(r, 2000));
    
    // Auto-configure based on keywords
    const prompt = input.value.toLowerCase();
    if (prompt.includes('sleep') || prompt.includes('delta')) {
        setBeatFrequency(2.5); 
        setVisualMode('galaxy');
    } else if (prompt.includes('focus') || prompt.includes('work')) {
        setBeatFrequency(14.0);
        setVisualMode('matrix');
    } else {
        setBeatFrequency(7.83); // Schumann
        setVisualMode('mandala');
    }

    if (btn) {
        btn.disabled = false;
        btn.textContent = 'Generate New Flow';
    }
    
    showToast('AI Meditation Synchronized ✅', 'success');
    if (state.performanceMonitor) state.performanceMonitor.reset();
};

// Helper to manually trigger save (e.g. on button click)
export function forceSave() {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = null;
    // ... Instant save logic if needed, or just call saveUserPreferences with 0 delay copy
}
