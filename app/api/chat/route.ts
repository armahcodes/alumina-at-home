import { handleChatStream } from '@mastra/ai-sdk';
import { createUIMessageStreamResponse } from 'ai';
import { mastra } from '@/lib/mastra';

/**
 * Chat API Route for Alumina Assistant
 * 
 * Based on: https://mastra.ai/guides/v1/getting-started/next-js
 */

export async function POST(req: Request) {
  const params = await req.json();
  
  const stream = await handleChatStream({
    mastra,
    agentId: 'alumina-agent',
    params,
  });
  
  return createUIMessageStreamResponse({ stream });
}
