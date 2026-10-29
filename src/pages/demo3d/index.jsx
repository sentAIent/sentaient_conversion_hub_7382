import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Scene3D from './components/Scene3D';
import { goToStation } from './navigation/WaypointNavigator';

const ReturnToHubButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let animId;
    const check = () => {
      const p = window._warpProgress !== undefined 
        ? window._warpProgress 
        : (window._currentProgress || 0);
      setVisible(p > 0.05);
      animId = requestAnimationFrame(check);
    };
    animId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleBack = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    ['icebreakerCaveLocked', 'icebreakerThawLocked', 'icebreakerTextLocked', 'mindwaveLocked', 'interstellarLocked', 'autopilotLocked', 'contangoLocked', 'swarmLocked', 'orbitalLocked'].forEach(k => { 
      window[k] = false; 
    });
    
    if (window._goToStation) {
      window._goToStation(0, 1800);
    } else {
      goToStation(0, 1800);
    }
  };

  return (
    <div 
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] pointer-events-none transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(-50%, 0)' : 'translate(-50%, -10px)',
        pointerEvents: visible ? 'auto' : 'none'
      }}
    >
      <button 
        onClick={handleBack}
        aria-label="Return to Home Hub"
        className="group flex items-center gap-2.5 px-5 py-2 bg-black/85 hover:bg-black/95 border border-emerald-500/60 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 rounded-full font-mono text-xs tracking-widest backdrop-blur-md shadow-lg shadow-emerald-950/60 hover:shadow-emerald-500/25 transition-all duration-200 cursor-pointer active:scale-95"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="transition-transform duration-200 group-hover:-translate-x-1 text-sm leading-none">←</span>
        <span>RETURN TO HUB</span>
      </button>
    </div>
  );
};

const Demo3DHome = () => {
  return (
    <div className="relative w-screen h-screen bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden">
      <Helmet>
        <title>sentAIent | Quantum Wormhole Experience</title>
        <meta
          name="description"
          content="Explore our portfolio of autonomous marketing, legal analysis, wellness, and interactive entertainment platforms in a scroll-driven wormhole journey."
        />
        <meta name="theme-color" content="#0a0a1a" />
      </Helmet>

      {/* Return to Hub Button - Fixed Top-Center in Header Bar */}
      <ReturnToHubButton />

      {/* Header stays on top */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Full screen 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

    </div>
  );
};

export default Demo3DHome;
