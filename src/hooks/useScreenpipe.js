import { useState, useEffect, useCallback } from 'react';

/**
 * useScreenpipe
 * 
 * A custom hook to connect to a local Screenpipe instance.
 * Screenpipe runs locally on the user's machine (default: http://localhost:3030)
 * and records OCR and audio transcriptions. 
 * 
 * This hook checks if it's running, and provides functions to query the user's screen history.
 */
export function useScreenpipe() {
  const defaultUrl = 'http://localhost:3030';
  
  // Look for a user-configured port in localStorage first, then fallback to env, then default
  const localConfig = typeof window !== 'undefined' ? localStorage.getItem('VITE_SCREENPIPE_API_URL') : null;
  const apiUrl = localConfig || import.meta.env.VITE_SCREENPIPE_API_URL || defaultUrl;

  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState(null);

  const checkConnection = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    try {
      // Basic health check to the local Screenpipe API
      const response = await fetch(`${apiUrl}/health`);
      if (response.ok) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
        setError('Screenpipe API returned an error status.');
      }
    } catch (err) {
      setIsConnected(false);
      setError('Could not connect to Screenpipe. Ensure it is running locally.');
    } finally {
      setIsConnecting(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    checkConnection();
    // Optional: Poll every 30 seconds to ensure connection remains active
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, [checkConnection]);

  /**
   * Search OCR text and Audio Transcripts in Screenpipe
   * @param {string} query - The text to search for
   * @param {number} limit - Max number of results
   */
  const searchHistory = async (query, limit = 10) => {
    if (!isConnected) throw new Error("Screenpipe is not connected");
    
    try {
      // Assuming Screenpipe API structure: /search?q=...
      const response = await fetch(`${apiUrl}/search?q=${encodeURIComponent(query)}&limit=${limit}`);
      if (!response.ok) throw new Error("Search failed");
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Screenpipe search error:", err);
      throw err;
    }
  };

  /**
   * Get recent screen context (last N minutes)
   */
  const getRecentContext = async (minutes = 5) => {
    if (!isConnected) throw new Error("Screenpipe is not connected");

    try {
      const startTime = new Date(Date.now() - minutes * 60000).toISOString();
      const response = await fetch(`${apiUrl}/search?start_time=${startTime}`);
      if (!response.ok) throw new Error("Failed to fetch recent context");
      
      return await response.json();
    } catch (err) {
      console.error("Screenpipe context error:", err);
      throw err;
    }
  };

  return {
    isConnected,
    isConnecting,
    error,
    apiUrl,
    checkConnection,
    searchHistory,
    getRecentContext
  };
}
