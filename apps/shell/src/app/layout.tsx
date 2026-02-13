import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import { Providers } from './providers'
import { MFE_URL } from '../lib/env'
import { fontSans, fontMono } from '@stackone-ui/core/fonts/next-loader'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/favicon.png',
      apple: '/favicon.png',
    },
  }
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
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="modulepreload" href={`${MFE_URL}/connectors`} />
      </head>
      <body className={fontSans.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
