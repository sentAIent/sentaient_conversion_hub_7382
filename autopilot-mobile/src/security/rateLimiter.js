/**
 * In-memory storage for rate limiter buckets keyed by unique identifier.
 * Structure per key: { tokens: number, lastRefill: number, capacity: number, refillRate: number, windowMs: number }
 */
const buckets = new Map();

/**
 * Normalizes options with defaults.
 */
function getNormalizedOptions(options = {}) {
  return {
    capacity: options.capacity ?? 10,
    refillRate: options.refillRate ?? 2,
    windowMs: options.windowMs ?? options.windowDuration ?? 1000,
  };
}

/**
 * Gets or initializes bucket for a key and performs continuous token refill based on elapsed time.
 */
function getAndRefillBucket(key, options = {}) {
  const { capacity, refillRate, windowMs } = getNormalizedOptions(options);
  const now = Date.now();

  let bucket = buckets.get(key);

  if (!bucket) {
    bucket = {
      tokens: capacity,
      lastRefill: now,
      capacity,
      refillRate,
      windowMs,
    };
    buckets.set(key, bucket);
    return bucket;
  }

  // Update bucket options if changed
  bucket.capacity = capacity;
  bucket.refillRate = refillRate;
  bucket.windowMs = windowMs;

  const elapsedTime = now - bucket.lastRefill;
  if (elapsedTime > 0) {
    const tokensToAdd = (elapsedTime / windowMs) * refillRate;
    bucket.tokens = Math.min(capacity, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }

  return bucket;
}

/**
 * Checks if tokens are available without consuming (or optionally consumes if consume: true).
 * 
 * @param {string} key - Unique rate limit key (e.g. IP, user ID, API key)
 * @param {object} [options] - Configuration options { capacity, refillRate, windowMs, count, consume }
 * @returns {{ allowed: boolean, remainingTokens: number, capacity: number, resetInMs: number }}
 */
export function checkRateLimit(key, options = {}) {
  if (options.consume === true) {
    return consumeToken(key, options.count || 1, options);
  }

  const count = options.count || 1;
  const bucket = getAndRefillBucket(key, options);
  const allowed = bucket.tokens >= count;
  const remainingTokens = Math.max(0, Math.floor(bucket.tokens));

  const neededTokens = count - bucket.tokens;
  const resetInMs = neededTokens > 0 
    ? Math.ceil((neededTokens / bucket.refillRate) * bucket.windowMs)
    : 0;

  return {
    allowed,
    remainingTokens,
    capacity: bucket.capacity,
    resetInMs,
  };
}

/**
 * Consumes tokens from the key's token bucket if available.
 * 
 * @param {string} key - Unique rate limit key
 * @param {number} [count=1] - Number of tokens to consume
 * @param {object} [options] - Configuration options { capacity, refillRate, windowMs }
 * @returns {{ allowed: boolean, remainingTokens: number, capacity: number, resetInMs: number }}
 */
export function consumeToken(key, count = 1, options = {}) {
  const bucket = getAndRefillBucket(key, options);
  
  if (bucket.tokens >= count) {
    bucket.tokens -= count;
    const remainingTokens = Math.max(0, Math.floor(bucket.tokens));
    const missingTokens = bucket.capacity - bucket.tokens;
    const resetInMs = Math.ceil((missingTokens / bucket.refillRate) * bucket.windowMs);

    return {
      allowed: true,
      remainingTokens,
      capacity: bucket.capacity,
      resetInMs,
    };
  }

  const remainingTokens = Math.max(0, Math.floor(bucket.tokens));
  const neededTokens = count - bucket.tokens;
  const resetInMs = Math.ceil((neededTokens / bucket.refillRate) * bucket.windowMs);

  return {
    allowed: false,
    remainingTokens,
    capacity: bucket.capacity,
    resetInMs,
  };
}

/**
 * Resets the rate limit bucket for a specific key (or clears all if key is omitted).
 * 
 * @param {string} [key] - Key to reset
 */
export function resetLimit(key) {
  if (key !== undefined && key !== null) {
    buckets.delete(key);
  } else {
    buckets.clear();
  }
}

/**
 * Returns current bucket internal state (useful for inspection/debugging).
 * 
 * @param {string} key 
 * @returns {object|null}
 */
export function getBucketState(key) {
  const bucket = buckets.get(key);
  if (!bucket) return null;
  return { ...bucket };
}

/**
 * Class wrapper for RateLimiter matching Expo / cross-platform contract.
 */
export class RateLimiter {
  constructor(capacity = 10, refillRate = 1, windowMs = 1000) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.windowMs = windowMs;
  }

  tryConsume(count = 1, key = 'default') {
    if (count <= 0) {
      throw new Error('Consumption count must be greater than zero');
    }
    if (this.capacity <= 0) {
      return false;
    }
    const res = consumeToken(key, count, {
      capacity: this.capacity,
      refillRate: this.refillRate,
      windowMs: this.windowMs,
    });
    return res.allowed;
  }

  getTokens(key = 'default') {
    if (this.capacity <= 0) {
      return 0;
    }
    const res = checkRateLimit(key, {
      capacity: this.capacity,
      refillRate: this.refillRate,
      windowMs: this.windowMs,
    });
    return res.remainingTokens;
  }

  reset(key) {
    resetLimit(key);
  }
}
