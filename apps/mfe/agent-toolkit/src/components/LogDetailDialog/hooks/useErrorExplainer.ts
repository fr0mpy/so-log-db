import { useState, useCallback } from 'react'
import type { ErrorExplainerState, UseErrorExplainerReturn } from '../types'

/** Initial state for error explainer */
const INITIAL_STATE: ErrorExplainerState = {
  status: 'idle',
}

/** Mock delay for AI generation simulation */
const GENERATION_DELAY = 2000

/**
 * Hook for managing AI-powered error explanation state
 *
 * This is currently a mock implementation that simulates
 * an AI-powered error explanation feature.
 *
 * @returns Object with state, generate, submitFeedback, and reset functions
 *
 * @example
 * ```tsx
 * const { state, generate, submitFeedback } = useErrorExplainer()
 *
 * if (state.status === 'idle') {
 *   return <button onClick={generate}>Generate</button>
 * }
 * ```
 */
export function useErrorExplainer(): UseErrorExplainerReturn {
  const [state, setState] = useState<ErrorExplainerState>(INITIAL_STATE)

  const generate = useCallback(async () => {
    setState({ status: 'generating' })

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, GENERATION_DELAY))

    // Mock response - in production this would call an AI API
    setState({
      status: 'complete',
      explanation: `The 401 Unauthorized error indicates that the request lacks valid authentication credentials for the target resource.

**Possible causes:**
1. The API key or access token has expired
2. The Authorization header is missing or malformed
3. The account associated with the credentials has been deactivated
4. Insufficient permissions for the requested endpoint

**Resolution steps:**
1. Verify your API key is still valid in your provider dashboard
2. Check that the Authorization header format is correct (e.g., "Bearer <token>")
3. Regenerate the API key if it has expired
4. Contact the provider support if the issue persists`,
      sources: [
        { title: 'HTTP 401 Unauthorized', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401' },
        { title: 'Provider API Documentation', url: '#' },
      ],
    })
  }, [])

  const submitFeedback = useCallback((feedback: 'positive' | 'negative') => {
    setState(prev => ({
      ...prev,
      feedback,
    }))
    // In production, this would send feedback to analytics
  }, [])

  const reset = useCallback(() => {
    setState(INITIAL_STATE)
  }, [])

  return { state, generate, submitFeedback, reset }
}
