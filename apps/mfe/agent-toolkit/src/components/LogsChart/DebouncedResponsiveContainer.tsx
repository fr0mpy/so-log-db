'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'

interface DebouncedResponsiveContainerProps {
  children: (dimensions: { width: number; height: number }) => ReactNode
  debounceMs?: number
  className?: string
}

/**
 * A responsive container that debounces size changes to prevent
 * expensive re-renders during CSS animations (like sidebar expand/collapse).
 *
 * Unlike Recharts' ResponsiveContainer which fires on every resize event,
 * this only updates dimensions after the resize has "settled".
 */
export function DebouncedResponsiveContainer({
  children,
  debounceMs = 150,
  className,
}: DebouncedResponsiveContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Initial measurement
    const rect = container.getBoundingClientRect()
    setDimensions({ width: rect.width, height: rect.height })

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return

      const { width, height } = entry.contentRect

      // Clear any pending update
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Debounce the dimension update
      timeoutRef.current = setTimeout(() => {
        setDimensions({ width, height })
      }, debounceMs)
    })

    observer.observe(container)

    return () => {
      observer.disconnect()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [debounceMs])

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }}>
      {dimensions.width > 0 && dimensions.height > 0 && children(dimensions)}
    </div>
  )
}
