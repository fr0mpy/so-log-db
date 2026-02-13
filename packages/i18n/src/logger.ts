type MissingTranslation = {
  key: string
  locale: string
  namespace?: string
  timestamp: string
}

const missingTranslations: MissingTranslation[] = []
let reportTimeout: ReturnType<typeof setTimeout> | undefined

/**
 * Log a missing translation key.
 * In development: console.warn immediately
 * In production: batch and optionally report to monitoring
 */
export function logMissingTranslation(
  key: string,
  locale: string,
  namespace?: string
): void {
  const entry: MissingTranslation = {
    key,
    locale,
    namespace,
    timestamp: new Date().toISOString(),
  }

  missingTranslations.push(entry)

  // Console warning in development
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      `[i18n] Missing translation:\n` +
        `  Key: ${namespace ? `${namespace}.${key}` : key}\n` +
        `  Locale: ${locale}`
    )
  }

  // In production, batch and report (optional endpoint)
  if (process.env.NODE_ENV === 'production' && process.env.I18N_REPORT_ENDPOINT) {
    debouncedReportMissing()
  }
}

/**
 * Debounced reporter for production - batches missing translations
 */
function debouncedReportMissing(): void {
  if (reportTimeout) {
    clearTimeout(reportTimeout)
  }

  reportTimeout = setTimeout(() => {
    const endpoint = process.env.I18N_REPORT_ENDPOINT
    if (!endpoint || missingTranslations.length === 0) return

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ translations: [...missingTranslations] }),
    }).catch(() => {
      // Silently fail - don't break app for monitoring failures
    })

    missingTranslations.length = 0
  }, 5000)
}

/**
 * Get all missing translations recorded in this session.
 * Useful for testing or debugging.
 */
export function getMissingTranslations(): MissingTranslation[] {
  return [...missingTranslations]
}

/**
 * Clear recorded missing translations.
 * Useful for testing.
 */
export function clearMissingTranslations(): void {
  missingTranslations.length = 0
}

/**
 * Create onError handler for next-intl configuration.
 * Returns formatted fallback string for missing keys.
 */
export function createOnError(locale: string) {
  return (error: { code: string; key?: string }) => {
    if (error.code === 'MISSING_MESSAGE' && error.key) {
      logMissingTranslation(error.key, locale)
    }
  }
}

/**
 * Create getMessageFallback handler for next-intl configuration.
 * Returns visible placeholder for missing keys in development.
 */
export function createGetMessageFallback() {
  return ({ namespace, key }: { namespace?: string; key: string }) => {
    const fullKey = namespace ? `${namespace}.${key}` : key
    // Return visible placeholder so missing keys are obvious
    return `[MISSING: ${fullKey}]`
  }
}
