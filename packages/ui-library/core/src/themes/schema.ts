/**
 * Theme token schema definitions with fallback values.
 * Ensures themes never break the app — missing tokens use fallbacks.
 */

// =============================================================================
// Types
// =============================================================================

export interface TokenDefinition {
  fallback: string
  description?: string
}

export interface BaseTheme {
  spacing: Record<string, string>
  radius: Record<string, string>
  shadow: {
    light: Record<string, string>
    dark: Record<string, string>
  }
  motion: Record<string, string>
  zIndex: Record<string, string>
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
// Base Theme Schema (structural tokens)
// =============================================================================

export const BASE_THEME_SCHEMA = {
  spacing: {
    '1': { fallback: '0.25rem' },
    '2': { fallback: '0.5rem' },
    '3': { fallback: '0.75rem' },
    '4': { fallback: '1rem' },
    '5': { fallback: '1.25rem' },
    '6': { fallback: '1.5rem' },
    '8': { fallback: '2rem' },
    '10': { fallback: '2.5rem' },
    '12': { fallback: '3rem' },
    '16': { fallback: '4rem' },
  },

  radius: {
    sm: { fallback: '0.375rem' },
    md: { fallback: '0.625rem' },
    lg: { fallback: '1rem' },
    xl: { fallback: '1.5rem' },
    '2xl': { fallback: '2rem' },
  },

  shadow: {
    light: {
      raised: { fallback: '-6px -6px 14px rgba(255,255,255,0.88), 6px 6px 14px rgba(185,185,185,0.48)' },
      'raised-sm': { fallback: '-3px -3px 8px rgba(255,255,255,0.88), 3px 3px 8px rgba(185,185,185,0.48)' },
      'raised-lg': { fallback: '-8px -8px 20px rgba(255,255,255,0.9), 8px 8px 20px rgba(185,185,185,0.55)' },
      pressed: { fallback: 'inset -4px -4px 8px rgba(255,255,255,0.88), inset 4px 4px 8px rgba(185,185,185,0.48)' },
      'pressed-sm': { fallback: 'inset -2px -2px 5px rgba(255,255,255,0.75), inset 2px 2px 5px rgba(185,185,185,0.4)' },
      flat: { fallback: 'inset 1px 1px 2px rgba(185,185,185,0.28), inset -1px -1px 2px rgba(255,255,255,0.55)' },
      focus: { fallback: '0 0 0 3px rgba(0,175,102,0.6)' },
    },
    dark: {
      raised: { fallback: '-6px -6px 14px rgba(255,255,255,0.06), 6px 6px 14px rgba(0,0,0,0.5)' },
      'raised-sm': { fallback: '-3px -3px 8px rgba(255,255,255,0.06), 3px 3px 8px rgba(0,0,0,0.5)' },
      'raised-lg': { fallback: '-8px -8px 20px rgba(255,255,255,0.07), 8px 8px 20px rgba(0,0,0,0.55)' },
      pressed: { fallback: 'inset -4px -4px 8px rgba(255,255,255,0.06), inset 4px 4px 8px rgba(0,0,0,0.5)' },
      'pressed-sm': { fallback: 'inset -2px -2px 5px rgba(255,255,255,0.04), inset 2px 2px 5px rgba(0,0,0,0.35)' },
      flat: { fallback: 'inset 1px 1px 2px rgba(0,0,0,0.25), inset -1px -1px 2px rgba(255,255,255,0.04)' },
      focus: { fallback: '0 0 0 3px rgba(0,175,102,0.6)' },
    },
  },

  motion: {
    'duration-fast': { fallback: '150ms' },
    'duration-normal': { fallback: '200ms' },
    'duration-slow': { fallback: '300ms' },
    'duration-spinner': { fallback: '3s' },
    'spring-stiffness': { fallback: '300' },
    'spring-damping': { fallback: '30' },
    'spring-stiffness-bouncy': { fallback: '400' },
  },

  zIndex: {
    dropdown: { fallback: '100' },
    sticky: { fallback: '200' },
    modal: { fallback: '300' },
    popover: { fallback: '400' },
    tooltip: { fallback: '600' },
    toast: { fallback: '9900' },
  },
} as const

// =============================================================================
// Brand Theme Schema (visual tokens)
// =============================================================================

export const BRAND_THEME_SCHEMA = {
  color: {
    light: {
      primary: { fallback: '#00af66' },
      'primary-foreground': { fallback: '#ffffff' },
      'primary-hover': { fallback: '#008a52' },
      secondary: { fallback: '#6366f1' },
      'secondary-foreground': { fallback: '#ffffff' },
      'secondary-hover': { fallback: '#4338ca' },
      background: { fallback: '#f0f0f0' },
      foreground: { fallback: '#222222' },
      surface: { fallback: '#f0f0f0' },
      muted: { fallback: '#e4e4e4' },
      'muted-foreground': { fallback: '#6b7280' },
      border: { fallback: '#d8d8d8' },
      destructive: { fallback: '#ef3737' },
      'destructive-foreground': { fallback: '#ffffff' },
      'destructive-hover': { fallback: '#b91c1c' },
      accent: { fallback: '#6366f1' },
      'accent-foreground': { fallback: '#ffffff' },
      success: { fallback: '#00af66' },
      'success-foreground': { fallback: '#ffffff' },
      warning: { fallback: '#ff6900' },
      'warning-foreground': { fallback: '#ffffff' },
      info: { fallback: '#3b82f6' },
      'info-foreground': { fallback: '#ffffff' },
      'neu-base': { fallback: '#f0f0f0' },
      'neu-light': { fallback: 'rgba(255,255,255,0.88)' },
      'neu-dark': { fallback: 'rgba(185,185,185,0.48)' },
      'spinner-front': { fallback: '#00af66' },
      'spinner-back': { fallback: '#00935a' },
      'spinner-light': { fallback: '#d8d8d8' },
      'spinner-lighter': { fallback: '#e6e6e6' },
      'spinner-dark': { fallback: '#404040' },
      'spinner-darker': { fallback: '#525252' },
    },
    dark: {
      primary: { fallback: '#00af66' },
      'primary-foreground': { fallback: '#ffffff' },
      'primary-hover': { fallback: '#00c974' },
      secondary: { fallback: '#6366f1' },
      'secondary-foreground': { fallback: '#ffffff' },
      'secondary-hover': { fallback: '#818cf8' },
      background: { fallback: '#212121' },
      foreground: { fallback: '#f5f5f5' },
      surface: { fallback: '#212121' },
      muted: { fallback: '#3a3a3a' },
      'muted-foreground': { fallback: '#9e9e9e' },
      border: { fallback: '#4a4a4a' },
      destructive: { fallback: '#ef4444' },
      'destructive-foreground': { fallback: '#ffffff' },
      'destructive-hover': { fallback: '#f87171' },
      accent: { fallback: '#818cf8' },
      'accent-foreground': { fallback: '#ffffff' },
      success: { fallback: '#22c55e' },
      'success-foreground': { fallback: '#ffffff' },
      warning: { fallback: '#f97316' },
      'warning-foreground': { fallback: '#ffffff' },
      info: { fallback: '#60a5fa' },
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
    },
  },

  font: {
    heading: { fallback: "'Inter', ui-sans-serif, system-ui, sans-serif" },
    body: { fallback: "'Inter', ui-sans-serif, system-ui, sans-serif" },
    code: { fallback: "'IBM Plex Mono', ui-monospace, monospace" },
  },
} as const

// =============================================================================
// Helper to extract fallback values from schema
// =============================================================================

type SchemaSection = Record<string, TokenDefinition>

export function extractFallbacks<T extends SchemaSection>(
  schema: T
): Record<keyof T, string> {
  const result = {} as Record<keyof T, string>
  for (const key of Object.keys(schema) as Array<keyof T>) {
    result[key] = schema[key].fallback
  }
  return result
}
