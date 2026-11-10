import { useState, useEffect } from 'react';
import AutoTourManager from './AutoTourManager';

export function useAutoTour() {
  const [state, setState] = useState(() => AutoTourManager.getState());

  useEffect(() => {
    return AutoTourManager.subscribe(setState);
  }, []);

  return {
    ...state,
    startTour: (idx) => AutoTourManager.startTour(idx),
    stopTour: () => AutoTourManager.stopTour(),
    togglePause: () => AutoTourManager.togglePause(),
    nextWorld: () => AutoTourManager.nextWorld(),
    prevWorld: () => AutoTourManager.prevWorld(),
    adjustSeconds: (delta) => AutoTourManager.adjustSeconds(delta),
    setSeconds: (sec) => AutoTourManager.setSeconds(sec)
  };
}

export default useAutoTour;
