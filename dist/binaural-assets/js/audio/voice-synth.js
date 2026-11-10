import { state } from '../state.js';

export class VoiceSynth {
    constructor() {
        this.synth = typeof window !== 'undefined' ? (window.speechSynthesis || null) : null;
        this.voices = [];
        this.voice = null;
        this.isSpeaking = false;
        
        // Load voices safely
        if (this.synth && typeof this.synth.onvoiceschanged !== 'undefined') {
            this.synth.onvoiceschanged = () => this._loadVoices();
        }
        if (this.synth) {
            this._loadVoices();
            if (typeof window !== 'undefined') {
                setTimeout(() => this._loadVoices(), 350);
                setTimeout(() => this._loadVoices(), 1200);
            }
        }
    }

    /**
     * Evaluates and scores every voice to find genuine, natural, soothing human voices.
     * Severely penalizes legacy, compact, robotic, or metallic speech synthesizers.
     */
    _scoreVoice(v) {
        if (!v) return -999;
        const name = (v.name || '').toLowerCase();
        const lang = (v.lang || '').toLowerCase();
        const uri = (v.voiceURI || '').toLowerCase();

        // Check for user-saved voice preference in localStorage
        const savedPref = (typeof localStorage !== 'undefined') ? localStorage.getItem('mindwave_preferred_voice_name') : null;
        if (savedPref && (v.name === savedPref || v.voiceURI === savedPref)) {
            return 10000;
        }

        let score = 0;

        // Strongly prioritize English voices (match en-US, en-GB, en-AU, en-CA, en-IE)
        if (lang.startsWith('en')) {
            score += 35;
        } else {
            score -= 100;
        }

        // Heavy penalty for archaic, compact, and robotic synthesizers
        if (name.includes('compact') || uri.includes('compact')) score -= 90;
        if (name.includes('espeak')) score -= 180;
        if (name.includes('david') && !name.includes('natural')) score -= 70;
        if (name.includes('zira') && !name.includes('natural')) score -= 70;
        if (name.includes('mark') && !name.includes('natural')) score -= 70;

        // Samantha without Enhanced/Premium is the notorious legacy 2003 robotic voice
        if (name.includes('samantha') && !name.includes('enhanced') && !name.includes('premium')) {
            score -= 80;
        }

        // Disqualify system novelty / joke voices
        const noveltyNames = [
            'bad news', 'bahh', 'bells', 'boing', 'bubbles', 'cellos',
            'deranged', 'good news', 'hysterical', 'junior', 'pipe organ',
            'princess', 'ralph', 'trinoids', 'whisper', 'zarvox',
            'albert', 'fred', 'victoria', 'kathy', 'agnes', 'bruce', 'vicki'
        ];
        if (noveltyNames.some(n => name.includes(n))) {
            score -= 300;
        }

        // Tier 1: True Neural & Natural Online Voices (Edge, Chrome, Windows Natural, Apple Neural)
        if (name.includes('natural') || uri.includes('natural')) score += 60;
        if (name.includes('neural') || uri.includes('neural')) score += 60;
        if (name.includes('premium')) score += 55;
        if (name.includes('enhanced')) score += 50;
        if (name.includes('studio') || name.includes('wavenet')) score += 45;

        // High-praise calming human voices:
        // 1. Google UK English Female (soothing, calm British mindfulness tone - acclaimed for meditation)
        if (name.includes('google uk english female')) score += 65;
        if (name.includes('google us english') && (name.includes('natural') || name.includes('neural'))) score += 50;

        // 2. Microsoft Natural Voices (Jenny, Aria, Sonia, Libby, Guy)
        if (name.includes('jenny')) score += 55;
        if (name.includes('aria')) score += 50;
        if (name.includes('sonia')) score += 50;
        if (name.includes('libby')) score += 45;

        // 3. Apple Neural Voices (Ava, Zoe, Allison, Serena, Siri, Susan, Kate, Moira)
        if (name.includes('ava')) score += 52;
        if (name.includes('zoe')) score += 50;
        if (name.includes('allison')) score += 48;
        if (name.includes('siri')) score += 46;
        if (name.includes('serena')) score += 44;
        if (name.includes('susan')) score += 40;
        if (name.includes('kate')) score += 38;
        if (name.includes('moira')) score += 38;
        if (name.includes('daniel') && (name.includes('enhanced') || name.includes('natural') || name.includes('premium'))) score += 38;

        // Gentle female voice bonus (clinically optimal for parasympathetic relaxation & vagal tone)
        if (name.includes('female') || name.includes('woman')) score += 15;

        return score;
    }

    _loadVoices() {
        if (!this.synth || typeof this.synth.getVoices !== 'function') return;
        const allVoices = this.synth.getVoices() || [];
        if (!allVoices.length) return;

        // Sort voices descending by score
        this.voices = [...allVoices].sort((a, b) => this._scoreVoice(b) - this._scoreVoice(a));

        // Choose the highest scoring voice
        if (this.voices.length > 0) {
            this.voice = this.voices[0];
            console.log(`[VoiceSynth] Calming Human Voice selected: "${this.voice.name}" (${this.voice.lang}) - Score: ${this._scoreVoice(this.voice)}`);
        }
    }

    /**
     * Returns curated list of available calming voices suitable for mindfulness
     */
    getVoices() {
        if (!this.voices || !this.voices.length) {
            this._loadVoices();
        }
        return this.voices.filter(v => this._scoreVoice(v) > 0);
    }

    setVoice(voiceName) {
        if (!this.voices || !this.voices.length) {
            this._loadVoices();
        }
        const found = this.voices.find(v => v.name === voiceName || v.voiceURI === voiceName);
        if (found) {
            this.voice = found;
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('mindwave_preferred_voice_name', found.name);
            }
            console.log(`[VoiceSynth] Preferred voice set to: ${found.name}`);
            return true;
        }
        return false;
    }

    /**
     * Humanizes punctuation to create natural breath pauses and eliminate robotic rushes.
     */
    _humanizeText(text) {
        if (!text) return '';
        return text
            // Turn trailing ellipses into a natural breath comma
            .replace(/\.{3,}/g, ', ')
            // Add slight pauses after sentences for meditative breathing
            .replace(/([.!?])\s+/g, '$1  ')
            // Smooth out hyphens into soft pauses
            .replace(/ - /g, ', ')
            .trim();
    }

    /**
     * Plays a soft, warm harmonic resonance chime (432Hz Solfeggio) via Web Audio
     * before speech begins to cushion the transition and soothe the listener.
     */
    _playWarmChime() {
        if (!state.audioCtx || state.audioCtx.state !== 'running') return;
        try {
            const ctx = state.audioCtx;
            const now = ctx.currentTime;

            // Warm sine oscillator at 432 Hz (Grounding alpha harmonic)
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(432, now);
            // Subtle pitch decay to 216 Hz (warm sub-octave)
            osc.frequency.exponentialRampToValueAtTime(216, now + 0.6);

            // Gentle low-pass filter to remove any digital edge
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1200, now);
            filter.Q.setValueAtTime(1.0, now);

            // Smooth envelope (subtle whisper in the background)
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.05, now + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(state.masterGain || ctx.destination);

            osc.start(now);
            osc.stop(now + 0.8);
        } catch (e) {
            // Non-critical, audio context may be suspended or awaiting user gesture
        }
    }

    /**
     * Speaks a text string. Handles ducking the master audio volume.
     * @param {string} text 
     * @returns {Promise<void>} Resolves when speaking is finished
     */
    speak(text) {
        return new Promise((resolve) => {
            if (!this.synth || typeof SpeechSynthesisUtterance === 'undefined') {
                resolve();
                return;
            }

            // Always ensure voice list is loaded
            if (!this.voice || !this.voices.length) {
                this._loadVoices();
            }

            if (this.synth.speaking || this.synth.pending) {
                this.synth.cancel(); // Cancel any ongoing speech cleanly
            }

            if (!text || text.trim() === '') {
                resolve();
                return;
            }

            const humanizedText = this._humanizeText(text);
            const utterance = new SpeechSynthesisUtterance(humanizedText);

            if (this.voice) {
                utterance.voice = this.voice;
            }

            // Human, Calming prosody settings:
            // - pitch = 1.0: Preserves authentic vocal tract formants (NEVER < 1.0 which causes robotic distortion)
            // - rate = 0.94: Unhurried, serene, grounded human breathing rhythm
            // - volume = 0.95: Gentle on headphones without harsh digital transients
            utterance.pitch = 1.0;
            utterance.rate = 0.94;
            utterance.volume = 0.95;

            // Play soothing warm acoustic cushion
            this._playWarmChime();

            utterance.onstart = () => {
                this.isSpeaking = true;
                this.currentUtterance = utterance;
                this._duckAudio(true);
            };

            const cleanup = () => {
                this.isSpeaking = false;
                this.currentUtterance = null;
                this._duckAudio(false);
                resolve();
            };

            utterance.onend = cleanup;

            utterance.onerror = (e) => {
                // Ignore normal cancellation/interruption
                if (e.error !== 'interrupted' && e.error !== 'canceled') {
                    console.warn("[VoiceSynth] Speech event:", e.error);
                }
                cleanup();
            };

            try {
                this.synth.speak(utterance);
            } catch (err) {
                console.error("[VoiceSynth] Speak failed:", err);
                cleanup();
            }
        });
    }

    /**
     * Gently cushions master audio with a natural S-curve rather than an abrupt drop.
     * @param {boolean} duck 
     */
    _duckAudio(duck) {
        if (!state.audioCtx || !state.masterGain) return;
        try {
            const now = state.audioCtx.currentTime;
            const currentVol = state.masterGain.gain.value;
            const parsedVol = parseFloat(document.getElementById('masterVolSlider')?.value);
            const masterSliderVol = isNaN(parsedVol) ? 1.0 : Math.max(0, Math.min(1, parsedVol));
            
            // Cancel any pending fades
            state.masterGain.gain.cancelScheduledValues(now);
            state.masterGain.gain.setValueAtTime(currentVol, now);

            if (duck) {
                // Gentle cushion duck: 65% of volume so the ambient binaural soundscape remains enveloping
                const duckVol = masterSliderVol * 0.65;
                state.masterGain.gain.linearRampToValueAtTime(duckVol, now + 0.7);
            } else {
                // Restore to slider volume only if audio is still actively playing
                if (!state.isPlaying) return;
                // Soft, meditative 1.6s return to full volume
                state.masterGain.gain.linearRampToValueAtTime(masterSliderVol, now + 1.6);
            }
        } catch (e) {}
    }

    stop() {
        if (this.synth) {
            try {
                this.synth.cancel();
            } catch (e) {}
        }
        this.isSpeaking = false;
        this.currentUtterance = null;
        this._duckAudio(false);
    }
}

// Export a singleton instance
export const voiceSynth = new VoiceSynth();
