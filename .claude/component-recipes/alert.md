# Alert Component Recipe

## Structure
- Container with icon, title, and description
- Support variants: default, success, warning, destructive
- Optional dismiss button
- Optional action buttons

## IMPORTANT: Color Token Usage

**NEVER use hardcoded Tailwind colors.** Use semantic tokens only:

| Semantic Token | Purpose |
|----------------|---------|
| `bg-success`, `text-success`, `border-success` | Success states |
| `bg-warning`, `text-warning`, `border-warning` | Warning states |
| `bg-destructive`, `text-destructive`, `border-destructive` | Error/destructive states |
| `bg-accent`, `text-accent`, `border-accent` | Info/accent states |
| `bg-primary`, `text-primary`, `border-primary` | Primary actions |
| `bg-muted`, `text-muted-foreground` | Muted/secondary text |

## Tailwind Classes

### Container
```
relative w-full rounded-[USE_CONFIG_RADIUS] border p-4
[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:h-4 [&>svg]:w-4
[&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11
```

**Note:** Replace `rounded-[USE_CONFIG_RADIUS]` with the value from `.claude/styling-config.json` → `tokens.radius` (e.g., `rounded-none`, `rounded-md`, `rounded-lg`)

### Variants (Using Semantic Tokens)
```
default:     bg-background border-border text-foreground [&>svg]:text-foreground
success:     bg-success/10 border-success/20 text-success [&>svg]:text-success
warning:     bg-warning/10 border-warning/20 text-warning [&>svg]:text-warning
destructive: bg-destructive/10 border-destructive/20 text-destructive [&>svg]:text-destructive
```

### Title
```
mb-1 font-medium leading-none tracking-tight
```

### Description
```
text-sm [&_p]:leading-relaxed
```

### Dismiss Button
```
absolute right-2 top-2 rounded-[USE_CONFIG_RADIUS] p-1 opacity-70 cursor-pointer
hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
```

## Props Interface
```typescript
interface AlertProps {
  variant?: 'default' | 'success' | 'warning' | 'destructive'
  icon?: React.ReactNode
  title?: string
  onDismiss?: () => void
  children: React.ReactNode
}

interface AlertTitleProps {
  className?: string
  children: React.ReactNode
}

interface AlertDescriptionProps {
  className?: string
  children: React.ReactNode
}
```

## Icons per Variant
```
success:     <CheckCircle />
warning:     <AlertTriangle />
destructive: <XCircle /> or <AlertOctagon />
default:     <Info /> or custom
```

## Do
- Use semantic color tokens ONLY (bg-success, bg-warning, bg-destructive)
- Read `.claude/styling-config.json` for radius value
- Include `cursor-pointer` on dismiss button
- Use `focus-visible:` not `focus:` for keyboard accessibility
- Support composable pattern (Alert.Title, Alert.Description)

## Don't
- Use hardcoded colors (bg-green-500, bg-yellow-500, #XXXXXX)
- Use non-semantic Tailwind colors
- Use `focus:` instead of `focus-visible:`
- Forget `cursor-pointer` on interactive elements

## Example
```tsx
import { cn } from '@/lib/utils'
import { CheckCircle, AlertTriangle, XCircle, X, Info } from 'lucide-react'

const alertVariants = {
  default: 'bg-background border-border text-foreground',
  success: 'bg-success/10 border-success/20 text-success [&>svg]:text-success',
  warning: 'bg-warning/10 border-warning/20 text-warning [&>svg]:text-warning',
  destructive: 'bg-destructive/10 border-destructive/20 text-destructive [&>svg]:text-destructive',
}

const alertIcons = {
  default: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  destructive: XCircle,
}

const Alert = ({ variant = 'default', title, onDismiss, className, children, ...props }) => {
  const Icon = alertIcons[variant]

  return (
    <div
      role="alert"
      className={cn(
        // Base styles - replace rounded-lg with your config's tokens.radius
        'relative w-full rounded-lg border p-4',
        '[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:h-4 [&>svg]:w-4',
        '[&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11',
        alertVariants[variant],
        className
      )}
      {...props}
    >
      <Icon className="h-4 w-4" />
      <div>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{children}</AlertDescription>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute right-2 top-2 rounded p-1 opacity-70 cursor-pointer hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

const AlertTitle = ({ className, ...props }) => (
  <h5 className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
)

const AlertDescription = ({ className, ...props }) => (
  <div className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
)
```
