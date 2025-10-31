import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

export const runtime = 'edge';

const appIdeaSchema = z.object({
  name: z.string().describe('App name'),
  tagline: z.string().describe('One-line description'),
  description: z.string().describe('Detailed description'),
  platforms: z.array(z.string()).describe('Target platforms'),
  category: z.string().describe('App category'),
  features: z.array(z.string()).describe('Key features'),
  techStack: z.array(z.string()).describe('Recommended technologies'),
  gtmStrategy: z.string().describe('Go-to-market strategy'),
  monetization: z.string().describe('Revenue model'),
  targetAudience: z.string().describe('Target users'),
  uniqueValue: z.string().describe('Unique selling point'),
});

export async function POST(req: Request) {
  const { platform } = await req.json();

  const { object } = await generateObject({
    model: openai('gpt-4-turbo'),
    schema: appIdeaSchema,
    prompt: `Generate an innovative, practical app idea for ${platform} that leverages Apple ecosystem features.

Requirements:
- Must be unique and creative
- Should integrate with Apple frameworks (SwiftUI, SwiftData, CloudKit, HealthKit, etc)
- Include realistic GTM strategy
- Consider App Store guidelines
- Focus on user value

Platform: ${platform}`,
  });

  return Response.json(object);
}
