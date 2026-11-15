import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { desktopApps, type DesktopApp } from '../../config/desktopApps'
import type { useWindowManager } from '../../hooks/useWindowManager'
import PixelLandscape from './PixelLandscape'
import DesktopIcon from './DesktopIcon'
import WindowLayer from '../windows/WindowLayer'

type Point = { x: number; y: number }
type DragState = { pointerId: number; id: string; pointerX: number; pointerY: number; ids: string[]; origins: Record<string, Point>; moved: boolean }
type MarqueeState = { pointerId: number; startX: number; startY: number; x: number; y: number; moved: boolean; additive: boolean; base: string[] }
type MarqueeRect = { left: number; top: number; width: number; height: number }
type WindowManager = ReturnType<typeof useWindowManager>

const ICON_KEY = 'satwika.desktop-icons.v1'
const TASKBAR_HEIGHT = 48
const ICON_WIDTH = 78
const ICON_HEIGHT = 104
const STEP_Y = 98
const STEP_X = 96

function clampPoint(point: Point, width: number, height: number): Point {
  return {
    x: Math.max(0, Math.min(Math.max(0, width - ICON_WIDTH), point.x)),
    y: Math.max(0, Math.min(Math.max(0, height - ICON_HEIGHT), point.y)),
  }
}

function initialPositions(width: number, height: number): Record<string, Point> {
  const rows = Math.max(1, Math.floor((height - 36) / STEP_Y))
  const columns = Math.ceil(desktopApps.length / rows)
  const positions: Record<string, Point> = {}
  desktopApps.forEach((app, index) => {
    const column = Math.floor(index / rows)
    const row = index % rows
    positions[app.id] = { x: 18 + column * STEP_X, y: 18 + row * STEP_Y }
  })
  if (columns * STEP_X + ICON_WIDTH > width) {
    desktopApps.forEach((app, index) => { positions[app.id] = { x: 12, y: 12 + index * 88 } })
  }
  try {
    const saved = sessionStorage.getItem(ICON_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as Record<string, Point>
      for (const app of desktopApps) {
        const savedPoint = parsed[app.id]
        if (savedPoint && Number.isFinite(savedPoint.x) && Number.isFinite(savedPoint.y)) {
          positions[app.id] = clampPoint(savedPoint, width, height)
        }
      }
    }
  } catch { /* Use defaults when the current session cannot be read. */ }
  return positions
}

function isEditable(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
}

export default function Desktop({ nightAmount, onOpen, windowManager }: { nightAmount: number; onOpen: (app: DesktopApp) => void; windowManager: WindowManager }) {
  const desktopRef = useRef<HTMLElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const marqueeRef = useRef<MarqueeState | null>(null)
  const pointerClickHandled = useRef(false)
  const suppressClickUntil = useRef(0)
  const toastTimer = useRef<number | undefined>(undefined)
  const [bounds, setBounds] = useState(() => ({ width: window.innerWidth, height: Math.max(240, window.innerHeight - TASKBAR_HEIGHT) }))
  const [positions, setPositions] = useState(() => initialPositions(window.innerWidth, window.innerHeight - TASKBAR_HEIGHT))
  const positionsRef = useRef(positions)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [marquee, setMarquee] = useState<MarqueeRect | null>(null)
  const [dropToast, setDropToast] = useState<{ message: string; x: number; y: number } | null>(null)

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  function updatePositions(next: Record<string, Point>) {
    positionsRef.current = next
    setPositions(next)
  }

  useEffect(() => {
    const element = desktopRef.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width
      const height = entry.contentRect.height
      setBounds({ width, height })
      const next = { ...positionsRef.current }
      for (const app of desktopApps) next[app.id] = clampPoint(next[app.id] ?? { x: 18, y: 18 }, width, height)
      positionsRef.current = next
      setPositions(next)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  function selectWithin(rect: MarqueeRect, additive: boolean, base: string[]) {
    const desktopBounds = desktopRef.current?.getBoundingClientRect()
    if (!desktopBounds) return
    const selection = new Set(additive ? base : [])
    for (const app of desktopApps) {
      const icon = desktopRef.current?.querySelector<HTMLElement>(`[data-icon-id="${app.id}"]`)
      if (!icon) continue
      const iconBounds = icon.getBoundingClientRect()
      const left = iconBounds.left - desktopBounds.left
      const top = iconBounds.top - desktopBounds.top
      const intersects = left < rect.left + rect.width && left + iconBounds.width > rect.left && top < rect.top + rect.height && top + iconBounds.height > rect.top
      if (intersects) selection.add(app.id)
    }
    setSelectedIds(Array.from(selection))
  }

  function handleDesktopPointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (event.button !== 0 || event.target !== event.currentTarget) return
    const element = desktopRef.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const additive = event.ctrlKey || event.metaKey
    event.currentTarget.setPointerCapture(event.pointerId)
    windowManager.blurActiveWindow()
    marqueeRef.current = { pointerId: event.pointerId, startX: x, startY: y, x, y, moved: false, additive, base: selectedIds }
    setMarquee({ left: x, top: y, width: 0, height: 0 })
    if (!additive) setSelectedIds([])
  }

  function handleDesktopPointerMove(event: ReactPointerEvent<HTMLElement>) {
    const current = marqueeRef.current
    const element = desktopRef.current
    if (!current || current.pointerId !== event.pointerId || !element) return
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const moved = current.moved || Math.abs(x - current.startX) + Math.abs(y - current.startY) > 5
    const next = { ...current, x, y, moved }
    marqueeRef.current = next
    const selectionRect = {
      left: Math.min(current.startX, x),
      top: Math.min(current.startY, y),
      width: Math.abs(x - current.startX),
      height: Math.abs(y - current.startY),
    }
    setMarquee(selectionRect)
    if (moved) selectWithin(selectionRect, current.additive, current.base)
  }

  function handleDesktopPointerUp(event: ReactPointerEvent<HTMLElement>) {
    const current = marqueeRef.current
    if (!current || current.pointerId !== event.pointerId) return
    if (!current.moved && !current.additive) setSelectedIds([])
    marqueeRef.current = null
    setMarquee(null)
  }

  function handleIconPointerDown(event: ReactPointerEvent<HTMLButtonElement>, id: string) {
    if (event.button !== 0) return
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)
    pointerClickHandled.current = true
    const modifier = event.ctrlKey || event.metaKey
    if (!modifier && !selectedIds.includes(id)) setSelectedIds([id])
    const ids = !modifier && selectedIds.includes(id) ? selectedIds : [id]
    const origins: Record<string, Point> = {}
    for (const selectedId of ids) origins[selectedId] = positionsRef.current[selectedId] ?? positions[selectedId] ?? { x: 18, y: 18 }
    dragRef.current = { pointerId: event.pointerId, id, pointerX: event.clientX, pointerY: event.clientY, ids, origins, moved: false }
  }

  function handleIconPointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const dx = event.clientX - drag.pointerX
    const dy = event.clientY - drag.pointerY
    if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 5) return
    drag.moved = true
    const originPoints = drag.ids.map((id) => drag.origins[id])
    const minX = Math.min(...originPoints.map((point) => point.x))
    const minY = Math.min(...originPoints.map((point) => point.y))
    const maxX = Math.max(...originPoints.map((point) => point.x + ICON_WIDTH))
    const maxY = Math.max(...originPoints.map((point) => point.y + ICON_HEIGHT))
    const actualDx = Math.max(-minX, Math.min(bounds.width - maxX, dx))
    const actualDy = Math.max(-minY, Math.min(bounds.height - maxY, dy))
    const next = { ...positionsRef.current }
    drag.ids.forEach((id) => { next[id] = { x: drag.origins[id].x + actualDx, y: drag.origins[id].y + actualDy } })
    updatePositions(next)
  }

  function handleIconPointerUp(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    if (drag.moved) {
      const recycleIcon = desktopRef.current?.querySelector<HTMLElement>('[data-icon-id="recycle"]')
      const recycleBounds = recycleIcon?.getBoundingClientRect()
      const droppedOnRecycle = Boolean(recycleBounds && event.clientX >= recycleBounds.left && event.clientX <= recycleBounds.right && event.clientY >= recycleBounds.top && event.clientY <= recycleBounds.bottom)
      if (droppedOnRecycle) {
        const restored = { ...positionsRef.current, ...drag.origins }
        updatePositions(restored)
        try { sessionStorage.setItem(ICON_KEY, JSON.stringify(restored)) } catch { /* The icons still return to their original positions in this view. */ }
        const desktopBounds = desktopRef.current?.getBoundingClientRect()
        if (desktopBounds && recycleBounds) {
          const x = Math.max(8, Math.min(desktopBounds.width - 286, recycleBounds.left - desktopBounds.left + recycleBounds.width / 2 - 143))
          const y = Math.max(8, recycleBounds.top - desktopBounds.top - 50)
          setDropToast({ message: "Don't try to delete good memories!", x, y })
          window.clearTimeout(toastTimer.current)
          toastTimer.current = window.setTimeout(() => setDropToast(null), 2600)
        }
      }
      try { sessionStorage.setItem(ICON_KEY, JSON.stringify(positionsRef.current)) } catch { /* Current positions still work if storage is unavailable. */ }
      suppressClickUntil.current = Date.now() + (droppedOnRecycle ? 850 : 250)
    }
    dragRef.current = null
    window.setTimeout(() => { pointerClickHandled.current = false }, 0)
  }

  function handleIconClick(event: ReactMouseEvent<HTMLButtonElement>, id: string) {
    if (Date.now() < suppressClickUntil.current) return
    if (pointerClickHandled.current) {
      pointerClickHandled.current = false
      if (event.ctrlKey || event.metaKey) {
        setSelectedIds((current) => current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id])
      }
      return
    }
    if (event.ctrlKey || event.metaKey) {
      setSelectedIds((current) => current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id])
    } else {
      setSelectedIds([id])
    }
  }

  function handleIconDoubleClick(id: string) {
    if (Date.now() < suppressClickUntil.current) return
    const app = desktopApps.find((item) => item.id === id)
    if (app) onOpen(app)
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (isEditable(event.target)) return
    if (event.key === 'Escape') {
      setSelectedIds([])
      return
    }
    if (event.key === 'Enter' && !event.repeat && selectedIds.length === 1) {
      const app = desktopApps.find((item) => item.id === selectedIds[0])
      if (app) { event.preventDefault(); onOpen(app) }
    }
    if (event.key === 'Delete' && selectedIds.length > 0) {
      event.preventDefault()
      const recycleBin = desktopApps.find((app) => app.id === 'recycle')
      if (recycleBin) onOpen(recycleBin)
    }
  }

  const visibleMarquee = marquee && (marquee.width > 2 || marquee.height > 2) ? marquee : null

  return <main
    className="desktop"
    ref={desktopRef}
    tabIndex={0}
    aria-label="Desktop"
    onPointerDown={handleDesktopPointerDown}
    onPointerMove={handleDesktopPointerMove}
    onPointerUp={handleDesktopPointerUp}
    onPointerCancel={handleDesktopPointerUp}
    onKeyDown={handleKeyDown}
    onContextMenu={(event) => event.preventDefault()}
  >
    <PixelLandscape nightAmount={nightAmount} />
    <div className="desktop-wash" aria-hidden="true" />
    {desktopApps.map((app) => <DesktopIcon
      key={app.id}
      app={app}
      selected={selectedIds.includes(app.id)}
      position={positions[app.id] ?? { x: 18, y: 18 }}
      onSelect={(event) => handleIconClick(event, app.id)}
      onOpen={() => handleIconDoubleClick(app.id)}
      onPointerDown={handleIconPointerDown}
      onPointerMove={handleIconPointerMove}
      onPointerUp={handleIconPointerUp}
    />)}
    {visibleMarquee && <div className="selection-marquee" aria-hidden="true" style={visibleMarquee} />}
    <WindowLayer
      windows={windowManager.windows}
      activeWindowId={windowManager.activeWindowId}
      boundsWidth={bounds.width}
      boundsHeight={bounds.height}
      onFocus={windowManager.focusWindow}
      onMove={windowManager.setWindowRect}
      onResize={windowManager.setWindowRect}
      onMinimize={windowManager.minimizeWindow}
      onMaximize={windowManager.maximizeWindow}
      onClose={windowManager.closeWindow}
    />
    {dropToast && <div className="recycle-drop-toast" role="status" aria-live="polite" style={{ left: dropToast.x, top: dropToast.y }}>
      <span className="recycle-toast-mark" aria-hidden="true">!</span>{dropToast.message}
    </div>}
  </main>
}
