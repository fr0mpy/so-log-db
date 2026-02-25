import { validateBrandTheme, generateBrandCss } from '../themes'
import { THEME_COOKIE_NAME } from './theme-cookie'

interface ThemeScriptProps {
  /**
   * Brand theme JSON object (imported directly from public/themes/*.json).
   * Eliminates network fetch during SSR for reliable theme loading.
   */
  brandTheme?: Record<string, unknown>
}

/**
 * Server component that outputs theme setup in <head>.
 *
 * Handles two concerns:
 * 1. Theme mode (light/dark) - inline script sets .dark class from cookie
 * 2. Brand colors - validates JSON and injects CSS variables server-side
 *
 * Must be rendered in <head> of every layout.tsx.
 *
 * @example
 * import brandTheme from '../../public/themes/stackone-green.json'
 * <ThemeScript brandTheme={brandTheme} />
 */
export function ThemeScript({ brandTheme }: ThemeScriptProps) {
  // Inline script for theme mode (runs before React hydrates)
  const modeScript = `(function(){try{var c=document.cookie.match(/${THEME_COOKIE_NAME}=([^;]+)/);var t=c?c[1]:null;if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`

  // Brand theme CSS (no fetch - theme is passed directly)
  let brandCss = ''
  if (brandTheme) {
    try {
      const { theme } = validateBrandTheme(brandTheme)
      brandCss = generateBrandCss(theme)
    } catch (error) {
      console.error('[ThemeScript] Failed to generate brand CSS:', error)
    }
  }

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: modeScript }} />
      {brandCss && <style id="brand-theme" dangerouslySetInnerHTML={{ __html: brandCss }} />}
    </>
  )
}
