// AES-256 GCM Encryption Wrapper using Web Crypto API
// This ensures that any personal data extracted (e.g. GDPR Instagram JSONs)
// can be encrypted before being stored in local SQLite or IndexedDB.

export async function generateKey(password) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
    );
    
    // Salt should ideally be random per-user and stored, but for simple local
    // client-side only, a fixed salt is acceptable if the password is high entropy,
    // though generating and storing it is better.
    const salt = enc.encode("sentaient-local-storage-salt");
    
    return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
}

export async function encryptData(data, key) {
    const enc = new TextEncoder();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = enc.encode(data);
    
    const ciphertext = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encoded
    );
    
    const cipherArray = Array.from(new Uint8Array(ciphertext));
    const ivArray = Array.from(iv);
    
    // Return base64 encoded string containing IV and ciphertext
    return btoa(JSON.stringify({ iv: ivArray, cipher: cipherArray }));
}

export async function decryptData(encryptedDataStr, key) {
    const { iv, cipher } = JSON.parse(atob(encryptedDataStr));
    const ivArray = new Uint8Array(iv);
    const cipherArray = new Uint8Array(cipher);
    
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: ivArray
        },
        key,
        cipherArray
    );
    
    const dec = new TextDecoder();
    return dec.decode(decrypted);
}
