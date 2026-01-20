import { getAluminaAgent } from '@/lib/mastra';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  userContext?: {
    name?: string;
    currentStreak?: number;
    level?: number;
    totalPoints?: number;
    completedProtocols?: string[];
    goals?: string[];
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { messages, userContext } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    // Get the agent (loaded lazily with configured provider)
    const agent = await getAluminaAgent();

    // Build system context with user personalization
    let systemContext = '';
    if (userContext) {
      const contextParts = [];
      if (userContext.name) {
        contextParts.push(`The user's name is ${userContext.name}.`);
      }
      if (userContext.currentStreak !== undefined) {
        contextParts.push(`They have a current streak of ${userContext.currentStreak} days.`);
      }
      if (userContext.level !== undefined) {
        contextParts.push(`They are at level ${userContext.level}.`);
      }
      if (userContext.totalPoints !== undefined) {
        contextParts.push(`They have earned ${userContext.totalPoints} total points.`);
      }
      if (userContext.completedProtocols && userContext.completedProtocols.length > 0) {
        contextParts.push(`They have completed these protocols today: ${userContext.completedProtocols.join(', ')}.`);
      }
      if (userContext.goals && userContext.goals.length > 0) {
        contextParts.push(`Their goals are: ${userContext.goals.join(', ')}.`);
      }
      
      if (contextParts.length > 0) {
        systemContext = `User Context:\n${contextParts.join('\n')}`;
      }
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    
    // Build the prompt with context
    const prompt = systemContext 
      ? `${systemContext}\n\nUser: ${lastMessage.content}`
      : lastMessage.content;

    // Generate response using string input
    const response = await agent.generate(prompt);

    return NextResponse.json({
      message: {
        role: 'assistant',
        content: response.text || 'I apologize, but I was unable to generate a response. Please try again.',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Return a fallback response for demo purposes if API fails
    return NextResponse.json({
      message: {
        role: 'assistant',
        content: "Hi! I'm Alumina, your longevity assistant. I'm here to help you optimize your health and wellbeing. To enable AI responses, please configure your AI provider in .env.local (AI_PROVIDER and the corresponding API key). What would you like to know about protocols, supplements, or your health journey?",
      },
    });
  }
}
