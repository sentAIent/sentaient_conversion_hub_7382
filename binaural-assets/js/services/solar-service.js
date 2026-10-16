/**
 * solar-service.js
 * MindWave Photobiology UI & Notification Integration Service
 *
 * Provides:
 * - Real-time spectral meter UI & daily timeline
 * - Browser notification scheduling for healthy sun exposure phases
 * - Geolocation detection & Fitzpatrick skin-type calibration
 * - Audio & speech synthesis chime integration with MindWave audio cues
 */

import { solarEngine, FITZPATRICK_PROFILES } from './solar-photobiology.js';

class SolarService {
    constructor() {
        this.engine = solarEngine;
        this.modalId = 'solarPhotobiologyModal';
        this.updateInterval = null;
        this.lastNotifiedPhase = localStorage.getItem('mindwave_last_notified_solar_phase') || '';
        this.init();
    }

    init() {
        // Expose to window for UI toggles and audio coach integration
        window.solarService = this;
        window.openSolarModal = () => this.openModal();
        window.closeSolarModal = () => this.closeModal();

        // Check and schedule ambient notifications if enabled
        this.schedulePhaseMonitoring();
    }

    formatTime(date) {
        if (!date) return '--:--';
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    /**
     * Request browser notification permission
     */
    async requestNotificationPermission() {
        if (!('Notification' in window)) {
            if (window.showToast) window.showToast('Browser notifications not supported', 'warning');
            return false;
        }

        if (Notification.permission === 'granted') {
            this.engine.setNotificationsEnabled(true);
            if (window.showToast) window.showToast('Solar notifications active! ☀️', 'success');
            this.updateModalContent();
            return true;
        }

        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
            this.engine.setNotificationsEnabled(true);
            if (window.showToast) window.showToast('Solar notifications enabled! ☀️', 'success');
            new Notification('MindWave Solar Photobiology', {
                body: 'You will receive MindWave alerts for healthy NIR priming, Nitric Oxide, & UVB windows.',
                icon: './mindwave-logo.png'
            });
        } else {
            this.engine.setNotificationsEnabled(false);
            if (window.showToast) window.showToast('Notification permission denied', 'warning');
        }
        this.updateModalContent();
        return perm === 'granted';
    }

    /**
     * Trigger a MindWave-style notification for a specific solar window
     */
    notifyUser(title, body, tag = 'solar-phase') {
        // In-app Toast
        if (window.showToast) {
            window.showToast(`${title}: ${body}`, 'info');
        }

        // Web Notification (if permission granted)
        if (this.engine.areNotificationsEnabled() && 'Notification' in window && Notification.permission === 'granted') {
            try {
                new Notification(title, {
                    body,
                    tag,
                    icon: './mindwave-logo.png'
                });
            } catch (e) {
                console.warn('[Solar] Notification display error:', e);
            }
        }
    }

    /**
     * Background interval monitoring current spectral window and triggering alerts
     */
    schedulePhaseMonitoring() {
        // Check once every 2 minutes
        setInterval(() => {
            const coords = this.engine.getUserCoordinates();
            const { currentPos, schedule } = this.engine.computeDailySchedule(coords.lat, coords.lon, new Date());
            const phaseName = schedule.currentPhase ? schedule.currentPhase.name : '';

            // If phase transitioned and notifications enabled
            if (phaseName && phaseName !== this.lastNotifiedPhase) {
                this.lastNotifiedPhase = phaseName;
                localStorage.setItem('mindwave_last_notified_solar_phase', phaseName);

                if (this.engine.areNotificationsEnabled()) {
                    const badge = schedule.currentPhase.badge;
                    const action = schedule.currentPhase.action;
                    this.notifyUser(`☀️ MindWave Solar Alert: ${phaseName}`, `${badge} — ${action}`);
                }
            }
        }, 120000);
    }

    /**
     * Auto-detect GPS location
     */
    detectLocation() {
        if (!navigator.geolocation) {
            if (window.showToast) window.showToast('Geolocation not supported by browser', 'warning');
            return;
        }

        if (window.showToast) window.showToast('Detecting local horizon coordinates...', 'info');

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = parseFloat(pos.coords.latitude.toFixed(4));
                const lon = parseFloat(pos.coords.longitude.toFixed(4));
                this.engine.setUserCoordinates(lat, lon, `Lat ${lat}°, Lon ${lon}°`);
                if (window.showToast) window.showToast(`Location synced (${lat}°, ${lon}°)`, 'success');
                this.updateModalContent();
            },
            (err) => {
                console.warn('[Solar] Geolocation error:', err);
                if (window.showToast) window.showToast('Could not fetch GPS. Using default location.', 'warning');
            },
            { enableHighAccuracy: false, timeout: 8000 }
        );
    }

    openModal() {
        let modal = document.getElementById(this.modalId);
        if (!modal) {
            this.createModalDOM();
            modal = document.getElementById(this.modalId);
        }
        if (modal) {
            modal.classList.remove('hidden');
            this.updateModalContent();

            // Live updates every 10 seconds while open
            if (this.updateInterval) clearInterval(this.updateInterval);
            this.updateInterval = setInterval(() => this.updateModalContent(), 10000);
        }
    }

    closeModal() {
        const modal = document.getElementById(this.modalId);
        if (modal) modal.classList.add('hidden');
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    createModalDOM() {
        const modal = document.createElement('div');
        modal.id = this.modalId;
        modal.className = 'fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto';
        modal.innerHTML = `
            <div class="relative w-full max-w-2xl bg-[#0f172a]/95 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] flex flex-col gap-6 text-white my-auto max-h-[92vh] overflow-y-auto custom-scrollbar">
                
                <!-- Header -->
                <div class="flex items-center justify-between border-b border-white/10 pb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                            <svg class="w-6 h-6 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="5" stroke-width="2"></circle>
                                <path stroke-linecap="round" stroke-width="2" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                            </svg>
                        </div>
                        <div>
                            <h2 class="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-orange-300 to-amber-500 bg-clip-text text-transparent">
                                MindWave Photobiology
                            </h2>
                            <p class="text-xs text-white/50">Circadian Light, Subcellular Melatonin & Healthy Solar Timing</p>
                        </div>
                    </div>
                    <button onclick="window.closeSolarModal()" class="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <!-- Dynamic Content Container -->
                <div id="solarModalBody" class="space-y-6">
                    <div class="flex justify-center py-12 text-white/40 text-sm">Calculating solar spectrum coordinates...</div>
                </div>

            </div>
        `;
        document.body.appendChild(modal);

        // Close on outside backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });
    }

    updateModalContent() {
        const body = document.getElementById('solarModalBody');
        if (!body) return;

        const coords = this.engine.getUserCoordinates();
        const advice = this.engine.getOptimalExposureAdvice(coords.lat, coords.lon);
        const { currentPos, schedule, profile, skinType, isUvbWinter } = advice;

        const notifEnabled = this.engine.areNotificationsEnabled();

        // Spectral Status Indicators
        const nirBadge = currentPos.nirActive 
            ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40">ACTIVE (700-1400nm)</span>' 
            : '<span class="px-2 py-0.5 rounded text-[10px] text-white/30 bg-white/5">INACTIVE</span>';

        const blueBadge = currentPos.blueCircadianActive 
            ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">ACTIVE (480nm)</span>' 
            : '<span class="px-2 py-0.5 rounded text-[10px] text-white/30 bg-white/5">INACTIVE</span>';

        const uvaBadge = currentPos.uvaActive 
            ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">ACTIVE (315-400nm)</span>' 
            : '<span class="px-2 py-0.5 rounded text-[10px] text-white/30 bg-white/5">INACTIVE</span>';

        const uvbBadge = currentPos.uvbActive 
            ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">ACTIVE (290-315nm)</span>' 
            : (isUvbWinter 
                ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">UVB WINTER (Peak <35°)</span>' 
                : '<span class="px-2 py-0.5 rounded text-[10px] text-white/30 bg-white/5">INACTIVE</span>');

        body.innerHTML = `
            <!-- Current Real-Time Phase Card -->
            <div class="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-white/5 to-transparent border border-amber-500/30 flex flex-col gap-3 relative overflow-hidden">
                <div class="flex items-center justify-between flex-wrap gap-2">
                    <span class="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-bold flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                        CURRENT SOLAR PHASE
                    </span>
                    <span class="text-xs font-mono text-white/60">Solar Elevation: <b class="text-white">${currentPos.elevation.toFixed(1)}°</b> | Air Mass: <b class="text-white">${currentPos.airMass.toFixed(2)}m</b></span>
                </div>
                
                <div>
                    <h3 class="text-lg font-bold text-white flex items-center gap-2">
                        ${schedule.currentPhase.name}
                        <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            ${schedule.currentPhase.badge}
                        </span>
                    </h3>
                    <p class="text-xs text-white/70 mt-1 leading-relaxed">${schedule.currentPhase.desc}</p>
                </div>

                <div class="mt-1 p-3 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3 text-xs text-amber-200/90 leading-snug">
                    <span class="text-base">💡</span>
                    <div>
                        <strong class="text-amber-300 block mb-0.5">Optimal Action Protocol:</strong>
                        ${schedule.currentPhase.action}
                    </div>
                </div>
            </div>

            <!-- Spectral Frequency Status Grid -->
            <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">Live Atmospheric Frequencies Reaching Ground</h4>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div class="p-3 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between gap-2">
                        <div>
                            <span class="text-[10px] font-bold uppercase text-red-400 block">Near-Infrared (NIR)</span>
                            <span class="text-[11px] text-white/60">Subcellular Melatonin / CCO</span>
                        </div>
                        <div>${nirBadge}</div>
                    </div>
                    <div class="p-3 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between gap-2">
                        <div>
                            <span class="text-[10px] font-bold uppercase text-blue-400 block">Circadian Blue (480nm)</span>
                            <span class="text-[11px] text-white/60">ipRGCs / Pineal Cutoff</span>
                        </div>
                        <div>${blueBadge}</div>
                    </div>
                    <div class="p-3 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between gap-2">
                        <div>
                            <span class="text-[10px] font-bold uppercase text-purple-400 block">UVA Band</span>
                            <span class="text-[11px] text-white/60">Nitric Oxide / Blood Flow</span>
                        </div>
                        <div>${uvaBadge}</div>
                    </div>
                    <div class="p-3 rounded-xl bg-black/30 border border-white/10 flex flex-col justify-between gap-2">
                        <div>
                            <span class="text-[10px] font-bold uppercase text-emerald-400 block">UVB Band</span>
                            <span class="text-[11px] text-white/60">Pre-Vit D3 / Eumelanin</span>
                        </div>
                        <div>${uvbBadge}</div>
                    </div>
                </div>
            </div>

            <!-- Today's Photobiology Timeline -->
            <div class="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div class="flex items-center justify-between">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-white/70">Today's Solar Exposure Windows</h4>
                    <span class="text-[11px] font-mono text-white/40">Peak Sun: ${this.formatTime(schedule.solarZenith)} (${schedule.peakElevation.toFixed(1)}°)</span>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div class="p-2.5 rounded-lg bg-black/20 border border-white/5">
                        <span class="text-red-400 font-semibold block text-[11px]">🌅 Dawn NIR Priming</span>
                        <span class="text-white font-mono">${this.formatTime(schedule.sunrise)} - ${this.formatTime(schedule.uvaStart)}</span>
                        <p class="text-[10px] text-white/50 mt-0.5">Mitochondrial conditioning before UV</p>
                    </div>
                    <div class="p-2.5 rounded-lg bg-black/20 border border-white/5">
                        <span class="text-blue-400 font-semibold block text-[11px]">☀️ Circadian & Nitric Oxide</span>
                        <span class="text-white font-mono">${this.formatTime(schedule.circadianBlueStart)} - ${this.formatTime(schedule.circadianBlueEnd)}</span>
                        <p class="text-[10px] text-white/50 mt-0.5">SCN reset & arterial vasodilation</p>
                    </div>
                    <div class="p-2.5 rounded-lg bg-black/20 border border-white/5">
                        <span class="text-emerald-400 font-semibold block text-[11px]">☀️ Active UVB Synthesis</span>
                        <span class="text-white font-mono">${schedule.uvbStart ? `${this.formatTime(schedule.uvbStart)} - ${this.formatTime(schedule.uvbEnd)}` : 'None (UVB Winter)'}</span>
                        <p class="text-[10px] text-white/50 mt-0.5">Pre-vitamin D3 & POMC activation</p>
                    </div>
                </div>
            </div>

            <!-- Fitzpatrick Calibration & Controls -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Skin Type Selector -->
                <div class="p-4 rounded-2xl bg-black/30 border border-white/10 flex flex-col justify-between gap-3">
                    <div>
                        <label class="text-xs font-bold text-white/70 uppercase tracking-wider block mb-1">
                            Fitzpatrick Skin Calibration
                        </label>
                        <select id="solarSkinSelect" class="w-full bg-[#1e293b] text-white text-xs rounded-xl p-2.5 border border-white/20 focus:outline-none focus:border-amber-400" onchange="window.solarService.onSkinTypeChange(this.value)">
                            ${Object.entries(FITZPATRICK_PROFILES).map(([num, prof]) => `
                                <option value="${num}" ${parseInt(num, 10) === skinType ? 'selected' : ''}>
                                    ${prof.name} — ${prof.desc}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <p class="text-[11px] text-white/50 leading-relaxed">
                        Adjusts sub-erythemal window to safely maximize cellular benefit without DNA over-saturation.
                    </p>
                </div>

                <!-- Notifications & Location Sync -->
                <div class="p-4 rounded-2xl bg-black/30 border border-white/10 flex flex-col justify-between gap-3">
                    <div class="flex items-center justify-between">
                        <div>
                            <span class="text-xs font-bold text-white/70 uppercase tracking-wider block">Location Horizon</span>
                            <span class="text-xs text-white/60 font-mono">${coords.city} (${coords.lat}°, ${coords.lon}°)</span>
                        </div>
                        <button onclick="window.solarService.detectLocation()" class="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all flex items-center gap-1">
                            <span>📍</span> Auto-GPS
                        </button>
                    </div>

                    <div class="flex items-center justify-between pt-2 border-t border-white/10">
                        <span class="text-xs text-white/80 font-medium">Daily MindWave Alerts</span>
                        <button onclick="window.solarService.toggleNotifications()" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${notifEnabled ? 'bg-amber-400 text-black hover:bg-amber-300' : 'bg-white/10 text-white/70 hover:bg-white/20'}">
                            ${notifEnabled ? '✓ Enabled' : 'Enable Notifications'}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Footer Disclaimer -->
            <p class="text-[10px] text-white/30 text-center leading-relaxed">
                MindWave Photobiology computes solar geometry & atmospheric air mass models for circadian wellness. Always practice sub-erythemal exposure and listen to your body.
            </p>
        `;
    }

    onSkinTypeChange(val) {
        this.engine.setUserSkinType(val);
        if (window.showToast) window.showToast('Fitzpatrick skin profile updated', 'success');
        this.updateModalContent();
    }

    async toggleNotifications() {
        if (this.engine.areNotificationsEnabled()) {
            this.engine.setNotificationsEnabled(false);
            if (window.showToast) window.showToast('Solar notifications muted', 'info');
            this.updateModalContent();
        } else {
            await this.requestNotificationPermission();
        }
    }
}

export const solarService = new SolarService();
