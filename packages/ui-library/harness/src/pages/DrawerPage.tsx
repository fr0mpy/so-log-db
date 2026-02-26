import { useState } from 'react'
import { Button } from '@stackone-ui/core/button'
import { Drawer } from '@stackone-ui/core/drawer'

export default function DrawerPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} title="Drawer Title">
        <p className="text-sm text-muted-foreground">This is the drawer content.</p>
      </Drawer>
    </>
  )
}
