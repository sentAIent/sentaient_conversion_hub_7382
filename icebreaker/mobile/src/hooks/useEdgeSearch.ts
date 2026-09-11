import { useState, useEffect } from 'react';
import { create, search, insertMultiple, type Orama } from '@orama/orama';

export type BountyIndex = {
  id: string;
  title: string;
  description: string;
};

let globalDb: Orama<any> | null = null;

export const useEdgeSearch = (initialBounties: BountyIndex[]) => {
  const [db, setDb] = useState<Orama<any> | null>(globalDb);
  const [results, setResults] = useState<BountyIndex[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!globalDb) {
      const initDb = async () => {
        const newDb = await create({
          schema: {
            id: 'string',
            title: 'string',
            description: 'string',
          }
        });
        
        await insertMultiple(newDb, initialBounties);
        globalDb = newDb;
        setDb(newDb);
        setIsReady(true);
      };
      initDb();
    } else {
      setIsReady(true);
    }
  }, [initialBounties]);

  const searchBounties = async (term: string) => {
    if (!db || !term) {
      setResults([]);
      return;
    }
    const result = await search(db, { term, tolerance: 1 });
    const formatted = result.hits.map(h => h.document as unknown as BountyIndex);
    setResults(formatted);
  };

  return { searchBounties, results, isReady };
};
