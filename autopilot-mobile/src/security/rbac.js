import crypto from 'crypto';

/**
 * Supported User Roles
 */
export const ROLES = {
  ADMIN: 'Admin',
  MODERATOR: 'Moderator',
  PREMIUM_USER: 'PremiumUser',
  BASIC_USER: 'BasicUser',
  GUEST: 'Guest',
};

/**
 * Role Rank for Hierarchy Comparisons
 */
const ROLE_RANK = {
  [ROLES.ADMIN.toLowerCase()]: 50,
  [ROLES.MODERATOR.toLowerCase()]: 40,
  [ROLES.PREMIUM_USER.toLowerCase()]: 30,
  [ROLES.BASIC_USER.toLowerCase()]: 20,
  [ROLES.GUEST.toLowerCase()]: 10,
};

/**
 * Granular Permissions
 */
export const PERMISSIONS = {
  READ_PUBLIC: 'read:public',
  READ_USER: 'read:user',
  WRITE_USER: 'write:user',
  READ_PREMIUM: 'read:premium',
  WRITE_PREMIUM: 'write:premium',
  MODERATE_CONTENT: 'moderate:content',
  ADMIN_ALL: 'admin:all',
};

/**
 * Role Permission Sets
 */
const ROLE_PERMISSIONS = {
  [ROLES.GUEST.toLowerCase()]: new Set([PERMISSIONS.READ_PUBLIC]),
  [ROLES.BASIC_USER.toLowerCase()]: new Set([
    PERMISSIONS.READ_PUBLIC,
    PERMISSIONS.READ_USER,
    PERMISSIONS.WRITE_USER,
  ]),
  [ROLES.PREMIUM_USER.toLowerCase()]: new Set([
    PERMISSIONS.READ_PUBLIC,
    PERMISSIONS.READ_USER,
    PERMISSIONS.WRITE_USER,
    PERMISSIONS.READ_PREMIUM,
    PERMISSIONS.WRITE_PREMIUM,
  ]),
  [ROLES.MODERATOR.toLowerCase()]: new Set([
    PERMISSIONS.READ_PUBLIC,
    PERMISSIONS.READ_USER,
    PERMISSIONS.WRITE_USER,
    PERMISSIONS.READ_PREMIUM,
    PERMISSIONS.WRITE_PREMIUM,
    PERMISSIONS.MODERATE_CONTENT,
  ]),
  [ROLES.ADMIN.toLowerCase()]: new Set([
    PERMISSIONS.READ_PUBLIC,
    PERMISSIONS.READ_USER,
    PERMISSIONS.WRITE_USER,
    PERMISSIONS.READ_PREMIUM,
    PERMISSIONS.WRITE_PREMIUM,
    PERMISSIONS.MODERATE_CONTENT,
    PERMISSIONS.ADMIN_ALL,
  ]),
};

/**
 * Base64URL Decode helper
 */
function base64UrlDecode(str) {
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    return Buffer.from(base64, 'base64').toString('utf8');
  } catch (err) {
    return null;
  }
}

/**
 * Base64URL Encode helper
 */
function base64UrlEncode(buffer) {
  return buffer
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Verify HMAC-SHA256 signature of JWT
 */
function verifySignature(headerB64, payloadB64, signatureB64, secretKey) {
  try {
    const expectedSig = base64UrlEncode(
      crypto.createHmac('sha256', secretKey).update(`${headerB64}.${payloadB64}`).digest()
    );
    const sigBuf = Buffer.from(signatureB64);
    const expBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expBuf.length) {
      return false;
    }
    return crypto.timingSafeEqual(sigBuf, expBuf);
  } catch (e) {
    return false;
  }
}

/**
 * Decodes and verifies a JWT token.
 * 
 * @param {string} jwt - The JWT string to decode
 * @param {string|null} [secretKey=null] - Optional secret key for signature verification
 * @returns {object|null} The decoded claims or null if invalid/expired/unverified
 */
export function decodeToken(jwt, secretKey = null) {
  if (typeof jwt !== 'string' || !jwt) {
    return null;
  }

  // Strip 'Bearer ' prefix if passed
  const cleanJwt = jwt.startsWith('Bearer ') ? jwt.slice(7).trim() : jwt.trim();
  const parts = cleanJwt.split('.');
  if (parts.length !== 3) {
    return null;
  }

  const [headerB64, payloadB64, signatureB64] = parts;

  // If secretKey provided, verify signature
  if (secretKey) {
    const validSig = verifySignature(headerB64, payloadB64, signatureB64, secretKey);
    if (!validSig) {
      return null;
    }
  }

  const decodedPayloadStr = base64UrlDecode(payloadB64);
  if (!decodedPayloadStr) {
    return null;
  }

  let claims;
  try {
    claims = JSON.parse(decodedPayloadStr);
  } catch (err) {
    return null;
  }

  if (!claims || typeof claims !== 'object') {
    return null;
  }

  // Check expiration (exp timestamp in seconds)
  if (claims.exp !== undefined && claims.exp !== null) {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    if (claims.exp <= nowInSeconds) {
      return null; // Expired
    }
  }

  return claims;
}

/**
 * Checks if a given role possesses a required permission or role level.
 * 
 * @param {string} role - User's role
 * @param {string} requiredPermission - Required permission string or minimum role string
 * @returns {boolean} True if role has permission/level
 */
export function hasPermission(role, requiredPermission) {
  if (!role || !requiredPermission) {
    return false;
  }

  const normalizedUserRole = String(role).toLowerCase();
  const normalizedReq = String(requiredPermission).toLowerCase();

  const userRank = ROLE_RANK[normalizedUserRole];
  if (userRank === undefined) {
    return false; // Unknown role
  }

  // Admin has all permissions
  if (normalizedUserRole === ROLES.ADMIN.toLowerCase()) {
    return true;
  }

  // Check if requiredPermission is another role (role hierarchy check)
  const reqRank = ROLE_RANK[normalizedReq];
  if (reqRank !== undefined) {
    return userRank >= reqRank;
  }

  // Check granular permission matrix
  const permissionsSet = ROLE_PERMISSIONS[normalizedUserRole];
  if (permissionsSet && permissionsSet.has(requiredPermission)) {
    return true;
  }

  return false;
}

/**
 * Evaluates route access authorization for a token and required permission/role.
 * 
 * @param {string} token - JWT token string (with or without 'Bearer ')
 * @param {string} requiredRoleOrPermission - Permission or role required for route
 * @param {string|null} [secretKey=null] - Optional secret key for token signature verification
 * @returns {{ authorized: boolean, reason?: string, user?: object }} Result object
 */
export function authorizeRoute(token, requiredRoleOrPermission, secretKey = null) {
  if (!token) {
    return {
      authorized: false,
      reason: 'Token missing',
    };
  }

  const user = decodeToken(token, secretKey);
  if (!user) {
    return {
      authorized: false,
      reason: 'Invalid or expired token',
    };
  }

  const role = user.role || ROLES.GUEST;
  const isAuthorized = hasPermission(role, requiredRoleOrPermission);

  if (isAuthorized) {
    return {
      authorized: true,
      user,
    };
  }

  return {
    authorized: false,
    reason: `Role '${role}' lacks required permission '${requiredRoleOrPermission}'`,
    user,
  };
}
