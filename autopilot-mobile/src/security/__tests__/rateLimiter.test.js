import {
  checkRateLimit,
  consumeToken,
  resetLimit,
  getBucketState,
} from '../rateLimiter.js';
import { interceptRequest, signToken } from '../authInterceptor.js';
import { ROLES } from '../rbac.js';

describe('Key-Isolated Token Bucket Rate Limiter (rateLimiter.js)', () => {
  const SECRET_KEY = 'test_secret_key';

  beforeEach(() => {
    jest.useFakeTimers();
    resetLimit();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Capacity and Initial State', () => {
    it('should initialize bucket with full capacity for a new key', () => {
      const key = 'user_initial_1';
      const options = { capacity: 5, refillRate: 1, windowMs: 1000 };

      const res = checkRateLimit(key, options);
      expect(res.allowed).toBe(true);
      expect(res.capacity).toBe(5);
      expect(res.remainingTokens).toBe(5);
    });

    it('should reflect default capacity when options are omitted', () => {
      const key = 'user_default_1';
      const res = checkRateLimit(key);

      expect(res.allowed).toBe(true);
      expect(res.capacity).toBe(10);
      expect(res.remainingTokens).toBe(10);
    });
  });

  describe('Token Consumption', () => {
    it('should decrement tokens on consumeToken', () => {
      const key = 'user_consume_1';
      const options = { capacity: 5, refillRate: 1, windowMs: 1000 };

      const res1 = consumeToken(key, 1, options);
      expect(res1.allowed).toBe(true);
      expect(res1.remainingTokens).toBe(4);

      const res2 = consumeToken(key, 2, options);
      expect(res2.allowed).toBe(true);
      expect(res2.remainingTokens).toBe(2);
    });

    it('should not consume tokens when checkRateLimit is called without consume: true', () => {
      const key = 'user_check_1';
      const options = { capacity: 5, refillRate: 1, windowMs: 1000 };

      const check1 = checkRateLimit(key, options);
      expect(check1.allowed).toBe(true);
      expect(check1.remainingTokens).toBe(5);

      const check2 = checkRateLimit(key, options);
      expect(check2.remainingTokens).toBe(5);
    });
  });

  describe('Burst Exhaustion', () => {
    it('should allow requests up to capacity and reject subsequent burst requests', () => {
      const key = 'user_burst_1';
      const capacity = 3;
      const options = { capacity, refillRate: 1, windowMs: 5000 };

      for (let i = 0; i < capacity; i++) {
        const res = consumeToken(key, 1, options);
        expect(res.allowed).toBe(true);
      }

      // Next request should fail
      const burstFail = consumeToken(key, 1, options);
      expect(burstFail.allowed).toBe(false);
      expect(burstFail.remainingTokens).toBe(0);
      expect(burstFail.resetInMs).toBeGreaterThan(0);
    });
  });

  describe('Rate Refill Over Time', () => {
    it('should refill tokens gradually as time advances', () => {
      const key = 'user_refill_1';
      // 2 tokens per 1000ms window (capacity 4)
      const options = { capacity: 4, refillRate: 2, windowMs: 1000 };

      // Consume all 4 tokens
      for (let i = 0; i < 4; i++) {
        consumeToken(key, 1, options);
      }
      expect(checkRateLimit(key, options).remainingTokens).toBe(0);

      // Advance time by 500ms -> should refill 1 token
      jest.advanceTimersByTime(500);

      const resHalf = checkRateLimit(key, options);
      expect(resHalf.remainingTokens).toBe(1);

      // Advance time by another 1500ms (total 2000ms) -> should refill to full capacity (4)
      jest.advanceTimersByTime(1500);

      const resFull = checkRateLimit(key, options);
      expect(resFull.remainingTokens).toBe(4);
    });

    it('should not exceed max capacity during refill', () => {
      const key = 'user_cap_refill';
      const options = { capacity: 3, refillRate: 5, windowMs: 1000 };

      consumeToken(key, 1, options);
      expect(checkRateLimit(key, options).remainingTokens).toBe(2);

      // Advance time by 10 seconds
      jest.advanceTimersByTime(10000);

      const res = checkRateLimit(key, options);
      expect(res.remainingTokens).toBe(3); // Capped at capacity 3
    });
  });

  describe('Key Isolation', () => {
    it('should maintain independent buckets for separate keys', () => {
      const keyA = 'client_A';
      const keyB = 'client_B';
      const options = { capacity: 2, refillRate: 1, windowMs: 10000 };

      // Exhaust keyA
      consumeToken(keyA, 1, options);
      consumeToken(keyA, 1, options);
      const resA = consumeToken(keyA, 1, options);
      expect(resA.allowed).toBe(false);

      // KeyB should remain completely unimpacted
      const resB = consumeToken(keyB, 1, options);
      expect(resB.allowed).toBe(true);
      expect(resB.remainingTokens).toBe(1);
    });

    it('should support resetting a single key without clearing other keys', () => {
      const key1 = 'user_reset_1';
      const key2 = 'user_reset_2';

      consumeToken(key1, 5, { capacity: 5 });
      consumeToken(key2, 5, { capacity: 5 });

      expect(checkRateLimit(key1).remainingTokens).toBe(0);
      expect(checkRateLimit(key2).remainingTokens).toBe(0);

      // Reset only key1
      resetLimit(key1);

      expect(checkRateLimit(key1).remainingTokens).toBe(10); // default capacity restored
      expect(checkRateLimit(key2).remainingTokens).toBe(0);  // key2 remains exhausted
    });
  });

  describe('Integration with Auth Interceptor Rate Limiting', () => {
    it('should reject requests with 429 when rate limit is exceeded in interceptRequest', () => {
      const token = signToken({ sub: 'user_rate_test', role: ROLES.BASIC_USER }, SECRET_KEY);
      const req = {
        headers: { authorization: `Bearer ${token}` },
        ip: '10.0.0.99',
      };
      const opts = {
        secretKey: SECRET_KEY,
        rateLimitOptions: { capacity: 2, refillRate: 1, windowMs: 60000 },
      };

      // Request 1: PASS
      const res1 = interceptRequest(req, ROLES.BASIC_USER, opts);
      expect(res1.status).toBe(200);

      // Request 2: PASS
      const res2 = interceptRequest(req, ROLES.BASIC_USER, opts);
      expect(res2.status).toBe(200);

      // Request 3: TOO MANY REQUESTS (429)
      const res3 = interceptRequest(req, ROLES.BASIC_USER, opts);
      expect(res3.status).toBe(429);
      expect(res3.authorized).toBe(false);
      expect(res3.error).toBe('Too Many Requests');
    });
  });
});
