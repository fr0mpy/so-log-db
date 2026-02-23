'use client'

import { useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { SPRING } from '@stackone-ui/core/config'
import { Text } from '@stackone-ui/core/text'
import { SpringDemoStyles as S } from '../TokenViewer/styles'

type SpringPresetKey = keyof typeof SPRING

interface SpringPreset {
  name: SpringPresetKey
  description: string
}

const SPRING_PRESETS: SpringPreset[] = [
  { name: 'default', description: 'Balanced feel' },
  { name: 'bouncy', description: 'More energetic' },
  { name: 'gentle', description: 'Slower, softer' },
  { name: 'snappy', description: 'Quick response' },
  { name: 'smooth', description: 'Reduced bounce for layout animations' },
  { name: 'tooltip', description: 'Lighter feel' },
]

export function SpringDemo() {
  const [activePreset, setActivePreset] = useState<SpringPresetKey>('default')
  const [animationKey, setAnimationKey] = useState(0)

  const triggerAnimation = useCallback(() => {
    setAnimationKey((k) => k + 1)
  }, [])

  const handlePresetClick = useCallback((presetName: SpringPresetKey) => {
    setActivePreset(presetName)
    triggerAnimation()
  }, [triggerAnimation])

  const config = SPRING[activePreset]
  const activePresetData = SPRING_PRESETS.find((p) => p.name === activePreset)

  return (
    <div className={S.container}>
      <div className={S.header}>
        <div className={S.presetButtons}>
          {SPRING_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePresetClick(preset.name)}
              className={`${S.presetButton.base} ${
                activePreset === preset.name
                  ? S.presetButton.active
                  : S.presetButton.inactive
              }`}
              aria-pressed={activePreset === preset.name}
            >
              {preset.name}
            </button>
          ))}
        </div>
        <button
          onClick={triggerAnimation}
          className={S.replayButton}
          aria-label="Replay animation"
        >
          Replay
        </button>
      </div>

      <div className={S.demoArea}>
        <motion.div
          key={animationKey}
          initial={{ x: 0, scale: 0.8, opacity: 0.5 }}
          animate={{ x: 200, scale: 1, opacity: 1 }}
          transition={config}
          className={S.animatedBox}
        />
      </div>

      <div className={S.configDisplay}>
        <Text as="span" variant="code" className={S.configItem}>
          stiffness: {config.stiffness}
        </Text>
        <Text as="span" variant="code" className={S.configItem}>
          damping: {config.damping}
        </Text>
        {'mass' in config && (
          <Text as="span" variant="code" className={S.configItem}>
            mass: {config.mass}
          </Text>
        )}
      </div>

      {activePresetData && (
        <Text variant="body2" color="muted" className={S.description}>
          <Text as="span" weight="semibold">SPRING.{activePreset}</Text> - {activePresetData.description}
        </Text>
      )}
    </div>
  )
}
