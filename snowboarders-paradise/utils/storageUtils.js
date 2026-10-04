export const initDB = () => {
  return new Promise((resolve, reject) => {
    // If not in a browser environment (like during server rendering), resolve null
    if (typeof window === 'undefined' || !window.indexedDB) {
      return resolve(null);
    }
    const request = indexedDB.open('SnowboarderFilmVault', 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('clips')) {
        db.createObjectStore('clips', { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveClip = async (clip) => {
  const db = await initDB();
  if (!db) return;
  return new Promise((resolve, reject) => {
    const tx = db.transaction('clips', 'readwrite');
    const store = tx.objectStore('clips');
    store.put(clip);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

export const getAllClips = async () => {
  const db = await initDB();
  if (!db) return [];
  return new Promise((resolve, reject) => {
    const tx = db.transaction('clips', 'readonly');
    const store = tx.objectStore('clips');
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const deleteClip = async (id) => {
  const db = await initDB();
  if (!db) return;
  return new Promise((resolve, reject) => {
    const tx = db.transaction('clips', 'readwrite');
    const store = tx.objectStore('clips');
    store.delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};
