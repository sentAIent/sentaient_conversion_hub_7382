// WaypointNavigator.js
// Discrete waypoint transit engine for controlled cinematic 3D navigation
import { useEffect } from 'react';
import { WORLD_PAUSE_STATIONS, startWorldPause, clearActiveWorldPause } from './WorldPauseManager';

export const STATIONS = [
  { id: 'hub', name: 'Home Hub', p: 0.000, entryP: 0.000, duration: 3200, color: '#00E5FF' },
  { id: 'mindwave', name: 'MindWave', p: 0.038, entryP: 0.016, duration: 3600, color: '#38BDF8' },
  { id: 'icebreaker', name: 'Icebreaker', p: 0.135, entryP: 0.113, duration: 4000, color: '#FF6600' },
  { id: 'interstellar', name: 'Interstellar', p: 0.200, entryP: 0.178, duration: 3600, color: '#00D2FF' },
  { id: 'legal', name: 'Legal Eagle', p: 0.248, entryP: 0.226, duration: 3600, color: '#D4AF37' },
  { id: 'autopilot', name: 'Autopilot', p: 0.293, entryP: 0.271, duration: 3600, color: '#10B981' },
  { id: 'fantasy', name: 'FantasyQuant', p: 0.413, entryP: 0.391, duration: 4400, color: '#00FF88' },
  { id: 'contango', name: 'Contango', p: 0.463, entryP: 0.432, duration: 3600, color: '#FFD700' },
  { id: 'elevate', name: 'Elevate', p: 0.518, entryP: 0.496, duration: 3600, color: '#00FFFF' },
  { id: 'sphinx', name: 'Sphinx', p: 0.582, entryP: 0.560, duration: 3600, color: '#F59E0B' },
  { id: 'liquid', name: 'Liquid', p: 0.648, entryP: 0.626, duration: 3600, color: '#00FF88' },
  { id: 'maya', name: 'Maya', p: 0.712, entryP: 0.690, duration: 3600, color: '#EAB308' },
  { id: 'pyramid', name: 'Pyramid', p: 0.778, entryP: 0.756, duration: 3600, color: '#00E5FF' },
  { id: 'matrix', name: 'Matrix', p: 0.842, entryP: 0.820, duration: 3600, color: '#00FF44' },
  { id: 'lightspeed', name: 'LightSpeed', p: 0.893, entryP: 0.871, duration: 3600, color: '#00FFFF' },
  { id: 'clove', name: 'CloveH2O', p: 0.939, entryP: 0.917, duration: 3600, color: '#FF00FF' },
  { id: 'sentaient', name: 'Sentaient', p: 0.979, entryP: 0.957, duration: 4000, color: '#60A9FF' }
];

let activeAnimId = null;

/**
 * Builds a uniform 3D arc-length parameterization between startP and endP
 * using window._scrollTimeline. Any flat pause plateaus (0 distance) are
 * skipped instantaneously so camera motion is continuous and constant-speed.
 */
function buildArcLengthMapper(startP, endP) {
  const tl = typeof window !== 'undefined' ? window._scrollTimeline : null;
  if (!tl || tl.length < 2 || Math.abs(endP - startP) < 1e-6) {
    return {
      totalDist: 0,
      mapTToP: (t) => startP + (endP - startP) * t,
    };
  }

  const forward = endP >= startP;
  const lo = forward ? startP : endP;
  const hi = forward ? endP : startP;

  const evalKey = (p) => {
    if (p <= tl[0].p) return tl[0];
    if (p >= tl[tl.length - 1].p) return tl[tl.length - 1];
    for (let i = 0; i < tl.length - 1; i++) {
      const a = tl[i];
      const b = tl[i + 1];
      if (p >= a.p && p <= b.p) {
        const u = (p - a.p) / Math.max(1e-9, b.p - a.p);
        return {
          p,
          x: a.x + (b.x - a.x) * u,
          y: a.y + (b.y - a.y) * u,
          z: a.z + (b.z - a.z) * u,
          rx: a.rx + (b.rx - a.rx) * u,
          ry: a.ry + (b.ry - a.ry) * u,
        };
      }
    }
    return tl[0];
  };

  // Collect ordered knots from lo to hi
  const knots = [evalKey(lo)];
  for (let i = 0; i < tl.length; i++) {
    if (tl[i].p > lo + 1e-7 && tl[i].p < hi - 1e-7) {
      knots.push(tl[i]);
    }
  }
  knots.push(evalKey(hi));

  const cumDist = [0];
  for (let i = 0; i < knots.length - 1; i++) {
    const a = knots[i];
    const b = knots[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;
    const spatial = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const angular = (Math.abs(b.rx - a.rx) + Math.abs(b.ry - a.ry)) * 450;
    cumDist.push(cumDist[i] + spatial + angular);
  }

  const totalDist = cumDist[cumDist.length - 1];
  if (totalDist < 1e-4) {
    return {
      totalDist: 0,
      mapTToP: (t) => startP + (endP - startP) * t,
    };
  }

  const mapForward = (u) => {
    const target = Math.max(0, Math.min(1, u)) * totalDist;
    for (let i = 0; i < cumDist.length - 1; i++) {
      const d0 = cumDist[i];
      const d1 = cumDist[i + 1];
      if (d1 > d0 && target <= d1 + 1e-6) {
        const segU = (target - d0) / (d1 - d0);
        return knots[i].p + (knots[i + 1].p - knots[i].p) * Math.max(0, Math.min(1, segU));
      }
    }
    return hi;
  };

  return {
    totalDist,
    mapTToP: (t) => (forward ? mapForward(t) : mapForward(1 - t)),
  };
}

export const directTeleportTo = (targetIndex, customDuration = 2700, onComplete = null) => {
  const clampedIndex = Math.max(0, Math.min(STATIONS.length - 1, targetIndex));
  const targetStation = STATIONS[clampedIndex];
  
  if (activeAnimId) {
    cancelAnimationFrame(activeAnimId);
    activeAnimId = null;
  }
  clearActiveWorldPause();
  
  if (clampedIndex === 2) {
    window.icebreakerThaw = 0.0;
    window._icebreakerMeltState = 'idle';
    window._icebreakerCam = null;
    window._icebreakerLockCamera = false;
    window.icebreakerThawLocked = false;
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
  window._teleportTargetWorldId = targetStation.id;
  
  const arrivalP = (clampedIndex === 2 && window._icebreakerMeltState !== 'completed')
    ? 0.120
    : targetStation.p;
  const switchT = targetStation.id === 'hub' ? 0.50 : 0.30;
  const entryStart = targetStation.entryP !== undefined ? targetStation.entryP : Math.max(0, arrivalP - 0.022);
  const entryMapper = targetStation.id === 'hub' ? null : buildArcLengthMapper(entryStart, arrivalP);
  const duration = customDuration || (entryMapper && entryMapper.totalDist > 0
    ? Math.round(Math.max(2600, Math.min(6500, 1800 + entryMapper.totalDist * 0.22)))
    : 2700);
  const startTime = performance.now();
  let switchedWorld = false;
  
  const step = (now) => {
    if (window._cancelWarp) {
      window._isTransitActive = false;
      window._isDirectTeleportActive = false;
      if (window._teleportWarp) window._teleportWarp.active = false;
      window._teleportActiveWorldId = null;
      window._teleportTargetWorldId = null;
      window._warpProgress = undefined;
      window._isProgrammaticScroll = false;
      window._teleportFovBoost = 0;
      activeAnimId = null;
      return;
    }
    
    const elapsed = now - startTime;
    const t = Math.min(1.0, elapsed / duration);
    
    // Hyper-speed warp tunnel opacity envelope:
    // Masks the instant world switch at switchT, then fades out cleanly by t=0.48
    // so the destination's unique wormhole is 100% visible for the rest of the flight.
    let warpOpacity = 0.0;
    if (targetStation.id === 'hub') {
      if (t < 0.28) warpOpacity = t / 0.28;
      else if (t < 0.65) warpOpacity = 1.0;
      else warpOpacity = Math.max(0, 1.0 - (t - 0.65) / 0.30);
    } else {
      if (t < 0.20) warpOpacity = t / 0.20;
      else if (t < 0.34) warpOpacity = 1.0;
      else if (t < 0.48) warpOpacity = Math.max(0, 1.0 - (t - 0.34) / 0.14);
      else warpOpacity = 0.0;
    }
    window._teleportWarp.opacity = warpOpacity;
    window._teleportWarp.progress = t;
    
    // Dynamic Warp FOV dilation: peaks at t = 0.32 (+14 degrees)
    window._teleportFovBoost = Math.sin(t * Math.PI) * 14.0;

    // Quantum world switch into destination's unique entry wormhole:
    if (t >= switchT && !switchedWorld) {
      switchedWorld = true;
      window._teleportActiveWorldId = targetStation.id;
      window._snapCamera = true;
      if (window._scrollObj) {
        window._scrollObj.offset = arrivalP;
      }
      if (window._scrollEl) {
        const maxScroll = window._scrollEl.scrollHeight - window._scrollEl.clientHeight;
        if (maxScroll > 0) {
          window._scrollEl.scrollTop = arrivalP * maxScroll;
        }
      }
    }
    
    // Continuous, consistent-speed trajectory calculation:
    if (t < switchT) {
      const p1 = t / switchT;
      window._warpProgress = Math.min(0.999, startStation.p + 0.012 * p1);
    } else if (targetStation.id === 'hub') {
      const p2 = (t - switchT) / (1.0 - switchT);
      window._warpProgress = 0.022 * (1.0 - p2);
    } else {
      const p2 = (t - switchT) / (1.0 - switchT);
      window._warpProgress = entryMapper.mapTToP(p2);
    }
    
    if (t < 1.0) {
      activeAnimId = requestAnimationFrame(step);
    } else {
      window._isTransitActive = false;
      window._isDirectTeleportActive = false;
      if (window._teleportWarp) window._teleportWarp.active = false;
      window._teleportActiveWorldId = null;
      window._teleportTargetWorldId = null;
      window._teleportFovBoost = 0;
      window._warpProgress = undefined;
      window._isProgrammaticScroll = false;
      window._currentStationIndex = clampedIndex;
      window._currentProgress = arrivalP;
      const pauseStation = WORLD_PAUSE_STATIONS.find(s => s.id === targetStation.id);
      if (pauseStation) {
        startWorldPause(pauseStation);
      }
      if (targetStation.id === 'hub') {
        window._snapCamera = true;
      }
      activeAnimId = null;
      
      if (window._scrollObj) {
        window._scrollObj.offset = arrivalP;
      }
      if (window._scrollEl) {
        const maxScroll = window._scrollEl.scrollHeight - window._scrollEl.clientHeight;
        if (maxScroll > 0) {
          window._scrollEl.scrollTop = arrivalP * maxScroll;
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
    window.icebreakerThaw = 0.0;
    window._icebreakerMeltState = 'idle';
    window._icebreakerCam = null;
    window._icebreakerLockCamera = false;
    window.icebreakerThawLocked = false;
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
  
  const arcMapper = buildArcLengthMapper(startP, endP);
  // Sequential transit between worlds: smooth, consistent speed scaled by 3D distance
  const duration = customDuration || (arcMapper.totalDist > 0
    ? Math.round(Math.max(3600, Math.min(8500, 2600 + arcMapper.totalDist * 0.28)))
    : (targetStation?.duration || 4000));
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
    
    // Continuous, consistent 3D speed through the connecting wormhole (no plateau stalls)
    const currentP = arcMapper.mapTToP(t);
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
      if (pauseStation && (!window._isAutoTourActive || pauseStation.isIcebreaker)) {
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
