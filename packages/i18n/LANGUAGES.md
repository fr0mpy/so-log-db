# Internationalization (i18n)

This package provides type-safe internationalization for the StackOne multi-zone architecture using `next-intl`.

## Quick Start

```tsx
import { getTranslations, dashboard } from '@stackone/i18n'

export default async function Page() {
  const t = await getTranslations()
  return <h1>{t(dashboard.title)}</h1>
}
```

## Architecture

```
packages/i18n/
├── messages/
│   ├── en/
│   │   ├── common.json      # Shared: navigation, aria, labels
│   │   ├── shell.json       # Shell app specific
│   │   └── connectors.json  # Connectors MFE specific
│   └── fr/
│       ├── common.json
│       ├── shell.json
│       └── connectors.json
└── src/
    ├── index.ts             # Main exports
    ├── config.ts            # Locales, cookie name
    ├── keys.ts              # Typed translation keys
    ├── messages.ts          # Message loaders
    └── logger.ts            # Missing translation logger
```

## Supported Languages

| Code | Name | Status |
|------|------|--------|
| `en` | English | Default |
| `fr` | Français | Supported |

## Usage

### Server Components

```tsx
import { getTranslations, dashboard } from '@stackone/i18n'

export default async function Page() {
  const t = await getTranslations()

  return (
    <div>
      <h1>{t(dashboard.title)}</h1>
      <p>{t(dashboard.description)}</p>
    </div>
  )
}
```

### Metadata

```tsx
import { getTranslations, dashboard } from '@stackone/i18n'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()
  return {
    title: t(dashboard.metadata.title),
    description: t(dashboard.metadata.description),
  }
}
```

### Dynamic Values

Use `{variable}` syntax in JSON, pass object to `t()`:

```json
{
  "logDetail": {
    "breadcrumbLog": "Log {id}",
    "spans": "{count} spans"
  }
}
```

```tsx
t(logDetail.breadcrumbLog, { id: '123' })  // "Log 123"
t(explore.traces.spans, { count: 3 })      // "3 spans"
```

### Client Components

```tsx
'use client'
import { useTranslations } from 'next-intl'
import { dashboard } from '@stackone/i18n'

export function ClientComponent() {
  const t = useTranslations()
  return <span>{t(dashboard.title)}</span>
}
```

## Available Key Namespaces

```tsx
import {
  // Translation function
  getTranslations,

  // Page-specific keys
  dashboard,    // Dashboard page
  logs,         // Logs list page
  logDetail,    // Log detail page
  search,       // Search page
  explore,      // Explore page

  // Layout keys
  metadata,     // App metadata (title, description)
  sidebar,      // Sidebar content

  // Common keys (shared across pages)
  aria,         // ARIA labels for accessibility
  navigation,   // Nav item labels
  logLevels,    // All, Error, Warning, Info, Debug
  timeRanges,   // Last 24h, 7d, 30d, Custom
  dataTypes,    // All, Logs, Traces, Events
  status,       // healthy, unhealthy, degraded
  labels,       // Previous, Next, Loading
  brand,        // Brand name
} from '@stackone/i18n'
```

## Adding New Translations

### 1. Add to JSON files

Add keys to both language files:

```json
// messages/en/connectors.json
{
  "newFeature": {
    "title": "New Feature",
    "description": "Description here"
  }
}

// messages/fr/connectors.json
{
  "newFeature": {
    "title": "Nouvelle fonctionnalité",
    "description": "Description ici"
  }
}
```

### 2. Add typed key

```ts
// src/keys.ts
export const newFeature = {
  title: 'newFeature.title',
  description: 'newFeature.description',
} as const
```

### 3. Export from index

```ts
// src/index.ts
export { ..., newFeature } from './keys'
```

### 4. Use in component

```tsx
import { getTranslations, newFeature } from '@stackone/i18n'

const t = await getTranslations()
t(newFeature.title)
```

## Multi-Zone Locale Sync

Locale is synced across Shell and MFE via cookie (`NEXT_LOCALE`):

1. User changes language in Shell header
2. Cookie is set: `NEXT_LOCALE=fr`
3. MFE reads cookie via `i18n/request.ts`
4. Both apps render in same language

## Missing Translation Logger

Missing translations are logged in development:

```
[i18n] Missing: dashboard.newKey (locale: fr)
```

Configure in `src/logger.ts`:
- Development: Console warning
- Production: Can be extended to report to monitoring

## Configuration

```ts
// src/config.ts
export const locales = ['en', 'fr'] as const
export const defaultLocale = 'en'
export const LOCALE_COOKIE = 'NEXT_LOCALE'

export const localeNames = {
  en: 'English',
  fr: 'Français',
}
```

## Type Safety

Keys are fully typed with autocomplete:

```tsx
import { dashboard } from '@stackone/i18n'

dashboard.title           // ✅ Autocomplete works
dashboard.stats.totalLogs // ✅ Nested keys
dashboard.typo            // ❌ TypeScript error
```

## Service Worker Caching

Translation JSON files are cached by the Shell's service worker for offline support:

```js
// apps/shell/public/sw.js
const TRANSLATION_PATTERN = /\/(en|fr)\/(common|shell|connectors)\.json$/
```

## File Ownership

| File | Owner |
|------|-------|
| `messages/*/common.json` | Shared - update when adding common UI text |
| `messages/*/shell.json` | Shell app team |
| `messages/*/connectors.json` | Connectors MFE team |
| `src/keys.ts` | Must match JSON structure |
