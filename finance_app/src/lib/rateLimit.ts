// Basic In-Memory Rate Limiter for API Routes (MVP)
// In a full production environment across multiple edge nodes, use Upstash Redis.

const requestCounts = new Map<string, { count: number, resetTime: number }>();

export interface RateLimitOptions {
  windowMs: number;
  max: number;
}

export function rateLimit(identifier: string, options: RateLimitOptions = { windowMs: 60000, max: 20 }) {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record) {
    requestCounts.set(identifier, { count: 1, resetTime: now + options.windowMs });
    return { success: true, remaining: options.max - 1 };
  }

  if (now > record.resetTime) {
    // Reset window
    record.count = 1;
    record.resetTime = now + options.windowMs;
    return { success: true, remaining: options.max - 1 };
  }

  if (record.count >= options.max) {
    return { success: false, remaining: 0 };
  }

  record.count += 1;
  return { success: true, remaining: options.max - record.count };
}
