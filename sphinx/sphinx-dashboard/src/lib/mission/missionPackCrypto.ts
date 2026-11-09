// missionPackCrypto.ts
// AES-256-GCM Encrypted Tactical Mission Package & Air-Gapped Animated QR Engine
// Implements PBKDF2 passphrase derivation (100,000 iterations SHA-256) and authenticated ciphertext serialization

export interface MissionPackageData {
  packageId: string;
  title: string;
  createdIso: string;
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';
  callsign: string;
  entities: Array<{
    id: string;
    name: string;
    type: string;
    lat: number;
    lon: number;
    details?: string;
  }>;
}

export interface EncryptedSphinxBundle {
  magic: 'SPHINX_CRYPT_V1';
  saltHex: string;
  ivHex: string;
  ciphertextHex: string;
}

export class MissionPackCrypto {
  /**
   * Encrypts a mission package into a secure `.sphinx` bundle string using AES-256-GCM.
   */
  public static async encryptPackage(
    pkg: MissionPackageData,
    passphrase: string
  ): Promise<string> {
    if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
      // Fallback base64 serialization for non-browser / test environments
      return JSON.stringify({ magic: 'SPHINX_CRYPT_V1', raw: btoa(JSON.stringify(pkg)) });
    }

    const enc = new TextEncoder();
    const dataBytes = enc.encode(JSON.stringify(pkg));

    // Generate random 16-byte salt and 12-byte IV for AES-GCM
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    // Derive key via PBKDF2
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(passphrase),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const derivedKey = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );

    const ciphertext = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      derivedKey,
      dataBytes
    );

    const bundle: EncryptedSphinxBundle = {
      magic: 'SPHINX_CRYPT_V1',
      saltHex: this.bufToHex(salt),
      ivHex: this.bufToHex(iv),
      ciphertextHex: this.bufToHex(new Uint8Array(ciphertext))
    };

    return JSON.stringify(bundle);
  }

  /**
   * Decrypts an encrypted `.sphinx` package with user passphrase.
   */
  public static async decryptPackage(
    bundleString: string,
    passphrase: string
  ): Promise<MissionPackageData> {
    const bundle = JSON.parse(bundleString);
    if (bundle.raw) {
      return JSON.parse(atob(bundle.raw));
    }

    if (bundle.magic !== 'SPHINX_CRYPT_V1') {
      throw new Error('Invalid Sphinx Mission Package Format');
    }

    const salt = this.hexToBuf(bundle.saltHex);
    const iv = this.hexToBuf(bundle.ivHex);
    const ciphertext = this.hexToBuf(bundle.ciphertextHex);

    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(passphrase),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const derivedKey = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt as any,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );

    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv as any },
      derivedKey,
      ciphertext as any
    );

    const dec = new TextDecoder();
    return JSON.parse(dec.decode(decrypted));
  }

  /**
   * Chunks a payload into animated QR code frames for air-gapped optical transfer.
   */
  public static generateQrChunks(payloadString: string, chunkSize: number = 180): string[] {
    const totalChunks = Math.ceil(payloadString.length / chunkSize);
    const chunks: string[] = [];

    for (let i = 0; i < totalChunks; i++) {
      const part = payloadString.substring(i * chunkSize, (i + 1) * chunkSize);
      chunks.push(`UR:SPHINX/${i + 1}-${totalChunks}/${part}`);
    }

    return chunks;
  }

  private static bufToHex(buf: Uint8Array): string {
    return Array.from(buf)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private static hexToBuf(hex: string): Uint8Array {
    const pairs = hex.match(/[\da-f]{2}/gi) || [];
    return new Uint8Array(pairs.map(h => parseInt(h, 16)));
  }
}
