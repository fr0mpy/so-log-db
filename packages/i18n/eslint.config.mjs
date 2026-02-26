import { configs } from '@stackone/eslint-config'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...configs.typescript,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // This package re-exports from next-intl, so disable the i18n import rule
    rules: {
      'stackone/i18n-imports': 'off',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
]
