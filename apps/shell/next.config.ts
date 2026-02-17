import type { NextConfig } from 'next'
import path from 'path'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const MFE_URL = process.env.MFE_URL || 'http://localhost:3001'
const COMPONENT_LIBRARY_URL = process.env.COMPONENT_LIBRARY_URL || 'http://localhost:3002'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },

  transpilePackages: ['@stackone-ui/core'],

  webpack: (config) => {
    // Resolve @/ alias for UI library source files
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../../packages/ui-library/core/src'),
    }
    return config
  },

  // Multi-Zone: Proxy MFE requests to their respective servers
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/agent-toolkit/:path*',
          destination: `${MFE_URL}/agent-toolkit/:path*`,
        },
        {
          source: '/component-library/:path*',
          destination: `${COMPONENT_LIBRARY_URL}/component-library/:path*`,
        },
      ],
    }
  },
}

export default withNextIntl(nextConfig)
