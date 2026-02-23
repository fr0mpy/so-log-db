/**
 * Brand Token Schema (Visual)
 *
 * SINGLE SOURCE OF TRUTH for brand token schema.
 * Run `pnpm build:tokens` to regenerate:
 *   - themes/schema.ts
 *   - tailwind.preset.ts (partial)
 *
 * IMPORTANT: This defines the SCHEMA (keys + fallbacks), NOT runtime values.
 * Actual values are fetched at runtime from brand JSON files:
 *   - public/themes/stackone-green.json
 *
 * Fallbacks are used when a token is missing from the fetched JSON.
 */

// =============================================================================
// Types
// =============================================================================

export interface TokenDefinition {
  fallback: string
  description?: string
}

// =============================================================================
// Color Tokens - Light Mode
// =============================================================================

export const colorLight = {
  // Primary
  primary: { fallback: '#00af66' },
  'primary-foreground': { fallback: '#ffffff' },
  'primary-hover': { fallback: '#008a52' },

  // Secondary
  secondary: { fallback: '#6366f1' },
  'secondary-foreground': { fallback: '#ffffff' },
  'secondary-hover': { fallback: '#4338ca' },

  // Base
  background: { fallback: '#f4f4f4' },
  foreground: { fallback: '#222222' },
  surface: { fallback: '#f4f4f4' },

  // Muted
  muted: { fallback: '#e9e9e9' },
  'muted-foreground': { fallback: '#6b7280' },

  // Border
  border: { fallback: '#dedede' },

  // Destructive
  destructive: { fallback: '#ef3737' },
  'destructive-foreground': { fallback: '#ffffff' },
  'destructive-hover': { fallback: '#b91c1c' },

  // Accent
  accent: { fallback: '#6366f1' },
  'accent-foreground': { fallback: '#ffffff' },

  // Semantic - Success
  success: { fallback: '#00af66' },
  'success-foreground': { fallback: '#ffffff' },

  // Semantic - Warning
  warning: { fallback: '#ff6900' },
  'warning-foreground': { fallback: '#ffffff' },

  // Semantic - Info
  info: { fallback: '#3b82f6' },
  'info-foreground': { fallback: '#ffffff' },

  // Neumorphic
  'neu-base': { fallback: '#f4f4f4' },
  'neu-light': { fallback: 'rgba(255,255,255,0.88)' },
  'neu-dark': { fallback: 'rgba(175,175,175,0.52)' },

  // Spinner
  'spinner-front': { fallback: '#00af66' },
  'spinner-back': { fallback: '#00935a' },
  'spinner-light': { fallback: '#dedede' },
  'spinner-lighter': { fallback: '#ebebeb' },
  'spinner-dark': { fallback: '#404040' },
  'spinner-darker': { fallback: '#525252' },

  // AI (Purple gradient for AI-powered features)
  ai: { fallback: '#8B5CF6' },
  'ai-foreground': { fallback: '#ffffff' },
  'ai-hover': { fallback: '#7C3AED' },
  'ai-from': { fallback: '#8B5CF6' },
  'ai-to': { fallback: '#6366F1' },
} as const satisfies Record<string, TokenDefinition>

// =============================================================================
// Color Tokens - Dark Mode
// =============================================================================

export const colorDark = {
  // Primary
  primary: { fallback: '#00af66' },
  'primary-foreground': { fallback: '#ffffff' },
  'primary-hover': { fallback: '#00c974' },

  // Secondary
  secondary: { fallback: '#6366f1' },
  'secondary-foreground': { fallback: '#ffffff' },
  'secondary-hover': { fallback: '#818cf8' },

  // Base
  background: { fallback: '#212121' },
  foreground: { fallback: '#f5f5f5' },
  surface: { fallback: '#212121' },

  // Muted
  muted: { fallback: '#3a3a3a' },
  'muted-foreground': { fallback: '#9e9e9e' },

  // Border
  border: { fallback: '#4a4a4a' },

  // Destructive
  destructive: { fallback: '#ef4444' },
  'destructive-foreground': { fallback: '#ffffff' },
  'destructive-hover': { fallback: '#f87171' },

  // Accent
  accent: { fallback: '#818cf8' },
  'accent-foreground': { fallback: '#ffffff' },

  // Semantic - Success
  success: { fallback: '#22c55e' },
  'success-foreground': { fallback: '#ffffff' },

  // Semantic - Warning
  warning: { fallback: '#f97316' },
  'warning-foreground': { fallback: '#ffffff' },

  // Semantic - Info
  info: { fallback: '#60a5fa' },
  'info-foreground': { fallback: '#ffffff' },

  // Neumorphic
  'neu-base': { fallback: '#212121' },
  'neu-light': { fallback: 'rgba(255,255,255,0.06)' },
  'neu-dark': { fallback: 'rgba(0,0,0,0.5)' },

  // Spinner
  'spinner-front': { fallback: '#00af66' },
  'spinner-back': { fallback: '#00b368' },
  'spinner-light': { fallback: '#3a3a3a' },
  'spinner-lighter': { fallback: '#4a4a4a' },
  'spinner-dark': { fallback: '#e0e0e0' },
  'spinner-darker': { fallback: '#c0c0c0' },

  // AI (Brighter purple for dark mode)
  ai: { fallback: '#A78BFA' },
  'ai-foreground': { fallback: '#ffffff' },
  'ai-hover': { fallback: '#C4B5FD' },
  'ai-from': { fallback: '#A78BFA' },
  'ai-to': { fallback: '#818CF8' },
} as const satisfies Record<string, TokenDefinition>

// =============================================================================
// Font Tokens
// =============================================================================

export const font = {
  heading: {
    fallback: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
    description: 'Heading font family - references loaded sans font',
  },
  body: {
    fallback: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
    description: 'Body text font family - references loaded sans font',
  },
  code: {
    fallback: 'var(--font-mono), ui-monospace, monospace',
    description: 'Monospace font for code - references loaded mono font',
  },
} as const satisfies Record<string, TokenDefinition>

// =============================================================================
// Computed Color Tokens
// Generated via color-mix() in Tailwind - these reference brand colors
// so they update automatically when brand colors change at runtime
// =============================================================================

export interface ComputedColorDefinition {
  base: string // The base color token to mix
  opacity: number // Opacity percentage (0-1)
}

export const computedColors = {
  'primary-muted': { base: 'primary', opacity: 0.3 },
  'secondary-muted': { base: 'secondary', opacity: 0.3 },
  'accent-muted': { base: 'accent', opacity: 0.3 },
  'destructive-muted': { base: 'destructive', opacity: 0.3 },
  'success-muted': { base: 'success', opacity: 0.3 },
  'warning-muted': { base: 'warning', opacity: 0.3 },
  'info-muted': { base: 'info', opacity: 0.3 },
  'ai-muted': { base: 'ai', opacity: 0.2 },
} as const satisfies Record<string, ComputedColorDefinition>

// =============================================================================
// Aggregate Export
// =============================================================================

export const brandSchema = {
  color: {
    light: colorLight,
    dark: colorDark,
  },
  font,
  computed: {
    colors: computedColors,
  },
} as const

export type BrandSchema = typeof brandSchema

// Helper type to extract all color token keys
export type ColorTokenKey = keyof typeof colorLight
export type FontTokenKey = keyof typeof font
export type ComputedColorKey = keyof typeof computedColors
