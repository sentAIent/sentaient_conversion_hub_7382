(function() {
  const config = window.LIGHTSPEED_CONFIG;
  
  if (!config || !config.source || !config.supabaseUrl || !config.anonKey) {
    console.warn("Lightspeed Tracker: Missing configuration in window.LIGHTSPEED_CONFIG");
    return;
  }

  // Wait for the page to fully load to measure page load time accurately
  window.addEventListener('load', () => {
    // Small delay to ensure performance metrics are fully populated
    setTimeout(() => {
      try {
        let loadTimeMs = 0;
        
        // Use modern PerformanceNavigationTiming API if available
        const navEntries = performance.getEntriesByType("navigation");
        if (navEntries.length > 0 && navEntries[0].loadEventEnd > 0) {
          loadTimeMs = navEntries[0].loadEventEnd - navEntries[0].startTime;
        } else {
          // Fallback to older timing API
          const timing = performance.timing;
          loadTimeMs = timing.loadEventEnd - timing.navigationStart;
        }

        if (loadTimeMs <= 0 || loadTimeMs > 60000) {
          // Ignore invalid or extremely long values (e.g. background tabs)
          return;
        }

        // Send metric to Supabase
        fetch(`${config.supabaseUrl}/rest/v1/metrics`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': config.anonKey,
            'Authorization': `Bearer ${config.anonKey}`
          },
          body: JSON.stringify({
            site: config.source,
            metric_name: 'page_load_time',
            value: loadTimeMs
          }),
          // Use keepalive to ensure the request goes through even if the user is navigating away
          keepalive: true
        }).catch(err => console.error("Lightspeed Tracker: Failed to send metric", err));
        
      } catch (e) {
        console.error("Lightspeed Tracker Error:", e);
      }
    }, 1000);
  });
})();
