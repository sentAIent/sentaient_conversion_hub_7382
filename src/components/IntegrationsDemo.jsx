import React, { useState } from 'react';
import { pingTwentyApi } from '../services/twentyApi';
import { calculateDistance } from '../services/spatialAnalytics';
import SonicForgeChat from './SonicForgeChat';

export default function IntegrationsDemo() {
  const [twentyStatus, setTwentyStatus] = useState('');
  const [turfStatus, setTurfStatus] = useState('');
  const [livekitActive, setLivekitActive] = useState(false);

  const testTwenty = async () => {
    setTwentyStatus('Pinging Twenty API...');
    const result = await pingTwentyApi();
    if (result.success) {
      setTwentyStatus(result.mocked ? 'Mock Ping Successful (Setup Keys for real API)' : 'Successfully connected to Twenty CRM!');
    } else {
      setTwentyStatus('Failed: ' + result.error);
    }
  };

  const testTurf = async () => {
    setTurfStatus('Calculating distance with Turf.js...');
    const paris = [2.3522, 48.8566];
    const tokyo = [139.6917, 35.6895];
    const dist = await calculateDistance(paris, tokyo);
    setTurfStatus(`Distance from Paris to Tokyo: ${Math.round(dist)} km`);
  };

  return (
    <div className="p-8 bg-neutral-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-primary">Advanced Integrations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Twenty API (12) */}
        <div className="bg-neutral-800 p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-semibold mb-2">Twenty CRM API</h2>
          <p className="text-white/60 mb-4">Connects to your self-hosted or cloud Twenty workspace.</p>
          <button onClick={testTwenty} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 mb-2">
            Ping Twenty
          </button>
          {twentyStatus && <div className="text-sm text-green-400 bg-black/30 p-2 rounded">{twentyStatus}</div>}
        </div>

        {/* Turf.js (14) */}
        <div className="bg-neutral-800 p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-semibold mb-2">Turf.js Spatial Analytics</h2>
          <p className="text-white/60 mb-4">Performs advanced geospatial math (via CDN).</p>
          <button onClick={testTurf} className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-500 mb-2">
            Calculate Paris to Tokyo
          </button>
          {turfStatus && <div className="text-sm text-green-400 bg-black/30 p-2 rounded">{turfStatus}</div>}
        </div>

        {/* LiveKit & Manim AI Tutor */}
        <div className="bg-neutral-800 p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-semibold mb-2">LiveKit + Manim AI Tutor</h2>
          <p className="text-white/60 mb-4">Architectural mock for Voice Agents generating on-the-fly mathematical animations.</p>
          <button onClick={() => setLivekitActive(!livekitActive)} className="px-4 py-2 bg-orange-600 rounded hover:bg-orange-500 mb-4">
            {livekitActive ? 'Disconnect Agent' : 'Connect AI Tutor'}
          </button>
          
          {livekitActive && (
            <div className="flex gap-4 h-48">
              {/* Agent Voice Feed Placeholder */}
              <div className="flex-1 bg-black rounded-lg border border-white/10 flex flex-col items-center justify-center p-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-purple-600 animate-pulse mb-3 shadow-[0_0_20px_rgba(249,115,22,0.4)]" />
                <span className="text-sm font-medium">Agent Speaking...</span>
              </div>
              
              {/* Manim Video Feed Placeholder */}
              <div className="flex-[2] bg-black rounded-lg border border-white/10 overflow-hidden relative group">
                <video 
                  className="w-full h-full object-cover opacity-80"
                  autoPlay loop muted playsInline
                  src="https://cdn.pixabay.com/video/2020/05/25/40141-424844358_large.mp4"
                />
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-xs px-2 py-1 rounded text-white/80 border border-white/10">
                  Manim Engine Stream
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Web-LLM (9) / Vercel AI (11) */}
        <div className="bg-neutral-800 p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-semibold mb-2">Vercel AI & Web-LLM</h2>
          <p className="text-white/60 mb-4">We are currently using Gemini via standard fetch in the Scenery Simulator to bypass local install restrictions.</p>
          <a href="/simulator" className="inline-block px-4 py-2 bg-teal-600 rounded hover:bg-teal-500">
            View in Simulator
          </a>
        </div>

      </div>

      <div className="mt-12 border-t border-white/10 pt-12">
        <h2 className="text-2xl font-bold mb-4 text-primary">Sonic Forge (AI Instrument Generator)</h2>
        <p className="text-white/60 mb-8 max-w-3xl">
          Chat with the AI to forge brand new, unique historical or futuristic instruments via the MiniMax T2A engine.
          The generated audio files are permanently saved to your browser's IndexedDB Sound Vault, meaning you can
          take them directly into the Scenery Simulator and assign them to the Custom Mixer slots to compose your own generative tracks!
        </p>
        <SonicForgeChat />
      </div>

    </div>
  );
}
