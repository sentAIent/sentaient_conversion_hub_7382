import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to monitor network latency and connectivity status.
 * @param {number} pingInterval - How often to check latency (in ms).
 */
export function useLatencyMonitor(pingInterval = 10000) {
  const [latency, setLatency] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [status, setStatus] = useState('good'); // 'good', 'fair', 'poor', 'offline'

  const checkLatency = useCallback(async () => {
    if (!navigator.onLine) {
      setIsOnline(false);
      setStatus('offline');
      setLatency(0);
      return;
    }

    try {
      const startTime = performance.now();
      // Fetch a small, non-cached resource to test actual round-trip time
      // We append a timestamp to bypass cache
      await fetch(`/?ping=${new Date().getTime()}`, {
        method: 'HEAD',
        cache: 'no-store'
      });
      const endTime = performance.now();
      
      const currentLatency = Math.round(endTime - startTime);
      setLatency(currentLatency);
      setIsOnline(true);
      
      if (currentLatency < 200) {
        setStatus('good');
      } else if (currentLatency < 500) {
        setStatus('fair');
      } else {
        setStatus('poor');
      }
    } catch (error) {
      // Fetch failed entirely
      setStatus('offline');
      setIsOnline(false);
    }
  }, []);

  useEffect(() => {
    // Initial check
    checkLatency();

    // Set up polling interval
    const intervalId = setInterval(checkLatency, pingInterval);

    // Listen to browser online/offline events for immediate reaction
    const handleOnline = () => checkLatency();
    const handleOffline = () => {
      setIsOnline(false);
      setStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkLatency, pingInterval]);

  return { latency, isOnline, status };
}
