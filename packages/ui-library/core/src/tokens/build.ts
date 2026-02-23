#!/usr/bin/env tsx
/**
 * Token Build Script
 *
 * Generates all token-derived files from the single source of truth:
 *   - themes/base.css (from base.tokens.ts)
 *   - themes/schema.ts (from brand.tokens.ts)
 *   - tailwind.preset.ts (from both)
 *
 * Usage:
 *   pnpm build:tokens
 *   # or
 *   tsx src/tokens/build.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { baseTokens, shadowLight, shadowDark, shadowStatic, animations } from './base.tokens.js'
import { colorLight, colorDark, font, computedColors } from './brand.tokens.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const GENERATED_HEADER = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
 *
 * This file is generated from token source files.
 * To modify, edit the source and run: pnpm build:tokens
 *
 * Source files:
 *   - src/tokens/base.tokens.ts
 *   - src/tokens/brand.tokens.ts
 */

`

// =============================================================================
// Utility Functions
// =============================================================================

function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// =============================================================================
// Generate base.css
// =============================================================================

function generateBaseCss(): string {
  const lines: string[] = []

  lines.push(GENERATED_HEADER.trim())
  lines.push('')
  lines.push(':root {')

  // Spacing
  lines.push('  /* Spacing */')
  for (const [key, value] of Object.entries(baseTokens.spacing)) {
    lines.push(`  --spacing-${key}: ${value};`)
  }
  lines.push('')

  // Radius
  lines.push('  /* Radius */')
  for (const [key, value] of Object.entries(baseTokens.radius)) {
    lines.push(`  --radius-${key}: ${value};`)
  }
  lines.push('')

  // Motion
  lines.push('  /* Motion */')
  for (const [key, value] of Object.entries(baseTokens.motion.duration)) {
    lines.push(`  --motion-duration-${key}: ${value};`)
  }
  for (const [key, value] of Object.entries(baseTokens.motion.spring)) {
    lines.push(`  --motion-spring-${camelToKebab(key)}: ${value};`)
  }
  lines.push('')

  // Z-Index
  lines.push('  /* Z-Index */')
  for (const [key, value] of Object.entries(baseTokens.zIndex)) {
    lines.push(`  --z-${key}: ${value};`)
  }
  lines.push('')

  // Shadows (Light Mode)
  lines.push('  /* Shadows (Light Mode) */')
  for (const [key, value] of Object.entries(shadowLight)) {
    const cssKey = camelToKebab(key)
    lines.push(`  --shadow-${cssKey}: ${value};`)
  }

  lines.push('}')
  lines.push('')

  // Dark mode shadows
  lines.push('.dark {')
  lines.push('  /* Shadows (Dark Mode) */')
  for (const [key, value] of Object.entries(shadowDark)) {
    const cssKey = camelToKebab(key)
    lines.push(`  --shadow-${cssKey}: ${value};`)
  }
  lines.push('}')
  lines.push('')

  return lines.join('\n')
}

// =============================================================================
// Generate schema.ts
// =============================================================================

function generateSchemaTs(): string {
  const lines: string[] = []

  lines.push(GENERATED_HEADER)

  // Types
  lines.push('// =============================================================================')
  lines.push('// Types')
  lines.push('// =============================================================================')
  lines.push('')
  lines.push('export interface TokenDefinition {')
  lines.push('  fallback: string')
  lines.push('  description?: string')
  lines.push('}')
  lines.push('')
  lines.push('export interface BrandTheme {')
  lines.push('  color: {')
  lines.push('    light: Record<string, string>')
  lines.push('    dark: Record<string, string>')
  lines.push('  }')
  lines.push('  font: Record<string, string>')
  lines.push('}')
  lines.push('')
  lines.push("export type ThemeMode = 'light' | 'dark'")
  lines.push('')

  // Brand Theme Schema
  lines.push('// =============================================================================')
  lines.push('// Brand Theme Schema (visual tokens)')
  lines.push('// =============================================================================')
  lines.push('')
  lines.push('export const BRAND_THEME_SCHEMA = {')
  lines.push('  color: {')

  // Light colors
  lines.push('    light: {')
  for (const [key, def] of Object.entries(colorLight)) {
    lines.push(`      '${key}': { fallback: '${def.fallback}' },`)
  }
  lines.push('    },')

  // Dark colors
  lines.push('    dark: {')
  for (const [key, def] of Object.entries(colorDark)) {
    lines.push(`      '${key}': { fallback: '${def.fallback}' },`)
  }
  lines.push('    },')
  lines.push('  },')
  lines.push('')

  // Fonts
  lines.push('  font: {')
  for (const [key, def] of Object.entries(font)) {
    if (def.description) {
      lines.push(`    ${key}: {`)
      lines.push(`      fallback: '${def.fallback}',`)
      lines.push(`      description: '${def.description}',`)
      lines.push('    },')
    } else {
      lines.push(`    ${key}: { fallback: '${def.fallback}' },`)
    }
  }
  lines.push('  },')
  lines.push('} as const')
  lines.push('')

  return lines.join('\n')
}

// =============================================================================
// Generate tailwind.preset.ts
// =============================================================================

function generateTailwindPreset(): string {
  const lines: string[] = []

  lines.push(GENERATED_HEADER)
  lines.push("import type { Config } from 'tailwindcss'")
  lines.push("import containerQueries from '@tailwindcss/container-queries'")
  lines.push('')
  lines.push('const preset: Partial<Config> = {')
  lines.push("  darkMode: 'class',")
  lines.push('  theme: {')
  lines.push('    extend: {')

  // Colors
  lines.push('      // =======================================================================')
  lines.push('      // Colors — mapped to --color-* CSS variables')
  lines.push('      // =======================================================================')
  lines.push('      colors: {')

  // Regular colors from brand schema
  for (const key of Object.keys(colorLight)) {
    // Handle nested objects (neu, spinner)
    if (key.startsWith('neu-')) {
      continue // Handle separately
    }
    if (key.startsWith('spinner-')) {
      continue // Handle separately
    }
    lines.push(`        '${key}': 'var(--color-${key})',`)
  }

  // Computed colors (color-mix)
  for (const [key, def] of Object.entries(computedColors)) {
    const percent = Math.round(def.opacity * 100)
    lines.push(`        '${key}': 'color-mix(in srgb, var(--color-${def.base}) ${percent}%, transparent)',`)
  }

  // Nested neu colors
  lines.push('        neu: {')
  lines.push("          base: 'var(--color-neu-base)',")
  lines.push("          light: 'var(--color-neu-light)',")
  lines.push("          dark: 'var(--color-neu-dark)',")
  lines.push('        },')

  // Nested spinner colors
  lines.push('        spinner: {')
  lines.push("          front: 'var(--color-spinner-front)',")
  lines.push("          back: 'var(--color-spinner-back)',")
  lines.push("          light: 'var(--color-spinner-light)',")
  lines.push("          lighter: 'var(--color-spinner-lighter)',")
  lines.push("          dark: 'var(--color-spinner-dark)',")
  lines.push("          darker: 'var(--color-spinner-darker)',")
  lines.push('        },')

  lines.push('      },')
  lines.push('')

  // Font Family
  lines.push('      // =======================================================================')
  lines.push('      // Typography — mapped to --font-* CSS variables')
  lines.push('      // =======================================================================')
  lines.push('      fontFamily: {')
  lines.push("        sans: 'var(--font-body)',")
  lines.push("        heading: 'var(--font-heading)',")
  lines.push("        body: 'var(--font-body)',")
  lines.push("        mono: 'var(--font-code)',")
  lines.push('      },')
  lines.push('')

  // Border Radius
  lines.push('      // =======================================================================')
  lines.push('      // Border Radius — mapped to --radius-* CSS variables')
  lines.push('      // =======================================================================')
  lines.push('      borderRadius: {')
  for (const key of Object.keys(baseTokens.radius)) {
    lines.push(`        'theme-${key}': 'var(--radius-${key})',`)
  }
  lines.push('      },')
  lines.push('')

  // Box Shadow
  lines.push('      // =======================================================================')
  lines.push('      // Box Shadow — mapped to --shadow-* CSS variables')
  lines.push('      // =======================================================================')
  lines.push('      boxShadow: {')

  // Theme shadows (from CSS variables)
  lines.push('        // Core neumorphic shadows (from theme)')
  lines.push("        'neu-raised': 'var(--shadow-raised)',")
  lines.push("        'neu-raised-sm': 'var(--shadow-raised-sm)',")
  lines.push("        'neu-raised-lg': 'var(--shadow-raised-lg)',")
  lines.push('        // Raised with top highlight (for cards/panels)')
  lines.push("        'neu-raised-highlight': 'var(--shadow-inset-highlight), var(--shadow-raised)',")
  lines.push("        'neu-pressed': 'var(--shadow-pressed)',")
  lines.push("        'neu-pressed-sm': 'var(--shadow-pressed-sm)',")
  lines.push("        'neu-flat': 'var(--shadow-flat)',")
  lines.push("        'neu-focus': 'var(--shadow-focus)',")
  lines.push("        'neu-inset-highlight': 'var(--shadow-inset-highlight)',")
  lines.push('')
  lines.push('        // Variant shadows (from theme)')
  lines.push("        'neu-variant-primary': 'var(--shadow-variant-primary)',")
  lines.push("        'neu-variant-secondary': 'var(--shadow-variant-secondary)',")
  lines.push("        'neu-variant-destructive': 'var(--shadow-variant-destructive)',")
  lines.push("        'neu-variant-success': 'var(--shadow-variant-success)',")
  lines.push("        'neu-variant-warning': 'var(--shadow-variant-warning)',")
  lines.push('')
  lines.push('        // Control state shadows (from theme)')
  lines.push("        'neu-control-unchecked': 'var(--shadow-control-unchecked)',")
  lines.push("        'neu-control-checked': 'var(--shadow-control-checked)',")
  lines.push('')

  // Static shadows (not from CSS variables)
  lines.push('        // Static shadows (not theme-dependent)')
  for (const [key, value] of Object.entries(shadowStatic)) {
    const cssKey = camelToKebab(key)
    lines.push(`        'neu-${cssKey}': '${value}',`)
  }

  lines.push('      },')
  lines.push('')

  // Transitions
  lines.push('      // =======================================================================')
  lines.push('      // Transitions')
  lines.push('      // =======================================================================')
  lines.push('      transitionTimingFunction: {')
  lines.push("        neu: 'cubic-bezier(0.4, 0, 0.2, 1)',")
  lines.push('      },')
  lines.push('      transitionDuration: {')
  lines.push("        'neu-fast': 'var(--motion-duration-fast)',")
  lines.push("        neu: 'var(--motion-duration-normal)',")
  lines.push("        'neu-slow': 'var(--motion-duration-slow)',")
  lines.push('      },')
  lines.push('')

  // Z-Index
  lines.push('      // =======================================================================')
  lines.push('      // Z-Index — mapped to --z-* CSS variables')
  lines.push('      // =======================================================================')
  lines.push('      zIndex: {')
  for (const key of Object.keys(baseTokens.zIndex)) {
    lines.push(`        ${key}: 'var(--z-${key})',`)
  }
  lines.push('      },')
  lines.push('')

  // Keyframes
  lines.push('      // =======================================================================')
  lines.push('      // Keyframes & Animations')
  lines.push('      // =======================================================================')
  lines.push('      keyframes: {')
  for (const [name, frames] of Object.entries(animations.keyframes)) {
    const kebabName = camelToKebab(name)
    lines.push(`        '${kebabName}': {`)
    for (const [state, props] of Object.entries(frames)) {
      const propsStr = Object.entries(props as Record<string, string>)
        .map(([k, v]) => `${k}: '${v}'`)
        .join(', ')
      lines.push(`          ${state}: { ${propsStr} },`)
    }
    lines.push('        },')
  }
  lines.push('      },')

  // Animations
  lines.push('      animation: {')
  for (const [name, [keyframe, duration, easing, extra]] of Object.entries(animations.definitions)) {
    const kebabName = camelToKebab(name)
    lines.push(`        '${kebabName}': '${keyframe} ${duration} ${easing} ${extra}',`)
  }
  lines.push('      },')

  lines.push('    },')
  lines.push('  },')
  lines.push('  plugins: [containerQueries],')
  lines.push('}')
  lines.push('')
  lines.push('export default preset')
  lines.push('')

  return lines.join('\n')
}

// =============================================================================
// Main
// =============================================================================

function main() {
  // __dirname is src/tokens, so go up 2 levels to get package root
  const rootDir = path.resolve(__dirname, '../..')
  const themesDir = path.join(rootDir, 'src/themes')

  console.log('Building tokens...')

  // Generate base.css
  const baseCss = generateBaseCss()
  const baseCssPath = path.join(themesDir, 'base.css')
  fs.writeFileSync(baseCssPath, baseCss)
  console.log(`  ✓ Generated ${path.relative(rootDir, baseCssPath)}`)

  // Generate schema.ts
  const schemaTs = generateSchemaTs()
  const schemaTsPath = path.join(themesDir, 'schema.ts')
  fs.writeFileSync(schemaTsPath, schemaTs)
  console.log(`  ✓ Generated ${path.relative(rootDir, schemaTsPath)}`)

  // Generate tailwind.preset.ts
  const tailwindPreset = generateTailwindPreset()
  const tailwindPresetPath = path.join(rootDir, 'tailwind.preset.ts')
  fs.writeFileSync(tailwindPresetPath, tailwindPreset)
  console.log(`  ✓ Generated ${path.relative(rootDir, tailwindPresetPath)}`)

  console.log('')
  console.log('Done! Token files generated successfully.')
}

main()
