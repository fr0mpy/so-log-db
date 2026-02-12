/**
 * Theme management for the shell application.
 * Handles loading, caching, and applying themes.
 */

import {
  defaultBaseTheme,
  applyBaseTheme,
  applyBrandTheme,
  clearBrandTheme,
  updateThemeMode,
  validateBaseTheme,
  validateBrandTheme,
  logWarnings,
  themeLogger,
  type BrandTheme,
  type ThemeMode,
} from '@stackone-ui/core/themes'

// =============================================================================
// Types
// =============================================================================

export interface ThemeManagerState {
  baseApplied: boolean
  currentBrandTheme: string | null
  mode: ThemeMode
}

// =============================================================================
// State
// =============================================================================

const state: ThemeManagerState = {
  baseApplied: false,
  currentBrandTheme: null,
  mode: 'light',
}

const brandThemeCache = new Map<string, BrandTheme>()

// =============================================================================
// Base Theme
// =============================================================================

/**
 * Initializes the base theme (structural tokens).
 * Should be called once on app mount.
 */
export function initBaseTheme(): void {
  if (state.baseApplied) return

  const { theme, warnings } = validateBaseTheme(defaultBaseTheme)
  logWarnings(warnings, 'base')
  applyBaseTheme(theme, { mode: state.mode })
  state.baseApplied = true
  themeLogger.infoBaseThemeInit()
}

// =============================================================================
// Brand Theme
// =============================================================================

/**
 * Fetches a brand theme JSON from the public themes folder.
 */
async function fetchBrandTheme(themeName: string): Promise<unknown> {
  const url = `/themes/${themeName}.json`
  const response = await fetch(url)

  if (!response.ok) {
    themeLogger.errorFetchFailed(themeName, response.status, url)
    throw new Error(`Failed to fetch theme: ${themeName} (${response.status})`)
  }

  return response.json()
}

/**
 * Loads and applies a brand theme.
 * Validates the theme and logs warnings for missing tokens.
 *
 * @returns Promise that resolves when theme is applied
 */
export async function loadBrandTheme(themeName: string): Promise<void> {
  // Check cache first
  let brandTheme = brandThemeCache.get(themeName)

  if (!brandTheme) {
    const rawTheme = await fetchBrandTheme(themeName)
    const { theme, warnings } = validateBrandTheme(rawTheme as Partial<BrandTheme>)
    logWarnings(warnings, themeName)
    brandTheme = theme
    brandThemeCache.set(themeName, brandTheme)
  }

  // Clear previous brand theme if different
  if (state.currentBrandTheme && state.currentBrandTheme !== themeName) {
    clearBrandTheme()
  }

  applyBrandTheme(brandTheme, { mode: state.mode })
  state.currentBrandTheme = themeName
  themeLogger.infoThemeApplied(themeName, state.mode)
}

/**
 * Clears the current brand theme, reverting to base only.
 */
export function resetBrandTheme(): void {
  clearBrandTheme()
  state.currentBrandTheme = null
}

// =============================================================================
// Mode Switching
// =============================================================================

/**
 * Switches between light and dark mode.
 * Updates mode-specific tokens (shadows, colors).
 */
export function setThemeMode(mode: ThemeMode): void {
  if (mode === state.mode) return

  state.mode = mode

  // Update document class for Tailwind dark mode
  document.documentElement.classList.toggle('dark', mode === 'dark')

  // Re-apply mode-specific tokens
  if (state.baseApplied) {
    const { theme: baseTheme } = validateBaseTheme(defaultBaseTheme)

    if (state.currentBrandTheme) {
      const brandTheme = brandThemeCache.get(state.currentBrandTheme)
      if (brandTheme) {
        updateThemeMode(baseTheme, brandTheme, mode)
      }
    } else {
      applyBaseTheme(baseTheme, { mode })
    }
  }
}

/**
 * Toggles between light and dark mode.
 */
export function toggleThemeMode(): void {
  setThemeMode(state.mode === 'light' ? 'dark' : 'light')
}

/**
 * Gets the current theme mode.
 */
export function getThemeMode(): ThemeMode {
  return state.mode
}

// =============================================================================
// State Access
// =============================================================================

/**
 * Gets the current theme manager state.
 */
export function getThemeState(): Readonly<ThemeManagerState> {
  return { ...state }
}
