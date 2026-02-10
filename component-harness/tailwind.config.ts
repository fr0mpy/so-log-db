import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        secondary: 'var(--color-secondary)',
        'secondary-foreground': 'var(--color-secondary-foreground)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        surface: 'var(--color-surface)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        border: 'var(--color-border)',
        destructive: 'var(--color-destructive)',
        'destructive-foreground': 'var(--color-destructive-foreground)',
        accent: 'var(--color-accent)',
        'accent-foreground': 'var(--color-accent-foreground)',
        success: 'var(--color-success)',
        'success-foreground': 'var(--color-success-foreground)',
        warning: 'var(--color-warning)',
        'warning-foreground': 'var(--color-warning-foreground)',
        info: 'var(--color-info)',
        'info-foreground': 'var(--color-info-foreground)',
        neu: {
          base: 'var(--neu-base)',
          light: 'var(--neu-light)',
          dark: 'var(--neu-dark)',
        },
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
        mono: 'var(--font-code)',
      },
      borderRadius: {
        'theme-sm': 'var(--radius-sm)',
        'theme-md': 'var(--radius-md)',
        'theme-lg': 'var(--radius-lg)',
        'theme-xl': 'var(--radius-xl)',
        'theme-2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        'neu-raised': 'var(--shadow-raised)',
        'neu-raised-sm': 'var(--shadow-raised-sm)',
        'neu-raised-lg': 'var(--shadow-raised-lg)',
        'neu-pressed': 'var(--shadow-pressed)',
        'neu-pressed-sm': 'var(--shadow-pressed-sm)',
        'neu-flat': 'var(--shadow-flat)',
        'neu-focus': 'var(--shadow-focus)',
        'neu-groove-h': 'inset 0 1px 1px rgba(163, 177, 198, 0.5), inset 0 -1px 1px rgba(255, 255, 255, 0.7)',
        'neu-groove-v': 'inset 1px 0 1px rgba(163, 177, 198, 0.5), inset -1px 0 1px rgba(255, 255, 255, 0.7)',
      },
      transitionTimingFunction: {
        'neu': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'neu-fast': '150ms',
        'neu': '200ms',
        'neu-slow': '300ms',
      },
      zIndex: {
        dropdown: '100',
        sticky: '200',
        modal: '300',
        popover: '400',
        tooltip: '600',
        toast: '9900',
      },
      keyframes: {
        'accordion-expand': {
          from: { gridTemplateRows: '0fr' },
          to: { gridTemplateRows: '1fr' },
        },
        'accordion-collapse': {
          from: { gridTemplateRows: '1fr' },
          to: { gridTemplateRows: '0fr' },
        },
        'content-fade-in': {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'content-fade-out': {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(-4px)' },
        },
        'backdrop-fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'backdrop-fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-out-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'slide-in-top': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-out-top': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-100%)' },
        },
        'slide-in-bottom': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-out-bottom': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'accordion-expand': 'accordion-expand 300ms ease-neu forwards',
        'accordion-collapse': 'accordion-collapse 300ms ease-neu forwards',
        'content-fade-in': 'content-fade-in 200ms ease-neu 100ms forwards',
        'content-fade-out': 'content-fade-out 150ms ease-neu forwards',
        'backdrop-in': 'backdrop-fade-in 300ms ease-neu forwards',
        'backdrop-out': 'backdrop-fade-out 200ms ease-neu forwards',
        'drawer-in-right': 'slide-in-right 300ms ease-neu forwards',
        'drawer-out-right': 'slide-out-right 200ms ease-neu forwards',
        'drawer-in-left': 'slide-in-left 300ms ease-neu forwards',
        'drawer-out-left': 'slide-out-left 200ms ease-neu forwards',
        'drawer-in-top': 'slide-in-top 300ms ease-neu forwards',
        'drawer-out-top': 'slide-out-top 200ms ease-neu forwards',
        'drawer-in-bottom': 'slide-in-bottom 300ms ease-neu forwards',
        'drawer-out-bottom': 'slide-out-bottom 200ms ease-neu forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
