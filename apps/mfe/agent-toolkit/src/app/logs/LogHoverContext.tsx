'use client'

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

type HoverCallback = (time: string | null) => void

interface LogHoverContextValue {
  /** Ref holding current hovered time (always up-to-date, no re-renders) */
  hoveredTimeRef: React.RefObject<string | null>
  /** Set hovered time - batched via RAF for performance */
  setHoveredTime: (time: string | null) => void
  /** Subscribe to hover changes (for components that need to react) */
  subscribe: (callback: HoverCallback) => () => void
}

const LogHoverContext = createContext<LogHoverContextValue | null>(null)

export function LogHoverProvider({ children }: { children: ReactNode }) {
  const hoveredTimeRef = useRef<string | null>(null)
  const listenersRef = useRef<Set<HoverCallback>>(new Set())
  const rafIdRef = useRef<number | null>(null)

  const setHoveredTime = (time: string | null) => {
    // Skip if unchanged
    if (hoveredTimeRef.current === time) return

    // Store immediately in ref (always current)
    hoveredTimeRef.current = time

    // Batch notifications to next animation frame (60fps max)
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null
        const currentTime = hoveredTimeRef.current
        listenersRef.current.forEach((cb) => cb(currentTime))
      })
    }
  }

  const subscribe = (callback: HoverCallback) => {
    listenersRef.current.add(callback)
    return () => {
      listenersRef.current.delete(callback)
    }
  }

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  const value = { hoveredTimeRef, setHoveredTime, subscribe }

  return <LogHoverContext.Provider value={value}>{children}</LogHoverContext.Provider>
}

/** Low-level hook - returns ref and setter (no re-renders) */
export function useLogHover() {
  const context = useContext(LogHoverContext)
  if (!context) {
    throw new Error('useLogHover must be used within a LogHoverProvider')
  }
  return context
}

/** Hook for components that need React state (causes re-renders on hover change) */
export function useHoveredTime() {
  const { subscribe, hoveredTimeRef } = useLogHover()
  const [time, setTime] = useState<string | null>(hoveredTimeRef.current)

  useEffect(() => {
    // Sync initial value
    setTime(hoveredTimeRef.current)
    // Subscribe to future changes
    return subscribe(setTime)
  }, [subscribe, hoveredTimeRef])

  return time
}
