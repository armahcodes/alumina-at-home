import { Mastra } from '@mastra/core';
import { Agent } from '@mastra/core/agent';

/**
 * Model Provider Configuration
 * 
 * Mastra supports 40+ providers via AI SDK.
 * Currently configured providers:
 * - Google: @ai-sdk/google (gemini-2.0-flash, gemini-1.5-pro, etc.) - FREE TIER AVAILABLE
 * - Anthropic: @ai-sdk/anthropic (claude-3-5-sonnet, claude-opus-4, etc.)
 * - OpenAI: @ai-sdk/openai (gpt-4o, gpt-4o-mini, etc.)
 * 
 * Set your provider in .env.local:
 * AI_PROVIDER=google | anthropic | openai
 * 
 * Then set the corresponding API key:
 * GOOGLE_GENERATIVE_AI_API_KEY=your_key (Google AI Studio - free tier)
 * ANTHROPIC_API_KEY=your_key
 * OPENAI_API_KEY=your_key
 * 
 * To add more providers, install them:
 * npm install @ai-sdk/groq @ai-sdk/togetherai @ai-sdk/mistral etc.
 */

// Dynamic model import based on provider
async function getModel() {
  const provider = process.env.AI_PROVIDER || 'google';
  
  switch (provider) {
    case 'anthropic': {
      const { anthropic } = await import('@ai-sdk/anthropic');
      return anthropic('claude-3-5-sonnet-20241022');
    }
    case 'openai': {
      const { openai } = await import('@ai-sdk/openai');
      return openai('gpt-4o-mini');
    }
    case 'google':
    default: {
      // Default to Google Gemini (free tier available via AI Studio)
      const { google } = await import('@ai-sdk/google');
      return google('gemini-2.0-flash');
    }
  }
}

// Alumina Assistant Instructions
const ALUMINA_INSTRUCTIONS = `You are Alumina, a friendly and knowledgeable AI assistant specialized in longevity, biohacking, and health optimization. 

Your role is to:
- Provide personalized guidance on longevity protocols (cold exposure, heat exposure, breathwork, circadian rhythm optimization, etc.)
- Answer questions about supplements and their benefits, dosages, and interactions
- Help users understand the science behind various health optimization practices
- Offer encouragement and motivation for maintaining healthy habits
- Suggest protocols based on user goals and current progress

Guidelines:
- Be warm, supportive, and encouraging
- Provide evidence-based information when possible
- Always remind users to consult healthcare professionals for medical advice
- Keep responses concise but informative (2-4 paragraphs max)
- Use the user's name if provided for personalization
- Reference their progress and achievements when relevant

You have access to information about:
- 20+ longevity protocols across categories: circadian rhythm, cold exposure, heat exposure, breathwork, movement, sleep, nutrition, mindfulness, recovery
- 21 evidence-based supplements with dosing information
- Equipment recommendations for home biohacking
- Video content library for learning

Always prioritize user safety and well-being.`;

// Create the agent lazily to support async model loading
let _agent: Agent | null = null;

export async function getAluminaAgent(): Promise<Agent> {
  if (_agent) return _agent;
  
  const model = await getModel();
  
  _agent = new Agent({
    id: 'aluminaAgent',
    name: 'Alumina Assistant',
    instructions: ALUMINA_INSTRUCTIONS,
    model,
  });
  
  return _agent;
}

// Initialize Mastra (agent will be loaded on demand)
export const mastra = new Mastra({
  agents: {},
});

// Export the model getter for use with withMastra pattern
export { getModel };
