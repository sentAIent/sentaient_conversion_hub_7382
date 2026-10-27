"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Source, Layer, Marker } from 'react-map-gl/maplibre';
import {
  GlobalDroneDockDataEngine,
  DroneDockStation,
  WORLDWIDE_DRONE_DOCKS
} from '../lib/intelligence/globalDroneDockData';
import { DroneDockPopupCard } from './DroneDockPopupCard';
import { Shield, Zap, Radio, AlertOctagon, Navigation } from 'lucide-react';

interface DroneDock3DLayerProps {
  visible: boolean;
  showBlindSpots?: boolean;
  bboxStr?: string | null;
  onSelectDock?: (dock: DroneDockStation | null) => void;
  selectedDockId?: string | null;
  onInspect3D?: (coords: [number, number]) => void;
  onOpenVideoFeed?: () => void;
}

export const DroneDock3DLayer: React.FC<DroneDock3DLayerProps> = ({
  visible,
  showBlindSpots = true,
  bboxStr = null,
  onSelectDock,
  selectedDockId = null,
  onInspect3D,
  onOpenVideoFeed
}) => {
  const [internalSelectedDock, setInternalSelectedDock] = useState<DroneDockStation | null>(null);

  // Generate GeoJSON sets
  const extrusionsData = useMemo(() => {
    if (!visible) return null;
    return GlobalDroneDockDataEngine.get3DExtrusionGeoJson(bboxStr);
  }, [visible, bboxStr]);

  const bvlosRingsData = useMemo(() => {
    if (!visible) return null;
    return GlobalDroneDockDataEngine.getBVLOSRangeRingsGeoJson(bboxStr);
  }, [visible, bboxStr]);

  const blindSpotsData = useMemo(() => {
    if (!visible || !showBlindSpots) return null;
    return GlobalDroneDockDataEngine.getBlindSpotGapsGeoJson(bboxStr);
  }, [visible, showBlindSpots, bboxStr]);

  const sortiesData = useMemo(() => {
    if (!visible) return null;
    return GlobalDroneDockDataEngine.getAirborneSortiesGeoJson(bboxStr);
  }, [visible, bboxStr]);

  // Active docks in current view
  const activeDocks = useMemo(() => {
    if (!visible) return [];
    if (!bboxStr) return WORLDWIDE_DRONE_DOCKS;
    const parts = bboxStr.split(',').map(Number);
    if (parts.length !== 4 || parts.some(isNaN)) return WORLDWIDE_DRONE_DOCKS;
    const [minLon, minLat, maxLon, maxLat] = parts;
    return WORLDWIDE_DRONE_DOCKS.filter(d => 
      d.coordinates[0] >= minLon && d.coordinates[0] <= maxLon &&
      d.coordinates[1] >= minLat && d.coordinates[1] <= maxLat
    );
  }, [visible, bboxStr]);

  if (!visible) return null;

  const currentDock = internalSelectedDock || (selectedDockId ? WORLDWIDE_DRONE_DOCKS.find(d => d.id === selectedDockId) : null);

  return (
    <>
      {/* 1. 3D Dock Extrusion Enclosures (Rising 6-14m in 3D pitch perspective) */}
      {extrusionsData && (
        <Source id="drone-dock-extrusions-src" type="geojson" data={extrusionsData}>
          <Layer
            id="drone-dock-3d-bay"
            type="fill-extrusion"
            paint={{
              'fill-extrusion-color': ['get', 'color'],
              'fill-extrusion-height': ['get', 'height_m'],
              'fill-extrusion-base': 0,
              'fill-extrusion-opacity': 0.92
            }}
          />
        </Source>
      )}

      {/* 2. BVLOS Tactical Response Range Rings (1.5 mi / 2.5 km) */}
      {bvlosRingsData && (
        <Source id="drone-dock-bvlos-rings-src" type="geojson" data={bvlosRingsData}>
          {/* Translucent Response Area Fill */}
          <Layer
            id="drone-dock-bvlos-fill"
            type="fill"
            paint={{
              'fill-color': ['get', 'fillColor'],
              'fill-opacity': 0.08
            }}
          />
          {/* Glowing Outer Perimeter */}
          <Layer
            id="drone-dock-bvlos-glow"
            type="line"
            paint={{
              'line-color': ['get', 'strokeColor'],
              'line-width': 4,
              'line-opacity': 0.45,
              'line-blur': 3
            }}
          />
          <Layer
            id="drone-dock-bvlos-core"
            type="line"
            paint={{
              'line-color': '#ffffff',
              'line-width': 1.2,
              'line-opacity': 0.85,
              'line-dasharray': [3, 2]
            }}
          />
        </Source>
      )}

      {/* 3. Coverage Blind-Spot & Line-of-Sight Occlusion Gaps */}
      {blindSpotsData && (
        <Source id="drone-dock-blind-spots-src" type="geojson" data={blindSpotsData}>
          <Layer
            id="drone-dock-blind-spot-fill"
            type="fill"
            paint={{
              'fill-color': ['get', 'color'],
              'fill-opacity': 0.18
            }}
          />
          <Layer
            id="drone-dock-blind-spot-line"
            type="line"
            paint={{
              'line-color': ['get', 'color'],
              'line-width': 2.5,
              'line-opacity': 0.9,
              'line-dasharray': [2, 1]
            }}
          />
        </Source>
      )}

      {/* 4. Airborne Drone Flight Sorties & Laser Tethers */}
      {sortiesData && (
        <Source id="drone-sorties-src" type="geojson" data={sortiesData}>
          {/* Laser Tether Line to Home Dock */}
          <Layer
            id="drone-laser-tether"
            type="line"
            filter={['==', 'type', 'laser_tether']}
            paint={{
              'line-color': '#00f0ff',
              'line-width': 2.5,
              'line-opacity': 0.8,
              'line-dasharray': [1, 2]
            }}
          />
          {/* Target Vector Line to 911 Incident */}
          <Layer
            id="drone-target-vector"
            type="line"
            filter={['==', 'type', 'incident_target_vector']}
            paint={{
              'line-color': '#ef4444',
              'line-width': 2.0,
              'line-opacity': 0.85,
              'line-dasharray': [3, 2]
            }}
          />
        </Source>
      )}

      {/* 5. 3D AR Floating Dock Badges & LED Strobe Beacons */}
      {activeDocks.map(dock => {
        const isAirborne = dock.status === 'MISSION_AIRBORNE';
        const isCharging = dock.status === 'RECHARGING';
        const isSelected = currentDock?.id === dock.id;

        return (
          <Marker
            key={dock.id}
            longitude={dock.coordinates[0]}
            latitude={dock.coordinates[1]}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setInternalSelectedDock(dock);
              if (onSelectDock) onSelectDock(dock);
            }}
          >
            <div className={`cursor-pointer group flex flex-col items-center select-none transition-transform duration-200 ${isSelected ? 'scale-125 z-40' : 'hover:scale-110'}`}>
              {/* Floating Holographic Badge */}
              <div className={`px-2 py-0.5 rounded-md border text-[9px] font-mono font-bold tracking-wider shadow-lg flex items-center gap-1.5 backdrop-blur-md whitespace-nowrap transition-all ${
                isAirborne
                  ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.8)]'
                  : isCharging
                  ? 'bg-amber-950/90 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                  : 'bg-slate-950/90 border-sky-400 text-sky-200 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
              }`}>
                <span className="text-[10px]">🛸</span>
                <span>{dock.callsign}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${isAirborne ? 'bg-cyan-400 animate-ping' : (isCharging ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400')}`} />
                <span className="text-[8px] opacity-80">{dock.battery_pct}%</span>
              </div>

              {/* Tactical Ground Ring & Vertical Anchor Beam */}
              <div className="w-0.5 h-3 bg-gradient-to-b from-sky-400 to-transparent opacity-75" />
              <div className={`w-3 h-3 rounded-full border-2 ${
                isAirborne 
                  ? 'border-cyan-400 bg-cyan-500/30 ring-4 ring-cyan-400/40 animate-pulse' 
                  : isCharging
                  ? 'border-amber-400 bg-amber-500/30 ring-2 ring-amber-400/30'
                  : 'border-emerald-400 bg-emerald-500/30 ring-2 ring-emerald-400/30'
              }`} />
            </div>
          </Marker>
        );
      })}

      {/* 6. 3D AR Floating Airborne Drones on Active 911 Calls */}
      {activeDocks.filter(d => d.status === 'MISSION_AIRBORNE' && d.active_sortie).map(dock => {
        const s = dock.active_sortie!;
        return (
          <Marker
            key={`airborne-${dock.id}`}
            longitude={s.current_coords[0]}
            latitude={s.current_coords[1]}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setInternalSelectedDock(dock);
              if (onSelectDock) onSelectDock(dock);
            }}
          >
            <div className="cursor-pointer group flex flex-col items-center select-none animate-bounce" style={{ animationDuration: '3s' }}>
              {/* Telemetry pill */}
              <div className="bg-red-950/95 border border-red-500 text-red-200 px-2 py-0.5 rounded text-[8px] font-mono font-bold shadow-[0_0_15px_rgba(239,68,68,0.9)] flex items-center gap-1.5 backdrop-blur-md">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                <span>{s.callsign}</span>
                <span className="text-white/80">ALT {s.altitude_ft_agl}FT</span>
                <span className="text-amber-300">{s.speed_kts}KT</span>
              </div>

              {/* Holographic Drone Icon with Rotating Heading */}
              <div 
                className="w-7 h-7 rounded-full bg-cyan-900/80 border-2 border-cyan-400 flex items-center justify-center text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.9)] my-0.5 transition-transform"
                style={{ transform: `rotate(${s.heading_deg}deg)` }}
                title={`${s.incident_type} (${s.incident_cad_code})`}
              >
                <Navigation size={14} className="text-cyan-300 transform -rotate-45" />
              </div>

              {/* Incident Target Label */}
              <div className="text-[7px] text-amber-300 font-mono font-semibold bg-black/80 px-1 rounded border border-amber-400/40">
                ETA {s.eta_seconds}s
              </div>
            </div>
          </Marker>
        );
      })}

      {/* 7. Interactive Dock Popup HUD Card */}
      {currentDock && (
        <DroneDockPopupCard
          dock={currentDock}
          onClose={() => {
            setInternalSelectedDock(null);
            if (onSelectDock) onSelectDock(null);
          }}
          onInspect3D={onInspect3D}
          onOpenVideoFeed={onOpenVideoFeed}
        />
      )}
    </>
  );
};
