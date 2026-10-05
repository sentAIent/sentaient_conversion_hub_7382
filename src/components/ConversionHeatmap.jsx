import React, { useEffect, useState } from 'react';
import * as turf from '@turf/turf';

/**
 * ConversionHeatmap.jsx
 * Uses Turf.js to analyze geospatial conversion data locally, without sending coordinates to a server.
 * This component stubs out the spatial processing logic and renders a data summary.
 */
export default function ConversionHeatmap({ geoJsonData }) {
    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {
        if (!geoJsonData) {
            // Mock data representing lead check-in locations (lon, lat)
            const mockPoints = turf.featureCollection([
                turf.point([-73.985130, 40.758896], { conversionValue: 1500 }), // NYC
                turf.point([-118.243683, 34.052235], { conversionValue: 800 }), // LA
                turf.point([-87.629799, 41.878113], { conversionValue: 2200 })  // Chicago
            ]);
            
            // Calculate the center of mass of our conversions
            const center = turf.centerOfMass(mockPoints);
            
            // Find conversions within a specific radius (e.g., 500 miles of NYC)
            const searchCenter = turf.point([-73.985130, 40.758896]);
            const radius = 500;
            const options = { steps: 64, units: 'miles' };
            const circle = turf.circle(searchCenter, radius, options);
            const pointsWithin = turf.pointsWithinPolygon(mockPoints, circle);

            setAnalysis({
                totalPoints: mockPoints.features.length,
                centerOfMass: center.geometry.coordinates,
                pointsNearNYC: pointsWithin.features.length
            });
        }
    }, [geoJsonData]);

    return (
        <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-6 font-mono text-xs">
            <h3 className="text-sm font-bold text-slate-100 mb-4 border-b border-slate-800 pb-2">Geospatial Analytics (Turf.js)</h3>
            
            {!analysis ? (
                <div className="text-slate-500 animate-pulse">Running local spatial analysis...</div>
            ) : (
                <div className="space-y-3">
                    <div className="flex justify-between p-2 bg-slate-950 rounded">
                        <span className="text-slate-400">Total Leads Mapped</span>
                        <span className="text-emerald-400">{analysis.totalPoints}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-950 rounded">
                        <span className="text-slate-400">Conversion Center of Mass (Lon/Lat)</span>
                        <span className="text-cyan-400">
                            {analysis.centerOfMass[0].toFixed(2)}, {analysis.centerOfMass[1].toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-950 rounded">
                        <span className="text-slate-400">Leads within 500m of NYC</span>
                        <span className="text-pink-400">{analysis.pointsNearNYC}</span>
                    </div>
                    
                    <div className="mt-4 p-3 border border-dashed border-slate-700 text-slate-500 text-center rounded">
                        (Mapbox GL JS rendering canvas goes here)
                    </div>
                </div>
            )}
        </div>
    );
}
