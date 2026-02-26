import { Checkbox } from '@stackone-ui/core/checkbox'

export default function CheckboxPage() {
  return (
    <div className="space-y-2">
      <Checkbox label="Accept terms and conditions" />
      <Checkbox label="Subscribe to newsletter" defaultChecked />
      <Checkbox label="Disabled option" disabled />
    </div>
  )
}
