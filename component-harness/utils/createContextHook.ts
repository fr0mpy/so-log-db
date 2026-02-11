import { createContext, useContext, Context, Provider } from 'react'

/**
 * Factory to create a Context and associated hook with proper error handling.
 *
 * @param contextName - Display name for error messages
 * @returns [Context, useContext hook, Provider] tuple
 */
export function createContextHook<T>(
  contextName: string
): [Context<T | undefined>, () => T, Provider<T | undefined>] {
  const Context = createContext<T | undefined>(undefined)
  Context.displayName = contextName

  const useContextHook = (): T => {
    const context = useContext(Context)
    if (context === undefined) {
      throw new Error(
        `${contextName} must be used within a ${contextName}Provider`
      )
    }
    return context
  }

  return [Context, useContextHook, Context.Provider]
}

/**
 * Simpler version that just creates the hook from an existing context.
 *
 * @param context - The React Context
 * @param hookName - Display name for error messages
 * @returns Hook function
 */
export function createSafeContextHook<T>(
  context: Context<T | undefined>,
  hookName: string
): () => T {
  return (): T => {
    const value = useContext(context)
    if (value === undefined) {
      throw new Error(`${hookName} must be used within its provider`)
    }
    return value
  }
}
