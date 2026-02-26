import { Button } from '@stackone-ui/core/button'
import { Popover } from '@stackone-ui/core/popover'

export default function PopoverPage() {
  return (
    <Popover trigger={<Button variant="text">Open Popover</Button>}>
      <div className="space-y-2">
        <h4 className="font-medium">Popover Title</h4>
        <p className="text-sm text-muted-foreground">This is popover content.</p>
      </div>
    </Popover>
  )
}
