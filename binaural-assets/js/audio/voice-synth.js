import { state } from '../state.js';

export class VoiceSynth {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.voice = null;
        this.isSpeaking = false;
        
        // Load voices
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => this._loadVoices();
        }
        this._loadVoices();
    }

    _loadVoices() {
        this.voices = this.synth.getVoices();
        // Try to find a soothing voice (e.g., a calm female or specific high-quality voice)
        // This is highly browser-dependent.
        this.voice = this.voices.find(v => v.name.includes('Samantha') || v.name.includes('Google US English') || v.name.includes('Daniel') || v.name.includes('Serena')) || this.voices[0];
    }

    /**
     * Speaks a text string. Handles ducking the master audio volume.
     * @param {string} text 
     * @returns {Promise<void>} Resolves when speaking is finished
     */
    speak(text) {
        return new Promise((resolve) => {
            if (this.synth.speaking) {
                this.synth.cancel(); // Cancel any ongoing speech
            }

            if (!text || text.trim() === '') {
                resolve();
                return;
            }

            const utterance = new SpeechSynthesisUtterance(text);
            if (this.voice) {
                utterance.voice = this.voice;
            }
            // Soothing settings
            utterance.rate = 0.85; // Slightly slower
            utterance.pitch = 0.9; // Slightly lower pitch
            utterance.volume = 1.0;

            utterance.onstart = () => {
                this.isSpeaking = true;
                this._duckAudio(true);
            };

            utterance.onend = () => {
                this.isSpeaking = false;
                this._duckAudio(false);
                resolve();
            };

            utterance.onerror = (e) => {
                console.error("[VoiceSynth] Speech error", e);
                this.isSpeaking = false;
                this._duckAudio(false);
                resolve();
            };

            this.synth.speak(utterance);
        });
    }

    /**
     * Lowers the master audio volume slightly to make the voice clearer.
     * @param {boolean} duck 
     */
    _duckAudio(duck) {
        if (!state.audioCtx || !state.masterGain) return;
        
        const now = state.audioCtx.currentTime;
        const currentVol = state.masterGain.gain.value;
        const masterSliderVol = parseFloat(document.getElementById('masterVolSlider')?.value || 1.0);
        
        // Cancel any pending fades
        state.masterGain.gain.cancelScheduledValues(now);
        state.masterGain.gain.setValueAtTime(currentVol, now);

        if (duck) {
            // Duck to 40% of the current master volume
            const duckVol = masterSliderVol * 0.4;
            state.masterGain.gain.linearRampToValueAtTime(duckVol, now + 0.5);
        } else {
            // Restore to slider volume
            state.masterGain.gain.linearRampToValueAtTime(masterSliderVol, now + 1.0);
        }
    }

    stop() {
        if (this.synth.speaking) {
            this.synth.cancel();
        }
        this.isSpeaking = false;
        this._duckAudio(false);
    }
}

// Export a singleton instance
export const voiceSynth = new VoiceSynth();
