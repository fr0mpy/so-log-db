import { Layout, Interactive } from '@stackone-ui/core/styles'

export const HomeStyles = {
  main: [Layout.Flex.col, Layout.Flex.centerBoth, 'min-h-screen p-8 gap-8'].join(' '),
  title: 'text-center',
  nav: [Layout.Flex.col, 'gap-4 w-full max-w-md'].join(' '),
  paper: 'w-full',
  link: [
    Interactive.Focus.ring,
    'text-primary hover:underline',
  ].join(' '),
} as const
