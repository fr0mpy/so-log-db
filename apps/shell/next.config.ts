import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'
import path from 'path'
import withBundleAnalyzer from '@next/bundle-analyzer'
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER

  // MFE URLs for Multi-Zone routing
  // In dev mode, default to localhost; in prod, default to Vercel URLs
  const MFE_AGENT_TOOLKIT_URL =
    process.env.MFE_AGENT_TOOLKIT_URL
    || (isDev ? 'http://localhost:3001' : 'https://stackone-agent-toolkit.vercel.app')
  const MFE_COMPONENT_LIBRARY_URL =
    process.env.MFE_COMPONENT_LIBRARY_URL
    || (isDev ? 'http://localhost:3002' : 'https://stackone-component-library.vercel.app')
  const MFE_DESIGN_REVIEW_URL =
    process.env.MFE_DESIGN_REVIEW_URL
    || (isDev ? 'http://localhost:3003' : 'https://stackone-design-review.vercel.app')

  const nextConfig: NextConfig = {
    experimental: {
      reactCompiler: true,
      staleTimes: {
        dynamic: 0,
        static: 180,
      },
    },

    transpilePackages: ['@stackone-ui/core'],

    webpack: (config, { isServer }) => {
      // Resolve aliases - shell src takes priority, falls back to UI library
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, '../../packages/ui-library/core/src'),
        ],
        '@harness': path.resolve(__dirname, '../../packages/ui-library/harness/src'),
      }

      // Split heavy libraries into separate chunks (client only)
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
          recharts: {
            test: /[\\/]node_modules[\\/](recharts|d3-.*|victory-vendor)[\\/]/,
            name: 'recharts',
            chunks: 'all',
            priority: 25,
          },
          virtualizer: {
            test: /[\\/]node_modules[\\/]@tanstack[\\/]react-virtual[\\/]/,
            name: 'virtualizer',
            chunks: 'all',
            priority: 25,
          },
          lucide: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'lucide',
            chunks: 'all',
            priority: 20,
          },
        }
      }

      return config
    },

    async rewrites() {
      return [
        // Exact path matches (no trailing content)
        {
          source: '/agent-toolkit',
          destination: `${MFE_AGENT_TOOLKIT_URL}/agent-toolkit`,
        },
        {
          source: '/component-library',
          destination: `${MFE_COMPONENT_LIBRARY_URL}/component-library`,
        },
        {
          source: '/design-review',
          destination: `${MFE_DESIGN_REVIEW_URL}/design-review`,
        },
        // Wildcard path matches
        {
          source: '/agent-toolkit/:path*',
          destination: `${MFE_AGENT_TOOLKIT_URL}/agent-toolkit/:path*`,
        },
        {
          source: '/component-library/:path*',
          destination: `${MFE_COMPONENT_LIBRARY_URL}/component-library/:path*`,
        },
        {
          source: '/design-review/:path*',
          destination: `${MFE_DESIGN_REVIEW_URL}/design-review/:path*`,
        },
      ]
    },
  }

  return bundleAnalyzer(withNextIntl(nextConfig))
}
