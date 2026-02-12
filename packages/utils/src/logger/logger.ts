/**
 * Simple application logger.
 *
 * @example
 * import { createLogger } from '@stackone/utils'
 *
 * const log = createLogger('MyFeature')
 * log.info('Started', { count: 5 })
 * log.error('Failed', { code: 500 })
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface Logger {
  debug: (message: string, data?: object) => void
  info: (message: string, data?: object) => void
  warn: (message: string, data?: object) => void
  error: (message: string, data?: object) => void
}

let enabled = true

export function configureLogger(opts: { enabled?: boolean }): void {
  if (opts.enabled !== undefined) enabled = opts.enabled
}

export function createLogger(namespace: string): Logger {
  const log = (level: LogLevel, msg: string, data?: object) => {
    if (!enabled) return
    const fn = console[level] || console.log
    data ? fn(`[${namespace}] ${msg}`, data) : fn(`[${namespace}] ${msg}`)
  }

  return {
    debug: (msg, data) => log('debug', msg, data),
    info: (msg, data) => log('info', msg, data),
    warn: (msg, data) => log('warn', msg, data),
    error: (msg, data) => log('error', msg, data),
  }
}
