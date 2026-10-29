import { createRxDatabase, addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration-schema';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

// Add plugins
if (process.env.NODE_ENV === 'development') {
    addRxPlugin(RxDBDevModePlugin);
}
addRxPlugin(RxDBMigrationPlugin);
addRxPlugin(RxDBUpdatePlugin);

const gearSchema = {
    title: 'gear schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: { type: 'string', maxLength: 100 },
        name: { type: 'string' },
        type: { type: 'string' }, // 'board', 'jacket', 'goggles'
        stats: {
            type: 'object',
            properties: {
                speed: { type: 'number' },
                carve: { type: 'number' },
                jump: { type: 'number' }
            }
        },
        equipped: { type: 'boolean' }
    },
    required: ['id', 'name', 'type', 'equipped']
};

let dbPromise = null;

const _create = async () => {
    console.log('Initializing RxDB offline-first database...');
    const db = await createRxDatabase({
        name: 'snowboarders_paradise_db',
        storage: getRxStorageDexie() // IndexedDB wrapper for browsers
    });

    console.log('Creating gear collection...');
    await db.addCollections({
        gear: {
            schema: gearSchema
        }
    });

    // Populate with default gear if empty
    const currentGear = await db.gear.find().exec();
    if (currentGear.length === 0) {
        console.log('Inserting default gear...');
        await db.gear.insert({
            id: 'board_default_01',
            name: 'Burton Custom (Base)',
            type: 'board',
            stats: { speed: 50, carve: 50, jump: 50 },
            equipped: true
        });
    }

    return db;
};

export const getDatabase = () => {
    if (!dbPromise) dbPromise = _create();
    return dbPromise;
};
