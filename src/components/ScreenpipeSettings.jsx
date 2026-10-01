import React, { useState } from 'react';
import { useScreenpipe } from '../hooks/useScreenpipe';

export default function ScreenpipeSettings() {
  const { isConnected, isConnecting, error, apiUrl } = useScreenpipe();
  const [port, setPort] = useState(apiUrl.split(':').pop() || '3030');

  const handlePortChange = (e) => {
    setPort(e.target.value);
  };

  const handleSaveAndTest = () => {
    localStorage.setItem('VITE_SCREENPIPE_API_URL', `http://localhost:${port}`);
    window.location.reload(); 
  };

  return (
    <div className="bg-[#e5e5e5] border-4 border-black p-8 text-black max-w-2xl font-mono uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-8">
      <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-8">
        <div>
          <h2 className="text-4xl font-black tracking-tighter leading-none mb-1">SCREENPIPE_CONFIG</h2>
          <p className="text-xs font-bold text-gray-500">SYS.CONTEXT.OMNISCIENT_MEMORY</p>
        </div>
        
        <div className={`px-4 py-2 border-4 border-black font-black text-sm ${
          isConnecting ? 'bg-yellow-400' : isConnected ? 'bg-green-400' : 'bg-red-500 text-white'
        }`}>
          {isConnecting ? 'PINGING_LOCAL...' : isConnected ? 'UPLINK_ESTABLISHED' : 'CONNECTION_SEVERED'}
        </div>
      </div>

      <div className="space-y-8">
        <p className="text-sm font-bold bg-black text-white p-4">
          WARNING: Screenpipe captures local screen and audio telemetry. 
          Establishing this uplink grants Sentaient's AI Concierge "God-Mode" 
          environmental awareness.
        </p>

        {error && (
          <div className="border-l-8 border-red-600 bg-red-100 p-4 font-bold text-red-600 flex flex-col gap-2">
            <span>[ERR] {error}</span>
            <span className="text-xs text-black">DIAGNOSTIC: Ensure Screenpipe daemon is running locally on target port.</span>
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-black tracking-widest">LOCAL_PORT // OVERRIDE</label>
          <div className="flex">
            <span className="inline-flex items-center px-4 border-4 border-r-0 border-black bg-gray-300 font-bold">
              HTTP://LOCALHOST:
            </span>
            <input
              type="text"
              className="flex-1 w-full bg-white border-4 border-black px-4 py-3 text-black font-bold focus:outline-none focus:bg-yellow-200 transition-colors"
              value={port}
              onChange={handlePortChange}
            />
          </div>
        </div>

        <button
          onClick={handleSaveAndTest}
          className="w-full bg-blue-600 hover:bg-black text-white font-black text-xl py-4 border-4 border-black transition-colors"
        >
          WRITE_CONFIG_&_REBOOT
        </button>
      </div>
    </div>
  );
}
