import { desktopApps, type DesktopApp } from '../../config/desktopApps'
import { PixelIcon } from '../desktop/DesktopIcon'
import { PixelMark, PixelSpark } from '../taskbar/Taskbar'

export default function StartMenu({ onOpen }: { onOpen: (app: DesktopApp) => void }) {
  return (
    <section className="start-menu" aria-label="Satwika OS Start Menu">
      <header className="start-menu-header">
        <div className="profile-pixel"><PixelMark /></div>
        <div><strong>Satwika</strong><span>a little world for you</span></div>
      </header>
      <div className="start-menu-body">
        <div className="start-app-list">
          <p className="start-section-label">YOUR LITTLE APPS</p>
          {desktopApps.map((app) => <button type="button" className="start-app" key={app.id} onClick={() => onOpen(app)}><span className={`start-app-swatch swatch-${app.id}`}><PixelIcon id={app.id} /></span><span>{app.name}</span></button>)}
        </div>
        <aside className="start-side-note">
          <div className="side-flower"><PixelMark /></div>
          <strong>Made with love</strong>
          <span>for the brightest person in the room.</span>
          <div className="side-sparkles"><PixelSpark /><PixelSpark /><PixelSpark /></div>
        </aside>
      </div>
      <footer className="start-menu-footer"><span>Satwika OS</span><span>♡</span></footer>
    </section>
  )
}
