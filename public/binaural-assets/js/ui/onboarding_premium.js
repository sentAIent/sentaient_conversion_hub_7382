// MindWave Premium Tour - Powered by Driver.js
// "Tesla-Style" Cinematic Onboarding
// Dependencies: Driver.js (window.driver.js.driver)

const ONBOARDING_KEY = 'mindwave_tour_v1_premium';

export function shouldShowOnboarding() {
    return localStorage.getItem(ONBOARDING_KEY) !== 'true';
}

export function markOnboardingComplete() {
    localStorage.setItem(ONBOARDING_KEY, 'true');
}

export function startOnboarding(force = false) {
    if (!force && !shouldShowOnboarding()) return;

    const driverObj = window.driver.js.driver({
        showProgress: true,
        animate: true,
        allowClose: true,
        overlayColor: 'rgba(0, 0, 0, 0.85)', // Deep cinematic dark
        theme: {
            color: '#2dd4bf', // Teal accent
        },
        popoverClass: 'driverjs-theme-premium', // Custom class for glassmorphism
        steps: [
            {
                element: '#nothing', // Center modal
                popover: {
                    title: '<span class="text-xl">✨ Welcome to MindWave</span>',
                    description: 'Your personal neuro-audio studio. <br><br>Experience a fusion of <strong>Binaural Beats</strong>, <strong>Isochronic Tones</strong>, and immersive visuals.<br><br>Let\'s take a quick tour.',
                    side: 'center',
                    align: 'center'
                }
            },
            {
                element: '#modeToggle',
                popover: {
                    title: 'Entrainment Modes',
                    description: 'Choose your method:<br>• <strong>Binaural</strong> (Headphones required)<br>• <strong>Isochronic</strong> (Speaker friendly)<br>• <strong>Monaural</strong> (Hybrid)',
                    side: 'bottom',
                    align: 'center'
                }
            },
            {
                element: '#leftToggle',
                popover: {
                    title: 'Frequency Presets',
                    description: 'Slide open the <strong>Left Panel</strong> to access curated brainwave states like <em>Deep Sleep</em>, <em>Focus</em>, and <em>Meditation</em>.',
                    side: 'right',
                    align: 'center',
                    onHighlightStarted: () => {
                        // Ensure panel is closed so we can point to the toggle
                        const panel = document.getElementById('leftPanel');
                        if (panel && !panel.classList.contains('-translate-x-full')) panel.classList.add('-translate-x-full');
                    }
                }
            },
            {
                element: '#rightToggle',
                popover: {
                    title: 'DJ Mixer',
                    description: 'Open the <strong>Right Panel</strong> to layer atmospheric sounds like Rain, Vinyl Crackle, and Rhythmic Pulses over your session.',
                    side: 'left',
                    align: 'center',
                    onHighlightStarted: () => {
                        const panel = document.getElementById('rightPanel');
                        if (panel && !panel.classList.contains('translate-x-full')) panel.classList.add('translate-x-full');
                    }
                }
            },
            {
                element: '.visual-dock', // Bottom dock
                popover: {
                    title: 'Visual Matrix',
                    description: 'Select <strong>Matrix</strong> or <strong>Flow</strong> modes for visual immersion. <br>Use the <strong>Gear Icon</strong> (when active) to customize colors and text.',
                    side: 'top',
                    align: 'center'
                }
            },
            {
                element: '#playBtn',
                popover: {
                    title: 'Ready to Launch?',
                    description: 'Put on your headphones. Set your intention.<br><strong>Press Play</strong> to begin your journey.',
                    side: 'top',
                    align: 'center'
                }
            }
        ],
        onDestroyStarted: () => {
            if (!driverObj.hasNextStep() || confirm('Skip the tour?')) {
                markOnboardingComplete();
                driverObj.destroy();
            }
        },
    });

    driverObj.drive();
}

// Make globally available for button clicks
window.startOnboarding = () => startOnboarding(true);
