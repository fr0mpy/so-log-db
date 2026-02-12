/**
 * Theme-specific logger built on the generic logger.
 * Provides convenience methods for theme-related logging.
 */

import { createLogger, configureLogger } from '@stackone/utils'

const log = createLogger('Theme')

/**
 * Theme logger with specialized methods.
 */
export const themeLogger = {
  debug: log.debug,
  info: log.info,
  warn: log.warn,
  error: log.error,

  /**
   * Log multiple missing tokens as a warning.
   */
  warnMissingTokens: (themeName: string, tokens: string[]) => {
    if (tokens.length === 0) return
    log.warn(`Missing ${tokens.length} token(s) in "${themeName}" — using fallbacks`, { tokens })
  },

  /**
   * Log a theme fetch error.
   */
  errorFetchFailed: (themeName: string, status: number, url: string) => {
    log.error(`Failed to fetch theme "${themeName}"`, {
      status,
      url,
      hint: status === 404
        ? 'Theme file not found. Check the file exists in public/themes/'
        : 'Network or server error',
    })
  },

  /**
   * Log successful theme application.
   */
  infoThemeApplied: (themeName: string, mode: 'light' | 'dark') => {
    log.info(`Applied theme "${themeName}"`, { mode })
  },

  /**
   * Log base theme initialization.
   */
  infoBaseThemeInit: () => {
    log.info('Base theme initialized')
  },
}

// Re-export configure for backwards compatibility
export { configureLogger }
