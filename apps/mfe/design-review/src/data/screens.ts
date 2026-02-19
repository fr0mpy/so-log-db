import type { Screen } from '../components/design-viewer'

/**
 * Screen A - Logs List View
 *
 * Hotspot positions are percentage-based (0-100) from top-left.
 * These values correspond to the orange annotation boxes in the design.
 */
export const screenA: Screen = {
  id: 'screen-a',
  name: 'Logs List View',
  imageSrc: '/design-review/screens/Screenshot 2026-02-18 at 12.01.03.png',
  hotspots: [
    {
      label: 'A',
      title: 'Header',
      description: 'Dead space.',
      x: 10,
      y: 2,
    },
    {
      label: 'B',
      title: 'Docs Link',
      description:
        'Docs link repeated. Doc icon intent is clear. Does not need text label.',
      x: 96,
      y: 2,
    },
    {
      label: 'C',
      title: 'Refresh',
      description: 'Refresh icon intent is clear, does not need text label.',
      x: 90,
      y: 5,
    },
    {
      label: 'D',
      title: 'Stats',
      description: 'Important metrics, to digest amongst everything.',
      x: 55,
      y: 10,
    },
    {
      label: 'E',
      title: 'Chart',
      description: 'Graph intent is clear. No need for text label.',
      x: 50,
      y: 17,
    },
    {
      label: 'F',
      title: 'Date/Time',
      description:
        'Dates and time are important, easier digested stacked. Could be formatted better for current dates "Today", "Yesterday".',
      x: 10,
      y: 24,
    },
    {
      label: 'G',
      title: 'Request Type',
      description:
        'Request type colours could be more familiar - i.e, how Swagger documents them. Tag component should be different to "Status component" i.e Delete request is red tag, status 200 which is green. Confusing at a glance.',
      x: 55,
      y: 24,
    },
    {
      label: 'H',
      title: 'Duration',
      description:
        'Duration times mean nothing - just tech to non-technicals. Is the duration good for this particular action? Or bad?',
      x: 78,
      y: 24,
    },
    {
      label: 'I',
      title: 'Status',
      description: 'See G.',
      x: 93,
      y: 24,
    },
    {
      label: 'J',
      title: 'Row Actions',
      description:
        'What do the numbers mean? Do we need to always see the options/chevron buttons for all table items? Sidewards chevron to toggle drawer left to right, even though user is scrolling up and down.',
      x: 97,
      y: 30,
    },
    {
      label: 'K',
      title: 'Menu',
      description:
        'Menu always open or always closed. We can remove this extra click for smoothness.',
      x: 5,
      y: 15,
    },
  ],
}

/**
 * Screen B - Log Detail View
 *
 * The detail panel that appears when viewing a specific log entry.
 */
export const screenB: Screen = {
  id: 'screen-b',
  name: 'Log Detail View',
  imageSrc: '/design-review/screens/Screenshot 2026-02-18 at 12.18.23.png',
  hotspots: [
    {
      label: 'A',
      title: 'Drawer',
      description:
        'Left/right slide out drawer for this seems counterintuitive compared to how the user has been navigating the logs up/down.',
      x: 50,
      y: 3,
    },
    {
      label: 'B',
      title: 'Sidebar',
      description: "Distracting from what we're trying to see in the drawer.",
      x: 8,
      y: 3,
    },
    {
      label: 'C',
      title: 'Metadata',
      description:
        'Too much linear text. No hierarchy. Stacked key & value easier to digest.',
      x: 35,
      y: 8,
    },
    {
      label: 'D',
      title: 'Copy Icon',
      description:
        "Copy icon always visible. Doesn't need to be. Only on hover.",
      x: 96,
      y: 12,
    },
    {
      label: 'E',
      title: 'Close Buttons',
      description: '2 close buttons. Already have one top right.',
      x: 95,
      y: 94,
    },
    {
      label: 'F',
      title: 'Navigation Text',
      description: '"Navigate" & "esc" text unnecessary. Icons show intent.',
      x: 35,
      y: 94,
    },
    {
      label: 'G',
      title: 'Request Info',
      description: 'Similar issues to Screen A - F, I & H.',
      x: 80,
      y: 3,
    },
  ],
}
