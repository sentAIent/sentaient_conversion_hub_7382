import CryptoJS from 'crypto-js';

/**
 * AES-256 Encryption & Decryption Service
 * Uses AES-256-CBC algorithm with random 128-bit Initialization Vector (IV).
 * Formats encrypted string as `ivHex:cipherTextHex`.
 */
export class EncryptionService {
  constructor() {
    this.masterKey = null;
  }

  /**
   * Set global master key for default encryption/decryption operations.
   * @param {string} key 
   */
  setMasterKey(key) {
    if (!key || typeof key !== 'string') {
      throw new Error('Master key must be a non-empty string');
    }
    this.masterKey = key;
  }

  /**
   * Get current global master key.
   * @returns {string|null}
   */
  getMasterKey() {
    return this.masterKey;
  }

  /**
   * Clear configured master key.
   */
  clearMasterKey() {
    this.masterKey = null;
  }

  /**
   * Resolve secret key for operation (per-call override or master key).
   * @param {string} [secretKey] 
   * @param {boolean} [isDecrypt=false] 
   * @returns {string}
   * @private
   */
  _resolveKey(secretKey, isDecrypt = false) {
    const key = secretKey || this.masterKey;
    if (!key || typeof key !== 'string') {
      throw new Error(isDecrypt ? 'No decryption key provided' : 'No encryption key provided');
    }
    return key;
  }

  /**
   * Encrypt plaintext string into `ivHex:cipherTextHex` AES-256 string.
   * @param {string} plainText 
   * @param {string} [secretKey] Optional key override
   * @returns {string} `ivHex:cipherTextHex`
   */
  encrypt(plainText, secretKey) {
    if (plainText === null || plainText === undefined || typeof plainText !== 'string') {
      throw new TypeError('Plaintext must be a string');
    }

    const keyToUse = this._resolveKey(secretKey, false);
    const key = CryptoJS.SHA256(keyToUse);

    // Random 16-byte (128-bit) Initialization Vector
    const iv = CryptoJS.lib.WordArray.random(16);
    const ivHex = iv.toString(CryptoJS.enc.Hex);

    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const cipherTextHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    return `${ivHex}:${cipherTextHex}`;
  }

  /**
   * Decrypt AES-256 `ivHex:cipherTextHex` string back to plaintext.
   * @param {string} cipherText 
   * @param {string} [secretKey] Optional key override
   * @returns {string|null} Original plain text string or null on failure/invalid input
   */
  decrypt(cipherText, secretKey) {
    const keyToUse = this._resolveKey(secretKey, true);

    if (!cipherText || typeof cipherText !== 'string') {
      return null;
    }

    const parts = cipherText.split(':');
    if (parts.length !== 2) {
      return null;
    }

    const [ivHex, cipherTextHex] = parts;

    // Verify hex format: IV must be 32 hex characters (16 bytes), cipherTextHex must be hex
    if (!ivHex || !cipherTextHex || ivHex.length !== 32) {
      return null;
    }

    const hexRegex = /^[0-9a-fA-F]+$/;
    if (!hexRegex.test(ivHex) || !hexRegex.test(cipherTextHex)) {
      return null;
    }

    try {
      const key = CryptoJS.SHA256(keyToUse);
      const iv = CryptoJS.enc.Hex.parse(ivHex);

      const ciphertextWordArray = CryptoJS.enc.Hex.parse(cipherTextHex);
      const ciphertextBase64 = CryptoJS.enc.Base64.stringify(ciphertextWordArray);

      const decrypted = CryptoJS.AES.decrypt(ciphertextBase64, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      if (!decrypted || decrypted.sigBytes < 0) {
        return null;
      }

      const utf8Result = decrypted.toString(CryptoJS.enc.Utf8);

      // Re-encrypt utf8Result to verify ciphertext integrity (detect tampering)
      const reEncrypted = CryptoJS.AES.encrypt(utf8Result, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      const reEncryptedHex = reEncrypted.ciphertext.toString(CryptoJS.enc.Hex);

      if (reEncryptedHex.toLowerCase() !== cipherTextHex.toLowerCase()) {
        return null; // Payload was corrupted or tampered
      }

      return utf8Result;
    } catch (err) {
      if (err.message && err.message.includes('No decryption key provided')) {
        throw err;
      }
      return null;
    }
  }
}

export const encryptionService = new EncryptionService();

export function setMasterKey(key) {
  return encryptionService.setMasterKey(key);
}

export function getMasterKey() {
  return encryptionService.getMasterKey();
}

export function clearMasterKey() {
  return encryptionService.clearMasterKey();
}

export function encrypt(plainText, secretKey) {
  return encryptionService.encrypt(plainText, secretKey);
}

export function decrypt(cipherText, secretKey) {
  return encryptionService.decrypt(cipherText, secretKey);
}

export default encryptionService;
