import type { MouseEvent, PointerEvent, ReactNode } from 'react'
import type { DesktopApp } from '../../config/desktopApps'

export function PixelIcon({ id }: { id: string }) {
  const common = { shapeRendering: 'crispEdges' as const, stroke: '#493a57', strokeWidth: 3, strokeLinejoin: 'round' as const }
  const art: Record<string, ReactNode> = {
    photos: <><rect x="13" y="18" width="38" height="29" fill="#f8eee1" {...common}/><rect x="18" y="23" width="28" height="18" fill="#86cbe4"/><rect x="18" y="34" width="28" height="7" fill="#8fc177"/><rect x="23" y="28" width="7" height="7" fill="#ffe27d"/><rect x="18" y="14" width="25" height="8" fill="#f08b76" {...common}/></>,
    note: <><rect x="15" y="11" width="34" height="42" fill="#fff5c9" {...common}/><rect x="22" y="22" width="21" height="3" fill="#dcae55"/><rect x="22" y="31" width="21" height="3" fill="#dcae55"/><rect x="22" y="40" width="15" height="3" fill="#dcae55"/><path d="M43 48l8-8 5 5-8 8-6 2z" fill="#ee8d77" {...common}/></>,
    achievements: <><path d="M32 8l7 7 10-1 1 10 7 8-7 8-1 10-10-1-7 7-7-7-10 1-1-10-7-8 7-8 1-10 10 1z" fill="#f6d675" {...common}/><path d="M25 34l5 5 11-12" fill="none" stroke="#fff9e8" strokeWidth="5" strokeLinecap="square"/></>,
    recycle: <><path d="M20 19h25l-3 32H23z" fill="#b5dce0" {...common}/><rect x="17" y="14" width="31" height="6" fill="#d3edef" {...common}/><path d="M27 29l5-7 4 2-3 4h7l3 5-4 2-2-3h-7l1 3-4 1-3-6 3-1z" fill="#6eafbb"/></>,
    satwiscape: <><rect x="9" y="13" width="46" height="38" fill="#e8f0df" {...common}/><rect x="9" y="13" width="46" height="8" fill="#6194b7"/><rect x="14" y="16" width="3" height="3" fill="#f5d071"/><rect x="20" y="16" width="3" height="3" fill="#e89cad"/><rect x="27" y="16" width="20" height="3" fill="#dbeaf0"/><rect x="14" y="25" width="36" height="20" fill="#bde3ed"/><path d="M14 39l10-9 7 6 6-7 13 13v3H14z" fill="#70a879"/><circle cx="43" cy="31" r="3" fill="#f4cd69"/><rect x="14" y="47" width="36" height="2" fill="#726078"/></>,
    message: <><path d="M12 14h40v29H31l-11 9v-9h-8z" fill="#fff0df" {...common}/><rect x="19" y="23" width="24" height="3" fill="#d39386"/><rect x="19" y="31" width="17" height="3" fill="#d39386"/><path d="M45 10l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#f0c85e"/></>,
    teddy: <><path d="M13 20v-8h8V8h9v5h4V8h9v4h8v8h4v24h-6v7h-9v5H24v-5h-9v-7h-5V20z" fill="#ec4e78" stroke="#493a57" strokeWidth="3" strokeLinejoin="miter" shapeRendering="crispEdges"/><path d="M18 22h7v-7h6v7h-6v6h-7zM39 15h6v7h7v6h-7v-6h-6z" fill="#ffc9d4"/><path d="M20 29h24v15H20z" fill="#fff0df"/><rect x="23" y="28" width="4" height="5" fill="#352c3b"/><rect x="37" y="28" width="4" height="5" fill="#352c3b"/><path d="M29 35h7v5h-7z" fill="#bf233f"/><path d="M27 47h5v-4h4v4h5v4h-5v4h-4v-4h-5z" fill="#ff9fba" stroke="#493a57" strokeWidth="2" shapeRendering="crispEdges"/></>,
    settings: <><rect x="14" y="17" width="36" height="31" fill="#dedcf0" {...common}/><rect x="19" y="12" width="26" height="8" fill="#f4f0fb" {...common}/><circle cx="32" cy="32" r="9" fill="#9b96bd" stroke="#493a57" strokeWidth="3"/><circle cx="32" cy="32" r="3" fill="#f4f0fb"/><rect x="29" y="8" width="6" height="7" fill="#f4f0fb"/><rect x="29" y="46" width="6" height="7" fill="#f4f0fb"/><rect x="10" y="29" width="7" height="6" fill="#f4f0fb"/><rect x="47" y="29" width="7" height="6" fill="#f4f0fb"/></>,
  }
  return <svg className="app-icon-art" viewBox="0 0 64 64" aria-hidden="true">{art[id]}</svg>
}

type Props = {
  app: DesktopApp
  selected: boolean
  position: { x: number; y: number }
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void
  onOpen: () => void
  onPointerDown: (event: PointerEvent<HTMLButtonElement>, id: string) => void
  onPointerMove: (event: PointerEvent<HTMLButtonElement>) => void
  onPointerUp: (event: PointerEvent<HTMLButtonElement>) => void
}

export default function DesktopIcon({ app, selected, position, onSelect, onOpen, onPointerDown, onPointerMove, onPointerUp }: Props) {
  return (
    <button
      className={`desktop-icon${selected ? ' is-selected' : ''}`}
      style={{ left: position.x, top: position.y, '--app-color': app.color } as React.CSSProperties}
      type="button"
      aria-label={app.name}
      data-icon-id={app.id}
      aria-pressed={selected}
      onClick={onSelect}
      onDoubleClick={onOpen}
      onPointerDown={(event) => onPointerDown(event, app.id)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onContextMenu={(event) => event.preventDefault()}
      draggable={false}
    >
      <span className="icon-art-wrap"><PixelIcon id={app.id} /></span>
      <span className="desktop-icon-label">{app.name}</span>
    </button>
  )
}
