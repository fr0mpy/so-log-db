'use client'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import {
  useTranslations,
  aria,
  settings as settingsKeys,
  locales,
  localeNames,
  LOCALE_COOKIE,
  type Locale,
} from '@stackone/i18n'
import { Dialog } from '@stackone-ui/core/dialog'
import { SelectCompound as Select } from '@stackone-ui/core/select'
import { Layout } from '@stackone-ui/core/styles'

const S = {
  body: 'flex flex-col gap-4 py-4',
  field: 'flex flex-col gap-2',
  label: 'text-sm font-medium text-foreground',
  flag: 'w-5 h-4 rounded-sm overflow-hidden shrink-0',
  flagOption: [Layout.Flex.center, 'gap-2'].join(' '),
} as const

// Flag SVG components for supported locales
function FlagGB() {
  return (
    <svg viewBox="0 0 60 30" className={S.flag}>
      <clipPath id="settings-gb-clip">
        <rect width="60" height="30" />
      </clipPath>
      <g clipPath="url(#settings-gb-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          stroke="#C8102E"
          strokeWidth="4"
          clipPath="url(#settings-gb-diag)"
        />
        <clipPath id="settings-gb-diag">
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
    <svg viewBox="0 0 3 2" className={S.flag}>
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

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Settings dialog with language switcher
 */
export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const router = useRouter()
  const CurrentFlag = FLAGS[locale]

  const handleLocaleChange = (newLocale: string) => {
    document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=31536000`
    router.refresh()
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{t(settingsKeys.title)}</Dialog.Title>
        </Dialog.Header>

        <div className={S.body}>
          <div className={S.field}>
            <label className={S.label}>{t(settingsKeys.language)}</label>
            <Select.Root
              value={locale}
              onValueChange={handleLocaleChange}
              width="full"
            >
              <Select.Trigger aria-label={t(aria.selectLanguage)}>
                <span className={S.flagOption}>
                  <CurrentFlag />
                  {localeNames[locale]}
                </span>
                <Select.Icon />
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner>
                  <Select.Popup>
                    <div className="p-1">
                      {locales.map((code) => {
                        const Flag = FLAGS[code]
                        return (
                          <Select.Option key={code} value={code}>
                            <span className={S.flagOption}>
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
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
