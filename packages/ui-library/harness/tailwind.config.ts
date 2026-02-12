import type { Config } from 'tailwindcss'
import stackonePreset from '../core/tailwind.preset'

const config: Config = {
  presets: [stackonePreset as Config],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../core/src/**/*.{js,ts,jsx,tsx}',
  ],
}

export default config
