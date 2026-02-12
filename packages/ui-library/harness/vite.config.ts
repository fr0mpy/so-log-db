import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const coreDir = path.resolve(__dirname, '../core/src')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Core package @/ resolution - these paths exist in core
      '@/utils': `${coreDir}/utils`,
      '@/hooks': `${coreDir}/hooks`,
      '@/config': `${coreDir}/config`,
      '@/styles': `${coreDir}/styles`,
      '@/components': `${coreDir}/components`,
      // Resolve stackone-ui to source for HMR during development
      'stackone-ui/utils': `${coreDir}/utils`,
      'stackone-ui/components': `${coreDir}/components`,
      'stackone-ui/styles': `${coreDir}/styles`,
      'stackone-ui/hooks': `${coreDir}/hooks`,
      'stackone-ui/config': `${coreDir}/config`,
      'stackone-ui': coreDir,
    },
  },
  server: {
    port: 5173,
  },
})
