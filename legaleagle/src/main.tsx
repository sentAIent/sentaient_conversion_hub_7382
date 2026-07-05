import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { AuthProvider } from '@/context/AuthContext'

import { RevenueCatProvider } from '@/context/RevenueCatContext'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

// Initialize PostHog (Make sure to replace with your actual API key)
posthog.init('phc_dummy_api_key_replace_me', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only'
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PostHogProvider client={posthog}>
            <AuthProvider>
                <RevenueCatProvider>
                    <App />
                </RevenueCatProvider>
            </AuthProvider>
        </PostHogProvider>
    </StrictMode>,
)
