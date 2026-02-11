# Component Harness Styles

Centralized Tailwind CSS style constants using namespace pattern for the neumorphic component library.

## Architecture

```
styles/
├── index.ts         # Barrel export (import from here)
├── form.ts          # Form inputs, labels, helpers
├── feedback.ts      # Badge, Alert variants
├── control.ts       # Checkbox, Switch, Radio, Slider
├── layout.ts        # Flex patterns, spacing, sizing
├── interactive.ts   # Buttons, transitions, focus/disabled states
└── overlay.ts       # Modal, Dialog, Drawer, Card, Paper
```

## Usage

### Namespace Pattern (Recommended)

```tsx
import { Form, Layout, Overlay, Control, Feedback } from '../styles'

// Use namespaced styles
<label className={Form.Label.tracking}>Name</label>
<input className={Form.Input.base} />
<div className={Layout.Flex.center}>...</div>
<div className={Overlay.Card.container}>...</div>
```

### Utility Functions

```tsx
import { getInputStyles, getHelperStyles } from '../styles'

<input className={getInputStyles({ hasError: true })} />
<p className={getHelperStyles({ hasError: true })}>{error}</p>
```

## Namespace Reference

### Form (`form.ts`)
| Namespace | Properties |
|-----------|------------|
| `Form.Label` | `base`, `tracking` |
| `Form.Input` | `base`, `height`, `interactive`, `error`, `success`, `iconLeft`, `iconRight` |
| `Form.NumberInput` | `field`, `interactive`, `error`, `success` |
| `Form.Textarea` | `base`, `interactive`, `error`, `success` |
| `Form.Helper` | `base`, `default`, `error`, `success` |
| `Form.Stepper` | `base`, `left`, `right` |

### Layout (`layout.ts`)
| Namespace | Properties |
|-----------|------------|
| `Layout.Flex` | `center`, `centerBoth`, `between`, `col`, `colGap`, `inline` |
| `Layout.Spacing` | `standard`, `compact`, `input`, `noTop`, `gap1-3` |
| `Layout.Position` | `relative`, `absolute`, `fixed`, `centerY`, `centerX` |
| `Layout.Size` | `iconSm`, `iconMd`, `iconLg`, `touchTarget`, `square10`, `inputHeight` |

### Overlay (`overlay.ts`)
| Namespace | Properties |
|-----------|------------|
| `Overlay.Dialog` | `backdrop`, `portal`, `content`, `header`, `footer`, `title`, `description` |
| `Overlay.Drawer` | `backdrop`, `header`, `title` |
| `Overlay.Card` | `container`, `header`, `content`, `footer`, `title`, `description` |
| `Overlay.Paper` | `base`, `elevated`, `inset` |

### Control (`control.ts`)
| Namespace | Properties |
|-----------|------------|
| `Control.Toggle` | `base`, `unchecked`, `checked`, `checkedState`, `disabled`, `focus`, `label` |
| `Control.Slider` | `track`, `thumbWebkit`, `thumbMoz`, `thumb` |

### Feedback (`feedback.ts`)
| Namespace | Properties |
|-----------|------------|
| `Feedback.Badge` | `base`, `primary`, `secondary`, `destructive`, `success`, `warning`, `info`, `outline` |
| `Feedback.Alert` | `base`, `info`, `success`, `warning`, `destructive`, `icon`, `title`, `description` |

## Adding New Styles

1. Identify the category (form, layout, overlay, etc.)
2. Add to appropriate namespace in the file
3. Export from `index.ts`
4. Use array + `.join(' ')` for multi-line:

```ts
export const MyNamespace = {
  base: [
    'flex items-center',
    'bg-neu-base shadow-neu-raised',
    'transition-shadow duration-200',
  ].join(' '),
  variant: 'text-primary',
} as const
```

## CVA Integration

For variant-heavy components, combine CVA with namespaced styles:

```tsx
import { cva } from 'class-variance-authority'
import { Feedback } from '../styles'

const badgeVariants = cva(Feedback.Badge.base, {
  variants: {
    variant: {
      primary: Feedback.Badge.primary,
      secondary: Feedback.Badge.secondary,
      // ...
    },
  },
})
```
