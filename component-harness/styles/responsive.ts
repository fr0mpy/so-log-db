/**
 * Responsive variant utilities for CVA.
 * Enables breakpoint-aware variant props.
 *
 * @example
 * <Button size={{ base: 'sm', md: 'lg' }} />
 */

// ============================================================================
// TYPES
// ============================================================================

export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>

// ============================================================================
// BREAKPOINT CONFIG
// ============================================================================

const BREAKPOINT_ORDER: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl', '2xl']

const BREAKPOINT_PREFIX: Record<Breakpoint, string> = {
  base: '',
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
  '2xl': '2xl:',
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Check if a value is a responsive object
 */
export function isResponsiveObject<T>(
  value: ResponsiveValue<T>
): value is Partial<Record<Breakpoint, T>> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Resolve a responsive value to a single value (uses largest breakpoint)
 * Useful for SSR where we need a single value
 */
export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T>,
  fallback: T
): T {
  if (!isResponsiveObject(value)) {
    return value
  }

  // Return the value at the largest defined breakpoint
  for (let i = BREAKPOINT_ORDER.length - 1; i >= 0; i--) {
    const bp = BREAKPOINT_ORDER[i]
    if (bp in value && value[bp] !== undefined) {
      return value[bp] as T
    }
  }

  return fallback
}

/**
 * Generate responsive class strings from a variant map
 *
 * @example
 * const classes = responsiveClasses(
 *   { base: 'sm', md: 'lg' },
 *   { sm: 'h-8 px-3', md: 'h-10 px-4', lg: 'h-12 px-6' }
 * )
 * // Returns: 'h-8 px-3 md:h-12 md:px-6'
 */
export function responsiveClasses<T extends string>(
  value: ResponsiveValue<T>,
  variantMap: Record<T, string>
): string {
  if (!isResponsiveObject(value)) {
    return variantMap[value] || ''
  }

  const classes: string[] = []

  for (const bp of BREAKPOINT_ORDER) {
    const variant = value[bp]
    if (variant && variantMap[variant]) {
      const prefix = BREAKPOINT_PREFIX[bp]
      const variantClasses = variantMap[variant]
        .split(' ')
        .map(cls => `${prefix}${cls}`)
        .join(' ')
      classes.push(variantClasses)
    }
  }

  return classes.join(' ')
}

/**
 * Hook-free responsive value resolver for client components
 * Returns CSS classes that work at all breakpoints
 */
export function getResponsiveClasses<T extends string>(
  prop: ResponsiveValue<T> | undefined,
  variantMap: Record<T, string>,
  defaultValue: T
): string {
  if (prop === undefined) {
    return variantMap[defaultValue]
  }

  if (!isResponsiveObject(prop)) {
    return variantMap[prop]
  }

  return responsiveClasses(prop, variantMap)
}
