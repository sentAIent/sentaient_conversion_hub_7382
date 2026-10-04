import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { create, insert, search } from '@orama/orama';

// Schema for a Financial Ledger Transaction
const transactionSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    amount: { type: 'number' },
    category: { type: 'string' },
    date: { type: 'string' },
    merchant: { type: 'string' },
    notes: { type: 'string' },
    is_recurring: { type: 'boolean' }
  },
  required: ['id', 'amount', 'date', 'merchant']
};

let dbPromise: any = null;

export const getDatabase = async () => {
  if (dbPromise) return dbPromise;

  dbPromise = (async () => {
    // 1. Initialize RxDB for Offline-First Data
    const db = await createRxDatabase({
      name: 'liquid_finance_db',
      storage: getRxStorageDexie(),
      multiInstance: true,
      ignoreDuplicate: true
    });

    await db.addCollections({
      transactions: {
        schema: transactionSchema
      }
    });

    // 2. Initialize Orama for Sub-Millisecond Search
    const oramaDb = await create({
      schema: {
        id: 'string',
        merchant: 'string',
        category: 'string',
        notes: 'string'
      }
    });

    // 3. Sync RxDB inserts into Orama Search Index automatically
    db.transactions.postInsert(async (docData: any) => {
      await insert(oramaDb, {
        id: docData.id,
        merchant: docData.merchant,
        category: docData.category || '',
        notes: docData.notes || ''
      });
    }, false);

    return { rxdb: db, orama: oramaDb };
  })();

  return dbPromise;
};

// Helper for blazing fast search via Orama
export const searchTransactions = async (term: string) => {
  const { orama } = await getDatabase();
  const results = await search(orama, {
    term,
    properties: ['merchant', 'category', 'notes'],
    tolerance: 1 // Typo tolerance
  });
  return results.hits;
};
