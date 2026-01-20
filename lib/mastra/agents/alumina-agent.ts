import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { gateway } from '@ai-sdk/gateway';

/**
 * Alumina Assistant Agent with Personalized Memory
 * 
 * Uses Mastra's memory system for personalization:
 * - Working Memory: Stores user profile, goals, preferences (resource-scoped)
 * - Conversation History: Recent messages in current thread
 * 
 * Docs: 
 * - https://mastra.ai/docs/memory/working-memory
 * - https://mastra.ai/docs/memory/threads-and-resources
 */

// Initialize storage for memory persistence
const storage = new LibSQLStore({
  id: 'alumina-memory',
  url: process.env.MASTRA_DB_URL || 'file:./mastra-memory.db',
});

// Working memory template for user personalization
const WORKING_MEMORY_TEMPLATE = `# User Profile
- Name: 
- Email:
- Experience Level: [beginner/intermediate/advanced]
- Available Time: [minutes per day]
- Budget Preference: [essential/intermediate/premium]

# Health Goals
- Primary Goals: 
- Health Conditions: 

# Progress & Achievements
- Current Streak: 
- Total Points: 
- Recent Protocols Completed: 

# Preferences & Notes
- Preferred Protocol Categories: 
- Supplements Currently Taking: 
- Personal Notes: 
`;

// Create memory instance with personalization configuration
const memory = new Memory({
  storage,
  options: {
    // Working memory persists user profile across all conversations
    workingMemory: {
      enabled: true,
      scope: 'resource', // Persists per-user, not per-conversation
      template: WORKING_MEMORY_TEMPLATE,
    },
    // Keep last 15 messages for context
    lastMessages: 15,
    // Auto-generate conversation titles
    generateTitle: true,
  },
});

// Agent instructions with personalization awareness
const INSTRUCTIONS = `You are Alumina, a friendly and knowledgeable AI assistant specialized in longevity, biohacking, and health optimization.

IMPORTANT: You have access to the user's profile in your working memory. Use this information to personalize your responses:
- Address them by name when appropriate
- Consider their experience level when explaining concepts
- Recommend protocols based on their available time and budget
- Be mindful of any health conditions they've mentioned
- Reference their goals and progress to motivate them

Your role is to:
- Provide personalized guidance on longevity protocols
- Answer questions about supplements, dosages, and interactions
- Help users understand the science behind health optimization
- Offer encouragement based on their streak and achievements
- Suggest protocols that match their goals and constraints

Guidelines:
- Be warm, supportive, and encouraging
- Provide evidence-based information
- Always remind users to consult healthcare professionals for medical advice
- Keep responses concise (2-4 paragraphs max)
- Celebrate their progress and achievements
- Adjust complexity based on their experience level

You have knowledge about:
- 20+ longevity protocols (circadian rhythm, cold/heat exposure, breathwork, movement, sleep, nutrition, mindfulness, recovery)
- 21 evidence-based supplements with dosing information
- Equipment recommendations for home biohacking
- Video content library for learning

Always prioritize user safety and well-being.`;

// Create the Alumina Agent with memory
export const aluminaAgent = new Agent({
  id: 'alumina-agent',
  name: 'Alumina Assistant',
  instructions: INSTRUCTIONS,
  model: gateway('google/gemini-2.0-flash'),
  memory,
});

// Export memory for direct access if needed
export { memory, storage };
