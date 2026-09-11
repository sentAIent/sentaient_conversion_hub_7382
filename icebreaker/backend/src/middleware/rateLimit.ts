import rateLimit from 'express-rate-limit';

/**
 * Global Rate Limiter to prevent brute force and DDoS on the main API.
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 500 requests per `window`
  standardHeaders: true, 
  legacyHeaders: false, 
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});

/**
 * Strict Rate Limiter specifically for Authentication/Login endpoints 
 * to mitigate credential stuffing attacks.
 */
export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // Limit each IP to 10 login attempts per `window`
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many login attempts from this IP, please try again after 5 minutes.',
});
