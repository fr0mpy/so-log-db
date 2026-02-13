import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { ThemeProvider } from '@stackone-ui/core/providers'
import { Spinner } from '@stackone-ui/core/spinner'
import { fontSans, fontMono } from '@stackone-ui/core/fonts/next-loader'
import './globals.css'
import { AppLayout, LoadingStyles } from '../styles'
import { NavLink } from '../components'

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
}

/** SEO: Viewport configuration */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

/** Combined font CSS variable classes */
const fontVariables = `${fontSans.variable} ${fontMono.variable}`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className={fontSans.className}>
        <ThemeProvider>
          <div className={AppLayout.container}>
            <aside className={AppLayout.sidebar.base}>
              <div className={AppLayout.sidebar.header}>
                <h1 className={AppLayout.sidebar.title}>StackOne</h1>
                <p className={AppLayout.sidebar.subtitle}>Connectors</p>
              </div>
              <nav className={AppLayout.sidebar.nav}>
                <NavLink href="/">Dashboard</NavLink>
                <NavLink href="/logs">Logs</NavLink>
                <NavLink href="/search">Search</NavLink>
                <NavLink href="/explore">Explore</NavLink>
              </nav>
            </aside>
            <main className={AppLayout.main}>
              <Suspense fallback={<div className={LoadingStyles.page}><Spinner size="lg" /></div>}>
                {children}
              </Suspense>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
