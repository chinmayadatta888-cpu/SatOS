import { memo } from 'react'
import AppWindow from './AppWindow'
import type { ManagedWindow } from '../../types/window'
import type { WindowRect } from '../../types/window'

type Props = {
  windows: ManagedWindow[]
  activeWindowId: string | null
  boundsWidth: number
  boundsHeight: number
  onFocus: (id: string) => void
  onMove: (id: string, rect: WindowRect) => void
  onResize: (id: string, rect: WindowRect) => void
  onMinimize: (id: string) => void
  onMaximize: (id: string) => void
  onClose: (id: string) => void
}

function WindowLayer({ windows, activeWindowId, boundsWidth, boundsHeight, onFocus, onMove, onResize, onMinimize, onMaximize, onClose }: Props) {
  return <div className="window-layer" aria-label="Application windows">
    {windows.map((window) => <AppWindow
      key={window.id}
      window={window}
      active={window.id === activeWindowId}
      boundsWidth={boundsWidth}
      boundsHeight={boundsHeight}
      onFocus={onFocus}
      onMove={onMove}
      onResize={onResize}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={onClose}
    />)}
  </div>
}

export default memo(WindowLayer)
