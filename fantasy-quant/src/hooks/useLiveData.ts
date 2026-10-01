import { useState, useEffect, useCallback } from 'react';

/**
 * A generic hook for managing live data feeds via WebSocket with a polling fallback.
 * Can be wired up to actual endpoints when live data subscriptions are active.
 */
export function useLiveData<T>(
  endpoint: string,
  initialData: T,
  enabled: boolean = false,
  pollingIntervalMs: number = 5000
) {
  const [data, setData] = useState<T>(initialData);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      if (endpoint) {
        const res = await fetch(endpoint);
        const json = await res.json();
        setData(json);
      }
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch live data:', err);
      setStatus('error');
    }
  }, [endpoint]);

  useEffect(() => {
    if (!enabled) {
      setStatus('idle');
      return;
    }

    setStatus('connecting');
    
    // In a production environment with real keys, you'd initialize a WebSocket here.
    // Example: const ws = new WebSocket(`wss://api.example.com/live/${endpoint}`);
    // ws.onmessage = (event) => { setData(JSON.parse(event.data)); setLastUpdated(new Date()); }
    
    // Fallback: Polling
    setStatus('connected');
    fetchData(); // Initial fetch
    
    const interval = setInterval(fetchData, pollingIntervalMs);
    
    return () => {
      clearInterval(interval);
      // ws.close();
    };
  }, [enabled, endpoint, pollingIntervalMs, fetchData]);

  return { data, status, lastUpdated };
}
