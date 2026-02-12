import { Layout } from '@stackone-ui/core/styles'

export const HomeStyles = {
  main: [Layout.Flex.centerBoth, 'min-h-screen p-8'].join(' '),
  card: 'w-full max-w-md',
  cardContent: [Layout.Flex.col, 'gap-4'].join(' '),
  nav: [Layout.Flex.center, 'gap-4'].join(' '),
} as const
