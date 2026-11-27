/**
 * MindWave Global ErrorBoundary & Telemetry Guard (2026 SOTA)
 * Catches unhandled runtime exceptions and rejected promises,
 * preventing blank-screen crashes and presenting an accessible recovery card.
 */

class ErrorBoundaryService {
    constructor() {
        this.errorLogsKey = 'mindwave_crash_telemetry';
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized || typeof window === 'undefined') return;

        window.addEventListener('error', (event) => {
            this.handleError({
                type: 'uncaught_error',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error?.stack
            });
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                type: 'unhandled_promise_rejection',
                message: event.reason?.message || String(event.reason),
                stack: event.reason?.stack
            });
        });

        this.isInitialized = true;
    }

    handleError(errorInfo) {
        console.error('[ErrorBoundary] Caught crash:', errorInfo);
        this.logCrash(errorInfo);

        // If the error occurred in main DOM and broke rendering, show recovery prompt
        if (document.body && !document.getElementById('mwErrorRecoveryModal')) {
            // Only trigger recovery UI for fatal initialization/rendering errors
            if (document.body.children.length === 0 || errorInfo.message.includes('fatal')) {
                this.renderRecoveryUI(errorInfo);
            }
        }
    }

    logCrash(errorInfo) {
        try {
            const logs = JSON.parse(localStorage.getItem(this.errorLogsKey) || '[]');
            logs.unshift({ ...errorInfo, timestamp: new Date().toISOString() });
            localStorage.setItem(this.errorLogsKey, JSON.stringify(logs.slice(0, 20)));
        } catch (e) {}
    }

    renderRecoveryUI(errorInfo) {
        const div = document.createElement('div');
        div.id = 'mwErrorRecoveryModal';
        div.className = 'fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-slate-950 text-white';
        div.innerHTML = `
            <div class="max-w-md w-full bg-slate-900 border border-white/10 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div class="w-12 h-12 mx-auto rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
                    MW
                </div>
                <h3 class="text-lg font-bold text-white">MindWave Recovered Gracefully</h3>
                <p class="text-xs text-white/60">An unexpected background module issue was intercepted. Your saved soundscapes and data are safe.</p>
                <div class="flex gap-2 pt-2">
                    <button onclick="localStorage.removeItem('mindwave_custom_preset_current'); window.location.reload();" 
                        class="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all">
                        Reset Audio & Reload
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(div);
    }
}

export const errorBoundary = new ErrorBoundaryService();
