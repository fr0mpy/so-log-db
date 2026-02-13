import type { Locale } from './config'
import type { AbstractIntlMessages } from 'next-intl'

// Import all message files statically
import enCommon from '../messages/en/common.json'
import enShell from '../messages/en/shell.json'
import enConnectors from '../messages/en/connectors.json'
import frCommon from '../messages/fr/common.json'
import frShell from '../messages/fr/shell.json'
import frConnectors from '../messages/fr/connectors.json'

const messages = {
  en: {
    common: enCommon,
    shell: enShell,
    connectors: enConnectors,
  },
  fr: {
    common: frCommon,
    shell: frShell,
    connectors: frConnectors,
  },
} as const

export type MessageNamespace = 'common' | 'shell' | 'connectors'

/**
 * Get messages for a specific locale and namespace(s).
 * Merges multiple namespaces into a single object.
 */
export function getMessages(
  locale: Locale,
  namespaces: MessageNamespace[]
): AbstractIntlMessages {
  const result: AbstractIntlMessages = {}

  for (const ns of namespaces) {
    Object.assign(result, messages[locale]?.[ns] ?? messages.en[ns])
  }

  return result
}

/**
 * Get Shell-specific messages (common + shell namespaces)
 */
export function getShellMessages(locale: Locale): AbstractIntlMessages {
  return getMessages(locale, ['common', 'shell'])
}

/**
 * Get Connectors MFE messages (common + connectors namespaces)
 */
export function getConnectorsMessages(locale: Locale): AbstractIntlMessages {
  return getMessages(locale, ['common', 'connectors'])
}
