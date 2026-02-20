'use client'

import { useState, useEffect } from 'react'
import {
  ColorTokens,
  SpacingTokens,
  ShadowTokens,
  RadiusTokens,
  TypographyTokens,
  MotionTokens,
  ZIndexTokens,
} from '../../components/TokenSections'
import { TokenViewer } from '../../components/TokenViewer'
import { defaultBaseTheme } from '@stackone-ui/core/themes'

// Brand theme fetched at runtime from shell
type BrandTheme = {
  color: { light: Record<string, string>; dark: Record<string, string> }
  font: Record<string, string>
}

const TabStyles = {
  nav: 'flex flex-wrap gap-1 p-1 bg-muted rounded-theme-lg mb-6',
  tab: {
    base: 'px-4 py-2 rounded-theme-md text-sm font-medium transition-colors',
    active: 'bg-primary text-primary-foreground shadow-neu-raised-sm',
    inactive: 'text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10',
  },
  content: 'space-y-8',
  modeSwitch: {
    wrapper: 'flex items-center gap-3 mb-6',
    label: 'text-sm text-muted-foreground',
    buttons: 'flex items-center gap-1 p-1 bg-muted rounded-theme-md',
    button: {
      base: 'px-3 py-1.5 text-sm rounded-theme-sm transition-colors',
      active: 'bg-primary text-primary-foreground shadow-neu-raised-sm',
      inactive: 'text-muted-foreground hover:text-foreground',
    },
  },
} as const

type TabId = 'colors' | 'spacing' | 'shadows' | 'radius' | 'typography' | 'motion' | 'zindex' | 'all'

interface Tab {
  id: TabId
  label: string
}

const tabs: Tab[] = [
  { id: 'all', label: 'All Tokens' },
  { id: 'colors', label: 'Colors' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'shadows', label: 'Shadows' },
  { id: 'radius', label: 'Radius' },
  { id: 'typography', label: 'Typography' },
  { id: 'motion', label: 'Motion' },
  { id: 'zindex', label: 'Z-Index' },
]

function TabNav({
  activeTab,
  onTabChange,
}: {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}) {
  return (
    <nav className={TabStyles.nav} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`${TabStyles.tab.base} ${
            activeTab === tab.id ? TabStyles.tab.active : TabStyles.tab.inactive
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}

const SHELL_URL = process.env.NEXT_PUBLIC_SHELL_URL || 'http://localhost:3000'

export default function DesignTokensPage() {
  const [activeTab, setActiveTab] = useState<TabId>('all')
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light')
  const [brandTheme, setBrandTheme] = useState<BrandTheme | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try local theme first (for standalone MFE), fall back to shell
    const fetchTheme = async () => {
      try {
        // Try local path first
        const localRes = await fetch('/themes/stackone-green.json')
        if (localRes.ok) {
          const data = await localRes.json()
          setBrandTheme(data)
          setLoading(false)
          return
        }
      } catch {
        // Local fetch failed, try shell
      }

      try {
        const shellRes = await fetch(`${SHELL_URL}/themes/stackone-green.json`)
        if (shellRes.ok) {
          const data = await shellRes.json()
          setBrandTheme(data)
        }
      } catch (err) {
        console.error('Failed to fetch brand theme:', err)
      }
      setLoading(false)
    }

    fetchTheme()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading theme data...</div>
      </div>
    )
  }

  if (!brandTheme) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-destructive">Failed to load brand theme</div>
      </div>
    )
  }

  const colors = colorMode === 'light' ? brandTheme.color.light : brandTheme.color.dark

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Design Tokens
        </h1>
        <p className="text-muted-foreground">
          Visual documentation of the StackOne design system tokens.
          Toggle between visual representation and JSON view for each category.
        </p>
      </header>

      {/* Color Mode Switch */}
      <div className={TabStyles.modeSwitch.wrapper}>
        <span className={TabStyles.modeSwitch.label}>Color Mode:</span>
        <div className={TabStyles.modeSwitch.buttons}>
          <button
            onClick={() => setColorMode('light')}
            className={`${TabStyles.modeSwitch.button.base} ${
              colorMode === 'light'
                ? TabStyles.modeSwitch.button.active
                : TabStyles.modeSwitch.button.inactive
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setColorMode('dark')}
            className={`${TabStyles.modeSwitch.button.base} ${
              colorMode === 'dark'
                ? TabStyles.modeSwitch.button.active
                : TabStyles.modeSwitch.button.inactive
            }`}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className={TabStyles.content} role="tabpanel">
        {/* All Tokens - Combined JSON View */}
        {activeTab === 'all' && (
          <div className="space-y-8">
            <TokenViewer
              data={{ base: defaultBaseTheme, brand: brandTheme }}
              title="Complete Theme Configuration"
            />
          </div>
        )}

        {/* Colors */}
        {(activeTab === 'all' || activeTab === 'colors') && (
          <ColorTokens
            colors={colors}
            title={`Colors (${colorMode} mode)`}
            mode={colorMode}
          />
        )}

        {/* Spacing */}
        {(activeTab === 'all' || activeTab === 'spacing') && (
          <SpacingTokens spacing={defaultBaseTheme.spacing} />
        )}

        {/* Shadows */}
        {(activeTab === 'all' || activeTab === 'shadows') && (
          <ShadowTokens shadows={defaultBaseTheme.shadow} />
        )}

        {/* Radius */}
        {(activeTab === 'all' || activeTab === 'radius') && (
          <RadiusTokens radius={defaultBaseTheme.radius} />
        )}

        {/* Typography */}
        {(activeTab === 'all' || activeTab === 'typography') && (
          <TypographyTokens fonts={brandTheme.font} />
        )}

        {/* Motion */}
        {(activeTab === 'all' || activeTab === 'motion') && (
          <MotionTokens motion={defaultBaseTheme.motion} />
        )}

        {/* Z-Index */}
        {(activeTab === 'all' || activeTab === 'zindex') && (
          <ZIndexTokens zIndex={defaultBaseTheme.zIndex} />
        )}
      </div>
    </div>
  )
}
