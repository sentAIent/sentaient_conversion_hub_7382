import React, { useState, useEffect } from 'react';
import { getAllInstruments } from '../services/soundLibrary';

export default function AtmosphereMixer({ audioParams, onAudioParamsChange, customTracks, onCustomTracksChange }) {
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [savedInstruments, setSavedInstruments] = useState([]);
  const [activeSlot, setActiveSlot] = useState(null);

  useEffect(() => {
    if (isVaultOpen) {
      getAllInstruments().then(setSavedInstruments).catch(console.error);
    }
  }, [isVaultOpen]);

  const handleEnvChange = (track, value) => {
    onAudioParamsChange({ ...audioParams, [track]: parseFloat(value) });
  };

  const handleCustomTrackVol = (id, value) => {
    const updated = customTracks.map(t => t.id === id ? { ...t, volume: parseFloat(value) } : t);
    onCustomTracksChange(updated);
  };

  const assignInstrument = (instrument) => {
    if (activeSlot !== null) {
      const updated = [...customTracks];
      updated[activeSlot] = { id: instrument.id, name: instrument.name, url: URL.createObjectURL(instrument.audioBlob), volume: 0.8 };
      onCustomTracksChange(updated);
    } else if (customTracks.length < 4) {
      onCustomTracksChange([...customTracks, { id: instrument.id, name: instrument.name, url: URL.createObjectURL(instrument.audioBlob), volume: 0.8 }]);
    }
    setIsVaultOpen(false);
    setActiveSlot(null);
  };

  const removeTrack = (id) => {
    onCustomTracksChange(customTracks.filter(t => t.id !== id));
  };

  return (
    <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
      <h3 className="text-white/80 font-medium mb-4 text-lg">Atmosphere & Generative Mix</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {/* Native Environment Sliders */}
        {['wind', 'rain', 'water', 'birds', 'traffic'].map(env => (
          <div key={env} className="flex flex-col gap-2">
            <label className="text-white/60 text-sm capitalize flex justify-between">
              <span>{env}</span>
              <span>{Math.round((audioParams?.[env] || 0) * 100)}%</span>
            </label>
            <input 
              type="range" min="0" max="1" step="0.05" 
              value={audioParams?.[env] || 0}
              onChange={(e) => handleEnvChange(env, e.target.value)}
              className="accent-white/70"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-white/80 text-sm font-medium">Sonic Forge Custom Slots</h4>
          <button 
            onClick={() => { setActiveSlot(null); setIsVaultOpen(true); }}
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full transition-colors"
          >
            + Open Vault
          </button>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {customTracks.map((track, i) => (
            <div key={track.id} className="bg-white/5 border border-white/10 rounded-xl p-4 min-w-[200px] flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/90 font-medium text-sm truncate">{track.name}</span>
                <button onClick={() => removeTrack(track.id)} className="text-red-400/70 hover:text-red-400 text-xs">✕</button>
              </div>
              <input 
                type="range" min="0" max="1" step="0.05" 
                value={track.volume}
                onChange={(e) => handleCustomTrackVol(track.id, e.target.value)}
                className="w-full accent-purple-400"
              />
            </div>
          ))}
          
          {customTracks.length < 3 && (
            <button 
              onClick={() => { setActiveSlot(customTracks.length); setIsVaultOpen(true); }}
              className="bg-white/5 border border-dashed border-white/20 rounded-xl p-4 min-w-[200px] flex-1 text-white/40 hover:text-white/70 hover:border-white/40 transition-all flex items-center justify-center text-sm"
            >
              + Assign Instrument
            </button>
          )}
        </div>
      </div>

      {/* Sonic Vault Modal */}
      {isVaultOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-neutral-800">
              <h2 className="text-xl font-medium text-white">Your Sonic Vault</h2>
              <button onClick={() => setIsVaultOpen(false)} className="text-white/50 hover:text-white text-xl">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {savedInstruments.length === 0 ? (
                <div className="text-center text-white/40 py-12">
                  <p>Your vault is empty.</p>
                  <p className="text-sm mt-2">Chat with the AI Consult Hub to forge new historical instruments!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {savedInstruments.map(inst => (
                    <div key={inst.id} className="bg-neutral-800 border border-white/5 p-4 rounded-xl flex justify-between items-center hover:border-purple-500/50 transition-colors cursor-pointer" onClick={() => assignInstrument(inst)}>
                      <div>
                        <h4 className="text-white font-medium">{inst.name}</h4>
                        <p className="text-white/40 text-xs mt-1">{inst.genre || 'Generative Audio'} • {new Date(inst.createdAt).toLocaleDateString()}</p>
                      </div>
                      <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Assign to Mix
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
