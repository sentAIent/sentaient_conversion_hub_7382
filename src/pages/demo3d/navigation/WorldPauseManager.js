// WorldPauseManager.js
// Universal focal pause system for all 3D worlds.
// Halts the camera at the focal center of every world and disables mouse/touch/wheel
// inputs so users never fly past a world without absorbing its content and visuals.

export const WORLD_PAUSE_STATIONS = [
  { id: 'mindwave', name: 'MindWave', p: 0.038, triggerMin: 0.026, triggerMax: 0.046, duration: 2500 },
  { id: 'icebreaker', name: 'Icebreaker', p: 0.131, triggerMin: 0.118, triggerMax: 0.145, duration: 8000, isIcebreaker: true },
  { id: 'interstellar', name: 'Interstellar', p: 0.200, triggerMin: 0.188, triggerMax: 0.212, duration: 2500 },
  { id: 'legal', name: 'Legal Eagle', p: 0.248, triggerMin: 0.238, triggerMax: 0.258, duration: 2500 },
  { id: 'autopilot', name: 'Autopilot', p: 0.293, triggerMin: 0.283, triggerMax: 0.302, duration: 2500 },
  { id: 'clove', name: 'CloveH2O', p: 0.345, triggerMin: 0.328, triggerMax: 0.360, duration: 2500 },
  { id: 'fantasy', name: 'FantasyQuant', p: 0.413, triggerMin: 0.403, triggerMax: 0.422, duration: 2500 },
  { id: 'contango', name: 'Contango', p: 0.463, triggerMin: 0.453, triggerMax: 0.470, duration: 2500 },
  { id: 'sentaient', name: 'sentAIent', p: 0.505, triggerMin: 0.490, triggerMax: 0.520, duration: 4000 },
  { id: 'elevate', name: 'Elevate', p: 0.548, triggerMin: 0.538, triggerMax: 0.558, duration: 2500 },
  { id: 'sphinx', name: 'Sphinx', p: 0.610, triggerMin: 0.598, triggerMax: 0.622, duration: 2500 },
  { id: 'liquid', name: 'Liquid', p: 0.668, triggerMin: 0.658, triggerMax: 0.678, duration: 2500 },
  { id: 'maya', name: 'Maya', p: 0.728, triggerMin: 0.718, triggerMax: 0.738, duration: 2500 },
  { id: 'pyramid', name: 'PyRAmid', p: 0.803, triggerMin: 0.788, triggerMax: 0.816, duration: 2500 },
  { id: 'matrix', name: 'Matrix', p: 0.873, triggerMin: 0.858, triggerMax: 0.888, duration: 2500 },
  { id: 'lightspeed', name: 'LightSpeed', p: 0.945, triggerMin: 0.928, triggerMax: 0.962, duration: 2500 }
];

let isGlobalInputLocked = false;
let activeRafId = null;
let currentPausedStationId = null;

const preventInputEvent = (e) => {
  if (e.cancelable) e.preventDefault();
  e.stopPropagation();
  if (typeof e.stopImmediatePropagation === 'function') {
    e.stopImmediatePropagation();
  }
  return false;
};

const BLOCKED_EVENTS = [
  'wheel', 'touchmove', 'touchstart', 'touchend', 
  'pointerdown', 'pointermove', 'pointerup', 
  'mousedown', 'mousemove', 'mouseup', 'keydown'
];

export const lockNavigationInput = () => {
  if (typeof document === 'undefined' || isGlobalInputLocked) return;
  isGlobalInputLocked = true;

  let blocker = document.getElementById('world-pause-input-lock');
  if (!blocker) {
    blocker = document.createElement('div');
    blocker.id = 'world-pause-input-lock';
    blocker.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999;pointer-events:all;cursor:wait;user-select:none;touch-action:none;background:transparent;';
    document.body.appendChild(blocker);
  }

  BLOCKED_EVENTS.forEach((evt) => {
    window.addEventListener(evt, preventInputEvent, { passive: false, capture: true });
  });

  if (window._scrollEl) {
    window._scrollEl.style.overflow = 'hidden';
  }
};

export const unlockNavigationInput = () => {
  if (typeof document === 'undefined' || !isGlobalInputLocked) return;
  isGlobalInputLocked = false;

  const blocker = document.getElementById('world-pause-input-lock');
  if (blocker) blocker.remove();

  BLOCKED_EVENTS.forEach((evt) => {
    window.removeEventListener(evt, preventInputEvent, { capture: true });
  });

  if (window._scrollEl) {
    window._scrollEl.style.overflow = 'auto';
  }
};

export const startWorldPause = (station, onComplete) => {
  if (!station || window._isWorldActionActive || isGlobalInputLocked) return;

  // Icebreaker has its dedicated cinematic ice-melt animation
  if (station.isIcebreaker) {
    if (window._icebreakerMeltState === 'running' || window._icebreakerMeltState === 'completed') {
      if (typeof onComplete === 'function') onComplete();
      return;
    }
    if (typeof window.triggerIcebreakerMelt === 'function') {
      window.triggerIcebreakerMelt(onComplete);
    }
    return;
  }

  currentPausedStationId = station.id;
  window._isWorldActionActive = true;
  window._worldPauseLockProgress = station.p;
  lockNavigationInput();

  if (window._scrollEl) {
    const maxScroll = window._scrollEl.scrollHeight - window._scrollEl.clientHeight;
    if (maxScroll > 0) {
      window._scrollEl.scrollTop = station.p * maxScroll;
    }
  }

  const start = performance.now();
  const duration = station.duration || 2500;

  const step = (now) => {
    const elapsed = now - start;

    if (window._scrollEl) {
      const maxScroll = window._scrollEl.scrollHeight - window._scrollEl.clientHeight;
      if (maxScroll > 0) {
        window._scrollEl.scrollTop = station.p * maxScroll;
      }
    }

    if (elapsed < duration) {
      activeRafId = requestAnimationFrame(step);
    } else {
      window._worldPauseLockProgress = null;
      window._isWorldActionActive = false;
      currentPausedStationId = null;
      unlockNavigationInput();
      activeRafId = null;
      if (typeof onComplete === 'function') onComplete();
    }
  };

  activeRafId = requestAnimationFrame(step);
};

export const clearActiveWorldPause = () => {
  if (activeRafId) {
    cancelAnimationFrame(activeRafId);
    activeRafId = null;
  }
  window._worldPauseLockProgress = null;
  window._isWorldActionActive = false;
  currentPausedStationId = null;
  unlockNavigationInput();
};

if (typeof window !== 'undefined') {
  window.startWorldPause = startWorldPause;
  window.clearActiveWorldPause = clearActiveWorldPause;
}
