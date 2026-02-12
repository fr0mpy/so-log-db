import type { Metadata } from 'next'
import Link from 'next/link'
import { ThemeProvider } from '@stackone-ui/core/providers'
import { Button } from '@stackone-ui/core'
import './globals.css'
import { AppLayout } from '../styles'

export const metadata: Metadata = {
  title: 'StackOne Log Dashboard',
  description: 'Log viewing, search, and data exploration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className={AppLayout.container}>
            <aside className={AppLayout.sidebar.base}>
              <div className={AppLayout.sidebar.header}>
                <h1 className={AppLayout.sidebar.title}>StackOne</h1>
                <p className={AppLayout.sidebar.subtitle}>Connectors</p>
              </div>
              <nav className={AppLayout.sidebar.nav}>
                <Button variant="ghost" asChild>
                  <Link href="/">Dashboard</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/logs">Logs</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/search">Search</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/explore">Explore</Link>
                </Button>
              </nav>
            </aside>
            <main className={AppLayout.main}>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
