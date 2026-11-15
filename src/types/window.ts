export type WindowRect = {
  x: number
  y: number
  width: number
  height: number
}

export type WindowBounds = {
  width: number
  height: number
}

export type ManagedWindow = {
  id: string
  appId: string
  title: string
  subtitle: string
  rect: WindowRect
  minimized: boolean
  maximized: boolean
  restoreRect: WindowRect | null
  zIndex: number
}
