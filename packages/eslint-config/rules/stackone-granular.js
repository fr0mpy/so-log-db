/**
 * Rule: stackone/granular-imports
 *
 * Enforces importing from granular paths instead of barrel imports.
 * This improves bundle size and tree-shaking.
 *
 * @example
 * // ❌ Bad - barrel import pulls in all components
 * import { Button, Card } from '@stackone-ui/core'
 *
 * // ✅ Good - granular imports are tree-shakeable
 * import { Button } from '@stackone-ui/core/button'
 * import { Card } from '@stackone-ui/core/card'
 */

// Map of components to their granular import paths
const COMPONENT_PATHS = {
  // UI Components
  Button: 'button',
  Card: 'card',
  CardHeader: 'card',
  CardContent: 'card',
  CardFooter: 'card',
  Text: 'text',
  Badge: 'badge',
  Spinner: 'spinner',
  Dialog: 'dialog',
  Drawer: 'drawer',
  Select: 'select',
  Slider: 'slider',
  Accordion: 'accordion',
  Menu: 'menu',
  Tabs: 'tabs',
  Toast: 'toast',
  Tooltip: 'tooltip',
  Pagination: 'pagination',

  // Config/Constants
  ARIA: 'config',
  LABEL: 'config',
  SR_ONLY: 'config',
  SPRING: 'config',
  DURATION: 'config',
  OPACITY: 'config',

  // Providers
  ThemeProvider: 'providers',

  // Hooks
  useControlledState: 'hooks',
  useBodyScrollLock: 'hooks',
  useEscapeKey: 'hooks',
  useClickOutside: 'hooks',
  usePositioning: 'hooks',
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce granular imports from @stackone-ui/core',
      recommended: true,
    },
    messages: {
      useGranular:
        'Import "{{ name }}" from "@stackone-ui/core/{{ path }}" instead of the barrel export. Granular imports improve bundle size.',
      barrelImport:
        'Avoid importing from "@stackone-ui/core" barrel. Use granular paths like "@stackone-ui/core/button".',
    },
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const source = node.source.value

        // Only check @stackone-ui/core barrel imports
        if (source !== '@stackone-ui/core') {
          return
        }

        const specifiers = node.specifiers.filter((s) => s.type === 'ImportSpecifier')

        if (specifiers.length === 0) {
          // Namespace import like: import * as UI from '@stackone-ui/core'
          context.report({
            node,
            messageId: 'barrelImport',
          })
          return
        }

        // Report each named import with its suggested granular path
        for (const specifier of specifiers) {
          const name = specifier.imported.name
          const granularPath = COMPONENT_PATHS[name]

          if (granularPath) {
            context.report({
              node: specifier,
              messageId: 'useGranular',
              data: {
                name,
                path: granularPath,
              },
            })
          } else {
            // Unknown export - still warn about barrel
            context.report({
              node: specifier,
              messageId: 'barrelImport',
            })
          }
        }
      },
    }
  },
}
