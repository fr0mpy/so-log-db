import type { NextConfig } from 'next'
import path from 'path'

const MFE_URL = process.env.MFE_URL || 'http://localhost:3001'

const nextConfig: NextConfig = {
  transpilePackages: ['@stackone-ui/core'],

  webpack: (config) => {
    // Resolve @/ alias for UI library source files
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../../packages/ui-library/core/src'),
    }
    return config
  },

  // Multi-Zone: Proxy /connectors/* requests to MFE
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/connectors/:path*',
          destination: `${MFE_URL}/connectors/:path*`,
        },
      ],
    }
  },
}

export default nextConfig
