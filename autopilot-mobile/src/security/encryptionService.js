import crypto from 'crypto';

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
    const key = crypto.createHash('sha256').update(keyToUse, 'utf8').digest();
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let cipherTextHex = cipher.update(plainText, 'utf8', 'hex');
    cipherTextHex += cipher.final('hex');

    const ivHex = iv.toString('hex');
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
      const key = crypto.createHash('sha256').update(keyToUse, 'utf8').digest();
      const iv = Buffer.from(ivHex, 'hex');

      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
      let decrypted = decipher.update(cipherTextHex, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      // Verify re-encryption integrity to detect ciphertext tampering
      const verifyCipher = crypto.createCipheriv('aes-256-cbc', key, iv);
      let verifyHex = verifyCipher.update(decrypted, 'utf8', 'hex');
      verifyHex += verifyCipher.final('hex');

      if (verifyHex.toLowerCase() !== cipherTextHex.toLowerCase()) {
        return null;
      }

      return decrypted;
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
