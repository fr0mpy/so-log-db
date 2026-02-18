import { Layout } from '@stackone-ui/core/styles'

export const PageStyles = {
  main: [Layout.Flex.col, 'min-h-screen p-6 gap-6'].join(' '),
  header: [Layout.Flex.between, 'items-center'].join(' '),
  backLink: 'text-primary hover:underline',
  content: [Layout.Flex.col, 'flex-1 gap-4'].join(' '),
  tabContent: [Layout.Flex.col, 'flex-1'].join(' '),
} as const
