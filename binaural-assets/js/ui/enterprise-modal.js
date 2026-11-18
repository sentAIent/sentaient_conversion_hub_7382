/**
 * Enterprise Wellness Modal UI Controller (State of the Art)
 * Renders corporate team focus rooms, anonymized burnout analytics,
 * and corporate license/SSO integration controls.
 */

import { enterpriseWellness } from '../services/enterprise-wellness.js';
import { showToast } from '../utils/helpers.js';

let activeTab = 'rooms';

export function openEnterpriseModal() {
    let modal = document.getElementById('enterpriseModal');
    if (!modal) {
        modal = createEnterpriseModalDOM();
        document.body.appendChild(modal);
    }
    renderActiveTab(modal);
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

export function closeEnterpriseModal() {
    const modal = document.getElementById('enterpriseModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

function createEnterpriseModalDOM() {
    const container = document.createElement('div');
    container.id = 'enterpriseModal';
    container.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md hidden';
    container.innerHTML = `
        <div class="relative w-full max-w-xl bg-slate-900/95 border border-white/10 rounded-3xl p-6 text-white shadow-2xl overflow-hidden custom-scrollbar max-h-[92vh] overflow-y-auto" style="box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(96, 169, 255, 0.15);">
            <!-- Header -->
            <div class="flex items-center justify-between pb-4 border-b border-white/10">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h3 class="text-lg font-bold text-white tracking-wide">MindWave Enterprise</h3>
                            <span id="entCompanyBadge" class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">Team Portal</span>
                        </div>
                        <p class="text-xs text-white/50">Synchronized focus, burnout analytics & team wellness</p>
                    </div>
                </div>
                <button id="closeEntModalBtn" class="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <!-- Tab Navigation -->
            <div class="flex gap-2 mt-4 border-b border-white/10 pb-3">
                <button id="tabRoomsBtn" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    Live Focus Rooms
                </button>
                <button id="tabDashBtn" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all text-white/60 hover:text-white">
                    Team Dashboard
                </button>
                <button id="tabLicenseBtn" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all text-white/60 hover:text-white">
                    Corporate License & Slack
                </button>
            </div>

            <!-- Tab Content Body -->
            <div id="entTabContent" class="mt-4">
                <!-- Dynamically injected -->
            </div>
        </div>
    `;

    container.querySelector('#closeEntModalBtn').onclick = closeEnterpriseModal;
    container.onclick = (e) => {
        if (e.target === container) closeEnterpriseModal();
    };

    const tabRoomsBtn = container.querySelector('#tabRoomsBtn');
    const tabDashBtn = container.querySelector('#tabDashBtn');
    const tabLicenseBtn = container.querySelector('#tabLicenseBtn');

    function setActive(tabName, activeBtn) {
        activeTab = tabName;
        [tabRoomsBtn, tabDashBtn, tabLicenseBtn].forEach(b => {
            b.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all text-white/60 hover:text-white';
        });
        activeBtn.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-blue-500/20 text-blue-400 border border-blue-500/30';
        renderActiveTab(container);
    }

    tabRoomsBtn.onclick = () => setActive('rooms', tabRoomsBtn);
    tabDashBtn.onclick = () => setActive('dash', tabDashBtn);
    tabLicenseBtn.onclick = () => setActive('license', tabLicenseBtn);

    window.addEventListener('focus-room-tick', (e) => {
        const timeEl = container.querySelector('#activeRoomCountdown');
        if (timeEl && e.detail) {
            const mins = Math.floor(e.detail.remainingSeconds / 60);
            const secs = e.detail.remainingSeconds % 60;
            timeEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
    });

    return container;
}

function renderActiveTab(container) {
    const content = container.querySelector('#entTabContent');
    if (!content) return;

    if (activeTab === 'rooms') {
        const room = enterpriseWellness.activeRoom;
        content.innerHTML = `
            <div class="space-y-4">
                ${room ? `
                    <!-- Active Joined Room Card -->
                    <div class="p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-800/60 border border-blue-500/40 shadow-xl">
                        <div class="flex items-center justify-between">
                            <span class="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Synchronized Session Active</span>
                            <span class="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                ${room.participants} teammates live
                            </span>
                        </div>
                        <div class="flex items-baseline justify-between mt-3">
                            <h4 class="text-lg font-bold text-white">${room.name}</h4>
                            <div id="activeRoomCountdown" class="text-3xl font-mono font-black text-blue-400">
                                ${Math.floor(room.remainingSeconds / 60).toString().padStart(2, '0')}:${(room.remainingSeconds % 60).toString().padStart(2, '0')}
                            </div>
                        </div>
                        <div class="mt-4 flex gap-2">
                            <button id="leaveFocusRoomBtn" class="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold text-white transition-all">
                                Leave Room
                            </button>
                        </div>
                    </div>
                ` : `
                    <div class="p-3.5 bg-white/5 border border-white/5 rounded-2xl text-xs text-white/60">
                        Join your company's virtual focus room. Timers and carrier brainwaves are synchronized across the entire team for optimal deep work.
                    </div>
                `}

                <div class="space-y-2.5">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-white/40">Available Team Focus Rooms</h4>
                    
                    <div class="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 flex items-center justify-between transition-all">
                        <div>
                            <div class="font-bold text-sm text-white">Engineering Deep Work</div>
                            <div class="text-[11px] text-white/50">40Hz Gamma Wave • 18 active members</div>
                        </div>
                        <button class="joinRoomBtn px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs transition-all" data-room="Engineering Deep Work" data-preset="gamma">
                            Join
                        </button>
                    </div>

                    <div class="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 flex items-center justify-between transition-all">
                        <div>
                            <div class="font-bold text-sm text-white">Creative Flow Block</div>
                            <div class="text-[11px] text-white/50">10Hz Alpha Wave • 9 active members</div>
                        </div>
                        <button class="joinRoomBtn px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs transition-all" data-room="Creative Flow Block" data-preset="alpha">
                            Join
                        </button>
                    </div>

                    <div class="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 flex items-center justify-between transition-all">
                        <div>
                            <div class="font-bold text-sm text-white">Afternoon Decompression</div>
                            <div class="text-[11px] text-white/50">6Hz Theta Reset • 5 active members</div>
                        </div>
                        <button class="joinRoomBtn px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs transition-all" data-room="Afternoon Decompression" data-preset="theta">
                            Join
                        </button>
                    </div>
                </div>
            </div>
        `;

        content.querySelectorAll('.joinRoomBtn').forEach(btn => {
            btn.onclick = () => {
                const room = enterpriseWellness.joinFocusRoom(btn.dataset.room, btn.dataset.preset);
                showToast(`Joined ${room.name}! Audio synchronized.`, "success");
                renderActiveTab(container);
            };
        });

        const leaveBtn = content.querySelector('#leaveFocusRoomBtn');
        if (leaveBtn) {
            leaveBtn.onclick = () => {
                enterpriseWellness.leaveFocusRoom();
                showToast("Left focus room.", "info");
                renderActiveTab(container);
            };
        }
    } else if (activeTab === 'dash') {
        const metrics = enterpriseWellness.getAnonymizedTeamMetrics();
        content.innerHTML = `
            <div class="space-y-4">
                <div class="grid grid-cols-3 gap-3">
                    <div class="bg-white/5 rounded-2xl p-3 border border-white/5 text-center">
                        <span class="text-[10px] uppercase font-bold text-white/40">Team Hours</span>
                        <div class="text-2xl font-black text-blue-400 mt-1">${metrics.totalTeamHours}h</div>
                    </div>
                    <div class="bg-white/5 rounded-2xl p-3 border border-white/5 text-center">
                        <span class="text-[10px] uppercase font-bold text-white/40">Burnout Risk</span>
                        <div class="text-2xl font-black text-emerald-400 mt-1">${metrics.burnoutRiskScore}/100</div>
                    </div>
                    <div class="bg-white/5 rounded-2xl p-3 border border-white/5 text-center">
                        <span class="text-[10px] uppercase font-bold text-white/40">Active Today</span>
                        <div class="text-2xl font-black text-purple-400 mt-1">${metrics.activeSessionsToday}</div>
                    </div>
                </div>

                <div class="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div class="flex justify-between text-xs text-white/70 mb-2 font-medium">
                        <span>Burnout Risk Index (Anonymized Aggregate)</span>
                        <span class="text-emerald-400 font-bold">Low Risk (Healthy)</span>
                    </div>
                    <div class="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <div class="h-full bg-emerald-400 rounded-full" style="width: 28%;"></div>
                    </div>
                    <p class="text-[10px] text-white/40 mt-2">Calculated from post-session recovery rate, session intervals, and off-hour usage across your team.</p>
                </div>

                <div class="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <h5 class="text-xs font-bold text-white mb-2">Peak Productivity Window</h5>
                    <div class="text-base font-bold text-cyan-400">${metrics.peakProductivityWindow}</div>
                    <p class="text-[10px] text-white/40 mt-1">Recommended window for scheduling "No-Meeting Focus Blocks".</p>
                </div>
            </div>
        `;
    } else if (activeTab === 'license') {
        const org = enterpriseWellness.orgData;
        content.innerHTML = `
            <div class="space-y-4">
                <div class="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <h4 class="text-sm font-bold text-white mb-1">Corporate Key & Seat Allocation</h4>
                    <p class="text-xs text-white/50 mb-3">Redeem an enterprise code to unlock corporate tier features.</p>
                    
                    <div class="flex gap-2">
                        <input type="text" id="corpCodeInput" placeholder="e.g. ACME-FOCUS" class="flex-1 px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-xs outline-none focus:border-blue-500 uppercase">
                        <button id="redeemCorpBtn" class="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs transition-all">
                            Verify Code
                        </button>
                    </div>
                    ${org.isEnterprise ? `
                        <div class="mt-3 text-xs text-emerald-400 font-medium">
                            ✓ Active Enterprise Organization: <b>${org.companyName}</b> (${org.seatsAllocated} seats allocated)
                        </div>
                    ` : ''}
                </div>

                <div class="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <h4 class="text-sm font-bold text-white mb-1">Slack & Microsoft Teams Integration</h4>
                    <p class="text-xs text-white/50 mb-3">Post automatic status updates when you begin a focus block.</p>
                    
                    <input type="url" id="slackWebhookInput" value="${org.webhookUrl || ''}" placeholder="https://hooks.slack.com/services/..." class="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-xs outline-none focus:border-blue-500">
                    
                    <button id="saveWebhookBtn" class="mt-3 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold text-white transition-all">
                        Save Webhook
                    </button>
                </div>
            </div>
        `;

        const codeInput = content.querySelector('#corpCodeInput');
        const redeemBtn = content.querySelector('#redeemCorpBtn');
        redeemBtn.onclick = () => {
            const res = enterpriseWellness.redeemCorporateCode(codeInput.value);
            if (res.success) {
                showToast(`Welcome ${res.companyName}! Enterprise features unlocked.`, "success");
                renderActiveTab(container);
            } else {
                showToast(res.error, "error");
            }
        };

        const webhookInput = content.querySelector('#slackWebhookInput');
        const saveWebhookBtn = content.querySelector('#saveWebhookBtn');
        saveWebhookBtn.onclick = () => {
            enterpriseWellness.saveOrgData({ webhookUrl: webhookInput.value.trim() });
            showToast("Slack webhook saved!", "success");
        };
    }
}
