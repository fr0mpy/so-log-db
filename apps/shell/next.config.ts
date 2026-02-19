import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'
import path from 'path'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

export default (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER

  // MFE URLs for Multi-Zone routing
  // In dev mode, default to localhost; in prod, default to Vercel URLs
  const MFE_AGENT_TOOLKIT_URL =
    process.env.MFE_AGENT_TOOLKIT_URL ||
    (isDev ? 'http://localhost:3001' : 'https://stackone-agent-toolkit.vercel.app')
  const MFE_COMPONENT_LIBRARY_URL =
    process.env.MFE_COMPONENT_LIBRARY_URL ||
    (isDev ? 'http://localhost:3002' : 'https://stackone-component-library.vercel.app')
  const MFE_DESIGN_REVIEW_URL =
    process.env.MFE_DESIGN_REVIEW_URL ||
    (isDev ? 'http://localhost:3003' : 'https://stackone-design-review.vercel.app')

  const nextConfig: NextConfig = {
    experimental: {
      reactCompiler: true,
    },

    transpilePackages: ['@stackone-ui/core'],

    webpack: (config) => {
      // Resolve aliases - shell src takes priority, falls back to UI library
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, '../../packages/ui-library/core/src'),
        ],
        '@harness': path.resolve(__dirname, '../../packages/ui-library/harness/src'),
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

  return withNextIntl(nextConfig)
}
