// Mock Vercel KV
jest.mock('@vercel/kv', () => ({
  kv: {
    set: jest.fn(),
    get: jest.fn(),
  },
}));

import { GET } from '@/app/api/health/route';
import { kv } from '@vercel/kv';

const mockKv = kv as jest.Mocked<typeof kv>;

describe('Health API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return healthy status when KV is working', async () => {
    mockKv.set.mockResolvedValue('OK');
    mockKv.get.mockResolvedValue(Date.now());

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('healthy');
    expect(data.checks).toHaveProperty('kv');
    expect(data.checks.kv.status).toBe('ok');
    expect(data.checks).toHaveProperty('timestamp');
  });

  it('should return degraded status when KV fails', async () => {
    mockKv.set.mockRejectedValue(new Error('KV error'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.status).toBe('degraded');
    expect(data.checks.kv.status).toBe('error');
  });
});
