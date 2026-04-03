import { handleChatStream } from '@mastra/ai-sdk';
import { createUIMessageStreamResponse } from 'ai';
import { mastra } from '@/lib/mastra';
import { memory } from '@/lib/mastra/agents/alumina-agent';
import { getServerSession } from '@/lib/auth/session';

/**
 * Chat API Route for Alumina Assistant with Personalization
 * 
 * Uses Mastra memory system for:
 * - Thread-scoped conversation history
 * - Resource-scoped working memory (user profile)
 * 
 * Docs: https://mastra.ai/docs/memory/threads-and-resources
 */

interface UserContext {
  userId: string;
  threadId: string;
  name?: string;
  email?: string;
  experienceLevel?: string;
  availableTime?: number;
  budget?: string;
  goals?: string[];
  healthConditions?: string[];
  currentStreak?: number;
  totalPoints?: number;
  completedProtocols?: string[];
  supplements?: string[];
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const params = await req.json();
  const clientContext: UserContext | undefined = params.data?.userContext;

  const threadId = clientContext?.threadId || 'default-thread';
  const resourceId = session.user.id;

  const trustedContext: UserContext = {
    userId: resourceId,
    threadId,
    name: session.user.name ?? clientContext?.name,
    email: session.user.email ?? clientContext?.email,
    experienceLevel: clientContext?.experienceLevel,
    availableTime: clientContext?.availableTime,
    budget: clientContext?.budget,
    goals: clientContext?.goals,
    healthConditions: clientContext?.healthConditions,
    currentStreak: clientContext?.currentStreak,
    totalPoints: clientContext?.totalPoints,
    completedProtocols: clientContext?.completedProtocols,
    supplements: clientContext?.supplements,
  };

  try {
    const workingMemoryContent = buildWorkingMemory(trustedContext);
    await memory
      .updateWorkingMemory({
        threadId,
        resourceId,
        workingMemory: workingMemoryContent,
      })
      .catch(() => {
        // Thread might not exist yet — it will be created on first message
      });
  } catch {
    // Working memory update is non-critical; continue with chat
  }

  const stream = await handleChatStream({
    mastra,
    agentId: 'alumina-agent',
    params: {
      ...params,
      data: {
        ...params.data,
        userContext: trustedContext,
      },
      memory: {
        thread: threadId,
        resource: resourceId,
      },
    },
  });

  return createUIMessageStreamResponse({
    // Mastra / @ai-sdk versions can disagree on UIMessageChunk; runtime stream is valid.
    stream: stream as Parameters<typeof createUIMessageStreamResponse>[0]["stream"],
  });
}

/**
 * Build working memory content from user context
 */
function buildWorkingMemory(ctx: UserContext): string {
  const parts: string[] = [];
  
  parts.push('# User Profile');
  if (ctx.name) parts.push(`- Name: ${ctx.name}`);
  if (ctx.email) parts.push(`- Email: ${ctx.email}`);
  if (ctx.experienceLevel) parts.push(`- Experience Level: ${ctx.experienceLevel}`);
  if (ctx.availableTime) parts.push(`- Available Time: ${ctx.availableTime} minutes per day`);
  if (ctx.budget) parts.push(`- Budget Preference: ${ctx.budget}`);
  
  if (ctx.goals && ctx.goals.length > 0) {
    parts.push('\n# Health Goals');
    parts.push(`- Primary Goals: ${ctx.goals.join(', ')}`);
  }
  
  if (ctx.healthConditions && ctx.healthConditions.length > 0) {
    parts.push(`- Health Conditions: ${ctx.healthConditions.join(', ')}`);
  }
  
  parts.push('\n# Progress & Achievements');
  if (ctx.currentStreak !== undefined) parts.push(`- Current Streak: ${ctx.currentStreak} days`);
  if (ctx.totalPoints !== undefined) parts.push(`- Total Points: ${ctx.totalPoints}`);
  if (ctx.completedProtocols && ctx.completedProtocols.length > 0) {
    parts.push(`- Recent Protocols Completed: ${ctx.completedProtocols.join(', ')}`);
  }
  
  if (ctx.supplements && ctx.supplements.length > 0) {
    parts.push('\n# Preferences & Notes');
    parts.push(`- Supplements Currently Taking: ${ctx.supplements.join(', ')}`);
  }
  
  return parts.join('\n');
}
