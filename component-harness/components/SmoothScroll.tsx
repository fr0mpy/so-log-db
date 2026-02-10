import { ReactLenis, type LenisRef } from 'lenis/react'
import { forwardRef, type ReactNode } from 'react'

interface SmoothScrollProps {
  children: ReactNode
  className?: string
  /** Lenis configuration options */
  options?: {
    /** Scroll lerp (linear interpolation) - lower = smoother, higher = snappier. Default: 0.1 */
    lerp?: number
    /** Scroll duration in seconds. Default: 1.2 */
    duration?: number
    /** Scroll easing function */
    easing?: (t: number) => number
    /** Scroll orientation: 'vertical' | 'horizontal'. Default: 'vertical' */
    orientation?: 'vertical' | 'horizontal'
    /** Enable smooth scroll. Default: true */
    smoothWheel?: boolean
    /** Multiplier for wheel delta. Default: 1 */
    wheelMultiplier?: number
    /** Multiplier for touch delta. Default: 2 */
    touchMultiplier?: number
  }
}

/**
 * SmoothScroll wrapper using Lenis for buttery smooth scrolling.
 * Wrap any scrollable container with this component.
 */
const SmoothScroll = forwardRef<LenisRef, SmoothScrollProps>(
  ({ children, className, options = {} }, ref) => {
    const defaultOptions = {
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      ...options,
    }

    return (
      <ReactLenis
        ref={ref}
        className={className}
        options={defaultOptions}
      >
        {children}
      </ReactLenis>
    )
  }
)

SmoothScroll.displayName = 'SmoothScroll'

export { SmoothScroll }
export type { SmoothScrollProps }
