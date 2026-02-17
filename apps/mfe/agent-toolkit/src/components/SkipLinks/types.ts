export interface SkipLinkTarget {
  /** The ID of the target element (without #) */
  id: string
  /** The i18n key for the link label */
  labelKey: string
}

export interface SkipLinksProps {
  /** Optional additional class names */
  className?: string
}
