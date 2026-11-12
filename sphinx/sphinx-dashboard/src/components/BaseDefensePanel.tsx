import React, { useState } from 'react';
import { PerimeterTripwirePanel } from './defense/PerimeterTripwirePanel';
import { ShieldAlert, Cpu } from 'lucide-react';

export function BaseDefensePanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<'tripwires' | 'actuators'>('tripwires');
  const [status, setStatus] = useState<string>('');

  const triggerAction = async (action: string) => {
    try {
      setStatus(`Executing ${action}...`);
      const res = await fetch(`http://localhost:3117/api/defense/home-assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        setStatus(`SUCCESS: ${action} executed.`);
      } else {
        setStatus(`FAILED: ${action}`);
      }
    } catch (e: any) {
      setStatus(`ERROR: ${e?.message || e}`);
    }
  };

  return (
    <div className="fixed top-20 right-3 sm:right-6 w-full max-w-[min(340px,calc(100vw-24px))] bg-black/90 border border-red-900 shadow-[0_0_20px_rgba(255,0,0,0.4)] backdrop-blur-md rounded-lg p-4 font-mono text-red-400 z-50">
      <div className="flex justify-between items-center border-b border-red-900 pb-2 mb-4">
        <h2 className="font-bold tracking-widest text-lg">BASE DEFENSE</h2>
        <button onClick={onClose} className="hover:text-white transition-colors">✕</button>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-red-900/60 mb-3 text-xs">
        <button
          onClick={() => setTab('tripwires')}
          className={`flex-1 py-1.5 font-bold transition-colors flex items-center justify-center gap-1 border-r border-red-900/60 ${
            tab === 'tripwires' ? 'bg-red-950/80 text-red-300 border-b-2 border-b-red-500' : 'text-gray-400 hover:bg-white/5'
          }`}
        >
          <ShieldAlert size={12} /> TRIPWIRES
        </button>
        <button
          onClick={() => setTab('actuators')}
          className={`flex-1 py-1.5 font-bold transition-colors flex items-center justify-center gap-1 ${
            tab === 'actuators' ? 'bg-red-950/80 text-red-300 border-b-2 border-b-red-500' : 'text-gray-400 hover:bg-white/5'
          }`}
        >
          <Cpu size={12} /> ACTUATORS
        </button>
      </div>

      {tab === 'tripwires' ? (
        <PerimeterTripwirePanel />
      ) : (
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => triggerAction('lock_doors')}
            className="bg-red-900/40 hover:bg-red-800/60 border border-red-800 p-2 rounded transition-colors text-left pl-4 font-bold"
          >
            [!] LOCK ALL DEADBOLTS
          </button>
          <button 
            onClick={() => triggerAction('pulse_lights')}
            className="bg-red-900/40 hover:bg-red-800/60 border border-red-800 p-2 rounded transition-colors text-left pl-4 font-bold"
          >
            [!] ENGAGE PERIMETER LIGHTS
          </button>
          <button 
            onClick={() => triggerAction('arm_sensors')}
            className="bg-red-900/40 hover:bg-red-800/60 border border-red-800 p-2 rounded transition-colors text-left pl-4 font-bold"
          >
            [!] ARM EXTERIOR SENSORS
          </button>
        </div>
      )}

      {status && (
        <div className="mt-4 text-xs p-2 bg-black/50 border border-red-900 rounded break-words">
          {status}
        </div>
      )}
    </div>
  );
}
