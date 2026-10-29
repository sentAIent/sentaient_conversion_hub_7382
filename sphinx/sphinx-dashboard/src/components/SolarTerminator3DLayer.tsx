"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Source, Layer, Marker } from 'react-map-gl/maplibre';
import { computeSolarTerminator, SolarTerminatorResult } from '../lib/solarTerminator';
import { Sun, Moon } from 'lucide-react';

interface SolarTerminator3DLayerProps {
  visible: boolean;
  beforeId?: string;
}

export const SolarTerminator3DLayer: React.FC<SolarTerminator3DLayerProps> = ({
  visible,
  beforeId
}) => {
  const [terminatorData, setTerminatorData] = useState<SolarTerminatorResult | null>(null);

  // Re-calculate solar coordinates every 60 seconds for live Earth rotation tracking
  useEffect(() => {
    if (!visible) return;
    setTerminatorData(computeSolarTerminator(new Date()));
    const interval = setInterval(() => {
      setTerminatorData(computeSolarTerminator(new Date()));
    }, 60000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible || !terminatorData) return null;

  return (
    <>
      {/* 1. Tactical Night Hemisphere Shadow Polygon */}
      <Source id="solar-night-shadow-source" type="geojson" data={terminatorData.nightPolygon}>
        <Layer
          id="solar-night-shadow-layer"
          type="fill"
          beforeId={beforeId}
          paint={{
            'fill-color': '#020617',
            'fill-opacity': 0.68
          }}
        />
      </Source>

      {/* 2. 3D AR Twilight Horizon Ribbon (Multi-pass Glowing Boundary) */}
      <Source id="solar-twilight-ribbon-source" type="geojson" data={terminatorData.twilightRibbon}>
        {/* Outer Twilight Ambient Atmospheric Glow */}
        <Layer
          id="solar-twilight-outer-glow"
          type="line"
          beforeId={beforeId}
          paint={{
            'line-color': '#f59e0b',
            'line-width': 14,
            'line-opacity': 0.35,
            'line-blur': 6
          }}
        />
        {/* Intense Core Laser Line */}
        <Layer
          id="solar-twilight-core-line"
          type="line"
          beforeId={beforeId}
          paint={{
            'line-color': '#ffedd5',
            'line-width': 2.5,
            'line-opacity': 0.95
          }}
        />
        {/* Inner Violet Twilight Fringe */}
        <Layer
          id="solar-twilight-violet-fringe"
          type="line"
          beforeId={beforeId}
          paint={{
            'line-color': '#818cf8',
            'line-width': 6,
            'line-opacity': 0.5,
            'line-blur': 2
          }}
        />
      </Source>

      {/* 3. Cybernetic Night City Lights Glowing in the Dark Hemisphere */}
      <Source id="solar-night-city-lights-source" type="geojson" data={terminatorData.nightCityGlow}>
        {/* Halo Glow */}
        <Layer
          id="night-city-halo-glow"
          type="circle"
          beforeId={beforeId}
          paint={{
            'circle-radius': 14,
            'circle-color': '#fef08a',
            'circle-opacity': 0.25,
            'circle-blur': 1
          }}
        />
        {/* Core Metro Light */}
        <Layer
          id="night-city-core-light"
          type="circle"
          beforeId={beforeId}
          paint={{
            'circle-radius': 3.5,
            'circle-color': '#fde047',
            'circle-opacity': 0.85
          }}
        />
      </Source>

      {/* 4. Sub-Solar Zenith Beacon (Point Directly Under Sun at 90° Elevation) */}
      <Marker
        longitude={terminatorData.sunPosition.lon}
        latitude={terminatorData.sunPosition.lat}
        anchor="center"
      >
        <div className="pointer-events-none group relative flex flex-col items-center">
          <div className="flex items-center gap-1 bg-amber-950/90 border border-amber-400 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.8)] backdrop-blur-md">
            <Sun size={12} className="text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>SOLAR ZENITH</span>
            <span className="text-amber-400">90°</span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-amber-400/40 animate-ping mt-1" />
        </div>
      </Marker>
    </>
  );
};
