// Dynamic offline-first RxDB & Orama search with in-memory fallback
let inMemoryTransactions: any[] = [];

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
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { createRxDatabase } = require('rxdb');
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { getRxStorageDexie } = require('rxdb/plugins/storage-dexie');
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
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { create, insert } = require('@orama/orama');
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
    } catch {
      return {
        rxdb: {
          transactions: {
            insert: async (doc: any) => { inMemoryTransactions.push(doc); return doc; },
            find: () => ({ exec: async () => inMemoryTransactions })
          }
        },
        orama: null
      };
    }
  })();

  return dbPromise;
};

// Helper for blazing fast search via Orama
export const searchTransactions = async (term: string) => {
  try {
    const { orama } = await getDatabase();
    if (orama) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { search } = require('@orama/orama');
      const results = await search(orama, {
        term,
        properties: ['merchant', 'category', 'notes'],
        tolerance: 1 // Typo tolerance
      });
      return results.hits;
    }
  } catch {}

  const lower = term.toLowerCase();
  return inMemoryTransactions
    .filter((t: any) => (t.merchant?.toLowerCase().includes(lower) || t.category?.toLowerCase().includes(lower) || t.notes?.toLowerCase().includes(lower)))
    .map((document: any) => ({ document }));
};
