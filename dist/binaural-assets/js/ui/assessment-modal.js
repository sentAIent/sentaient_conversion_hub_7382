/**
 * Assessment Modal UI Controller (State of the Art)
 * Renders pre-session baseline check-in and post-session efficacy calculation modals.
 */

import { clinicalAssessment } from '../services/clinical-assessment.js';
import { biofeedback } from '../services/biofeedback.js';
import { showToast } from '../utils/helpers.js';

export function openPreSessionModal(onComplete) {
    let modal = document.getElementById('preSessionModal');
    if (!modal) {
        modal = createPreSessionModalDOM();
        document.body.appendChild(modal);
    }
    modal.dataset.onComplete = onComplete ? 'true' : 'false';
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

export function closePreSessionModal() {
    const modal = document.getElementById('preSessionModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

export function openPostSessionModal() {
    let modal = document.getElementById('postSessionModal');
    if (!modal) {
        modal = createPostSessionModalDOM();
        document.body.appendChild(modal);
    }
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

export function closePostSessionModal() {
    const modal = document.getElementById('postSessionModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

export function openAssessmentHistoryModal() {
    let modal = document.getElementById('assessmentHistoryModal');
    if (!modal) {
        modal = createHistoryModalDOM();
        document.body.appendChild(modal);
    }
    refreshHistoryModal(modal);
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

export function closeAssessmentHistoryModal() {
    const modal = document.getElementById('assessmentHistoryModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

function createPreSessionModalDOM() {
    const container = document.createElement('div');
    container.id = 'preSessionModal';
    container.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md hidden';
    container.innerHTML = `
        <div class="relative w-full max-w-md bg-slate-900/95 border border-white/10 rounded-3xl p-6 text-white shadow-2xl overflow-hidden custom-scrollbar max-h-[92vh] overflow-y-auto">
            <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <div class="flex items-center gap-2.5">
                    <span class="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold">1/2</span>
                    <div>
                        <h3 class="text-base font-bold text-white">Pre-Session Check-in</h3>
                        <p class="text-xs text-white/50">Baseline your mental state</p>
                    </div>
                </div>
                <button id="closePreBtn" class="text-white/40 hover:text-white p-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <div class="space-y-4 mt-5">
                <div>
                    <div class="flex justify-between text-xs text-white/70 mb-1.5 font-medium">
                        <span>Current Stress Level</span>
                        <span id="preStressVal" class="text-rose-400 font-bold">6 / 10</span>
                    </div>
                    <input type="range" id="preStressSlider" min="1" max="10" value="6" class="w-full accent-rose-500 cursor-pointer">
                    <div class="flex justify-between text-[10px] text-white/30 mt-0.5">
                        <span>Zen & Calm (1)</span>
                        <span>Overwhelmed (10)</span>
                    </div>
                </div>

                <div>
                    <div class="flex justify-between text-xs text-white/70 mb-1.5 font-medium">
                        <span>Focus & Clarity</span>
                        <span id="preFocusVal" class="text-cyan-400 font-bold">4 / 10</span>
                    </div>
                    <input type="range" id="preFocusSlider" min="1" max="10" value="4" class="w-full accent-cyan-400 cursor-pointer">
                    <div class="flex justify-between text-[10px] text-white/30 mt-0.5">
                        <span>Scattered (1)</span>
                        <span>Laser Sharp (10)</span>
                    </div>
                </div>

                <div>
                    <div class="flex justify-between text-xs text-white/70 mb-1.5 font-medium">
                        <span>Physical Energy</span>
                        <span id="preEnergyVal" class="text-amber-400 font-bold">5 / 10</span>
                    </div>
                    <input type="range" id="preEnergySlider" min="1" max="10" value="5" class="w-full accent-amber-400 cursor-pointer">
                </div>
            </div>

            <button id="startAssessedSessionBtn" class="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-bold text-sm text-slate-950 shadow-lg shadow-cyan-500/20 transition-all">
                Lock In Baseline & Start Session
            </button>
        </div>
    `;

    // Sliders
    const sSlider = container.querySelector('#preStressSlider');
    const fSlider = container.querySelector('#preFocusSlider');
    const eSlider = container.querySelector('#preEnergySlider');
    
    sSlider.oninput = (e) => container.querySelector('#preStressVal').textContent = `${e.target.value} / 10`;
    fSlider.oninput = (e) => container.querySelector('#preFocusVal').textContent = `${e.target.value} / 10`;
    eSlider.oninput = (e) => container.querySelector('#preEnergyVal').textContent = `${e.target.value} / 10`;

    container.querySelector('#closePreBtn').onclick = closePreSessionModal;
    container.querySelector('#startAssessedSessionBtn').onclick = () => {
        clinicalAssessment.startSessionAssessment();
        clinicalAssessment.recordPreAssessment({
            stress: parseInt(sSlider.value),
            focus: parseInt(fSlider.value),
            energy: parseInt(eSlider.value)
        });
        closePreSessionModal();
        showToast("Baseline calibrated. Enjoy your session!", "success");
    };

    return container;
}

function createPostSessionModalDOM() {
    const container = document.createElement('div');
    container.id = 'postSessionModal';
    container.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md hidden';
    container.innerHTML = `
        <div class="relative w-full max-w-md bg-slate-900/95 border border-white/10 rounded-3xl p-6 text-white shadow-2xl overflow-hidden custom-scrollbar max-h-[92vh] overflow-y-auto">
            <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <div class="flex items-center gap-2.5">
                    <span class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">2/2</span>
                    <div>
                        <h3 class="text-base font-bold text-white">Post-Session Results</h3>
                        <p class="text-xs text-white/50">Measure your cognitive delta</p>
                    </div>
                </div>
                <button id="closePostBtn" class="text-white/40 hover:text-white p-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <div class="space-y-4 mt-5">
                <div>
                    <div class="flex justify-between text-xs text-white/70 mb-1.5 font-medium">
                        <span>Current Stress Level</span>
                        <span id="postStressVal" class="text-emerald-400 font-bold">2 / 10</span>
                    </div>
                    <input type="range" id="postStressSlider" min="1" max="10" value="2" class="w-full accent-emerald-500 cursor-pointer">
                </div>

                <div>
                    <div class="flex justify-between text-xs text-white/70 mb-1.5 font-medium">
                        <span>Current Focus & Clarity</span>
                        <span id="postFocusVal" class="text-cyan-400 font-bold">8 / 10</span>
                    </div>
                    <input type="range" id="postFocusSlider" min="1" max="10" value="8" class="w-full accent-cyan-400 cursor-pointer">
                </div>
            </div>

            <button id="savePostReportBtn" class="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 font-bold text-sm text-slate-950 shadow-lg shadow-emerald-500/20 transition-all">
                Calculate & Save Efficacy Score
            </button>
        </div>
    `;

    const sSlider = container.querySelector('#postStressSlider');
    const fSlider = container.querySelector('#postFocusSlider');

    sSlider.oninput = (e) => container.querySelector('#postStressVal').textContent = `${e.target.value} / 10`;
    fSlider.oninput = (e) => container.querySelector('#postFocusVal').textContent = `${e.target.value} / 10`;

    container.querySelector('#closePostBtn').onclick = closePostSessionModal;
    container.querySelector('#savePostReportBtn').onclick = async () => {
        const report = clinicalAssessment.recordPostAssessment({
            stress: parseInt(sSlider.value),
            focus: parseInt(fSlider.value)
        });
        
        // Also log mindful session minutes to Apple HealthKit / Health Connect store
        if (report) {
            await biofeedback.logMindfulSession(report.durationMinutes);
            closePostSessionModal();
            showToast(`Efficacy verified! Stress reduced by ${report.deltas.stressReductionPct}%.`, "success");
        } else {
            closePostSessionModal();
        }
    };

    return container;
}

function createHistoryModalDOM() {
    const container = document.createElement('div');
    container.id = 'assessmentHistoryModal';
    container.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md hidden';
    container.innerHTML = `
        <div class="relative w-full max-w-lg bg-slate-900/95 border border-white/10 rounded-3xl p-6 text-white shadow-2xl overflow-hidden custom-scrollbar max-h-[92vh] overflow-y-auto">
            <div class="flex items-center justify-between pb-3 border-b border-white/10">
                <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <div>
                        <h3 class="text-base font-bold text-white">Clinical Efficacy History</h3>
                        <p class="text-xs text-white/50">Scientific proof of brainwave entrainment</p>
                    </div>
                </div>
                <button id="closeHistBtn" class="text-white/40 hover:text-white p-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <!-- Stats Aggregate -->
            <div class="grid grid-cols-3 gap-2.5 mt-4" id="histStatsGrid">
                <!-- Injected via refreshHistoryModal -->
            </div>

            <div class="mt-5">
                <h4 class="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Past Verified Sessions</h4>
                <div class="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1" id="histSessionsList">
                    <!-- Injected via refreshHistoryModal -->
                </div>
            </div>
        </div>
    `;

    container.querySelector('#closeHistBtn').onclick = closeAssessmentHistoryModal;
    return container;
}

function refreshHistoryModal(container) {
    const stats = clinicalAssessment.getAggregateStats();
    const history = clinicalAssessment.getHistory();

    const statsGrid = container.querySelector('#histStatsGrid');
    if (statsGrid) {
        statsGrid.innerHTML = `
            <div class="bg-white/5 rounded-2xl p-3 border border-white/5 text-center">
                <span class="text-[10px] uppercase font-bold text-white/40">Avg Stress ↓</span>
                <div class="text-xl font-bold text-emerald-400 mt-0.5">-${stats.avgStressReduction}%</div>
            </div>
            <div class="bg-white/5 rounded-2xl p-3 border border-white/5 text-center">
                <span class="text-[10px] uppercase font-bold text-white/40">Avg Focus ↑</span>
                <div class="text-xl font-bold text-cyan-400 mt-0.5">+${stats.avgFocusGain}%</div>
            </div>
            <div class="bg-white/5 rounded-2xl p-3 border border-white/5 text-center">
                <span class="text-[10px] uppercase font-bold text-white/40">Efficacy</span>
                <div class="text-xl font-bold text-purple-400 mt-0.5">${stats.efficacyScore}%</div>
            </div>
        `;
    }

    const list = container.querySelector('#histSessionsList');
    if (list) {
        if (history.length === 0) {
            list.innerHTML = `<div class="text-center py-6 text-xs text-white/40">No recorded sessions yet. Start a session to track clinical efficacy!</div>`;
        } else {
            list.innerHTML = history.slice(0, 15).map(s => `
                <div class="p-2.5 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                    <div>
                        <span class="font-bold text-white uppercase text-[11px]">${s.preset} Wave</span>
                        <span class="text-white/40 text-[10px] ml-1.5">${s.durationMinutes} min • ${new Date(s.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-emerald-400 font-bold">-${s.deltas.stressReductionPct}% Stress</span>
                        <span class="text-cyan-400 font-bold">+${s.deltas.focusGainPct}% Focus</span>
                    </div>
                </div>
            `).join('');
        }
    }
}
