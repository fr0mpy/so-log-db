import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ThemeProvider } from '@stackone-ui/core/providers'
import { getThemeFromCookies } from '@stackone-ui/core/providers/server'
import { ToastProvider } from '@stackone-ui/core/toast'
import { fontSans, fontMono } from '@stackone-ui/core/fonts/next-loader'
import { Sidebar, SidebarProvider, MainContent, SkipLinks, MobileWarning } from '@/components'
import { ProviderIconPreloader } from '@/components/ProviderIcon'
import '@stackone-ui/core/themes/base.css'
import './globals.css'

/** SEO: Base metadata inherited by all pages */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'),
  title: {
    default: 'StackOne Log Dashboard',
    template: '%s | StackOne',
  },
  description: 'Real-time log viewing, search, and data exploration for distributed systems',
  keywords: ['logs', 'monitoring', 'observability', 'distributed tracing', 'debugging'],
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
      </head>
      <body className={fontSans.className}>
        <NextIntlClientProvider messages={messages}>
          <SkipLinks />
          <ThemeProvider initialTheme={theme}>
            <ToastProvider>
              <MobileWarning />
              <ProviderIconPreloader />
              <SidebarProvider>
                <Sidebar />
                <MainContent>{children}</MainContent>
              </SidebarProvider>
            </ToastProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
