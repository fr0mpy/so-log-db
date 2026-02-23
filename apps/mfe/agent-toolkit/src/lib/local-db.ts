/**
 * Local database configuration for offline-first sync.
 * Uses PowerSync + SQLite for fast local queries.
 *
 * @see https://docs.powersync.com
 */

export interface LocalDBConfig {
  /** PowerSync backend URL */
  backendUrl: string
  /** Database name */
  database: string
}

export interface LocalDBStatus {
  ready: boolean
  syncing: boolean
}

/**
 * Initialize local database.
 * Requires: @powersync/web package + PowerSync backend service
 */
export function initLocalDB(config: LocalDBConfig): Promise<LocalDBStatus> {
  // Stub implementation - returns mock status
  console.info('[LocalDB] Init with:', config.database)
  return Promise.resolve({ ready: true, syncing: false })
}
