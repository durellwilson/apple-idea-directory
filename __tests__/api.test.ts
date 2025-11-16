// Mock the AI SDK before importing the route
jest.mock('ai', () => ({
  generateObject: jest.fn(),
}));

jest.mock('@ai-sdk/openai', () => ({
  openai: jest.fn(() => 'gpt-4-turbo'),
}));

import { POST } from '@/app/api/generate/route';
import { generateObject } from 'ai';

const mockGenerateObject = generateObject as jest.MockedFunction<typeof generateObject>;

describe('Generate API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate valid app idea', async () => {
    // Mock successful generation
    mockGenerateObject.mockResolvedValue({
      object: {
        name: 'TestApp',
        tagline: 'A test app',
        description: 'Test description',
        platforms: ['iOS'],
        category: 'Productivity',
        features: ['Feature 1', 'Feature 2'],
        techStack: ['SwiftUI', 'CloudKit'],
        gtmStrategy: 'Test GTM',
        monetization: 'Freemium',
        targetAudience: 'Developers',
        uniqueValue: 'Unique test value',
      },
    } as any);

    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform: 'iOS' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('tagline');
    expect(data).toHaveProperty('features');
    expect(Array.isArray(data.features)).toBe(true);
    expect(mockGenerateObject).toHaveBeenCalledTimes(1);
  });

  it('should validate platform input', async () => {
    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform: '' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });

  it('should reject invalid platform', async () => {
    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform: 'InvalidPlatform' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    
    const data = await response.json();
    expect(data).toHaveProperty('error', 'Invalid platform');
  });

  it('should handle generation errors', async () => {
    mockGenerateObject.mockRejectedValue(new Error('AI error'));

    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform: 'iOS' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
    
    const data = await response.json();
    expect(data).toHaveProperty('error', 'Failed to generate idea');
  });
});
