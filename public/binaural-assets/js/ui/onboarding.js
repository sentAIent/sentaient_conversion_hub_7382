const ONBOARDING_KEY = 'mindwave_onboarding_complete_v5';

// --- Z-INDEX STANDARDS ---
const Z_OVERLAY = 2100000;
const Z_ELEVATED = 2100010;
const Z_TOOLTIP = 2100020;
const Z_HIGHLIGHT = 2100030;
const Z_MODAL = 2110000;

// --- DEEP DIVE CONTENT (Unchanged) ---
const DEEP_DIVE_CONTENT = {
    'modes': `
        <h3 class="text-xl font-bold text-[var(--accent)] mb-4">Understanding Audio Modes</h3>
        <div class="space-y-4 text-sm text-slate-300">
            <p>MindWave offers three distinct entrainment methods:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong class="text-white">Binaural Beats:</strong> Requires headphones. Distinct frequencies are played in each ear, and your brain creates the "beat" from the difference. Best for deep meditation.</li>
                <li><strong class="text-white">Isochronic Tones:</strong> Regular pulses of sound. Works through speakers. The most effective method for quick entrainment.</li>
                <li><strong class="text-white">Monaural Beats:</strong> Two frequencies mixed before reaching the ear. Combining the benefits of both, works well on speakers.</li>
            </ul>
        </div>
    `,
    'presets': `
        <h3 class="text-xl font-bold text-[var(--accent)] mb-4">Brainwave Frequencies</h3>
        <div class="space-y-4 text-sm text-slate-300">
            <p>Our presets are tuned to specific mental states:</p>
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-white/5 p-2 rounded">
                    <div class="text-[var(--accent)] font-bold">Delta (0.5-4Hz)</div>
                    <div class="text-xs">Deep sleep, healing, detachment from awareness.</div>
                </div>
                <div class="bg-white/5 p-2 rounded">
                    <div class="text-[var(--accent)] font-bold">Theta (4-8Hz)</div>
                    <div class="text-xs">Meditation, intuition, memory, REM sleep.</div>
                </div>
                <div class="bg-white/5 p-2 rounded">
                    <div class="text-[var(--accent)] font-bold">Alpha (8-14Hz)</div>
                    <div class="text-xs">Relaxation, visualization, creativity.</div>
                </div>
                <div class="bg-white/5 p-2 rounded">
                    <div class="text-[var(--accent)] font-bold">Beta (14-30Hz)</div>
                    <div class="text-xs">Focus, alertness, cognition, problem solving.</div>
                </div>
            </div>
        </div>
    `,
    'matrix': `
        <h3 class="text-xl font-bold text-[var(--accent)] mb-4">The Matrix Visualizer</h3>
        <div class="space-y-4 text-sm text-slate-300">
            <p>Enter the digital realm with our customizable Matrix rain.</p>
            <p>Click the <strong>Gear Icon</strong> inside the Matrix mode to access:</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Custom Message:</strong> Type your own mantras or affirmations to rain down.</li>
                <li><strong>Rainbow Mode:</strong> Cycle through colors dynamically.</li>
                <li><strong>Speed & Density:</strong> Control the intensity of the visual flow.</li>
            </ul>
            <p class="text-xs text-slate-400 mt-2">Check '3D Mode' for an immersive perspective shift.</p>
        </div>
    `,
    'mixer': `
        <h3 class="text-xl font-bold text-[var(--accent)] mb-4">DJ Studio Mixer</h3>
        <div class="space-y-4 text-sm text-slate-300">
            <p>Become the architect of your soundscape.</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong class="text-blue-400">Drops:</strong> Atmospheric swells and impacts.</li>
                <li><strong class="text-yellow-400">Texture:</strong> Constant background layers like rain, vinyl crackle, or space drone.</li>
                <li><strong class="text-red-400">Pulse:</strong> Rhythmic elements to drive focus.</li>
            </ul>
            <p>Click the <strong>Sequencer</strong> icon on any pad to create rhythmic loops!</p>
        </div>
    `
};

const TUTORIAL_STEPS = [
    {
        id: 'welcome',
        title: '✨ Welcome to MindWave',
        description: 'Your personal neuro-audio studio. Let\'s get you set up in seconds.',
        target: null,
        position: 'center'
    },
    {
        id: 'modes',
        title: '🎧 Audio Technology',
        description: 'Choose your entrainment method. Binaural requires headphones, while Isochronic works great on speakers.',
        target: '#modeToggle',
        position: 'bottom',
        readMoreId: 'modes'
    },
    {
        id: 'presets',
        title: '🌊 Frequency Presets',
        description: 'Slide open the left panel to access curated states like "Deep Sleep" or "Laser Focus".',
        target: '#leftToggle',
        fallbacks: ['#leftPanel', '#mobilePresetsBtn'],
        fallbackDescription: 'Explore curated states like "Deep Sleep" or "Laser Focus" in the Presets panel.',
        position: 'right',
        readMoreId: 'presets',
        action: () => {
            const panel = document.getElementById('leftPanel');
            if (panel && panel.classList.contains('-translate-x-full')) {
                if (window.toggleLeftPanel) window.toggleLeftPanel();
                else panel.classList.remove('-translate-x-full');
            }
        }
    },
    {
        id: 'mixer',
        title: '🎛️ DJ Mixer & Soundscapes',
        description: 'Open the right panel to layer rain, drones, and rhythms over your binaural beat.',
        target: '#rightToggle',
        fallbacks: ['#rightPanel', '#mobileMixerBtn'],
        fallbackDescription: 'Layer rain, drones, and rhythms over your binaural beat using the Soundscape mixer.',
        position: 'left',
        readMoreId: 'mixer',
        action: () => {
            const right = document.getElementById('rightPanel');
            if (right && right.classList.contains('translate-x-full')) {
                if (window.toggleRightPanel) window.toggleRightPanel();
                else right.classList.remove('translate-x-full');
            }
        }
    },
    {
        id: 'matrix',
        title: '🔮 The Matrix',
        description: 'Select "Matrix" from the bottom dock. Use the Gear icon to customize text and colors.',
        target: '#matrixSettingsPanel',
        fallbacks: ['#matrixBtn'],
        fallbackDescription: 'Explore the Matrix visualizer. Use the Gear icon to customize text and colors.',
        position: 'top',
        readMoreId: 'matrix',
        action: () => {
            if (window.toggleMatrixSettings) {
                const panel = document.getElementById('matrixSettingsPanel');
                if (panel && panel.classList.contains('hidden')) window.toggleMatrixSettings();
            }
        }
    },
    {
        id: 'timer',
        title: '⏱️ Session Timer',
        description: 'Set a duration for your session. The audio will gently fade out when time is up.',
        target: '#durationSelector',
        position: 'top'
    },
    {
        id: 'download',
        title: '💎 Go Pro',
        description: 'Get the downloadable app for offline use and source code access.',
        target: '#downloadAppBtn',
        position: 'right',
        action: () => {
            const panel = document.getElementById('leftPanel');
            if (panel) {
                panel.classList.remove('-translate-x-full');
                const btn = document.getElementById('downloadAppBtn');
                if (btn) {
                    btn.classList.remove('hidden');
                    btn.style.display = 'flex';
                }
            }
        }
    },
    {
        id: 'start',
        title: '🚀 Ready to Elevate?',
        description: 'Put on your headphones and press Play. Your journey begins now.',
        target: '#playBtn',
        position: 'top'
    }
];

let currentStep = 0;
let activeSteps = [...TUTORIAL_STEPS];
let onboardingOverlay = null;
let onboardingHighlight = null;
let onboardingTooltip = null;
let deepDiveModal = null;
let trackingId = null;

// --- CSS STYLES INJECTION ---
const styleId = 'onboarding-styles';
if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        @keyframes border-pulse {
            0% { box-shadow: 0 0 0 0px rgba(45, 212, 191, 0.7); border-color: rgba(45, 212, 191, 1); }
            50% { box-shadow: 0 0 0 10px rgba(45, 212, 191, 0); border-color: rgba(45, 212, 191, 0.5); }
            100% { box-shadow: 0 0 0 0px rgba(45, 212, 191, 0); border-color: rgba(45, 212, 191, 1); }
        }
        .highlight-box {
            position: fixed;
            z-index: ${Z_HIGHLIGHT} !important;
            pointer-events: none;
            border: 4px solid #2dd4bf; /* Forced contrast */
            border-radius: 8px;
            animation: border-pulse 2s infinite;
            display: none;
            box-sizing: border-box;
            mix-blend-mode: normal; /* Ensure it's not blended away */
        }
        .tooltip-stationary {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: ${Z_TOOLTIP} !important;
            width: 280px !important;
            min-height: 200px !important;
            display: flex !important;
            flex-direction: column !important;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

export function shouldShowOnboarding() {
    return localStorage.getItem(ONBOARDING_KEY) !== 'true';
}

export function markOnboardingComplete() {
    localStorage.setItem(ONBOARDING_KEY, 'true');
}

export function startOnboarding(force = false, userIntent = null) {
    if (!force && !shouldShowOnboarding()) return;
    activeSteps = (userIntent === 'sleep') ? TUTORIAL_STEPS.filter(s => s.id !== 'mixer') : [...TUTORIAL_STEPS];
    currentStep = 0;
    createOnboardingUI();
    showStep(currentStep);
}

window.startOnboarding = () => startOnboarding(true);

function createOnboardingUI() {
    if (document.getElementById('onboardingOverlay')) return;

    onboardingOverlay = document.createElement('div');
    onboardingOverlay.id = 'onboardingOverlay';
    onboardingOverlay.className = 'fixed inset-0 bg-black/40 transition-opacity duration-300 opacity-0';
    onboardingOverlay.style.zIndex = Z_OVERLAY;

    onboardingHighlight = document.createElement('div');
    onboardingHighlight.id = 'onboardingHighlight';
    onboardingHighlight.className = 'highlight-box';

    onboardingTooltip = document.createElement('div');
    onboardingTooltip.id = 'onboardingTooltip';
    onboardingTooltip.className = 'tooltip-stationary pointer-events-auto';

    onboardingTooltip.innerHTML = `
        <div class="flex-1 relative bg-[#0f172a] border border-[var(--accent)] text-white p-5 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col pointer-events-auto">
            <!-- Modern Close X Button -->
            <button id="onboardingClose" class="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors p-1" title="Close Tutorial">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <div class="flex justify-between items-start mb-3 pr-6">
                <h3 id="onboardingTitle" class="text-base font-bold text-[var(--accent)] leading-tight"></h3>
                <span id="onboardingCounter" class="text-[9px] text-slate-500 font-mono mt-0.5"></span>
            </div>
            <p id="onboardingDesc" class="text-xs text-slate-200 leading-relaxed mb-5 flex-1 font-medium"></p>
            <div class="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                <button id="onboardingPrev" class="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 cursor-pointer">Back</button>
                <div class="flex gap-2">
                     <button id="onboardingReadMore" class="hidden text-[10px] text-[var(--accent)] border border-[var(--accent)] px-2 py-1 rounded hover:bg-[var(--accent)] hover:text-black transition-colors font-bold">Learn More</button>
                    <button id="onboardingNext" class="text-xs font-bold bg-[var(--accent)] text-black px-4 py-1.5 rounded-lg hover:brightness-110 shadow-[0_0_15px_rgba(45,212,191,0.3)] min-w-[70px]">Next</button>
                </div>
            </div>
            <button id="onboardingSkip" class="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-white/50 hover:text-white py-2">Skip Tutorial</button>
        </div>
    `;

    document.body.appendChild(onboardingOverlay);
    document.body.appendChild(onboardingHighlight);
    document.body.appendChild(onboardingTooltip);

    requestAnimationFrame(() => {
        onboardingOverlay.classList.remove('opacity-0');
        onboardingTooltip.style.opacity = '1';
    });

    document.getElementById('onboardingPrev').onclick = () => prevStep();
    document.getElementById('onboardingNext').onclick = () => nextStep();
    document.getElementById('onboardingSkip').onclick = () => endOnboarding();
    document.getElementById('onboardingClose').onclick = () => endOnboarding();
    document.getElementById('onboardingReadMore').onclick = () => {
        const step = activeSteps[currentStep];
        if (step.readMoreId) showDeepDive(step.readMoreId);
    };
}

function prevStep() { if (currentStep > 0) { currentStep--; showStep(currentStep); } }
function nextStep() { if (currentStep < activeSteps.length - 1) { currentStep++; showStep(currentStep); } else { endOnboarding(); } }

let elevatedElements = [];
function restoreElevation() {
    console.log('[Onboarding] Restoring elevation for:', elevatedElements.length, 'elements');
    elevatedElements.forEach(item => {
        item.el.style.zIndex = item.origIndex;
        item.el.style.position = item.origPos;
    });
    elevatedElements = [];
}

function elevateTargetParent(target) {
    restoreElevation(); // Clean previous
    let current = target;
    while (current && current !== document.body) {
        const style = getComputedStyle(current);
        if (style.position === 'fixed' || style.position === 'absolute' || style.position === 'sticky') {
            console.log('[Onboarding] Elevating parent container:', current.tagName, current.id || current.className, 'Current Z:', style.zIndex);
            elevatedElements.push({
                el: current,
                origIndex: current.style.zIndex,
                origPos: current.style.position
            });
            current.style.zIndex = Z_ELEVATED; // Standardized high z-index
            break;
        }
        current = current.parentElement;
    }
}

function detectVisibleTarget(step) {
    if (!step.target) return null;
    const primary = document.querySelector(step.target);
    if (primary && getComputedStyle(primary).display !== 'none' && primary.getBoundingClientRect().width > 0) {
        return primary;
    }

    if (step.fallbacks) {
        for (const selector of step.fallbacks) {
            const fallback = document.querySelector(selector);
            if (fallback && getComputedStyle(fallback).display !== 'none' && fallback.getBoundingClientRect().width > 0) {
                return fallback;
            }
        }
    }
    return primary; // Return primary even if hidden as a last resort for logging
}

function startTracking(step) {
    if (trackingId) cancelAnimationFrame(trackingId);
    let framesThisStep = 0;

    function tick() {
        if (!onboardingHighlight || currentStep < 0) return;
        const currentStepData = activeSteps[currentStep];
        const target = detectVisibleTarget(currentStepData);
        const highlight = onboardingHighlight;

        framesThisStep++;

        if (target) {
            if (framesThisStep === 1) elevateTargetParent(target);

            const rect = target.getBoundingClientRect();
            const style = getComputedStyle(target);

            // Logging for debugging
            if ((currentStepData.id === 'presets' || currentStepData.id === 'mixer') && (framesThisStep < 5 || framesThisStep % 60 === 0)) {
                console.log(`[Onboarding Debug] Step: ${currentStepData.id}, Target: ${currentStepData.target}, Visible: ${style.display !== 'none'}, Rect:`, rect);
            }

            if (style.display !== 'none' && rect.width > 0) {
                const padding = (currentStepData.id === 'matrix') ? 14 : 8;
                highlight.style.display = 'block';
                highlight.style.zIndex = Z_HIGHLIGHT;
                highlight.style.left = (rect.left - padding) + 'px';
                highlight.style.top = (rect.top - padding) + 'px';
                highlight.style.width = (rect.width + padding * 2) + 'px';
                highlight.style.height = (rect.height + padding * 2) + 'px';
                highlight.style.opacity = '1';

                // Sidebar scroll helper
                const sidebar = target.closest('#leftPanel, #rightPanel');
                if (sidebar) {
                    const scrollContainer = sidebar.querySelector('.overflow-y-auto') || sidebar;
                    if (scrollContainer && Math.abs(scrollContainer.scrollTop - (target.offsetTop - scrollContainer.clientHeight / 2)) > 50) {
                        scrollContainer.scrollTo({ top: target.offsetTop - scrollContainer.clientHeight / 2, behavior: 'instant' });
                    }
                }
            } else {
                highlight.style.display = 'none';
            }
        } else {
            highlight.style.display = 'none';
        }
        trackingId = requestAnimationFrame(tick);
    }
    trackingId = requestAnimationFrame(tick);
}

function getElementPath(el) {
    let path = [];
    while (el && el.nodeType === Node.ELEMENT_NODE) {
        let selector = el.nodeName.toLowerCase();
        if (el.id) selector += '#' + el.id;
        else if (el.className) selector += '.' + el.className.split(' ').join('.');
        path.unshift(selector);
        el = el.parentNode;
    }
    return path.join(' > ');
}

async function showStep(index) {
    const step = activeSteps[index];
    if (!step) return;

    console.log('[Onboarding] Showing step index:', index, 'ID:', step.id);

    const overlay = onboardingOverlay;
    const tooltip = onboardingTooltip;
    if (!overlay || !tooltip) return;

    // Detect if we should use fallback description
    const target = detectVisibleTarget(step);
    const isPrimaryVisible = target && target === document.querySelector(step.target);
    const description = (isPrimaryVisible || !step.fallbackDescription) ? step.description : step.fallbackDescription;

    // Update content
    tooltip.querySelector('#onboardingTitle').innerText = step.title;
    tooltip.querySelector('#onboardingDesc').innerText = description;
    tooltip.querySelector('#onboardingCounter').innerText = `Step ${index + 1} of ${activeSteps.length}`;

    // Hide Back button on first step
    const prevBtn = tooltip.querySelector('#onboardingPrev');
    if (prevBtn) prevBtn.style.visibility = (index === 0) ? 'hidden' : 'visible';

    // Force footer visibility for specific steps
    if (['presets', 'mixer', 'matrix'].includes(step.id)) {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.opacity = '1';
            footer.style.visibility = 'visible';
            footer.style.display = 'flex';
        }
    }

    overlay.style.opacity = '1';
    tooltip.style.opacity = '1';

    if (step.action) step.action();
    startTracking(step);
}

function endOnboarding() {
    if (trackingId) cancelAnimationFrame(trackingId);
    restoreElevation();
    markOnboardingComplete();
    if (onboardingOverlay) { onboardingOverlay.remove(); onboardingOverlay = null; }
    if (onboardingHighlight) { onboardingHighlight.remove(); onboardingHighlight = null; }
    if (onboardingTooltip) { onboardingTooltip.remove(); onboardingTooltip = null; }
}

function showDeepDive(contentId) {
    if (deepDiveModal) deepDiveModal.remove();
    const content = DEEP_DIVE_CONTENT[contentId];
    if (!content) return;
    deepDiveModal = document.createElement('div');
    deepDiveModal.style.zIndex = Z_MODAL;
    deepDiveModal.className = 'fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-md p-4';
    deepDiveModal.innerHTML = `
        <div class="bg-[#0f172a] border border-[var(--accent)] max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-xl p-8 shadow-2xl relative" onclick="event.stopPropagation()">
            <button class="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors" onclick="this.closest('.fixed').remove()">
                <svg width="24" height="24" viewBox="0 0 24" height="24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div class="prose prose-invert max-w-none text-slate-300">${content}</div>
        </div>
    `;
    deepDiveModal.onclick = (e) => { if (e.target === deepDiveModal) deepDiveModal.remove(); };
    document.body.appendChild(deepDiveModal);
}
