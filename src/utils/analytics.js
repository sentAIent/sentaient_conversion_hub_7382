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
        fetch(AUTOPILOT_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(err => {
            // Silently fail if endpoint isn't up yet
            if (import.meta.env.DEV) console.warn("Autopilot ingest failed:", err);
        });
    } catch (e) {
        if (import.meta.env.DEV) console.error("Autopilot dispatch error:", e);
    }
};

export const initAnalytics = () => {
    try {
        // Initialize GA4
        ReactGA.initialize(GA_MEASUREMENT_ID);
        
        if (POSTHOG_API_KEY.includes('PLACEHOLDER')) {
            console.log('[Analytics] PostHog placeholder key detected - skipping initialization');
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
    } catch (error) {
        console.warn("Analytics initialization failed:", error);
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
