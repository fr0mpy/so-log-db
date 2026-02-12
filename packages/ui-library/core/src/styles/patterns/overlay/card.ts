export const Card = {
  container: [
    'rounded-theme-xl bg-neu-base shadow-neu-raised',
    'transition-shadow duration-200 ease-neu',
  ].join(' '),
  header: 'flex flex-col space-y-1.5 p-6',
  content: 'p-6 pt-0',
  footer: 'flex items-center p-6 pt-0',
  title: 'font-heading text-lg font-semibold text-foreground',
  description: 'text-sm text-muted-foreground',
} as const
