import { readFileSync } from 'fs'
import { join } from 'path'
import { validateBrandTheme, generateBrandCss } from '../themes'
import { THEME_COOKIE_NAME } from './theme-cookie'

interface ThemeScriptProps {
  /**
   * Path to brand theme JSON file relative to app's public folder.
   * e.g., 'themes/stackone-green.json'
   */
  brandThemePath?: string
}

/**
 * Server component that outputs theme setup in <head>.
 *
 * Handles two concerns:
 * 1. Theme mode (light/dark) - inline script sets .dark class from cookie
 * 2. Brand colors - reads JSON from filesystem and injects CSS variables server-side
 *
 * Must be rendered in <head> of every layout.tsx.
 */
export function ThemeScript({ brandThemePath }: ThemeScriptProps) {
  // Inline script for theme mode (runs before React hydrates)
  const modeScript = `(function(){try{var c=document.cookie.match(/${THEME_COOKIE_NAME}=([^;]+)/);var t=c?c[1]:null;if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`

  // Brand theme CSS (read from filesystem during SSR)
  let brandCss = ''
  if (brandThemePath) {
    try {
      const fullPath = join(process.cwd(), 'public', brandThemePath)
      const content = readFileSync(fullPath, 'utf-8')
      const json = JSON.parse(content)
      const { theme } = validateBrandTheme(json)
      brandCss = generateBrandCss(theme)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[ThemeScript] Failed to read brand theme:', error)
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
