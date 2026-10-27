/**
 * Enterprise Local-First Reactive Database Service
 * Self-contained in-memory & localStorage reactive state engine
 */
class RxDBService {
    constructor() {
        this.isReady = false;
        this.analyticsData = [];
        this.analyticsListeners = new Set();
        this.rtsState = null;
    }

    async init() {
        if (this.isReady) return this;

        // Try restoring RTS state from localStorage
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                const savedRts = localStorage.getItem('sentaient_rts_state');
                if (savedRts) this.rtsState = JSON.parse(savedRts);
            }
        } catch (e) {
            console.warn('[RxDB] Could not load saved RTS state:', e);
        }

        // Seed with initial dummy analytics data
        this.analyticsData = Array.from({ length: 25 }).map((_, i) => ({
            id: `row_${i}_${Date.now()}`,
            userType: i % 2 === 0 ? 'Enterprise' : 'Pro',
            conversionScore: parseFloat((Math.random() * 100).toFixed(2)),
            source: ['Organic', 'Direct', 'Referral', 'Agent'][Math.floor(Math.random() * 4)],
            latencyMs: Math.floor(Math.random() * 500),
            timestamp: Date.now() - (Math.random() * 10000000)
        }));

        this.isReady = true;
        this.notifyAnalyticsListeners();
        return this;
    }

    notifyAnalyticsListeners() {
        const payload = this.analyticsData.map(d => ({
            ...d,
            toJSON: () => ({ ...d })
        }));
        this.analyticsListeners.forEach(listener => {
            try {
                listener(payload);
            } catch (err) {
                console.warn('[RxDB] Listener error:', err);
            }
        });
    }

    getAnalyticsObservable() {
        return {
            subscribe: (callback) => {
                this.analyticsListeners.add(callback);
                // Immediately emit current data
                if (this.isReady) {
                    const payload = this.analyticsData.map(d => ({
                        ...d,
                        toJSON: () => ({ ...d })
                    }));
                    callback(payload);
                }
                return {
                    unsubscribe: () => {
                        this.analyticsListeners.delete(callback);
                    }
                };
            }
        };
    }

    async insertAnalytic(data) {
        if (!this.isReady) await this.init();
        const newRecord = {
            id: `row_${Date.now()}`,
            timestamp: Date.now(),
            ...data
        };
        this.analyticsData.unshift(newRecord);
        this.notifyAnalyticsListeners();
    }

    async saveRTSState(statePayload) {
        if (!this.isReady) await this.init();
        this.rtsState = statePayload;
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('sentaient_rts_state', JSON.stringify(statePayload));
            }
        } catch (e) {
            console.warn('[RxDB] Could not save RTS state:', e);
        }
    }

    async getRTSState() {
        if (!this.isReady) await this.init();
        return this.rtsState;
    }
}

export const rxdbService = new RxDBService();
export default rxdbService;
