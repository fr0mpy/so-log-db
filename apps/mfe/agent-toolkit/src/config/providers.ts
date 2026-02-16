/**
 * Provider Registry
 * Maps provider names to their local icon paths.
 */

/** Known providers with local icons */
export const PROVIDER_REGISTRY: Record<string, string> = {
  attio: 'attio',
  humaans: 'humaans',
  salesforce: 'salesforce',
  hubspot: 'hubspot',
  workday: 'workday',
} as const

/** All known provider keys for preloading */
export const KNOWN_PROVIDERS = Object.keys(PROVIDER_REGISTRY)

/** Base path for provider icons (relative to public/) */
const ICON_BASE_PATH = '/agent-toolkit/icons/providers'

/** Get local icon URL for a provider */
export function getProviderLogoUrl(providerName: string): string | null {
  const normalizedName = providerName.toLowerCase().trim()
  const providerKey = PROVIDER_REGISTRY[normalizedName]

  if (!providerKey) return null

  return `${ICON_BASE_PATH}/${providerKey}.svg`
}

/** Check if provider has a registered icon */
export function isKnownProvider(providerName: string): boolean {
  return providerName.toLowerCase().trim() in PROVIDER_REGISTRY
}
