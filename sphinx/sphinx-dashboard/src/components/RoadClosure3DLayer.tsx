"use client";
import React, { useState } from 'react';
import { Source, Layer, Marker, Popup } from 'react-map-gl/maplibre';
import { AlertTriangle, ShieldAlert, ArrowRight, Clock, Gauge, X } from 'lucide-react';

interface RoadClosure3DLayerProps {
  data: GeoJSON.FeatureCollection | null;
  visible: boolean;
  beforeId?: string;
}

export const RoadClosure3DLayer: React.FC<RoadClosure3DLayerProps> = ({
  data,
  visible,
  beforeId
}) => {
  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);

  if (!visible || !data || !Array.isArray(data.features) || data.features.length === 0) {
    return null;
  }

  // Filter out point features for 3D AR markers
  const pointFeatures = data.features.filter(
    f => f.geometry.type === 'Point' && f.properties?.parent_id
  );

  return (
    <>
      <Source id="road-closures-3d-source" type="geojson" data={data}>
        {/* 1. 3D Extrusion Barricades (Physical 3D blocks rising 20-40m in pitch perspective) */}
        <Layer
          id="road-barricade-3d-extrusion"
          type="fill-extrusion"
          beforeId={beforeId}
          filter={['==', 'is_3d_barricade', true]}
          paint={{
            'fill-extrusion-color': [
              'case',
              ['==', ['get', 'type'], 'HARD_CLOSURE'],
              '#dc2626',
              '#d97706'
            ],
            'fill-extrusion-height': ['get', 'height_m'],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.88
          }}
        />

        {/* 2. Hazard Highway Ribbon: Wide outer neon glow */}
        <Layer
          id="road-hazard-outer-glow"
          type="line"
          beforeId={beforeId}
          filter={['==', ['geometry-type'], 'LineString']}
          paint={{
            'line-color': [
              'case',
              ['==', ['get', 'type'], 'HARD_CLOSURE'],
              '#ef4444',
              '#f59e0b'
            ],
            'line-width': 9,
            'line-opacity': 0.45,
            'line-blur': 3
          }}
        />

        {/* 3. Hazard Highway Ribbon: Intense glowing core line */}
        <Layer
          id="road-hazard-core-line"
          type="line"
          beforeId={beforeId}
          filter={['==', ['geometry-type'], 'LineString']}
          paint={{
            'line-color': [
              'case',
              ['==', ['get', 'type'], 'HARD_CLOSURE'],
              '#fca5a5',
              '#fef08a'
            ],
            'line-width': 3.5,
            'line-opacity': 0.95
          }}
        />

        {/* 4. Caution Striping: Tactical dashed hazard overlay */}
        <Layer
          id="road-hazard-caution-stripe"
          type="line"
          beforeId={beforeId}
          filter={['==', ['geometry-type'], 'LineString']}
          paint={{
            'line-color': '#000000',
            'line-width': 2.5,
            'line-dasharray': [1.5, 1.5]
          }}
        />
      </Source>

      {/* 5. 3D AR Floating Beacons & Warning Diamonds */}
      {pointFeatures.map((f, idx) => {
        const coords = (f.geometry as GeoJSON.Point).coordinates;
        const p = f.properties || {};
        const isCritical = p.type === 'HARD_CLOSURE';

        return (
          <Marker
            key={`closure-marker-${p.id || idx}`}
            longitude={coords[0]}
            latitude={coords[1]}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedIncident({
                ...p,
                coords
              });
            }}
          >
            <div className="cursor-pointer group relative flex flex-col items-center pointer-events-auto transform transition-transform hover:scale-110">
              {/* Floating Holographic Warning Diamond Badge */}
              <div 
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-mono text-[10px] sm:text-xs font-bold tracking-wider backdrop-blur-md shadow-lg transition-all ${
                  isCritical 
                    ? 'bg-red-950/90 border-red-500 text-red-100 shadow-[0_0_18px_rgba(239,68,68,0.7)] animate-pulse'
                    : 'bg-amber-950/90 border-amber-500 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.6)]'
                }`}
              >
                {isCritical ? (
                  <ShieldAlert size={14} className="text-red-400 shrink-0" />
                ) : (
                  <AlertTriangle size={14} className="text-amber-400 shrink-0" />
                )}
                <span>{isCritical ? 'ROAD CLOSED' : 'WORK ZONE'}</span>
                {p.speed_limit_reduction_mph && (
                  <span className="text-[9px] px-1 py-0.2 rounded bg-black/60 border border-current">
                    -{p.speed_limit_reduction_mph} MPH
                  </span>
                )}
              </div>

              {/* Pulsing Strobe / Vertical Laser Line Anchoring to Ground */}
              <div className="flex flex-col items-center">
                <div className={`w-0.5 h-6 ${isCritical ? 'bg-red-400/80 shadow-[0_0_8px_#ef4444]' : 'bg-amber-400/80 shadow-[0_0_8px_#f59e0b]'}`} />
                <div className={`w-2.5 h-2.5 rounded-full ${isCritical ? 'bg-red-500 ring-4 ring-red-500/30' : 'bg-amber-500 ring-4 ring-amber-500/30'} animate-ping`} />
              </div>
            </div>
          </Marker>
        );
      })}

      {/* 6. Tactical Road Incident Detail Modal / Popup */}
      {selectedIncident && (
        <Popup
          longitude={selectedIncident.coords[0]}
          latitude={selectedIncident.coords[1]}
          anchor="top"
          onClose={() => setSelectedIncident(null)}
          closeButton={false}
          className="z-50"
        >
          <div className="bg-black/95 border border-cyan-800 p-4 rounded-xl shadow-[0_0_30px_rgba(8,145,178,0.4)] text-white font-mono max-w-sm backdrop-blur-md">
            <div className="flex justify-between items-start border-b border-cyan-900/60 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-base ${selectedIncident.type === 'HARD_CLOSURE' ? 'text-red-400' : 'text-amber-400'}`}>
                  {selectedIncident.type === 'HARD_CLOSURE' ? '⛔' : '🚧'}
                </span>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-cyan-200">{selectedIncident.road_name}</h4>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded border font-bold ${
                    selectedIncident.type === 'HARD_CLOSURE'
                      ? 'bg-red-950 text-red-300 border-red-700'
                      : 'bg-amber-950 text-amber-300 border-amber-700'
                  }`}>
                    {selectedIncident.type.replace('_', ' ')} • {selectedIncident.severity}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedIncident(null)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-300 mb-3">
              <p className="text-gray-200">{selectedIncident.description}</p>
              
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-cyan-900/40">
                <div className="flex items-center gap-1.5 text-[11px] text-cyan-300">
                  <Gauge size={13} className="shrink-0 text-cyan-400" />
                  <span>{selectedIncident.lanes_blocked}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-amber-300">
                  <Clock size={13} className="shrink-0 text-amber-400" />
                  <span>Est. Delay: +{selectedIncident.delay_minutes}m</span>
                </div>
              </div>

              {selectedIncident.detour_route && (
                <div className="bg-cyan-950/40 border border-cyan-800/60 p-2 rounded-lg text-[11px] flex items-start gap-1.5 mt-2">
                  <ArrowRight size={13} className="shrink-0 text-cyan-400 mt-0.5" />
                  <div>
                    <span className="font-bold text-cyan-300">TACTICAL DETOUR:</span>
                    <span className="text-gray-200 ml-1">{selectedIncident.detour_route}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="text-[10px] text-gray-500 text-right font-mono">
              3D AR Barricade Extrusion: {selectedIncident.extrusion_height_m}m
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};
