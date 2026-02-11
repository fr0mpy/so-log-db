export { Badge, type BadgeVariant } from './badge'
export { Alert, type AlertVariant } from './alert'

import { Badge } from './badge'
import { Alert } from './alert'

export const Feedback = {
  Badge,
  Alert,
} as const
