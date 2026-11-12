// AutoTourManager.js
// Autonomous Tour Engine for SentAIent Quantum Wormhole 3D Experience
// Guides users sequentially through all 16 worlds and their connecting wormholes
// with configurable pause durations, live countdowns, and instant manual forward progression.

import { STATIONS, goToStation } from './WaypointNavigator';
import { clearActiveWorldPause } from './WorldPauseManager';

const STORAGE_KEY = 'sentient_tour_seconds';
const DEFAULT_SECONDS = 8;
const MIN_SECONDS = 3;
const MAX_SECONDS = 60;

class AutoTourEngine {
  constructor() {
    this.isActive = false;
    this.isPaused = false;
    this.isTransit = false;
    this.seconds = this.loadSavedSeconds();
    this.remainingSeconds = this.seconds;
    this.currentStationIndex = 0;
    this.timerId = null;
    this.subscribers = new Set();
  }

  loadSavedSeconds() {
    if (typeof window === 'undefined') return DEFAULT_SECONDS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= MIN_SECONDS && parsed <= MAX_SECONDS) {
          return parsed;
        }
      }
    } catch (e) {
      // Fallback
    }
    return DEFAULT_SECONDS;
  }

  saveSeconds(val) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, String(val));
    } catch (e) {
      // Fallback
    }
  }

  getState() {
    return {
      isActive: this.isActive,
      isPaused: this.isPaused,
      isTransit: this.isTransit,
      seconds: this.seconds,
      remainingSeconds: this.remainingSeconds,
      currentStationIndex: this.currentStationIndex,
      totalStations: STATIONS.length - 1, // 16 worlds (excluding Hub at 0)
      station: STATIONS[this.currentStationIndex] || null
    };
  }

  notify() {
    const state = this.getState();
    this.subscribers.forEach(cb => {
      try { cb(state); } catch (e) { console.error(e); }
    });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('autotour:update', { detail: state }));
      window._isAutoTourActive = this.isActive;
      window._autoTourSeconds = this.seconds;
      window._autoTourRemaining = this.remainingSeconds;
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.getState());
    return () => this.subscribers.delete(callback);
  }

  setSeconds(sec) {
    const clamped = Math.max(MIN_SECONDS, Math.min(MAX_SECONDS, Math.round(sec)));
    const diff = clamped - this.seconds;
    this.seconds = clamped;
    this.saveSeconds(clamped);
    if (this.isActive && !this.isTransit) {
      this.remainingSeconds = Math.max(1, Math.min(clamped, this.remainingSeconds + diff));
    } else {
      this.remainingSeconds = clamped;
    }
    this.notify();
  }

  adjustSeconds(delta) {
    this.setSeconds(this.seconds + delta);
  }

  startTour(startIndex = null) {
    this.clearTimer();
    this.isActive = true;
    this.isPaused = false;
    
    // Determine start station
    let startIdx = 1;
    if (startIndex !== null && startIndex >= 1 && startIndex < STATIONS.length) {
      startIdx = startIndex;
    } else if (window._currentStationIndex && window._currentStationIndex >= 1 && window._currentStationIndex < STATIONS.length) {
      startIdx = window._currentStationIndex;
    }

    this.currentStationIndex = startIdx;
    this.remainingSeconds = this.seconds;
    this.notify();

    // Check distance to target station
    const curP = (window._isTransitActive && window._warpProgress !== undefined)
      ? window._warpProgress 
      : (window._currentProgress !== undefined ? window._currentProgress : 0);

    const targetStation = STATIONS[startIdx];
    if (Math.abs(curP - targetStation.p) > 0.015) {
      this.flyToStation(startIdx);
    } else {
      this.startCountdown();
    }
  }

  stopTour() {
    this.clearTimer();
    this.isActive = false;
    this.isPaused = false;
    this.isTransit = false;
    this.notify();
  }

  togglePause() {
    if (!this.isActive) return;
    this.isPaused = !this.isPaused;
    this.notify();
  }

  clearTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  flyToStation(stationIndex) {
    this.clearTimer();
    this.isTransit = true;
    this.currentStationIndex = stationIndex;
    this.remainingSeconds = this.seconds;
    this.notify();

    // Use forceSequential = true so it flies sequentially through connecting wormhole (half speed)
    goToStation(stationIndex, 4000, () => {
      this.isTransit = false;
      this.currentStationIndex = stationIndex;
      this.remainingSeconds = this.seconds;
      this.notify();

      if (stationIndex === 2 && window._icebreakerMeltState !== 'completed') {
        // Wait for the ice cave to thaw into the island before starting the world dwell countdown
        const checkMelt = setInterval(() => {
          if (!this.isActive || this.currentStationIndex !== 2) {
            clearInterval(checkMelt);
            return;
          }
          if (window._icebreakerMeltState === 'completed') {
            clearInterval(checkMelt);
            this.startCountdown();
          }
        }, 150);
      } else {
        this.startCountdown();
      }
    }, true);
  }

  startCountdown() {
    this.clearTimer();
    this.remainingSeconds = this.seconds;
    this.notify();

    const startTs = Date.now();
    const durationMs = this.seconds * 1000;

    this.timerId = setInterval(() => {
      if (!this.isActive) {
        this.clearTimer();
        return;
      }
      if (this.isPaused) return; // Frozen while paused

      const elapsed = Date.now() - startTs;
      const leftMs = Math.max(0, durationMs - elapsed);
      const leftSec = Math.ceil(leftMs / 1000);

      if (leftSec !== this.remainingSeconds) {
        this.remainingSeconds = leftSec;
        this.notify();
      }

      if (leftMs <= 0) {
        this.clearTimer();
        this.nextWorld();
      }
    }, 200);
  }

  nextWorld() {
    this.clearTimer();
    clearActiveWorldPause();

    if (!this.isActive) {
      // If tour was not active, start it and advance to next world
      const currentIdx = window._currentStationIndex || 0;
      const nextIdx = currentIdx < STATIONS.length - 1 ? currentIdx + 1 : 1;
      this.startTour(nextIdx);
      return;
    }

    const nextIdx = this.currentStationIndex + 1;
    if (nextIdx < STATIONS.length) {
      // Fly to next world
      this.flyToStation(nextIdx);
    } else {
      // Tour completed all 16 worlds! Return to Hub
      this.isTransit = true;
      this.notify();
      goToStation(0, 1400, () => {
        this.stopTour();
        window._currentStationIndex = 0;
        window._snapCamera = true;
      });
    }
  }

  prevWorld() {
    if (this.currentStationIndex > 1) {
      this.clearTimer();
      clearActiveWorldPause();
      this.flyToStation(this.currentStationIndex - 1);
    }
  }
}

export const AutoTourManager = new AutoTourEngine();

if (typeof window !== 'undefined') {
  window.AutoTourManager = AutoTourManager;
  window._isAutoTourActive = false;
  window._autoTourNext = () => AutoTourManager.nextWorld();
  window._autoTourStop = () => AutoTourManager.stopTour();
  window._autoTourStart = (idx) => AutoTourManager.startTour(idx);
}

export default AutoTourManager;
