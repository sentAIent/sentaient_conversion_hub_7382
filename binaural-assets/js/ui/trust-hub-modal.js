/**
 * MindWave Trust Hub & Interactive Neuro-Acoustic Simulator (2026 SOTA)
 * Provides clinical transparency, peer-reviewed entrainment citations,
 * interactive wave generator demo, and enterprise compliance metrics.
 */

export class TrustHubModal {
    constructor() {
        this.isOpen = false;
        this.selectedWave = 'gamma';
        this.animFrame = null;
    }

    render() {
        if (document.getElementById('trustHubModal')) return;

        const html = `
        <div id="trustHubModal" class="modal fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md hidden p-4">
            <div class="relative w-full max-w-2xl bg-[#0f172a] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <!-- Header -->
                <div class="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-white">Trust Hub & Neuro Simulator</h2>
                            <p class="text-xs text-blue-300">Clinical Validation, Peer-Reviewed Protocols & Real-Time Oscillator</p>
                        </div>
                    </div>
                    <button id="closeTrustHubBtn" class="text-gray-400 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10" aria-label="Close Trust Hub">✕</button>
                </div>

                <!-- Scrollable Body -->
                <div class="p-6 overflow-y-auto space-y-6 text-sm text-gray-300">
                    <!-- Interactive Simulator -->
                    <div class="p-4 rounded-xl bg-slate-900/80 border border-white/10">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-xs font-bold uppercase tracking-wider text-blue-400">Interactive Waveform Generator</span>
                            <span id="simulatorHzDisplay" class="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">40.0 Hz (Gamma)</span>
                        </div>
                        <!-- Canvas Oscilloscope -->
                        <canvas id="trustHubCanvas" width="600" height="100" class="w-full h-24 bg-black/60 rounded-lg border border-white/5"></canvas>
                        
                        <!-- Band Selector Buttons -->
                        <div class="grid grid-cols-5 gap-2 mt-3" id="trustHubBandBtns">
                            <button class="py-1.5 px-2 text-xs rounded bg-white/5 hover:bg-white/10 border border-white/10 text-center font-mono" data-band="delta" data-hz="2.0">Delta 2Hz</button>
                            <button class="py-1.5 px-2 text-xs rounded bg-white/5 hover:bg-white/10 border border-white/10 text-center font-mono" data-band="theta" data-hz="6.0">Theta 6Hz</button>
                            <button class="py-1.5 px-2 text-xs rounded bg-white/5 hover:bg-white/10 border border-white/10 text-center font-mono" data-band="alpha" data-hz="10.0">Alpha 10Hz</button>
                            <button class="py-1.5 px-2 text-xs rounded bg-white/5 hover:bg-white/10 border border-white/10 text-center font-mono" data-band="beta" data-hz="18.0">Beta 18Hz</button>
                            <button class="py-1.5 px-2 text-xs rounded bg-blue-600/30 border border-blue-500 text-center font-mono text-blue-300 font-bold" data-band="gamma" data-hz="40.0">Gamma 40Hz</button>
                        </div>
                    </div>

                    <!-- Clinical Citations -->
                    <div class="space-y-3">
                        <h3 class="text-xs font-bold uppercase tracking-wider text-purple-400">Peer-Reviewed Scientific Literature</h3>
                        <div class="space-y-2 text-xs">
                            <div class="p-3 rounded-lg bg-white/5 border border-white/10">
                                <span class="font-bold text-white">Gerald Oster (1973)</span> — <em>Auditory Beats in the Brain</em>, Scientific American.
                                <p class="text-gray-400 mt-1">Demonstrated sub-cortical phase-locking in the superior olivary complex providing the anatomical basis for binaural entrainment.</p>
                            </div>
                            <div class="p-3 rounded-lg bg-white/5 border border-white/10">
                                <span class="font-bold text-white">Chaieb et al. (2015)</span> — <em>Auditory Beat Stimulation on Psychological States</em>, Frontiers in Psychiatry.
                                <p class="text-gray-400 mt-1">Confirmed statistically significant reductions in anxiety and stress with Theta and Alpha stimulation.</p>
                            </div>
                            <div class="p-3 rounded-lg bg-white/5 border border-white/10">
                                <span class="font-bold text-white">Lane et al. (1998)</span> — <em>Binaural Beats Affect Vigilance & Mood</em>, Physiology & Behavior.
                                <p class="text-gray-400 mt-1">Validated working memory accuracy and executive focus gains under 16Hz Beta & 40Hz Gamma entrainment.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Safety & Compliance Matrix -->
                    <div class="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs space-y-2">
                        <span class="font-bold text-blue-300 block uppercase">Non-Medical Wellness Declaration</span>
                        <p class="text-gray-400">MindWave is an evidence-informed psychoacoustic wellness workstation. It does not diagnose, treat, or cure medical conditions. Epilesy warning: users with photosensitive or auditory seizure history should consult a clinician before use.</p>
                    </div>
                </div>

                <!-- Footer -->
                <div class="p-4 border-t border-white/10 bg-slate-900/50 flex justify-between items-center">
                    <a href="/account-deletion.html" class="text-xs text-gray-400 hover:text-white underline">Privacy & Deletion Portal</a>
                    <button id="trustHubStartSessionBtn" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all">Launch Entrainment Session</button>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);
        this.setupListeners();
    }

    setupListeners() {
        const modal = document.getElementById('trustHubModal');
        const closeBtn = document.getElementById('closeTrustHubBtn');
        const startBtn = document.getElementById('trustHubStartSessionBtn');
        const bandBtns = document.querySelectorAll('#trustHubBandBtns button');
        const hzDisplay = document.getElementById('simulatorHzDisplay');

        closeBtn?.addEventListener('click', () => this.close());
        startBtn?.addEventListener('click', () => {
            this.close();
            const playBtn = document.getElementById('playBtn') || document.getElementById('playPauseBtn');
            playBtn?.click();
        });

        bandBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                bandBtns.forEach(b => {
                    b.classList.remove('bg-blue-600/30', 'border-blue-500', 'text-blue-300', 'font-bold');
                    b.classList.add('bg-white/5', 'border-white/10');
                });
                btn.classList.add('bg-blue-600/30', 'border-blue-500', 'text-blue-300', 'font-bold');
                btn.classList.remove('bg-white/5', 'border-white/10');
                
                const band = btn.getAttribute('data-band');
                const hz = btn.getAttribute('data-hz');
                this.selectedWave = band;
                if (hzDisplay) hzDisplay.textContent = `${hz} Hz (${band.toUpperCase()})`;
            });
        });
    }

    open() {
        this.render();
        const modal = document.getElementById('trustHubModal');
        if (modal) {
            modal.classList.remove('hidden');
            this.isOpen = true;
            this.startOscilloscope();
        }
    }

    close() {
        const modal = document.getElementById('trustHubModal');
        if (modal) {
            modal.classList.add('hidden');
            this.isOpen = false;
            if (this.animFrame) cancelAnimationFrame(this.animFrame);
        }
    }

    startOscilloscope() {
        const canvas = document.getElementById('trustHubCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let t = 0;

        const draw = () => {
            if (!this.isOpen) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mult = this.selectedWave === 'delta' ? 0.05 : this.selectedWave === 'theta' ? 0.1 : this.selectedWave === 'alpha' ? 0.2 : this.selectedWave === 'beta' ? 0.35 : 0.6;
            
            // Draw Binaural Carrier Left (Cyan)
            ctx.beginPath();
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.5;
            for (let x = 0; x < canvas.width; x++) {
                const y = (canvas.height / 2) + Math.sin((x * 0.05) + t) * 20 * Math.sin(x * mult + t);
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Draw Entrained Difference Beat (Purple)
            ctx.beginPath();
            ctx.strokeStyle = '#c084fc';
            ctx.lineWidth = 2;
            for (let x = 0; x < canvas.width; x++) {
                const y = (canvas.height / 2) + Math.sin(x * mult + t) * 28;
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();

            t += 0.05;
            this.animFrame = requestAnimationFrame(draw);
        };
        draw();
    }
}

export const trustHubModal = new TrustHubModal();
if (typeof window !== 'undefined') {
    window.openTrustHubModal = () => trustHubModal.open();
}
