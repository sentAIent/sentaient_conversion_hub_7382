import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AlertTriangle, Map as MapIcon, Crosshair, ShieldAlert } from 'lucide-react';
import * as turf from '@turf/turf';

export default function ThreatMap() {
  const { user } = useAuth();
  const [threatClusters, setThreatClusters] = useState([]);

  useEffect(() => {
    // Generate mock random threat points across the globe
    const points = turf.randomPoint(50, { bbox: [-180, -90, 180, 90] });
    
    // Use Turf.js to cluster nearby threats (simulating a DDoS origin mapping)
    // We add a mock 'severity' to each point
    points.features.forEach(f => f.properties.severity = Math.random() > 0.8 ? 'Critical' : 'Warning');

    // Grouping nearby points to show clusters
    const clustered = turf.clustersDbscan(points, 1000); // 1000km clustering radius
    
    setThreatClusters(clustered.features.map(f => ({
      coords: f.geometry.coordinates,
      severity: f.properties.severity,
      clusterId: f.properties.cluster,
      isCluster: f.properties.cluster !== undefined
    })));
  }, []);

  return (
    <div className="page-content fade-in" style={{ padding: '2rem' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <MapIcon size={32} /> Geospatial Threat Map (Powered by Turf.js)
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Real-time clustering of incoming cyberattacks and latency anomalies using in-browser Turf.js geospatial algorithms.
      </p>

      <div style={{ 
        width: '100%', 
        height: '600px', 
        background: 'radial-gradient(circle at center, #112233 0%, #000 100%)',
        borderRadius: '16px',
        border: '1px solid rgba(255,50,50,0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Mock Map UI */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/Equirectangular_projection_SW.jpg")', backgroundSize: 'cover' }} />
        
        {threatClusters.map((cluster, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${((cluster.coords[0] + 180) / 360) * 100}%`,
            top: `${((90 - cluster.coords[1]) / 180) * 100}%`,
            transform: 'translate(-50%, -50%)',
            background: cluster.severity === 'Critical' ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 165, 0, 0.5)',
            border: `1px solid ${cluster.severity === 'Critical' ? 'red' : 'orange'}`,
            borderRadius: '50%',
            width: cluster.isCluster ? '40px' : '15px',
            height: cluster.isCluster ? '40px' : '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '10px'
          }}>
            {cluster.isCluster && <ShieldAlert size={16} />}
          </div>
        ))}
      </div>
    </div>
  );
}
