/**
 * Biometric HUD Modal Controller (State of the Art)
 * Displays real-time heart rate, HRV (RMSSD), live ECG canvas, and closed-loop entrainment controls.
 */

import { biofeedback } from '../services/biofeedback.js';
import { showToast } from '../utils/helpers.js';

let isInitialized = false;
let ecgAnimationId = null;
let ecgPhase = 0;

export function initBiometricHUD() {
    if (isInitialized) return;
    isInitialized = true;

    // Listen for updates from biofeedback service
    window.addEventListener('biofeedback-update', (e) => {
        const { bpm, hrv, stressScore, isSimulated } = e.detail;
        updateHUDMetrics(bpm, hrv, stressScore, isSimulated);
    });

    window.addEventListener('biofeedback-connected', () => {
        updateHUDStatus(true, biofeedback.isSimulated);
    });

    window.addEventListener('biofeedback-disconnected', () => {
        updateHUDStatus(false, false);
    });
}

export function openBiometricHUD() {
    initBiometricHUD();
    let modal = document.getElementById('biometricHUDModal');
    if (!modal) {
        modal = createHUDModalDOM();
        document.body.appendChild(modal);
    }
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    startECGAnimation();
}

export function closeBiometricHUD() {
    const modal = document.getElementById('biometricHUDModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
    stopECGAnimation();
}

function updateHUDMetrics(bpm, hrv, stressScore, isSimulated) {
    const bpmEl = document.getElementById('bioHudBpm');
    const hrvEl = document.getElementById('bioHudHrv');
    const stressEl = document.getElementById('bioHudStress');
    const stressBar = document.getElementById('bioHudStressBar');
    const pulseDot = document.getElementById('bioHudPulseDot');

    if (bpmEl) bpmEl.textContent = bpm || '--';
    if (hrvEl) hrvEl.textContent = hrv ? `${hrv} ms` : '--';
    if (stressEl) stressEl.textContent = stressScore !== undefined ? `${stressScore}%` : '--';
    
    if (stressBar) {
        stressBar.style.width = `${Math.min(100, Math.max(5, stressScore || 0))}%`;
        if (stressScore > 65) {
            stressBar.className = 'h-full bg-rose-500 rounded-full transition-all duration-500';
        } else if (stressScore > 40) {
            stressBar.className = 'h-full bg-amber-400 rounded-full transition-all duration-500';
        } else {
            stressBar.className = 'h-full bg-emerald-400 rounded-full transition-all duration-500';
        }
    }

    if (pulseDot) {
        pulseDot.classList.remove('scale-125');
        void pulseDot.offsetWidth;
        pulseDot.classList.add('scale-125');
    }
}

function updateHUDStatus(isConnected, isSimulated) {
    const badge = document.getElementById('bioHudStatusBadge');
    const connectBtn = document.getElementById('bioHudConnectBtn');
    const simBtn = document.getElementById('bioHudSimBtn');

    if (badge) {
        if (!isConnected) {
            badge.textContent = 'Disconnected';
            badge.className = 'text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700';
        } else if (isSimulated) {
            badge.textContent = 'Simulating Wearable';
            badge.className = 'text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-900/40 text-cyan-300 border border-cyan-500/30';
        } else {
            badge.textContent = 'Live Wearable Connected';
            badge.className = 'text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-900/40 text-emerald-300 border border-emerald-500/30';
        }
    }

    if (connectBtn) {
        connectBtn.textContent = isConnected && !isSimulated ? 'Disconnect Wearable' : 'Pair Bluetooth Device';
    }
    if (simBtn) {
        simBtn.textContent = isConnected && isSimulated ? 'Stop Simulator' : 'Test with Simulator';
    }
}

function startECGAnimation() {
    const canvas = document.getElementById('bioHudEcgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    function draw() {
        ecgPhase += 0.08;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = biofeedback.isConnected ? (biofeedback.stressScore > 60 ? '#f43f5e' : '#10b981') : '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const midY = canvas.height / 2;
        for (let x = 0; x < canvas.width; x++) {
            const t = (x / 25) + ecgPhase;
            let yOffset = 0;
            const cycle = t % Math.PI;
            if (cycle > 0.4 && cycle < 0.6) {
                yOffset = -Math.sin((cycle - 0.4) * Math.PI / 0.2) * 22;
            } else if (cycle > 0.6 && cycle < 0.7) {
                yOffset = Math.sin((cycle - 0.6) * Math.PI / 0.1) * 8;
            }
            
            const y = midY + yOffset + Math.sin(t * 0.5) * 2;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ecgAnimationId = requestAnimationFrame(draw);
    }

    stopECGAnimation();
    ecgAnimationId = requestAnimationFrame(draw);
}

function stopECGAnimation() {
    if (ecgAnimationId) {
        cancelAnimationFrame(ecgAnimationId);
        ecgAnimationId = null;
    }
}

function createHUDModalDOM() {
    const container = document.createElement('div');
    container.id = 'biometricHUDModal';
    container.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md hidden';
    container.innerHTML = `
        <div class="relative w-full max-w-lg bg-slate-900/95 border border-white/10 rounded-3xl p-6 text-white shadow-2xl overflow-hidden custom-scrollbar max-h-[92vh] overflow-y-auto" style="box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(16, 185, 129, 0.15);">
            <!-- Header -->
            <div class="flex items-center justify-between pb-4 border-b border-white/10">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-white tracking-wide">Bio-Adaptive Sync</h3>
                        <p class="text-xs text-white/50">Heart Rate, HRV & Closed-Loop Entrainment</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span id="bioHudStatusBadge" class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Disconnected</span>
                    <button id="closeBioHudBtn" class="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            </div>

            <!-- Live ECG Canvas -->
            <div class="mt-4 p-3 bg-black/40 rounded-2xl border border-white/5 relative">
                <div class="flex items-center justify-between text-[11px] text-white/40 mb-1">
                    <span>LIVE PHYSIOLOGICAL WAVE</span>
                    <div class="flex items-center gap-1.5">
                        <span id="bioHudPulseDot" class="w-2 h-2 rounded-full bg-emerald-400 transition-transform"></span>
                        <span class="text-emerald-400 font-mono text-[10px]">SYNC PULSE</span>
                    </div>
                </div>
                <canvas id="bioHudEcgCanvas" width="460" height="70" class="w-full h-[70px]"></canvas>
            </div>

            <!-- Metrics Grid -->
            <div class="grid grid-cols-3 gap-3 mt-4">
                <div class="bg-white/5 rounded-2xl p-3 border border-white/5 text-center">
                    <span class="text-[10px] uppercase font-bold tracking-wider text-white/40">Heart Rate</span>
                    <div class="text-2xl font-black text-white mt-1 flex items-baseline justify-center gap-1">
                        <span id="bioHudBpm">--</span>
                        <span class="text-[11px] font-normal text-white/40">BPM</span>
                    </div>
                </div>
                <div class="bg-white/5 rounded-2xl p-3 border border-white/5 text-center">
                    <span class="text-[10px] uppercase font-bold tracking-wider text-white/40">HRV (RMSSD)</span>
                    <div class="text-2xl font-black text-emerald-400 mt-1 flex items-baseline justify-center gap-1">
                        <span id="bioHudHrv">--</span>
                    </div>
                </div>
                <div class="bg-white/5 rounded-2xl p-3 border border-white/5 text-center">
                    <span class="text-[10px] uppercase font-bold tracking-wider text-white/40">Stress Index</span>
                    <div class="text-2xl font-black text-amber-400 mt-1 flex items-baseline justify-center gap-1">
                        <span id="bioHudStress">--</span>
                    </div>
                </div>
            </div>

            <!-- Stress Meter Bar -->
            <div class="mt-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                <div class="flex justify-between text-[11px] text-white/60 mb-1.5 font-medium">
                    <span>Physiological Load</span>
                    <span class="text-emerald-400">Optimal Recovery Band</span>
                </div>
                <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div id="bioHudStressBar" class="h-full bg-emerald-400 rounded-full transition-all duration-500" style="width: 35%;"></div>
                </div>
            </div>

            <!-- Entrainment Controls -->
            <div class="mt-4 p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl flex items-center justify-between">
                <div>
                    <h4 class="text-sm font-bold text-white">Closed-Loop Entrainment</h4>
                    <p class="text-xs text-white/50">Auto-shift binaural frequency to guide heart to target</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="bioHudEntrainToggle" class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
            </div>

            <!-- Action Buttons -->
            <div class="mt-5 flex flex-col sm:flex-row gap-2.5">
                <button id="bioHudConnectBtn" class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 font-bold text-sm text-slate-950 shadow-lg shadow-emerald-500/20 transition-all">
                    Pair Bluetooth Device
                </button>
                <button id="bioHudSimBtn" class="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 font-semibold text-sm text-white transition-all">
                    Test with Simulator
                </button>
            </div>
            <p class="text-[10px] text-center text-white/30 mt-3">Compatible with Apple Watch, Whoop, Polar H10, Garmin, and standard BLE Heart Rate monitors.</p>
        </div>
    `;

    container.querySelector('#closeBioHudBtn').onclick = closeBiometricHUD;
    container.onclick = (e) => {
        if (e.target === container) closeBiometricHUD();
    };

    const connectBtn = container.querySelector('#bioHudConnectBtn');
    connectBtn.onclick = async () => {
        if (biofeedback.isConnected && !biofeedback.isSimulated) {
            biofeedback.disconnect();
            showToast("Wearable disconnected", "info");
        } else {
            try {
                showToast("Searching for Bluetooth Heart Rate monitors...", "info");
                const ok = await biofeedback.connect();
                if (ok) showToast("Wearable connected! Real-time telemetry active.", "success");
            } catch (err) {
                showToast(err.message || "Failed to pair device", "error");
            }
        }
    };

    const simBtn = container.querySelector('#bioHudSimBtn');
    simBtn.onclick = () => {
        if (biofeedback.isConnected && biofeedback.isSimulated) {
            biofeedback.stopSimulation();
            showToast("Biometric simulator stopped", "info");
        } else {
            biofeedback.startSimulation();
            showToast("Biometric simulator active! Generating sinus rhythm.", "success");
        }
    };

    const entrainToggle = container.querySelector('#bioHudEntrainToggle');
    entrainToggle.onchange = (e) => {
        biofeedback.toggleEntrainment(e.target.checked);
        showToast(e.target.checked ? "Closed-loop entrainment enabled" : "Entrainment disabled", "info");
    };

    return container;
}
