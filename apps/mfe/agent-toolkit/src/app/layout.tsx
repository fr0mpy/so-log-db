import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ThemeProvider } from '@stackone-ui/core/providers'
import { fontSans, fontMono } from '@stackone-ui/core/fonts/next-loader'
import { Sidebar, SidebarProvider, MainContent, SkipLinks } from '@/components'
import { ProviderIconPreloader } from '@/components/ProviderIcon'
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
    icon: '/agent-toolkit/favicon.png',
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
      <body className={fontSans.className}>
        <NextIntlClientProvider messages={messages}>
          <SkipLinks />
          <ThemeProvider>
            <ProviderIconPreloader />
            <SidebarProvider>
              <Sidebar />
              <MainContent>{children}</MainContent>
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
