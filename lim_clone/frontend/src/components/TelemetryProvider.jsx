import React from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

// Initialize PostHog (Uses dummy key for local dev)
if (typeof window !== 'undefined') {
    posthog.init(import.meta.env.VITE_POSTHOG_KEY || 'phc_mock_key_for_local_dev', {
        api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
        autocapture: true,
        capture_pageview: true,
        capture_pageleave: true,
    });
}

export function TelemetryProvider({ children }) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
