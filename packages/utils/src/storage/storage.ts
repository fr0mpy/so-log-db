/**
 * Type-safe localStorage utilities
 *
 * Provides a simple API for reading/writing to localStorage with
 * JSON serialization and error handling for SSR environments.
 */

/**
 * Check if localStorage is available (client-side only)
 */
function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const test = '__storage_test__'
    window.localStorage.setItem(test, test)
    window.localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

/**
 * Get a value from localStorage
 *
 * @param key - Storage key
 * @param fallback - Default value if key doesn't exist or storage unavailable
 * @returns Stored value or fallback
 *
 * @example
 * const theme = getStorageItem('theme', 'light')
 */
export function getStorageItem<T>(key: string, fallback: T): T {
  if (!isStorageAvailable()) return fallback

  try {
    const item = window.localStorage.getItem(key)
    if (item === null) return fallback
    return JSON.parse(item) as T
  } catch {
    return fallback
  }
}

/**
 * Get a raw string value from localStorage (no JSON parsing)
 *
 * @param key - Storage key
 * @param fallback - Default value if key doesn't exist or storage unavailable
 * @returns Stored string or fallback
 *
 * @example
 * const theme = getStorageString('theme', 'light')
 */
export function getStorageString<T extends string>(key: string, fallback: T): T {
  if (!isStorageAvailable()) return fallback

  try {
    const item = window.localStorage.getItem(key)
    if (item === null) return fallback
    return item as T
  } catch {
    return fallback
  }
}

/**
 * Set a value in localStorage
 *
 * @param key - Storage key
 * @param value - Value to store (will be JSON serialized)
 *
 * @example
 * setStorageItem('user', { id: 1, name: 'John' })
 */
export function setStorageItem<T>(key: string, value: T): void {
  if (!isStorageAvailable()) return

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or other error - fail silently
  }
}

/**
 * Set a raw string value in localStorage (no JSON serialization)
 *
 * @param key - Storage key
 * @param value - String value to store
 *
 * @example
 * setStorageString('theme', 'dark')
 */
export function setStorageString(key: string, value: string): void {
  if (!isStorageAvailable()) return

  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Storage full or other error - fail silently
  }
}

/**
 * Remove a value from localStorage
 *
 * @param key - Storage key to remove
 *
 * @example
 * removeStorageItem('theme')
 */
export function removeStorageItem(key: string): void {
  if (!isStorageAvailable()) return

  try {
    window.localStorage.removeItem(key)
  } catch {
    // Fail silently
  }
}
