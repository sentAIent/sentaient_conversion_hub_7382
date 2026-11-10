import { JOURNEYS, INTENT_GREETINGS } from '../data/journeys.js';
import { voiceSynth } from '../audio/voice-synth.js';
import { journeyEngine } from '../core/journey-engine.js';
import { els } from '../state.js';

export function initCoachModal() {
    // Create Modal HTML
    const modalHtml = `
        <div id="coachModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md hidden opacity-0 transition-opacity duration-300">
            <div class="glass-lux rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-[0_0_40px_rgba(0,255,255,0.1)] border border-[var(--accent)]/20">
                
                <div class="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a12]/80">
                    <h2 class="text-xl font-bold tracking-widest text-[var(--text-bright)] flex items-center gap-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="23"></line>
                            <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                        MINDWAVE COACH
                    </h2>
                    <button id="closeCoachBtn" class="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div class="p-6 overflow-y-auto flex-1 custom-scrollbar">
                    <!-- Voice Atmosphere Header Card -->
                    <div class="mb-6 p-4 rounded-xl border border-white/10 bg-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                    <line x1="12" y1="19" x2="12" y2="23"></line>
                                    <line x1="8" y1="23" x2="16" y2="23"></line>
                                </svg>
                            </div>
                            <div>
                                <div class="flex items-center gap-2">
                                    <span class="text-sm font-semibold text-[var(--text-bright)]">Voice Guide Atmosphere</span>
                                    <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono tracking-wider uppercase border border-emerald-500/30">Natural & Calming</span>
                                </div>
                                <p class="text-xs text-[var(--text-muted)] mt-0.5">Humanized neural prosody with 432Hz harmonic acoustic warmth</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 w-full sm:w-auto">
                            <select id="voiceSelector" class="bg-black/70 border border-white/20 text-xs text-[var(--text-bright)] rounded-lg px-2.5 py-1.5 outline-none focus:border-[var(--accent)] transition-all flex-1 sm:w-48">
                                <option value="">Detecting calming voices...</option>
                            </select>
                            <button id="previewVoiceBtn" class="px-3 py-1.5 rounded-lg bg-[var(--accent)]/20 hover:bg-[var(--accent)]/30 text-[var(--accent)] border border-[var(--accent)]/30 text-xs font-medium transition-all shrink-0 flex items-center gap-1.5" title="Listen to calming voice preview">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                                Test
                            </button>
                        </div>
                    </div>

                    <p class="text-[var(--text-muted)] mb-4 text-xs uppercase tracking-wider font-semibold">Guided Audio Journeys</p>
                    
                    <div class="grid gap-4" id="journeysList">
                        <!-- Journeys injected here -->
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.getElementById('coachModal');
    const closeBtn = document.getElementById('closeCoachBtn');
    const journeysList = document.getElementById('journeysList');

    // Populate Journeys
    JOURNEYS.forEach(journey => {
        const durationMin = Math.round(journey.duration / 60);
        const card = document.createElement('div');
        card.className = "p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[var(--accent)]/40 transition-all cursor-pointer group flex items-start gap-4";
        card.innerHTML = `
            <div class="w-12 h-12 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${getCategoryIcon(journey.category)}
                </svg>
            </div>
            <div class="flex-1">
                <div class="flex justify-between items-center mb-1">
                    <h3 class="font-bold text-[var(--text-bright)] tracking-wide">${journey.title}</h3>
                    <span class="text-xs text-[var(--accent)] border border-[var(--accent)]/30 px-2 py-0.5 rounded-full uppercase tracking-wider">${durationMin} MIN</span>
                </div>
                <p class="text-sm text-[var(--text-muted)]">${journey.description}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            // Start the journey
            closeCoachModal();
            journeyEngine.startJourney(journey.id);
            
            // Ensure audio is playing
            const playBtn = document.getElementById('audioPlayBtn');
            if (playBtn && playBtn.querySelector('.play-icon:not(.hidden)')) {
                playBtn.click(); // Hacky but works for MVP to ensure audio starts
            }
        });

        journeysList.appendChild(card);
    });

    closeBtn.addEventListener('click', closeCoachModal);
    
    // Wire up Voice Atmosphere selector and live preview
    populateVoiceSelector();

    const voiceSelector = document.getElementById('voiceSelector');
    if (voiceSelector) {
        voiceSelector.addEventListener('change', (e) => {
            if (e.target.value) {
                voiceSynth.setVoice(e.target.value);
                voiceSynth.speak("Voice calibrated. Relax, and enjoy your session.");
            }
        });
    }

    const previewBtn = document.getElementById('previewVoiceBtn');
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            voiceSynth.speak("Welcome to your calm space. Breathe in slowly... and let your tension melt away.");
        });
    }

    // Add event listener to the main Coach button
    const mainCoachBtn = document.getElementById('coachBtn');
    if (mainCoachBtn) {
        mainCoachBtn.addEventListener('click', openCoachModal);
    }
}

function populateVoiceSelector() {
    const voiceSelector = document.getElementById('voiceSelector');
    if (!voiceSelector) return;

    const voices = voiceSynth.getVoices();
    if (!voices || !voices.length) {
        voiceSelector.innerHTML = '<option value="">Default Calming Voice</option>';
        return;
    }

    const currentVoiceName = voiceSynth.voice ? voiceSynth.voice.name : '';
    voiceSelector.innerHTML = voices.map(v => {
        const isSelected = v.name === currentVoiceName ? 'selected' : '';
        let cleanName = v.name
            .replace(/Microsoft /i, '')
            .replace(/Online \(Natural\)/i, '✨ Natural')
            .replace(/\(Enhanced\)/i, '✨ Enhanced')
            .replace(/\(Premium\)/i, '✨ Premium')
            .replace(/English \(United States\)/i, 'US')
            .replace(/English \(United Kingdom\)/i, 'UK');
        return `<option value="${v.name}" ${isSelected}>${cleanName}</option>`;
    }).join('');
}

function getCategoryIcon(category) {
    if (category === 'sleep') return '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    if (category === 'focus') return '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>';
    return '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>'; // default relax
}

export function openCoachModal() {
    const modal = document.getElementById('coachModal');
    if (modal) {
        populateVoiceSelector();
        modal.classList.remove('hidden');
        // Small delay to allow display:block to apply before animating opacity
        setTimeout(() => modal.classList.remove('opacity-0'), 10);
    }
}

export function closeCoachModal() {
    const modal = document.getElementById('coachModal');
    if (modal) {
        modal.classList.add('opacity-0');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}

export function playGreeting(intent) {
    const intentKey = intent || 'default';
    const greetings = INTENT_GREETINGS[intentKey] || INTENT_GREETINGS['default'];
    
    // Pick a random greeting for the intent to keep it fresh
    const randomIndex = Math.floor(Math.random() * greetings.length);
    const text = greetings[randomIndex];
    
    voiceSynth.speak(text);
}
