import {
  ROLES,
  PERMISSIONS,
  decodeToken,
  hasPermission,
  authorizeRoute,
} from '../rbac.js';
import { signToken, interceptRequest } from '../authInterceptor.js';
import { resetLimit } from '../rateLimiter.js';

describe('JWT RBAC Logic (rbac.js & authInterceptor.js)', () => {
  const SECRET_KEY = 'test_secret_key_super_secure';

  beforeEach(() => {
    resetLimit();
  });

  describe('decodeToken', () => {
    it('should decode valid JWT claims correctly', () => {
      const payload = {
        sub: 'user_123',
        role: ROLES.PREMIUM_USER,
        email: 'user@example.com',
      };
      const token = signToken(payload, SECRET_KEY, 3600);

      const decoded = decodeToken(token);
      expect(decoded).not.toBeNull();
      expect(decoded.sub).toBe('user_123');
      expect(decoded.role).toBe(ROLES.PREMIUM_USER);
      expect(decoded.email).toBe('user@example.com');
      expect(decoded.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
    });

    it('should decode token prefixed with Bearer', () => {
      const payload = { sub: 'admin_1', role: ROLES.ADMIN, email: 'admin@example.com' };
      const rawToken = signToken(payload, SECRET_KEY, 3600);
      const bearerToken = `Bearer ${rawToken}`;

      const decoded = decodeToken(bearerToken);
      expect(decoded).not.toBeNull();
      expect(decoded.sub).toBe('admin_1');
      expect(decoded.role).toBe(ROLES.ADMIN);
    });

    it('should reject expired tokens', () => {
      const payload = { sub: 'user_expired', role: ROLES.BASIC_USER };
      // Expired 10 seconds ago
      const expiredToken = signToken(payload, SECRET_KEY, -10);

      const decoded = decodeToken(expiredToken);
      expect(decoded).toBeNull();
    });

    it('should return null for malformed JWT strings', () => {
      expect(decodeToken('not.a.jwt.token.extra')).toBeNull();
      expect(decodeToken('invalid_token')).toBeNull();
      expect(decodeToken('')).toBeNull();
      expect(decodeToken(null)).toBeNull();
      expect(decodeToken(undefined)).toBeNull();
      expect(decodeToken(12345)).toBeNull();
      expect(decodeToken('header.invalid_base64_json!@#.signature')).toBeNull();
    });

    it('should verify signature when secretKey is provided', () => {
      const payload = { sub: 'user_secure', role: ROLES.BASIC_USER };
      const validToken = signToken(payload, SECRET_KEY, 3600);
      const invalidToken = signToken(payload, 'wrong_secret_key', 3600);

      const decodedValid = decodeToken(validToken, SECRET_KEY);
      expect(decodedValid).not.toBeNull();
      expect(decodedValid.sub).toBe('user_secure');

      const decodedInvalid = decodeToken(invalidToken, SECRET_KEY);
      expect(decodedInvalid).toBeNull();
    });
  });

  describe('hasPermission - Role Hierarchy & Permission Matrix', () => {
    describe('Admin Role', () => {
      it('should grant Admin access to all roles and permissions', () => {
        expect(hasPermission(ROLES.ADMIN, ROLES.ADMIN)).toBe(true);
        expect(hasPermission(ROLES.ADMIN, ROLES.MODERATOR)).toBe(true);
        expect(hasPermission(ROLES.ADMIN, ROLES.PREMIUM_USER)).toBe(true);
        expect(hasPermission(ROLES.ADMIN, ROLES.BASIC_USER)).toBe(true);
        expect(hasPermission(ROLES.ADMIN, ROLES.GUEST)).toBe(true);

        expect(hasPermission(ROLES.ADMIN, PERMISSIONS.ADMIN_ALL)).toBe(true);
        expect(hasPermission(ROLES.ADMIN, PERMISSIONS.MODERATE_CONTENT)).toBe(true);
        expect(hasPermission(ROLES.ADMIN, PERMISSIONS.READ_PREMIUM)).toBe(true);
        expect(hasPermission(ROLES.ADMIN, PERMISSIONS.WRITE_USER)).toBe(true);
        expect(hasPermission(ROLES.ADMIN, PERMISSIONS.READ_PUBLIC)).toBe(true);
        expect(hasPermission(ROLES.ADMIN, 'custom:arbitrary_permission')).toBe(true);
      });
    });

    describe('Moderator Role', () => {
      it('should grant Moderator access to Moderator, PremiumUser, BasicUser, Guest permissions but not Admin', () => {
        expect(hasPermission(ROLES.MODERATOR, ROLES.ADMIN)).toBe(false);
        expect(hasPermission(ROLES.MODERATOR, ROLES.MODERATOR)).toBe(true);
        expect(hasPermission(ROLES.MODERATOR, ROLES.PREMIUM_USER)).toBe(true);
        expect(hasPermission(ROLES.MODERATOR, ROLES.BASIC_USER)).toBe(true);
        expect(hasPermission(ROLES.MODERATOR, ROLES.GUEST)).toBe(true);

        expect(hasPermission(ROLES.MODERATOR, PERMISSIONS.MODERATE_CONTENT)).toBe(true);
        expect(hasPermission(ROLES.MODERATOR, PERMISSIONS.READ_PREMIUM)).toBe(true);
        expect(hasPermission(ROLES.MODERATOR, PERMISSIONS.READ_PUBLIC)).toBe(true);
        expect(hasPermission(ROLES.MODERATOR, PERMISSIONS.ADMIN_ALL)).toBe(false);
      });
    });

    describe('PremiumUser Role', () => {
      it('should grant PremiumUser access to PremiumUser, BasicUser, Guest permissions but not Moderator/Admin', () => {
        expect(hasPermission(ROLES.PREMIUM_USER, ROLES.ADMIN)).toBe(false);
        expect(hasPermission(ROLES.PREMIUM_USER, ROLES.MODERATOR)).toBe(false);
        expect(hasPermission(ROLES.PREMIUM_USER, ROLES.PREMIUM_USER)).toBe(true);
        expect(hasPermission(ROLES.PREMIUM_USER, ROLES.BASIC_USER)).toBe(true);
        expect(hasPermission(ROLES.PREMIUM_USER, ROLES.GUEST)).toBe(true);

        expect(hasPermission(ROLES.PREMIUM_USER, PERMISSIONS.READ_PREMIUM)).toBe(true);
        expect(hasPermission(ROLES.PREMIUM_USER, PERMISSIONS.WRITE_PREMIUM)).toBe(true);
        expect(hasPermission(ROLES.PREMIUM_USER, PERMISSIONS.READ_USER)).toBe(true);
        expect(hasPermission(ROLES.PREMIUM_USER, PERMISSIONS.MODERATE_CONTENT)).toBe(false);
        expect(hasPermission(ROLES.PREMIUM_USER, PERMISSIONS.ADMIN_ALL)).toBe(false);
      });
    });

    describe('BasicUser Role', () => {
      it('should grant BasicUser access to BasicUser, Guest permissions but not Premium/Moderator/Admin', () => {
        expect(hasPermission(ROLES.BASIC_USER, ROLES.ADMIN)).toBe(false);
        expect(hasPermission(ROLES.BASIC_USER, ROLES.MODERATOR)).toBe(false);
        expect(hasPermission(ROLES.BASIC_USER, ROLES.PREMIUM_USER)).toBe(false);
        expect(hasPermission(ROLES.BASIC_USER, ROLES.BASIC_USER)).toBe(true);
        expect(hasPermission(ROLES.BASIC_USER, ROLES.GUEST)).toBe(true);

        expect(hasPermission(ROLES.BASIC_USER, PERMISSIONS.READ_USER)).toBe(true);
        expect(hasPermission(ROLES.BASIC_USER, PERMISSIONS.WRITE_USER)).toBe(true);
        expect(hasPermission(ROLES.BASIC_USER, PERMISSIONS.READ_PUBLIC)).toBe(true);
        expect(hasPermission(ROLES.BASIC_USER, PERMISSIONS.READ_PREMIUM)).toBe(false);
        expect(hasPermission(ROLES.BASIC_USER, PERMISSIONS.MODERATE_CONTENT)).toBe(false);
      });
    });

    describe('Guest Role', () => {
      it('should grant Guest access to Guest permissions only', () => {
        expect(hasPermission(ROLES.GUEST, ROLES.ADMIN)).toBe(false);
        expect(hasPermission(ROLES.GUEST, ROLES.MODERATOR)).toBe(false);
        expect(hasPermission(ROLES.GUEST, ROLES.PREMIUM_USER)).toBe(false);
        expect(hasPermission(ROLES.GUEST, ROLES.BASIC_USER)).toBe(false);
        expect(hasPermission(ROLES.GUEST, ROLES.GUEST)).toBe(true);

        expect(hasPermission(ROLES.GUEST, PERMISSIONS.READ_PUBLIC)).toBe(true);
        expect(hasPermission(ROLES.GUEST, PERMISSIONS.READ_USER)).toBe(false);
        expect(hasPermission(ROLES.GUEST, PERMISSIONS.READ_PREMIUM)).toBe(false);
      });
    });

    describe('Case Insensitivity & Edge Cases', () => {
      it('should handle case insensitivity for role names', () => {
        expect(hasPermission('admin', 'moderator')).toBe(true);
        expect(hasPermission('ADMIN', 'BASICUSER')).toBe(true);
        expect(hasPermission('basicuser', 'read:public')).toBe(true);
      });

      it('should return false for invalid or missing roles/permissions', () => {
        expect(hasPermission(null, PERMISSIONS.READ_PUBLIC)).toBe(false);
        expect(hasPermission(ROLES.ADMIN, null)).toBe(false);
        expect(hasPermission('InvalidRole', PERMISSIONS.READ_PUBLIC)).toBe(false);
      });
    });
  });

  describe('authorizeRoute', () => {
    it('should authorize request with valid token and sufficient role', () => {
      const token = signToken({ sub: 'admin_1', role: ROLES.ADMIN }, SECRET_KEY);
      const res = authorizeRoute(token, ROLES.MODERATOR, SECRET_KEY);

      expect(res.authorized).toBe(true);
      expect(res.user.sub).toBe('admin_1');
    });

    it('should reject request with valid token but insufficient role', () => {
      const token = signToken({ sub: 'user_1', role: ROLES.BASIC_USER }, SECRET_KEY);
      const res = authorizeRoute(token, ROLES.PREMIUM_USER, SECRET_KEY);

      expect(res.authorized).toBe(false);
      expect(res.reason).toContain("lacks required permission 'PremiumUser'");
      expect(res.user.sub).toBe('user_1');
    });

    it('should reject request with missing token', () => {
      const res = authorizeRoute(null, ROLES.BASIC_USER);
      expect(res.authorized).toBe(false);
      expect(res.reason).toBe('Token missing');
    });

    it('should reject request with expired token', () => {
      const expiredToken = signToken({ sub: 'user_1', role: ROLES.ADMIN }, SECRET_KEY, -10);
      const res = authorizeRoute(expiredToken, ROLES.BASIC_USER, SECRET_KEY);

      expect(res.authorized).toBe(false);
      expect(res.reason).toBe('Invalid or expired token');
    });

    it('should reject request with invalid signature when secretKey is enforced', () => {
      const token = signToken({ sub: 'user_1', role: ROLES.ADMIN }, 'wrong_secret', 3600);
      const res = authorizeRoute(token, ROLES.ADMIN, SECRET_KEY);

      expect(res.authorized).toBe(false);
      expect(res.reason).toBe('Invalid or expired token');
    });
  });

  describe('authInterceptor Integration', () => {
    it('should successfully intercept and authorize valid HTTP requests', () => {
      const token = signToken({ sub: 'mod_1', role: ROLES.MODERATOR }, SECRET_KEY);
      const req = {
        headers: { authorization: `Bearer ${token}` },
        ip: '192.168.1.1',
      };

      const res = interceptRequest(req, PERMISSIONS.MODERATE_CONTENT, { secretKey: SECRET_KEY });
      expect(res.status).toBe(200);
      expect(res.authorized).toBe(true);
      expect(res.user.sub).toBe('mod_1');
    });

    it('should return 401 Unauthorized for missing or invalid token', () => {
      const req = { headers: {}, ip: '192.168.1.2' };
      const res = interceptRequest(req, ROLES.BASIC_USER);

      expect(res.status).toBe(401);
      expect(res.authorized).toBe(false);
      expect(res.error).toBe('Unauthorized');
    });

    it('should return 403 Forbidden for valid token lacking permission', () => {
      const token = signToken({ sub: 'user_1', role: ROLES.BASIC_USER }, SECRET_KEY);
      const req = {
        headers: { authorization: `Bearer ${token}` },
        ip: '192.168.1.3',
      };

      const res = interceptRequest(req, PERMISSIONS.MODERATE_CONTENT, { secretKey: SECRET_KEY });
      expect(res.status).toBe(403);
      expect(res.authorized).toBe(false);
      expect(res.error).toBe('Forbidden');
    });
  });
});
