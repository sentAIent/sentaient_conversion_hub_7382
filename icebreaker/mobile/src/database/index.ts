import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
// import { getRxStorageSQLite, getSQLiteBasicsExpoSQLite } from 'rxdb-premium/plugins/storage-sqlite';
// import * as SQLite from 'expo-sqlite';
import { bountySchema } from './schema';

let dbPromise: any = null;

export const getDatabase = () => {
  if (!dbPromise) {
    dbPromise = createRxDatabase({
      name: 'icebreakerdb',
      // Using memory fallback for OSS repo. To use true offline SQLite,
      // uncomment the SQLite imports and replace this storage adapter with getRxStorageSQLite.
      storage: getRxStorageMemory(),
      multiInstance: false,
      ignoreDuplicate: true,
    }).then(async (db) => {
      await db.addCollections({
        bounties: {
          schema: bountySchema
        }
      });
      return db;
    });
  }
  return dbPromise;
};
