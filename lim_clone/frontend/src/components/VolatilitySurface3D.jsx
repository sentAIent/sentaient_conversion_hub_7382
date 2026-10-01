import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { Document, NodeIO } from '@gltf-transform/core';

function SurfacePoint({ x, y, z, val, onHover, onLeave }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Calibrate height based on value
  const height = z * 8; 

  // Heatmap gradient color based on Implied Volatility
  const color = useMemo(() => {
    if (val > 0.45) return '#ef4444'; // Red (High Volatility)
    if (val > 0.30) return '#f59e0b'; // Gold / Orange
    return '#10b981'; // Green (Low Volatility)
  }, [val]);

  return (
    <mesh
      ref={meshRef}
      position={[x, height / 2, y]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover({ x, y, z: val });
      }}
      onPointerOut={() => {
        setHovered(false);
        onLeave();
      }}
    >
      <boxGeometry args={[0.3, height, 0.3]} />
      <meshStandardMaterial
        color={hovered ? '#ffffff' : color}
        emissive={color}
        emissiveIntensity={hovered ? 1.5 : 0.4}
        transparent
        opacity={0.85}
        roughness={0.2}
      />
    </mesh>
  );
}

function Scene({ data, onHover, onLeave }) {
  const { scene } = useThree();

  const exportGLTF = () => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      function (gltf) {
        // Output is an ArrayBuffer (binary glTF)
        const blob = new Blob([gltf], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.download = `${symbol || 'surface'}_volatility.glb`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
      function (error) {
        console.error('An error happened during GLTF export:', error);
      },
      { binary: true } // Export as .glb
    );
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 20, 10]} intensity={1.5} />
      <directionalLight position={[-10, 15, -10]} intensity={0.8} />

      {/* Spatial Export Button */}
      <Html position={[10, 8, 10]}>
        <button 
          onClick={exportGLTF}
          className="bg-purple-600 hover:bg-purple-500 text-white text-[10px] px-3 py-1.5 rounded border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all font-mono whitespace-nowrap cursor-pointer pointer-events-auto"
        >
          <span className="mr-1">🥽</span> Export to Spatial (.glb)
        </button>
      </Html>

      {/* Grid Coordinates helper */}
      <gridHelper args={[24, 24, '#475569', '#1e293b']} position={[0, 0, 0]} />

      {/* Surface Plot Columns */}
      {data.map((pt, i) => {
        // Map data keys to scene coordinates
        // Strike offset: -6 to +6 (X)
        const sceneX = (pt.strike - 100) / 10;
        // DTE: -6 to +6 (Y)
        const sceneY = (pt.dte - 60) / 10;
        
        return (
          <SurfacePoint
            key={i}
            x={sceneX}
            y={sceneY}
            z={pt.iv}
            val={pt.iv}
            onHover={onHover}
            onLeave={onLeave}
          />
        );
      })}

      {/* Axis Titles */}
      <Html position={[7, 0, 0]}>
        <div className="bg-slate-900/90 border border-slate-700 px-2 py-1 rounded text-[10px] text-slate-300 font-mono shadow-lg select-none whitespace-nowrap">
          X: Strike Offset (%)
        </div>
      </Html>
      <Html position={[0, 0, 7]}>
        <div className="bg-slate-900/90 border border-slate-700 px-2 py-1 rounded text-[10px] text-slate-300 font-mono shadow-lg select-none whitespace-nowrap">
          Y: Days to Expiry (DTE)
        </div>
      </Html>
      <Html position={[0, 5, 0]}>
        <div className="bg-slate-900/90 border border-slate-700 px-2 py-1 rounded text-[10px] text-amber-400 font-mono shadow-lg select-none whitespace-nowrap">
          Z: Implied Volatility (IV)
        </div>
      </Html>

      <OrbitControls minDistance={5} maxDistance={20} enablePan={true} />
    </>
  );
}

export default function VolatilitySurface3D({ symbol }) {
  const [hoveredData, setHoveredData] = useState(null);

  // Generate realistic option implied volatility smile curves across DTE
  const mockSurfaceData = useMemo(() => {
    const points = [];
    const strikes = [70, 80, 90, 100, 110, 120, 130];
    const dtes = [10, 30, 60, 90, 120, 180, 360];

    dtes.forEach((dte) => {
      strikes.forEach((strike) => {
        // Option Smile equation: IV increases as you move away from spot (100)
        const moneyness = strike / 100;
        const dist = Math.abs(moneyness - 1.0);
        // Time decay of skew: shorter expiry = higher skew curvature
        const skewFactor = 0.45 / Math.sqrt(dte / 30);
        const iv = 0.18 + (dist * dist * skewFactor) + (15 / dte);
        points.push({
          strike,
          dte,
          iv: Math.min(Math.max(iv, 0.10), 0.75) // Bound IV between 10% and 75%
        });
      });
    });
    return points;
  }, [symbol]);

  return (
    <div className="relative w-full h-[450px] bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col">
      {/* Header Dashboard HUD */}
      <div className="bg-slate-900/50 border-b border-slate-800 px-4 py-2.5 flex justify-between items-center z-10">
        <div>
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
            {symbol || 'NVDA'} 3D Volatility Surface
          </h3>
          <p className="text-[10px] text-slate-400">
            Drag to rotate • Scroll to zoom • Hover column bars for coordinates
          </p>
        </div>
        <div className="flex gap-3 text-[10px] font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            ATM Volatility: {(mockSurfaceData.find(d => d.strike === 100 && d.dte === 30)?.iv * 100 || 22.4).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* ThreeJS WebGL Rendering Canvas */}
      <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [8, 8, 8], fov: 55 }}>
          <color attach="background" args={['#020617']} />
          <Scene
            data={mockSurfaceData}
            onHover={(pt) => {
              // Convert scene coords back to readable quant scale
              const originalStrike = Math.round(pt.x * 10 + 100);
              const originalDte = Math.round(pt.y * 10 + 60);
              setHoveredData({
                strike: originalStrike,
                dte: originalDte,
                iv: (pt.z * 100).toFixed(1)
              });
            }}
            onLeave={() => setHoveredData(null)}
          />
        </Canvas>

        {/* Hover Tooltip Overlay HUD */}
        {hoveredData && (
          <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-700 p-3 rounded-lg text-[10px] font-mono text-slate-300 shadow-2xl flex flex-col gap-1 backdrop-blur pointer-events-none">
            <div className="font-bold text-amber-400 border-b border-slate-800 pb-1 mb-1">
              📊 Option Coordinate
            </div>
            <div>🎯 Strike Price Offset: <span className="text-white font-bold">{hoveredData.strike}%</span></div>
            <div>⏳ Days to Expiration: <span className="text-white font-bold">{hoveredData.dte} Days</span></div>
            <div>📈 Implied Volatility: <span className="text-emerald-400 font-bold">{hoveredData.iv}%</span></div>
          </div>
        )}
      </div>
    </div>
  );
}
