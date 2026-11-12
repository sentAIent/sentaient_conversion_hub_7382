import React, { useState, useEffect } from 'react';
import { TacticalTripwireEngine, TacticalTripwire, BreachEvent } from '../../lib/geofence/tripwireEngine';
import { Shield, ShieldAlert, Volume2, Bell, AlertTriangle, Eye, Crosshair } from 'lucide-react';

export const PerimeterTripwirePanel: React.FC = () => {
  const engine = TacticalTripwireEngine.getInstance();
  const [tripwires, setTripwires] = useState<TacticalTripwire[]>([]);
  const [breachLog, setBreachLog] = useState<BreachEvent[]>([]);
  const [alarmActive, setAlarmActive] = useState<boolean>(false);

  useEffect(() => {
    const unsub = engine.subscribe((tw, log) => {
      setTripwires(tw);
      setBreachLog(log);
    });
    return unsub;
  }, []);

  const triggerTestAlarm = () => {
    setAlarmActive(true);
    engine.playTacticalAlarm('CRITICAL_BREACH');
    setTimeout(() => setAlarmActive(false), 800);
  };

  const simulateBreach = () => {
    engine.checkCrossing(
      [-104.99, 39.77],
      [-104.98, 39.75],
      `TEST_UAV_${Math.floor(Math.random() * 900 + 100)}`,
      'DRONE'
    );
  };

  return (
    <div className="space-y-3 font-mono text-xs text-red-400">
      {/* Alarm Status & Test Trigger */}
      <div className="flex items-center justify-between p-2 rounded bg-red-950/40 border border-red-900/80">
        <div className="flex items-center gap-2">
          <ShieldAlert className={`w-4 h-4 ${alarmActive ? 'text-red-400 animate-ping' : 'text-red-500'}`} />
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase">Acoustic Tripwire Alarm</div>
            <div className="text-white font-bold">{alarmActive ? 'ALARM FIRING' : 'AUDIO SYNTH READY'}</div>
          </div>
        </div>

        <button
          onClick={triggerTestAlarm}
          className="px-2 py-1 rounded bg-red-900/60 hover:bg-red-800 text-white font-bold text-[10px] border border-red-600 transition-colors flex items-center gap-1"
        >
          <Volume2 size={12} /> TEST TONE
        </button>
      </div>

      {/* Tripwires List */}
      <div>
        <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase mb-1">
          <span>Active Perimeter Vectors ({tripwires.length})</span>
          <button
            onClick={() => engine.armAll(!tripwires.every(t => t.isArmed))}
            className="text-red-400 hover:text-white"
          >
            {tripwires.every(t => t.isArmed) ? 'DISARM ALL' : 'ARM ALL'}
          </button>
        </div>

        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
          {tripwires.map((tw) => (
            <div
              key={tw.id}
              className="p-2 rounded bg-black/60 border border-red-900/50 flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white text-[11px]">{tw.name}</span>
                  <span className={`px-1.5 py-0.2 text-[9px] rounded font-bold ${
                    tw.threatLevel === 'CRITICAL_BREACH' ? 'bg-red-950 text-red-300 border border-red-600' : 'bg-amber-950 text-amber-300 border border-amber-600'
                  }`}>
                    {tw.threatLevel === 'CRITICAL_BREACH' ? 'CRITICAL' : 'OUTER'}
                  </span>
                </div>
                <div className="text-[9px] text-gray-400">
                  Breaches: <span className="text-red-400 font-bold">{tw.breachCount}</span>
                  {tw.lastBreachTime && <span> • Last: {tw.lastBreachTime} ({tw.lastBreachTrack})</span>}
                </div>
              </div>

              <button
                onClick={() => engine.toggleArm(tw.id)}
                className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors ${
                  tw.isArmed
                    ? 'bg-red-950/80 text-red-300 border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                }`}
              >
                {tw.isArmed ? 'ARMED' : 'DISARMED'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Breach Simulation Button */}
      <button
        onClick={simulateBreach}
        className="w-full py-1.5 rounded bg-red-950/50 hover:bg-red-900/70 border border-red-800 text-red-300 text-[10px] font-bold tracking-wider flex items-center justify-center gap-1.5"
      >
        <Crosshair size={12} /> INJECT TEST INTRUSION EVENT
      </button>

      {/* Breach Log */}
      <div>
        <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Perimeter Breach Log</div>
        <div className="bg-black/70 border border-red-900/40 rounded p-2 max-h-24 overflow-y-auto space-y-1">
          {breachLog.length === 0 ? (
            <div className="text-gray-500 text-[10px] text-center py-2">No active intrusions logged</div>
          ) : (
            breachLog.map((b) => (
              <div key={b.id} className="text-[10px] flex items-center justify-between text-gray-300">
                <span className="text-red-400 font-bold">[{b.timestamp}] {b.trackType}: {b.trackId}</span>
                <span className="text-[9px] text-gray-500">{b.tripwireName}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
