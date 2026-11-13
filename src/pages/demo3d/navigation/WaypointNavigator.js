// WaypointNavigator.js
// Discrete waypoint transit engine for controlled cinematic 3D navigation
import { useEffect } from 'react';
import { WORLD_PAUSE_STATIONS, startWorldPause, clearActiveWorldPause } from './WorldPauseManager';

export const STATIONS = [
  { id: 'hub', name: 'Home Hub', p: 0.000, duration: 3200, color: '#00E5FF' },
  { id: 'mindwave', name: 'MindWave', p: 0.038, duration: 3600, color: '#38BDF8' },
  { id: 'icebreaker', name: 'Icebreaker', p: 0.135, duration: 4000, color: '#FF6600' },
  { id: 'interstellar', name: 'Interstellar', p: 0.200, duration: 3600, color: '#00D2FF' },
  { id: 'legal', name: 'Legal Eagle', p: 0.248, duration: 3600, color: '#D4AF37' },
  { id: 'autopilot', name: 'Autopilot', p: 0.293, duration: 3600, color: '#10B981' },
  { id: 'clove', name: 'CloveH2O', p: 0.345, duration: 3600, color: '#FF00FF' },
  { id: 'fantasy', name: 'FantasyQuant', p: 0.413, duration: 4400, color: '#00FF88' },
  { id: 'contango', name: 'Contango', p: 0.463, duration: 3600, color: '#FFD700' },
  { id: 'sentaient', name: 'Sentaient', p: 0.505, duration: 3600, color: '#60A9FF' },
  { id: 'elevate', name: 'Elevate', p: 0.548, duration: 3600, color: '#00FFFF' },
  { id: 'sphinx', name: 'Sphinx', p: 0.610, duration: 3600, color: '#F59E0B' },
  { id: 'liquid', name: 'Liquid', p: 0.668, duration: 3600, color: '#00FF88' },
  { id: 'maya', name: 'Maya', p: 0.728, duration: 3600, color: '#EAB308' },
  { id: 'pyramid', name: 'Pyramid', p: 0.803, duration: 3600, color: '#00E5FF' },
  { id: 'matrix', name: 'Matrix', p: 0.873, duration: 3600, color: '#00FF44' },
  { id: 'lightspeed', name: 'LightSpeed', p: 0.945, duration: 3600, color: '#00FFFF' }
];

let activeAnimId = null;

export const directTeleportTo = (targetIndex, customDuration = 2700, onComplete = null) => {
  const clampedIndex = Math.max(0, Math.min(STATIONS.length - 1, targetIndex));
  const targetStation = STATIONS[clampedIndex];
  
  if (activeAnimId) {
    cancelAnimationFrame(activeAnimId);
    activeAnimId = null;
  }
  clearActiveWorldPause();
  
  if (clampedIndex === 2) {
    if (window._icebreakerMeltState !== 'completed') {
      window.icebreakerThaw = 0.0;
      window._icebreakerMeltState = 'idle';
      window._icebreakerCam = null;
      window._icebreakerLockCamera = false;
      window.icebreakerThawLocked = false;
    } else {
      window.icebreakerThaw = 1.0;
    }
  } else if (clampedIndex > 2) {
    window.icebreakerThaw = 1.0;
    window._icebreakerMeltState = 'completed';
    if (window._icebreakerCam) {
      window._icebreakerCam.active = false;
      window._icebreakerCam = null;
    }
    window._icebreakerLockCamera = false;
    window.icebreakerThawLocked = false;
    window._isWorldActionActive = false;
  } else if (clampedIndex < 2) {
    window.icebreakerThaw = 0.0;
    window._icebreakerMeltState = 'idle';
    window._icebreakerCam = null;
    window._icebreakerLockCamera = false;
    window.icebreakerThawLocked = false;
  }
  
  window._cancelWarp = false;
  window._isTransitActive = true;
  window._isDirectTeleportActive = true;
  window._isProgrammaticScroll = true;
  
  const startIdx = window._currentStationIndex !== undefined ? window._currentStationIndex : 0;
  const startStation = STATIONS[startIdx] || STATIONS[0];
  
  // Direct Teleport Warp visual configuration
  window._teleportWarp = {
    active: true,
    opacity: 0.0,
    progress: 0.0,
    color: targetStation.color || '#00E5FF',
    targetStationId: targetStation.id,
    startStationId: startStation.id
  };
  
  window._teleportActiveWorldId = startStation.id;
  
  const duration = customDuration || 1350;
  const startTime = performance.now();
  let switchedWorld = false;
  
  const step = (now) => {
    if (window._cancelWarp) {
      window._isTransitActive = false;
      window._isDirectTeleportActive = false;
      if (window._teleportWarp) window._teleportWarp.active = false;
      window._teleportActiveWorldId = null;
      window._warpProgress = undefined;
      window._isProgrammaticScroll = false;
      window._teleportFovBoost = 0;
      activeAnimId = null;
      return;
    }
    
    const elapsed = now - startTime;
    const t = Math.min(1.0, elapsed / duration);
    
    // Hyper-speed warp tunnel opacity envelope:
    // 0 to 0.28: surge in
    // 0.28 to 0.65: solid full hyperspace (completely shielding the world switch)
    // 0.65 to 0.95: smooth fade-out as camera lands in destination world
    let warpOpacity = 0.0;
    if (t < 0.28) {
      warpOpacity = t / 0.28;
    } else if (t < 0.65) {
      warpOpacity = 1.0;
    } else {
      warpOpacity = Math.max(0, 1.0 - (t - 0.65) / 0.30);
    }
    window._teleportWarp.opacity = warpOpacity;
    window._teleportWarp.progress = t;
    
    // Dynamic Warp FOV dilation: peaks at t = 0.50 (+16 degrees)
    window._teleportFovBoost = Math.sin(t * Math.PI) * 16.0;
    
    // Quantum world switch at peak warp inside the dense tunnel (t >= 0.50):
    if (t >= 0.50 && !switchedWorld) {
      switchedWorld = true;
      window._teleportActiveWorldId = targetStation.id;
      window._snapCamera = true;
      if (window._scrollObj) {
        window._scrollObj.offset = targetStation.p;
      }
      if (window._scrollEl) {
        const maxScroll = window._scrollEl.scrollHeight - window._scrollEl.clientHeight;
        if (maxScroll > 0) {
          window._scrollEl.scrollTop = targetStation.p * maxScroll;
        }
      }
    }
    
    // Trajectory calculation:
    if (t < 0.50) {
      const p1 = t / 0.50;
      const ease1 = p1 * p1 * p1; // Accelerate forward into wormhole
      window._warpProgress = startStation.p + 0.022 * ease1;
    } else {
      const p2 = (t - 0.50) / 0.50;
      const ease2 = 1.0 - Math.pow(1.0 - p2, 3); // Decelerate smoothly out of wormhole
      window._warpProgress = (targetStation.p - 0.022) + 0.022 * ease2;
    }
    
    if (t < 1.0) {
      activeAnimId = requestAnimationFrame(step);
    } else {
      window._isTransitActive = false;
      window._isDirectTeleportActive = false;
      if (window._teleportWarp) window._teleportWarp.active = false;
      window._teleportActiveWorldId = null;
      window._teleportFovBoost = 0;
      window._warpProgress = undefined;
      window._isProgrammaticScroll = false;
      window._currentStationIndex = clampedIndex;
      window._currentProgress = targetStation.p;
      const pauseStation = WORLD_PAUSE_STATIONS.find(s => s.id === targetStation.id);
      if (pauseStation) {
        startWorldPause(pauseStation);
      }
      if (targetStation.id === 'hub') {
        window._snapCamera = true;
      }
      activeAnimId = null;
      
      if (window._scrollObj) {
        window._scrollObj.offset = targetStation.p;
      }
      if (window._scrollEl) {
        const maxScroll = window._scrollEl.scrollHeight - window._scrollEl.clientHeight;
        if (maxScroll > 0) {
          window._scrollEl.scrollTop = targetStation.p * maxScroll;
        }
        window._scrollEl.style.overflow = 'auto';
      }
      
      if (typeof onComplete === 'function') onComplete();
    }
  };
  
  activeAnimId = requestAnimationFrame(step);
};

export const goToStation = (targetIndex, customDuration = null, onComplete = null, forceSequential = false) => {
  const clampedIndex = Math.max(0, Math.min(STATIONS.length - 1, targetIndex));
  const currentIdx = window._currentStationIndex !== undefined ? window._currentStationIndex : 0;
  
  // If moving across non-adjacent worlds (e.g. from Hub into any world, or between distant worlds):
  // Engage DIRECT WORMHOLE TELEPORTATION so intermediate worlds are never traversed!
  // Unless forceSequential is explicitly enabled (e.g. during Auto Tour)
  const isAdjacent = Math.abs(clampedIndex - currentIdx) <= 1;
  const isHubTransition = currentIdx === 0 || clampedIndex === 0;
  if (!forceSequential && (!isAdjacent || isHubTransition)) {
    return directTeleportTo(clampedIndex, customDuration || 2700, onComplete);
  }
  
  const targetStation = STATIONS[clampedIndex];
  
  if (activeAnimId) {
    cancelAnimationFrame(activeAnimId);
    activeAnimId = null;
  }
  clearActiveWorldPause();
  
  // When warping away from or to Icebreaker, reset ice cave so it is frozen solid before entering
  if (clampedIndex === 2) {
    if (window._icebreakerMeltState !== 'completed') {
      window.icebreakerThaw = 0.0;
      window._icebreakerMeltState = 'idle';
      window._icebreakerCam = null;
      window._icebreakerLockCamera = false;
      window.icebreakerThawLocked = false;
    } else {
      window.icebreakerThaw = 1.0;
    }
  } else if (clampedIndex > 2) {
    window.icebreakerThaw = 1.0;
    window._icebreakerMeltState = 'completed';
    if (window._icebreakerCam) {
      window._icebreakerCam.active = false;
      window._icebreakerCam = null;
    }
    window._icebreakerLockCamera = false;
    window.icebreakerThawLocked = false;
    window._isWorldActionActive = false;
  } else if (clampedIndex < 2) {
    window.icebreakerThaw = 0.0;
    window._icebreakerMeltState = 'idle';
    window._icebreakerCam = null;
    window._icebreakerLockCamera = false;
    window.icebreakerThawLocked = false;
  }
  
  window._cancelWarp = false;
  window._isTransitActive = true;
  window._isProgrammaticScroll = true;
  
  const startP = window._warpProgress !== undefined 
    ? window._warpProgress 
    : (window._currentProgress !== undefined ? window._currentProgress : 0);
  
  // For Icebreaker: if not yet thawed, arrive at cave entrance 0.120 to trigger melt; if completed, land on island 0.135
  const endP = (clampedIndex === 2 && window._icebreakerMeltState !== 'completed')
    ? 0.120 
    : targetStation.p;
  
  // Sequential transit between worlds: majestic 4000ms flow through connecting wormhole (half speed)
  const duration = customDuration || targetStation?.duration || 4000;
  const startTime = performance.now();

  // Engage universal relativistic warp speed conduit & FOV dilation
  window._teleportWarp = {
    active: true,
    opacity: 0.0,
    progress: 0.0,
    color: targetStation.color || '#00E5FF',
    targetStationId: targetStation.id,
    startStationId: (STATIONS[currentIdx] || STATIONS[0]).id
  };
  
  const step = (now) => {
    if (window._cancelWarp) {
      window._isTransitActive = false;
      window._warpProgress = undefined;
      window._isProgrammaticScroll = false;
      window._teleportFovBoost = 0;
      if (window._teleportWarp) window._teleportWarp.active = false;
      activeAnimId = null;
      return;
    }
    
    const elapsed = now - startTime;
    const t = Math.min(1.0, elapsed / duration);
    
    // Smooth cubic ease-in-out for fluid acceleration into wormhole and gentle deceleration at destination
    const ease = t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
    const currentP = startP + (endP - startP) * ease;
    window._warpProgress = currentP;

    // Dynamic FOV warp speed dilation (+12 deg at peak speed)
    window._teleportFovBoost = Math.sin(t * Math.PI) * 12.0;

    // Relativistic warp energy conduit envelope
    if (window._teleportWarp) {
      window._teleportWarp.opacity = Math.sin(t * Math.PI) * 0.82;
      window._teleportWarp.progress = t;
    }
    
    if (t < 1.0) {
      activeAnimId = requestAnimationFrame(step);
    } else {
      window._teleportFovBoost = 0;
      if (window._teleportWarp) {
        window._teleportWarp.active = false;
      }

      if (window._scrollObj) {
        window._scrollObj.offset = endP;
      }
      if (window._scrollEl) {
        const maxScroll = window._scrollEl.scrollHeight - window._scrollEl.clientHeight;
        if (maxScroll > 0) {
          window._isProgrammaticScroll = true;
          window._scrollEl.scrollTop = endP * maxScroll;
        }
        window._scrollEl.style.overflow = 'auto';
      }
      window._currentStationIndex = clampedIndex;
      window._currentProgress = endP;
      const pauseStation = WORLD_PAUSE_STATIONS.find(s => s.id === targetStation.id);
      if (pauseStation) {
        startWorldPause(pauseStation);
      }
      if (targetStation.id === 'hub') {
        window._snapCamera = true;
      }
      activeAnimId = null;
      window._warpProgress = undefined;
      window._isProgrammaticScroll = false;
      window._isTransitActive = false;
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
  window.directTeleportTo = directTeleportTo;
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
      window._scrollObj = scroll;
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
      if (Math.abs(e.deltaY) < 12) return;
      if (e.target.closest && (e.target.closest('input') || e.target.closest('textarea') || e.target.closest('.scrollable-modal'))) return;
      e.preventDefault();
      const now = performance.now();
      if (now - lastWheelTime < 320) return;
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
