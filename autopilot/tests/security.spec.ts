import { test, expect } from '@playwright/test';

test.describe('OWASP API Security Scanners', () => {
  const API_URL = 'http://localhost:18080';

  test('A04: Insecure Design - Verify Rate Limiting on Proxy Route', async ({ request }) => {
    // We send multiple requests to the proxy endpoint to ensure strict rate limiting works
    // The strict rate limiter is set to 10 requests per minute
    let statusCodes: number[] = [];
    
    for (let i = 0; i < 15; i++) {
      const response = await request.post(`${API_URL}/proxy/gemini`, {
        data: {
          prompt: 'test prompt',
          systemInstruction: 'test system'
        }
      });
      statusCodes.push(response.status());
    }

    // At least one request should have been rejected with 429 Too Many Requests
    const rateLimited = statusCodes.some(status => status === 429);
    expect(rateLimited).toBeTruthy();
  });

  test('A01: Broken Access Control - Reject unauthorized Admin access', async ({ request }) => {
    // Attempting to access admin routes without a valid x-admin-token
    const response = await request.get(`${API_URL}/admin/credentials`);
    expect(response.status()).toBe(401);
  });

  test('A03: Injection - Reject malformed JSON payloads in /queue/add', async ({ request }) => {
    // Attempting parameter tampering by omitting required campaign_id
    const response = await request.post(`${API_URL}/queue/add`, {
      data: {
        brand: 'Attacker Brand',
        // campaign_id is intentionally missing
      }
    });

    // Zod validation should catch this and return a 400 Bad Request
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Invalid payload');
  });

  test('Security Headers - Verify Helmet CSP and XSS Protections', async ({ request }) => {
    const response = await request.get(`${API_URL}/`); // Assuming root or any route returns headers
    const headers = response.headers();
    
    // Check if Helmet added standard security headers
    expect(headers['x-dns-prefetch-control']).toBeDefined();
    expect(headers['x-frame-options']).toBe('SAMEORIGIN');
    expect(headers['x-xss-protection']).toBe('0'); // Helmet disables browser XSS filter to rely on CSP
    expect(headers['content-security-policy']).toBeDefined();
  });
});
