import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
// Note: In production, we'd use storage-dexie (IndexedDB) for true offline persistence.
// We use memory storage here for rapid prototyping in the Agent Studio.

/**
 * Enterprise Local-First Database Service
 * Uses RxDB to provide offline-first, reactive data capabilities.
 */
class RxDBService {
    constructor() {
        this.db = null;
        this.isReady = false;
        
        // Define our reactive schema for the Quant/Analytics grid
        this.analyticsSchema = {
            title: 'analytics schema',
            version: 0,
            description: 'Describes a conversion analytic data point',
            primaryKey: 'id',
            type: 'object',
            properties: {
                id: { type: 'string', maxLength: 100 },
                userType: { type: 'string' },
                conversionScore: { type: 'number' },
                source: { type: 'string' },
                latencyMs: { type: 'number' },
                timestamp: { type: 'number' }
            },
            required: ['id', 'userType', 'conversionScore', 'timestamp']
        };

        this.rtsSchema = {
            title: 'rts schema',
            version: 0,
            description: 'Stores permanent RTS game state like bases built',
            primaryKey: 'id',
            type: 'object',
            properties: {
                id: { type: 'string', maxLength: 100 },
                statePayload: { type: 'object' },
                lastUpdatedAt: { type: 'number' }
            },
            required: ['id', 'statePayload', 'lastUpdatedAt']
        };
    }

    async init() {
        if (this.isReady) return this.db;

        try {
            console.log('[RxDB] Initializing local reactive database...');
            this.db = await createRxDatabase({
                name: 'sentaient_local_db',
                storage: getRxStorageMemory(), // Using memory adapter for the sandbox
                ignoreDuplicate: true
            });

            await this.db.addCollections({
                analytics: {
                    schema: this.analyticsSchema
                },
                rts: {
                    schema: this.rtsSchema
                }
            });

            this.isReady = true;
            console.log('[RxDB] Database initialized successfully.');
            
            // Seed with initial dummy data if empty
            await this.seedDummyData();
            
            return this.db;
        } catch (error) {
            console.error('[RxDB] Initialization Error:', error);
            throw error;
        }
    }

    async seedDummyData() {
        const count = await this.db.analytics.find().exec();
        if (count.length > 0) return;

        const dummyData = Array.from({ length: 50 }).map((_, i) => ({
            id: `row_${i}_${Date.now()}`,
            userType: i % 2 === 0 ? 'Enterprise' : 'Pro',
            conversionScore: parseFloat((Math.random() * 100).toFixed(2)),
            source: ['Organic', 'Direct', 'Referral', 'Agent'][Math.floor(Math.random() * 4)],
            latencyMs: Math.floor(Math.random() * 500),
            timestamp: Date.now() - (Math.random() * 10000000)
        }));

        await this.db.analytics.bulkInsert(dummyData);
        console.log(`[RxDB] Seeded ${dummyData.length} records.`);
    }

    /**
     * Observable query that UI components can subscribe to
     */
    getAnalyticsObservable() {
        if (!this.isReady) return null;
        return this.db.analytics.find().sort({ timestamp: 'desc' }).$;
    }

    /**
     * Add a real-time data point (will automatically update the grid)
     */
    async insertAnalytic(data) {
        if (!this.isReady) await this.init();
        await this.db.analytics.insert({
            id: `row_${Date.now()}`,
            timestamp: Date.now(),
            ...data
        });
    }

    /**
     * Save the entire RTS game state for persistence
     */
    async saveRTSState(statePayload) {
        if (!this.isReady) await this.init();
        // Upsert the single state record
        await this.db.rts.upsert({
            id: 'master_state',
            statePayload,
            lastUpdatedAt: Date.now()
        });
    }

    /**
     * Retrieve the last saved RTS game state
     */
    async getRTSState() {
        if (!this.isReady) await this.init();
        const doc = await this.db.rts.findOne({ selector: { id: 'master_state' } }).exec();
        return doc ? doc.statePayload : null;
    }
}

export const rxdbService = new RxDBService();
