import React, { useState } from 'react';
import { Radio, Activity, Users, Settings2, X, Globe, Play, Square, Volume2 } from 'lucide-react';

interface RadioStation {
  name: string;
  freq: string;
  category: 'sigint' | 'decade' | 'emergency';
  desc: string;
  url: string;
}

const GLOBAL_STATIONS: RadioStation[] = [
  {
    name: 'WWV Atomic Time & Frequency',
    freq: '10.000 MHz HF',
    category: 'sigint',
    desc: 'NIST atomic clock voice ticks, ionospheric alerts & solar geophysical storm warnings.',
    url: 'https://tsdr1.fnal.gov:8000/wwv_sim'
  },
  {
    name: 'UVB-76 (The Buzzer)',
    freq: '4625 kHz USB',
    category: 'sigint',
    desc: 'Russian Western Military District communications channel marker & voice messages.',
    url: 'https://stream.radiorecord.ru/ambient_96'
  },
  {
    name: 'SomaFM Secret Agent',
    freq: 'Tactical Audio',
    category: 'sigint',
    desc: 'Downtempo spy, espionage, and cold war intelligence audio stream.',
    url: 'https://ice2.somafm.com/secretagent-128-mp3'
  },
  {
    name: '1940s WWII Era Broadcasts',
    freq: 'Archive Radio',
    category: 'decade',
    desc: 'Historical big band, swing, and wartime civil defense radio bulletins.',
    url: 'https://ice4.somafm.com/seventies-128-mp3'
  },
  {
    name: '1980s Cold War Synthwave',
    freq: 'Archive Radio',
    category: 'decade',
    desc: 'Retro 80s analog synthesizers and cyberpunk telemetry aesthetics.',
    url: 'https://ice1.somafm.com/spacestation-128-mp3'
  },
  {
    name: 'Global Ambient Drone / SAR',
    freq: 'VHF / Deep Field',
    category: 'emergency',
    desc: 'Atmospheric deep space and search-and-rescue background telemetry audio.',
    url: 'https://ice6.somafm.com/dronezone-128-mp3'
  }
];

export const RadioPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'web' | 'sdr' | 'mesh'>('web');
  const [sdrMode, setSdrMode] = useState<'adsb' | 'scan' | 'off'>('off');
  const [selectedStation, setSelectedStation] = useState<RadioStation | null>(GLOBAL_STATIONS[2]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [decadeFilter, setDecadeFilter] = useState<string>('all');

  const togglePlay = (station: RadioStation) => {
    if (selectedStation?.name === station.name && isPlaying) {
      setIsPlaying(false);
    } else {
      setSelectedStation(station);
      setIsPlaying(true);
    }
  };

  return (
    <div className="absolute bottom-[2vw] left-[2vw] z-40 w-[28vw] min-w-[380px] h-[34vw] min-h-[460px] bg-black/95 border border-cyan-700/80 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(8,145,178,0.3)] flex flex-col font-mono text-white backdrop-blur-md">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950/90 to-cyan-950/90 px-4 py-2.5 flex justify-between items-center border-b border-cyan-800/60">
        <h2 className="text-cyan-400 text-xs flex items-center gap-2 font-bold tracking-widest">
          <Radio size={16} /> COMMS & GLOBAL SIGINT LINK
        </h2>
        <button onClick={onClose} className="text-cyan-500 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-black/60 text-xs">
        <button 
          onClick={() => setActiveTab('web')}
          className={`flex-1 py-2 transition-colors flex items-center justify-center gap-1.5 border-r border-white/10 ${
            activeTab === 'web' ? 'bg-cyan-950/60 text-cyan-300 border-b-2 border-b-cyan-400 font-bold' : 'text-gray-400 hover:bg-white/5'
          }`}
        >
          <Globe size={14} /> WEB SIGINT / RADIOOOOO
        </button>
        <button 
          onClick={() => setActiveTab('sdr')}
          className={`flex-1 py-2 border-r border-white/10 transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'sdr' ? 'bg-blue-900/40 text-blue-300 border-b-2 border-b-blue-400 font-bold' : 'text-gray-400 hover:bg-white/5'
          }`}
        >
          <Activity size={14} /> USB SDR
        </button>
        <button 
          onClick={() => setActiveTab('mesh')}
          className={`flex-1 py-2 transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'mesh' ? 'bg-blue-900/40 text-blue-300 border-b-2 border-b-blue-400 font-bold' : 'text-gray-400 hover:bg-white/5'
          }`}
        >
          <Users size={14} /> MESHTASTIC
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-3.5 overflow-y-auto min-h-0 text-xs">
        {activeTab === 'web' && (
          <div className="space-y-3">
            {/* Now Playing Banner */}
            <div className="bg-gradient-to-r from-cyan-950/70 to-blue-950/70 border border-cyan-500/30 rounded-lg p-3 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Volume2 size={12} className={isPlaying ? "text-cyan-400 animate-pulse" : "text-gray-500"} />
                  {isPlaying ? 'LIVE STREAM CONNECTED' : 'STREAM STANDBY'}
                </div>
                <div className="font-bold text-white text-xs">{selectedStation?.name}</div>
                <div className="text-[11px] text-cyan-300 font-mono">{selectedStation?.freq}</div>
              </div>
              <button
                onClick={() => selectedStation && togglePlay(selectedStation)}
                className={`p-2.5 rounded-full transition-all ${
                  isPlaying 
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                }`}
              >
                {isPlaying ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
              </button>
            </div>

            {/* Hidden HTML5 Audio Element */}
            {selectedStation && isPlaying && (
              <audio
                src={selectedStation.url}
                autoPlay
                onError={() => {
                  console.warn('Audio stream error, retrying backup stream');
                }}
              />
            )}

            {/* Decade & Category Filters */}
            <div className="flex gap-1 overflow-x-auto text-[10px] pb-1">
              {['all', 'sigint', 'decade', 'emergency'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setDecadeFilter(cat)}
                  className={`px-2 py-0.5 rounded capitalize whitespace-nowrap transition-colors ${
                    decadeFilter === cat
                      ? 'bg-cyan-600 text-white font-bold'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Channels' : cat}
                </button>
              ))}
            </div>

            {/* Stations List */}
            <div className="space-y-1.5">
              {GLOBAL_STATIONS.filter(s => decadeFilter === 'all' || s.category === decadeFilter).map((st) => {
                const isSelected = selectedStation?.name === st.name && isPlaying;
                return (
                  <div
                    key={st.name}
                    onClick={() => togglePlay(st)}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                        : 'bg-black/50 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{st.name}</span>
                        <span className="text-[10px] bg-white/10 px-1.5 py-0.2 rounded text-cyan-300 font-mono">
                          {st.freq}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-snug">{st.desc}</p>
                    </div>
                    <button className="text-cyan-400 hover:text-cyan-300 ml-2">
                      {isSelected ? <Square size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'sdr' && (
          <div className="space-y-3">
            <div className="bg-blue-950/30 border border-blue-900/50 p-2.5 rounded flex justify-between items-center">
              <div>
                <div className="text-xs text-blue-300 font-bold mb-0.5">ADS-B (AIRCRAFT TRACKING)</div>
                <div className="text-[11px] text-gray-400">Decode 1090MHz transponders via dump1090</div>
              </div>
              <button 
                onClick={async () => {
                  const newMode = sdrMode === 'adsb' ? 'off' : 'adsb';
                  setSdrMode(newMode);
                  try {
                    await fetch('http://localhost:3117/api/radio/adsb', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ action: newMode === 'adsb' ? 'start' : 'stop' })
                    });
                  } catch(e) {}
                }}
                className={`px-3 py-1 rounded text-xs transition-all ${sdrMode === 'adsb' ? 'bg-red-900/50 text-red-400 border border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-900/20 text-blue-500 border border-blue-900 hover:bg-blue-900/40'}`}
              >
                {sdrMode === 'adsb' ? 'STOP' : 'START'}
              </button>
            </div>

            <div className="bg-blue-950/30 border border-blue-900/50 p-2.5 rounded flex justify-between items-center">
              <div>
                <div className="text-xs text-blue-300 font-bold mb-0.5">RF FREQUENCY SCANNER</div>
                <div className="text-[11px] text-gray-400">Detect active police/fire/EMS bands</div>
              </div>
              <button 
                onClick={async () => {
                  const newMode = sdrMode === 'scan' ? 'off' : 'scan';
                  setSdrMode(newMode);
                  try {
                    await fetch('http://localhost:3117/api/radio/scan', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ action: newMode === 'scan' ? 'start' : 'stop' })
                    });
                  } catch(e) {}
                }}
                className={`px-3 py-1 rounded text-xs transition-all ${sdrMode === 'scan' ? 'bg-red-900/50 text-red-400 border border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-900/20 text-blue-500 border border-blue-900 hover:bg-blue-900/40'}`}
              >
                {sdrMode === 'scan' ? 'STOP' : 'START'}
              </button>
            </div>

            <div className="border-t border-blue-900/50 pt-2">
              <div className="text-[11px] text-gray-500 mb-1">SDR LOG:</div>
              <div className="bg-black border border-gray-800 rounded p-2 text-[11px] text-green-500 h-24 overflow-y-auto">
                {sdrMode === 'off' && <span className="text-gray-600">SDR Controller Idle...</span>}
                {sdrMode === 'adsb' && <span>[dump1090] Listening on port 30003... waiting for aircraft packets...</span>}
                {sdrMode === 'scan' && <span>[rtl_power] Scanning 136Mhz-174Mhz...</span>}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mesh' && (
          <div className="space-y-3">
             <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-gray-400">STATUS: <span className="text-red-500">DISCONNECTED</span></span>
                <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300"><Settings2 size={13} /> COM PORT</button>
             </div>
             <div className="text-xs text-gray-500 text-center mt-12">
                NO MESHTASTIC NODE DETECTED ON SERIAL/USB
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
