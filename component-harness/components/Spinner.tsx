import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

const sizeConfig = {
  sm: { cube: 24, translate: 12 },
  md: { cube: 40, translate: 20 },
  lg: { cube: 56, translate: 28 },
}

const faceColors = {
  front: '#00af66',           // Primary green
  back: '#00935a',            // Darker green
  left: '#d4d4d4',            // Light grey
  right: '#e5e5e5',           // Lighter grey
  top: '#404040',             // Faded black
  bottom: '#525252',          // Lighter faded black
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', className, ...props }, ref) => {
    const { cube, translate } = sizeConfig[size]

    return (
      <div
        ref={ref}
        role="status"
        className={cn('inline-flex items-center justify-center', className)}
        style={{ perspective: '800px' }}
        {...props}
      >
        <style>
          {`
            @keyframes cube-spin {
              0% { transform: rotateX(0) rotateY(0) rotateZ(0); }
              100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
            }
          `}
        </style>
        <div
          style={{
            width: cube,
            height: cube,
            position: 'relative',
            transformStyle: 'preserve-3d',
            animation: 'cube-spin 3s linear infinite',
          }}
        >
          <div
            style={{
              width: cube,
              height: cube,
              position: 'absolute',
              opacity: 0.8,
              transform: `translateZ(${translate}px)`,
              backgroundColor: faceColors.front,
            }}
          />
          <div
            style={{
              width: cube,
              height: cube,
              position: 'absolute',
              opacity: 0.8,
              transform: `translateZ(-${translate}px)`,
              backgroundColor: faceColors.back,
            }}
          />
          <div
            style={{
              width: cube,
              height: cube,
              position: 'absolute',
              opacity: 0.8,
              transform: `rotateY(90deg) translateZ(${translate}px)`,
              backgroundColor: faceColors.left,
            }}
          />
          <div
            style={{
              width: cube,
              height: cube,
              position: 'absolute',
              opacity: 0.8,
              transform: `rotateY(-90deg) translateZ(${translate}px)`,
              backgroundColor: faceColors.right,
            }}
          />
          <div
            style={{
              width: cube,
              height: cube,
              position: 'absolute',
              opacity: 0.8,
              transform: `rotateX(90deg) translateZ(${translate}px)`,
              backgroundColor: faceColors.top,
            }}
          />
          <div
            style={{
              width: cube,
              height: cube,
              position: 'absolute',
              opacity: 0.8,
              transform: `rotateX(-90deg) translateZ(${translate}px)`,
              backgroundColor: faceColors.bottom,
            }}
          />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'

export { Spinner }
