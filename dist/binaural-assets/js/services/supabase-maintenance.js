/**
 * Supabase Maintenance Service
 * Handles inactivity pings and session maintenance logic for the backend.
 */

const SUPABASE_PING_INTERVAL_MS = 1000 * 60 * 60 * 12; // 12 hours (fallback if not triggered sooner)
const LAST_PING_KEY = 'mw_last_supabase_ping';
const INACTIVITY_THRESHOLD_MS = 1000 * 60 * 60 * 24 * 3; // 3 days (trigger ping if inactive for this long)

export class SupabaseMaintenance {
    constructor() {
        this.pingInterval = null;
    }

    async init() {
        console.log('[SupabaseMaintenance] Initializing backend maintenance service...');
        
        // Immediately check if we need to ping based on previous inactivity
        this.checkInactivityPing();

        // Set up periodic pings while the app remains open or running in background
        this.pingInterval = setInterval(() => {
            this.pingBackend('periodic_keepalive');
        }, SUPABASE_PING_INTERVAL_MS);

        // Add event listeners for visibility changes (bringing app to foreground)
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.checkInactivityPing();
            }
        });
    }

    checkInactivityPing() {
        const lastPing = localStorage.getItem(LAST_PING_KEY);
        const now = Date.now();

        if (!lastPing) {
            // First time opening app, or storage cleared
            this.pingBackend('initial_launch');
            return;
        }

        const timeSinceLastPing = now - parseInt(lastPing, 10);
        
        if (timeSinceLastPing >= INACTIVITY_THRESHOLD_MS) {
            // User was inactive for more than the threshold
            this.pingBackend('inactivity_return');
        } else if (timeSinceLastPing >= SUPABASE_PING_INTERVAL_MS) {
            // Normal periodic check caught by visibility change
            this.pingBackend('foreground_resume');
        }
    }

    async pingBackend(reason) {
        console.log(`[SupabaseMaintenance] Pinging backend (Reason: ${reason})...`);
        
        try {
            // Here you would implement your actual Supabase Edge Function call.
            // Example:
            // const { data, error } = await supabase.functions.invoke('inactivity-ping', {
            //     body: { reason: reason, timestamp: new Date().toISOString() }
            // });

            // For now, we simulate a successful network ping
            const isNative = window.Capacitor && window.Capacitor.isNativePlatform();
            
            // Simulating API latency
            await new Promise(resolve => setTimeout(resolve, 300));
            
            console.log(`[SupabaseMaintenance] Ping successful. Environment: ${isNative ? 'Native' : 'Web'}`);
            
            // Update last ping timestamp
            localStorage.setItem(LAST_PING_KEY, Date.now().toString());
        } catch (error) {
            console.error('[SupabaseMaintenance] Failed to ping backend:', error);
        }
    }
}

export const supabaseMaintenance = new SupabaseMaintenance();
