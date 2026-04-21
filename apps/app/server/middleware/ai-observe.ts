import { enterAIContext } from '@savoir/agent'

export default defineEventHandler(() => {
  enterAIContext(createMorpheusWrap())
})
