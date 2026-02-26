'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { initLocalDB, type LocalDBStatus } from '../lib/local-db'

const LocalDBContext = createContext<LocalDBStatus | null>(null)

const POWERSYNC_URL = process.env.NEXT_PUBLIC_POWERSYNC_URL || ''

export function LocalDBProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<LocalDBStatus>({ ready: false, syncing: false })

  useEffect(() => {
    if (!POWERSYNC_URL) {
      setStatus({ ready: false, syncing: false })
      return
    }
    void initLocalDB({ backendUrl: POWERSYNC_URL, database: 'stackone' }).then(setStatus)
  }, [])

  return <LocalDBContext.Provider value={status}>{children}</LocalDBContext.Provider>
}

export function useLocalDB() {
  const ctx = useContext(LocalDBContext)
  if (!ctx) throw new Error('useLocalDB must be used within LocalDBProvider')
  return ctx
}
