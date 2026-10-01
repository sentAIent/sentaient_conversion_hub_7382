import posthog from 'posthog-js';

// Initialize PostHog conditionally so it doesn't crash if keys are missing
export const initPostHog = () => {
  const apiKey = import.meta.env.VITE_POSTHOG_KEY;
  const apiHost = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';

  if (apiKey) {
    posthog.init(apiKey, {
      api_host: apiHost,
      loaded: (posthog) => {
        if (import.meta.env.DEV) {
          posthog.debug(); // Debug mode in development
        }
      },
      capture_pageview: false // We handle this manually in React if needed, or leave true
    });
  } else {
    console.warn('PostHog API key missing (VITE_POSTHOG_KEY). Analytics disabled.');
  }
};

export default posthog;
