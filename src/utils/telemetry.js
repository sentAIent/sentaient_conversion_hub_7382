/**
 * Client-Side Telemetry & SRE Monitoring
 */
export function initTelemetry() {
  if (typeof window === 'undefined') return;

  // 1. Process Memory & OOM Prevention (Only supported in Chromium)
  if (performance && performance.memory) {
    setInterval(() => {
      const memory = performance.memory;
      const heapUsedPercent = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
      
      if (heapUsedPercent > 0.85) {
        console.warn(`[OOM Warning] JS Heap used is ${Math.round(heapUsedPercent * 100)}%. Approaching limit.`);
        // In a real implementation, send this to Sentry or Datadog
        // Sentry.captureMessage("High Memory Usage Detected", "warning");
      }
    }, 30000); // Check every 30s
  }

  // 2. Session Telemetry & Latency Monitor
  // Measure how long the main event loop takes to detect heavy blocking operations
  let lastTime = performance.now();
  
  function monitorEventLoop() {
    const now = performance.now();
    const delta = now - lastTime;
    
    // If the event loop was blocked for more than 100ms (10 frames at 60fps)
    if (delta > 100) {
      console.warn(`[Latency Spike] Main thread was blocked for ${Math.round(delta)}ms`);
      // Sentry.captureMessage(`Latency Spike: ${Math.round(delta)}ms`, "warning");
    }
    
    lastTime = now;
    requestAnimationFrame(monitorEventLoop);
  }
  
  requestAnimationFrame(monitorEventLoop);
}
