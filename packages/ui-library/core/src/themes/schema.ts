/**
 * AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
 *
 * This file is generated from token source files.
 * To modify, edit the source and run: pnpm build:tokens
 *
 * Source files:
 *   - src/tokens/base.tokens.ts
 *   - src/tokens/brand.tokens.ts
 */


// =============================================================================
// Types
// =============================================================================

export interface TokenDefinition {
  fallback: string
  description?: string
}

export interface BrandTheme {
  color: {
    light: Record<string, string>
    dark: Record<string, string>
  }
  font: Record<string, string>
}

export type ThemeMode = 'light' | 'dark'

// =============================================================================
// Brand Theme Schema (visual tokens)
// =============================================================================

export const BRAND_THEME_SCHEMA = {
  color: {
    light: {
      'primary': { fallback: '#00af66' },
      'primary-foreground': { fallback: '#ffffff' },
      'primary-hover': { fallback: '#008a52' },
      'secondary': { fallback: '#6366f1' },
      'secondary-foreground': { fallback: '#ffffff' },
      'secondary-hover': { fallback: '#4338ca' },
      'background': { fallback: '#f4f4f4' },
      'foreground': { fallback: '#222222' },
      'surface': { fallback: '#f4f4f4' },
      'muted': { fallback: '#e9e9e9' },
      'muted-foreground': { fallback: '#6b7280' },
      'border': { fallback: '#dedede' },
      'destructive': { fallback: '#ef3737' },
      'destructive-foreground': { fallback: '#ffffff' },
      'destructive-hover': { fallback: '#b91c1c' },
      'accent': { fallback: '#6366f1' },
      'accent-foreground': { fallback: '#ffffff' },
      'success': { fallback: '#00af66' },
      'success-foreground': { fallback: '#ffffff' },
      'warning': { fallback: '#ff6900' },
      'warning-foreground': { fallback: '#ffffff' },
      'info': { fallback: '#3b82f6' },
      'info-foreground': { fallback: '#ffffff' },
      'neu-base': { fallback: '#f4f4f4' },
      'neu-light': { fallback: 'rgba(255,255,255,0.88)' },
      'neu-dark': { fallback: 'rgba(175,175,175,0.52)' },
      'spinner-front': { fallback: '#00af66' },
      'spinner-back': { fallback: '#00935a' },
      'spinner-light': { fallback: '#dedede' },
      'spinner-lighter': { fallback: '#ebebeb' },
      'spinner-dark': { fallback: '#404040' },
      'spinner-darker': { fallback: '#525252' },
      'ai': { fallback: '#8B5CF6' },
      'ai-foreground': { fallback: '#ffffff' },
      'ai-hover': { fallback: '#7C3AED' },
      'ai-from': { fallback: '#8B5CF6' },
      'ai-to': { fallback: '#6366F1' },
    },
    dark: {
      'primary': { fallback: '#00af66' },
      'primary-foreground': { fallback: '#ffffff' },
      'primary-hover': { fallback: '#00c974' },
      'secondary': { fallback: '#6366f1' },
      'secondary-foreground': { fallback: '#ffffff' },
      'secondary-hover': { fallback: '#818cf8' },
      'background': { fallback: '#212121' },
      'foreground': { fallback: '#f5f5f5' },
      'surface': { fallback: '#212121' },
      'muted': { fallback: '#3a3a3a' },
      'muted-foreground': { fallback: '#9e9e9e' },
      'border': { fallback: '#4a4a4a' },
      'destructive': { fallback: '#ef4444' },
      'destructive-foreground': { fallback: '#ffffff' },
      'destructive-hover': { fallback: '#f87171' },
      'accent': { fallback: '#818cf8' },
      'accent-foreground': { fallback: '#ffffff' },
      'success': { fallback: '#22c55e' },
      'success-foreground': { fallback: '#ffffff' },
      'warning': { fallback: '#f97316' },
      'warning-foreground': { fallback: '#ffffff' },
      'info': { fallback: '#60a5fa' },
      'info-foreground': { fallback: '#ffffff' },
      'neu-base': { fallback: '#212121' },
      'neu-light': { fallback: 'rgba(255,255,255,0.06)' },
      'neu-dark': { fallback: 'rgba(0,0,0,0.5)' },
      'spinner-front': { fallback: '#00af66' },
      'spinner-back': { fallback: '#00b368' },
      'spinner-light': { fallback: '#3a3a3a' },
      'spinner-lighter': { fallback: '#4a4a4a' },
      'spinner-dark': { fallback: '#e0e0e0' },
      'spinner-darker': { fallback: '#c0c0c0' },
      'ai': { fallback: '#A78BFA' },
      'ai-foreground': { fallback: '#ffffff' },
      'ai-hover': { fallback: '#C4B5FD' },
      'ai-from': { fallback: '#A78BFA' },
      'ai-to': { fallback: '#818CF8' },
    },
  },

  font: {
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
  },
} as const
