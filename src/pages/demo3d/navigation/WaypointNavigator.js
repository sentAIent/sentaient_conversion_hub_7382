// WaypointNavigator.js
// Discrete waypoint transit engine for controlled cinematic 3D navigation
import { useEffect } from 'react';
import { WORLD_PAUSE_STATIONS, startWorldPause, clearActiveWorldPause } from './WorldPauseManager';

export const STATIONS = [
  { id: 'hub', name: 'Home Hub', p: 0.000, duration: 2000 },
  { id: 'mindwave', name: 'MindWave', p: 0.038, duration: 2000 },
  { id: 'icebreaker', name: 'Icebreaker', p: 0.131, duration: 2800 },
  { id: 'interstellar', name: 'Interstellar', p: 0.200, duration: 2200 },
  { id: 'legal', name: 'Legal Eagle', p: 0.248, duration: 2000 },
  { id: 'autopilot', name: 'Autopilot', p: 0.293, duration: 2000 },
  { id: 'clove', name: 'CloveH2O', p: 0.345, duration: 2000 },
  { id: 'fantasy', name: 'FantasyQuant', p: 0.413, duration: 3000 },
  { id: 'contango', name: 'Contango', p: 0.463, duration: 2200 },
  { id: 'sentaient', name: 'Sentaient', p: 0.495, duration: 2000 },
  { id: 'elevate', name: 'Elevate', p: 0.548, duration: 2200 },
  { id: 'sphinx', name: 'Sphinx', p: 0.610, duration: 2200 },
  { id: 'liquid', name: 'Liquid', p: 0.668, duration: 2200 },
  { id: 'maya', name: 'Maya', p: 0.728, duration: 2200 },
  { id: 'pyramid', name: 'PyRAmid', p: 0.803, duration: 2200 },
  { id: 'matrix', name: 'Matrix', p: 0.873, duration: 2200 },
  { id: 'lightspeed', name: 'LightSpeed', p: 0.945, duration: 2500 }
];

let activeAnimId = null;

export const goToStation = (targetIndex, customDuration = null, onComplete = null) => {
  const clampedIndex = Math.max(0, Math.min(STATIONS.length - 1, targetIndex));
  const targetStation = STATIONS[clampedIndex];
  
  if (activeAnimId) {
    cancelAnimationFrame(activeAnimId);
    activeAnimId = null;
  }
  clearActiveWorldPause();
  
  window._cancelWarp = false;
  window._isTransitActive = true;
  window._isProgrammaticScroll = true;
  
  const startP = window._warpProgress !== undefined 
    ? window._warpProgress 
    : (window._currentProgress !== undefined ? window._currentProgress : 0);
  const endP = targetStation.p;
  
  // Calculate duration proportional to distance if not explicitly passed
  const baseDuration = customDuration || targetStation.duration || 2200;
  const pDiff = Math.abs(endP - startP);
  // Scale duration gracefully (min 1200ms, max 3500ms)
  const duration = customDuration || Math.max(1200, Math.min(3500, baseDuration * (pDiff > 0.15 ? 1.2 : 1.0)));
  
  const startTime = performance.now();
  
  const step = (now) => {
    if (window._cancelWarp) {
      window._isTransitActive = false;
      window._warpProgress = undefined;
      window._isProgrammaticScroll = false;
      activeAnimId = null;
      return;
    }
    
    const elapsed = now - startTime;
    const t = Math.min(1.0, elapsed / duration);
    
    // Smooth quintic ease-in-out for controlled acceleration and graceful landing
    const ease = t < 0.5 
      ? 16 * t * t * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 5) / 2;
      
    const currentP = startP + (endP - startP) * ease;
    window._warpProgress = currentP;
    
    // Synchronize DOM scroll container if present
    if (window._scrollEl) {
      const maxScroll = window._scrollEl.scrollHeight - window._scrollEl.clientHeight;
      if (maxScroll > 0) {
        window._scrollEl.scrollTop = currentP * maxScroll;
      }
    }
    
    if (t < 1.0) {
      activeAnimId = requestAnimationFrame(step);
    } else {
      if (window._scrollEl) {
        const maxScroll = window._scrollEl.scrollHeight - window._scrollEl.clientHeight;
        if (maxScroll > 0) {
          window._isProgrammaticScroll = true;
          window._scrollEl.scrollTop = endP * maxScroll;
        }
        window._scrollEl.style.overflow = 'auto';
      }
      window._currentStationIndex = clampedIndex;
      activeAnimId = null;
      window._warpProgress = undefined;
      window._isProgrammaticScroll = false;
      if (targetStation.id === 'icebreaker') {
        window._isTransitActive = true;
        if (window.triggerIcebreakerMelt) {
          window.triggerIcebreakerMelt(() => {
            window._isTransitActive = false;
          });
        }
        setTimeout(() => { window._isTransitActive = false; }, 8500);
      } else if (targetStation.id !== 'hub') {
        window._isTransitActive = false;
        const pauseStation = WORLD_PAUSE_STATIONS.find(s => s.id === targetStation.id);
        if (pauseStation) {
          startWorldPause(pauseStation);
        }
      } else {
        window._isTransitActive = false;
      }
      if (typeof onComplete === 'function') onComplete();
    }
  };
  
  activeAnimId = requestAnimationFrame(step);
};

export const stepStation = (direction) => {
  if (window._isTransitActive || window._isWorldActionActive) return;
  
  const curP = (window._isTransitActive && window._warpProgress !== undefined)
    ? window._warpProgress 
    : (window._currentProgress !== undefined ? window._currentProgress : 0);
    
  let closestDist = Infinity;
  let closestIdx = 0;
  STATIONS.forEach((s, idx) => {
    const dist = Math.abs(s.p - curP);
    if (dist < closestDist) {
      closestDist = dist;
      closestIdx = idx;
    }
  });

  let nextIdx = closestIdx;
  if (direction > 0) {
    nextIdx = curP >= STATIONS[closestIdx].p - 0.008 ? closestIdx + 1 : closestIdx;
  } else {
    nextIdx = curP <= STATIONS[closestIdx].p + 0.008 ? closestIdx - 1 : closestIdx;
  }
  nextIdx = Math.max(0, Math.min(STATIONS.length - 1, nextIdx));
  goToStation(nextIdx);
};

// Register globals for seamless cross-component communication
if (typeof window !== 'undefined') {
  window._goToStation = goToStation;
  window._stepStation = stepStation;
  window.STATIONS = STATIONS;
  if (window._currentStationIndex === undefined) {
    window._currentStationIndex = 0;
  }
}

export const useWaypointControls = (scroll) => {
  useEffect(() => {
    if (scroll?.el) {
      window._scrollEl = scroll.el;
    }
    let lastWheelTime = 0;
    const onWheel = (e) => {
      if (!window._isProgrammaticScroll && window._warpProgress !== undefined) {
        window._warpProgress = undefined;
        window._isTransitActive = false;
        if (activeAnimId) {
          cancelAnimationFrame(activeAnimId);
          activeAnimId = null;
        }
      }
      if (Math.abs(e.deltaY) < 15) return;
      if (e.target.closest && (e.target.closest('input') || e.target.closest('textarea') || e.target.closest('.scrollable-modal'))) return;
      e.preventDefault();
      const now = performance.now();
      if (now - lastWheelTime < 380) return;
      lastWheelTime = now;
      if (window._stepStation) window._stepStation(e.deltaY > 0 ? 1 : -1);
    };

    const onScroll = () => {
      if (!window._isProgrammaticScroll) {
        if (window._warpProgress !== undefined) {
          window._warpProgress = undefined;
          window._isTransitActive = false;
          if (activeAnimId) {
            cancelAnimationFrame(activeAnimId);
            activeAnimId = null;
          }
        }
      }
    };

    const onKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (['ArrowDown', 'KeyS', 'PageDown'].includes(e.code)) {
        e.preventDefault();
        if (window._stepStation) window._stepStation(1);
      } else if (['ArrowUp', 'KeyW', 'PageUp'].includes(e.code)) {
        e.preventDefault();
        if (window._stepStation) window._stepStation(-1);
      }
    };
    const el = scroll?.el || window;
    el.addEventListener('wheel', onWheel, { passive: false });
    if (scroll?.el) {
      scroll.el.addEventListener('scroll', onScroll, { passive: true });
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (scroll?.el) {
        scroll.el.removeEventListener('scroll', onScroll);
      }
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [scroll]);
};
