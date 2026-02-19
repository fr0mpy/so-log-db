/**
 * Logo styles - matches agent-toolkit SidebarLogo styling
 * Green gradient glass container effect
 */
export const LogoStyles = {
  container: [
    'flex items-center justify-center flex-shrink-0',
    'size-10 rounded-theme-md',
    'bg-gradient-to-br from-[#10B981]/25 to-[#10B981]/15',
    'backdrop-blur-md cursor-pointer',
    'transition-all hover:from-[#10B981]/35 hover:to-[#10B981]/15',
  ].join(' '),
  image: 'size-6 object-contain',
} as const
