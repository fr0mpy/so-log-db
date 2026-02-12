/**
 * Tailwind configuration for the core package.
 * Uses the shared preset for consistency.
 */

import type { Config } from 'tailwindcss'
import stackonePreset from './tailwind.preset'

export default {
  presets: [stackonePreset as Config],
  content: [
    './index.html',
    './**/*.{js,ts,jsx,tsx}',
  ],
} satisfies Config
