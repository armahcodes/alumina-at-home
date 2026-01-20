import { Mastra } from '@mastra/core';
import { aluminaAgent } from './agents/alumina-agent';

/**
 * Mastra Configuration
 * 
 * Based on: https://mastra.ai/guides/v1/getting-started/next-js
 */
export const mastra = new Mastra({
  agents: {
    'alumina-agent': aluminaAgent,
  },
});
