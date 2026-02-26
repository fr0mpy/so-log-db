import { configs } from '@stackone/eslint-config'

export default [
  ...configs.next,
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/*.d.ts',
      '**/tsconfig.tsbuildinfo',
      '**/tailwind.config.ts',
      '**/tailwind.preset.ts',
      '**/vite.config.ts',
      '**/postcss.config.js',
      '**/postcss.config.mjs',
      '**/eslint.config.js',
      '**/eslint.config.mjs',
      '**/playwright.config.ts',
      '**/tests/**/*.spec.ts',
      '**/test-*.mjs',
      'packages/eslint-config/**',
    ],
  },
]
