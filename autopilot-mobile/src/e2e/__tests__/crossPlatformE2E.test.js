import fs from 'fs';
import path from 'path';
import { Platform } from 'react-native';
import { encrypt, decrypt } from '../../security/encryptionService';
import { ROLES, PERMISSIONS, hasPermission, decodeToken, authorizeRoute } from '../../security/rbac';
import { checkRateLimit, consumeToken, resetLimit } from '../../security/rateLimiter';
import { secureStorage } from '../../security/secureStorageService';
import { signToken, interceptRequest } from '../../security/authInterceptor';

describe('SentAIent Cross-Platform Requirement-Driven E2E Test Suite', () => {

  const SECRET_KEY = 'SuperSecretEncryptionKey256BitLength!';
  const JWT_SECRET = 'SuperSecretJWTKeyForSigningTokens123!';

  // Reset storage and rate limits before each test
  beforeEach(async () => {
    await secureStorage.clear();
    resetLimit();
  });

  // =========================================================================
  // TIER 1: FEATURE COVERAGE (>=5 tests per feature)
  // =========================================================================
  describe('Tier 1 - Feature Coverage', () => {

    // -----------------------------------------------------------------------
    // Feature 1: AES-256 Encryption & Storage
    // -----------------------------------------------------------------------
    describe('Feature 1: AES-256 Encryption & Storage', () => {
      test('T1.1.1 - Encryption Happy Path: Encrypts plain text string into valid ivHex:cipherTextHex payload', () => {
        const plaintext = 'SensitiveUserDataPayload123';
        const cipherTextStr = encrypt(plaintext, SECRET_KEY);
        
        expect(typeof cipherTextStr).toBe('string');
        const parts = cipherTextStr.split(':');
        expect(parts).toHaveLength(2);
        const [ivHex, cipherTextHex] = parts;
        expect(ivHex).toHaveLength(32); // 16-byte random IV in hex
        expect(cipherTextHex.length).toBeGreaterThan(0);
      });

      test('T1.1.2 - Decryption Happy Path: Decrypts valid ivHex:cipherTextHex payload back to original plaintext string', () => {
        const plaintext = 'UserSecretToken_987654321';
        const cipherTextStr = encrypt(plaintext, SECRET_KEY);
        const decrypted = decrypt(cipherTextStr, SECRET_KEY);
        
        expect(decrypted).toBe(plaintext);
      });

      test('T1.1.3 - AES-256 Key Handling & Derivation: Different secret keys produce different ciphertexts and fail decryption', () => {
        const plaintext = 'SamePlaintextForBothKeys';
        const key1 = 'SecretKeyAlpha_123';
        const key2 = 'SecretKeyBeta_456';
        
        const env1 = encrypt(plaintext, key1);
        const env2 = encrypt(plaintext, key2);

        expect(env1).not.toBe(env2);
        expect(decrypt(env1, key2)).toBeNull();
      });

      test('T1.1.4 - Ciphertext Format & Randomization Integrity: Unique IV is generated for every encryption pass', () => {
        const plaintext = 'IdenticalDataPayload';
        const res1 = encrypt(plaintext, SECRET_KEY);
        const res2 = encrypt(plaintext, SECRET_KEY);

        const [iv1, cipher1] = res1.split(':');
        const [iv2, cipher2] = res2.split(':');

        expect(iv1).not.toBe(iv2);
        expect(cipher1).not.toBe(cipher2);
      });

      test('T1.1.5 - Roundtrip Consistency: Complex structured data serialized as string decrypts identically', () => {
        const complexData = JSON.stringify({ userId: 'usr_1001', roles: ['Admin'], preferences: { theme: 'dark', 2FA: true } });
        const cipherTextStr = encrypt(complexData, SECRET_KEY);
        const decryptedStr = decrypt(cipherTextStr, SECRET_KEY);
        
        expect(JSON.parse(decryptedStr)).toEqual(JSON.parse(complexData));
      });
    });

    // -----------------------------------------------------------------------
    // Feature 2: JWT Token Decode & RBAC Role Checks
    // -----------------------------------------------------------------------
    describe('Feature 2: JWT Token Decode & RBAC Role Checks', () => {
      test('T1.2.1 - JWT Decode Valid Token: Decodes valid token payload containing user identity and role', () => {
        const token = signToken({ sub: 'user_123', role: ROLES.ADMIN, email: 'admin@sentaient.com' }, JWT_SECRET);
        const decoded = decodeToken(token, JWT_SECRET);

        expect(decoded.sub).toBe('user_123');
        expect(decoded.role).toBe(ROLES.ADMIN);
        expect(decoded.email).toBe('admin@sentaient.com');
        expect(decoded.exp).toBeGreaterThan(Date.now() / 1000);
      });

      test('T1.2.2 - RBAC Admin Role Checks: Admin role possesses all system permissions', () => {
        const adminRole = ROLES.ADMIN;
        expect(Object.values(ROLES).includes(adminRole)).toBe(true);
        expect(hasPermission(adminRole, PERMISSIONS.READ_PUBLIC)).toBe(true);
        expect(hasPermission(adminRole, PERMISSIONS.READ_USER)).toBe(true);
        expect(hasPermission(adminRole, PERMISSIONS.MODERATE_CONTENT)).toBe(true);
        expect(hasPermission(adminRole, PERMISSIONS.ADMIN_ALL)).toBe(true);
      });

      test('T1.2.3 - RBAC Moderator Role Checks: Moderator possesses content permissions, but not admin all permissions', () => {
        const modRole = ROLES.MODERATOR;
        expect(Object.values(ROLES).includes(modRole)).toBe(true);
        expect(hasPermission(modRole, PERMISSIONS.READ_PUBLIC)).toBe(true);
        expect(hasPermission(modRole, PERMISSIONS.MODERATE_CONTENT)).toBe(true);
        expect(hasPermission(modRole, PERMISSIONS.ADMIN_ALL)).toBe(false);
      });

      test('T1.2.4 - RBAC PremiumUser Role Checks: PremiumUser possesses premium read/write permissions', () => {
        const premiumRole = ROLES.PREMIUM_USER;
        expect(Object.values(ROLES).includes(premiumRole)).toBe(true);
        expect(hasPermission(premiumRole, PERMISSIONS.READ_PREMIUM)).toBe(true);
        expect(hasPermission(premiumRole, PERMISSIONS.WRITE_PREMIUM)).toBe(true);
        expect(hasPermission(premiumRole, PERMISSIONS.MODERATE_CONTENT)).toBe(false);
      });

      test('T1.2.5 - RBAC BasicUser & Guest Role Checks: BasicUser and Guest have strictly scoped tier access', () => {
        expect(hasPermission(ROLES.BASIC_USER, PERMISSIONS.READ_USER)).toBe(true);
        expect(hasPermission(ROLES.BASIC_USER, PERMISSIONS.READ_PREMIUM)).toBe(false);
        expect(hasPermission(ROLES.GUEST, PERMISSIONS.READ_PUBLIC)).toBe(true);
        expect(hasPermission(ROLES.GUEST, PERMISSIONS.READ_USER)).toBe(false);
      });
    });

    // -----------------------------------------------------------------------
    // Feature 3: Application Rate Limiter Bucket Tokens
    // -----------------------------------------------------------------------
    describe('Feature 3: Application Rate Limiter Bucket Tokens', () => {
      test('T1.3.1 - Bucket Initialization: Rate limiter initializes with full token capacity', () => {
        resetLimit('client_1');
        const state = checkRateLimit('client_1', { capacity: 5, refillRate: 1 });
        expect(state.remainingTokens).toBe(5);
      });

      test('T1.3.2 - Token Consumption: Consuming 1 token reduces bucket count by 1', () => {
        resetLimit('client_1');
        const result = consumeToken('client_1', 1, { capacity: 10, refillRate: 1 });
        expect(result.allowed).toBe(true);
        expect(result.remainingTokens).toBe(9);
      });

      test('T1.3.3 - Token Exhaustion: Requests are denied when token bucket is exhausted', () => {
        resetLimit('client_1');
        const opts = { capacity: 3, refillRate: 1 };
        expect(consumeToken('client_1', 1, opts).allowed).toBe(true);
        expect(consumeToken('client_1', 1, opts).allowed).toBe(true);
        expect(consumeToken('client_1', 1, opts).allowed).toBe(true);
        // 4th request must be throttled
        const res4 = consumeToken('client_1', 1, opts);
        expect(res4.allowed).toBe(false);
        expect(res4.remainingTokens).toBe(0);
      });

      test('T1.3.4 - Bucket Refill over Time: Tokens refill after window duration passes', () => {
        jest.useFakeTimers();
        resetLimit('client_1');
        const opts = { capacity: 2, refillRate: 2, windowMs: 100 };
        consumeToken('client_1', 2, opts);
        expect(checkRateLimit('client_1', opts).remainingTokens).toBe(0);

        // Advance fake timers by 150ms for refill
        jest.advanceTimersByTime(150);
        expect(checkRateLimit('client_1', opts).remainingTokens).toBeGreaterThanOrEqual(1);
        expect(consumeToken('client_1', 1, opts).allowed).toBe(true);
        jest.useRealTimers();
      });

      test('T1.3.5 - Key Isolation: Separate keys maintain isolated bucket tokens', () => {
        resetLimit();
        const opts = { capacity: 2, refillRate: 1 };
        consumeToken('user_A', 2, opts);
        
        expect(consumeToken('user_A', 1, opts).allowed).toBe(false);
        const resB = consumeToken('user_B', 1, opts);
        expect(resB.allowed).toBe(true);
        expect(resB.remainingTokens).toBe(1);
      });
    });

    // -----------------------------------------------------------------------
    // Feature 4: Cross-Platform Expo Architecture Contracts
    // -----------------------------------------------------------------------
    describe('Feature 4: Cross-Platform Expo Architecture Contracts', () => {
      test('T1.4.1 - App Manifest Contract: app.json exists and defines required Expo 51 configuration properties', () => {
        const appJsonPath = path.join(process.cwd(), 'app.json');
        expect(fs.existsSync(appJsonPath)).toBe(true);
        const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

        expect(appJson.expo).toBeDefined();
        expect(appJson.expo.name).toBe('sentaient-conversion-hub');
        expect(appJson.expo.slug).toBe('sentaient-platform');
        expect(appJson.expo.platforms).toEqual(expect.arrayContaining(['ios', 'android', 'web']));
      });

      test('T1.4.2 - Metro Bundler Contract: metro.config.js extends default Expo Metro config', () => {
        const metroPath = path.join(process.cwd(), 'metro.config.js');
        expect(fs.existsSync(metroPath)).toBe(true);
        const metroContent = fs.readFileSync(metroPath, 'utf8');
        expect(metroContent).toContain("require('expo/metro-config')");
      });

      test('T1.4.3 - Platform OS Target Contract: Platform.OS is supported cross-platform abstraction', () => {
        expect(['ios', 'android', 'web']).toContain(Platform.OS);
      });

      test('T1.4.4 - Package.json Expo SDK Contract: package.json specifies Expo ~51.0.0 and react-native dependencies', () => {
        const pkgPath = path.join(process.cwd(), 'package.json');
        const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

        expect(pkgJson.dependencies['expo']).toMatch(/~51\./);
        expect(pkgJson.dependencies['react-native']).toBeDefined();
        expect(pkgJson.dependencies['react-native-web']).toBeDefined();
      });

      test('T1.4.5 - Babel Config Preset Contract: babel.config.js configures babel-preset-expo', () => {
        const babelPath = path.join(process.cwd(), 'babel.config.js');
        expect(fs.existsSync(babelPath)).toBe(true);
        const babelContent = fs.readFileSync(babelPath, 'utf8');
        expect(babelContent).toContain('babel-preset-expo');
      });
    });
  });

  // =========================================================================
  // TIER 2: BOUNDARY & CORNER CASES (>=5 tests per feature)
  // =========================================================================
  describe('Tier 2 - Boundary & Corner Cases', () => {

    // -----------------------------------------------------------------------
    // Feature 1: AES-256 Boundaries & Corner Cases
    // -----------------------------------------------------------------------
    describe('Feature 1 Boundaries: AES-256 Encryption & Storage', () => {
      test('T2.1.1 - Empty String Handling: Encrypts and decrypts empty string successfully', () => {
        const emptyText = '';
        const cipherTextStr = encrypt(emptyText, SECRET_KEY);
        const decrypted = decrypt(cipherTextStr, SECRET_KEY);
        expect(decrypted).toBe('');
      });

      test('T2.1.2 - Corrupted Ciphertext: Returns null on tampered/corrupted ciphertext payload', () => {
        const corruptedPayload = 'invalid_iv:invalid_cipher';
        expect(decrypt(corruptedPayload, SECRET_KEY)).toBeNull();
      });

      test('T2.1.3 - Invalid Secret Key: Returns null when attempting decryption with wrong passphrase', () => {
        const plaintext = 'ConfidentialData';
        const cipherTextStr = encrypt(plaintext, SECRET_KEY);
        const wrongKey = 'TotallyWrongKey123!';
        expect(decrypt(cipherTextStr, wrongKey)).toBeNull();
      });

      test('T2.1.4 - Missing/Null Inputs: Throws TypeError/Error on null or non-string encryption target', () => {
        expect(() => encrypt(null, SECRET_KEY)).toThrow(TypeError);
        expect(() => encrypt('valid', null)).toThrow('No encryption key provided');
        expect(decrypt(null, SECRET_KEY)).toBeNull();
      });

      test('T2.1.5 - Large Payload Strings: Handles multi-kilobyte payload strings without truncation', () => {
        const largeText = 'A'.repeat(50000); // 50KB payload
        const cipherTextStr = encrypt(largeText, SECRET_KEY);
        const decrypted = decrypt(cipherTextStr, SECRET_KEY);
        expect(decrypted.length).toBe(50000);
        expect(decrypted).toBe(largeText);
      });
    });

    // -----------------------------------------------------------------------
    // Feature 2: JWT & RBAC Boundaries & Corner Cases
    // -----------------------------------------------------------------------
    describe('Feature 2 Boundaries: JWT Token & RBAC Logic', () => {
      test('T2.2.1 - Expired JWT Token: Rejects JWT token when current time exceeds expiration exp claim', () => {
        const token = signToken({ sub: 'user_1', role: ROLES.ADMIN }, JWT_SECRET, -10); // Expired 10s ago
        const decoded = decodeToken(token, JWT_SECRET);

        expect(decoded).toBeNull();
      });

      test('T2.2.2 - Malformed JWT String: Returns null on non-JWT or truncated token strings', () => {
        expect(decodeToken('not.a.valid.jwt.token', JWT_SECRET)).toBeNull();
        expect(decodeToken('just-a-plain-string', JWT_SECRET)).toBeNull();
        expect(decodeToken('bad.token', JWT_SECRET)).toBeNull();
      });

      test('T2.2.3 - Tampered Signature: Rejects token with modified payload or signature mismatch', () => {
        const validToken = signToken({ sub: 'user_1', role: ROLES.BASIC_USER }, JWT_SECRET);
        const parts = validToken.split('.');
        // Modify payload part to claim Admin role
        const fakePayload = signToken({ sub: 'user_1', role: ROLES.ADMIN }, 'other').split('.')[1];
        const tamperedToken = `${parts[0]}.${fakePayload}.${parts[2]}`;

        const decoded = decodeToken(tamperedToken, JWT_SECRET);
        expect(decoded).toBeNull();
      });

      test('T2.2.4 - Unknown Role Handling: Returns false for permission checks on invalid/unrecognized role strings', () => {
        const unknownRole = 'SuperGodModeUser';
        expect(Object.values(ROLES).includes(unknownRole)).toBe(false);
        expect(hasPermission(unknownRole, PERMISSIONS.READ_PUBLIC)).toBe(false);
      });

      test('T2.2.5 - Route Authorization Boundary: Denies access with explicit reason when role lacks permissions', () => {
        const token = signToken({ sub: 'guest_1', role: ROLES.GUEST }, JWT_SECRET);
        const result = authorizeRoute(token, PERMISSIONS.ADMIN_ALL, JWT_SECRET);

        expect(result.authorized).toBe(false);
        expect(result.reason).toContain("Role 'Guest' lacks required permission");
      });
    });

    // -----------------------------------------------------------------------
    // Feature 3: Rate Limiter Boundaries & Corner Cases
    // -----------------------------------------------------------------------
    describe('Feature 3 Boundaries: Application Rate Limiter', () => {
      test('T2.3.1 - Zero/Negative Capacity: Denies all request consumption when capacity is <= 0', () => {
        resetLimit('ip_1');
        const resZero = consumeToken('ip_1', 1, { capacity: 0, refillRate: 5 });
        expect(resZero.allowed).toBe(false);
        expect(resZero.remainingTokens).toBe(0);

        resetLimit('ip_2');
        const resNeg = consumeToken('ip_2', 1, { capacity: -5, refillRate: 5 });
        expect(resNeg.allowed).toBe(false);
      });

      test('T2.3.2 - Boundary Consumption Count: Consuming 0 tokens returns allowed with unchanged capacity', () => {
        resetLimit('ip_1');
        const res = consumeToken('ip_1', 0, { capacity: 10, refillRate: 2 });
        expect(res.allowed).toBe(true);
        expect(res.remainingTokens).toBe(10);
      });

      test('T2.3.3 - Excessive Burst Consumption: Rejects token request exceeding full bucket capacity', () => {
        resetLimit('ip_1');
        const opts = { capacity: 5, refillRate: 1 };
        const res = consumeToken('ip_1', 10, opts);
        expect(res.allowed).toBe(false);
        expect(checkRateLimit('ip_1', opts).remainingTokens).toBe(5); // Bucket remains unconsumed
      });

      test('T2.3.4 - Reset Key Bucket: Resetting bucket restores key to initial full capacity', () => {
        resetLimit('user_100');
        const opts = { capacity: 5, refillRate: 1 };
        consumeToken('user_100', 5, opts);
        expect(checkRateLimit('user_100', opts).remainingTokens).toBe(0);

        resetLimit('user_100');
        expect(checkRateLimit('user_100', opts).remainingTokens).toBe(5);
      });

      test('T2.3.5 - Boundary Consumption at Capacity Limit: Consuming exact capacity succeeds, subsequent request fails', () => {
        resetLimit('exact_user');
        const opts = { capacity: 5, refillRate: 1 };
        const res1 = consumeToken('exact_user', 5, opts);
        expect(res1.allowed).toBe(true);
        expect(res1.remainingTokens).toBe(0);

        const res2 = consumeToken('exact_user', 1, opts);
        expect(res2.allowed).toBe(false);
      });
    });

    // -----------------------------------------------------------------------
    // Feature 4: Cross-Platform Architecture Boundaries
    // -----------------------------------------------------------------------
    describe('Feature 4 Boundaries: Cross-Platform Architecture', () => {
      test('T2.4.1 - SecureStorage Invalid Key Input: Handles empty or invalid key gracefully without throwing unhandled exceptions', async () => {
        const res = await secureStorage.getItem('');
        expect(res).toBeNull();

        await expect(secureStorage.setItem('', 'val')).rejects.toThrow('Storage key must be a non-empty string');
      });

      test('T2.4.2 - SecureStorage Null Value Rejection: Rejects storing null or undefined values', async () => {
        await expect(secureStorage.setItem('valid_key', null)).rejects.toThrow('Storage value cannot be null or undefined');
      });

      test('T2.4.3 - Missing Manifest Fields: Validates app.json structure contains required slug and icon', () => {
        const appJsonPath = path.join(process.cwd(), 'app.json');
        const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

        expect(appJson.expo.slug).toBeTruthy();
        expect(appJson.expo.icon).toBeTruthy();
      });

      test('T2.4.4 - Bundle Identifier Validation: Validates reverse-DNS bundle identifier formatting in app.json', () => {
        const appJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'app.json'), 'utf8'));
        expect(appJson.expo.ios.bundleIdentifier).toMatch(/^[a-zA-Z0-9.-]+$/);
        expect(appJson.expo.android.package).toMatch(/^[a-zA-Z0-9._]+$/);
      });

      test('T2.4.5 - Package Version Syntax: Validates semver format of version in package.json', () => {
        const pkgJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
        expect(pkgJson.version).toMatch(/^\d+\.\d+\.\d+/);
      });
    });
  });

  // =========================================================================
  // TIER 3: CROSS-FEATURE COMBINATIONS
  // =========================================================================
  describe('Tier 3 - Cross-Feature Combinations', () => {
    test('T3.1 - Encrypted Storage + JWT Decoding: Encrypt JWT token with AES-256, store securely, retrieve, decrypt, and decode claims', async () => {
      const userPayload = { sub: 'usr_777', role: ROLES.PREMIUM_USER, email: 'pilot@sentaient.com' };
      const rawJwt = signToken(userPayload, JWT_SECRET);

      // Encrypt JWT token
      const encryptedJwt = encrypt(rawJwt, SECRET_KEY);
      
      // Store in secure storage
      await secureStorage.setItem('auth_session_token', encryptedJwt);

      // Retrieve from secure storage
      const retrievedEncrypted = await secureStorage.getItem('auth_session_token');
      expect(retrievedEncrypted).toBeDefined();

      // Decrypt AES-256 payload
      const decryptedJwt = decrypt(retrievedEncrypted, SECRET_KEY);
      expect(decryptedJwt).toBe(rawJwt);

      // Decode and verify JWT
      const decodedPayload = decodeToken(decryptedJwt, JWT_SECRET);
      expect(decodedPayload.sub).toBe('usr_777');
      expect(decodedPayload.role).toBe(ROLES.PREMIUM_USER);
    });

    test('T3.2 - RBAC Authorization with Stored Encrypted Token: Retrieve token, verify signature & claims, execute RBAC route check', async () => {
      const token = signToken({ sub: 'admin_888', role: ROLES.ADMIN }, JWT_SECRET);
      const encryptedToken = encrypt(token, SECRET_KEY);
      await secureStorage.setItem('user_session', encryptedToken);

      // Read from storage and perform RBAC authorization check on protected endpoint
      const storedEncrypted = await secureStorage.getItem('user_session');
      const decryptedToken = decrypt(storedEncrypted, SECRET_KEY);
      
      const auth1 = authorizeRoute(decryptedToken, PERMISSIONS.ADMIN_ALL, JWT_SECRET);
      expect(auth1.authorized).toBe(true);
      expect(auth1.user.sub).toBe('admin_888');

      const auth2 = authorizeRoute(decryptedToken, PERMISSIONS.MODERATE_CONTENT, JWT_SECRET);
      expect(auth2.authorized).toBe(true);
    });

    test('T3.3 - Rate Limiter Combined with RBAC Route Protection: Enforces rate limit throttling on protected RBAC routes even for valid roles', () => {
      resetLimit('user_admin');
      const token = signToken({ sub: 'user_admin', role: ROLES.ADMIN }, JWT_SECRET);
      const req = { headers: { authorization: `Bearer ${token}` } };
      const opts = { secretKey: JWT_SECRET, rateLimitOptions: { capacity: 2, refillRate: 1 }, rateLimitKey: 'user_admin' };

      expect(interceptRequest(req, PERMISSIONS.READ_PREMIUM, opts).status).toBe(200);
      expect(interceptRequest(req, PERMISSIONS.READ_PREMIUM, opts).status).toBe(200);
      // 3rd request should be throttled despite Admin credentials
      expect(interceptRequest(req, PERMISSIONS.READ_PREMIUM, opts).status).toBe(429);
    });

    test('T3.4 - Multi-Role Session Authorization via Encrypted Storage: Context switching between multiple role sessions', async () => {
      // Session 1: BasicUser
      const basicToken = signToken({ sub: 'user_basic', role: ROLES.BASIC_USER }, JWT_SECRET);
      await secureStorage.setItem('session_basic', encrypt(basicToken, SECRET_KEY));

      // Session 2: Moderator
      const modToken = signToken({ sub: 'user_mod', role: ROLES.MODERATOR }, JWT_SECRET);
      await secureStorage.setItem('session_mod', encrypt(modToken, SECRET_KEY));

      // Retrieve basic session
      const rawBasicEnv = await secureStorage.getItem('session_basic');
      const basicPayload = decodeToken(decrypt(rawBasicEnv, SECRET_KEY), JWT_SECRET);
      expect(hasPermission(basicPayload.role, PERMISSIONS.MODERATE_CONTENT)).toBe(false);

      // Retrieve mod session
      const rawModEnv = await secureStorage.getItem('session_mod');
      const modPayload = decodeToken(decrypt(rawModEnv, SECRET_KEY), JWT_SECRET);
      expect(hasPermission(modPayload.role, PERMISSIONS.MODERATE_CONTENT)).toBe(true);
    });

    test('T3.5 - Expired Token Handling in Encrypted Storage + Purge: Rejects expired token retrieved from storage and purges key', async () => {
      const expiredToken = signToken({ sub: 'user_exp', role: ROLES.ADMIN }, JWT_SECRET, -50);
      const encryptedStr = encrypt(expiredToken, SECRET_KEY);
      await secureStorage.setItem('session_exp', encryptedStr);

      // Pipeline execution
      const stored = await secureStorage.getItem('session_exp');
      const decrypted = decrypt(stored, SECRET_KEY);
      const decoded = decodeToken(decrypted, JWT_SECRET);

      expect(decoded).toBeNull(); // Expired token returns null

      // Purge storage upon invalid session
      await secureStorage.removeItem('session_exp');
      expect(await secureStorage.getItem('session_exp')).toBeNull();
    });
  });

  // =========================================================================
  // TIER 4: REAL-WORLD APPLICATION SCENARIOS
  // =========================================================================
  describe('Tier 4 - Real-World Application Scenarios', () => {
    test('T4.1 - Complete E2E User Session Flow: Login -> Token Issue -> AES-256 Store -> Authorize Route -> Rate Limit Throttling', async () => {
      const userCredentials = { username: 'lead_developer', role: ROLES.ADMIN };
      
      // Step 1: Login & Issue JWT session token
      const sessionJwt = signToken(
        { sub: userCredentials.username, role: userCredentials.role },
        JWT_SECRET,
        3600
      );
      expect(sessionJwt).toBeDefined();

      // Step 2: Encrypt token with AES-256 & store in Secure Storage
      const encryptedEnvelope = encrypt(sessionJwt, SECRET_KEY);
      await secureStorage.setItem('user_session_token', encryptedEnvelope);

      // Step 3: Application load - retrieve session from secure storage
      const loadedEnvelope = await secureStorage.getItem('user_session_token');
      expect(loadedEnvelope).not.toBeNull();
      const decryptedJwt = decrypt(loadedEnvelope, SECRET_KEY);

      // Step 4: Verify token integrity & expiration
      const decoded = decodeToken(decryptedJwt, JWT_SECRET);
      expect(decoded).not.toBeNull();
      const activeRole = decoded.role;

      // Step 5: Authorize navigation to protected Admin route
      const navAuth = authorizeRoute(decryptedJwt, PERMISSIONS.ADMIN_ALL, JWT_SECRET);
      expect(navAuth.authorized).toBe(true);

      // Step 6: Burst API requests under active session
      resetLimit(userCredentials.username);
      const opts = { capacity: 3, refillRate: 1 };
      const executeApiCall = (key) => {
        const res = consumeToken(key, 1, opts);
        if (!res.allowed) {
          return { status: 429, message: 'Too Many Requests' };
        }
        return { status: 200, message: 'OK' };
      };

      expect(executeApiCall(userCredentials.username).status).toBe(200); // Request 1
      expect(executeApiCall(userCredentials.username).status).toBe(200); // Request 2
      expect(executeApiCall(userCredentials.username).status).toBe(200); // Request 3
      expect(executeApiCall(userCredentials.username).status).toBe(429); // Request 4 -> Throttled!
    });

    test('T4.2 - Concurrent Multi-Tenant Session Isolation: Multiple simultaneous user sessions with different roles and rate limits', async () => {
      resetLimit();
      const opts = { capacity: 2, refillRate: 1 };

      // Tenant A: Basic User
      const tokenA = signToken({ sub: 'tenant_a', role: ROLES.BASIC_USER }, JWT_SECRET);
      await secureStorage.setItem('tenant_a_session', encrypt(tokenA, SECRET_KEY));

      // Tenant B: Premium User
      const tokenB = signToken({ sub: 'tenant_b', role: ROLES.PREMIUM_USER }, JWT_SECRET);
      await secureStorage.setItem('tenant_b_session', encrypt(tokenB, SECRET_KEY));

      // Tenant A accesses premium route (Denies by RBAC)
      const resA_AES = await secureStorage.getItem('tenant_a_session');
      const payloadA = decodeToken(decrypt(resA_AES, SECRET_KEY), JWT_SECRET);
      const authA = hasPermission(payloadA.role, PERMISSIONS.READ_PREMIUM);
      expect(authA).toBe(false);

      // Tenant B accesses premium route (Allowed by RBAC)
      const resB_AES = await secureStorage.getItem('tenant_b_session');
      const payloadB = decodeToken(decrypt(resB_AES, SECRET_KEY), JWT_SECRET);
      const authB = hasPermission(payloadB.role, PERMISSIONS.READ_PREMIUM);
      expect(authB).toBe(true);

      // Tenant B consumes rate limit quota; Tenant A remains unaffected
      expect(consumeToken('tenant_b', 2, opts).allowed).toBe(true);
      expect(consumeToken('tenant_b', 1, opts).allowed).toBe(false); // Tenant B throttled
      expect(consumeToken('tenant_a', 1, opts).allowed).toBe(true);  // Tenant A still has quota
    });

    test('T4.3 - Security Breach Recovery Flow: Detect tampered payload -> revoke storage session -> force re-authentication', async () => {
      // Initialize valid session
      const validToken = signToken({ sub: 'user_secure', role: ROLES.BASIC_USER }, JWT_SECRET);
      await secureStorage.setItem('active_session', encrypt(validToken, SECRET_KEY));

      // Simulate malicious tampering of encrypted storage payload
      const tamperedStorageData = 'invalid_iv:tampered_ciphertext_garbage';
      await secureStorage.setItem('active_session', tamperedStorageData);

      // Application security interceptor attempts session restore
      let sessionRestored = false;
      let sessionError = null;

      const rawStorage = await secureStorage.getItem('active_session');
      const decrypted = decrypt(rawStorage, SECRET_KEY);
      if (!decrypted) {
        sessionError = 'Decryption failed';
        await secureStorage.removeItem('active_session');
      } else {
        const decoded = decodeToken(decrypted, JWT_SECRET);
        if (decoded) sessionRestored = true;
      }

      expect(sessionRestored).toBe(false);
      expect(sessionError).toBe('Decryption failed');
      expect(await secureStorage.getItem('active_session')).toBeNull();
    });
  });

});
