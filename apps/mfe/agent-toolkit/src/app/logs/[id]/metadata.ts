import type { Metadata } from 'next'

export function createMetadata(id: string): Metadata {
  return {
    title: `Log ${id}`,
    description: `Detailed view of log entry ${id} with timestamp, level, message, and metadata`,
  }
}
