'use server'

export type ReplayResult =
  | { success: true; logId: string }
  | { success: false; error: string }

export async function replayRequest(logId: string): Promise<ReplayResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Mock: 90% success rate
  if (Math.random() > 0.1) {
    return { success: true, logId }
  }
  return { success: false, error: 'Service temporarily unavailable' }
}
