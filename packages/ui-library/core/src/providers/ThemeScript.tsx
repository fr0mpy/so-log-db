import { THEME_COOKIE_NAME } from './theme-cookie'

/**
 * Inline script that sets theme class BEFORE React hydrates.
 * Must be rendered in <head> of every layout.tsx.
 *
 * Reads from cookie (same source as getThemeFromCookies) and falls back
 * to system preference if no cookie is set.
 *
 * This prevents FOUC (Flash of Unstyled Content) by ensuring the correct
 * theme class is applied before any React code runs.
 */
export function ThemeScript() {
  // Minified script that:
  // 1. Reads theme from cookie
  // 2. Falls back to system preference if no cookie
  // 3. Adds 'dark' class if needed
  const script = `(function(){try{var c=document.cookie.match(/${THEME_COOKIE_NAME}=([^;]+)/);var t=c?c[1]:null;if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
