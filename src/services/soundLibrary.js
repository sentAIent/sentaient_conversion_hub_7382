/**
 * Local Sound Library Database using Native IndexedDB
 * Allows users to permanently save AI-generated instruments and loops.
 */

const DB_NAME = 'MindWave_SonicVault';
const STORE_NAME = 'instruments';
const DB_VERSION = 1;

let dbPromise = null;

function getDB() {
  if (dbPromise) return dbPromise;
  
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => reject('IndexedDB error: ' + event.target.error);
    
    request.onsuccess = (event) => resolve(event.target.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
        store.createIndex('genre', 'genre', { unique: false });
      }
    };
  });
  
  return dbPromise;
}

export async function saveInstrument(id, name, blob, metadata = {}) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const record = {
      id,
      name,
      audioBlob: blob,
      createdAt: Date.now(),
      ...metadata
    };
    
    const request = store.put(record);
    request.onsuccess = () => resolve(record);
    request.onerror = (e) => reject(e.target.error);
  });
}

export async function getAllInstruments() {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = (e) => reject(e.target.error);
  });
}

export async function deleteInstrument(id) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    
    request.onsuccess = () => resolve(true);
    request.onerror = (e) => reject(e.target.error);
  });
}
