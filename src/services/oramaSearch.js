import { create, insert, search } from '@orama/orama';

// Initialize the Orama in-browser search database
let dbInstance = null;

export const initOrama = async () => {
  if (!dbInstance) {
    dbInstance = await create({
      schema: {
        url: 'string',
        title: 'string',
        h1: 'string',
        pricingSignals: 'string', // Joined array for full-text search
        headers: 'string'       // Joined array for full-text search
      },
    });
  }
  return dbInstance;
};

export const addCompetitorToSearch = async (competitorData) => {
  const db = await initOrama();
  
  // Format the data to fit the schema
  const document = {
    url: competitorData.url || '',
    title: competitorData.title || '',
    h1: competitorData.h1 || '',
    pricingSignals: (competitorData.pricingIndicators || []).join(' | '),
    headers: (competitorData.headers || []).join(' | '),
  };

  await insert(db, document);
  return document;
};

export const searchCompetitors = async (queryTerm) => {
  const db = await initOrama();
  
  if (!queryTerm || queryTerm.trim() === '') {
    // Return all or handle empty search gracefully
    return { hits: [] };
  }

  const results = await search(db, {
    term: queryTerm,
    properties: '*', // Search across all fields
    tolerance: 1     // Typo tolerance
  });

  return results;
};
