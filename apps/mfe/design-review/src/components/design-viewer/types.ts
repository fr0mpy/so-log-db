export interface Hotspot {
  label: string
  title: string
  description: string
  x: number
  y: number
}

export interface Screen {
  id: string
  name: string
  imageSrc: string
  hotspots: Hotspot[]
}

export interface DesignViewerProps {
  screen: Screen
}
