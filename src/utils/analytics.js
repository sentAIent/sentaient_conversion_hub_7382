import posthog from 'posthog-js';
import ReactGA from 'react-ga4';

const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_KEY || 'phc_PLACEHOLDER_KEY_FOR_LOCAL_DEV';
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';
const GA_MEASUREMENT_ID = 'G-BZL3614FTX';

// Use env var if available, otherwise default to a standard Firebase function URL or local emulator
const AUTOPILOT_API_URL = import.meta.env.VITE_AUTOPILOT_API_URL || 
  (import.meta.env.DEV ? 'http://127.0.0.1:5001/sentaient/us-central1/autopilotIngest' : '/api/autopilot');

// Helper to push data to the Autopilot Customer Data Platform
const sendToAutopilot = async (eventName, properties = {}) => {
    try {
        const payload = {
            event_name: eventName,
            url: window.location.href,
            path: window.location.pathname,
            timestamp: new Date().toISOString(),
            ...properties
        };

        // Fire-and-forget to avoid blocking the UI
        if (import.meta.env.DEV && AUTOPILOT_API_URL.includes('127.0.0.1')) {
            // Skip fetching local emulator to prevent ERR_CONNECTION_REFUSED spam
            return;
        }
        
        fetch(AUTOPILOT_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(err => {
            // Silently fail if endpoint isn't up yet - no console.warn to prevent spam
        });
    } catch (e) {
        // Silently fail
    }
};

export const initAnalytics = () => {
    try {
        // Initialize GA4
        ReactGA.initialize(GA_MEASUREMENT_ID);
        
        if (POSTHOG_API_KEY.includes('PLACEHOLDER')) {
            // console.log('[Analytics] PostHog placeholder key detected - skipping initialization');
            return;
        }

        posthog.init(POSTHOG_API_KEY, {
            api_host: POSTHOG_HOST,
            autocapture: true,
            capture_pageview: false, // We will manually track pageviews for better control
            loaded: (posthog) => {
                if (import.meta.env.DEV) posthog.opt_out_capturing(); // Optional: Disable in dev
            }
        });

        // Global Error Tracking (Item 25)
        window.addEventListener('error', (event) => {
            trackError('global_error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error ? event.error.stack : null
            });
        });

        window.addEventListener('unhandledrejection', (event) => {
            trackError('unhandled_promise_rejection', {
                reason: event.reason ? (event.reason.stack || event.reason.toString()) : 'Unknown reason'
            });
        });

        // Init Latency Monitor (Item 26)
        initLatencyMonitor();
    } catch (error) {
        console.warn("Analytics initialization failed:", error);
    }
};

export const trackError = (errorName, errorProperties = {}) => {
    try {
        posthog.capture('$exception', {
            error_name: errorName,
            ...errorProperties
        });
    } catch (e) {
        console.warn("Failed to track error:", e);
    }
};

// Session Telemetry & Latency Monitor (Item 26)
export const initLatencyMonitor = () => {
    if (!window.PerformanceObserver) return;
    
    try {
        // Track Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            trackEvent('web_vitals_lcp', { value: lastEntry.renderTime || lastEntry.loadTime });
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        // Track First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const firstInput = entryList.getEntries()[0];
            trackEvent('web_vitals_fid', { value: firstInput.processingStart - firstInput.startTime });
        }).observe({ type: 'first-input', buffered: true });

        // Track Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    trackEvent('web_vitals_cls', { value: clsValue });
                }
            }
        }).observe({ type: 'layout-shift', buffered: true });
        
        // Track API Latency via monkey-patching fetch
        const originalFetch = window.fetch;
        window.fetch = async function(...args) {
            const startTime = performance.now();
            try {
                const response = await originalFetch.apply(this, args);
                const duration = performance.now() - startTime;
                if (args[0] && typeof args[0] === 'string' && args[0].includes('/api/')) {
                    trackEvent('api_latency', { url: args[0], duration_ms: duration, status: response.status });
                }
                return response;
            } catch (error) {
                const duration = performance.now() - startTime;
                trackEvent('api_latency_error', { url: args[0], duration_ms: duration });
                throw error;
            }
        };
    } catch (e) {
        console.warn("Failed to init latency monitor", e);
    }
};

export const trackEvent = (eventName, properties = {}) => {
    try {
        // 1. Send to PostHog
        posthog.capture(eventName, properties);
        
        // 2. Send to Google Analytics 4
        ReactGA.event({
            category: properties.category || 'User Interaction',
            action: eventName,
            ...properties
        });
        
        // 3. Send to Autopilot (Internal CDP/Server-Side Tagging)
        sendToAutopilot(eventName, properties);
        
    } catch (error) {
        console.warn(`Failed to track event ${eventName}:`, error);
    }
};

export const trackPageView = (path) => {
    trackEvent('$pageview', { path });
    ReactGA.send({ hitType: "pageview", page: path });
}

export const identifyUser = (userId, properties = {}) => {
    try {
        posthog.identify(userId, properties);
    } catch (error) {
        console.warn("Failed to identify user:", error);
    }
}
