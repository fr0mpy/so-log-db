'use client'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ThemeSwitcher, SelectCompound as Select } from '@stackone-ui/core'
import { useTheme } from '@stackone-ui/core/providers'
import { Layout } from '@stackone-ui/core/styles'
import { locales, localeNames, LOCALE_COOKIE, type Locale } from '@stackone/i18n'

const styles = {
  header: [
    Layout.Flex.between,
    'fixed top-0 left-0 right-0 z-50',
    'px-4 py-3',
  ].join(' '),
  controls: [Layout.Flex.center, 'gap-3'].join(' '),
  flag: 'w-5 h-4 rounded-sm overflow-hidden shrink-0',
  flagOption: [Layout.Flex.center, 'gap-2'].join(' '),
} as const

// Flag SVG components for supported locales
function FlagGB() {
  return (
    <svg viewBox="0 0 60 30" className={styles.flag}>
      <clipPath id="gb-clip"><rect width="60" height="30" /></clipPath>
      <g clipPath="url(#gb-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#gb-diag)" />
        <clipPath id="gb-diag">
          <path d="M30,15 L60,30 L60,15 L30,15 L60,0 L30,0 L30,15 L0,0 L0,15 L30,15 L0,30 L30,30 z" />
        </clipPath>
        <path d="M30,0 L30,30 M0,15 L60,15" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 L30,30 M0,15 L60,15" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

function FlagFR() {
  return (
    <svg viewBox="0 0 3 2" className={styles.flag}>
      <rect width="1" height="2" fill="#002654" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#CE1126" />
    </svg>
  )
}

const FLAGS: Record<Locale, React.FC> = {
  en: FlagGB,
  fr: FlagFR,
}

function LocaleSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const CurrentFlag = FLAGS[locale]

  const handleChange = (newLocale: string) => {
    // Set cookie for cross-zone locale sync
    document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=31536000`
    router.refresh()
  }

  return (
    <Select.Root value={locale} onValueChange={handleChange} triggerMode="hover" width="auto">
      <Select.Trigger>
        <span className={styles.flagOption}>
          <CurrentFlag />
          <Select.Icon />
        </span>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <div className="p-1">
              {locales.map((code) => {
                const Flag = FLAGS[code]
                return (
                  <Select.Option key={code} value={code}>
                    <span className={styles.flagOption}>
                      <Flag />
                      {localeNames[code]}
                    </span>
                  </Select.Option>
                )
              })}
            </div>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}

export function Header() {
  const { theme, toggle } = useTheme()

  return (
    <header className={styles.header}>
      <div />
      <div className={styles.controls}>
        <ThemeSwitcher isDark={theme === 'dark'} onToggle={toggle} />
        <LocaleSwitcher />
      </div>
    </header>
  )
}
