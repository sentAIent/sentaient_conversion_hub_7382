import assert from 'assert';
import {
  EncryptionService,
  encryptionService,
  encrypt,
  decrypt,
  setMasterKey,
  clearMasterKey
} from './src/security/encryptionService.js';
import {
  ROLES,
  PERMISSIONS,
  decodeToken,
  hasPermission,
  authorizeRoute
} from './src/security/rbac.js';
import { signToken, interceptRequest } from './src/security/authInterceptor.js';
import { checkRateLimit, consumeToken, resetLimit, getBucketState } from './src/security/rateLimiter.js';

console.log('====================================================');
console.log('🔒 SENTAIENT SECURITY & CRYPTOGRAPHY TEST SUITE');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✓ ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${desc}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

// ── 1. AES-256 Encryption Tests ──────────────────────────────────────────
console.log('[SUITE 1: AES-256 Encryption & Decryption Primitives]');
clearMasterKey();
const KEY = 'sentaient-master-test-key-256-bit-xyz';
const SECRET_DATA = 'Confidential: 14 Brand Revenue Projections $2,450,000.00';

it('encrypts plaintext into ivHex:cipherTextHex format', () => {
  const enc = encrypt(SECRET_DATA, KEY);
  assert.strictEqual(typeof enc, 'string');
  const parts = enc.split(':');
  assert.strictEqual(parts.length, 2);
  assert.strictEqual(parts[0].length, 32); // 16 bytes = 32 hex chars
  assert.ok(/^[0-9a-fA-F]+$/.test(parts[0]));
  assert.ok(/^[0-9a-fA-F]+$/.test(parts[1]));
});

it('decrypts valid ciphertext back to original plaintext', () => {
  const enc = encrypt(SECRET_DATA, KEY);
  const dec = decrypt(enc, KEY);
  assert.strictEqual(dec, SECRET_DATA);
});

it('generates unique IVs and ciphertexts for identical inputs (IND-CPA)', () => {
  const enc1 = encrypt(SECRET_DATA, KEY);
  const enc2 = encrypt(SECRET_DATA, KEY);
  assert.notStrictEqual(enc1, enc2);
  assert.strictEqual(decrypt(enc1, KEY), SECRET_DATA);
  assert.strictEqual(decrypt(enc2, KEY), SECRET_DATA);
});

it('handles multi-byte unicode, emojis, and international chars', () => {
  const unicode = '🔐 AI 脳波マインドウェーブ ⚡ Contango Quant: $14.50 — 🚀';
  const enc = encrypt(unicode, KEY);
  assert.strictEqual(decrypt(enc, KEY), unicode);
});

it('handles empty string plaintext', () => {
  const enc = encrypt('', KEY);
  assert.strictEqual(decrypt(enc, KEY), '');
});

it('rejects wrong key by returning null', () => {
  const enc = encrypt(SECRET_DATA, KEY);
  assert.strictEqual(decrypt(enc, 'wrong-decryption-key-123'), null);
});

it('rejects tampered ciphertext payload', () => {
  const enc = encrypt(SECRET_DATA, KEY);
  const [iv, ct] = enc.split(':');
  const tampered = iv + ':' + ct.slice(0, -2) + '00';
  assert.strictEqual(decrypt(tampered, KEY), null);
});

it('rejects non-string inputs with TypeError', () => {
  assert.throws(() => encrypt(12345, KEY), TypeError);
  assert.throws(() => encrypt(null, KEY), TypeError);
  assert.throws(() => encrypt({}, KEY), TypeError);
});

it('supports master key fallback and per-call override', () => {
  setMasterKey('global-env-key-999');
  const enc = encrypt(SECRET_DATA);
  assert.strictEqual(decrypt(enc), SECRET_DATA);

  // Per-call override
  const customEnc = encrypt(SECRET_DATA, 'custom-call-key');
  assert.strictEqual(decrypt(customEnc, 'custom-call-key'), SECRET_DATA);
  assert.strictEqual(decrypt(customEnc), null); // master key fails
  clearMasterKey();
});

// ── 2. JWT Role-Based Access Control (RBAC) Tests ─────────────────────────
console.log('\n[SUITE 2: JWT Role-Based Access Control (RBAC)]');
const JWT_SECRET = 'jwt_super_secret_signing_key_456';

it('generates and decodes signed JWT token with valid claims', () => {
  const payload = { sub: 'usr_789', role: ROLES.PREMIUM_USER, email: 'quant@sentaient.com' };
  const token = signToken(payload, JWT_SECRET, 3600);
  assert.strictEqual(typeof token, 'string');
  const decoded = decodeToken(token, JWT_SECRET);
  assert.strictEqual(decoded.sub, 'usr_789');
  assert.strictEqual(decoded.role, ROLES.PREMIUM_USER);
});

it('correctly maps role permissions hierarchically', () => {
  // Guest
  assert.strictEqual(hasPermission(ROLES.GUEST, PERMISSIONS.READ_PUBLIC), true);
  assert.strictEqual(hasPermission(ROLES.GUEST, PERMISSIONS.WRITE_PREMIUM), false);

  // Premium User
  assert.strictEqual(hasPermission(ROLES.PREMIUM_USER, PERMISSIONS.READ_PUBLIC), true);
  assert.strictEqual(hasPermission(ROLES.PREMIUM_USER, PERMISSIONS.READ_PREMIUM), true);
  assert.strictEqual(hasPermission(ROLES.PREMIUM_USER, PERMISSIONS.WRITE_PREMIUM), true);
  assert.strictEqual(hasPermission(ROLES.PREMIUM_USER, PERMISSIONS.ADMIN_ALL), false);

  // Admin
  assert.strictEqual(hasPermission(ROLES.ADMIN, PERMISSIONS.READ_PUBLIC), true);
  assert.strictEqual(hasPermission(ROLES.ADMIN, PERMISSIONS.MODERATE_CONTENT), true);
  assert.strictEqual(hasPermission(ROLES.ADMIN, PERMISSIONS.ADMIN_ALL), true);
});

it('authorizes routes based on role and token claims', () => {
  const basicToken = signToken({ sub: 'u1', role: ROLES.BASIC_USER }, JWT_SECRET, 3600);
  const premiumToken = signToken({ sub: 'u2', role: ROLES.PREMIUM_USER }, JWT_SECRET, 3600);
  const adminToken = signToken({ sub: 'u3', role: ROLES.ADMIN }, JWT_SECRET, 3600);

  // Missing token fails route requiring permission
  const noToken = authorizeRoute(null, PERMISSIONS.READ_PREMIUM, JWT_SECRET);
  assert.strictEqual(noToken.authorized, false);

  // Basic user accessing premium permission fails
  const basicAccess = authorizeRoute(basicToken, PERMISSIONS.READ_PREMIUM, JWT_SECRET);
  assert.strictEqual(basicAccess.authorized, false);

  // Premium user accessing premium permission succeeds
  const premiumAccess = authorizeRoute(premiumToken, PERMISSIONS.READ_PREMIUM, JWT_SECRET);
  assert.strictEqual(premiumAccess.authorized, true);

  // Admin accessing admin permission succeeds
  const adminAccess = authorizeRoute(adminToken, PERMISSIONS.ADMIN_ALL, JWT_SECRET);
  assert.strictEqual(adminAccess.authorized, true);
});

// ── 3. Token Bucket Rate Limiter Tests ────────────────────────────────────
console.log('\n[SUITE 3: Token Bucket Rate Limiter]');
resetLimit();

it('allows requests within capacity and tracks remaining tokens', () => {
  const key = 'ip_192_168_1_50';
  const r1 = consumeToken(key, 1, { capacity: 5, refillRate: 1, windowMs: 1000 });
  assert.strictEqual(r1.allowed, true);
  assert.strictEqual(r1.remainingTokens, 4);

  const r2 = consumeToken(key, 2, { capacity: 5, refillRate: 1, windowMs: 1000 });
  assert.strictEqual(r2.allowed, true);
  assert.strictEqual(r2.remainingTokens, 2);
});

it('blocks requests that exceed capacity (HTTP 429)', () => {
  const key = 'attacker_ip_burst';
  consumeToken(key, 5, { capacity: 5, refillRate: 1, windowMs: 5000 });
  const blocked = consumeToken(key, 1, { capacity: 5, refillRate: 1, windowMs: 5000 });
  assert.strictEqual(blocked.allowed, false);
  assert.strictEqual(blocked.remainingTokens, 0);
  assert.ok(blocked.resetInMs > 0);
});

console.log('\n====================================================');
console.log(`TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
console.log('====================================================');

if (failed > 0) process.exit(1);
