import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { encryptionService } from './encryptionService';

const DEFAULT_STORAGE_SECRET = 'sentaient_secure_storage_default_master_key_v1';

/**
 * Unified Cross-Platform Secure Storage Service
 * Routes to hardware-backed Expo SecureStore on native platforms (iOS/Android)
 * and AES-256 encrypted `localStorage` / in-memory storage fallback on Web.
 */
export class SecureStorageService {
  constructor() {
    this.memoryStorage = new Map();
    this.keys = new Set();
    this.storageKey = DEFAULT_STORAGE_SECRET;
  }

  /**
   * Set custom encryption key for web/fallback storage.
   * @param {string} key 
   */
  setEncryptionKey(key) {
    if (key && typeof key === 'string') {
      this.storageKey = key;
    }
  }

  /**
   * Get active encryption key for web/fallback storage.
   * @returns {string}
   */
  getEncryptionKey() {
    return encryptionService.getMasterKey() || this.storageKey;
  }

  /**
   * Check if native hardware-backed SecureStore is supported and available.
   * @returns {Promise<boolean>}
   */
  async isNativeSecureStoreAvailable() {
    if (Platform.OS === 'web') {
      return false;
    }
    try {
      if (SecureStore && typeof SecureStore.isAvailableAsync === 'function') {
        const available = await SecureStore.isAvailableAsync();
        return Boolean(available);
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  /**
   * Store a key-value pair securely.
   * On Web/fallback, the value is encrypted with AES-256 before storing.
   * @param {string} key 
   * @param {string} value 
   * @returns {Promise<void>}
   */
  async setItem(key, value) {
    if (!key || typeof key !== 'string') {
      throw new Error('Storage key must be a non-empty string');
    }
    if (value === undefined || value === null) {
      throw new Error('Storage value cannot be null or undefined');
    }

    const stringValue = typeof value === 'string' ? value : String(value);
    this.keys.add(key);

    const isNative = await this.isNativeSecureStoreAvailable();
    if (isNative) {
      try {
        await SecureStore.setItemAsync(key, stringValue, {
          keychainAccessible: SecureStore.WHEN_UNLOCKED
        });
      } catch (e) {
        // Fall back to encrypted web/memory storage if native store throws
      }
    }

    // Web / Fallback: Encrypt payload using AES-256
    const encKey = this.getEncryptionKey();
    const encryptedValue = encryptionService.encrypt(stringValue, encKey);

    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, encryptedValue);
    }
    this.memoryStorage.set(key, encryptedValue);
  }

  /**
   * Retrieve and decrypt a stored value by key.
   * @param {string} key 
   * @returns {Promise<string|null>}
   */
  async getItem(key) {
    if (!key || typeof key !== 'string') {
      return null;
    }

    const isNative = await this.isNativeSecureStoreAvailable();
    if (isNative) {
      try {
        const val = await SecureStore.getItemAsync(key);
        if (val !== null && val !== undefined) {
          return val;
        }
      } catch (e) {
        // Fall back to check web/memory storage
      }
    }

    // Web / Fallback: Retrieve encrypted payload & decrypt
    let rawEncrypted = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      rawEncrypted = window.localStorage.getItem(key);
    }
    if (!rawEncrypted) {
      rawEncrypted = this.memoryStorage.get(key) || null;
    }

    if (!rawEncrypted) {
      return null;
    }

    const encKey = this.getEncryptionKey();
    const decrypted = encryptionService.decrypt(rawEncrypted, encKey);
    return decrypted;
  }

  /**
   * Remove a stored key-value pair.
   * @param {string} key 
   * @returns {Promise<void>}
   */
  async removeItem(key) {
    if (!key || typeof key !== 'string') {
      return;
    }

    this.keys.delete(key);

    const isNative = await this.isNativeSecureStoreAvailable();
    if (isNative) {
      try {
        await SecureStore.deleteItemAsync(key);
      } catch (e) {
        // ignore
      }
    }

    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
    this.memoryStorage.delete(key);
  }

  /**
   * Clear all stored key-value pairs.
   * @returns {Promise<void>}
   */
  async clear() {
    const isNative = await this.isNativeSecureStoreAvailable();
    if (isNative) {
      for (const k of this.keys) {
        try {
          await SecureStore.deleteItemAsync(k);
        } catch (e) {
          // ignore
        }
      }
    }

    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
    this.memoryStorage.clear();
    this.keys.clear();
  }
}

export const secureStorage = new SecureStorageService();

export function setItem(key, value) {
  return secureStorage.setItem(key, value);
}

export function getItem(key) {
  return secureStorage.getItem(key);
}

export function removeItem(key) {
  return secureStorage.removeItem(key);
}

export function clear() {
  return secureStorage.clear();
}

export default secureStorage;
