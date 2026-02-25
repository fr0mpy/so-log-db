import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ThemeProvider } from '@stackone-ui/core/providers'
import { getThemeFromCookies, ThemeScript } from '@stackone-ui/core/providers/server'
import { fontSans, fontMono } from '@stackone-ui/core/fonts/next-loader'
import { MobileWarning } from '../components'
import '@stackone-ui/core/themes/base.css'
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
        {/* Prevents theme flash by setting class and brand colors before React hydrates */}
        <ThemeScript brandThemeUrl={`${process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3003')}/design-review/themes/stackone-green.json`} />
      </head>
      <body className={fontSans.className}>
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
