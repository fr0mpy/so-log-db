'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { initPowerSync } from '../lib/powersync'

interface PowerSyncContextValue {
  ready: boolean
}

const PowerSyncContext = createContext<PowerSyncContextValue | null>(null)

const POWERSYNC_URL = process.env.NEXT_PUBLIC_POWERSYNC_URL || ''

export function PowerSyncProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!POWERSYNC_URL) return

    initPowerSync({
      backendUrl: POWERSYNC_URL,
      database: 'stackone',
    })

    // Stub: mark ready after init
    setReady(true)
  }, [])

  return (
    <PowerSyncContext.Provider value={{ ready }}>
      {children}
    </PowerSyncContext.Provider>
  )
}

export function usePowerSync() {
  const ctx = useContext(PowerSyncContext)
  if (!ctx) throw new Error('usePowerSync must be used within PowerSyncProvider')
  return ctx
}
