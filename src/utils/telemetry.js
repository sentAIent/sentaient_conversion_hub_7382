/**
 * Basic Telemetry and Latency Monitor for UX/Performance Tracking.
 * Logs session duration and UI interaction latency.
 * In a real-world scenario, this should pipe to PostHog, DataDog, or Firebase Analytics.
 */

class TelemetryService {
  constructor() {
    this.sessionStartTime = Date.now();
    this.interactions = [];
  }

  logInteraction(eventName, metadata = {}) {
    const time = Date.now();
    this.interactions.push({ eventName, time, metadata });
    
    // Simulate sending telemetry batch
    if (this.interactions.length > 10) {
      this.flush();
    }
  }

  measureLatency(operationName, fn) {
    const start = performance.now();
    const result = fn();
    if (result instanceof Promise) {
      return result.then(res => {
        const end = performance.now();
        this.logInteraction('latency_metric', { operation: operationName, durationMs: end - start });
        return res;
      });
    } else {
      const end = performance.now();
      this.logInteraction('latency_metric', { operation: operationName, durationMs: end - start });
      return result;
    }
  }

  flush() {
    // console.log('[Telemetry] Flushing telemetry data:', this.interactions);
    // TODO: Send to backend analytics service
    this.interactions = [];
  }
}

export const telemetry = new TelemetryService();

// Auto-track session end
window.addEventListener('beforeunload', () => {
  telemetry.logInteraction('session_end', { durationMs: Date.now() - telemetry.sessionStartTime });
  telemetry.flush();
});
