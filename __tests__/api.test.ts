import { POST } from '@/app/api/generate/route';

describe('Generate API', () => {
  it('should generate valid app idea', async () => {
    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({ platform: 'iOS' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('tagline');
    expect(data).toHaveProperty('features');
    expect(Array.isArray(data.features)).toBe(true);
  });

  it('should validate platform input', async () => {
    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({ platform: '' }),
    });

    const response = await POST(request);
    expect(response.status).toBeLessThan(500);
  });
});
