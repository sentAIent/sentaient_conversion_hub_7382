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
        title: 'Frequencies & Presets',
        description: 'Binaural beats, Solfeggio & Organ frequencies.',
        details: 'Explore brainwave states (Gamma, Theta, Delta), Solfeggio tones, or Organ & Body Resonance presets. Blend with natural ambient soundscapes.',
        target: '#leftSidebar, #leftToggle',
        onEnter: () => {
            if (window.switchLeftTab) window.switchLeftTab('beats');
        },
        onLeave: () => {}
    },
    {
        id: 'visual-feedback',
        title: 'Cymatics & Themes',
        description: 'Immerse in reactive visualizers.',
        details: 'MindWave is deeply multimodal. Click Theme to select from interactive 3D particle simulations, cymatics, galaxies, and generative soundscape scenes.',
        target: '#themeBtn',
        onEnter: () => {},
        onLeave: () => {}
    },
    {
        id: 'deep-work',
        title: 'Session & Playback',
        description: 'Control frequency entrainment playback.',
        details: 'Hit Play to launch your entrainment session. Adjust binaural pitch, beat frequencies, and monitor your session progress in real time.',
        target: '#playBtn',
        onEnter: () => {},
        onLeave: () => {}
    },
    {
        id: 'cloud-sync',
        title: 'Saving & Favorites',
        description: 'Access your favorite scenes anywhere.',
        details: 'Save your custom frequency blends and ambient visual pairings to the cloud with one click. Recall them anytime from the Favs tab or Account.',
        target: '#profileBtn, [onclick*="favorites"]',
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
                <div class="tutorial-sheet-handle" id="tutorial-sheet-handle" aria-hidden="true"></div>
                <div class="tutorial-header">
                    <div class="tutorial-header-left">
                        <h2 class="tutorial-title">MindWave Guide</h2>
                        <span class="tutorial-step-indicator" id="tutorial-step-indicator">Step 1 of 5</span>
                    </div>
                    <button class="tutorial-close-btn" id="tutorial-close-btn" aria-label="Close Guide">&times;</button>
                </div>
                
                <div class="tutorial-progress-track">
                    <div class="tutorial-progress-fill" id="tutorial-progress-fill"></div>
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
                        <button class="tutorial-btn secondary" id="tutorial-prev-btn" style="display:none;">Back</button>
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
        this.stepIndicator = document.getElementById('tutorial-step-indicator');
        this.progressFill = document.getElementById('tutorial-progress-fill');
        this.prevBtn = document.getElementById('tutorial-prev-btn');
        this.nextBtn = document.getElementById('tutorial-next-btn');
    }

    bindEvents() {
        document.getElementById('tutorial-close-btn').addEventListener('click', () => this.close());
        this.backdrop.addEventListener('click', () => this.close());

        // Dynamic Window Resize & Orientation Handling
        this.resizeDebounceTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeDebounceTimer);
            this.resizeDebounceTimer = setTimeout(() => this.handleResize(), 80);
        }, { passive: true });

        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleResize(), 150);
        }, { passive: true });

        // Keyboard ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Mobile Bottom-Sheet Touch Swipe to Dismiss
        const handle = document.getElementById('tutorial-sheet-handle');
        const header = this.panel.querySelector('.tutorial-header');
        const touchTargets = [handle, header].filter(Boolean);

        let startY = 0;
        let currentY = 0;
        touchTargets.forEach(el => {
            el.addEventListener('touchstart', (e) => {
                if (window.innerWidth <= 768 && e.touches.length === 1) {
                    startY = e.touches[0].clientY;
                    currentY = startY;
                }
            }, { passive: true });

            el.addEventListener('touchmove', (e) => {
                if (window.innerWidth <= 768 && startY > 0) {
                    currentY = e.touches[0].clientY;
                    const diff = currentY - startY;
                    if (diff > 0) {
                        this.panel.style.transform = `translateY(${diff}px)`;
                    }
                }
            }, { passive: true });

            el.addEventListener('touchend', () => {
                if (window.innerWidth <= 768 && startY > 0) {
                    const diff = currentY - startY;
                    this.panel.style.transform = '';
                    if (diff > 80) {
                        this.close();
                    }
                    startY = 0;
                    currentY = 0;
                }
            }, { passive: true });
        });

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

        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                if (this.activeStep) {
                    const currentIndex = STEPS.findIndex(s => s.id === this.activeStep.id);
                    if (currentIndex > 0) {
                        this.activateStep(STEPS[currentIndex - 1].id);
                    }
                }
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
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
        }
        
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

    handleResize() {
        if (!this.panel) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isMobile = width <= 768;
        const isShortHeight = height < 650;

        this.panel.classList.toggle('is-mobile', isMobile);
        this.panel.classList.toggle('is-short-height', isShortHeight);

        // Keep highlighted target visible without being covered by responsive panel
        if (this.isOpen && this.activeStep?.target) {
            this.highlightElement(this.activeStep.target);
        }
    }

    open() {
        this.isOpen = true;
        this.handleResize();
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
        const currentIndex = STEPS.findIndex(s => s.id === stepId);

        // Update progress & step indicator
        if (this.stepIndicator) {
            this.stepIndicator.textContent = `Step ${currentIndex + 1} of ${STEPS.length}`;
        }
        if (this.progressFill) {
            const percent = ((currentIndex + 1) / STEPS.length) * 100;
            this.progressFill.style.width = `${percent}%`;
        }
        if (this.prevBtn) {
            this.prevBtn.style.display = currentIndex > 0 ? 'inline-flex' : 'none';
        }
        if (this.nextBtn) {
            this.nextBtn.textContent = currentIndex === STEPS.length - 1 ? 'Finish' : 'Next';
        }

        // Update TOC UI
        const stepEls = this.toc.querySelectorAll('.tutorial-step');
        stepEls.forEach(el => el.classList.remove('active'));
        const activeEl = this.toc.querySelector(`[data-step-id="${stepId}"]`);
        if (activeEl) {
            activeEl.classList.add('active');
            if (window.innerWidth <= 768) {
                activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }

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

        let el = null;
        const parts = selector.split(',').map(s => s.trim());
        for (const sel of parts) {
            const found = document.querySelector(sel);
            if (found && found.offsetParent !== null) {
                el = found;
                break;
            } else if (found && !el) {
                el = found;
            }
        }

        if (el) {
            el.classList.add('tutorial-highlight');
            // Dynamically scroll so target is visible on desktop or mobile bottom sheet
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
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
