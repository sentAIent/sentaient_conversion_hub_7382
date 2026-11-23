/**
 * Spatial Audio Gyro Head-Tracking Module (State of the Art)
 * Captures real-time device orientation / AirPods motion via DeviceOrientationEvent
 * and dynamically shifts the 3D acoustic field for immersive spatial binaural beats.
 */

import { state } from '../state.js';
import { showToast } from '../utils/helpers.js';

class SpatialGyroService {
    constructor() {
        this.isActive = false;
        this.hasPermission = false;
        this.currentYaw = 0;   // alpha: 0 to 360
        this.currentPitch = 0; // beta: -180 to 180
        this.currentRoll = 0;  // gamma: -90 to 90
        
        // Low-pass smoothing factor (0 = static, 1 = instant)
        this.smoothing = 0.15;
        this.smoothedPan = 0;
        this.baselineGamma = null;

        this.onOrientationChange = this.handleOrientation.bind(this);
    }

    isEnabled() {
        return this.isActive;
    }

    isSupported() {
        return typeof window !== 'undefined' && 'DeviceOrientationEvent' in window;
    }

    async requestPermission() {
        if (!this.isSupported()) return false;

        // iOS 13+ requires explicit user gesture approval for motion sensors
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permissionState = await DeviceOrientationEvent.requestPermission();
                this.hasPermission = permissionState === 'granted';
                return this.hasPermission;
            } catch (err) {
                console.warn('[SpatialGyro] Permission request failed:', err);
                return false;
            }
        }
        
        // Android / Desktop / Standard
        this.hasPermission = true;
        return true;
    }

    async enable() {
        if (this.isActive) return true;

        const granted = await this.requestPermission();
        if (!granted) {
            showToast("Motion sensors permission denied.", "info");
            return false;
        }

        window.addEventListener('deviceorientation', this.onOrientationChange, true);
        this.isActive = true;
        state.spatialGyroActive = true;
        showToast("Spatial Head-Tracking Active 🎧", "success");
        return true;
    }

    disable() {
        if (!this.isActive) return;
        window.removeEventListener('deviceorientation', this.onOrientationChange, true);
        this.isActive = false;
        state.spatialGyroActive = false;
        this.baselineGamma = null;

        // Reset master pan smoothly to center (0)
        if (state.masterPanner && state.masterPanner.pan && state.audioCtx) {
            state.masterPanner.pan.setTargetAtTime(0, state.audioCtx.currentTime, 0.2);
        }
        showToast("Spatial Head-Tracking Paused", "info");
    }

    stop() {
        this.disable();
    }

    async toggle() {
        if (this.isActive) {
            this.disable();
            return { active: false };
        } else {
            const ok = await this.enable();
            return { active: ok };
        }
    }

    handleOrientation(event) {
        if (!event || event.gamma === null) return;

        this.currentYaw = event.alpha || 0;
        this.currentPitch = event.beta || 0;
        this.currentRoll = event.gamma || 0;

        // Gamma represents lateral head tilt / phone roll (-90 to +90 degrees)
        if (this.baselineGamma === null) {
            this.baselineGamma = event.gamma;
        }

        // Relative delta from natural listening posture
        const deltaRoll = event.gamma - this.baselineGamma;
        
        // Clamp to ±45 degrees and normalize to -1.0 .. +1.0 pan
        const rawPan = Math.max(-1.0, Math.min(1.0, deltaRoll / 45.0));

        // Exponential smoothing filter to eliminate jitter
        this.smoothedPan = this.smoothedPan + (rawPan - this.smoothedPan) * this.smoothing;

        // Modulate master spatial panner if playing
        if (state.masterPanner && state.masterPanner.pan && state.isPlaying && state.audioCtx) {
            state.masterPanner.pan.setTargetAtTime(this.smoothedPan, state.audioCtx.currentTime, 0.05);
        }

        // Modulate 3D Web Audio listener orientation if spatialEngine is initialized
        if (state.audioCtx && state.audioCtx.listener) {
            const listener = state.audioCtx.listener;
            const rad = (event.alpha || 0) * (Math.PI / 180);
            const fx = Math.sin(rad);
            const fz = -Math.cos(rad);
            if (listener.forwardX) {
                listener.forwardX.setTargetAtTime(fx, state.audioCtx.currentTime, 0.05);
                listener.forwardZ.setTargetAtTime(fz, state.audioCtx.currentTime, 0.05);
            }
        }
    }

    getState() {
        return {
            enabled: this.isActive,
            panX: this.smoothedPan,
            panY: 0,
            yaw: this.currentYaw,
            pitch: this.currentPitch,
            roll: this.currentRoll
        };
    }
}

export const spatialGyro = new SpatialGyroService();
