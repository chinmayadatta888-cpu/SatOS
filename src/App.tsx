import { useCallback, useEffect, useState } from 'react'
import type { DesktopApp } from './config/desktopApps'
import BootScreen from './components/boot/BootScreen'
import BirthdayCalendar from './components/calendar/BirthdayCalendar'
import Desktop from './components/desktop/Desktop'
import StartMenu from './components/start-menu/StartMenu'
import Taskbar from './components/taskbar/Taskbar'
import { useLocalTime } from './hooks/useLocalTime'
import { useWindowManager } from './hooks/useWindowManager'

const BOOT_KEY = 'satwika.booted.v1'

function isEditable(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
}

export default function App() {
  const { now, nightAmount } = useLocalTime()
  const [showBoot, setShowBoot] = useState(() => sessionStorage.getItem(BOOT_KEY) !== 'yes')
  const [startOpen, setStartOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const windowManager = useWindowManager()
  const { closeWindow, openApp } = windowManager

  const finishBoot = useCallback(() => {
    sessionStorage.setItem(BOOT_KEY, 'yes')
    setShowBoot(false)
  }, [])

  const launchApp = useCallback((app: DesktopApp) => {
    setStartOpen(false)
    setCalendarOpen(false)
    openApp(app)
  }, [openApp])

  useEffect(() => {
    function closePopovers(event: PointerEvent) {
      const target = event.target
      if (!(target instanceof Element)) return
      if (!target.closest('.start-menu, .start-button') && startOpen) setStartOpen(false)
      if (!target.closest('.calendar-popover, .clock-button') && calendarOpen) setCalendarOpen(false)
    }
    document.addEventListener('pointerdown', closePopovers)
    return () => document.removeEventListener('pointerdown', closePopovers)
  }, [startOpen, calendarOpen])

  useEffect(() => {
    function handleSystemKeys(event: KeyboardEvent) {
      if (isEditable(event.target)) return
      if (event.altKey && event.key === 'F4' && windowManager.activeWindowId) {
        event.preventDefault()
        closeWindow(windowManager.activeWindowId)
      }
      if (event.key === 'Escape') {
        setStartOpen(false)
        setCalendarOpen(false)
      }
    }
    window.addEventListener('keydown', handleSystemKeys)
    return () => window.removeEventListener('keydown', handleSystemKeys)
  }, [closeWindow, windowManager.activeWindowId])

  return (
    <div className="satwika-shell">
      {showBoot ? <BootScreen onComplete={finishBoot} /> : <>
        <Desktop nightAmount={nightAmount} onOpen={launchApp} windowManager={windowManager} />
        {startOpen && <StartMenu onOpen={launchApp} />}
        {calendarOpen && <BirthdayCalendar today={now} />}
        <Taskbar
          now={now}
          startOpen={startOpen}
          calendarOpen={calendarOpen}
          windows={windowManager.windows}
          activeWindowId={windowManager.activeWindowId}
          onWindowButtonClick={windowManager.toggleTaskbarWindow}
          onToggleStart={() => { setStartOpen((open) => !open); setCalendarOpen(false) }}
          onToggleCalendar={() => { setCalendarOpen((open) => !open); setStartOpen(false) }}
        />
      </>}
    </div>
  )
}
