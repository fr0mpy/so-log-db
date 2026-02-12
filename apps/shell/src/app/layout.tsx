import type { Metadata } from 'next'
import { Providers } from './providers'
import { MFE_URL } from '../lib/env'
import './globals.css'

export const metadata: Metadata = {
  title: 'StackOne',
  description: 'StackOne Shell Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="modulepreload" href={`${MFE_URL}/connectors`} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
