import { Mastra } from '@mastra/core';
import { aluminaAgent, storage } from './agents/alumina-agent';

/**
 * Mastra Configuration with Memory
 * 
 * Based on: https://mastra.ai/guides/v1/getting-started/next-js
 * Memory docs: https://mastra.ai/docs/memory/overview
 */
export const mastra = new Mastra({
  agents: {
    'alumina-agent': aluminaAgent,
  },
  storage, // Shared storage for memory persistence
});
