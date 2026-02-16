'use client'

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'
import { SIDENAV_DIMENSIONS } from '@stackone-ui/core/sidenav'

interface SidebarContextValue {
  isExpanded: boolean
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
 */
export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const expand = useCallback(() => setIsExpanded(true), [])
  const collapse = useCallback(() => setIsExpanded(false), [])

  // Memoize provider value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      isExpanded,
      expand,
      collapse,
      collapsedWidth: SIDENAV_DIMENSIONS.collapsed,
      expandedWidth: SIDENAV_DIMENSIONS.expanded,
    }),
    [isExpanded, expand, collapse]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}
