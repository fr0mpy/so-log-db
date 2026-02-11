import { cn } from '@/lib/utils'
import { forwardRef, useState } from 'react'
import { SLIDER_THUMB, SLIDER_TRACK_BASE } from '../../styles'

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
    const currentValue = value !== undefined ? value : internalValue
    const [indicatorScale, setIndicatorScale] = useState((currentValue - min) / (max - min))

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value)
      setIndicatorScale((newValue - min) / (max - min))
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <div className={cn('relative w-full py-2', className)}>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-neu-base shadow-neu-pressed-sm">
          <div
            className="absolute h-full w-full origin-left bg-primary"
            style={{ transform: `scaleX(${indicatorScale})` }}
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
            SLIDER_TRACK_BASE,
            SLIDER_THUMB,
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
