import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, ScrollControls, Scroll, useScroll } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { CameraController, TimelineManager } from '../TimelineManager';

// --- HTML Overlays (Stations) ---
const HTMLStations = () => {
  const scroll = useScroll();
  const introRef = useRef();
  const station1Ref = useRef();
  const station2Ref = useRef();
  const station3Ref = useRef();
  const station4Ref = useRef();
  
  useFrame(() => {
    const progress = scroll.offset;
    
    if (introRef.current) {
        const opacity = progress < 0.03 ? 1 : 0;
        introRef.current.style.opacity = opacity;
    }

    // Icebreaker: 20% to 28% of the scroll timeline
    if (station1Ref.current) {
      const opacity1 = progress > 0.20 && progress < 0.28 ? 1 : 0;
      station1Ref.current.style.opacity = opacity1;
    }
  });

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}>
      
      {/* Intro Text */}
      <div ref={introRef} style={{ position: 'absolute', top: '40%', left: '10%', color: 'white', opacity: 1, transition: 'opacity 0.3s' }}>
        <h1 className="text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">Enter the Quantum Grid</h1>
        <p className="text-2xl mt-4 text-green-400/80 font-mono tracking-widest">SCROLL TO INITIALIZE WARP SEQUENCE</p>
      </div>

      {/* Station 1: Icebreaker */}
      <div ref={station1Ref} style={{ position: 'absolute', top: '30%', right: '10%', color: 'white', opacity: 0, transition: 'opacity 0.3s' }} className="w-[450px] p-10 bg-[#050505]/80 backdrop-blur-xl border border-green-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,255,68,0.2)]">
        <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center border border-white/10 p-2 shadow-inner">
                <img src="/icebreaker_logo.png" alt="Icebreaker" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-5xl font-bold">Icebreaker</h2>
        </div>
        <p className="text-xl text-gray-300 leading-relaxed font-light">The Real-World Social Protocol. Connect instantly through proximity.</p>
        <button className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium tracking-wide transition-all border border-white/10 pointer-events-auto cursor-pointer">Explore Protocol</button>
      </div>
    </div>
  );
};

const Scene3D = () => {
  return (
    <Canvas gl={{ antialias: false, alpha: true }}>
      {/* Background color removed for transparency */}
      
      <ScrollControls pages={10} damping={0.2} distance={1.2}>
        
        {/* The 3D World */}
        <React.Suspense fallback={null}>
          <CameraController />
          <TimelineManager />
        </React.Suspense>
        <Sparkles count={2000} scale={200} size={4} speed={0.8} opacity={0.5} color="#00ff44" />

        {/* The HTML UI Layer */}
        <Scroll html style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
          <HTMLStations />
        </Scroll>

      </ScrollControls>
      
      {/* Cinematic Post-Processing */}
      <EffectComposer disableNormalPass>
        <Bloom 
          luminanceThreshold={0.1} 
          mipmapBlur 
          intensity={2.0} 
        />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  );
};

export default Scene3D;
