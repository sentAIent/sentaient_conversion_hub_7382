import { SecureStorageService, secureStorage, setItem, getItem, removeItem, clear } from '../secureStorageService';
import { Platform } from 'react-native';

describe('SecureStorageService', () => {
  beforeEach(async () => {
    await clear();
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  });

  describe('Basic Storage Operations (setItem, getItem, removeItem, clear)', () => {
    test('should set and get item successfully', async () => {
      await setItem('userToken', 'jwt-secret-token-12345');
      const retrieved = await getItem('userToken');

      expect(retrieved).toBe('jwt-secret-token-12345');
    });

    test('should return null for non-existent key', async () => {
      const value = await getItem('unknownKey');
      expect(value).toBeNull();
    });

    test('should remove item successfully', async () => {
      await setItem('tempKey', 'tempValue');
      expect(await getItem('tempKey')).toBe('tempValue');

      await removeItem('tempKey');
      expect(await getItem('tempKey')).toBeNull();
    });

    test('should clear all stored items', async () => {
      await setItem('key1', 'val1');
      await setItem('key2', 'val2');
      await setItem('key3', 'val3');

      expect(await getItem('key1')).toBe('val1');
      expect(await getItem('key2')).toBe('val2');

      await clear();

      expect(await getItem('key1')).toBeNull();
      expect(await getItem('key2')).toBeNull();
      expect(await getItem('key3')).toBeNull();
    });
  });

  describe('Encrypted Storage Integrity on Web Fallback', () => {
    test('should store encrypted ciphertext on web localStorage rather than plaintext', async () => {
      const rawKey = 'apiSecret';
      const plainVal = 'super-secret-api-key-xyz';

      await setItem(rawKey, plainVal);

      // Verify that raw stored value in localStorage is AES-256 encrypted
      if (typeof window !== 'undefined' && window.localStorage) {
        const rawStored = window.localStorage.getItem(rawKey);
        expect(rawStored).not.toBeNull();
        expect(rawStored).not.toBe(plainVal);
        expect(rawStored).not.toContain(plainVal);
        expect(rawStored).toContain(':');

        const parts = rawStored.split(':');
        expect(parts.length).toBe(2);
        expect(parts[0].length).toBe(32); // 16-byte IV hex
      }

      // Verify getItem still decrypts back to original plainVal
      const decrypted = await getItem(rawKey);
      expect(decrypted).toBe(plainVal);
    });

    test('should handle JSON stringified object payloads cleanly', async () => {
      const userProfile = { id: 42, role: 'Admin', email: 'admin@sentaient.com' };
      const jsonString = JSON.stringify(userProfile);

      await setItem('profile', jsonString);
      const retrieved = await getItem('profile');

      expect(retrieved).toBe(jsonString);
      expect(JSON.parse(retrieved)).toEqual(userProfile);
    });
  });

  describe('Validation & Error Handling', () => {
    test('should throw error when setItem key is empty or not string', async () => {
      await expect(setItem('', 'val')).rejects.toThrow('Storage key must be a non-empty string');
      await expect(setItem(null, 'val')).rejects.toThrow('Storage key must be a non-empty string');
      await expect(setItem(123, 'val')).rejects.toThrow('Storage key must be a non-empty string');
    });

    test('should throw error when setItem value is null or undefined', async () => {
      await expect(setItem('key', null)).rejects.toThrow('Storage value cannot be null or undefined');
      await expect(setItem('key', undefined)).rejects.toThrow('Storage value cannot be null or undefined');
    });

    test('should return null when getItem key is invalid or non-string', async () => {
      expect(await getItem(null)).toBeNull();
      expect(await getItem('')).toBeNull();
      expect(await getItem(1234)).toBeNull();
    });
  });
});
