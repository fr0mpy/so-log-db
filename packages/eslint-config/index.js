import base from './configs/base.js'
import formatting from './configs/formatting.js'
import imports from './configs/imports.js'
import jsxA11y from './configs/jsx-a11y.js'
import next from './configs/next.js'
import react from './configs/react.js'
import typescript from './configs/typescript.js'
import { rules as stackoneRules } from './rules/index.js'

/**
 * Custom StackOne ESLint plugin with project-specific rules
 */
export const stackonePlugin = {
  rules: stackoneRules,
}

/**
 * StackOne custom rules configuration
 * @type {import('eslint').Linter.Config}
 */
const stackoneConfig = {
  name: 'stackone/custom',
  plugins: {
    stackone: stackonePlugin,
  },
  rules: {
    // Enforce granular imports from @stackone-ui/core
    'stackone/granular-imports': 'error',
    // Enforce i18n imports from @stackone/i18n
    'stackone/i18n-imports': 'warn',
    // Warn on hardcoded route strings
    'stackone/no-hardcoded-routes': 'warn',
  },
}

/**
 * Pre-composed configurations for common use cases
 */
export const configs = {
  /**
   * For pure TypeScript packages (utils, i18n)
   * No React, no browser globals
   */
  typescript: [base, typescript, imports, formatting],

  /**
   * For React libraries (ui-library/core)
   * React + hooks + a11y, no Next.js
   */
  react: [base, typescript, react, jsxA11y, imports, formatting, stackoneConfig],

  /**
   * For Next.js apps (shell, mfe/*)
   * Full stack: React + Next.js + a11y + custom rules
   */
  next: [base, typescript, react, jsxA11y, imports, next, formatting, stackoneConfig],

  /**
   * For Vite apps (harness)
   * React without Next.js specifics
   */
  vite: [base, typescript, react, jsxA11y, imports, formatting, stackoneConfig],
}

// Individual configs for granular composition
export { base, typescript, react, jsxA11y, imports, next, formatting }

// Default export for simple usage
export default configs.next
