import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ThemeProvider } from '@stackone-ui/core/providers'
import { getThemeFromCookies, ThemeInitScript } from '@stackone-ui/core/providers/server'
import { FontSetup } from '@stackone-ui/core/fonts'
import { GallerySidebar, MobileWarning, LayoutStyles as S } from '../components'
import { ScrollArea } from '@stackone-ui/core/scroll-area'
import './globals.css'

/** SEO: Base metadata */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'),
  title: {
    default: 'Component Library',
    template: '%s | Component Library',
  },
  description: 'StackOne UI component library and design system documentation',
  keywords: ['components', 'ui', 'design system', 'react', 'tailwind'],
  robots: {
    index: true,
    follow: true,
  },
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
            <div className={S.container}>
              <GallerySidebar />
              <main className={S.main}>
                <ScrollArea className={S.scrollArea}>
                  {children}
                </ScrollArea>
              </main>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
