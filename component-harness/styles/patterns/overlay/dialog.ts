export const Dialog = {
  backdrop: 'fixed inset-0 z-modal bg-foreground/80 backdrop-blur-sm cursor-pointer',
  portal: 'fixed inset-0 z-modal flex items-center justify-center p-4 pointer-events-none',
  content: [
    'relative z-modal w-full max-w-lg rounded-theme-xl p-6',
    'bg-neu-base shadow-neu-raised-lg pointer-events-auto',
  ].join(' '),
  header: 'flex flex-col space-y-1.5 pb-4',
  footer: 'flex items-center justify-end gap-2 pt-4',
  title: 'font-heading text-lg font-semibold text-foreground',
  description: 'text-sm text-muted-foreground',
} as const
