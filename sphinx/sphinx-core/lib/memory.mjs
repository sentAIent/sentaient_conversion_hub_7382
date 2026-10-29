import fetch from 'node-fetch';

export class SphinxMemory {
  constructor() {
    this.chromaUrl = process.env.CHROMA_URL || 'http://localhost:8000/api/v1';
    this.collectionName = 'sphinx_master_memory';
    this.initCollection();
  }

  async initCollection() {
    try {
      console.log('[Sphinx Memory] Initializing ChromaDB connection...');
      // Ensure the collection exists in ChromaDB
      await fetch(`${this.chromaUrl}/collections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.collectionName })
      });
      console.log('[Sphinx Memory] Vector database connected.');
    } catch (e) {
      console.warn('[Sphinx Memory] Could not connect to ChromaDB. Is it running?');
    }
  }

  async storeEvent(source, eventData, assessment) {
    const memoryRecord = {
      timestamp: new Date().toISOString(),
      source,
      eventData,
      assessment
    };
    
    const eventId = `evt_${Date.now()}`;
    const documentText = `Source: ${source}. Data: ${JSON.stringify(eventData)}. Assessment: ${assessment}`;

    try {
      // POST to ChromaDB (Assuming ChromaDB handles embedding generation natively via its default embedding function)
      // First, get collection ID
      const colRes = await fetch(`${this.chromaUrl}/collections/${this.collectionName}`);
      const collection = await colRes.json();

      await fetch(`${this.chromaUrl}/collections/${collection.id}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: [eventId],
          documents: [documentText],
          metadatas: [{ source, timestamp: memoryRecord.timestamp }]
        })
      });
      
      console.log(`[Sphinx Memory] Event ${eventId} embedded and stored in long-term vector memory.`);
    } catch (e) {
      console.error(`[Sphinx Memory] Failed to store event: ${e.message}`);
    }
  }

  async recallRecentEvents(limit = 5) {
    // For now, this is a placeholder. In a full implementation, you would query ChromaDB 
    // by passing in a contextual query string to get semantic matches, rather than just recent events.
    return [];
  }
}
