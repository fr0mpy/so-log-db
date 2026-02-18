import type { Config } from 'tailwindcss'
import stackonePreset from '@stackone-ui/core/tailwind.preset'

const config: Config = {
  presets: [stackonePreset as Config],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../../packages/ui-library/core/src/**/*.{js,ts,jsx,tsx}',
  ],
}

export default config
