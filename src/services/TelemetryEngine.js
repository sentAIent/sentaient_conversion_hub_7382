import { supabase } from '../config/supabase';

class TelemetryEngine {
    constructor() {
        this.queue = [];
        this.maxBatchSize = 10;
        this.flushIntervalMs = 5000;
        this.flushIntervalId = null;
        this.isProcessing = false;
        
        // Supabase REST endpoints for telemetry
        this.endpoints = {
            analytics: 'web_analytics',
            metrics: 'metrics',
            incidents: 'incidents'
        };

        this.sessionId = this._getOrCreateSession();
        this.source = "sentaient.com";
        this.deviceInfo = this._getDeviceInfo();

        this._setupListeners();
        this._startFlushInterval();
    }

    _getOrCreateSession() {
        let sessionId = localStorage.getItem('ls_session_id');
        if (!sessionId) {
            sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
            localStorage.setItem('ls_session_id', sessionId);
        }
        return sessionId;
    }

    _getDeviceInfo() {
        const ua = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        return {
            user_agent: ua,
            device_type: isMobile ? 'Mobile' : 'Desktop',
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language
        };
    }

    _setupListeners() {
        // Handle unhandled errors
        window.addEventListener("error", (event) => {
            this.trackIncident({
                type: 'error',
                title: 'Frontend JS Exception',
                explanation: `${event.message} at ${event.filename}:${event.lineno}`,
                fix_action: 'Investigate Code',
                metadata: { stack: event.error?.stack }
            });
        });

        // Flush queue when page is unloaded or hidden
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.flushQueue(true);
            }
        });

        // Track page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                let loadTimeMs = 0;
                const navEntries = performance.getEntriesByType("navigation");
                if (navEntries.length > 0 && navEntries[0].loadEventEnd > 0) {
                    loadTimeMs = navEntries[0].loadEventEnd - navEntries[0].startTime;
                }
                
                if (loadTimeMs > 0 && loadTimeMs <= 60000) {
                    this.trackMetric('page_load_time', loadTimeMs);
                }
            }, 1000);
        });
    }

    _startFlushInterval() {
        this.flushIntervalId = setInterval(() => {
            this.flushQueue();
        }, this.flushIntervalMs);
    }

    // --- Public API ---

    trackPageView() {
        this.enqueue(this.endpoints.analytics, {
            site: this.source,
            session_id: this.sessionId,
            path: window.location.pathname,
            referrer: document.referrer || 'Direct',
            ...this.deviceInfo
        });
    }

    trackMetric(metricName, value, metadata = {}) {
        this.enqueue(this.endpoints.metrics, {
            site: this.source,
            metric_name: metricName,
            value: value,
            metadata: { ...metadata, session_id: this.sessionId, path: window.location.pathname }
        });
    }

    trackIncident(incidentData) {
        this.enqueue(this.endpoints.incidents, {
            source: this.source,
            ...incidentData
        });
    }

    // --- Internal Queueing ---

    enqueue(endpoint, payload) {
        this.queue.push({ endpoint, payload, timestamp: new Date().toISOString() });
        if (this.queue.length >= this.maxBatchSize) {
            this.flushQueue();
        }
    }

    async flushQueue(isUnloading = false) {
        if (this.queue.length === 0 || this.isProcessing) return;
        if (!supabase.supabaseUrl || supabase.supabaseUrl.includes('dummy.supabase')) {
            this.queue = [];
            return;
        }
        this.isProcessing = true;

        const currentBatch = [...this.queue];
        this.queue = [];

        // Group by endpoint
        const grouped = currentBatch.reduce((acc, item) => {
            if (!acc[item.endpoint]) acc[item.endpoint] = [];
            acc[item.endpoint].push(item.payload);
            return acc;
        }, {});

        try {
            const promises = Object.entries(grouped).map(async ([endpoint, payloads]) => {
                try {
                    const { error } = await supabase.from(endpoint).insert(payloads);
                    if (error) console.warn("Supabase telemetry error", error);
                } catch (e) {
                    // Suppress network errors for dummy URL
                }
            });

            if (!isUnloading) {
                await Promise.allSettled(promises);
            } else {
                // Keep-alive fetch for page unloads
                Object.entries(grouped).forEach(([endpoint, payloads]) => {
                    const url = `${supabase.supabaseUrl}/rest/v1/${endpoint}`;
                    const headers = {
                        "Content-Type": "application/json",
                        "apikey": supabase.supabaseKey,
                        "Authorization": `Bearer ${supabase.supabaseKey}`
                    };
                    fetch(url, {
                        method: 'POST',
                        headers,
                        body: JSON.stringify(payloads),
                        keepalive: true
                    }).catch(() => {});
                });
            }
        } catch (e) {
            console.error("TelemetryEngine Flush Error:", e);
        } finally {
            this.isProcessing = false;
        }
    }
}

export const telemetry = new TelemetryEngine();
