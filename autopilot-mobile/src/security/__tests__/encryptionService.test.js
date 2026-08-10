import { EncryptionService, encryptionService, encrypt, decrypt, setMasterKey, clearMasterKey } from '../encryptionService';

describe('EncryptionService (AES-256)', () => {
  const TEST_KEY = 'my-super-secret-encryption-key-256';
  const TEST_PLAINTEXT = 'Sensitive User Data: 1234-5678-9012';

  beforeEach(() => {
    clearMasterKey();
  });

  describe('Basic Encryption & Decryption Roundtrip', () => {
    test('should encrypt plaintext into ivHex:cipherTextHex format', () => {
      const cipherText = encrypt(TEST_PLAINTEXT, TEST_KEY);

      expect(typeof cipherText).toBe('string');
      expect(cipherText).toContain(':');

      const parts = cipherText.split(':');
      expect(parts.length).toBe(2);

      const [ivHex, cipherTextHex] = parts;
      expect(ivHex.length).toBe(32); // 16 bytes = 32 hex chars
      expect(/^[0-9a-fA-F]{32}$/.test(ivHex)).toBe(true);
      expect(/^[0-9a-fA-F]+$/.test(cipherTextHex)).toBe(true);
    });

    test('should decrypt valid ciphertext back to original plaintext', () => {
      const cipherText = encrypt(TEST_PLAINTEXT, TEST_KEY);
      const decrypted = decrypt(cipherText, TEST_KEY);

      expect(decrypted).toBe(TEST_PLAINTEXT);
    });

    test('should generate unique IV and ciphertext for identical inputs', () => {
      const cipher1 = encrypt(TEST_PLAINTEXT, TEST_KEY);
      const cipher2 = encrypt(TEST_PLAINTEXT, TEST_KEY);

      expect(cipher1).not.toBe(cipher2);

      const dec1 = decrypt(cipher1, TEST_KEY);
      const dec2 = decrypt(cipher2, TEST_KEY);

      expect(dec1).toBe(TEST_PLAINTEXT);
      expect(dec2).toBe(TEST_PLAINTEXT);
    });
  });

  describe('Multi-byte Unicode & Edge Cases', () => {
    test('should correctly roundtrip multi-byte Unicode and emojis', () => {
      const unicodeText = '🔒 Hello World! こんにちは世界 🚀 UTF-8: ñ, é, ü, 𝛂𝛃𝛄, 🧠⚡';
      const cipherText = encrypt(unicodeText, TEST_KEY);
      const decrypted = decrypt(cipherText, TEST_KEY);

      expect(decrypted).toBe(unicodeText);
    });

    test('should handle empty string plaintext roundtrip', () => {
      const emptyText = '';
      const cipherText = encrypt(emptyText, TEST_KEY);

      expect(typeof cipherText).toBe('string');
      expect(cipherText).toContain(':');

      const decrypted = decrypt(cipherText, TEST_KEY);
      expect(decrypted).toBe('');
    });

    test('should throw TypeError when encrypting non-string values', () => {
      expect(() => encrypt(null, TEST_KEY)).toThrow(TypeError);
      expect(() => encrypt(12345, TEST_KEY)).toThrow(TypeError);
      expect(() => encrypt({ a: 1 }, TEST_KEY)).toThrow(TypeError);
    });
  });

  describe('Security & Error Handling', () => {
    test('should reject decryption with wrong key by returning null', () => {
      const cipherText = encrypt(TEST_PLAINTEXT, TEST_KEY);
      const WRONG_KEY = 'wrong-secret-key-12345';
      const decrypted = decrypt(cipherText, WRONG_KEY);

      expect(decrypted).toBeNull();
    });

    test('should return null for corrupted or tampered ciphertext payload', () => {
      const cipherText = encrypt(TEST_PLAINTEXT, TEST_KEY);
      const [ivHex, cipherTextHex] = cipherText.split(':');

      // Tamper ciphertext hex
      const tamperedHex = cipherTextHex.substring(0, cipherTextHex.length - 2) + '00';
      const tamperedPayload = `${ivHex}:${tamperedHex}`;

      const decrypted = decrypt(tamperedPayload, TEST_KEY);
      expect(decrypted).toBeNull();
    });

    test('should return null for invalid payload format without colon', () => {
      expect(decrypt('invalid_payload_format', TEST_KEY)).toBeNull();
      expect(decrypt(null, TEST_KEY)).toBeNull();
      expect(decrypt('', TEST_KEY)).toBeNull();
      expect(decrypt(12345, TEST_KEY)).toBeNull();
    });

    test('should return null for invalid IV length', () => {
      const invalidIvPayload = '123456:abcd1234ef56';
      expect(decrypt(invalidIvPayload, TEST_KEY)).toBeNull();
    });
  });

  describe('Master Key & Per-call Key Overrides', () => {
    test('should use master key when secretKey is omitted', () => {
      setMasterKey('global-master-secret-key-999');

      const cipherText = encrypt(TEST_PLAINTEXT);
      expect(typeof cipherText).toBe('string');

      const decrypted = decrypt(cipherText);
      expect(decrypted).toBe(TEST_PLAINTEXT);
    });

    test('should allow per-call key override over configured master key', () => {
      setMasterKey('global-master-secret-key-999');
      const OVERRIDE_KEY = 'custom-override-key-111';

      const cipherText = encrypt(TEST_PLAINTEXT, OVERRIDE_KEY);

      // Decrypting with master key should fail (returns null)
      expect(decrypt(cipherText)).toBeNull();

      // Decrypting with override key should succeed
      expect(decrypt(cipherText, OVERRIDE_KEY)).toBe(TEST_PLAINTEXT);
    });

    test('should throw Error if no master key is set and no secretKey is provided', () => {
      expect(() => encrypt(TEST_PLAINTEXT)).toThrow('No encryption key provided');
      expect(() => decrypt('iv:ciphertext')).toThrow('No decryption key provided');
    });
  });
});
