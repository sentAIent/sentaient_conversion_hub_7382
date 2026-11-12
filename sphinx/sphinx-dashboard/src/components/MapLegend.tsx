import React from 'react';

export const MapLegend = () => {
  return (
    <div className="absolute bottom-16 right-6 z-10 w-48 bg-black/80 border border-cyan-900/50 p-3 rounded text-white font-mono shadow-[0_0_15px_rgba(8,145,178,0.2)] backdrop-blur-sm text-xs">
      <h3 className="font-bold text-cyan-400 mb-2 border-b border-cyan-900/50 pb-1">MAP LEGEND</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
          <span>Aircraft</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-fuchsia-500 border border-white"></div>
          <span>Cell Tower (Mast)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Natural Spring</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span>Power Grid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <span>Aviation/Helipad</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span>Emergency/Police</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white"></div>
          <span>Camera</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span>Earthquake</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-70"></div>
          <span>Severe Weather</span>
        </div>
      </div>
    </div>
  );
};
