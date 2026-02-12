import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  transpilePackages: ['@stackone-ui/core'],

  webpack: (config) => {
    // Resolve @/ alias for UI library source files
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../../../packages/ui-library/core/src'),
    }
    return config
  },

  // Multi-Zone: MFE serves its routes under /connectors base path
  basePath: '/connectors',
}

export default nextConfig
