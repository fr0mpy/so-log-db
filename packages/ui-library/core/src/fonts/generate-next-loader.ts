#!/usr/bin/env tsx
/**
 * Generates next-loader.ts from config.ts
 *
 * Run: pnpm generate:fonts
 *
 * This script exists because next/font requires literal values at build time.
 * Instead of maintaining two files, we generate the Next.js loader from config.
 */

import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { FONT_CONFIG, FONT_FAMILIES } from './config'

const __dirname = dirname(fileURLToPath(import.meta.url))

const template = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
 *
 * Generated from config.ts by generate-next-loader.ts
 * Run: pnpm generate:fonts
 *
 * next/font requires literal values at build time, so we generate this file
 * from the canonical configuration in config.ts.
 */

import { Inter, IBM_Plex_Mono } from 'next/font/google'

// =============================================================================
// Font Instances (generated from config.ts)
// =============================================================================

/**
 * Primary sans-serif font (${FONT_FAMILIES.sans.name}).
 * Used for body text and headings.
 */
export const fontSans = Inter({
  subsets: ${JSON.stringify(FONT_CONFIG.subsets)},
  display: '${FONT_CONFIG.display}',
  variable: '${FONT_FAMILIES.sans.variable}',
  weight: ${JSON.stringify(FONT_FAMILIES.sans.weights.map(String))},
  adjustFontFallback: true,
  preload: ${FONT_CONFIG.preload},
})

/**
 * Monospace font (${FONT_FAMILIES.mono.name}).
 * Used for code blocks and technical content.
 */
export const fontMono = IBM_Plex_Mono({
  subsets: ${JSON.stringify(FONT_CONFIG.subsets)},
  display: '${FONT_CONFIG.display}',
  variable: '${FONT_FAMILIES.mono.variable}',
  weight: ${JSON.stringify(FONT_FAMILIES.mono.weights.map(String))},
  adjustFontFallback: true,
  preload: ${FONT_CONFIG.preload},
})

// =============================================================================
// Combined Exports
// =============================================================================

/**
 * Combined CSS variable classes for all fonts.
 * Apply to <html> element to make CSS variables available.
 */
export const fontVariables = \`\${fontSans.variable} \${fontMono.variable}\`

/**
 * Font class names for direct application.
 */
export const fontClassNames = {
  sans: fontSans.className,
  mono: fontMono.className,
} as const
`

const outputPath = join(__dirname, 'next-loader.ts')
writeFileSync(outputPath, template, 'utf-8')

console.log('✅ Generated next-loader.ts from config.ts')
console.log(`   Font: ${FONT_FAMILIES.sans.name} (${FONT_FAMILIES.sans.weights.join(', ')})`)
console.log(`   Mono: ${FONT_FAMILIES.mono.name} (${FONT_FAMILIES.mono.weights.join(', ')})`)
console.log(`   Display: ${FONT_CONFIG.display}`)
