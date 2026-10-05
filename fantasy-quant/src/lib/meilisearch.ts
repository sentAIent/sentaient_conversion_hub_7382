import { Meilisearch } from 'meilisearch';

export const meilisearchClient = new Meilisearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST || 'http://localhost:7701',
  apiKey: process.env.MEILI_MASTER_KEY || 'sentaient-quant-master-key',
});

// We create an index for 'players'
export const playersIndex = meilisearchClient.index('players');
