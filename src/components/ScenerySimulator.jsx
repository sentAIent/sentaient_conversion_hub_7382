import React, { useState, useEffect } from 'react';
import { curatedScenes } from '../data/curatedScenes';
import { parseScenePrompt } from '../services/promptParser';
import { generateMusic } from '../services/minimaxAudio';
import AmbientAudioEngine from './AmbientAudioEngine';
import StreetViewSimulation from './StreetViewSimulation';

import AtmosphereMixer from './AtmosphereMixer';

export default function ScenerySimulator() {
  const [activeScene, setActiveScene] = useState(curatedScenes[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [musicUrl, setMusicUrl] = useState(null);
  const [isGeneratingMusic, setIsGeneratingMusic] = useState(false);
  
  // Audio state lifted up so the mixer can control it
  const [activeAudioParams, setActiveAudioParams] = useState(curatedScenes[0].audioParams);
  const [customTracks, setCustomTracks] = useState([]);

  // Sync audio params when scene changes
  useEffect(() => {
    setActiveAudioParams(activeScene.audioParams || { wind: 0, rain: 0, traffic: 0, birds: 0 });
  }, [activeScene]);

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGenerating(true);
    const parsedData = await parseScenePrompt(customPrompt);
    
    setActiveScene({
      id: 'custom-generated',
      title: 'Custom Simulation',
      location: parsedData.location,
      speed: parsedData.speed,
      visualMode: parsedData.visualMode,
      videoId: parsedData.videoId,
      audioParams: parsedData.audioParams,
      description: `Simulating: "${customPrompt}"`
    });
    
    setIsGenerating(false);
  };

  const handleGenerateMusic = async () => {
    setIsGeneratingMusic(true);
    const prompt = customPrompt.trim() 
      ? `Cinematic background music for ${customPrompt}` 
      : `Relaxing atmospheric music for ${activeScene.title}`;
    
    const result = await generateMusic(prompt);
    if (result.success) {
      setMusicUrl(result.audioUrl);
    } else {
      alert("Failed to generate music: " + result.error);
    }
    setIsGeneratingMusic(false);
  };

  return (
    <div className="w-screen h-screen relative bg-black overflow-hidden font-sans">
      
      {/* 1. Background Visuals */}
      <div className="absolute inset-0">
        <StreetViewSimulation 
          location={activeScene.location} 
          speed={activeScene.speed || 'slow'}
          visualMode={activeScene.visualMode || 'video'}
          videoId={activeScene.videoId}
        />
      </div>

      {/* 2. Headless Audio Engine (with MiniMax Music & Custom Instruments) */}
      <AmbientAudioEngine audioParams={activeAudioParams} musicUrl={musicUrl} customTracks={customTracks} />

      {/* 3. Overlay UI */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-8 md:p-12 text-white flex flex-col gap-6 md:gap-8 max-h-[100vh] overflow-y-auto hide-scrollbar">
        
        {/* Generative Mixer */}
        <AtmosphereMixer 
          audioParams={activeAudioParams}
          onAudioParamsChange={setActiveAudioParams}
          customTracks={customTracks}
          onCustomTracksChange={setCustomTracks}
        />
        
        {/* Scene Info */}
        <div className="max-w-4xl flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white/95 drop-shadow-lg mb-2">
              {activeScene.title}
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-light drop-shadow-md">
              {activeScene.description}
            </p>
          </div>
          <button 
            onClick={handleGenerateMusic}
            disabled={isGeneratingMusic}
            className={`px-6 py-3 rounded-full font-medium transition-all shadow-lg backdrop-blur-md flex items-center gap-2 ${isGeneratingMusic ? 'bg-purple-900/50 text-white/50 cursor-wait' : 'bg-purple-600/80 hover:bg-purple-500 text-white hover:scale-105'}`}
          >
            <span>🎵</span> {isGeneratingMusic ? 'Composing...' : 'AI Soundtrack'}
          </button>
        </div>

        {/* Custom Prompt Input */}
        <form onSubmit={handlePromptSubmit} className="flex flex-col sm:flex-row gap-4 max-w-3xl">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder='e.g., "Simulate driving through Paris in a buggy with birds chirping"'
            className="flex-1 px-6 py-4 rounded-full border border-white/10 bg-black/40 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-md transition-all shadow-inner"
            disabled={isGenerating}
          />
          <button 
            type="submit"
            disabled={isGenerating}
            className={`px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 shadow-xl backdrop-blur-md ${isGenerating ? 'bg-white/10 text-white/50 cursor-wait' : 'bg-white text-black hover:scale-105 hover:bg-gray-200 active:scale-95'}`}
          >
            {isGenerating ? 'Generating...' : 'Simulate'}
          </button>
        </form>

        {/* Curated Scenes Carousel */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 hide-scrollbar snap-x">
          {curatedScenes.map(scene => (
            <button
              key={scene.id}
              onClick={() => {
                setActiveScene(scene);
                setMusicUrl(null); // Reset music on scene change
              }}
              className={`snap-start flex-shrink-0 px-6 py-4 rounded-2xl text-left border transition-all duration-300 backdrop-blur-md min-w-[200px] ${
                activeScene.id === scene.id 
                  ? 'border-white/40 bg-white/15 shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                  : 'border-white/10 bg-black/30 hover:bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="font-medium text-white/90 text-lg mb-1">{scene.title}</div>
              <div className="text-sm text-white/50 truncate">{scene.location.split(',')[0]}</div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
