'use client'

export { Select as SelectCompound, useSelectContext } from './select'
export type {
  SelectOption,
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIconProps,
  SelectPortalProps,
  SelectPositionerProps,
  SelectPopupProps,
  SelectOptionProps,
  SelectSearchProps,
  SelectContextValue,
  SelectTriggerMode,
  SelectWidth,
  SelectPlacement,
} from './types'

// =============================================================================
// Convenience wrapper for simple Select usage
// =============================================================================
import { useMemo } from 'react'
import { Select as SelectNamespace } from './select'
import { SelectStyles as S } from './styles'
import type { SelectOption, SelectTriggerMode, SelectWidth } from './types'

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  searchable?: boolean
  className?: string
  triggerMode?: SelectTriggerMode
  width?: SelectWidth
}

/**
 * Convenience Select component that accepts options array.
 * For advanced usage, use SelectCompound (namespace pattern).
 */
export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  searchable,
  className,
  triggerMode,
  width,
}: SelectProps) {
  // Filter options based on search query (handled internally by context)
  const filteredOptions = useMemo(() => options, [options])

  // Find the label for the current value
  const currentValue = value ?? defaultValue
  const selectedLabel = useMemo(() => {
    const option = options.find((opt) => opt.value === currentValue)
    return option?.label
  }, [options, currentValue])

  return (
    <SelectNamespace.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      searchable={searchable}
      triggerMode={triggerMode}
      width={width}
    >
      <SelectNamespace.Trigger className={className}>
        <span className={!selectedLabel ? S.value.placeholder : undefined}>
          {selectedLabel || placeholder}
        </span>
        <SelectNamespace.Icon />
      </SelectNamespace.Trigger>
      <SelectNamespace.Portal>
        <SelectNamespace.Positioner>
          <SelectNamespace.Popup>
            <SelectNamespace.Search />
            <div className={S.optionsWrapper}>
              {filteredOptions.map((option) => (
                <SelectNamespace.Option key={option.value} value={option.value}>
                  {option.label}
                </SelectNamespace.Option>
              ))}
            </div>
          </SelectNamespace.Popup>
        </SelectNamespace.Positioner>
      </SelectNamespace.Portal>
    </SelectNamespace.Root>
  )
}
