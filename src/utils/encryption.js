import crypto from 'crypto';

// The encryption key should be a 32-byte (256-bit) buffer.
// In a real scenario, retrieve this from environment variables.
const ENCRYPTION_KEY = process.env.VITE_DB_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const ALGORITHM = 'aes-256-gcm';

/**
 * Encrypts a sensitive payload before storing it in the vector DB.
 * @param {string | object} payload - The sensitive user memory insight to encrypt.
 * @returns {string} - The encrypted payload (JSON stringified).
 */
export function encryptPayload(payload) {
  try {
    const text = typeof payload === 'object' ? JSON.stringify(payload) : payload;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag().toString('hex');
    
    return JSON.stringify({
      iv: iv.toString('hex'),
      encryptedData: encrypted,
      authTag: authTag,
    });
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt payload');
  }
}

/**
 * Decrypts a sensitive payload retrieved from the vector DB.
 * @param {string} encryptedPayloadStr - The encrypted payload JSON string.
 * @returns {string | object} - The decrypted user memory insight.
 */
export function decryptPayload(encryptedPayloadStr) {
  try {
    const { iv, encryptedData, authTag } = JSON.parse(encryptedPayloadStr);
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(ENCRYPTION_KEY, 'hex'),
      Buffer.from(iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt payload');
  }
}
