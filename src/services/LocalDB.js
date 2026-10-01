import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

// Define the schema for offline-first chat history and AI conversions
const chatSchema = {
    title: 'chat schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: { type: 'string', maxLength: 100 },
        message: { type: 'string' },
        sender: { type: 'string' },
        timestamp: { type: 'number' }
    },
    required: ['id', 'message', 'sender', 'timestamp']
};

let dbPromise = null;

const createDB = async () => {
    try {
        console.log('[LocalDB] Initializing RxDB...');
        const db = await createRxDatabase({
            name: 'sentaientdb',
            storage: getRxStorageDexie()
        });

        await db.addCollections({
            chats: {
                schema: chatSchema
            }
        });

        console.log('[LocalDB] RxDB Initialized.');
        return db;
    } catch (err) {
        console.error('[LocalDB] Failed to initialize RxDB:', err);
        throw err;
    }
};

export const getDB = () => {
    if (!dbPromise) {
        dbPromise = createDB();
    }
    return dbPromise;
};

export default {
    getDB
};
