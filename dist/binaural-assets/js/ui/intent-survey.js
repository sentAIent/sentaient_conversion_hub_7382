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
    modal.className = 'fixed inset-0 z-[10010] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-[fade-in_0.3s_ease]';

    modal.innerHTML = `
        <style>
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scale-up { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            .intent-card:hover { border-color: var(--accent); background: rgba(255,255,255,0.05); }
        </style>
        
        <div class="max-w-xl w-full text-center animate-[scale-up_0.4s_ease]">
            <h2 class="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">What is your focus today?</h2>
            <p class="text-slate-400 mb-10">We'll personalize your session based on your goal.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button class="intent-card group glass-panel p-8 rounded-2xl border-2 border-white/5 transition-all text-center" data-intent="focus">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
                    <div class="text-lg font-bold text-white mb-1">Deep Focus</div>
                    <div class="text-[10px] uppercase font-bold text-teal-400 tracking-widest">Productivity</div>
                </button>
                
                <button class="intent-card group glass-panel p-8 rounded-2xl border-2 border-white/5 transition-all text-center" data-intent="sleep">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">🌙</div>
                    <div class="text-lg font-bold text-white mb-1">Deep Sleep</div>
                    <div class="text-[10px] uppercase font-bold text-indigo-400 tracking-widest">Recovery</div>
                </button>
                
                <button class="intent-card group glass-panel p-8 rounded-2xl border-2 border-white/5 transition-all text-center" data-intent="relax">
                    <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">🌿</div>
                    <div class="text-lg font-bold text-white mb-1">Relaxation</div>
                    <div class="text-[10px] uppercase font-bold text-emerald-400 tracking-widest">Anti-Anxiety</div>
                </button>
            </div>
            
            <button id="skipIntent" class="mt-8 text-xs text-slate-500 hover:text-white transition-colors">I just want to explore</button>
        </div>
    `;

    document.body.appendChild(modal);

    // Event Listeners
    modal.querySelectorAll('.intent-card').forEach(card => {
        card.onclick = () => selectIntent(card.dataset.intent, onComplete);
    });

    document.getElementById('skipIntent').onclick = () => selectIntent('explore', onComplete);
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
