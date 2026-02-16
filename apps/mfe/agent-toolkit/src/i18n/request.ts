import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'
import {
  locales,
  defaultLocale,
  LOCALE_COOKIE,
  createOnError,
  createGetMessageFallback,
  getAgentToolkitMessages,
  type Locale,
} from '@stackone/i18n'

export default getRequestConfig(async () => {
  // Read locale from cookie (no middleware needed)
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value

  // Validate locale, fallback to default if invalid
  const locale =
    cookieLocale && locales.includes(cookieLocale as Locale)
      ? (cookieLocale as Locale)
      : defaultLocale

  return {
    locale,
    messages: getAgentToolkitMessages(locale),
    onError: createOnError(locale),
    getMessageFallback: createGetMessageFallback(),
  }
})
