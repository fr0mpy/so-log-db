import type { Metadata } from 'next'
import { Providers } from './providers'
import { MFE_URL } from '../lib/env'
import { fontSans, fontMono } from '@stackone-ui/core/fonts/next-loader'
import './globals.css'

export const metadata: Metadata = {
  title: 'StackOne',
  description: 'StackOne Shell Application',
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
      <head>
        <link rel="modulepreload" href={`${MFE_URL}/connectors`} />
      </head>
      <body className={fontSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
