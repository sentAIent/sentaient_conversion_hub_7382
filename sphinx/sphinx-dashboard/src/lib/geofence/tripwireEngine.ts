// tripwireEngine.ts
// Tactical Tripwire & Perimeter Vector Geofencing Engine
// Detects line crossings, perimeter intrusions, and fires synthesized tactical alarm audio

export interface TacticalTripwire {
  id: string;
  name: string;
  pointA: [number, number]; // [lon, lat]
  pointB: [number, number]; // [lon, lat]
  isArmed: boolean;
  threatLevel: 'PERIMETER_OUTER' | 'PERIMETER_INNER' | 'CRITICAL_BREACH';
  breachCount: number;
  lastBreachTime: string | null;
  lastBreachTrack?: string;
}

export interface BreachEvent {
  id: string;
  tripwireId: string;
  tripwireName: string;
  threatLevel: 'PERIMETER_OUTER' | 'PERIMETER_INNER' | 'CRITICAL_BREACH';
  timestamp: string;
  coordinate: [number, number];
  trackId: string;
  trackType: 'AIRCRAFT' | 'DRONE' | 'GROUND_UNIT' | 'WILDFIRE_FRONT';
}

export class TacticalTripwireEngine {
  private static instance: TacticalTripwireEngine | null = null;
  private tripwires: TacticalTripwire[] = [
    {
      id: 'tw-outer-north',
      name: 'North Outer Perimeter Tripwire',
      pointA: [-105.02, 39.76],
      pointB: [-104.96, 39.76],
      isArmed: true,
      threatLevel: 'PERIMETER_OUTER',
      breachCount: 1,
      lastBreachTime: '10m ago',
      lastBreachTrack: 'CIVIL_AIRCRAFT_N492'
    },
    {
      id: 'tw-inner-east',
      name: 'East Compound Critical Line',
      pointA: [-104.97, 39.73],
      pointB: [-104.97, 39.75],
      isArmed: true,
      threatLevel: 'CRITICAL_BREACH',
      breachCount: 0,
      lastBreachTime: null
    },
    {
      id: 'tw-south-valley',
      name: 'South Valley River Approach',
      pointA: [-105.01, 39.71],
      pointB: [-104.97, 39.71],
      isArmed: false,
      threatLevel: 'PERIMETER_INNER',
      breachCount: 0,
      lastBreachTime: null
    }
  ];

  private breachLog: BreachEvent[] = [
    {
      id: 'breach-1',
      tripwireId: 'tw-outer-north',
      tripwireName: 'North Outer Perimeter Tripwire',
      threatLevel: 'PERIMETER_OUTER',
      timestamp: '12:15:32',
      coordinate: [-104.985, 39.76],
      trackId: 'N492-C172',
      trackType: 'AIRCRAFT'
    }
  ];

  private listeners: ((tripwires: TacticalTripwire[], log: BreachEvent[]) => void)[] = [];

  public static getInstance(): TacticalTripwireEngine {
    if (!TacticalTripwireEngine.instance) {
      TacticalTripwireEngine.instance = new TacticalTripwireEngine();
    }
    return TacticalTripwireEngine.instance;
  }

  public subscribe(listener: (tripwires: TacticalTripwire[], log: BreachEvent[]) => void): () => void {
    this.listeners.push(listener);
    listener(this.tripwires, this.breachLog);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l([...this.tripwires], [...this.breachLog]));
  }

  public toggleArm(id: string) {
    const tw = this.tripwires.find(t => t.id === id);
    if (tw) {
      tw.isArmed = !tw.isArmed;
      this.notify();
    }
  }

  public armAll(armed: boolean) {
    this.tripwires.forEach(t => (t.isArmed = armed));
    this.notify();
  }

  /**
   * Evaluates if a track vector crossed an armed tripwire.
   */
  public checkCrossing(
    p1: [number, number],
    p2: [number, number],
    trackId: string,
    trackType: 'AIRCRAFT' | 'DRONE' | 'GROUND_UNIT' | 'WILDFIRE_FRONT'
  ): BreachEvent | null {
    for (const tw of this.tripwires) {
      if (!tw.isArmed) continue;
      if (this.segmentsIntersect(p1, p2, tw.pointA, tw.pointB)) {
        tw.breachCount++;
        tw.lastBreachTime = new Date().toLocaleTimeString();
        tw.lastBreachTrack = trackId;

        const event: BreachEvent = {
          id: `breach-${Date.now()}`,
          tripwireId: tw.id,
          tripwireName: tw.name,
          threatLevel: tw.threatLevel,
          timestamp: new Date().toLocaleTimeString(),
          coordinate: p2,
          trackId,
          trackType
        };

        this.breachLog = [event, ...this.breachLog.slice(0, 49)];
        this.playTacticalAlarm(tw.threatLevel);
        this.notify();
        return event;
      }
    }
    return null;
  }

  /**
   * Fires synthesized tactical alert pulses via Web Audio API.
   */
  public playTacticalAlarm(level: 'PERIMETER_OUTER' | 'PERIMETER_INNER' | 'CRITICAL_BREACH') {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const freq = level === 'CRITICAL_BREACH' ? 960 : level === 'PERIMETER_INNER' ? 720 : 540;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.15);
      osc.frequency.setValueAtTime(freq, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (_) {}
  }

  private segmentsIntersect(
    p1: [number, number],
    p2: [number, number],
    p3: [number, number],
    p4: [number, number]
  ): boolean {
    const ccw = (a: [number, number], b: [number, number], c: [number, number]) => {
      return (c[1] - a[1]) * (b[0] - a[0]) > (b[1] - a[1]) * (c[0] - a[0]);
    };
    return ccw(p1, p3, p4) !== ccw(p2, p3, p4) && ccw(p1, p2, p3) !== ccw(p1, p2, p4);
  }
}
