export { Badge, type BadgeVariant } from './badge'
export { Alert, type AlertVariant } from './alert'
export { Tag, TagSolid, type TagVariant, type TagSolidVariant } from './tag'

import { Badge } from './badge'
import { Alert } from './alert'
import { Tag, TagSolid } from './tag'

export const Feedback = {
  Badge,
  Alert,
  Tag,
  TagSolid,
} as const
