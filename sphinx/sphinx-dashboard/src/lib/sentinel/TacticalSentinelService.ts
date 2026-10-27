"use client";

export type SentinelThreatType = 'alpr_camera' | 'crime_hotspot' | 'wildfire_vector' | 'aircraft_loiter';

export interface SentinelAlert {
  id: string;
  type: SentinelThreatType;
  title: string;
  description: string;
  distanceMeters: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: number;
  actionText?: string;
  targetCoords?: { lat: number; lng: number };
}

class TacticalSentinelEngine {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private speechAvailable: boolean = false;
  private lastAlertTimes: Record<string, number> = {};
  private activeAlerts: SentinelAlert[] = [];
  private listeners: Array<(alerts: SentinelAlert[]) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.speechAvailable = 'speechSynthesis' in window;
    }
  }

  private initAudio() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public subscribe(cb: (alerts: SentinelAlert[]) => void): () => void {
    this.listeners.push(cb);
    cb(this.activeAlerts);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb([...this.activeAlerts]));
  }

  public clearAlert(id: string) {
    this.activeAlerts = this.activeAlerts.filter(a => a.id !== id);
    this.notify();
  }

  /**
   * Cyber-tactical Audio Synthesis using native Web Audio API oscillators
   */
  public playTacticalSound(type: 'caution' | 'warning' | 'critical' | 'ping') {
    if (this.isMuted) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'ping') {
        // Radar sonar blip (880Hz to 1760Hz decaying)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'caution') {
        // Double pulse caution tone
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'warning') {
        // Tactical perimeter sweep (low sweep 300 to 650Hz)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(640, now + 0.3);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'critical') {
        // Emergency dual-tone siren
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.linearRampToValueAtTime(950, now + 0.15);
        osc.frequency.linearRampToValueAtTime(700, now + 0.3);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Tactical Voice Advisory using Speech Synthesis
   */
  public speakAdvisory(phrase: string) {
    if (this.isMuted || !this.speechAvailable || typeof window === 'undefined') return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.rate = 1.05;
      utterance.pitch = 0.95;
      utterance.volume = 0.85;
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }

  /**
   * Dispatches a prioritized tactical alert with rate limiting and audio cue
   */
  public triggerAlert(alert: Omit<SentinelAlert, 'timestamp'>) {
    const key = `${alert.type}-${alert.id}`;
    const now = Date.now();
    // 30-second cooldown per distinct threat node
    if (this.lastAlertTimes[key] && now - this.lastAlertTimes[key] < 30000) {
      return;
    }
    this.lastAlertTimes[key] = now;

    const fullAlert: SentinelAlert = { ...alert, timestamp: now };
    this.activeAlerts = [fullAlert, ...this.activeAlerts.filter(a => a.id !== alert.id)].slice(0, 3);
    this.notify();

    // Trigger audio & voice
    if (alert.severity === 'critical') {
      this.playTacticalSound('critical');
      this.speakAdvisory(`Perimeter Alert. ${alert.title}. ${alert.description}`);
    } else if (alert.severity === 'high') {
      this.playTacticalSound('warning');
      this.speakAdvisory(`Caution. ${alert.title}. Distance: ${Math.round(alert.distanceMeters)} meters.`);
    } else {
      this.playTacticalSound('caution');
    }
  }

  /**
   * Computes distance in meters between two lat/lng coordinates (Haversine formula)
   */
  public static calculateDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}

export const tacticalSentinel = new TacticalSentinelEngine();
