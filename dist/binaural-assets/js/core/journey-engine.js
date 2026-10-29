import { JOURNEYS } from '../data/journeys.js';
import { voiceSynth } from '../audio/voice-synth.js';
import { updateFrequencies } from '../audio/engine.js';
// Visual import removed to fix crash
import { els, state } from '../state.js';

export class JourneyEngine {
    constructor() {
        this.activeJourney = null;
        this.startTime = 0;
        this.intervalId = null;
        this.nextEventIndex = 0;
    }

    startJourney(journeyId) {
        this.stopJourney(); // Stop any existing

        const journey = JOURNEYS.find(j => j.id === journeyId);
        if (!journey) {
            console.error(`[JourneyEngine] Journey ${journeyId} not found.`);
            return;
        }

        this.activeJourney = journey;
        this.nextEventIndex = 0;
        this.startTime = performance.now();
        
        console.log(`[JourneyEngine] Starting journey: ${journey.title}`);

        // Start checking the timeline every second
        this.intervalId = setInterval(() => this._tick(), 1000);
        
        // Ensure audio is playing. The UI should have called startAudio already, but just in case.
        if (!state.isPlaying) {
            console.warn('[JourneyEngine] Audio is not playing! User must interact first.');
        }

        // Fire the first tick immediately
        this._tick();
    }

    stopJourney() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        if (this.activeJourney) {
            console.log(`[JourneyEngine] Stopped journey: ${this.activeJourney.title}`);
            this.activeJourney = null;
        }
        voiceSynth.stop();
    }

    _tick() {
        if (!this.activeJourney) return;

        const now = performance.now();
        const elapsedSec = (now - this.startTime) / 1000;

        // Process all events that are due
        while (this.nextEventIndex < this.activeJourney.timeline.length) {
            const event = this.activeJourney.timeline[this.nextEventIndex];
            
            if (elapsedSec >= event.time) {
                this._executeEvent(event);
                this.nextEventIndex++;
            } else {
                break; // Event is in the future
            }
        }

        // Check if journey is finished
        if (elapsedSec >= this.activeJourney.duration) {
            console.log(`[JourneyEngine] Journey complete: ${this.activeJourney.title}`);
            this.stopJourney();
            
            // Optional: trigger a UI event
            window.dispatchEvent(new CustomEvent('journeyComplete', { detail: { id: this.activeJourney.id } }));
        }
    }

    _executeEvent(event) {
        console.log(`[JourneyEngine] Executing event at ${event.time}s: ${event.action}`);

        switch (event.action) {
            case 'set_frequency':
                if (els.baseSlider) {
                    els.baseSlider.value = event.baseFreq;
                    const event1 = new Event('input');
                    els.baseSlider.dispatchEvent(event1);
                }
                if (els.beatSlider) {
                    els.beatSlider.value = event.beatFreq;
                    const event2 = new Event('input');
                    els.beatSlider.dispatchEvent(event2);
                }
                updateFrequencies();
                break;
            
            case 'set_visual':
                // if (typeof setVisualMode === 'function') {
                //     // setVisualMode(mode, targetConfig, bypassDelay)
                //     setVisualMode(event.visualMode, null, true);
                // }
                break;
            
            case 'speak':
                voiceSynth.speak(event.text);
                break;
                
            default:
                console.warn(`[JourneyEngine] Unknown action: ${event.action}`);
        }
    }
}

export const journeyEngine = new JourneyEngine();
