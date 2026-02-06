// MindWave Onboarding Tutorial - Interactive & Deep Dive Enabled
// Updated for V4 Features: Matrix, DJ Mixer, Pricing

const ONBOARDING_KEY = 'mindwave_onboarding_complete_v4';

// --- DEEP DIVE CONTENT ---
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
        position: 'right',
        readMoreId: 'presets',
        action: () => {
            const panel = document.getElementById('leftPanel');
            // Ensure panel is OPEN
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
        position: 'left',
        readMoreId: 'mixer',
        action: () => {
            // Close left, Open right
            const left = document.getElementById('leftPanel');
            if (left) left.classList.add('-translate-x-full');

            const right = document.getElementById('rightPanel');
            if (right && right.classList.contains('translate-x-full')) {
                if (window.toggleRightPanel) window.toggleRightPanel();
                else right.classList.remove('translate-x-full');
            }
        }
    },
    {
        id: 'matrix',
        title: '🔮 Matrix Visuals',
        description: 'Select "Matrix" from the bottom dock. Use the Gear icon to customize text and colors.',
        target: '.visual-dock', // Targeting the dock generally
        position: 'top',
        readMoreId: 'matrix',
        action: () => {
            // Close right panel
            const right = document.getElementById('rightPanel');
            if (right) right.classList.add('translate-x-full');

            // Ensure dock is visible if possible
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
        position: 'right', // Sidebar is usually on left, so tooltip on right
        action: () => {
            // Open left panel again to show the button
            const panel = document.getElementById('leftPanel');
            if (panel && panel.classList.contains('-translate-x-full')) {
                panel.classList.remove('-translate-x-full');
            }
        }
    },
    {
        id: 'start',
        title: '🚀 Ready to Elevate?',
        description: 'Put on your headphones and press Play. Your journey begins now.',
        target: '#playBtn',
        position: 'top',
        action: () => {
            // Close all panels
            const left = document.getElementById('leftPanel');
            if (left) left.classList.add('-translate-x-full');
            const right = document.getElementById('rightPanel');
            if (right) right.classList.add('translate-x-full');
        }
    }
];

let currentStep = 0;
let onboardingOverlay = null;
let onboardingHighlight = null;
let deepDiveModal = null;

export function shouldShowOnboarding() {
    return localStorage.getItem(ONBOARDING_KEY) !== 'true';
}

export function markOnboardingComplete() {
    localStorage.setItem(ONBOARDING_KEY, 'true');
}

export function startOnboarding(force = false) {
    if (!force && !shouldShowOnboarding()) return;

    currentStep = 0;
    createOnboardingUI();
    showStep(currentStep);
}

// Global expose
window.startOnboarding = () => startOnboarding(true);

function createOnboardingUI() {
    if (document.getElementById('onboardingOverlay')) return; // Already exists

    // Overlay
    onboardingOverlay = document.createElement('div');
    onboardingOverlay.id = 'onboardingOverlay';
    onboardingOverlay.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 opacity-0';

    // Tooltip Card
    const tooltip = document.createElement('div');
    tooltip.className = 'glass-card border border-white/10 p-6 rounded-2xl max-w-sm w-full mx-4 shadow-2xl transform transition-all duration-300';
    tooltip.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <h3 id="onboardingTitle" class="text-xl font-bold text-white leading-tight"></h3>
            <span id="onboardingCounter" class="text-[10px] bg-white/10 px-2 py-1 rounded-full text-[var(--text-muted)] font-mono">1/${TUTORIAL_STEPS.length}</span>
        </div>
        
        <p id="onboardingDesc" class="text-sm text-slate-300 mb-6 leading-relaxed min-h-[60px]"></p>
        
        <div class="flex flex-col gap-3">
            <div class="flex justify-between items-center bg-black/20 p-1 rounded-xl">
                <button id="onboardingPrev" class="px-3 py-2 text-xs text-[var(--text-muted)] hover:text-white transition-colors">
                    Back
                </button>
                
                <div id="onboardingDots" class="flex gap-1"></div>
                
                <button id="onboardingNext" class="px-4 py-2 bg-[var(--accent)] text-[var(--bg-main)] text-xs font-bold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-[var(--accent)]/20">
                    Next
                </button>
            </div>
            
            <div class="flex justify-between items-center text-[10px] text-[var(--text-muted)] px-1">
                 <button id="onboardingReadMore" class="hover:text-[var(--accent)] transition-colors flex items-center gap-1 hidden">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    Read More
                 </button>
                 <button id="onboardingSkip" class="hover:text-white transition-colors">Skip Tutorial</button>
            </div>
        </div>
    `;

    onboardingOverlay.appendChild(tooltip);
    document.body.appendChild(onboardingOverlay);

    // Event Listeners
    document.getElementById('onboardingPrev').onclick = () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    };

    document.getElementById('onboardingNext').onclick = () => {
        if (currentStep < TUTORIAL_STEPS.length - 1) {
            currentStep++;
            showStep(currentStep);
        } else {
            endOnboarding();
        }
    };

    document.getElementById('onboardingSkip').onclick = endOnboarding;

    document.getElementById('onboardingReadMore').onclick = () => {
        const step = TUTORIAL_STEPS[currentStep];
        if (step && step.readMoreId) {
            showDeepDive(step.readMoreId);
        }
    };

    // Fade In
    requestAnimationFrame(() => onboardingOverlay.classList.remove('opacity-0'));
}

function showStep(index) {
    const step = TUTORIAL_STEPS[index];
    if (!step) return;

    // 1. Run Action (Open panels etc)
    if (step.action) step.action();

    // 2. Update Content
    const titleEl = document.getElementById('onboardingTitle');
    const descEl = document.getElementById('onboardingDesc');
    const countEl = document.getElementById('onboardingCounter');
    const nextBtn = document.getElementById('onboardingNext');
    const prevBtn = document.getElementById('onboardingPrev');
    const readMoreBtn = document.getElementById('onboardingReadMore');

    titleEl.textContent = step.title;
    descEl.textContent = step.description;
    countEl.textContent = `${index + 1}/${TUTORIAL_STEPS.length}`;

    nextBtn.textContent = index === TUTORIAL_STEPS.length - 1 ? 'Start' : 'Next';
    prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';

    // 3. Update Dots
    const dotsContainer = document.getElementById('onboardingDots');
    dotsContainer.innerHTML = TUTORIAL_STEPS.map((_, i) => `
        <div class="w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === index ? 'bg-[var(--accent)]' : 'bg-white/10'}"></div>
    `).join('');

    // 4. Read More Toggle
    if (step.readMoreId && DEEP_DIVE_CONTENT[step.readMoreId]) {
        readMoreBtn.classList.remove('hidden');
    } else {
        readMoreBtn.classList.add('hidden');
    }

    // 5. Highlight Target
    updateHighlight(step.target);
}

function updateHighlight(selector) {
    if (onboardingHighlight) {
        onboardingHighlight.remove();
        onboardingHighlight = null;
    }

    if (!selector) return;

    setTimeout(() => {
        const el = document.querySelector(selector);
        if (el) {
            const rect = el.getBoundingClientRect();
            onboardingHighlight = document.createElement('div');
            onboardingHighlight.className = 'fixed z-[9998] pointer-events-none border-2 border-[var(--accent)] rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] transition-all duration-300';
            onboardingHighlight.style.left = (rect.left - 4) + 'px';
            onboardingHighlight.style.top = (rect.top - 4) + 'px';
            onboardingHighlight.style.width = (rect.width + 8) + 'px';
            onboardingHighlight.style.height = (rect.height + 8) + 'px';
            onboardingHighlight.style.boxShadow = '0 0 0 9999px rgba(0,0,0,0.7), 0 0 20px var(--accent-glow)';

            document.body.appendChild(onboardingHighlight);
        }
    }, 300); // Wait for potential panel transitions
}

function endOnboarding() {
    markOnboardingComplete();
    if (onboardingOverlay) {
        onboardingOverlay.classList.add('opacity-0');
        setTimeout(() => onboardingOverlay.remove(), 300);
        onboardingOverlay = null;
    }
    if (onboardingHighlight) {
        onboardingHighlight.remove();
        onboardingHighlight = null;
    }
}

// --- DEEP DIVE MODAL ---
function showDeepDive(contentId) {
    if (deepDiveModal) deepDiveModal.remove();

    const content = DEEP_DIVE_CONTENT[contentId];
    if (!content) return;

    deepDiveModal = document.createElement('div');
    deepDiveModal.className = 'fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-[fade-in_0.2s]';
    deepDiveModal.innerHTML = `
        <div class="glass-card max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-3xl p-8 shadow-2xl relative border border-[var(--accent)]/20" onclick="event.stopPropagation()">
            <button class="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors" onclick="this.closest('.fixed').remove()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            
            <div class="prose prose-invert max-w-none">
                ${content}
            </div>
            
            <div class="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button class="px-6 py-2 bg-[var(--accent)] text-[var(--bg-main)] font-bold rounded-xl hover:opacity-90 transition-opacity" onclick="this.closest('.fixed').remove()">
                    Got it
                </button>
            </div>
        </div>
    `;

    // Close on backdrop click
    deepDiveModal.onclick = (e) => {
        if (e.target === deepDiveModal) deepDiveModal.remove();
    };

    document.body.appendChild(deepDiveModal);
}
