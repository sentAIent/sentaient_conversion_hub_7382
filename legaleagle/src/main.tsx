import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from '@/context/AuthContext'

import { RevenueCatProvider } from '@/context/RevenueCatContext'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

// Initialize PostHog conditionally
const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
if (posthogKey) {
    posthog.init(posthogKey, {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'identified_only'
    });
} else {
    // Prevent posthog from crashing or complaining
    posthog.init('phc_dummy_api_key_replace_me', {
        api_host: 'https://us.i.posthog.com',
        autocapture: false,
        disable_session_recording: true,
        opt_out_capturing_by_default: true,
    });
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PostHogProvider client={posthog}>
            <AuthProvider>
                <RevenueCatProvider>
                    <Toaster 
                        position="top-right" 
                        toastOptions={{
                            style: {
                                background: '#333',
                                color: '#fff',
                                fontFamily: 'sans-serif',
                                fontSize: '14px',
                                borderRadius: '8px'
                            }
                        }}
                    />
                    <App />
                </RevenueCatProvider>
            </AuthProvider>
        </PostHogProvider>
    </StrictMode>,
)
