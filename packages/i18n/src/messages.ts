import type { Locale } from './config'
import type { AbstractIntlMessages } from 'next-intl'

// Import all message files statically
import enCommon from '../messages/en/common.json'
import enShell from '../messages/en/shell.json'
import enAgentToolkit from '../messages/en/agent-toolkit.json'
import frCommon from '../messages/fr/common.json'
import frShell from '../messages/fr/shell.json'
import frAgentToolkit from '../messages/fr/agent-toolkit.json'

const messages = {
  en: {
    common: enCommon,
    shell: enShell,
    'agent-toolkit': enAgentToolkit,
  },
  fr: {
    common: frCommon,
    shell: frShell,
    'agent-toolkit': frAgentToolkit,
  },
} as const

export type MessageNamespace = 'common' | 'shell' | 'agent-toolkit'

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
 * Get Shell messages (common + shell + agent-toolkit namespaces)
 * Includes all namespaces for the unified app
 */
export function getShellMessages(locale: Locale): AbstractIntlMessages {
  return getMessages(locale, ['common', 'shell', 'agent-toolkit'])
}

/**
 * Get Agent Toolkit MFE messages (common + agent-toolkit namespaces)
 */
export function getAgentToolkitMessages(locale: Locale): AbstractIntlMessages {
  return getMessages(locale, ['common', 'agent-toolkit'])
}
