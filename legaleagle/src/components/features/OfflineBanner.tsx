import React, { useEffect, useState } from 'react';
import { Network } from '@capacitor/network';
import { WifiOff, X } from 'lucide-react';
import { Theme } from '@/types';

interface Props {
    currentTheme: Theme;
}

export const OfflineBanner: React.FC<Props> = ({ currentTheme }) => {
    const [isOffline, setIsOffline] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Initial check
        const checkStatus = async () => {
            const status = await Network.getStatus();
            setIsOffline(!status.connected);
        };
        checkStatus();

        // Listen for changes
        const listener = Network.addListener('networkStatusChange', status => {
            setIsOffline(!status.connected);
            if (status.connected) {
                setDismissed(false); // Reset dismissal when we come back online
            }
        });

        return () => {
            listener.then(l => l.remove());
        };
    }, []);

    if (!isOffline || dismissed) return null;

    const isLight = ['eggshell', 'sand'].includes(currentTheme.id);
    const bgClass = isLight ? 'bg-amber-100 text-amber-900 border-amber-200' : 'bg-amber-900/40 text-amber-200 border-amber-700/50';

    return (
        <div className={`w-full py-2 px-4 flex items-center justify-between border-b ${bgClass}`}>
            <div className="flex items-center gap-3">
                <WifiOff size={18} />
                <span className="text-sm font-medium">
                    You are currently offline. Some features may be unavailable.
                </span>
            </div>
            <button
                onClick={() => setDismissed(true)}
                className="p-1 rounded-md hover:bg-black/10 transition-colors"
                aria-label="Dismiss offline banner"
            >
                <X size={18} />
            </button>
        </div>
    );
};
