import { useState, useEffect, useCallback, Suspense, memo } from 'react'
import { ChevronLeft, ChevronRight, Mail, Search, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Link } from 'lucide-react'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { ComponentErrorBoundary } from './ComponentErrorBoundary'
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Alert, AlertTitle, AlertDescription,
  Avatar,
  Badge,
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Carousel,
  Checkbox,
  Collapsible, CollapsibleTrigger, CollapsibleContent,
  ContextMenu, ContextMenuItem, ContextMenuSeparator,
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
  Drawer,
  DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
  HoverCard,
  Input,
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink,
  NumberInput,
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis,
  Popover,
  Progress,
  Radio, RadioGroup, RadioGroupItem,
  Select,
  Separator,
  Skeleton,
  Slider,
  ScrollArea,
  Spinner,
  Switch,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Textarea,
  Toast,
  Toolbar, ToolbarButton, ToolbarSeparator, ToolbarGroup, ToolbarLink,
  Tooltip,
} from './components'

// Demo components with state (must be separate from render functions)
function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">Manage your account settings here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">Change your password here.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground">Configure your preferences here.</p>
      </TabsContent>
    </Tabs>
  )
}

function AccordionDemo() {
  return (
    <Accordion type="single" defaultValue="item-1" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger value="item-1">Is it accessible?</AccordionTrigger>
        <AccordionContent value="item-1">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger value="item-2">Is it styled?</AccordionTrigger>
        <AccordionContent value="item-2">
          Yes. It comes with default styles that match the neumorphic theme.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function PaginationDemo() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        {[1, 2, 3].map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function DialogDemo() {
  const [blockingOpen, setBlockingOpen] = useState(false)
  return (
    <div className="flex flex-wrap gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input label="Name" placeholder="John Doe" />
            <Input label="Email" type="email" placeholder="john@example.com" />
          </div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button variant="destructive" onClick={() => setBlockingOpen(true)}>
        Delete Item (Blocking)
      </Button>
      <Dialog blocking open={blockingOpen} onOpenChange={setBlockingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. You must confirm or cancel to close this dialog.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlockingOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setBlockingOpen(false)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function DrawerDemo() {
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

function ToastDemo() {
  return (
    <div className="space-y-2">
      <Toast variant="success" title="Success" description="Your changes have been saved." />
    </div>
  )
}

function CollapsibleDemo() {
  return (
    <Collapsible defaultOpen className="w-full space-y-2">
      <div className="flex items-center justify-between space-x-4">
        <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">Toggle</Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-theme-md border border-border px-4 py-3 text-sm">
          @radix-ui/primitives
        </div>
        <div className="rounded-theme-md border border-border px-4 py-3 text-sm">
          @radix-ui/colors
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function SelectDemo() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Select
        options={[
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
          { value: 'orange', label: 'Orange' },
        ]}
        placeholder="Select a fruit"
      />
      <Select
        searchable
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'solid', label: 'SolidJS' },
          { value: 'preact', label: 'Preact' },
        ]}
        placeholder="Search frameworks..."
      />
    </div>
  )
}

function SliderDemo() {
  return <Slider defaultValue={50} className="w-full" />
}

function CarouselDemo() {
  const items = [
    <div key="1" className="flex items-center justify-center h-64 bg-primary/10 rounded-theme-lg">
      <p className="text-lg font-semibold">Slide 1</p>
    </div>,
    <div key="2" className="flex items-center justify-center h-64 bg-secondary/10 rounded-theme-lg">
      <p className="text-lg font-semibold">Slide 2</p>
    </div>,
    <div key="3" className="flex items-center justify-center h-64 bg-accent/10 rounded-theme-lg">
      <p className="text-lg font-semibold">Slide 3</p>
    </div>,
  ]
  return <Carousel items={items} />
}

// Loading fallback for lazy components
const ComponentSkeleton = memo(() => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-muted rounded-theme-md w-1/3" />
    <div className="h-32 bg-muted rounded-theme-lg" />
  </div>
))
ComponentSkeleton.displayName = 'ComponentSkeleton'

// Component previews array
const componentPreviews = [
  {
    name: 'Button',
    render: () => (
      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button loading>Loading</Button>
      </div>
    ),
  },
  {
    name: 'Card',
    render: () => (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>This is a card description with neumorphism.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Card content goes here. The neumorphic theme creates soft, tactile surfaces.
          </p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>
    ),
  },
  {
    name: 'Input',
    render: () => (
      <div className="space-y-4 w-full max-w-md">
        <Input placeholder="Basic input" />
        <Input placeholder="With left icon" leftIcon={<Mail className="h-4 w-4" />} />
        <Input placeholder="With right icon" rightIcon={<Search className="h-4 w-4" />} />
        <Input placeholder="Error state" error helperText="This field is required" />
        <Input placeholder="Success state" success helperText="Looks good!" />
      </div>
    ),
  },
  {
    name: 'NumberInput',
    render: () => (
      <div className="space-y-4 w-full max-w-xs">
        <NumberInput label="Quantity" defaultValue={1} min={0} max={100} />
        <NumberInput label="Price" defaultValue={25} step={5} helperText="In increments of 5" />
        <NumberInput label="With bounds" defaultValue={50} min={0} max={100} helperText="Min: 0, Max: 100" />
        <NumberInput label="Disabled" defaultValue={10} disabled />
      </div>
    ),
  },
  {
    name: 'Textarea',
    render: () => (
      <div className="space-y-4 w-full max-w-md">
        <Textarea placeholder="Enter your message..." />
      </div>
    ),
  },
  {
    name: 'Checkbox',
    render: () => (
      <div className="space-y-2">
        <Checkbox label="Accept terms and conditions" />
        <Checkbox label="Subscribe to newsletter" defaultChecked />
        <Checkbox label="Disabled option" disabled />
      </div>
    ),
  },
  {
    name: 'Radio',
    render: () => (
      <div className="space-y-6">
        <div>
          <p className="text-xs text-muted-foreground mb-3">Vertical</p>
          <RadioGroup defaultValue="option1">
            <RadioGroupItem value="option1" label="Option 1" />
            <RadioGroupItem value="option2" label="Option 2" />
            <RadioGroupItem value="option3" label="Option 3" />
          </RadioGroup>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-3">Horizontal</p>
          <RadioGroup defaultValue="small" orientation="horizontal">
            <RadioGroupItem value="small" label="Small" />
            <RadioGroupItem value="medium" label="Medium" />
            <RadioGroupItem value="large" label="Large" />
          </RadioGroup>
        </div>
      </div>
    ),
  },
  {
    name: 'Switch',
    render: () => (
      <div className="space-y-2">
        <Switch label="Enable notifications" />
        <Switch label="Auto-save" defaultChecked />
      </div>
    ),
  },
  {
    name: 'Select',
    render: () => <SelectDemo />,
  },
  {
    name: 'Slider',
    render: () => <SliderDemo />,
  },
  {
    name: 'Badge',
    render: () => (
      <div className="flex flex-wrap gap-2">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    ),
  },
  {
    name: 'Alert',
    render: () => (
      <div className="space-y-4">
        <Alert variant="info">
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>This is an informational alert message.</AlertDescription>
        </Alert>
        <Alert variant="success">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your action was successful.</AlertDescription>
        </Alert>
        <Alert variant="warning">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Please review this warning.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>An error has occurred.</AlertDescription>
        </Alert>
      </div>
    ),
  },
  {
    name: 'Avatar',
    render: () => (
      <div className="flex gap-4 items-center">
        <Avatar size="sm" fallback="JD" />
        <Avatar size="md" fallback="AB" />
        <Avatar size="lg" fallback="XY" />
        <Avatar size="md" />
      </div>
    ),
  },
  {
    name: 'Spinner',
    render: () => (
      <div className="flex gap-4 items-center">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
    ),
  },
  {
    name: 'Skeleton',
    render: () => (
      <div className="space-y-6">
        {/* Text variant (default) */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground mb-2">Text</p>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        {/* Circle variant */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Circle</p>
          <div className="flex gap-3 items-center">
            <Skeleton variant="circle" className="h-8 w-8" />
            <Skeleton variant="circle" className="h-12 w-12" />
            <Skeleton variant="circle" className="h-16 w-16" />
          </div>
        </div>
        {/* Rectangular variant */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Rectangular</p>
          <div className="flex gap-3">
            <Skeleton variant="rectangular" className="h-24 w-24" />
            <Skeleton variant="rectangular" className="h-24 w-32" />
            <Skeleton variant="rectangular" className="h-24 w-40" />
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'Separator',
    render: () => (
      <div className="space-y-4">
        <div>
          <p className="text-sm">Content above</p>
          <Separator className="my-4" />
          <p className="text-sm">Content below</p>
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-sm">Left</p>
          <Separator orientation="vertical" className="h-12" />
          <p className="text-sm">Right</p>
        </div>
      </div>
    ),
  },
  {
    name: 'ScrollArea',
    render: () => (
      <div className="space-y-4">
        <p className="text-xs text-muted-foreground mb-2">Vertical scroll with smooth momentum</p>
        <ScrollArea className="h-48 w-full rounded-theme-lg border border-border p-4 overflow-auto">
          <div className="space-y-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="p-3 rounded-theme-md bg-muted/50">
                <p className="text-sm">Scrollable item {i + 1}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        <p className="text-xs text-muted-foreground mb-2">Horizontal scroll</p>
        <ScrollArea
          className="w-full rounded-theme-lg border border-border p-4 overflow-auto"
          options={{ orientation: 'horizontal' }}
        >
          <div className="flex gap-4 w-max">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-32 h-24 rounded-theme-md bg-muted/50 flex items-center justify-center">
                <p className="text-sm">Item {i + 1}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    ),
  },
  {
    name: 'Progress',
    render: () => (
      <div className="space-y-4 w-full max-w-md">
        <Progress value={25} />
        <Progress value={50} />
        <Progress value={75} />
      </div>
    ),
  },
  {
    name: 'Tabs',
    render: () => <TabsDemo />,
  },
  {
    name: 'Accordion',
    render: () => <AccordionDemo />,
  },
  {
    name: 'Dialog',
    render: () => <DialogDemo />,
  },
  {
    name: 'Drawer',
    render: () => <DrawerDemo />,
  },
  {
    name: 'Toast',
    render: () => <ToastDemo />,
  },
  {
    name: 'Collapsible',
    render: () => <CollapsibleDemo />,
  },
  {
    name: 'Carousel',
    render: () => <CarouselDemo />,
  },
  {
    name: 'Tooltip',
    render: () => (
      <Tooltip content="This is a helpful tooltip" side="top">
        <Button variant="outline">Hover me</Button>
      </Tooltip>
    ),
  },
  {
    name: 'Popover',
    render: () => (
      <Popover trigger={<Button variant="outline">Open Popover</Button>}>
        <div className="space-y-2">
          <h4 className="font-medium">Popover Title</h4>
          <p className="text-sm text-muted-foreground">This is popover content.</p>
        </div>
      </Popover>
    ),
  },
  {
    name: 'HoverCard',
    render: () => (
      <HoverCard
        trigger={<Button variant="outline">Hover me</Button>}
        side="bottom"
      >
        <div className="space-y-2">
          <h4 className="font-medium">User Profile</h4>
          <p className="text-sm text-muted-foreground">Additional information appears on hover.</p>
        </div>
      </HoverCard>
    ),
  },
  {
    name: 'DropdownMenu',
    render: () => (
      <DropdownMenu trigger={<Button variant="outline">Open Menu</Button>}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenu>
    ),
  },
  {
    name: 'ContextMenu',
    render: () => (
      <ContextMenu trigger={
        <div className="flex h-32 w-64 items-center justify-center rounded-theme-lg border-2 border-dashed border-border">
          <p className="text-sm text-muted-foreground">Right click here</p>
        </div>
      }>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenu>
    ),
  },
  {
    name: 'NavigationMenu',
    render: () => (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">About</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Contact</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),
  },
  {
    name: 'Breadcrumb',
    render: () => (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
  },
  {
    name: 'Pagination',
    render: () => <PaginationDemo />,
  },
  {
    name: 'Table',
    render: () => (
      <Table>
        <TableCaption>A list of recent transactions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>001</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>002</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>$150.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
  },
  {
    name: 'Toolbar',
    render: () => (
      <div className="space-y-4">
        <p className="text-xs text-muted-foreground mb-2">Horizontal toolbar</p>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarButton aria-label="Bold">
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton aria-label="Italic">
              <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton aria-label="Underline">
              <Underline className="h-4 w-4" />
            </ToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup>
            <ToolbarButton active aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarLink href="#">
            <Link className="h-4 w-4 mr-1" />
            Link
          </ToolbarLink>
        </Toolbar>
        <p className="text-xs text-muted-foreground mb-2">Vertical toolbar</p>
        <Toolbar orientation="vertical" className="w-fit">
          <ToolbarButton aria-label="Bold">
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton aria-label="Italic">
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton active aria-label="Align left">
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>
        </Toolbar>
      </div>
    ),
  },
].sort((a, b) => a.name.localeCompare(b.name))

// Memoized component preview wrapper
const MemoizedPreview = memo(({ render }: { render: () => React.ReactNode }) => (
  <Suspense fallback={<ComponentSkeleton />}>
    {render()}
  </Suspense>
))
MemoizedPreview.displayName = 'MemoizedPreview'

// Shadow class mapping (defined outside component to avoid recreation)
const SHADOW_CLASSES = {
  sm: 'shadow-neu-raised-sm',
  md: 'shadow-neu-raised',
  lg: 'shadow-neu-raised-lg',
} as const

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shadowLevel, setShadowLevel] = useState<keyof typeof SHADOW_CLASSES>('md')
  const [isDark, setIsDark] = useState(false)

  const currentComponent = componentPreviews[currentIndex]

  // Apply dark mode class to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  // Memoize navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % componentPreviews.length)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + componentPreviews.length) % componentPreviews.length)
  }, [])

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => !prev)
  }, [])

  const handleShadowChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setShadowLevel(e.target.value as keyof typeof SHADOW_CLASSES)
  }, [])

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Sidebar - neumorphic with smooth scroll */}
      <aside className="w-64 border-r border-border bg-neu-base flex-shrink-0 overflow-hidden">
        <ScrollArea className="h-full overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold text-foreground">Components</h2>
            {/* Dark mode toggle */}
            <ThemeSwitcher isDark={isDark} onToggle={toggleDarkMode} />
          </div>
          <nav className="space-y-1">
            {componentPreviews.map((component, index) => (
              <button
                key={component.name}
                onClick={() => setCurrentIndex(index)}
                className={`w-full text-left px-3 py-2 rounded-theme-lg text-sm transition-all duration-200 cursor-pointer ${
                  index === currentIndex
                    ? 'bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-2px_-2px_6px_rgba(255,255,255,0.3),2px_2px_6px_rgba(0,100,60,0.3)]'
                    : 'bg-neu-base shadow-neu-raised-sm hover:shadow-neu-raised text-foreground'
                }`}
              >
                {component.name}
              </button>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main content with smooth scroll */}
      <main className="flex-1 bg-background overflow-hidden">
        <ScrollArea className="h-full overflow-y-auto p-8">
          <header className="mb-8">
            <h1 className="font-heading text-4xl font-bold mb-2 text-foreground">Component Gallery</h1>
            <p className="text-muted-foreground">
              Neumorphic Theme - {componentPreviews.length} Components
            </p>
          </header>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-theme-lg bg-neu-base text-foreground shadow-neu-raised hover:shadow-neu-raised-lg active:shadow-neu-pressed-sm transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <span className="font-heading text-2xl font-semibold text-foreground">
                {currentComponent.name}
              </span>
              <button
                onClick={goToNext}
                disabled={currentIndex === componentPreviews.length - 1}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-theme-lg bg-neu-base text-foreground shadow-neu-raised hover:shadow-neu-raised-lg active:shadow-neu-pressed-sm transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Shadow:</span>
              <select
                id="shadow-select"
                value={shadowLevel}
                onChange={handleShadowChange}
                className="px-3 py-1.5 rounded-theme-lg bg-neu-base shadow-neu-pressed-sm text-sm cursor-pointer text-foreground focus-visible:outline-none focus-visible:shadow-[var(--shadow-pressed-sm),var(--shadow-focus)]"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
          </div>

          {/* Component preview - main neumorphic panel */}
          <div
            data-testid={`component-preview-${currentComponent.name.toLowerCase()}`}
            className={`rounded-theme-2xl bg-neu-base ${SHADOW_CLASSES[shadowLevel]} p-8 transition-shadow duration-200`}
          >
            <ComponentErrorBoundary name={currentComponent.name}>
              <MemoizedPreview render={currentComponent.render} />
            </ComponentErrorBoundary>
          </div>

          {/* Component info */}
          <div className="mt-6 p-4 rounded-theme-lg bg-neu-base shadow-neu-raised-sm">
            <p className="text-sm text-muted-foreground">
              Component {currentIndex + 1} of {componentPreviews.length}
            </p>
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
