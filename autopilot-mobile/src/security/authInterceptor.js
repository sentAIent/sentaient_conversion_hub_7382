import crypto from 'crypto';
import { authorizeRoute } from './rbac.js';
import { consumeToken } from './rateLimiter.js';

/**
 * Base64URL Encode helper
 */
function base64UrlEncode(bufferOrStr) {
  const buf = Buffer.isBuffer(bufferOrStr)
    ? bufferOrStr
    : Buffer.from(String(bufferOrStr));
  return buf
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Generates an HMAC-SHA256 signed JWT token.
 * 
 * @param {object} payload - JWT claims (e.g. { sub, role, email, ... })
 * @param {string} secretKey - Secret key to sign token
 * @param {number} [expiresInSeconds=3600] - Expiration time in seconds from now
 * @returns {string} The signed JWT string
 */
export function signToken(payload, secretKey, expiresInSeconds = 3600) {
  if (!secretKey) {
    throw new Error('secretKey is required to sign JWT');
  }

  const header = { alg: 'HS256', typ: 'JWT' };
  const nowInSeconds = Math.floor(Date.now() / 1000);

  const fullPayload = {
    iat: nowInSeconds,
    exp: payload.exp !== undefined ? payload.exp : nowInSeconds + expiresInSeconds,
    ...payload,
  };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(fullPayload));

  const signature = base64UrlEncode(
    crypto
      .createHmac('sha256', secretKey)
      .update(`${headerB64}.${payloadB64}`)
      .digest()
  );

  return `${headerB64}.${payloadB64}.${signature}`;
}

/**
 * Intercepts an HTTP request, enforcing rate limiting and RBAC route authorization.
 * 
 * @param {object} request - Request object (e.g. { headers: { authorization: 'Bearer <jwt>' }, ip: '127.0.0.1' })
 * @param {string} requiredRoleOrPermission - Permission or role required for the route
 * @param {object} [options] - Options { secretKey, rateLimitOptions, rateLimitKey }
 * @returns {{ status: number, authorized: boolean, error?: string, message?: string, user?: object, remainingTokens?: number }}
 */
export function interceptRequest(request, requiredRoleOrPermission, options = {}) {
  if (!request) {
    return {
      status: 400,
      authorized: false,
      error: 'Bad Request',
      message: 'Request object is missing',
    };
  }

  // Extract authorization header or token
  const authHeader =
    request.headers?.authorization ||
    request.headers?.Authorization ||
    request.authorization ||
    request.token;

  if (!authHeader) {
    return {
      status: 401,
      authorized: false,
      error: 'Unauthorized',
      message: 'Missing authorization token',
    };
  }

  const token = String(authHeader).startsWith('Bearer ')
    ? String(authHeader).slice(7).trim()
    : String(authHeader).trim();

  // Enforce Key-Isolated Rate Limiting
  const rateLimitKey =
    options.rateLimitKey ||
    request.ip ||
    request.headers?.['x-forwarded-for'] ||
    request.clientIp ||
    token ||
    'global_key';

  const rateLimitResult = consumeToken(rateLimitKey, 1, options.rateLimitOptions);

  if (!rateLimitResult.allowed) {
    return {
      status: 429,
      authorized: false,
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.',
      remainingTokens: rateLimitResult.remainingTokens,
    };
  }

  // Enforce RBAC Route Authorization
  const authResult = authorizeRoute(token, requiredRoleOrPermission, options.secretKey);

  if (!authResult.authorized) {
    const isUserUnauthenticated = !authResult.user;
    return {
      status: isUserUnauthenticated ? 401 : 403,
      authorized: false,
      error: isUserUnauthenticated ? 'Unauthorized' : 'Forbidden',
      message: authResult.reason || 'Access denied',
      user: authResult.user || null,
      remainingTokens: rateLimitResult.remainingTokens,
    };
  }

  return {
    status: 200,
    authorized: true,
    user: authResult.user,
    remainingTokens: rateLimitResult.remainingTokens,
  };
}
