import type { NextConfig } from 'next'
import path from 'path'
import withBundleAnalyzer from '@next/bundle-analyzer'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const SHELL_URL = process.env.NEXT_PUBLIC_SHELL_URL || 'http://localhost:3000'

// Base URL for theme fetching (constructed at build time)
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3002')

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SHELL_URL: SHELL_URL,
    BRAND_THEME_URL: `${BASE_URL}/component-library/themes/stackone-green.json`,
  },
  experimental: {
    reactCompiler: true,
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
  },

  transpilePackages: ['@stackone-ui/core', '@stackone/i18n'],

  webpack: (config, { isServer }) => {
    // Resolve aliases for UI library and harness source files
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../../../packages/ui-library/core/src'),
      '@harness': path.resolve(__dirname, '../../../packages/ui-library/harness/src'),
    }

    // Split motion into separate chunk for lazy loading (client only)
    if (!isServer && config.optimization?.splitChunks) {
      const splitChunks = config.optimization.splitChunks as {
        cacheGroups?: Record<string, unknown>
      }
      splitChunks.cacheGroups = {
        ...splitChunks.cacheGroups,
        motion: {
          test: /[\\/]node_modules[\\/](motion|framer-motion)[\\/]/,
          name: 'motion',
          chunks: 'all',
          priority: 30,
        },
      }
    }

    return config
  },

  // Multi-Zone: MFE serves its routes under /component-library base path
  basePath: '/component-library',
}

export default withNextIntl(bundleAnalyzer(nextConfig))
