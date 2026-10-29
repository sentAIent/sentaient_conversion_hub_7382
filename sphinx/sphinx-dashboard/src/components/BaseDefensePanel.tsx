import React, { useState } from 'react';

export function BaseDefensePanel({ onClose }: { onClose: () => void }) {
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
    <div className="absolute top-20 right-6 w-80 bg-black/90 border border-red-900 shadow-[0_0_20px_rgba(255,0,0,0.4)] backdrop-blur-md rounded-lg p-4 font-mono text-red-400 z-50">
      <div className="flex justify-between items-center border-b border-red-900 pb-2 mb-4">
        <h2 className="font-bold tracking-widest text-lg">BASE DEFENSE</h2>
        <button onClick={onClose} className="hover:text-white transition-colors">✕</button>
      </div>

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

      {status && (
        <div className="mt-4 text-xs p-2 bg-black/50 border border-red-900 rounded break-words">
          {status}
        </div>
      )}
    </div>
  );
}
