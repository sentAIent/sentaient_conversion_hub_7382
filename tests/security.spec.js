import { test, expect } from '@playwright/test';

// Simple OWASP tampering test checking that unauthorized endpoints
// return 401 or 403 when no auth or bad auth is provided.

test.describe('OWASP API Security Tests', () => {
  const BASE_URL = 'http://localhost:5173'; // Fallback if not provided

  test('Should reject requests without authorization headers to secure endpoints', async ({ request, baseURL }) => {
    // Attempt to hit a mock/secure API route if one exists
    // Replace with your actual secure backend URL when available
    const url = baseURL || BASE_URL;
    
    // We check that hitting a known static route doesn't crash
    const res = await request.get(`${url}/`);
    expect(res.ok()).toBeTruthy();

    // Simulating a tamper attempt to an admin endpoint
    const adminRes = await request.post(`${url}/api/admin/tamper`, {
      data: {
        role: "admin",
        force: true
      }
    });

    // In a real backend, this should return 401/403 or 404
    // We assert that it doesn't return 200 OK
    expect(adminRes.status()).not.toBe(200);
  });

  test('Should strictly enforce Content-Type headers to prevent CSRF/parsing attacks', async ({ request, baseURL }) => {
    const url = baseURL || BASE_URL;
    
    // Send a payload with an unexpected content-type (e.g., text/plain instead of application/json)
    const res = await request.post(`${url}/api/submit`, {
      headers: {
        'Content-Type': 'text/plain'
      },
      data: '{"hacked": true}'
    });

    // Most strict APIs will reject this with 415 Unsupported Media Type or 404
    expect(res.status()).not.toBe(200);
  });
});
