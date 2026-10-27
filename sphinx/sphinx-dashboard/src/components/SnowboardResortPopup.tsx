import React from 'react';
import { Popup } from 'react-map-gl';

export interface SnowboardResortPopupProps {
  resort: any;
  onClose: () => void;
  onGetDirections: (resort: any) => void;
}

export const SnowboardResortPopup: React.FC<SnowboardResortPopupProps> = ({
  resort,
  onClose,
  onGetDirections
}) => {
  const lng = Number(resort.lng);
  const lat = Number(resort.lat);

  if (isNaN(lng) || isNaN(lat)) return null;

  return (
    <Popup
      longitude={lng}
      latitude={lat}
      anchor="bottom"
      onClose={onClose}
      className="sphinx-popup"
      closeButton={true}
      closeOnClick={false}
    >
      <div className="bg-black/95 text-white p-3.5 rounded-lg border border-cyan-500/80 max-w-[320px] font-mono text-xs shadow-2xl">
        <div className="flex items-center justify-between pb-1.5 border-b border-cyan-900/50 mb-2">
          <span className="font-bold text-cyan-300 text-sm flex items-center gap-1.5">
            <span>🏂</span> {resort.name}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded uppercase font-bold bg-cyan-950 border border-cyan-600 text-cyan-300">
            {resort.region || resort.country || 'Resort'}
          </span>
        </div>
        <div className="space-y-1.5 text-[11px] text-gray-300">
          <div className="grid grid-cols-2 gap-2 bg-white/5 p-2 rounded">
            <div>
              <span className="text-[10px] text-gray-400 block">Summit / Base</span>
              <strong className="text-white text-xs">
                {resort.summitFt ? Number(resort.summitFt).toLocaleString() : 'N/A'}′ / {resort.baseFt ? Number(resort.baseFt).toLocaleString() : 'N/A'}′
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">Vertical Drop</span>
              <strong className="text-emerald-400 text-xs">
                {resort.verticalDropFt ? Number(resort.verticalDropFt).toLocaleString() : 'N/A'} ft
              </strong>
            </div>
          </div>
          <div className="flex justify-between items-center text-[11px] py-0.5">
            <span className="text-gray-400">Terrain Parks:</span>
            <span className="font-bold text-amber-300">{resort.terrainParks || 'Yes'}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] py-0.5">
            <span className="text-gray-400">Trails & Lifts:</span>
            <span className="text-gray-200">{resort.runs ? `${resort.runs} runs` : (resort.downhillKm ? `${resort.downhillKm} km slopes` : 'Piste network')} • {resort.lifts ? `${resort.lifts} lifts` : 'Active lifts'}</span>
          </div>
          {resort.nightRiding && (
            <div className="flex items-center gap-1 text-[10px] text-indigo-300 bg-indigo-950/40 px-1.5 py-0.5 rounded border border-indigo-800/40">
              <span>🌙</span> Night riding / terrain park illuminated
            </div>
          )}
          <div className="pt-2 border-t border-gray-800 flex gap-2">
            <button
              type="button"
              onClick={() => onGetDirections(resort)}
              className="flex-1 py-1.5 px-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded font-bold text-center tracking-wider text-[11px] shadow-lg transition-all"
            >
              🏂 GET DIRECTIONS
            </button>
            {(resort.trailMapUrl || resort.website) && (
              <a
                href={resort.trailMapUrl || resort.website}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-2 bg-white/10 hover:bg-white/20 text-gray-200 rounded text-center text-[11px] transition-all flex items-center justify-center"
                title="View Official Trail Map"
              >
                🗺️ Map
              </a>
            )}
          </div>
        </div>
      </div>
    </Popup>
  );
};
