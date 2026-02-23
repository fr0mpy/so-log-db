/**
 * Seeded Random Utilities
 *
 * Provides deterministic random number generation for consistent mock data.
 * Using a date-based seed ensures data stays consistent throughout the day
 * but refreshes daily.
 */

/**
 * Generate a seed based on current date (YYYY-MM-DD)
 * Returns the same value for the entire day, changes at midnight
 */
export function generateDateSeed(): number {
  const dateString = new Date().toISOString().slice(0, 10) // "2026-02-23"
  let hash = 0
  for (let i = 0; i < dateString.length; i++) {
    hash = ((hash << 5) - hash) + dateString.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash)
}

/**
 * Deterministic random number generator using sine-based hashing
 * Returns a value between 0 and 1
 *
 * @param seed - Numeric seed value
 * @returns Pseudo-random number between 0 and 1
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

/**
 * Get a seeded random integer within a range
 *
 * @param seed - Numeric seed value
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (exclusive)
 * @returns Pseudo-random integer
 */
export function seededRandomInt(seed: number, min: number, max: number): number {
  return min + Math.floor(seededRandom(seed) * (max - min))
}

/**
 * Pick a random item from an array using seeded random
 *
 * @param seed - Numeric seed value
 * @param array - Array to pick from
 * @returns Random item from the array
 */
export function seededRandomPick<T>(seed: number, array: readonly T[]): T {
  const index = Math.floor(seededRandom(seed) * array.length)
  return array[index]
}
