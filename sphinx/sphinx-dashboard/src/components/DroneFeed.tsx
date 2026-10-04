import React, { useEffect, useRef, useState } from 'react';

export const DroneFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load flv.js from CDN to bypass npm restrictions and SSR issues
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/flv.js/1.6.2/flv.min.js';
    script.async = true;
    
    script.onload = () => {
      const flvjs = (window as any).flvjs;
      if (flvjs && flvjs.isSupported() && videoRef.current) {
        const flvPlayer = flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          url: 'http://localhost:8000/live/drone.flv', // URL from our node-media-server
        });
        flvPlayer.attachMediaElement(videoRef.current);
        flvPlayer.load();
        
        flvPlayer.on(flvjs.Events.ERROR, (errType: string, errDetail: string) => {
           setError(`Stream error: ${errType}`);
        });

        // Store reference to destroy on unmount
        (videoRef.current as any).player = flvPlayer;
      } else {
        setError('flv.js not supported in this browser');
      }
    };
    
    document.body.appendChild(script);

    return () => {
      if (videoRef.current && (videoRef.current as any).player) {
        (videoRef.current as any).player.destroy();
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="absolute top-[8vw] right-[1vw] z-40 w-[20vw] bg-black/90 border border-cyan-900 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(8,145,178,0.3)]">
      <div className="bg-cyan-900/40 px-[0.5vw] py-[0.2vw] text-cyan-400 font-mono text-[0.8vw] flex justify-between items-center border-b border-cyan-900">
        <span>DJI MAVIC 2 PRO - LIVE STREAM</span>
        <span className="animate-pulse text-red-500 text-[0.6vw]">● REC</span>
      </div>
      <div className="relative w-full aspect-video bg-gray-900 flex items-center justify-center">
        {error ? (
           <span className="text-red-500 font-mono text-[0.8vw] z-10">{error}</span>
        ) : !isPlaying ? (
           <span className="text-gray-500 font-mono text-[0.8vw] z-10">WAITING FOR SIGNAL...</span>
        ) : null}
        <video 
          ref={videoRef} 
          className="absolute inset-0 w-full h-full object-cover z-0" 
          autoPlay 
          muted 
          onPlay={() => { setIsPlaying(true); setError(''); }}
        />
      </div>
      {/* Telemetry overlay placeholder */}
      <div className="p-[0.5vw] grid grid-cols-2 gap-[0.5vw] font-mono text-[0.7vw] text-gray-400">
         <div>ALT: <span className="text-green-400">-- m</span></div>
         <div>SPD: <span className="text-green-400">-- m/s</span></div>
         <div>BAT: <span className="text-green-400">-- %</span></div>
         <div>SAT: <span className="text-green-400">--</span></div>
      </div>
    </div>
  );
};
