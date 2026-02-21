# StackOne Documentation

Technical documentation for the StackOne Log Dashboard platform.

## Quick Links

| Doc | Description |
|-----|-------------|
| [Architecture](architecture.md) | Multi-zone MFE setup, runtime flows, navigation |
| [Deployment](deployment.md) | Vercel configuration, environment variables |
| [Data Fetching](data-fetching.md) | SSR-first approach, caching strategies, SWR |
| [Theming](theming.md) | Two-tier theme system, CSS variables |
| [Fonts](fonts.md) | Font loading, CLS prevention |
| [i18n](i18n.md) | Cookie-based locale, typed translation keys |
| [Styling](styling.md) | Zero-inline-classnames, namespace patterns |
| [Performance](performance.md) | Bundle optimization, targets |
| [Caching](caching.md) | Service worker strategies |
| [Claude Prompts](claude-prompts.md) | AI tooling: rules, agents, commands |

## Project Structure

```
apps/
  shell/                        # Main entry (port 3000)
  mfe/
    agent-toolkit/              # Log dashboard MFE (port 3001)
    component-library/          # Component showcase MFE (port 3002)
    design-review/              # Design assets MFE (port 3003)
packages/
  ui-library/core/              # @stackone-ui/core components
  i18n/                         # @stackone/i18n translations
  utils/                        # @stackone/utils shared utilities
```

## Getting Started

```bash
pnpm install
pnpm dev          # All apps in parallel
pnpm dev:shell    # Shell only
```

See the main [README](../README.md) for full setup instructions.
