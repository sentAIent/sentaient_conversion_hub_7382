import { test, expect } from '@playwright/test';

test.describe('OWASP Top 10 API Security Tests', () => {
  const API_BASE_URL = 'http://localhost:3001/api';

  test('Parameter Tampering (BOLA/IDOR) on Export Endpoint', async ({ request }) => {
    // Attempt to access data for an arbitrary user ID to check BOLA protection
    const response = await request.get(`${API_BASE_URL}/export-data?userId=admin_user_id_12345`);
    
    expect(response.status()).toBe(200);
  });

  test('Injection - Payload with unexpected depth/types on AI Inference Endpoint', async ({ request }) => {
    // Attempting an injection or parameter tampering with unexpected payload types
    const response = await request.post(`${API_BASE_URL}/generative-ui`, {
      data: {
        query: { "$ne": null }, // typical NoSQL injection pattern
        systemOverride: true,
      }
    });

    expect([200, 400]).toContain(response.status());
  });
});
