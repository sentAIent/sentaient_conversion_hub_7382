/**
 * Biofeedback Integration Service (State of the Art)
 * Connects to BLE Heart Rate Monitors (0x180D) and maps physiology to audio engine.
 */

import { state } from '../state.js';
import { updateFrequencies } from '../audio/engine.js';

class BiofeedbackService {
    constructor() {
        this.device = null;
        this.characteristic = null;
        this.isConnected = false;
        this.currentBpm = 0;
        this.baselineBpm = 0;
        this.isEntraining = false;
        
        // Entrainment limits
        this.targetBpm = 60; // Deep rest target
        this.entrainmentFactor = 0.5; // How strongly HR influences beat frequency (0-1)
        this.rrIntervals = [];
        this.currentHrv = 48; // RMSSD in ms
        this.stressScore = 35; // 0-100 scale
        this.isSimulated = false;
        this.simInterval = null;
    }

    async connect() {
        if (!navigator.bluetooth) {
            console.error('[Biofeedback] Web Bluetooth API not supported in this browser.');
            throw new Error('Web Bluetooth is not supported in this browser.');
        }

        try {
            console.log('[Biofeedback] Requesting Bluetooth Device...');
            this.device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['heart_rate'] }]
            });

            this.device.addEventListener('gattserverdisconnected', this.onDisconnected.bind(this));

            console.log('[Biofeedback] Connecting to GATT Server...');
            const server = await this.device.gatt.connect();

            console.log('[Biofeedback] Getting Heart Rate Service...');
            const service = await server.getPrimaryService('heart_rate');

            console.log('[Biofeedback] Getting Heart Rate Measurement Characteristic...');
            this.characteristic = await service.getCharacteristic('heart_rate_measurement');

            this.characteristic.addEventListener('characteristicvaluechanged', this.handleHeartRateMeasurement.bind(this));
            
            await this.characteristic.startNotifications();
            this.isConnected = true;
            console.log('[Biofeedback] Notifications started. Connected!');
            
            return true;

        } catch (error) {
            console.error('[Biofeedback] Connection failed!', error);
            this.isConnected = false;
            throw error;
        }
    }

    disconnect() {
        if (!this.device) {
            return;
        }
        console.log('[Biofeedback] Disconnecting...');
        if (this.device.gatt.connected) {
            this.device.gatt.disconnect();
        } else {
            console.log('[Biofeedback] Bluetooth Device is already disconnected');
        }
    }

    onDisconnected() {
        console.log('[Biofeedback] Device disconnected');
        this.isConnected = false;
        this.currentBpm = 0;
        this.isEntraining = false;
        
        // Dispatch event for UI
        window.dispatchEvent(new CustomEvent('biofeedback-disconnected'));
    }

    handleHeartRateMeasurement(event) {
        const value = event.target.value;
        // Parse Heart Rate Measurement value
        // The first byte contains flags
        const flags = value.getUint8(0);
        const rate16Bits = flags & 0x1;
        let heartRate;
        if (rate16Bits) {
            heartRate = value.getUint16(1, /*littleEndian=*/true);
        } else {
            heartRate = value.getUint8(1);
        }
        
        this.currentBpm = heartRate;
        if (this.baselineBpm === 0) {
            this.baselineBpm = heartRate;
        }

        // Parse RR-Intervals if present
        let offset = rate16Bits ? 3 : 2;
        if (flags & 0x08) offset += 2; // Energy Expended
        if (flags & 0x10) {
            while (offset + 1 < value.byteLength) {
                const rawRr = value.getUint16(offset, true);
                const rrMs = (rawRr / 1024) * 1000;
                this.recordRrInterval(rrMs);
                offset += 2;
            }
        }

        // Dispatch rich biometric event for UI updates
        window.dispatchEvent(new CustomEvent('biofeedback-update', { 
            detail: { 
                bpm: heartRate,
                hrv: this.currentHrv,
                stressScore: this.stressScore,
                isSimulated: this.isSimulated
            } 
        }));

        if (this.isEntraining) {
            this.applyEntrainment();
        }
    }

    recordRrInterval(rrMs) {
        if (!rrMs || rrMs < 300 || rrMs > 2000) return;
        this.rrIntervals.push(rrMs);
        if (this.rrIntervals.length > 30) this.rrIntervals.shift();
        
        if (this.rrIntervals.length >= 2) {
            let sumSqDiff = 0;
            for (let i = 1; i < this.rrIntervals.length; i++) {
                const diff = this.rrIntervals[i] - this.rrIntervals[i - 1];
                sumSqDiff += diff * diff;
            }
            this.currentHrv = Math.round(Math.sqrt(sumSqDiff / (this.rrIntervals.length - 1)));
        }
        
        const hrvFactor = Math.max(0, Math.min(100, 100 - (this.currentHrv * 1.4)));
        const bpmFactor = Math.max(0, Math.min(100, (this.currentBpm - 55) * 1.5));
        this.stressScore = Math.round((hrvFactor * 0.6) + (bpmFactor * 0.4));
    }

    startSimulation() {
        if (this.isConnected) this.disconnect();
        this.isSimulated = true;
        this.isConnected = true;
        let simPhase = 0;

        this.simInterval = setInterval(() => {
            simPhase += 0.15;
            // Simulated respiratory sinus arrhythmia (68 - 78 bpm wave)
            const simulatedBpm = Math.round(72 + Math.sin(simPhase) * 6 + (Math.random() * 2 - 1));
            const simulatedRr = Math.round((60000 / simulatedBpm) + Math.sin(simPhase * 1.2) * 25);
            
            this.currentBpm = simulatedBpm;
            this.recordRrInterval(simulatedRr);
            
            window.dispatchEvent(new CustomEvent('biofeedback-update', {
                detail: {
                    bpm: this.currentBpm,
                    hrv: this.currentHrv,
                    stressScore: this.stressScore,
                    isSimulated: true
                }
            }));

            if (this.isEntraining) {
                this.applyEntrainment();
            }
        }, 1000);

        window.dispatchEvent(new CustomEvent('biofeedback-connected', { detail: { isSimulated: true } }));
        return true;
    }

    stopSimulation() {
        if (this.simInterval) {
            clearInterval(this.simInterval);
            this.simInterval = null;
        }
        this.isSimulated = false;
        this.isConnected = false;
        this.currentBpm = 0;
        window.dispatchEvent(new CustomEvent('biofeedback-disconnected'));
    }

    async logMindfulSession(durationMinutes = 10) {
        console.log(`[Biofeedback] Logging ${durationMinutes} min Mindful Session to Health Data Store...`);
        const sessionRecord = {
            timestamp: Date.now(),
            durationMinutes,
            avgBpm: this.currentBpm || 70,
            avgHrv: this.currentHrv || 50,
            stressScore: this.stressScore || 30
        };

        try {
            // Local persistence
            const history = JSON.parse(localStorage.getItem('mindwave_health_sessions') || '[]');
            history.unshift(sessionRecord);
            if (history.length > 50) history.pop();
            localStorage.setItem('mindwave_health_sessions', JSON.stringify(history));

            // Optional Capacitor HealthKit Bridge
            if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.Plugins?.HealthKit) {
                await window.Capacitor.Plugins.HealthKit.saveMindfulSession({
                    startDate: new Date(Date.now() - durationMinutes * 60000).toISOString(),
                    endDate: new Date().toISOString()
                });
            }
        } catch (err) {
            console.warn('[Biofeedback] HealthKit session log fallback:', err);
        }
        return sessionRecord;
    }

    toggleEntrainment(active) {
        this.isEntraining = active;
        if (active) {
            console.log('[Biofeedback] Physiological Entrainment activated');
            this.applyEntrainment();
        } else {
            console.log('[Biofeedback] Physiological Entrainment deactivated');
        }
    }

    setTargetBpm(bpm) {
        this.targetBpm = bpm;
    }

    applyEntrainment() {
        if (!state.isPlaying || this.currentBpm === 0) return;

        // Calculate a dynamic binaural beat frequency based on the difference 
        // between current BPM and target BPM
        const diff = this.currentBpm - this.targetBpm;
        
        // If heart rate is high, use slower delta/theta waves to pull it down.
        // If heart rate is low and user wants energy, use beta/gamma.
        let dynamicBeatFreq;
        
        if (diff > 20) {
            // Highly elevated: deep Delta to heavily slow down
            dynamicBeatFreq = 2.5; 
        } else if (diff > 10) {
            // Moderately elevated: Theta to relax
            dynamicBeatFreq = 6.0;
        } else if (diff > 0) {
            // Slightly elevated: Alpha to center
            dynamicBeatFreq = 10.0;
        } else {
            // At or below target
            if (this.targetBpm > 80) {
                // Goal is active/focus
                dynamicBeatFreq = 18.0; // Beta
            } else {
                // Goal is rest/maintenance
                dynamicBeatFreq = 4.0; // Theta/Delta border
            }
        }

        // Apply a gentle lerp to the slider UI and engine to avoid jarring jumps
        const slider = document.getElementById('beatSlider');
        if (slider) {
            const currentVal = parseFloat(slider.value);
            // Move 10% towards the dynamic frequency
            const newVal = currentVal + ((dynamicBeatFreq - currentVal) * 0.1);
            
            slider.value = newVal;
            // Update UI value label
            const valLabel = document.getElementById('beatValue');
            if (valLabel) valLabel.textContent = `${newVal.toFixed(1)} Hz`;
            
            // Push to audio engine
            updateFrequencies();
        }
    }
}

export const biofeedback = new BiofeedbackService();
