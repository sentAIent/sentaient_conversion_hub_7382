/**
 * Interactive User Onboarding (Shepherd.js)
 * Highlights core MindWave features for first-time visitors with a Goal Selection intro.
 */

const ONBOARDING_KEY = 'mindwave_tour_completed';
const GOAL_KEY = 'mindwave_user_goal';

export function initializeOnboarding() {
    // Check if the user has already completed the tour
    if (localStorage.getItem(ONBOARDING_KEY) === 'true') {
        return;
    }

    // Delay the tour slightly to allow heavy WebGL and Audio contexts to settle
    setTimeout(() => {
        startOnboardingSequence();
    }, 2500);
}

function startOnboardingSequence() {
    if (typeof Shepherd === 'undefined') {
        console.warn('[Onboarding] Shepherd.js not loaded. Skipping tour.');
        return;
    }

    if (!localStorage.getItem(GOAL_KEY)) {
        showGoalSelection(() => {
            startTour();
        });
    } else {
        startTour();
    }
}

/**
 * Show a sleek glassmorphic goal selection modal before the tour
 */
export function showGoalSelection(callback) {
    if (document.getElementById('goalSelectionModal')) return;

    const modal = document.createElement('div');
    modal.id = 'goalSelectionModal';
    modal.className = 'fixed inset-0 flex items-center justify-center p-4';
    modal.style.cssText = `
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        animation: fadeIn 0.4s ease;
        z-index: 100000;
        pointer-events: auto;
    `;

    const goals = [
        { id: 'focus', title: 'Deep Focus', emoji: '🧠', color: '#2dd4bf', desc: 'Crush work and study sessions' },
        { id: 'sleep', title: 'Better Sleep', emoji: '🌙', color: '#818cf8', desc: 'Drift off to curated delta waves' },
        { id: 'relax', title: 'Relaxation', emoji: '🌊', color: '#38bdf8', desc: 'Reduce stress and anxiety' },
        { id: 'energy', title: 'Productivity', emoji: '⚡', color: '#fbbf24', desc: 'Boost alertness and coffee-free energy' }
    ];

    modal.innerHTML = `
        <style>
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes popIn { 
                0% { transform: scale(0.9) translateY(20px); opacity: 0; } 
                100% { transform: scale(1) translateY(0); opacity: 1; } 
            }
            .goal-btn {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 20px;
                padding: 24px 16px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                position: relative;
                overflow: hidden;
            }
            .goal-btn:hover {
                background: rgba(255, 255, 255, 0.06);
                border-color: rgba(255, 255, 255, 0.2);
                transform: translateY(-4px);
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
            }
        </style>
        <div style="
            max-width: 540px;
            width: 100%;
            background: linear-gradient(180deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.95));
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-top: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 32px;
            padding: 48px 40px;
            text-align: center;
            animation: popIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.02);
        ">
            <div style="font-size: 48px; margin-bottom: 16px; animation: popIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);">✨</div>
            <h2 style="font-size: 32px; font-weight: 800; color: white; margin-bottom: 12px; letter-spacing: -0.5px;">Personalize Your Mind</h2>
            <p style="font-size: 16px; color: #94a3b8; margin-bottom: 40px;">What brings you to MindWave today?</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px;">
                ${goals.map(g => `
                    <button class="goal-btn" data-goal="${g.id}">
                        <span style="font-size: 36px; margin-bottom: 4px;">${g.emoji}</span>
                        <span style="font-weight: 700; color: white; font-size: 15px;">${g.title}</span>
                        <span style="font-size: 12px; color: #64748b; line-height: 1.3;">${g.desc}</span>
                    </button>
                `).join('')}
            </div>

            <p style="font-size: 13px; color: #475569;">You can change this anytime in settings.</p>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelectorAll('.goal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const goal = btn.dataset.goal;
            const goalColor = goals.find(g => g.id === goal).color;
            
            localStorage.setItem(GOAL_KEY, goal);

            // Visual feedback
            btn.style.borderColor = goalColor;
            btn.style.background = `rgba(${hexToRgb(goalColor)}, 0.15)`;
            btn.style.transform = 'scale(0.98)';

            setTimeout(() => {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.remove();
                    if (callback) callback();
                }, 400);
            }, 300);
        });
    });
}

// Helper for glassmorphism color matching
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255,255,255';
}

function startTour() {
    const userGoal = localStorage.getItem(GOAL_KEY) || 'wellness';
    const capitalizedGoal = userGoal.charAt(0).toUpperCase() + userGoal.slice(1);

    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shadow-[0_0_40px_rgba(139,92,246,0.3)] bg-slate-900/90 backdrop-blur-xl border border-purple-500/30 text-white rounded-2xl p-6 font-sans',
            scrollTo: true,
            cancelIcon: {
                enabled: true
            }
        }
    });

    // Custom glowing button classes
    const btnSecondary = 'text-purple-400 hover:text-purple-300 px-4 py-2 text-sm transition-colors uppercase tracking-wider text-[12px] font-semibold';
    const btnPrimary = 'bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] font-bold tracking-wide transform hover:-translate-y-0.5 active:translate-y-0';

    tour.addStep({
        id: 'step-mixer',
        text: `<b>Welcome to MindWave! 🧠</b><br><br>We've optimized your studio for <strong>${capitalizedGoal}</strong>.<br><br>This is your Audio Mixer. Here you can blend Binaural Beats with soothing atmospheres like Heavy Rain or Brown Noise.`,
        attachTo: {
            element: '#leftSidebar',
            on: 'right'
        },
        buttons: [
            { text: 'Skip', action: tour.cancel, classes: btnSecondary },
            { text: 'Next', action: tour.next, classes: btnPrimary }
        ]
    });

    tour.addStep({
        id: 'step-visualizer',
        text: `<b>Interactive Visuals 🎨</b><br><br>Need a different vibe? Click here to open the Visuals Gallery. The background reacts in real-time to the audio frequencies you select!`,
        attachTo: {
            element: '#themeBtn',
            on: 'left'
        },
        buttons: [
            { text: 'Back', action: tour.back, classes: btnSecondary },
            { text: 'Next', action: tour.next, classes: btnPrimary }
        ]
    });

    tour.addStep({
        id: 'step-pomodoro',
        text: `<b>Deep Work Engine ⏱️</b><br><br>When you're ready, set your intent and hit Play. We'll automatically guide your brainwaves through cycles of <strong>${capitalizedGoal}</strong>. Good luck!`,
        attachTo: {
            element: '#playControlsContainer',
            on: 'top'
        },
        buttons: [
            { text: 'Finish', action: tour.complete, classes: btnPrimary }
        ]
    });

    tour.on('complete', () => {
        localStorage.setItem(ONBOARDING_KEY, 'true');
    });
    tour.on('cancel', () => {
        localStorage.setItem(ONBOARDING_KEY, 'true');
    });

    tour.start();
}
