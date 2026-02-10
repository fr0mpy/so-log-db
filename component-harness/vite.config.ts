import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  },
  build: {
    // Enable source maps for debugging
    sourcemap: true,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunk for React ecosystem
          'vendor-react': ['react', 'react-dom'],
          // UI library chunk
          'vendor-ui': ['@base-ui/react', 'lucide-react'],
          // Utility libraries
          'vendor-utils': ['clsx', 'tailwind-merge'],
        },
      },
    },
    // Increase chunk size warning limit (neumorphic components can be larger)
    chunkSizeWarningLimit: 600,
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', '@base-ui/react', 'lucide-react', 'clsx', 'tailwind-merge'],
  },
})
