import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { platform } = await req.json();

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    system: `You are an Apple ecosystem app idea generator. Generate innovative, practical app ideas for ${platform}.

Format your response as JSON:
{
  "name": "App Name",
  "tagline": "One-line description",
  "description": "Detailed description (2-3 sentences)",
  "platforms": ["iOS", "macOS", etc],
  "category": "Productivity/Health/Entertainment/etc",
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "techStack": ["SwiftUI", "SwiftData", "CloudKit", etc],
  "gtmStrategy": "Go-to-market approach (2-3 sentences)",
  "monetization": "Free/Freemium/Paid/Subscription",
  "targetAudience": "Who is this for?",
  "uniqueValue": "What makes this special?"
}

Be creative, practical, and focus on Apple ecosystem integration.`,
    prompt: `Generate an innovative app idea for ${platform}`,
  });

  return result.toDataStreamResponse();
}
