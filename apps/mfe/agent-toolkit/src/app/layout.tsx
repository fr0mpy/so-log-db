import { NextIntlClientProvider } from 'next-intl'
import { FontSetup } from '@stackone-ui/core/fonts'
import { ThemeProvider } from '@stackone-ui/core/providers'
import {
  getThemeFromCookies,
  ThemeInitScript,
} from '@stackone-ui/core/providers/server'
import { ToastProvider } from '@stackone-ui/core/toast'
import { getLocale, getMessages } from '@stackone/i18n'
import {
  Sidebar,
  SidebarProvider,
  MainContent,
  SkipLinks,
  MobileWarning,
} from '@/components'
import { ProviderIconPreloader } from '@/components/ProviderIcon'
import type { Metadata, Viewport } from 'next'
import '@/styles/log-table.css'
import './globals.css'

/** SEO: Base metadata inherited by all pages */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com',
  ),
  title: {
    default: 'StackOne Log Dashboard',
    template: '%s | StackOne',
  },
  description:
    'Real-time log viewing, search, and data exploration for distributed systems',
  keywords: [
    'logs',
    'monitoring',
    'observability',
    'distributed tracing',
    'debugging',
  ],
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
        <ThemeInitScript />
      </head>
      <body className={FontSetup.bodyClassName}>
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
