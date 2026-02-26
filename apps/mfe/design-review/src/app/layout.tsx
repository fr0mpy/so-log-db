import { NextIntlClientProvider } from 'next-intl'
import { FontSetup } from '@stackone-ui/core/theming'
import { ThemeProvider } from '@stackone-ui/core/providers'
import { getThemeFromCookies, ThemeInitScript } from '@stackone-ui/core/providers/server'
import { getLocale, getMessages } from '@stackone/i18n'
import { MobileWarning } from '../components'
import type { Metadata, Viewport } from 'next'
import './globals.css'

/** SEO: Base metadata */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'),
  title: {
    default: 'Design Review',
    template: '%s | Design Review',
  },
  description: 'Review and annotate UI designs with your team',
  icons: {
    icon: '/favicon.png',
  },
}

/** SEO: Viewport configuration */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
      </head>
      <body className={FontSetup.bodyClassName}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider initialTheme={theme}>
            <MobileWarning />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
