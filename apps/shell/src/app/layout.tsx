import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import { Providers } from './providers'
import { FontSetup } from '@stackone-ui/core/fonts'
import { getThemeFromCookies, ThemeInitScript } from '@stackone-ui/core/providers/server'
import { MFE_ORIGINS } from '@/lib/mfe-urls'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/favicon.png',
      apple: '/favicon.png',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  // Server-side theme detection from cookie
  const theme = await getThemeFromCookies()
  const isDark = theme === 'dark'

  return (
    <html
      lang={locale}
      className={`${FontSetup.htmlClassName}${isDark ? ' dark' : ''}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevents theme flash by setting .dark class before React hydrates */}
        <ThemeInitScript />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {/* Preconnect to MFE domains for faster cross-zone navigation */}
        {MFE_ORIGINS.map((origin) => (
          <link key={origin} rel="preconnect" href={origin} />
        ))}
      </head>
      <body className={FontSetup.bodyClassName}>
        <NextIntlClientProvider messages={messages}>
          <Providers initialTheme={theme}>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
