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

// Border radius for smooth corners only (not edges)
const BORDER_RADIUS = 3
const CORNER_FILL = 1 // Minimal overlap to prevent flashing gaps at corners

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
          {/* Front face */}
          <div
            style={{
              width: cube + CORNER_FILL * 2,
              height: cube + CORNER_FILL * 2,
              position: 'absolute',
              top: -CORNER_FILL,
              left: -CORNER_FILL,
              opacity: 0.8,
              borderRadius: BORDER_RADIUS,
              transform: `translateZ(${translate}px)`,
              backgroundColor: faceColors.front,
            }}
          />
          {/* Back face */}
          <div
            style={{
              width: cube + CORNER_FILL * 2,
              height: cube + CORNER_FILL * 2,
              position: 'absolute',
              top: -CORNER_FILL,
              left: -CORNER_FILL,
              opacity: 0.8,
              borderRadius: BORDER_RADIUS,
              transform: `translateZ(-${translate}px)`,
              backgroundColor: faceColors.back,
            }}
          />
          {/* Left face */}
          <div
            style={{
              width: cube + CORNER_FILL * 2,
              height: cube + CORNER_FILL * 2,
              position: 'absolute',
              top: -CORNER_FILL,
              left: -CORNER_FILL,
              opacity: 0.8,
              borderRadius: BORDER_RADIUS,
              transform: `rotateY(90deg) translateZ(${translate}px)`,
              backgroundColor: faceColors.left,
            }}
          />
          {/* Right face */}
          <div
            style={{
              width: cube + CORNER_FILL * 2,
              height: cube + CORNER_FILL * 2,
              position: 'absolute',
              top: -CORNER_FILL,
              left: -CORNER_FILL,
              opacity: 0.8,
              borderRadius: BORDER_RADIUS,
              transform: `rotateY(-90deg) translateZ(${translate}px)`,
              backgroundColor: faceColors.right,
            }}
          />
          {/* Top face */}
          <div
            style={{
              width: cube + CORNER_FILL * 2,
              height: cube + CORNER_FILL * 2,
              position: 'absolute',
              top: -CORNER_FILL,
              left: -CORNER_FILL,
              opacity: 0.8,
              borderRadius: BORDER_RADIUS,
              transform: `rotateX(90deg) translateZ(${translate}px)`,
              backgroundColor: faceColors.top,
            }}
          />
          {/* Bottom face */}
          <div
            style={{
              width: cube + CORNER_FILL * 2,
              height: cube + CORNER_FILL * 2,
              position: 'absolute',
              top: -CORNER_FILL,
              left: -CORNER_FILL,
              opacity: 0.8,
              borderRadius: BORDER_RADIUS,
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
