import posthog from 'posthog-js';
import ReactGA from 'react-ga4';

const POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_KEY || 'phc_PLACEHOLDER_KEY_FOR_LOCAL_DEV';
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';
const GA_MEASUREMENT_ID = 'G-BZL3614FTX';

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
        posthog.capture(eventName, properties);
        ReactGA.event({
            category: properties.category || 'User Interaction',
            action: eventName,
            ...properties
        });
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
