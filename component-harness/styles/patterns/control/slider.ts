export const Slider = {
  /** Track base */
  track: [
    'absolute left-0 right-0 top-1/2 -translate-y-1/2',
    'h-5 w-full cursor-pointer appearance-none bg-transparent',
  ].join(' '),

  /** Thumb styles for WebKit browsers */
  thumbWebkit: [
    '[&::-webkit-slider-thumb]:appearance-none',
    '[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5',
    '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neu-base',
    '[&::-webkit-slider-thumb]:shadow-neu-raised [&::-webkit-slider-thumb]:cursor-pointer',
    '[&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:duration-200',
    '[&::-webkit-slider-thumb]:hover:shadow-neu-raised-lg',
    '[&::-webkit-slider-thumb]:active:shadow-neu-pressed-sm',
  ].join(' '),

  /** Thumb styles for Mozilla browsers */
  thumbMoz: [
    '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5',
    '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-neu-base',
    '[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-neu-raised',
    '[&::-moz-range-thumb]:cursor-pointer',
  ].join(' '),

  /** Combined thumb (all browsers) */
  thumb: [
    '[&::-webkit-slider-thumb]:appearance-none',
    '[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5',
    '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neu-base',
    '[&::-webkit-slider-thumb]:shadow-neu-raised [&::-webkit-slider-thumb]:cursor-pointer',
    '[&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:duration-200',
    '[&::-webkit-slider-thumb]:hover:shadow-neu-raised-lg',
    '[&::-webkit-slider-thumb]:active:shadow-neu-pressed-sm',
    '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5',
    '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-neu-base',
    '[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-neu-raised',
    '[&::-moz-range-thumb]:cursor-pointer',
  ].join(' '),
} as const
