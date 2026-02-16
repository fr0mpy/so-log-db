// Form patterns
export { Form, Label, Input, NumberInput, Textarea, Helper, Stepper, getInputStyles, getHelperStyles } from './form'

// Layout patterns
export { Layout, Flex, Spacing, Position, Size, Responsive } from './layout'

// Interactive patterns
export { Interactive, Transition, Focus, Disabled, Hover, Active, Cursor, Button, CloseButton } from './interactive'

// Overlay patterns
export { Overlay, Dialog, Drawer, Card, Paper } from './overlay'

// Control patterns
export { Control, Toggle, Slider } from './control'

// Feedback patterns
export { Feedback, Badge, Alert, Tag, type BadgeVariant, type AlertVariant, type TagVariant } from './feedback'

// Import all namespaces for combined export
import { Form } from './form'
import { Layout } from './layout'
import { Interactive } from './interactive'
import { Overlay } from './overlay'
import { Control } from './control'
import { Feedback } from './feedback'

export const Patterns = {
  Form,
  Layout,
  Interactive,
  Overlay,
  Control,
  Feedback,
} as const
