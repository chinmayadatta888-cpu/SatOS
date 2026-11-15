import { PixelIcon } from '../desktop/DesktopIcon'
import type { ManagedWindow } from '../../types/window'

export function PixelMark() {
  return <svg className="satwika-mark" viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges">
    <rect x="13" y="2" width="6" height="8" fill="#ffe48a"/><rect x="13" y="22" width="6" height="8" fill="#ffe48a"/>
    <rect x="2" y="13" width="8" height="6" fill="#ffe48a"/><rect x="22" y="13" width="8" height="6" fill="#ffe48a"/>
    <rect x="6" y="6" width="6" height="6" fill="#f6a4ba"/><rect x="20" y="6" width="6" height="6" fill="#f6a4ba"/>
    <rect x="6" y="20" width="6" height="6" fill="#f6a4ba"/><rect x="20" y="20" width="6" height="6" fill="#f6a4ba"/>
    <rect x="12" y="12" width="8" height="8" fill="#fff1bd"/><rect x="14" y="14" width="2" height="2" fill="#644b62"/><rect x="18" y="14" width="2" height="2" fill="#644b62"/>
  </svg>
}

export function PixelSpark() {
  return <svg className="quick-pixel-spark" viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges">
    <rect x="7" y="0" width="2" height="5" fill="#ffe7a4"/><rect x="7" y="11" width="2" height="5" fill="#ffe7a4"/>
    <rect x="0" y="7" width="5" height="2" fill="#ffe7a4"/><rect x="11" y="7" width="5" height="2" fill="#ffe7a4"/><rect x="5" y="5" width="6" height="6" fill="#fff4c4"/>
  </svg>
}

function PixelSystemIcon({ kind }: { kind: 'wifi' | 'battery' }) {
  if (kind === 'wifi') return <svg viewBox="0 0 16 16" className="tray-pixel-icon" role="img" aria-label="Wi-Fi connected" shapeRendering="crispEdges">
    <rect x="1" y="3" width="3" height="2"/><rect x="4" y="2" width="8" height="2"/><rect x="12" y="3" width="3" height="2"/>
    <rect x="3" y="6" width="3" height="2"/><rect x="6" y="5" width="4" height="2"/><rect x="10" y="6" width="3" height="2"/>
    <rect x="6" y="9" width="4" height="2"/><rect x="7" y="12" width="2" height="3"/>
  </svg>
  return <svg viewBox="0 0 16 16" className="tray-pixel-icon" role="img" aria-label="Charging" shapeRendering="crispEdges">
    <rect x="6" y="0" width="4" height="2"/><rect x="3" y="2" width="10" height="13" fill="#193e5c"/>
    <rect x="5" y="4" width="6" height="9" fill="#7ee77a"/><rect x="7" y="5" width="2" height="3" fill="#fff5c3"/>
    <rect x="6" y="8" width="3" height="2" fill="#fff5c3"/><rect x="8" y="10" width="2" height="2" fill="#fff5c3"/>
  </svg>
}

type Props = {
  now: Date
  startOpen: boolean
  calendarOpen: boolean
  windows: ManagedWindow[]
  activeWindowId: string | null
  onWindowButtonClick: (id: string) => void
  onToggleStart: () => void
  onToggleCalendar: () => void
}

export default function Taskbar({ now, startOpen, calendarOpen, windows, activeWindowId, onWindowButtonClick, onToggleStart, onToggleCalendar }: Props) {
  const time = now.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  const date = now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })

  return <div className="taskbar" role="toolbar" aria-label="Desktop taskbar">
    <button type="button" className={`start-button${startOpen ? ' start-active' : ''}`} onClick={onToggleStart} aria-expanded={startOpen}>
      <span className="start-logo"><PixelMark /></span><span className="start-word">start</span>
    </button>
    <div className="taskbar-divider" aria-hidden="true" />
    <div className="quick-launch" aria-label="Quick launch area"><span className="quick-launch-tile"><PixelSpark /></span><span className="quick-launch-tile quick-launch-tile-small"><PixelSpark /></span></div>
    <div className="taskbar-app-area" role="group" aria-label="Open applications">
      {windows.map((window) => <button
        key={window.id}
        type="button"
        className={`taskbar-window-button${window.id === activeWindowId ? ' is-active' : ''}${window.minimized ? ' is-minimized' : ''}`}
        aria-label={`${window.minimized ? 'Restore' : window.id === activeWindowId ? 'Minimize' : 'Switch to'} ${window.title}`}
        aria-pressed={window.id === activeWindowId}
        title={window.title}
        onClick={() => onWindowButtonClick(window.id)}
      ><span className="taskbar-window-icon"><PixelIcon id={window.appId} /></span><span className="taskbar-window-title">{window.title}</span></button>)}
    </div>
    <div className="tray-divider" aria-hidden="true" />
    <div className="system-tray">
      <PixelSystemIcon kind="wifi" />
      <PixelSystemIcon kind="battery" />
      <button type="button" className={`clock-button${calendarOpen ? ' clock-active' : ''}`} onClick={onToggleCalendar} aria-expanded={calendarOpen} aria-label={`Open calendar, ${time}, ${date}`}>
        <span>{time}</span><small>{date}</small>
      </button>
    </div>
  </div>
}

