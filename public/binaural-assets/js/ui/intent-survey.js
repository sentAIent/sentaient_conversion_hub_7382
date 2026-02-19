/**
 * Intent Survey UI
 * Captures user goal (Focus, Sleep, Relax) to personalize the experience.
 */

const INTENT_KEY = 'mindwave_user_intent';

export function initIntentSurvey(onComplete) {
    // Don't show if already completed
    if (localStorage.getItem(INTENT_KEY)) {
        if (onComplete) onComplete(localStorage.getItem(INTENT_KEY));
        return;
    }

    createSurveyUI(onComplete);
}

function createSurveyUI(onComplete) {
    const modal = document.createElement('div');
    modal.id = 'intentSurveyModal';
    // Use an massive z-index to stay on top of all other elements (loading screen is 99999)
    modal.className = 'fixed inset-0 z-[2000000] flex items-center justify-center animate-[fade-in_0.3s_ease] bg-transparent pointer-events-none';
    modal.style.zIndex = '2000000';

    modal.innerHTML = `
        <style>
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scale-up { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            .intent-card:hover { border-color: var(--accent) !important; background: rgba(255,255,255,0.1) !important; transform: translateY(-2px); }
            .survey-popup {
                background: rgba(15, 23, 42, 0.9);
                backdrop-filter: blur(40px) saturate(160%);
                -webkit-backdrop-filter: blur(40px) saturate(160%);
                border: 2px solid rgba(255,255,255,0.2);
                box-shadow: 0 60px 120px -30px rgba(0,0,0,0.9), 0 0 50px rgba(var(--accent-rgb, 45, 212, 191), 0.15);
                overflow-y: auto;
                pointer-events: auto !important;
                transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
            }
            .intent-card { cursor: pointer !important; pointer-events: auto !important; }
            .survey-popup::-webkit-scrollbar { width: 4px; }
            .survey-popup::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        </style>
        
        <div class="survey-popup max-w-2xl w-full text-center py-16 px-8 md:px-14 rounded-[2.5rem] animate-[scale-up_0.5s_cubic-bezier(0.16, 1, 0.3, 1)]">
            <h2 class="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">What is your focus?</h2>
            <p class="text-slate-400 mb-8 text-base md:text-lg font-medium">Personalize your sessions</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 w-full">
                <button class="intent-card group glass-card p-6 md:p-8 rounded-2xl border-2 border-white/10 transition-all text-center flex flex-col items-center justify-center bg-white/5" data-intent="focus">
                    <div class="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
                    <div class="text-lg font-bold text-white mb-1">Focus</div>
                    <div class="text-[10px] uppercase font-black text-teal-400 tracking-widest">Productivity</div>
                </button>
                
                <button class="intent-card group glass-card p-6 md:p-8 rounded-2xl border-2 border-white/10 transition-all text-center flex flex-col items-center justify-center bg-white/5" data-intent="sleep">
                    <div class="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform">🌙</div>
                    <div class="text-lg font-bold text-white mb-1">Sleep</div>
                    <div class="text-[10px] uppercase font-black text-indigo-400 tracking-widest">Recovery</div>
                </button>
                
                <button class="intent-card group glass-card p-6 md:p-8 rounded-2xl border-2 border-white/10 transition-all text-center flex flex-col items-center justify-center bg-white/5" data-intent="relax">
                    <div class="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform">🌿</div>
                    <div class="text-lg font-bold text-white mb-1">Relax</div>
                    <div class="text-[10px] uppercase font-black text-emerald-400 tracking-widest">Anxiety</div>
                </button>
            </div>
            
            <button id="skipIntent" class="mt-8 text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-[0.4em] pointer-events-auto cursor-pointer">I just want to explore</button>
        </div>
    `;

    document.body.appendChild(modal);

    const popup = modal.querySelector('.survey-popup');

    // Initial position
    updatePopupPosition(popup);

    // Dynamic Positioning Handlers
    const onResize = () => updatePopupPosition(popup);
    window.addEventListener('resize', onResize);
    window.addEventListener('mindwave:layout-change', onResize);

    // Event Listeners for buttons
    modal.querySelectorAll('.intent-card').forEach(card => {
        card.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('[Intent Survey] Clicked Intent:', card.dataset.intent);
            cleanup(onResize);
            selectIntent(card.dataset.intent, onComplete);
        };
    });

    const skipBtn = document.getElementById('skipIntent');
    if (skipBtn) {
        skipBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('[Intent Survey] Clicked Skip');
            cleanup(onResize);
            selectIntent('explore', onComplete);
        };
    }
}

function cleanup(resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
    window.removeEventListener('mindwave:layout-change', resizeHandler);
}

function updatePopupPosition(popup) {
    if (!popup) return;

    // 1. Detect Elements
    const header = document.querySelector('header');
    const footer = document.querySelector('#bottomControlBar');
    const leftPanel = document.getElementById('leftPanel');
    const rightPanel = document.getElementById('rightPanel');

    // 2. Get Safe Margins
    const topMargin = header ? header.offsetHeight + 20 : 40;
    const bottomMargin = footer ? footer.offsetHeight + 20 : 40;

    // Check panel visibility (usually controlled by transforms)
    const isLeftOpen = leftPanel && !leftPanel.classList.contains('-translate-x-full');
    const isRightOpen = rightPanel && !rightPanel.classList.contains('translate-x-full');

    const leftMargin = isLeftOpen ? leftPanel.offsetWidth + 20 : 20;
    const rightMargin = isRightOpen ? rightPanel.offsetWidth + 20 : 20;

    // 3. Calculate Available Space
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const availableWidth = screenWidth - leftMargin - rightMargin;
    const availableHeight = screenHeight - topMargin - bottomMargin;

    // 4. Apply Constraints
    popup.style.maxWidth = `${Math.min(availableWidth - 40, 700)}px`;
    popup.style.maxHeight = `${availableHeight - 40}px`;

    // 5. Explicit Positioning
    // We use translate to center it in the "Safe Zone"
    const centerX = leftMargin + (availableWidth / 2);
    const centerY = topMargin + (availableHeight / 2);

    // Since container is full-screen flex items-center justify-center, we just shift it
    const offsetX = centerX - (screenWidth / 2);
    const offsetY = centerY - (screenHeight / 2);

    popup.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    // Scale content for very small screens
    const scaleFactor = Math.min(1, availableHeight / 600, availableWidth / 500);
    if (scaleFactor < 0.9) {
        popup.style.fontSize = `${scaleFactor * 100}%`;
    } else {
        popup.style.fontSize = '';
    }
}

function selectIntent(intent, onComplete) {
    localStorage.setItem(INTENT_KEY, intent);

    const modal = document.getElementById('intentSurveyModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            if (onComplete) onComplete(intent);
        }, 300);
    }
}
