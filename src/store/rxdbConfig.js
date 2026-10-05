import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { supabaseClient } from '../config/supabaseClient';

// Add necessary RxDB plugins
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBReplicationSupabasePlugin } from 'rxdb/plugins/replication-supabase';

addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBReplicationSupabasePlugin);

// Define Schema for AI Agents
const agentSchema = {
  title: 'agent schema',
  version: 0,
  description: 'describes an AI agent',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    name: { type: 'string' },
    status: { type: 'string' },
    configuration: { type: 'object' },
    updated_at: { type: 'string' }
  },
  required: ['id', 'name', 'status']
};

let dbPromise = null;

export const initDB = async () => {
  if (!dbPromise) {
    dbPromise = createRxDatabase({
      name: 'sentaientdb',
      storage: getRxStorageDexie(),
      multiInstance: true,
      eventReduce: true
    }).then(async (db) => {
      // Add collections
      await db.addCollections({
        agents: { schema: agentSchema }
      });

      // Setup Supabase Replication
      if (supabaseClient) {
        db.agents.syncSupabase({
          supabaseClient,
          table: 'agents',
          replicationIdentifier: 'agents-sync',
          pull: {
            queryBuilder: (doc) => {
              const updatedAt = doc?.updated_at || new Date(0).toISOString();
              return supabaseClient
                .from('agents')
                .select('*')
                .gt('updated_at', updatedAt)
                .order('updated_at', { ascending: true });
            }
          },
          push: {
            insertHandler: async (docs) => {
              const { data, error } = await supabaseClient.from('agents').insert(docs);
              if (error) throw error;
              return data;
            },
            updateHandler: async (docs) => {
              const { data, error } = await supabaseClient.from('agents').upsert(docs);
              if (error) throw error;
              return data;
            },
            deleteHandler: async (docs) => {
              const ids = docs.map(d => d.id);
              const { error } = await supabaseClient.from('agents').delete().in('id', ids);
              if (error) throw error;
              return docs;
            }
          }
        });
      }

      return db;
    });
  }
  return dbPromise;
};

export const getDB = () => dbPromise;
