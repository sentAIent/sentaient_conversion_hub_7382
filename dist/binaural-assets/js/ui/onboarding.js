/**
 * Interactive User Onboarding (Shepherd.js)
 * Highlights core MindWave features for first-time visitors.
 */

const ONBOARDING_KEY = 'mindwave_tour_completed';

export function initializeOnboarding() {
    // Check if the user has already completed the tour
    if (localStorage.getItem(ONBOARDING_KEY) === 'true') {
        return;
    }

    // Delay the tour slightly to allow heavy WebGL and Audio contexts to settle
    setTimeout(() => {
        startTour();
    }, 2500);
}

function startTour() {
    if (typeof Shepherd === 'undefined') {
        console.warn('[Onboarding] Shepherd.js not loaded. Skipping tour.');
        return;
    }

    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shadow-[0_0_30px_rgba(6,182,212,0.2)] bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-50 rounded-xl p-5 font-sans',
            scrollTo: true,
            cancelIcon: {
                enabled: true
            }
        }
    });

    // Step 1: The Audio Mixer (Left Sidebar)
    tour.addStep({
        id: 'step-mixer',
        text: `<b>Welcome to MindWave! 🧠</b><br><br>This is your Audio Mixer. Here you can blend Binaural Beats (Focus/Sleep frequencies) with soothing atmospheres like Heavy Rain or Brown Noise.`,
        attachTo: {
            element: '.md\\:flex.w-80', // The left sidebar container
            on: 'right'
        },
        buttons: [
            {
                text: 'Skip',
                action: tour.cancel,
                classes: 'text-cyan-500/60 hover:text-cyan-300 px-4 py-2 text-sm transition-colors uppercase tracking-wider text-[11px]'
            },
            {
                text: 'Next',
                action: tour.next,
                classes: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/40 px-4 py-2 rounded-lg text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] font-bold tracking-wider'
            }
        ]
    });

    // Step 2: The Visualizer Background (Right Controls)
    tour.addStep({
        id: 'step-visualizer',
        text: `<b>Interactive Visuals 🎨</b><br><br>Need a different vibe? Click here to open the Visuals Gallery. The background reacts in real-time to the audio frequencies you select!`,
        attachTo: {
            element: '#themeBtn',
            on: 'left'
        },
        buttons: [
            {
                text: 'Back',
                action: tour.back,
                classes: 'text-cyan-500/60 hover:text-cyan-300 px-4 py-2 text-sm transition-colors uppercase tracking-wider text-[11px]'
            },
            {
                text: 'Next',
                action: tour.next,
                classes: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/40 px-4 py-2 rounded-lg text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] font-bold tracking-wider'
            }
        ]
    });

    // Step 3: The Pomodoro Engine (Bottom Center)
    tour.addStep({
        id: 'step-pomodoro',
        text: `<b>Deep Work Engine ⏱️</b><br><br>When you're ready to focus, set your intent and hit Play. We'll automatically guide your brainwaves through 25-minute Deep Focus cycles and 5-minute Rest periods. Good luck!`,
        attachTo: {
            element: '#playControlsContainer',
            on: 'top'
        },
        buttons: [
            {
                text: 'Finish',
                action: tour.complete,
                classes: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/40 px-4 py-2 rounded-lg text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] font-bold tracking-wider'
            }
        ]
    });

    // Mark as completed when the tour finishes or is dismissed
    tour.on('complete', () => {
        localStorage.setItem(ONBOARDING_KEY, 'true');
        console.log('[Onboarding] Tour completed.');
    });
    tour.on('cancel', () => {
        localStorage.setItem(ONBOARDING_KEY, 'true');
        console.log('[Onboarding] Tour dismissed.');
    });

    tour.start();
}
