/**
 * Brand theme validation utilities.
 * Validates themes against schema and returns merged result with fallbacks.
 * Never throws — always returns usable theme.
 *
 * Note: Base theme validation is no longer needed since base theme
 * is now a static CSS file at @stackone-ui/core/themes/base.css
 */

import { BRAND_THEME_SCHEMA, type BrandTheme, type TokenDefinition } from './schema'
import { themeLogger } from './logger'

// =============================================================================
// Types
// =============================================================================

export interface ValidationResult<T> {
  theme: T
  warnings: string[]
}

type SchemaSection = Record<string, TokenDefinition>

// =============================================================================
// Validation Helpers
// =============================================================================

function validateSection(
  sectionName: string,
  input: Record<string, string> | undefined,
  schema: SchemaSection
): { values: Record<string, string>; warnings: string[] } {
  const warnings: string[] = []
  const values: Record<string, string> = {}

  for (const [key, definition] of Object.entries(schema)) {
    if (input && key in input) {
      values[key] = input[key]
    } else {
      values[key] = definition.fallback
      warnings.push(`Missing token: ${sectionName}.${key} — using fallback`)
    }
  }

  return { values, warnings }
}

function validateNestedSection(
  sectionName: string,
  input: Record<string, Record<string, string>> | undefined,
  schema: Record<string, SchemaSection>
): { values: Record<string, Record<string, string>>; warnings: string[] } {
  const warnings: string[] = []
  const values: Record<string, Record<string, string>> = {}

  for (const [mode, modeSchema] of Object.entries(schema)) {
    const modeInput = input?.[mode]
    const result = validateSection(`${sectionName}.${mode}`, modeInput, modeSchema)
    values[mode] = result.values
    warnings.push(...result.warnings)
  }

  return { values, warnings }
}

// =============================================================================
// Public API
// =============================================================================

/**
 * Validates a brand theme against the schema.
 * Returns merged theme with fallbacks for missing values.
 */
export function validateBrandTheme(
  input: Partial<BrandTheme>
): ValidationResult<BrandTheme> {
  const warnings: string[] = []

  const color = validateNestedSection('color', input.color, BRAND_THEME_SCHEMA.color)
  warnings.push(...color.warnings)

  const font = validateSection('font', input.font, BRAND_THEME_SCHEMA.font)
  warnings.push(...font.warnings)

  return {
    theme: {
      color: color.values as BrandTheme['color'],
      font: font.values,
    },
    warnings,
  }
}

/**
 * Logs validation warnings to console with colored output.
 */
export function logWarnings(warnings: string[], themeName?: string): void {
  if (warnings.length === 0) return
  themeLogger.warnMissingTokens(themeName ?? 'unknown', warnings)
}
