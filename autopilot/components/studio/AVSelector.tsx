import React, { useState } from 'react';

// Options Definitions
export const VISUAL_OPTIONS = [
  { id: 'mindwave_kanagawa', label: 'Kanagawa Wave', category: 'Standard', icon: '🌊' },
  { id: 'mindwave_cymatics', label: 'Cymatics', category: 'Standard', icon: '💠' },
  { id: 'mindwave_particle_swarm', label: 'Particle Swarm', category: 'Standard', icon: '✨' },
  { id: 'ocean', label: 'Ocean', category: 'Nature', icon: '🌊' },
  { id: 'zengarden', label: 'Zen Garden', category: 'Nature', icon: '⛩️' },
  { id: 'sphere', label: 'Sphere', category: 'Abstract', icon: '🔮' },
  { id: 'cube', label: 'Cube', category: 'Abstract', icon: '🧊' },
  { id: 'dragon', label: 'Dragon', category: 'Epic', icon: '🐉' },
  { id: 'galaxy', label: 'Galaxy', category: 'Space', icon: '🌌' },
  { id: 'mandala', label: 'Mandala', category: 'Spiritual', icon: '🏵️' },
  { id: 'lava', label: 'Lava', category: 'Nature', icon: '🌋' },
  { id: 'fireplace', label: 'Fireplace', category: 'Cozy', icon: '🔥' },
  { id: 'rainforest', label: 'Rainforest', category: 'Nature', icon: '🌴' },
  { id: 'cyber', label: 'Cyber', category: 'Tech', icon: '🤖' },
  { id: 'matrix', label: 'Matrix', category: 'Tech', icon: '💻' },
  { id: 'tesseract', label: 'Tesseract', category: 'Space', icon: '🧊' },
  { id: 'interstellar', label: 'Interstellar', category: 'Space', icon: '🚀' },
  { id: 'ai_image', label: 'Static AI Image', category: 'Basic', icon: '🖼️' },
  { id: 'raw_video', label: 'Raw B-Roll Video', category: 'Basic', icon: '🎬' },
];

export const BEAT_OPTIONS = [
  { id: 'none', label: 'No Beats', category: 'Basic', icon: '🔇' },
  { id: 'delta', label: 'Delta (<4Hz)', category: 'Brainwave', icon: '💤' },
  { id: 'theta', label: 'Theta (4-8Hz)', category: 'Brainwave', icon: '🧘' },
  { id: 'alpha', label: 'Alpha (8-14Hz)', category: 'Brainwave', icon: '😌' },
  { id: 'beta', label: 'Beta (14-30Hz)', category: 'Brainwave', icon: '🎯' },
  { id: 'gamma', label: 'Gamma (30-50Hz)', category: 'Brainwave', icon: '⚡' },
  { id: 'hyper-gamma', label: 'Hyper-Gamma (>50Hz)', category: 'Brainwave', icon: '🚀' },
  { id: 'freq-0.5', label: '0.5Hz Deep Dive', category: 'Deep Dive', icon: '🌌' },
  { id: 'freq-1.5', label: '1.5Hz Deep Dive', category: 'Deep Dive', icon: '🌌' },
  { id: 'freq-7.83', label: '7.83Hz (Schumann)', category: 'Deep Dive', icon: '🌍' },
  { id: 'heal-174', label: '174Hz (Pain Relief)', category: 'Healing', icon: '❤️' },
  { id: 'heal-285', label: '285Hz (Tissue Regen)', category: 'Healing', icon: '🧬' },
  { id: 'heal-396', label: '396Hz (Liberation)', category: 'Healing', icon: '🕊️' },
  { id: 'heal-417', label: '417Hz (Change)', category: 'Healing', icon: '🔄' },
  { id: 'heal-432', label: '432Hz (Nature)', category: 'Healing', icon: '🌿' },
  { id: 'heal-528', label: '528Hz (DNA Repair)', category: 'Healing', icon: '✨' },
  { id: 'heal-639', label: '639Hz (Connection)', category: 'Healing', icon: '🤝' },
  { id: 'heal-741', label: '741Hz (Intuition)', category: 'Healing', icon: '👁️' },
  { id: 'heal-852', label: '852Hz (Spirit)', category: 'Healing', icon: '👻' },
  { id: 'heal-963', label: '963Hz (Oneness)', category: 'Healing', icon: '♾️' },
];

export const ATMOS_OPTIONS = [
  { id: 'none', label: 'No Atmos', category: 'Basic', icon: '🔇' },
  { id: 'pink', label: 'Pink Noise', category: 'Noise', icon: '📻' },
  { id: 'white', label: 'White Noise', category: 'Noise', icon: '📻' },
  { id: 'brown', label: 'Brown Noise', category: 'Noise', icon: '📻' },
  { id: 'rain', label: 'Heavy Rain', category: 'Nature', icon: '🌧️' },
  { id: 'fireplace', label: 'Fireplace', category: 'Nature', icon: '🔥' },
  { id: 'ocean', label: 'Ocean Waves', category: 'Nature', icon: '🌊' },
  { id: 'river', label: 'Mountain River', category: 'Nature', icon: '🏞️' },
  { id: 'mountain_wind', label: 'Alpine Wind', category: 'Nature', icon: '🏔️' },
  { id: 'forest_birds', label: 'Forest Birds', category: 'Nature', icon: '🐦' },
  { id: 'space', label: 'Deep Space Drone', category: 'Drone', icon: '🌌' }
];

export const MUSIC_OPTIONS = [
  { id: 'none', label: 'No Music', category: 'Basic', icon: '🔇' },
  { id: 'strings', label: 'Orchestral Strings', category: 'Drone', icon: '🎻' },
  { id: 'brass', label: 'Brass Swell', category: 'Drone', icon: '🎺' },
  { id: 'winds', label: 'Woodwinds', category: 'Drone', icon: '🌬️' },
  { id: 'bells', label: 'Temple Bells', category: 'Percussion', icon: '🔔' },
  { id: 'wood', label: 'Woodblocks', category: 'Percussion', icon: '🪵' },
  { id: 'timpani', label: 'Grand Timpani', category: 'Percussion', icon: '🥁' },
  { id: 'orch_perc', label: 'Orchestral Perc', category: 'Percussion', icon: '💥' },
  { id: 'ambient_journey', label: 'Ambient Journey', category: 'Track', icon: '🎵' },
  { id: 'lofi_chill', label: 'Lo-Fi Chill', category: 'Track', icon: '🎧' },
  { id: 'cinematic_swell', label: 'Cinematic Swell', category: 'Track', icon: '🎬' },
];

type AVSelectorProps = {
  visualStyle: string;
  setVisualStyle: (v: string) => void;
  audioBeats: string;
  setAudioBeats: (v: string) => void;
  audioAtmos: string;
  setAudioAtmos: (v: string) => void;
  audioMusic: string;
  setAudioMusic: (v: string) => void;
};

export default function AVSelector({
  visualStyle,
  setVisualStyle,
  audioBeats,
  setAudioBeats,
  audioAtmos,
  setAudioAtmos,
  audioMusic,
  setAudioMusic
}: AVSelectorProps) {
  const [activeTab, setActiveTab] = useState<'visuals' | 'beats' | 'atmos' | 'music'>('visuals');
  
  const getLabels = (csv: string, arr: any[]) => {
    if (!csv || csv === 'none') return 'None';
    return csv.split(',').map(id => arr.find(x => x.id === id)?.label || id).join(' + ');
  };

  const toggleItem = (currentCsv: string, setter: (v: string) => void, id: string) => {
    if (id === 'none') {
      setter('none');
      return;
    }
    let currentArray = (currentCsv || '').split(',').filter(x => x && x !== 'none');
    if (currentArray.includes(id)) {
      currentArray = currentArray.filter(x => x !== id);
      setter(currentArray.length > 0 ? currentArray.join(',') : 'none');
    } else {
      currentArray.push(id);
      setter(currentArray.join(','));
    }
  };

  const isSelected = (csv: string, id: string) => {
    if (id === 'none') return csv === 'none' || !csv;
    return (csv || '').split(',').includes(id);
  };

  return (
    <div className="bg-black/30 border border-white/10 rounded-xl overflow-hidden flex flex-col h-[500px]">
      
      {/* Selection Summary Header */}
      <div className="bg-white/5 p-4 border-b border-white/10 flex flex-wrap gap-4 items-center justify-between sticky top-0 z-10 backdrop-blur-md">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Currently Selected</span>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-md text-sm font-medium border border-blue-500/30 flex items-center gap-2">
              <span className="opacity-70">👁️</span> {getLabels(visualStyle, VISUAL_OPTIONS)}
            </span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-md text-sm font-medium border border-purple-500/30 flex items-center gap-2">
              <span className="opacity-70">🧠</span> {getLabels(audioBeats, BEAT_OPTIONS)}
            </span>
            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-md text-sm font-medium border border-green-500/30 flex items-center gap-2">
              <span className="opacity-70">🌧️</span> {getLabels(audioAtmos, ATMOS_OPTIONS)}
            </span>
            <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-md text-sm font-medium border border-orange-500/30 flex items-center gap-2">
              <span className="opacity-70">🎵</span> {getLabels(audioMusic, MUSIC_OPTIONS)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-48 bg-black/40 border-r border-white/5 flex flex-col p-2 gap-1 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('visuals')}
            className={`px-4 py-3 rounded-lg text-left font-medium transition-all ${activeTab === 'visuals' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-gray-400 hover:bg-white/5 border border-transparent'}`}
          >
            👁️ Visual State
          </button>
          <button 
            onClick={() => setActiveTab('beats')}
            className={`px-4 py-3 rounded-lg text-left font-medium transition-all ${activeTab === 'beats' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-gray-400 hover:bg-white/5 border border-transparent'}`}
          >
            🧠 Frequencies
          </button>
          <button 
            onClick={() => setActiveTab('atmos')}
            className={`px-4 py-3 rounded-lg text-left font-medium transition-all ${activeTab === 'atmos' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'text-gray-400 hover:bg-white/5 border border-transparent'}`}
          >
            🌧️ Soundscapes
          </button>
          <button 
            onClick={() => setActiveTab('music')}
            className={`px-4 py-3 rounded-lg text-left font-medium transition-all ${activeTab === 'music' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'text-gray-400 hover:bg-white/5 border border-transparent'}`}
          >
            🎵 Music / Drones
          </button>
        </div>

        {/* Grid Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-black/20">
          
          {activeTab === 'visuals' && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {VISUAL_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => toggleItem(visualStyle, setVisualStyle, opt.id)}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${isSelected(visualStyle, opt.id) ? 'bg-blue-500/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)] scale-[1.02]' : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className={`text-sm font-bold ${isSelected(visualStyle, opt.id) ? 'text-blue-300' : 'text-gray-200'}`}>{opt.label}</span>
                  <span className="text-xs text-gray-500">{opt.category}</span>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'beats' && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {BEAT_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => toggleItem(audioBeats, setAudioBeats, opt.id)}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${isSelected(audioBeats, opt.id) ? 'bg-purple-500/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)] scale-[1.02]' : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className={`text-sm font-bold ${isSelected(audioBeats, opt.id) ? 'text-purple-300' : 'text-gray-200'}`}>{opt.label}</span>
                  <span className="text-xs text-gray-500">{opt.category}</span>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'atmos' && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {ATMOS_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => toggleItem(audioAtmos, setAudioAtmos, opt.id)}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${isSelected(audioAtmos, opt.id) ? 'bg-green-500/20 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)] scale-[1.02]' : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className={`text-sm font-bold ${isSelected(audioAtmos, opt.id) ? 'text-green-300' : 'text-gray-200'}`}>{opt.label}</span>
                  <span className="text-xs text-gray-500">{opt.category}</span>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'music' && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {MUSIC_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => toggleItem(audioMusic, setAudioMusic, opt.id)}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${isSelected(audioMusic, opt.id) ? 'bg-orange-500/20 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)] scale-[1.02]' : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className={`text-sm font-bold ${isSelected(audioMusic, opt.id) ? 'text-orange-300' : 'text-gray-200'}`}>{opt.label}</span>
                  <span className="text-xs text-gray-500">{opt.category}</span>
                </button>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
