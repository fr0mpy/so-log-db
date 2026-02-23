'use client'

import { useState, useCallback, useEffect } from 'react'

/**
 * Hook to detect if an element's text content is truncated (overflow hidden with ellipsis).
 * Uses ResizeObserver to re-check on element resize.
 *
 * @example
 * ```tsx
 * function TruncatedText({ text }: { text: string }) {
 *   const { ref, isTruncated } = useIsTruncated<HTMLSpanElement>()
 *
 *   const content = <span ref={ref} className="truncate">{text}</span>
 *
 *   return isTruncated ? <Tooltip content={text}>{content}</Tooltip> : content
 * }
 * ```
 */
export function useIsTruncated<T extends HTMLElement>() {
  const [isTruncated, setIsTruncated] = useState(false)
  const [element, setElement] = useState<T | null>(null)

  const ref = useCallback((node: T | null) => {
    setElement(node)
  }, [])

  useEffect(() => {
    if (!element) return

    const checkTruncation = () => {
      setIsTruncated(element.scrollWidth > element.clientWidth)
    }

    checkTruncation()

    const observer = new ResizeObserver(checkTruncation)
    observer.observe(element)

    return () => observer.disconnect()
  }, [element])

  return { ref, isTruncated }
}
