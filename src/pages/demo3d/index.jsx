import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Scene3D from './components/Scene3D';
import { goToStation } from './navigation/WaypointNavigator';
import { useAutoTour } from './navigation/useAutoTour';
import FeedbackModal from '../../components/analytics/FeedbackModal';

const ReturnToHubButton = () => {
  const [visible, setVisible] = useState(false);
  const tour = useAutoTour();

  useEffect(() => {
    let animId;
    const check = () => {
      const p = (window._isTransitActive && window._warpProgress !== undefined)
        ? window._warpProgress 
        : (window._worldPauseLockProgress !== undefined && window._worldPauseLockProgress !== null)
          ? window._worldPauseLockProgress
          : (window._currentProgress || 0);
      setVisible(p > 0.015);
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
    tour.stopTour();
    if (window.clearActiveWorldPause) window.clearActiveWorldPause();
    ['icebreakerCaveLocked', 'icebreakerThawLocked', 'icebreakerTextLocked', 'mindwaveLocked', 'interstellarLocked', 'autopilotLocked', 'contangoLocked', 'swarmLocked', 'orbitalLocked'].forEach(k => { 
      window[k] = false; 
    });
    
    if (window.directTeleportTo) {
      window.directTeleportTo(0, 1350);
    } else if (window._goToStation) {
      window._goToStation(0, 1350);
    } else {
      goToStation(0, 1350);
    }
  };

  return (
    <div 
      className="fixed top-[48px] sm:top-[58px] lg:top-3 left-1/2 -translate-x-1/2 z-[10000000] pointer-events-none transition-all duration-300 flex flex-nowrap items-center justify-center gap-1.5 sm:gap-2.5 max-w-[96vw]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(-50%, 0)' : 'translate(-50%, -10px)',
        pointerEvents: visible ? 'auto' : 'none'
      }}
    >
      <button 
        onClick={handleBack}
        aria-label="Return to Home Hub"
        className="group flex items-center gap-1 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-1.5 bg-black/85 hover:bg-black/95 border border-emerald-500/60 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 rounded-full font-mono text-[10px] sm:text-xs tracking-wider backdrop-blur-md shadow-lg shadow-emerald-950/60 hover:shadow-emerald-500/25 transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="transition-transform duration-200 group-hover:-translate-x-1 text-xs leading-none">←</span>
        <span className="sm:hidden">HUB</span>
        <span className="hidden sm:inline">RETURN TO HUB</span>
      </button>

      {tour.isActive && (
        <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-black/90 border border-sky-500/60 rounded-full font-mono text-[10px] sm:text-xs tracking-wider backdrop-blur-md shadow-lg shadow-sky-950/70 text-sky-300 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse hidden sm:inline-block"></span>
          <span>{tour.currentStationIndex}/16</span>
          <span className="text-white/60">{tour.isPaused ? '(PAUSED)' : `(${tour.remainingSeconds}s)`}</span>
        </div>
      )}
    </div>
  );
};

const Demo3DHome = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full h-[100dvh] bg-gradient-to-b from-[#0a0a1a] to-[#020205] font-sans text-white overflow-hidden">
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

      {/* Interactive User Feedback Widget */}
      <FeedbackModal currentApp="3D Space Experience" />
    </div>
  );
};

export default Demo3DHome;
