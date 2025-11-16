import { test, expect } from '@playwright/test';

test.describe('Health API', () => {
  test('should return health status', async ({ request }) => {
    const response = await request.get('/api/health');
    
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    expect(data).toHaveProperty('status');
    expect(data).toHaveProperty('checks');
    expect(data).toHaveProperty('timestamp');
    expect(['healthy', 'degraded']).toContain(data.status);
  });

  test('should check KV status', async ({ request }) => {
    const response = await request.get('/api/health');
    const data = await response.json();
    
    expect(data.checks).toHaveProperty('kv');
    expect(data.checks.kv).toHaveProperty('status');
  });
});
