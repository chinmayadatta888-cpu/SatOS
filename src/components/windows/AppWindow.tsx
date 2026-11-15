import { memo, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { PixelIcon } from '../desktop/DesktopIcon'
import PhotosApp from '../photos/PhotosApp'
import NoteForYouApp from '../note/NoteForYouApp'
import AchievementsApp from '../achievements/AchievementsApp'
import RecycleBinApp from '../recycle/RecycleBinApp'
import SatwiscapeApp from '../satwiscape/SatwiscapeApp'
import MessageToCDApp from '../message/MessageToCDApp'
import JunnyHQApp from '../junny/JunnyHQApp'
import type { ManagedWindow, WindowRect } from '../../types/window'

type ResizeEdge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'
type Gesture = { pointerId: number; x: number; y: number; rect: WindowRect; edge?: ResizeEdge }

type Props = {
  window: ManagedWindow
  active: boolean
  boundsWidth: number
  boundsHeight: number
  onFocus: (id: string) => void
  onMove: (id: string, rect: WindowRect) => void
  onResize: (id: string, rect: WindowRect) => void
  onMinimize: (id: string) => void
  onMaximize: (id: string) => void
  onClose: (id: string) => void
}

function WindowGlyph({ kind }: { kind: 'minimize' | 'maximize' | 'restore' | 'close' }) {
  if (kind === 'minimize') return <svg viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges"><rect x="3" y="11" width="10" height="2" fill="currentColor" /></svg>
  if (kind === 'maximize') return <svg viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges"><path d="M3 2h10v12H3zM5 4v8h6V4z" fill="currentColor" fillRule="evenodd" /></svg>
  if (kind === 'restore') return <svg viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges"><path d="M5 2h9v10h-2V4H5zM2 5h9v9H2zm2 2v5h5V7z" fill="currentColor" fillRule="evenodd" /></svg>
  return <svg viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges"><path d="M4 2h2l2 3 2-3h2v2l-3 4 3 4v2h-2l-2-3-2 3H4v-2l3-4-3-4z" fill="currentColor" /></svg>
}

function AppWindow({ window, active, boundsWidth, boundsHeight, onFocus, onMove, onResize, onMinimize, onMaximize, onClose }: Props) {
  const titleDrag = useRef<Gesture | null>(null)
  const resizeDrag = useRef<Gesture | null>(null)
  const minWidth = Math.min(320, boundsWidth)
  const minHeight = Math.min(220, boundsHeight)

  function startTitleDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || (event.target instanceof Element && event.target.closest('button'))) return
    event.preventDefault()
    event.stopPropagation()
    onFocus(window.id)
    if (window.maximized) return
    event.currentTarget.setPointerCapture(event.pointerId)
    titleDrag.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, rect: window.rect }
  }

  function moveTitleDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const gesture = titleDrag.current
    if (!gesture || gesture.pointerId !== event.pointerId) return
    const x = Math.max(0, Math.min(boundsWidth - gesture.rect.width, gesture.rect.x + event.clientX - gesture.x))
    const y = Math.max(0, Math.min(boundsHeight - gesture.rect.height, gesture.rect.y + event.clientY - gesture.y))
    onMove(window.id, { ...gesture.rect, x, y })
  }

  function endTitleDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (titleDrag.current?.pointerId === event.pointerId) titleDrag.current = null
  }

  function startResize(event: ReactPointerEvent<HTMLDivElement>, edge: ResizeEdge) {
    if (event.button !== 0 || window.maximized) return
    event.preventDefault()
    event.stopPropagation()
    onFocus(window.id)
    event.currentTarget.setPointerCapture(event.pointerId)
    resizeDrag.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, rect: window.rect, edge }
  }

  function moveResize(event: ReactPointerEvent<HTMLDivElement>) {
    const gesture = resizeDrag.current
    if (!gesture || gesture.pointerId !== event.pointerId || !gesture.edge) return
    const dx = event.clientX - gesture.x
    const dy = event.clientY - gesture.y
    const edge = gesture.edge
    const original = gesture.rect
    let { x, y, width, height } = original

    if (edge.includes('e')) width = Math.min(boundsWidth - x, Math.max(minWidth, original.width + dx))
    if (edge.includes('s')) height = Math.min(boundsHeight - y, Math.max(minHeight, original.height + dy))
    if (edge.includes('w')) {
      width = Math.min(original.x + original.width, Math.max(minWidth, original.width - dx))
      x = original.x + original.width - width
    }
    if (edge.includes('n')) {
      height = Math.min(original.y + original.height, Math.max(minHeight, original.height - dy))
      y = original.y + original.height - height
    }
    onResize(window.id, { x, y, width, height })
  }

  function endResize(event: ReactPointerEvent<HTMLDivElement>) {
    if (resizeDrag.current?.pointerId === event.pointerId) resizeDrag.current = null
  }

  return <section
    className={`app-window${active ? ' is-active' : ' is-inactive'}${window.maximized ? ' is-maximized' : ''}`}
    role="dialog"
    aria-labelledby={`window-title-${window.id}`}
    aria-hidden={window.minimized}
    style={{ left: window.rect.x, top: window.rect.y, width: window.rect.width, height: window.rect.height, zIndex: window.zIndex, display: window.minimized ? 'none' : undefined }}
    onPointerDown={() => onFocus(window.id)}
  >
    <div
      className="window-titlebar"
      onPointerDown={startTitleDrag}
      onPointerMove={moveTitleDrag}
      onPointerUp={endTitleDrag}
      onPointerCancel={endTitleDrag}
      onDoubleClick={(event) => {
        if (event.target instanceof Element && event.target.closest('button')) return
        onMaximize(window.id)
      }}
    >
      <span className="window-title-icon"><PixelIcon id={window.appId} /></span>
      <strong id={`window-title-${window.id}`} className="window-title">{window.title}</strong>
      <div className="window-controls">
        <button type="button" className="window-control" aria-label={`Minimize ${window.title}`} title="Minimize" onClick={() => onMinimize(window.id)}><WindowGlyph kind="minimize" /></button>
        <button type="button" className="window-control" aria-label={`${window.maximized ? 'Restore' : 'Maximize'} ${window.title}`} title={window.maximized ? 'Restore' : 'Maximize'} onClick={() => onMaximize(window.id)}><WindowGlyph kind={window.maximized ? 'restore' : 'maximize'} /></button>
        <button type="button" className="window-control window-close" aria-label={`Close ${window.title}`} title="Close" onClick={() => onClose(window.id)}><WindowGlyph kind="close" /></button>
      </div>
    </div>
    <div className={`window-content${window.appId === 'photos' ? ' photos-window-content' : ''}${['note', 'achievements', 'recycle', 'satwiscape', 'message', 'teddy'].includes(window.appId) ? ` ${window.appId === 'teddy' ? 'junny' : window.appId}-window-content` : ''}`}>
      {window.appId === 'photos' ? <PhotosApp />
        : window.appId === 'note' ? <NoteForYouApp />
        : window.appId === 'achievements' ? <AchievementsApp />
        : window.appId === 'recycle' ? <RecycleBinApp />
        : window.appId === 'satwiscape' ? <SatwiscapeApp />
        : window.appId === 'message' ? <MessageToCDApp />
        : window.appId === 'teddy' ? <JunnyHQApp />
        : <div className="window-placeholder">
          <div className={`window-placeholder-icon icon-${window.appId}`}><PixelIcon id={window.appId} /></div>
          <div className="window-placeholder-copy">
            <h2>{window.title}</h2>
            <p>{window.subtitle}</p>
            <small>This little app is getting ready.</small>
          </div>
        </div>}
    </div>
    {!window.maximized && <div className="window-resize-handles" aria-hidden="true">
      {(['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'] as ResizeEdge[]).map((edge) => <div
        key={edge}
        className={`resize-handle resize-${edge}`}
        onPointerDown={(event) => startResize(event, edge)}
        onPointerMove={moveResize}
        onPointerUp={endResize}
        onPointerCancel={endResize}
      />)}
    </div>}
  </section>
}

export default memo(AppWindow)
