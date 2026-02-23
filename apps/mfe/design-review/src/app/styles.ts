export const PageStyles = {
  main: 'flex flex-col min-h-screen',
  stickyHeader: 'sticky top-0 z-10 bg-background p-6 flex items-center shadow-neu-raised transition-shadow duration-200 [clip-path:inset(0_-100%_-100%_0)]',
  header: 'flex items-center gap-4 flex-1',
  tabsList: 'w-auto flex-shrink-0',
  headerSpacer: 'flex-1',
  content: 'flex flex-col flex-1 gap-4 p-6 pt-4',
  tabContent: 'flex flex-col flex-1',
  overviewContent: 'flex flex-col flex-1 p-6 whitespace-pre-line max-w-5xl mx-auto text-center',
} as const
