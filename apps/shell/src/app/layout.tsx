import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import { Providers } from './providers'
import { fontSans, fontMono } from '@stackone-ui/core/fonts/next-loader'
import { getThemeFromCookies } from '@stackone-ui/core/providers/server'
import { MFE_ORIGINS } from '@/lib/mfe-urls'
import '@stackone-ui/core/themes/base.css'
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

/** Combined font CSS variable classes */
const fontVariables = `${fontSans.variable} ${fontMono.variable}`

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
      className={`${fontVariables}${isDark ? ' dark' : ''}`}
      suppressHydrationWarning
    >
      <head>
        {/* Minimal script ONLY for system preference detection */}
        {theme === 'system' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){if(window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.classList.add('dark')}})()`,
            }}
          />
        )}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {/* Preconnect to MFE domains for faster cross-zone navigation */}
        {MFE_ORIGINS.map((origin) => (
          <link key={origin} rel="preconnect" href={origin} />
        ))}
      </head>
      <body className={fontSans.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers initialTheme={theme}>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
