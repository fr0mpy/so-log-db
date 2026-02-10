import { cn } from '@/lib/utils'
import { forwardRef, useState, useRef, useCallback } from 'react'

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ min = 0, max = 100, step = 1, value, defaultValue = 50, onValueChange, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const indicatorRef = useRef<HTMLDivElement>(null)
    const currentValue = value !== undefined ? value : internalValue
    const percentage = ((currentValue - min) / (max - min)) * 100

    // Update indicator directly via DOM for instant feedback
    const updateIndicator = useCallback((newValue: number) => {
      if (indicatorRef.current) {
        const pct = (newValue - min) / (max - min)
        indicatorRef.current.style.transform = `scaleX(${pct})`
      }
    }, [min, max])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value)
      // Instant DOM update (bypasses React render cycle)
      updateIndicator(newValue)
      // Async state update for controlled component sync
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <div className={cn('relative w-full py-2', className)}>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-neu-base shadow-neu-pressed-sm">
          <div
            ref={indicatorRef}
            className="absolute h-full w-full origin-left bg-primary"
            style={{ transform: `scaleX(${percentage / 100})` }}
          />
        </div>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onInput={handleInput}
          className={cn(
            'absolute left-0 right-0 top-1/2 -translate-y-1/2 h-5 w-full cursor-pointer appearance-none bg-transparent',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5',
            '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neu-base',
            '[&::-webkit-slider-thumb]:shadow-neu-raised',
            '[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:duration-200',
            '[&::-webkit-slider-thumb]:hover:shadow-neu-raised-lg',
            '[&::-webkit-slider-thumb]:active:shadow-neu-pressed-sm',
            '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full',
            '[&::-moz-range-thumb]:bg-neu-base [&::-moz-range-thumb]:border-0',
            '[&::-moz-range-thumb]:shadow-neu-raised [&::-moz-range-thumb]:cursor-pointer',
            'focus-visible:outline-none'
          )}
          {...props}
        />
      </div>
    )
  }
)

Slider.displayName = 'Slider'

export { Slider }
