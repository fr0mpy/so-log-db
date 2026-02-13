# Bundle Optimization

## Granular Imports

**ALWAYS use granular imports from @stackone-ui/core:**

```tsx
// ❌ NEVER import from barrel (pulls ALL 24+ components into bundle)
import { Card, Badge, Spinner } from '@stackone-ui/core'

// ✅ ALWAYS use granular paths (tree-shakeable)
import { Card, CardHeader } from '@stackone-ui/core/card'
import { Badge } from '@stackone-ui/core/badge'
import { Spinner } from '@stackone-ui/core/spinner'
import { ARIA } from '@stackone-ui/core/config'
```

## Available Granular Exports

| Export | Server-safe | Notes |
|--------|-------------|-------|
| `@stackone-ui/core/card` | ✅ Yes | Static display component |
| `@stackone-ui/core/text` | ✅ Yes | **Use instead of raw `<p>`, `<h1>`-`<h6>`, `<span>`** |
| `@stackone-ui/core/badge` | ✅ Yes | Static display component |
| `@stackone-ui/core/spinner` | ✅ Yes | CSS animation only |
| `@stackone-ui/core/button` | ❌ No | Has loading state with motion |
| `@stackone-ui/core/config` | ✅ Yes | ARIA, LABEL constants |
| `@stackone-ui/core/styles` | ✅ Yes | Style patterns |
| `@stackone-ui/core/providers` | ❌ No | ThemeProvider uses hooks |
| `@stackone-ui/core/hooks` | ❌ No | All hooks are client |

## Text Component Rule

Never use raw `<p>`, `<span>`, `<h1>`-`<h6>` tags. Always use `<Text>` component.

See `.claude/skills/styling.md` for variants and usage.

## Server vs Client

- `@stackone-ui/core` barrel has `'use client'` - never import from it in server components
- Check individual component files for `'use client'` directive

**Interactive components are client-only:**
- Select, Slider, Dialog, Drawer, Accordion, Menu, Tabs, Toast, Tooltip

## Performance Targets

- Lighthouse Performance: 90+
- Total Blocking Time: <200ms
- Unused JavaScript: <500KB
