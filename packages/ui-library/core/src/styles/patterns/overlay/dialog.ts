export const Dialog = {
  backdrop: 'fixed inset-0 z-modal bg-foreground/80 backdrop-blur-sm cursor-pointer',
  portal: 'fixed inset-0 z-modal flex items-center justify-center p-4 pointer-events-none',
  // Responsive content: nearly full-width on mobile, constrained on larger screens
  content: [
    'relative z-modal w-full',
    'max-w-[calc(100vw-2rem)] sm:max-w-md md:max-w-lg', // Responsive max-width
    'rounded-theme-lg sm:rounded-theme-xl', // Smaller radius on mobile
    'p-4 sm:p-6', // Responsive padding
    'bg-neu-base shadow-neu-raised-lg pointer-events-auto',
  ].join(' '),
  header: 'flex flex-col space-y-1.5 pb-4',
  // Responsive footer: stack on mobile, row on larger screens
  footer: [
    'flex flex-col-reverse gap-2',
    'sm:flex-row sm:items-center sm:justify-end',
    'pt-4',
  ].join(' '),
  title: 'font-heading text-lg font-semibold text-foreground',
  description: 'text-sm text-muted-foreground',
} as const
