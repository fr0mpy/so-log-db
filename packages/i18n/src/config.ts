export const locales = ['en', 'fr'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
}

// Namespaces available for each app
export const namespaces = {
  shell: ['common', 'shell'] as const,
  connectors: ['common', 'connectors'] as const,
}

// Cookie name for locale persistence across multi-zone navigation
export const LOCALE_COOKIE = 'NEXT_LOCALE'
