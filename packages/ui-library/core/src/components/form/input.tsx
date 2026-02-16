'use client'

import { cn } from '@/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'
import { Form, getHelperStyles } from '../../styles'
import { InputStyles as S } from './styles'

const inputVariants = cva(
  [Form.Input.base, Form.Input.height].join(' '),
  {
    variants: {
      state: {
        default: Form.Input.interactive,
        error: Form.Input.error,
        success: Form.Input.success,
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { state: 'error', disabled: true, class: S.disabledErrorBorder },
      { state: 'success', disabled: true, class: S.disabledSuccessBorder },
    ],
    defaultVariants: {
      state: 'default',
      disabled: false,
    },
  }
)

export type InputVariants = VariantProps<typeof inputVariants>

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'> {
  label?: string
  error?: boolean
  success?: boolean
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  disabled?: boolean
  ref?: React.Ref<HTMLInputElement>
}

function Input({ className, type = 'text', label, error, success, helperText, leftIcon, rightIcon, id, disabled, ref, ...props }: InputProps) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)
  const state = error ? 'error' : success ? 'success' : 'default'

  return (
    <div className={S.container}>
      {label && (
        <label htmlFor={inputId} className={Form.Label.tracking}>
          {label}
        </label>
      )}
      <div className={S.wrapper}>
        {leftIcon && <div className={Form.Input.iconLeft}>{leftIcon}</div>}
        <input
          id={inputId}
          type={type}
          disabled={disabled}
          className={cn(
            inputVariants({ state, disabled }),
            leftIcon && Form.Input.withIconLeft,
            rightIcon && Form.Input.withIconRight,
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && <div className={Form.Input.iconRight}>{rightIcon}</div>}
      </div>
      {helperText && (
        <p className={getHelperStyles({ hasError: error, hasSuccess: success })}>
          {helperText}
        </p>
      )}
    </div>
  )
}

export { Input, inputVariants }
