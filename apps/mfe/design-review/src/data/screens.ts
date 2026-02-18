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
      title: 'Environment Selector',
      description: 'Production [EU1] environment with theme toggle.',
      x: 5,
      y: 2,
    },
    {
      label: 'B',
      title: 'Page Title',
      description: 'The main "Request Logs" header identifying the current page.',
      x: 17,
      y: 2,
    },
    {
      label: 'C',
      title: 'Documentation',
      description: 'Quick access link to API documentation.',
      x: 96,
      y: 2,
    },
    {
      label: 'D',
      title: 'Filter Controls',
      description: 'Date range picker, toggle switches for Background Logs and Full Width, plus manual Refresh button.',
      x: 65,
      y: 5,
    },
    {
      label: 'E',
      title: 'View Tabs',
      description: 'Tab navigation for different log views (API Requests is currently selected).',
      x: 10,
      y: 10,
    },
    {
      label: 'F',
      title: 'Stats Summary',
      description: 'Real-time metrics showing Total requests, Success rate with trend, and Error rate with trend.',
      x: 55,
      y: 10,
    },
    {
      label: 'G',
      title: 'Chart Area',
      description: 'Timeline visualization with request volume bars showing activity over time.',
      x: 50,
      y: 17,
    },
    {
      label: 'H',
      title: 'Requested Column',
      description: 'Shows the request timestamp with date and time.',
      x: 10,
      y: 24,
    },
    {
      label: 'I',
      title: 'Account Column',
      description: 'Displays the account or organization associated with the request.',
      x: 22,
      y: 24,
    },
    {
      label: 'J',
      title: 'Source Column',
      description: 'Displays the connection source with an icon indicator.',
      x: 35,
      y: 24,
    },
    {
      label: 'K',
      title: 'Request Column',
      description: 'HTTP method badge (GET/POST) with the resource name and endpoint path.',
      x: 55,
      y: 24,
    },
    {
      label: 'L',
      title: 'Duration Column',
      description: 'Response time in milliseconds for the request.',
      x: 78,
      y: 24,
    },
    {
      label: 'M',
      title: 'Status Column',
      description: 'HTTP status code badge showing the response status.',
      x: 93,
      y: 24,
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
      title: 'Request Title',
      description: 'Method badge, category, and operation name (e.g., "GET | CRM | List Employees").',
      x: 35,
      y: 3,
    },
    {
      label: 'B',
      title: 'Sidebar',
      description: 'Production [EU1] with navigation showing other log entries for quick switching.',
      x: 8,
      y: 3,
    },
    {
      label: 'C',
      title: 'Metadata Bar',
      description: 'Key context info: Provider, Organization, Source, and Expiry countdown.',
      x: 35,
      y: 8,
    },
    {
      label: 'D',
      title: 'Copy URL',
      description: 'Button to copy the full request URL to clipboard.',
      x: 96,
      y: 12,
    },
    {
      label: 'E',
      title: 'Close Button',
      description: 'Dismisses the detail panel and returns to the list view.',
      x: 95,
      y: 94,
    },
    {
      label: 'F',
      title: 'Navigation Controls',
      description: 'Arrow buttons to navigate between log entries, plus a Close button.',
      x: 35,
      y: 94,
    },
    {
      label: 'G',
      title: 'Request Status',
      description: 'Timestamp, duration, and HTTP status code badge for the request.',
      x: 80,
      y: 3,
    },
  ],
}
