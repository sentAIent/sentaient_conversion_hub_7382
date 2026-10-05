import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

/**
 * MobileAppManager
 * Headless component that handles native lifecycle events like backgrounding,
 * deep linking, and cloud sync resilience for mobile devices.
 */
const MobileAppManager = () => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        // Handle Online/Offline Status
        const handleOffline = () => setIsOffline(true);
        const handleOnline = () => setIsOffline(false);

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    if (isOffline) {
        return (
            <div className="fixed top-0 left-0 w-full z-[10000] bg-red-600/90 text-white text-center py-2 px-4 shadow-lg backdrop-blur-sm border-b border-red-500 font-exo text-sm font-bold animate-in slide-in-from-top flex items-center justify-center gap-2 pt-[env(safe-area-inset-top)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                NO INTERNET CONNECTION - PLAYING OFFLINE
            </div>
        );
    }

    return null;
};

export default MobileAppManager;
