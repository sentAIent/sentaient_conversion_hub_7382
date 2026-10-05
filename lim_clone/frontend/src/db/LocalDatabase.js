import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

// Enable dev mode for debugging
addRxPlugin(RxDBDevModePlugin);

const strategySchema = {
    title: 'strategy_draft schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100
        },
        name: {
            type: 'string'
        },
        code: {
            type: 'string'
        },
        lastUpdated: {
            type: 'string',
            format: 'date-time'
        }
    },
    required: ['id', 'name', 'code']
};

let dbPromise = null;

export const initDB = async () => {
    if (!dbPromise) {
        dbPromise = createRxDatabase({
            name: 'contangodb',
            storage: getRxStorageDexie(),
            multiInstance: true,
            eventReduce: true
        }).then(async (db) => {
            await db.addCollections({
                strategy_drafts: {
                    schema: strategySchema
                }
            });
            return db;
        });
    }
    return dbPromise;
};

export const getDB = () => dbPromise;
