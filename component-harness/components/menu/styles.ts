export const MenuStyles = {
  trigger: 'cursor-pointer',
  positioner: 'absolute z-50 mt-1',
  popup: [
    'min-w-[12rem] rounded-theme-md border border-border',
    'bg-background shadow-theme-lg glass p-1 origin-top',
  ].join(' '),
  item: [
    'relative flex w-full cursor-pointer select-none items-center rounded-theme-sm px-2 py-1.5',
    'text-sm outline-none transition-colors',
    'hover:bg-muted focus-visible:bg-muted',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  separator: 'my-1 h-px bg-border',
  label: 'px-2 py-1.5 text-sm font-semibold text-foreground',
  alignment: {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  },
} as const

export const ContextMenuStyles = {
  positioner: 'fixed z-50',
  popup: [
    'min-w-[12rem] rounded-theme-md border border-border',
    'bg-background shadow-theme-lg glass p-1 origin-top-left',
  ].join(' '),
  item: MenuStyles.item,
  separator: MenuStyles.separator,
} as const

export const DropdownMenuStyles = {
  wrapper: 'relative inline-block',
  trigger: 'cursor-pointer',
  popup: [
    'absolute z-50 mt-1 min-w-[12rem] rounded-theme-md border border-border',
    'bg-background shadow-theme-lg glass p-1 origin-top',
  ].join(' '),
  item: MenuStyles.item,
  separator: MenuStyles.separator,
  label: MenuStyles.label,
  alignment: MenuStyles.alignment,
} as const
