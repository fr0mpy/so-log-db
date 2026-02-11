export { Label } from './label'
export { Input } from './input'
export { NumberInput } from './number-input'
export { Textarea } from './textarea'
export { Helper } from './helper'
export { Stepper } from './stepper'

import { Label } from './label'
import { Input } from './input'
import { NumberInput } from './number-input'
import { Textarea } from './textarea'
import { Helper } from './helper'
import { Stepper } from './stepper'

export const Form = {
  Label,
  Input,
  NumberInput,
  Textarea,
  Helper,
  Stepper,
} as const

/** Get input classes based on error/success state */
export function getInputStyles(options: {
  hasError?: boolean
  hasSuccess?: boolean
}): string {
  const { hasError, hasSuccess } = options
  return [
    Input.base,
    Input.height,
    hasError ? Input.error : hasSuccess ? Input.success : Input.interactive,
  ].join(' ')
}

/** Get helper text classes based on error/success state */
export function getHelperStyles(options: {
  hasError?: boolean
  hasSuccess?: boolean
}): string {
  const { hasError, hasSuccess } = options
  return `${Helper.base} ${hasError ? Helper.error : hasSuccess ? Helper.success : Helper.default}`
}
