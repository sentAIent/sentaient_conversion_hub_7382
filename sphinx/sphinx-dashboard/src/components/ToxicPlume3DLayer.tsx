"use client";
import React, { useState, useMemo } from 'react';
import { Source, Layer, Marker } from 'react-map-gl/maplibre';
import {
  ToxicSite,
  GLOBAL_TOXIC_SITES
} from '../lib/intelligence/toxicSitesData';
import { ToxicPlumeEngine } from '../lib/intelligence/toxicPlumeEngine';
import { AlertTriangle, Biohazard, Skull, Droplets, Compass } from 'lucide-react';

interface ToxicPlume3DLayerProps {
  visible: boolean;
  bboxStr?: string | null;
  onSelectSite?: (site: ToxicSite | null) => void;
  selectedSiteId?: string | null;
}

export const ToxicPlume3DLayer: React.FC<ToxicPlume3DLayerProps> = ({
  visible,
  bboxStr = null,
  onSelectSite,
  selectedSiteId = null
}) => {
  // 1. Plumes & Dispersion GeoJSON
  const plumesGeoJson = useMemo(() => {
    if (!visible) return null;
    return ToxicPlumeEngine.computeToxicPlumesGeoJSON(GLOBAL_TOXIC_SITES);
  }, [visible]);

  // 2. 3D Facility & Chemical Tank Extrusions
  const extrusionsGeoJson = useMemo(() => {
    if (!visible) return null;
    return ToxicPlumeEngine.computeFacilityExtrusionsGeoJSON(GLOBAL_TOXIC_SITES);
  }, [visible]);

  // 3. Filter sites in viewport if bbox provided
  const visibleSites = useMemo(() => {
    if (!visible) return [];
    if (!bboxStr) return GLOBAL_TOXIC_SITES;
    const parts = bboxStr.split(',').map(Number);
    if (parts.length !== 4 || parts.some(isNaN)) return GLOBAL_TOXIC_SITES;
    const [minLon, minLat, maxLon, maxLat] = parts;
    const padLon = (maxLon - minLon) * 0.2;
    const padLat = (maxLat - minLat) * 0.2;
    return GLOBAL_TOXIC_SITES.filter(s => {
      const [lon, lat] = s.coordinates;
      return lon >= minLon - padLon && lon <= maxLon + padLon &&
             lat >= minLat - padLat && lat <= maxLat + padLat;
    });
  }, [visible, bboxStr]);

  if (!visible) return null;

  return (
    <>
      {/* 3D Facility & Tank Extrusions Layer */}
      {extrusionsGeoJson && (
        <Source id="toxic-facility-extrusions-source" type="geojson" data={extrusionsGeoJson as any}>
          <Layer
            id="toxic-facility-extrusions"
            type="fill-extrusion"
            paint={{
              'fill-extrusion-color': ['get', 'color'],
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-base': ['get', 'base_height'],
              'fill-extrusion-opacity': 0.85
            }}
          />
        </Source>
      )}

      {/* Multi-Horizon Plume Dispersion Polygons & Safe Perimeter Buffers */}
      {plumesGeoJson && (
        <Source id="toxic-plumes-source" type="geojson" data={plumesGeoJson as any}>
          {/* Filled Plume Lobes */}
          <Layer
            id="toxic-plumes-fill"
            type="fill"
            filter={['==', '$type', 'Polygon']}
            paint={{
              'fill-color': ['get', 'fill_color'],
              'fill-opacity': 0.70
            }}
          />
          {/* Plume Boundary Lines & Pulse Contours */}
          <Layer
            id="toxic-plumes-line"
            type="line"
            filter={['==', '$type', 'Polygon']}
            paint={{
              'line-color': ['get', 'stroke_color'],
              'line-width': [
                'case',
                ['==', ['get', 'plume_horizon'], 'safe_buffer'], 1.8,
                ['==', ['get', 'plume_horizon'], 'core'], 3.2,
                2.2
              ],
              'line-opacity': 0.90
            }}
          />
          {/* Hydraulic Flow Vector Lines */}
          <Layer
            id="toxic-flow-vectors-line"
            type="line"
            filter={['==', ['get', 'type'], 'hydraulic_flow_vector']}
            paint={{
              'line-color': '#facc15', // Glowing Amber/Yellow
              'line-width': 2.5,
              'line-opacity': 0.95,
              'line-dasharray': [4, 3]
            }}
          />
        </Source>
      )}

      {/* Floating AR Tactical Hazard Badges */}
      {visibleSites.map(site => {
        const isSelected = selectedSiteId === site.site_id;
        const [lon, lat] = site.coordinates;

        return (
          <Marker
            key={site.site_id}
            longitude={lon}
            latitude={lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              if (onSelectSite) onSelectSite(site);
            }}
          >
            <div 
              data-testid={`marker-toxic-site-${site.site_id}`}
              className="group cursor-pointer select-none flex flex-col items-center transform -translate-y-2 transition-transform hover:scale-110"
            >
              {/* Floating Holographic Hazard Diamond */}
              <div className={`relative px-2 py-1 rounded-md border text-[10px] font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-2xl backdrop-blur-md transition-all ${
                isSelected
                  ? 'bg-red-950/95 border-red-400 text-red-200 ring-2 ring-red-500 scale-105'
                  : site.residential_risk_rating === 'CRITICAL_NO_BUILD'
                    ? 'bg-slate-950/90 border-red-600/70 text-red-300 hover:border-red-400'
                    : 'bg-slate-950/90 border-amber-600/70 text-amber-300 hover:border-amber-400'
              }`}>
                {/* Pulsing Core Indicator */}
                <div className="relative flex items-center justify-center">
                  <span className={`w-2 h-2 rounded-full ${
                    site.residential_risk_rating === 'CRITICAL_NO_BUILD' ? 'bg-red-500 animate-ping' : 'bg-amber-400'
                  }`} />
                  <span className={`absolute w-1.5 h-1.5 rounded-full ${
                    site.residential_risk_rating === 'CRITICAL_NO_BUILD' ? 'bg-red-400' : 'bg-amber-300'
                  }`} />
                </div>

                <div className="flex flex-col leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px]">☣️</span>
                    <span className="font-bold text-white text-[10px] truncate max-w-[130px]">
                      {site.name}
                    </span>
                  </div>
                  <div className="text-[8px] flex items-center gap-1 text-gray-300">
                    <span className="text-red-400 font-semibold">DO NOT BUILD</span>
                    <span>•</span>
                    <span className="text-gray-400">{site.seepage_velocity_ft_yr} ft/yr</span>
                  </div>
                </div>
              </div>

              {/* Laser Ground Anchor Tether */}
              <div className="w-[1.5px] h-3 bg-gradient-to-b from-red-500/80 to-transparent" />
              <div className="w-2 h-2 rounded-full border border-red-500/60 bg-red-950/50 -mt-1" />
            </div>
          </Marker>
        );
      })}
    </>
  );
};
