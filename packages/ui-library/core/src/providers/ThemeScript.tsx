import { validateBrandTheme, generateBrandCss } from '../themes'
import { THEME_COOKIE_NAME } from './theme-cookie'

interface ThemeScriptProps {
  /**
   * Full URL to brand theme JSON file.
   * e.g., 'http://localhost:3001/agent-toolkit/themes/stackone-green.json'
   */
  brandThemeUrl?: string
}

/**
 * Async server component that outputs theme setup in <head>.
 *
 * Handles two concerns:
 * 1. Theme mode (light/dark) - inline script sets .dark class from cookie
 * 2. Brand colors - fetches JSON and injects CSS variables server-side
 *
 * Must be rendered in <head> of every layout.tsx.
 */
export async function ThemeScript({ brandThemeUrl }: ThemeScriptProps) {
  // Inline script for theme mode (runs before React hydrates)
  const modeScript = `(function(){try{var c=document.cookie.match(/${THEME_COOKIE_NAME}=([^;]+)/);var t=c?c[1]:null;if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`

  // Brand theme CSS (server-side fetch)
  let brandCss = ''
  if (brandThemeUrl) {
    try {
      const res = await fetch(brandThemeUrl, { cache: 'force-cache' })
      if (res.ok) {
        const json = await res.json()
        const { theme } = validateBrandTheme(json)
        brandCss = generateBrandCss(theme)
      } else if (process.env.NODE_ENV === 'development') {
        console.warn(`[ThemeScript] Failed to fetch brand theme: ${res.status}`)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[ThemeScript] Failed to fetch brand theme:', error)
      }
    }
  }

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: modeScript }} />
      {brandCss && <style id="brand-theme" dangerouslySetInnerHTML={{ __html: brandCss }} />}
    </>
  )
}
