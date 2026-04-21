import { z } from 'zod'

// Morpheus Inference API model IDs
// trivial/simple: glm-5 (fast, cheap)
// moderate: glm-4.7-thinking (deep reasoning, 198K context)
// complex: kimi-k2.5 (most capable)
export const ROUTER_MODEL = 'glm-5'
export const DEFAULT_MODEL = 'glm-5'

export const agentConfigSchema = z.object({
  complexity: z.enum(['trivial', 'simple', 'moderate', 'complex'])
    .describe('trivial=greeting, simple=single lookup, moderate=multi-search, complex=deep analysis'),

  maxSteps: z.number().min(1).max(30)
    .describe('Agent iterations: 4 trivial, 8 simple, 15 moderate, 25 complex'),

  model: z.enum([
    'glm-5',
    'kimi-k2.5',
    'glm-4.7-thinking',
    'arcee-trinity-large-thinking',
    'gemma-4-31b',
  ]).describe('glm-5 for trivial/simple, glm-4.7-thinking for moderate, kimi-k2.5 for complex'),

  reasoning: z.string().max(200)
    .describe('Brief explanation of the classification'),
})

export type AgentConfig = z.infer<typeof agentConfigSchema>

export function getDefaultConfig(): AgentConfig {
  return {
    complexity: 'moderate',
    maxSteps: 15,
    model: 'glm-5',
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
