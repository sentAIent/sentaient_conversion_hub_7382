/**
 * Comprehensive Product Walkthrough
 * An interactive, stateful tutorial panel for MindWave users.
 */

const STORAGE_KEY = 'mindwave_tutorial_progress';

const STEPS = [
    {
        id: 'welcome',
        title: 'Welcome to MindWave',
        description: 'Discover the power of cognitive entrainment.',
        details: 'MindWave uses binaural beats and interactive visualizers to help you focus, relax, or sleep. This tutorial will show you the ropes.',
        target: null,
        onEnter: () => {},
        onLeave: () => {}
    },
    {
        id: 'audio-mixer',
        title: 'Finding Your Frequency',
        description: 'Mix binaural beats with ambient background noise.',
        details: 'Select a target brainwave state (like Gamma for focus or Delta for sleep) and blend it with natural background sounds to create your perfect soundscape.',
        target: '#leftSidebar',
        onEnter: () => {
            if (window.switchLeftTab) window.switchLeftTab('audio');
        },
        onLeave: () => {}
    },
    {
        id: 'visual-feedback',
        title: 'Sensory Feedback',
        description: 'Immerse yourself in reactive visuals.',
        details: 'MindWave is highly visual. You can open the gallery to select from different themes, ranging from cosmic galaxies to cyberpunk cities. The visuals react to the audio you play!',
        target: '#themeBtn',
        onEnter: () => {},
        onLeave: () => {}
    },
    {
        id: 'deep-work',
        title: 'The Deep Work Engine',
        description: 'Use the built-in Pomodoro timer.',
        details: 'When you are ready to focus, set your intent and hit Play. MindWave will automatically guide you through 25-minute focus blocks and 5-minute rest periods, adjusting the audio appropriately.',
        target: '#playControlsContainer',
        onEnter: () => {},
        onLeave: () => {}
    },
    {
        id: 'cloud-sync',
        title: 'Saving Your Sessions',
        description: 'Access your favorite mixes anywhere.',
        details: 'If you create a combination of sounds and visuals you love, log in and save it to the cloud. You can recall it anytime from the library.',
        target: '#libraryBtn', // Assuming this button exists, or similar
        onEnter: () => {},
        onLeave: () => {}
    }
];

class TutorialWalkthrough {
    constructor() {
        this.completedSteps = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        this.activeStep = null;
        this.isOpen = false;
        
        this.injectUI();
        this.bindEvents();
    }

    injectUI() {
        // Prevent double injection
        if (document.getElementById('mindwave-tutorial-panel')) return;

        const container = document.createElement('div');
        container.innerHTML = `
            <div id="tutorial-backdrop" class="tutorial-backdrop"></div>
            <div id="mindwave-tutorial-panel" class="tutorial-panel">
                <div class="tutorial-header">
                    <h2 class="tutorial-title">MindWave Guide</h2>
                    <button class="tutorial-close-btn" id="tutorial-close-btn">&times;</button>
                </div>
                
                <div class="tutorial-toc" id="tutorial-toc">
                    ${STEPS.map((step, index) => `
                        <div class="tutorial-step ${this.completedSteps.includes(step.id) ? 'completed' : ''}" data-step-id="${step.id}">
                            <div class="step-icon">${index + 1}</div>
                            <div class="step-content">
                                <h4>${step.title}</h4>
                                <p>${step.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="tutorial-details" id="tutorial-details">
                    <h3 id="tutorial-detail-title"></h3>
                    <p id="tutorial-detail-text"></p>
                    <div class="tutorial-actions">
                        <button class="tutorial-btn secondary" id="tutorial-mark-done">Mark as Read</button>
                        <button class="tutorial-btn" id="tutorial-next-btn">Next</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(container);

        this.panel = document.getElementById('mindwave-tutorial-panel');
        this.backdrop = document.getElementById('tutorial-backdrop');
        this.toc = document.getElementById('tutorial-toc');
        this.detailsPanel = document.getElementById('tutorial-details');
    }

    bindEvents() {
        document.getElementById('tutorial-close-btn').addEventListener('click', () => this.close());
        this.backdrop.addEventListener('click', () => this.close());

        // TOC clicks
        const stepEls = this.toc.querySelectorAll('.tutorial-step');
        stepEls.forEach(el => {
            el.addEventListener('click', (e) => {
                const stepId = e.currentTarget.getAttribute('data-step-id');
                this.activateStep(stepId);
            });
        });

        // Details actions
        document.getElementById('tutorial-mark-done').addEventListener('click', () => {
            if (this.activeStep) this.markCompleted(this.activeStep.id);
        });

        document.getElementById('tutorial-next-btn').addEventListener('click', () => {
            if (this.activeStep) {
                this.markCompleted(this.activeStep.id);
                const currentIndex = STEPS.findIndex(s => s.id === this.activeStep.id);
                if (currentIndex < STEPS.length - 1) {
                    this.activateStep(STEPS[currentIndex + 1].id);
                } else {
                    this.close();
                }
            }
        });
        
        // Ensure UI buttons that trigger tutorial are hooked up
        const triggerBtns = document.querySelectorAll('#tutorialBtn, .tutorial-trigger');
        triggerBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.open();
            });
        });
    }

    open() {
        this.isOpen = true;
        this.panel.classList.add('open');
        this.backdrop.classList.add('active');
        
        // Auto-activate first uncompleted step, or just the first step
        if (!this.activeStep) {
            const firstUncompleted = STEPS.find(s => !this.completedSteps.includes(s.id)) || STEPS[0];
            this.activateStep(firstUncompleted.id);
        } else {
            // Re-trigger the active step to ensure UI is highlighted
            this.activateStep(this.activeStep.id);
        }
    }

    close() {
        this.isOpen = false;
        this.panel.classList.remove('open');
        this.backdrop.classList.remove('active');
        this.clearHighlight();
        if (this.activeStep && this.activeStep.onLeave) {
            this.activeStep.onLeave();
        }
    }

    activateStep(stepId) {
        if (this.activeStep && this.activeStep.onLeave) {
            this.activeStep.onLeave();
        }

        const step = STEPS.find(s => s.id === stepId);
        if (!step) return;

        this.activeStep = step;

        // Update TOC UI
        const stepEls = this.toc.querySelectorAll('.tutorial-step');
        stepEls.forEach(el => el.classList.remove('active'));
        const activeEl = this.toc.querySelector(`[data-step-id="${stepId}"]`);
        if (activeEl) activeEl.classList.add('active');

        // Populate details
        document.getElementById('tutorial-detail-title').textContent = step.title;
        document.getElementById('tutorial-detail-text').innerHTML = step.details;
        this.detailsPanel.classList.add('active');

        // Execute step actions
        if (step.onEnter) step.onEnter();
        this.highlightElement(step.target);
    }

    markCompleted(stepId) {
        if (!this.completedSteps.includes(stepId)) {
            this.completedSteps.push(stepId);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.completedSteps));
            
            // Update UI
            const el = this.toc.querySelector(`[data-step-id="${stepId}"]`);
            if (el) el.classList.add('completed');
        }
    }

    highlightElement(selector) {
        this.clearHighlight();
        if (!selector) return;

        const el = document.querySelector(selector);
        if (el) {
            el.classList.add('tutorial-highlight');
            // Ensure the element is somewhat visible (scroll if needed)
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    clearHighlight() {
        const highlighted = document.querySelectorAll('.tutorial-highlight');
        highlighted.forEach(el => el.classList.remove('tutorial-highlight'));
    }
}

// Initialize on load
export function initTutorial(force = false) {
    if (!window.mindwaveTutorial) {
        window.mindwaveTutorial = new TutorialWalkthrough();
    }
    
    // Auto-open if never started or if forced via button click
    const progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (force) {
        window.mindwaveTutorial.open();
    } else if (progress.length === 0) {
        setTimeout(() => {
            window.mindwaveTutorial.open();
        }, 2000);
    }
}

// To allow existing inline onclick handlers like `startOnboarding()` to work
window.startOnboarding = function() {
    if (window.mindwaveTutorial) {
        window.mindwaveTutorial.open();
    }
};
