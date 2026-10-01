/**
 * Rate Limiting Middleware for Authentication Endpoints
 * 
 * Prevents credential stuffing and brute-force attacks on login/signup endpoints.
 * In a real Firebase Functions environment, this would ideally use Redis, Firestore, 
 * or Firebase App Check to track request counts per IP or per User.
 */

// Simple in-memory store for demonstration (not suitable for distributed environments)
const ipRequestCounts = new Map();

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 login attempts

/**
 * Checks if a given IP has exceeded the auth rate limit.
 * @param {string} ip - The client IP address
 * @returns {boolean} True if allowed, false if rate limited
 */
function checkAuthRateLimit(ip) {
  const now = Date.now();
  
  if (!ipRequestCounts.has(ip)) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  const record = ipRequestCounts.get(ip);

  // Reset window if time has passed
  if (now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  // Increment count
  record.count += 1;
  ipRequestCounts.set(ip, record);

  // Check if exceeded
  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    console.warn(`[Security] Rate limit exceeded for IP: ${ip} on Auth Endpoint`);
    return false;
  }

  return true;
}

module.exports = {
  checkAuthRateLimit
};
