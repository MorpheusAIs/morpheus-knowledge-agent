import { z } from 'zod'

// Morpheus Inference API model IDs
// trivial/simple: llama-3.3-70b (fast, cheap)
// moderate: glm-5
// complex: kimi-k2.5 (most capable)
export const ROUTER_MODEL = 'llama-3.3-70b'
export const DEFAULT_MODEL = 'llama-3.3-70b'

export const agentConfigSchema = z.object({
  complexity: z.enum(['trivial', 'simple', 'moderate', 'complex'])
    .describe('trivial=greeting, simple=single lookup, moderate=multi-search, complex=deep analysis'),

  maxSteps: z.number().min(1).max(30)
    .describe('Agent iterations: 4 trivial, 8 simple, 15 moderate, 25 complex'),

  model: z.enum([
    'llama-3.3-70b',
    'glm-5',
    'kimi-k2.5',
  ]).describe('llama-3.3-70b for trivial/simple, glm-5 for moderate, kimi-k2.5 for complex'),

  reasoning: z.string().max(200)
    .describe('Brief explanation of the classification'),
})

export type AgentConfig = z.infer<typeof agentConfigSchema>

export function getDefaultConfig(): AgentConfig {
  return {
    complexity: 'moderate',
    maxSteps: 15,
    model: 'llama-3.3-70b',
    reasoning: 'Default fallback configuration',
  }
}

// No gateway fallbacks needed — Morpheus handles routing internally
export function buildProviderOptions(
  _model: string,
  _metadata?: { userId?: string, tags?: string[] },
): undefined {
  return undefined
}

export function buildGatewayProviderOptions(
  _metadata?: { userId?: string, tags?: string[] },
): undefined {
  return undefined
}
