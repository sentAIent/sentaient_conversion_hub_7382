import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

// A local-first database setup for offline incident management
export const getDatabase = async () => {
    // In a production app, we would use addRxPlugin(RxDBDevModePlugin) in dev
    const db = await createRxDatabase({
        name: 'lightspeed_local_db',
        storage: getRxStorageDexie()
    });

    await db.addCollections({
        incidents: {
            schema: {
                version: 0,
                primaryKey: 'id',
                type: 'object',
                properties: {
                    id: { type: 'string', maxLength: 100 },
                    title: { type: 'string' },
                    status: { type: 'string' }
                },
                required: ['id', 'title', 'status']
            }
        }
    });

    return db;
};
