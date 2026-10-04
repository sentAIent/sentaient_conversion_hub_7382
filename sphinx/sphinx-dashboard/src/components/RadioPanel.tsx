import React, { useState } from 'react';
import { Radio, Activity, Users, Settings2, X } from 'lucide-react';

export const RadioPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'sdr' | 'mesh'>('sdr');
  const [sdrMode, setSdrMode] = useState<'adsb' | 'scan' | 'off'>('off');

  return (
    <div className="absolute bottom-[2vw] left-[2vw] z-40 w-[25vw] h-[30vw] bg-black/90 border border-blue-900 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(29,78,216,0.3)] flex flex-col font-mono text-white">
      {/* Header */}
      <div className="bg-blue-900/40 px-[1vw] py-[0.5vw] flex justify-between items-center border-b border-blue-900">
        <h2 className="text-blue-400 text-[1vw] flex items-center gap-2 font-bold tracking-widest">
          <Radio size="1.2vw" /> COMMS / RADIO LINK
        </h2>
        <button onClick={onClose} className="text-blue-500 hover:text-white transition-colors">
          <X size="1.2vw" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-blue-900/50 bg-black/50 text-[0.8vw]">
        <button 
          onClick={() => setActiveTab('sdr')}
          className={`flex-1 py-[0.5vw] border-r border-blue-900/50 transition-colors flex items-center justify-center gap-2 ${activeTab === 'sdr' ? 'bg-blue-900/30 text-blue-300 border-b-2 border-b-blue-400' : 'text-gray-500 hover:bg-white/5'}`}
        >
          <Activity size="1vw" /> SOFTWARE-DEFINED RADIO
        </button>
        <button 
          onClick={() => setActiveTab('mesh')}
          className={`flex-1 py-[0.5vw] transition-colors flex items-center justify-center gap-2 ${activeTab === 'mesh' ? 'bg-blue-900/30 text-blue-300 border-b-2 border-b-blue-400' : 'text-gray-500 hover:bg-white/5'}`}
        >
          <Users size="1vw" /> MESHTASTIC LORA
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-[1vw] overflow-y-auto">
        {activeTab === 'sdr' && (
          <div className="space-y-[1vw]">
            <div className="bg-blue-950/30 border border-blue-900/50 p-[0.8vw] rounded flex justify-between items-center">
              <div>
                <div className="text-[0.9vw] text-blue-300 font-bold mb-[0.2vw]">ADS-B (AIRCRAFT TRACKING)</div>
                <div className="text-[0.7vw] text-gray-400">Decode 1090MHz transponders via dump1090</div>
              </div>
              <button 
                onClick={async () => {
                  const newMode = sdrMode === 'adsb' ? 'off' : 'adsb';
                  setSdrMode(newMode);
                  await fetch('http://localhost:3117/api/radio/adsb', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: newMode === 'adsb' ? 'start' : 'stop' })
                  });
                }}
                className={`px-[1vw] py-[0.4vw] rounded text-[0.8vw] transition-all ${sdrMode === 'adsb' ? 'bg-red-900/50 text-red-400 border border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-900/20 text-blue-500 border border-blue-900 hover:bg-blue-900/40'}`}
              >
                {sdrMode === 'adsb' ? 'STOP' : 'START'}
              </button>
            </div>

            <div className="bg-blue-950/30 border border-blue-900/50 p-[0.8vw] rounded flex justify-between items-center">
              <div>
                <div className="text-[0.9vw] text-blue-300 font-bold mb-[0.2vw]">RF FREQUENCY SCANNER</div>
                <div className="text-[0.7vw] text-gray-400">Detect active police/fire/EMS bands</div>
              </div>
              <button 
                onClick={async () => {
                  const newMode = sdrMode === 'scan' ? 'off' : 'scan';
                  setSdrMode(newMode);
                  await fetch('http://localhost:3117/api/radio/scan', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: newMode === 'scan' ? 'start' : 'stop' })
                  });
                }}
                className={`px-[1vw] py-[0.4vw] rounded text-[0.8vw] transition-all ${sdrMode === 'scan' ? 'bg-red-900/50 text-red-400 border border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-900/20 text-blue-500 border border-blue-900 hover:bg-blue-900/40'}`}
              >
                {sdrMode === 'scan' ? 'STOP' : 'START'}
              </button>
            </div>

            <div className="mt-[2vw] border-t border-blue-900/50 pt-[1vw]">
              <div className="text-[0.8vw] text-gray-500 mb-[0.5vw]">SDR LOG:</div>
              <div className="bg-black border border-gray-800 rounded p-[0.5vw] text-[0.7vw] text-green-500 h-[8vw] overflow-y-auto">
                {sdrMode === 'off' && <span className="text-gray-600">SDR Controller Idle...</span>}
                {sdrMode === 'adsb' && <span>[dump1090] Listening on port 30003... waiting for aircraft packets...</span>}
                {sdrMode === 'scan' && <span>[rtl_power] Scanning 136Mhz-174Mhz...</span>}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mesh' && (
          <div className="space-y-[1vw]">
             <div className="flex justify-between items-center text-[0.8vw] mb-[1vw]">
                <span className="text-gray-400">STATUS: <span className="text-red-500">DISCONNECTED</span></span>
                <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300"><Settings2 size="1vw" /> COM PORT</button>
             </div>
             <div className="text-[0.8vw] text-gray-500 text-center mt-[4vw]">
                NO MESHTASTIC NODE DETECTED ON SERIAL/USB
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
