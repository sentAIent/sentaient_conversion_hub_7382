import React, { useState } from 'react';
import { generateMusic } from '../services/minimaxAudio';
import { saveInstrument } from '../services/soundLibrary';

export default function SonicForgeChat() {
  const [instrument, setInstrument] = useState('');
  const [era, setEra] = useState('');
  const [region, setRegion] = useState('');
  const [isForging, setIsForging] = useState(false);
  const [chatLog, setChatLog] = useState([
    { role: 'ai', text: 'Welcome to the Sonic Forge. What kind of instrument are you looking to create?' }
  ]);

  const forgeSound = async (e) => {
    e.preventDefault();
    if (!instrument) return;

    const prompt = `A 15-second solo loop of a ${era || 'modern'} ${instrument} from ${region || 'the world'} playing a deep hypnotic groove.`;
    
    setChatLog(prev => [...prev, { role: 'user', text: `I need a ${era} ${instrument} from ${region}.` }]);
    setIsForging(true);

    try {
      const result = await generateMusic(prompt);
      
      if (result.success) {
        // In a real app we'd fetch the blob here. We will just save the URL for now,
        // or fetch it as a blob if CORS allows. For simplicity, we save the blob.
        const response = await fetch(result.audioUrl);
        const blob = await response.blob();
        
        const id = 'inst_' + Date.now();
        const name = `${era} ${instrument}`.trim();
        await saveInstrument(id, name, blob, { genre: region });
        
        setChatLog(prev => [...prev, { 
          role: 'ai', 
          text: `Forged successfully! I've permanently saved "${name}" to your Sonic Vault. You can now use it in the Scenery Simulator.`,
          isSuccess: true 
        }]);
      } else {
        setChatLog(prev => [...prev, { role: 'ai', text: `Failed to forge: ${result.error}`, isError: true }]);
      }
    } catch (error) {
      setChatLog(prev => [...prev, { role: 'ai', text: `Network error: ${error.message}`, isError: true }]);
    }
    
    setIsForging(false);
    setInstrument('');
    setEra('');
    setRegion('');
  };

  return (
    <div className="bg-neutral-900 border border-white/10 rounded-2xl flex flex-col h-[500px] overflow-hidden max-w-2xl mx-auto mt-8">
      <div className="bg-neutral-800 p-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-orange-500 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          ✨
        </div>
        <div>
          <h2 className="text-white font-medium">Sonic Forge AI</h2>
          <p className="text-white/40 text-xs">Forging new historical & futuristic instruments</p>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {chatLog.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 
              msg.isError ? 'bg-red-900/50 text-red-200 border border-red-500/50 rounded-bl-none' :
              msg.isSuccess ? 'bg-green-900/30 text-green-200 border border-green-500/30 rounded-bl-none' :
              'bg-white/10 text-white rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isForging && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-2xl text-sm bg-white/5 text-white/50 rounded-bl-none flex gap-2 items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
              <span>Forging Instrument...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={forgeSound} className="p-4 bg-neutral-800 border-t border-white/10">
        <div className="flex gap-2 mb-2">
          <input 
            type="text" placeholder="Era (e.g. 1920s)" value={era} onChange={e => setEra(e.target.value)}
            className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            disabled={isForging}
          />
          <input 
            type="text" placeholder="Region (e.g. Kyoto)" value={region} onChange={e => setRegion(e.target.value)}
            className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            disabled={isForging}
          />
        </div>
        <div className="flex gap-2">
          <input 
            type="text" placeholder="Instrument (e.g. Koto)" value={instrument} onChange={e => setInstrument(e.target.value)} required
            className="flex-[2] bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            disabled={isForging}
          />
          <button type="submit" disabled={isForging} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
            Forge
          </button>
        </div>
      </form>
    </div>
  );
}
