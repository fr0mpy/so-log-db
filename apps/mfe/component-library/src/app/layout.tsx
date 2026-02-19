import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ThemeProvider, THEME_INIT_SCRIPT } from '@stackone-ui/core/providers'
import { fontSans, fontMono } from '@stackone-ui/core/fonts/next-loader'
import { GallerySidebar, LayoutStyles as S } from '../components'
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

/** Combined font CSS variable classes */
const fontVariables = `${fontSans.variable} ${fontMono.variable}`

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Inline script to set theme before React hydrates (prevents FOUC) */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className={fontSans.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
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
