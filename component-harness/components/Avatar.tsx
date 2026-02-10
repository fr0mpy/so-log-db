import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import { forwardRef } from 'react'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg'
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, size = 'md', className, ...props }, ref) => {
    const sizes = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-muted',
          sizes[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt || 'Avatar'} className="h-full w-full object-cover" />
        ) : fallback ? (
          <span className="font-medium text-muted-foreground">{fallback}</span>
        ) : (
          <User className="h-1/2 w-1/2 text-muted-foreground" />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar }
