import { createOpenAICompatible } from '@ai-sdk/openai-compatible'

/**
 * Morpheus Inference API provider (OpenAI-compatible).
 * Base URL: https://api.mor.org/api/v1
 * Get your API key at https://app.mor.org
 */
export function createMorpheusProvider() {
  const apiKey = process.env.MORPHEUS_API_KEY
  if (!apiKey) {
    throw new Error('MORPHEUS_API_KEY environment variable is not set. Get your key at https://app.mor.org')
  }

  return createOpenAICompatible({
    name: 'morpheus',
    baseURL: 'https://api.mor.org/api/v1',
    apiKey,
  })
}

/**
 * Returns a wrap function that resolves model IDs through the Morpheus provider.
 * Compatible with the enterAIContext wrap signature.
 */
export function createMorpheusWrap() {
  const morpheus = createMorpheusProvider()
  return (model: string) => morpheus(model)
}
