import { state, els } from '../state.js';
import { updateFrequencies } from '../audio/engine.js';

export class BiometricService {
    constructor() {
        this.device = null;
        this.server = null;
        this.characteristic = null;
        this.isConnecting = false;
        this.heartRate = 0;
        this.listeners = [];
        this.activeIntent = 'relax'; // Default
    }

    setIntent(intent) {
        this.activeIntent = intent;
    }

    async connect() {
        if (!navigator.bluetooth) {
            alert('Web Bluetooth is not supported in this browser. Please use Chrome on Android or Desktop.');
            return false;
        }

        try {
            this.isConnecting = true;
            this.notifyListeners('connecting');

            console.log('[Biometrics] Requesting Bluetooth Device...');
            this.device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['heart_rate'] }]
            });

            console.log('[Biometrics] Connecting to GATT Server...');
            this.server = await this.device.gatt.connect();

            console.log('[Biometrics] Getting Heart Rate Service...');
            const service = await this.server.getPrimaryService('heart_rate');

            console.log('[Biometrics] Getting Heart Rate Measurement Characteristic...');
            this.characteristic = await service.getCharacteristic('heart_rate_measurement');

            await this.characteristic.startNotifications();
            this.characteristic.addEventListener('characteristicvaluechanged', this.handleHeartRateData.bind(this));
            
            this.device.addEventListener('gattserverdisconnected', this.handleDisconnect.bind(this));

            this.isConnecting = false;
            this.notifyListeners('connected');
            console.log('[Biometrics] Successfully connected and receiving data.');
            return true;
        } catch (error) {
            console.error('[Biometrics] Connection failed:', error);
            this.isConnecting = false;
            this.notifyListeners('error', error);
            return false;
        }
    }

    disconnect() {
        if (!this.device) return;
        console.log('[Biometrics] Disconnecting...');
        if (this.device.gatt.connected) {
            this.device.gatt.disconnect();
        }
    }

    handleDisconnect() {
        console.log('[Biometrics] Device disconnected.');
        this.device = null;
        this.server = null;
        this.characteristic = null;
        this.heartRate = 0;
        this.notifyListeners('disconnected');
    }

    handleHeartRateData(event) {
        const value = event.target.value;
        const flags = value.getUint8(0);
        const rate16Bits = flags & 0x1;
        
        if (rate16Bits) {
            this.heartRate = value.getUint16(1, /*littleEndian=*/true);
        } else {
            this.heartRate = value.getUint8(1);
        }
        
        console.log(`[Biometrics] Heart Rate: ${this.heartRate} BPM`);
        this.notifyListeners('data', this.heartRate);
        
        this.adaptiveAudioLoop(this.heartRate);
    }

    adaptiveAudioLoop(hr) {
        if (!state.isPlaying) return;

        // If user wants to relax, and HR is high, lower the binaural target frequency
        if (this.activeIntent === 'relax' || this.activeIntent === 'sleep' || this.activeIntent === 'healing') {
            if (hr > 80) {
                // High heart rate, gently pull them down into Theta (4-7Hz)
                const currentBeat = parseFloat(els.beatSlider.value);
                if (currentBeat > 6) {
                    els.beatSlider.value = (currentBeat - 0.2).toFixed(2); // Slow drift down
                    if (els.beatVal) els.beatVal.textContent = els.beatSlider.value + 'Hz';
                    updateFrequencies();
                }
            }
        }
        
        // If user wants energy/focus, and HR is low, raise it slightly
        if (this.activeIntent === 'focus' || this.activeIntent === 'energy') {
            if (hr < 65) {
                // Low heart rate, pull them up into Beta/Gamma (15-30Hz)
                const currentBeat = parseFloat(els.beatSlider.value);
                if (currentBeat < 20) {
                    els.beatSlider.value = (currentBeat + 0.2).toFixed(2); // Slow drift up
                    if (els.beatVal) els.beatVal.textContent = els.beatSlider.value + 'Hz';
                    updateFrequencies();
                }
            }
        }
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }

    notifyListeners(event, data) {
        this.listeners.forEach(cb => cb(event, data));
    }
}

export const biometrics = new BiometricService();
