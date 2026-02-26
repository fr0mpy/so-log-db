import { NextIntlClientProvider } from 'next-intl'
import { getThemeFromCookies, ThemeInitScript } from '@stackone-ui/core/providers/server'
import { SpeculationRules } from '@stackone-ui/core/speculation-rules'
import { FontSetup } from '@stackone-ui/core/theming'
import { getLocale, getMessages, getTranslations } from '@stackone/i18n'
import { MFE_BASE_PATHS, MFE_ORIGINS } from '@/lib/mfe-urls'
import { Providers } from './providers'
import type { Metadata } from 'next'
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
        {MFE_ORIGINS.map((origin) =>
          <link key={origin} rel="preconnect" href={origin} />,
        )}
        {/* Speculation Rules for MFE prefetch/prerender (Chrome/Edge 109+) */}
        <SpeculationRules
          prefetchPaths={Object.values(MFE_BASE_PATHS).map((p) => `${p}/*`)}
        />
      </head>
      <body className={FontSetup.bodyClassName}>
        <NextIntlClientProvider messages={messages}>
          <Providers initialTheme={theme}>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
