/**
 * Mock Log Data Configuration
 *
 * Constants for generating realistic mock log entries.
 * Used by mock-data-generator.ts
 */

export const PROVIDERS = [
  { name: 'Attio', version: 'v1.0.0' },
  { name: 'Humaans', version: 'v1.0.0' },
  { name: 'Salesforce', version: 'v2.1.0' },
  { name: 'HubSpot', version: 'v1.2.0' },
  { name: 'Workday', version: 'v3.0.0' },
] as const

export const ORIGIN_OWNERS = [
  'StackOne Interviews',
  'StackOne HR',
  'StackOne Sales',
  'StackOne Marketing',
] as const

export const REQUESTS = [
  { method: 'GET', name: 'List People' },
  { method: 'GET', name: 'Get Person' },
  { method: 'POST', name: 'Create Person' },
  { method: 'PUT', name: 'Update Person' },
  { method: 'DELETE', name: 'Delete Person' },
  { method: 'GET', name: 'List Companies' },
  { method: 'GET', name: 'Get Company' },
  { method: 'POST', name: 'Create Company' },
  { method: 'GET', name: 'Search Records' },
  { method: 'POST', name: 'Sync Data' },
  { method: 'GET', name: 'List Employees' },
  { method: 'GET', name: 'Get Token Info' },
] as const

export const SOURCES = [
  'MCP Tool',
  'API Direct',
  'Webhook',
  'Scheduled Job',
] as const

/**
 * Status distribution weights
 * Distribution: 70% success, 20% client error, 10% server error
 */
export const STATUS_WEIGHTS = [
  { status: 200, weight: 60 },
  { status: 201, weight: 10 },
  { status: 400, weight: 8 },
  { status: 401, weight: 4 },
  { status: 404, weight: 5 },
  { status: 422, weight: 3 },
  { status: 500, weight: 5 },
  { status: 502, weight: 3 },
  { status: 503, weight: 2 },
] as const

/**
 * Mock log generation configuration
 */
export const MOCK_LOG_CONFIG = {
  /** Distribution of logs across time buckets */
  distribution: {
    today: 0.3,
    yesterday: 0.2,
    past: 0.5,
  },
  /** Business hours for log timestamps */
  businessHours: {
    start: 8,
    duration: 10,
  },
  /** Base duration range for requests (ms) */
  duration: {
    base: 50,
    variance: 200,
    errorPenalty: 500,
  },
} as const

export type Provider = (typeof PROVIDERS)[number]
export type OriginOwner = (typeof ORIGIN_OWNERS)[number]
export type Request = (typeof REQUESTS)[number]
export type Source = (typeof SOURCES)[number]
export type StatusWeight = (typeof STATUS_WEIGHTS)[number]
