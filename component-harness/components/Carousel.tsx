import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { forwardRef, useState } from 'react'

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[]
  showIndicators?: boolean
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ items, showIndicators = true, className, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const goToNext = () => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }

    const goToPrevious = () => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    }

    const goToSlide = (index: number) => {
      setCurrentIndex(index)
    }

    return (
      <div
        ref={ref}
        className={cn('relative w-full', className)}
        {...props}
      >
        <div className="overflow-hidden rounded-theme-lg">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div key={index} className="min-w-full">
                {item}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={goToPrevious}
          className={cn(
            'absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer min-h-11 min-w-11',
            'rounded-full bg-background/80 p-2 shadow-theme-md backdrop-blur-sm',
            'transition-colors hover:bg-background',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
          )}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={goToNext}
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer min-h-11 min-w-11',
            'rounded-full bg-background/80 p-2 shadow-theme-md backdrop-blur-sm',
            'transition-colors hover:bg-background',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
          )}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {showIndicators && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'h-2 w-2 rounded-full transition-all cursor-pointer',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  index === currentIndex
                    ? 'bg-primary w-4'
                    : 'bg-background/60 hover:bg-background/80'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)

Carousel.displayName = 'Carousel'

export { Carousel }
