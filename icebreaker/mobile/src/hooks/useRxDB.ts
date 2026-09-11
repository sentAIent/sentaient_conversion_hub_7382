import { useState, useEffect } from 'react';
import { getDatabase } from '../database';

export const useRxDB = () => {
  const [db, setDb] = useState<any>(null);
  const [bounties, setBounties] = useState<any[]>([]);

  useEffect(() => {
    let subscription: any = null;

    const initDb = async () => {
      const database = await getDatabase();
      setDb(database);

      // Subscribe to all changes in the bounties collection reactively!
      subscription = database.bounties.find().$.subscribe((results: any) => {
        setBounties(results.map((r: any) => r.toJSON()));
      });
    };

    initDb();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const addBountyOffline = async (bounty: any) => {
    if (!db) return;
    await db.bounties.insert(bounty);
  };

  return { db, bounties, addBountyOffline };
};
