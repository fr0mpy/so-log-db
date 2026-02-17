'use client'

import {
  createContext,
  useContext,
  useState,
  useTransition,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { SIDENAV_DIMENSIONS } from '@stackone-ui/core/sidenav'

interface SidebarContextValue {
  isExpanded: boolean
  isPending: boolean
  isAnimating: boolean
  expand: () => void
  collapse: () => void
  collapsedWidth: number
  expandedWidth: number
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: ReactNode
}

/**
 * Provides sidebar state to both the sidebar and main content
 * Allows main content to respond to sidebar expansion
 *
 * Uses React 19 useTransition to mark expand/collapse as low-priority,
 * allowing CSS animations to run smoothly without blocking on re-renders.
 */
/** Animation duration must match CSS transition-[width] duration-200 */
const ANIMATION_DURATION_MS = 200

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPending, startTransition] = useTransition()
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const expand = () => {
    // Clear any pending timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }
    // Mark animation start
    setIsAnimating(true)
    // Clear after CSS transition completes
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
    }, ANIMATION_DURATION_MS)

    startTransition(() => setIsExpanded(true))
  }

  const collapse = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }
    setIsAnimating(true)
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
    }, ANIMATION_DURATION_MS)

    startTransition(() => setIsExpanded(false))
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  const contextValue = {
    isExpanded,
    isPending,
    isAnimating,
    expand,
    collapse,
    collapsedWidth: SIDENAV_DIMENSIONS.collapsed,
    expandedWidth: SIDENAV_DIMENSIONS.expanded,
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}
