import type { NextConfig } from 'next'
import path from 'path'
import withBundleAnalyzer from '@next/bundle-analyzer'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

// Shell URL for cross-zone navigation back to home
const SHELL_URL = process.env.NEXT_PUBLIC_SHELL_URL || 'http://localhost:3000'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SHELL_URL: SHELL_URL,
  },
  experimental: {
    reactCompiler: true,
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },

  transpilePackages: ['@stackone-ui/core', '@stackone/i18n'],

  webpack: (config, { isServer }) => {
    // Resolve @/ alias for UI library source files
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../../../packages/ui-library/core/src'),
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

  // Multi-Zone: MFE serves its routes under /design-review base path
  basePath: '/design-review',
}

export default withNextIntl(bundleAnalyzer(nextConfig))
