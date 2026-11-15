import { useEffect, useRef, useState, type ReactNode } from 'react'
import { junnyProfile } from '../../config/junny/profile'
import type { CeoAuthority, OsSettings } from '../../config/settings'
import { useSettings } from '../../context/SettingsContext'
import { playSystemSound } from '../../services/systemSounds'
import './settings.css'

type Category = 'appearance' | 'display' | 'sounds' | 'personalization' | 'junny' | 'diagnostics' | 'experimental' | 'about'

const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'appearance', label: 'Appearance', icon: '▧' },
  { id: 'display', label: 'Display', icon: '▣' },
  { id: 'sounds', label: 'Sounds', icon: '♫' },
  { id: 'personalization', label: 'Personalization', icon: '✿' },
  { id: 'junny', label: 'Junny Management', icon: '♥' },
  { id: 'diagnostics', label: 'Diagnostics', icon: '⌕' },
  { id: 'experimental', label: 'Experimental Features', icon: '⚑' },
  { id: 'about', label: 'About Satwika OS', icon: 'ⓘ' },
]

const categoryIntro: Record<Category, string> = {
  appearance: 'Set the mood. The wallpaper will cooperate immediately.',
  display: 'Small adjustments for the screen and the pixels looking back at it.',
  sounds: 'Short, original retro tones. Nothing plays until you ask it to.',
  personalization: 'Make the desktop feel like your desktop.',
  junny: 'Official administration, personally reviewed by the Chief Happiness Officer.',
  diagnostics: 'A completely serious inspection of systems that are doing just fine.',
  experimental: 'Optional personality settings. The potato is strictly metaphorical.',
  about: 'A modest control panel for a very important operating system.',
}

function SettingRow({ title, description, control, className = '' }: { title: string; description: string; control: ReactNode; className?: string }) {
  return <div className={`settings-row${className ? ` ${className}` : ''}`}>
    <div className="settings-row-copy"><strong>{title}</strong><p>{description}</p></div>
    <div className="settings-row-control">{control}</div>
  </div>
}

function SettingToggle({ checked, label, onChange }: { checked: boolean; label: string; onChange: (value: boolean) => void }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} className={`settings-switch${checked ? ' is-on' : ''}`} onClick={() => onChange(!checked)}>
    <span aria-hidden="true" />
  </button>
}

function SettingChoices<T extends string>({ value, label, options, onChange }: { value: T; label: string; options: { value: T; label: string }[]; onChange: (value: T) => void }) {
  return <div className="settings-segments" role="group" aria-label={label}>
    {options.map((option) => <button key={option.value} type="button" aria-pressed={value === option.value} className={value === option.value ? 'is-selected' : ''} onClick={() => onChange(option.value)}>{option.label}</button>)}
  </div>
}

function SettingRange({ value, label, onChange }: { value: number; label: string; onChange: (value: number) => void }) {
  return <div className="settings-range-control"><input type="range" min="0" max="100" step="1" value={value} aria-label={label} onChange={(event) => onChange(Number(event.target.value))}/><output>{value}</output></div>
}

function SettingsGroup({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return <section className={`settings-group${className ? ` ${className}` : ''}`}><h3>{title}</h3>{children}</section>
}

const diagnosticChecks = [
  'Checking happiness reserves…',
  'Locating Junny… found exactly where expected.',
  'Checking birthday readiness… critically high.',
  'Testing memory integrity… precious.',
  'Measuring emotional support… unlimited.',
]

const diagnosticReports = [
  ['Happiness levels', '100%'],
  ["Junny's patience", 'Variable'],
  ['Satwika detection', 'Successful'],
  ['Birthday readiness', 'Critically high'],
  ['Emotional support availability', 'Unlimited'],
  ['Memory integrity', 'Precious'],
  ['Unnecessary processes', '47'],
  ['Current CEO', 'Junny'],
  ['System stability', 'Emotionally stable enough'],
]

function cutenessMeaning(value: number) {
  if (value === 0) return 'Suspiciously ordinary.'
  if (value <= 25) return 'Mildly adorable.'
  if (value <= 50) return 'Unreasonably cute.'
  if (value <= 75) return 'Dangerously adorable.'
  return 'SYSTEM OVERLOAD: JUNNY TOO CUTE.'
}

function seriousnessMeaning(value: number) {
  if (value <= 20) return 'Absolutely unserious. The stapler is dressed as a fish.'
  if (value <= 40) return 'Mostly chill. Junny may still attend meetings.'
  if (value <= 60) return 'Moderately official. Please label the birthday cake.'
  if (value <= 80) return 'Serious enough to own a clipboard.'
  return 'Corporate environment. Junny requests a meeting about joy.'
}

function authorityStatus(authority: CeoAuthority) {
  if (authority === 'elevated') return 'Junny has approved this decision.'
  if (authority === 'unquestionable') return 'You now report directly to Junny.'
  return 'Junny has been informed.'
}

export default function SettingsApp() {
  const { settings, updateSettings, resetSettings } = useSettings()
  const [category, setCategory] = useState<Category>('appearance')
  const [notice, setNotice] = useState('')
  const [confirmReset, setConfirmReset] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [diagnosticIndex, setDiagnosticIndex] = useState(0)
  const [diagnosticsComplete, setDiagnosticsComplete] = useState(false)
  const [checkingUpdates, setCheckingUpdates] = useState(false)
  const [updateChecked, setUpdateChecked] = useState(false)
  const [versionClicks, setVersionClicks] = useState(0)
  const [developerMessage, setDeveloperMessage] = useState(false)
  const noticeTimer = useRef<number | undefined>(undefined)
  const versionTimer = useRef<number | undefined>(undefined)
  const resetTrigger = useRef<HTMLButtonElement | null>(null)
  const resetDialog = useRef<HTMLElement | null>(null)

  useEffect(() => () => {
    window.clearTimeout(noticeTimer.current)
    window.clearTimeout(versionTimer.current)
  }, [])

  useEffect(() => {
    if (!scanning) return
    if (diagnosticIndex >= diagnosticChecks.length) {
      const timer = window.setTimeout(() => { setDiagnosticsComplete(true); setScanning(false) }, 240)
      return () => window.clearTimeout(timer)
    }
    const timer = window.setTimeout(() => setDiagnosticIndex((current) => current + 1), 310)
    return () => window.clearTimeout(timer)
  }, [scanning, diagnosticIndex])

  useEffect(() => {
    if (!checkingUpdates) return
    const timer = window.setTimeout(() => {
      setCheckingUpdates(false)
      setUpdateChecked(true)
    }, 1200)
    return () => window.clearTimeout(timer)
  }, [checkingUpdates])

  useEffect(() => {
    if (!confirmReset) return
    const dialog = resetDialog.current
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button:not([disabled])') ?? [])
    focusable()[0]?.focus()
    function handleDialogKeys(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeReset()
        return
      }
      if (event.key !== 'Tab') return
      const controls = focusable()
      if (!controls.length) return
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', handleDialogKeys)
    return () => window.removeEventListener('keydown', handleDialogKeys)
  }, [confirmReset])

  function flashNotice(message: string) {
    setNotice(message)
    window.clearTimeout(noticeTimer.current)
    noticeTimer.current = window.setTimeout(() => setNotice(''), 2800)
  }

  function setSetting<K extends keyof OsSettings>(key: K, value: OsSettings[K], message = 'Preference saved to this computer.') {
    updateSettings({ [key]: value } as Partial<OsSettings>)
    flashNotice(message)
  }

  function setExperimental<K extends 'potatoMode' | 'mainCharacterMode' | 'dramaticStartup' | 'happyNotifications'>(key: K, value: OsSettings[K], message: string) {
    setSetting(key, value, key === 'potatoMode' || key === 'mainCharacterMode'
      ? value && settings.happyNotifications ? message : 'Experimental preference saved.'
      : message)
  }

  function runDiagnostics() {
    setDiagnosticIndex(0)
    setDiagnosticsComplete(false)
    setScanning(true)
  }

  function startUpdateCheck() {
    setUpdateChecked(false)
    setCheckingUpdates(true)
  }

  function closeReset() {
    setConfirmReset(false)
    window.requestAnimationFrame(() => resetTrigger.current?.focus())
  }

  function clickVersion() {
    const next = versionClicks + 1
    setVersionClicks(next)
    window.clearTimeout(versionTimer.current)
    if (next >= 5) {
      setDeveloperMessage(true)
      setVersionClicks(0)
      flashNotice("Developer mode unlocked. Please don't break anything. — CD")
    } else {
      versionTimer.current = window.setTimeout(() => setVersionClicks(0), 1800)
    }
  }

  const activeCategory = categories.find((item) => item.id === category)!

  return <section className="settings-app" aria-label="Satwika OS Control Panel">
    <header className="settings-titlebar"><span className="settings-title-icon" aria-hidden="true">⚙</span><div><small>SATWIKA OS CONTROL PANEL</small><h1>Settings</h1></div><span className="settings-title-tag">APPROVED BY JUNNY</span></header>
    <div className="settings-main-layout">
      <nav className="settings-category-nav" aria-label="Settings categories">
        <span className="settings-nav-heading">CONTROL PANEL</span>
        {categories.map((item) => <button key={item.id} type="button" className={category === item.id ? 'is-active' : ''} aria-current={category === item.id ? 'page' : undefined} onClick={() => setCategory(item.id)}><span aria-hidden="true">{item.icon}</span><span>{item.label}</span></button>)}
        <div className="settings-nav-spacer" />
        <button ref={resetTrigger} type="button" className="settings-reset-link" onClick={() => setConfirmReset(true)}><span aria-hidden="true">↺</span><span>Reset to defaults</span></button>
      </nav>
      <main className="settings-content" aria-labelledby="settings-category-title">
        <header className="settings-content-heading"><div><small>PERSONAL COMPUTER · PERSONAL PREFERENCES</small><h2 id="settings-category-title"><span aria-hidden="true">{activeCategory.icon}</span>{activeCategory.label}</h2><p>{categoryIntro[category]}</p></div></header>
        {notice && <div className="settings-notice" role="status" aria-live="polite"><span aria-hidden="true">✦</span>{notice}</div>}

        {category === 'appearance' && <>
          <SettingsGroup title="WALLPAPER LIGHTING">
            <SettingRow title="Wallpaper mode" description="Automatic follows local time. Day and Night hold the landscape to one setting." control={<SettingChoices value={settings.wallpaperMode} label="Wallpaper mode" options={[{ value: 'automatic', label: 'Automatic' }, { value: 'day', label: 'Day' }, { value: 'night', label: 'Night' }]} onChange={(value) => setSetting('wallpaperMode', value, value === 'automatic' ? 'Wallpaper is following local time again.' : `Wallpaper set to ${value}.`)}/>}/>
            <p className="settings-inline-note">The same day/night setting also lights Junny's room. The taskbar clock always follows your local time.</p>
          </SettingsGroup>
          <SettingsGroup title="DESKTOP SHORTCUTS">
            <div className="settings-shortcut-note"><span aria-hidden="true">▣</span><p>Show or hide desktop icons in <strong>Personalization</strong>. The Start Menu always keeps every app available.</p><button type="button" onClick={() => setCategory('personalization')}>Open Personalization ›</button></div>
          </SettingsGroup>
        </>}

        {category === 'display' && <>
          <SettingsGroup title="POINTER">
            <SettingRow title="Pixel cursor" description="Use Satwika's custom pixel pointer and matching hand, text, and resize cursors." control={<SettingToggle checked={settings.pixelCursor} label="Pixel cursor" onChange={(value) => setSetting('pixelCursor', value, value ? 'Pixel cursor restored.' : 'Normal system cursor enabled.')}/>}/>
          </SettingsGroup>
          <SettingsGroup title="MOTION">
            <SettingRow title="UI animations" description="Enable small transitions and pixel effects across the desktop and its apps." control={<SettingToggle checked={settings.uiAnimations} label="UI animations" onChange={(value) => setSetting('uiAnimations', value, value ? 'Interface motion enabled.' : 'Interface animations paused.')}/>}/>
            <SettingRow title="Reduced motion" description="Prefer a quieter display. This also pauses interface animation while enabled." control={<SettingToggle checked={settings.reducedMotion} label="Reduced motion" onChange={(value) => setSetting('reducedMotion', value, value ? 'Reduced motion is on.' : 'Reduced motion is off.')}/>}/>
            <p className="settings-inline-note">If either switch disables motion, the desktop, popups, and application animations stop immediately.</p>
          </SettingsGroup>
        </>}

        {category === 'sounds' && <>
          <SettingsGroup title="SYSTEM SOUND EFFECTS">
            <SettingRow title="System sounds" description="Play brief retro tones when apps open and common window controls are used." control={<SettingToggle checked={settings.systemSounds} label="System sound effects" onChange={(value) => setSetting('systemSounds', value, value ? 'System sounds enabled.' : 'System sounds muted.')}/>}/>
            <SettingRow title="System volume" description="Set the level for Satwika OS interface sounds." control={<SettingRange value={settings.systemVolume} label="System sound volume" onChange={(value) => setSetting('systemVolume', value, `System sound volume: ${value}%.`)}/>}/>
            <div className="settings-preview-row"><div><strong>Sound check</strong><p>Preview one quiet, original pixel-era confirmation tone.</p></div><button type="button" className="settings-action-button" onClick={() => { playSystemSound('confirm', settings.systemVolume); flashNotice('Preview played. The sound was invited by you.') }}>▶ Preview system sound</button></div>
          </SettingsGroup>
          <p className="settings-inline-note">No music, autoplay, microphones, or external sound files. Preview works even while system sounds are muted.</p>
        </>}

        {category === 'personalization' && <>
          <SettingsGroup title="DESKTOP">
            <SettingRow title="Desktop icons" description="Hide the shortcuts for a cleaner landscape. Apps remain available from the Start Menu." control={<SettingChoices value={settings.showDesktopIcons ? 'show' : 'hide'} label="Desktop icon visibility" options={[{ value: 'show', label: 'Show all' }, { value: 'hide', label: 'Hide all' }]} onChange={(value) => setSetting('showDesktopIcons', value === 'show', value === 'show' ? 'Desktop shortcuts are visible.' : 'Desktop shortcuts hidden. Start Menu access remains.')}/>}/>
          </SettingsGroup>
          <SettingsGroup title="TASKBAR">
            <SettingRow title="Clock format" description="Change only how the taskbar clock is displayed; it continues to use local time." control={<SettingChoices value={settings.clockFormat} label="Clock format" options={[{ value: '12h', label: '12-hour' }, { value: '24h', label: '24-hour' }]} onChange={(value) => setSetting('clockFormat', value, `Taskbar clock set to ${value === '12h' ? '12-hour' : '24-hour'} time.`)}/>}/>
          </SettingsGroup>
        </>}

        {category === 'junny' && <>
          <div className="settings-junny-banner"><div className="settings-junny-portrait"><img src={junnyProfile.portrait} alt="Junny, the official mascot" draggable={false}/></div><div><small>CHIEF HAPPINESS OFFICER · EMPLOYEE JUN-001</small><strong>Junny has personally approved this panel.</strong><span>All permissions remain fictional. The hugs are virtual.</span></div><span className="settings-junny-seal">CEO</span></div>
          <SettingsGroup title="CEO AUTHORITY">
            <SettingRow title="Authority level" description="A very serious title with absolutely no effect on your real permissions." control={<SettingChoices value={settings.ceoAuthority} label="Junny CEO authority" options={[{ value: 'normal', label: 'Normal' }, { value: 'elevated', label: 'Elevated' }, { value: 'unquestionable', label: 'Unquestionable' }]} onChange={(value) => setSetting('ceoAuthority', value, authorityStatus(value))}/>}/>
            <p className="settings-authority-message" role="status">{authorityStatus(settings.ceoAuthority)}</p>
          </SettingsGroup>
          <SettingsGroup title="WELFARE & PROTECTION">
            <SettingRow title="Enable Mandatory Virtual Hugs" description="A warm reminder from Junny. No physical contact, ever." control={<SettingToggle checked={settings.mandatoryHugs} label="Enable Mandatory Virtual Hugs" onChange={(value) => setSetting('mandatoryHugs', value, value ? 'Junny-approved: mandatory virtual hugs are enabled. ♡' : 'Virtual hugs are optional again.')}/>}/>
            <SettingRow title="Allow Junny to take scheduled naps" description="A fictional welfare permission. No timers or popups will interrupt you." control={<SettingToggle checked={settings.junnyNaps} label="Allow Junny to take scheduled naps" onChange={(value) => setSetting('junnyNaps', value, value ? 'Junny is now legally entitled to rest.' : 'Junny has filed a polite appeal for one more nap.')}/>}/>
            {settings.junnyNaps && <p className="settings-inline-note settings-junny-legal">Junny is now legally entitled to rest.</p>}
            <SettingRow title="Protect Junny from accidental deletion" description="Adds Junny's protection flag to the already non-destructive Recycle Bin. No real files or apps can be deleted there." control={<SettingToggle checked={settings.bearProtection} label="Protect Junny from accidental deletion" onChange={(value) => setSetting('bearProtection', value, value ? "Junny's extra Recycle Bin protection is active." : 'Junny remains safe; this Recycle Bin never deletes apps.')}/>}/>
          </SettingsGroup>
          <SettingsGroup title="CUTENESS CALIBRATION">
            <SettingRow title="Cuteness level" description={cutenessMeaning(settings.cuteness)} control={<SettingRange value={settings.cuteness} label="Junny cuteness calibration" onChange={(value) => setSetting('cuteness', value, `Cuteness calibration: ${value}%.`)}/>}/>
            <div className={`settings-cuteness-readout${settings.cuteness === 100 ? ' is-overloaded' : ''}`} aria-live="polite">{cutenessMeaning(settings.cuteness)}</div>
          </SettingsGroup>
          <SettingsGroup title="EMPLOYEE OF THE MONTH">
            <dl className="settings-employee-grid"><div><dt>Employee</dt><dd>Junny</dd></div><div><dt>Performance</dt><dd>Outstanding</dd></div><div><dt>Attendance</dt><dd>Mostly present</dd></div><div><dt>Productivity</dt><dd>100% cuteness</dd></div><div><dt>Complaints</dt><dd>Rejected by CEO</dd></div></dl>
          </SettingsGroup>
        </>}

        {category === 'diagnostics' && <>
          <SettingsGroup title="FICTIONAL SYSTEM REPORT">
            <dl className="settings-diagnostics-grid">{diagnosticReports.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </SettingsGroup>
          <SettingsGroup title="LIVE DIAGNOSTIC">
            <div className="settings-diagnostics-console" aria-live="polite" aria-atomic="false">
              {scanning ? <><span className="settings-console-label">SATWIKA DIAGNOSTIC UTILITY · SCANNING</span><div className="settings-scan-track"><i style={{ width: `${Math.min(100, diagnosticIndex / diagnosticChecks.length * 100)}%` }}/></div><ul>{diagnosticChecks.slice(0, diagnosticIndex).map((line) => <li key={line}>{line}</li>)}</ul>{diagnosticIndex < diagnosticChecks.length && <p className="settings-scan-current">{diagnosticChecks[diagnosticIndex]}</p>}</>
                : <span className="settings-console-label">{diagnosticsComplete ? 'SCAN COMPLETE · ALL CHECKS PASSED' : 'READY · PRESS RUN WHEN YOU ARE READY'}</span>}
            </div>
            <button type="button" className="settings-action-button" disabled={scanning} onClick={runDiagnostics}>{scanning ? 'SCANNING…' : '▶ RUN DIAGNOSTICS'}</button>
            {diagnosticsComplete && <div className="settings-diagnostic-result" role="status"><strong>DIAGNOSTICS COMPLETE</strong><p>All systems operational.</p><p>Junny remains adorable.</p><p>Satwika remains awesome.</p><p>No further improvements required.</p></div>}
          </SettingsGroup>
        </>}

        {category === 'experimental' && <>
          <SettingsGroup title="OPTIONAL PERSONALITY SETTINGS">
            <SettingRow title="Potato Mode" description="A fictional performance setting. The artwork deliberately stays crisp and unchanged." control={<SettingToggle checked={settings.potatoMode} label="Potato Mode" onChange={(value) => setExperimental('potatoMode', value, 'Performance optimised. Graphics reduced to potato.')}/>}/>
            <SettingRow title="Main Character Mode" description="Marks this computer's main character status. Tasteful confidence only." control={<SettingToggle checked={settings.mainCharacterMode} label="Main Character Mode" onChange={(value) => setExperimental('mainCharacterMode', value, 'Main character detected. Proceed accordingly.')}/>}/>
            <SettingRow title="Dramatic Startup" description="Saved preference only. This edition keeps its calm boot sequence; no startup effect is claimed." control={<SettingToggle checked={settings.dramaticStartup} label="Dramatic Startup preference" onChange={(value) => setExperimental('dramaticStartup', value, value ? 'Dramatic startup preference saved for a future edition.' : 'Calm startup preference restored.')}/>}/>
            <SettingRow title="Suspiciously Happy Notifications" description="Allow the optional Potato Mode and Main Character Mode messages." control={<SettingToggle checked={settings.happyNotifications} label="Suspiciously Happy Notifications" onChange={(value) => setExperimental('happyNotifications', value, value ? 'Optional happy notices are enabled.' : 'Optional happy notices are muted.')}/>}/>
          </SettingsGroup>
          <SettingsGroup title="SERIOUSNESS LEVEL">
            <SettingRow title="Corporate atmosphere" description={seriousnessMeaning(settings.seriousness)} control={<SettingRange value={settings.seriousness} label="Seriousness level" onChange={(value) => setSetting('seriousness', value, `Seriousness level: ${value}%.`)}/>}/>
            <div className="settings-seriousness-scale"><span>0 · Absolutely unserious</span><span>100 · Corporate environment</span></div>
          </SettingsGroup>
        </>}

        {category === 'about' && <>
          <SettingsGroup title="SATWIKA OS">
            <div className="settings-about-heading"><span aria-hidden="true">✿</span><div><strong>SATWIKA OS</strong><p>A very important operating system.</p></div></div>
            <dl className="settings-about-details"><div><dt>Version</dt><dd><button type="button" aria-label="Version 1.0 Birthday Edition. Click five times for developer mode." onClick={clickVersion}>1.0 (Birthday Edition)</button></dd></div><div><dt>Developer</dt><dd>CD</dd></div><div><dt>Official Mascot</dt><dd>Junny</dd></div><div><dt>System status</dt><dd>Operational</dd></div><div><dt>Primary purpose</dt><dd>Making Satwika smile</dd></div></dl>
            {developerMessage && <p className="settings-developer-message" role="status">Developer mode unlocked. Please don't break anything. — CD</p>}
          </SettingsGroup>
          <SettingsGroup title="FICTIONAL SYSTEM SPECIFICATIONS">
            <dl className="settings-about-details settings-spec-grid"><div><dt>Processor</dt><dd>Junny Core i7</dd></div><div><dt>Memory</dt><dd>Unlimited good memories</dd></div><div><dt>Graphics</dt><dd>Maximum cuteness rendering</dd></div><div><dt>Storage</dt><dd>Precious moments</dd></div><div><dt>Security</dt><dd>Protected by Junny</dd></div><div><dt>Operating temperature</dt><dd>Warm and cozy</dd></div></dl>
          </SettingsGroup>
          <SettingsGroup title="LOCAL UPDATE CHECK">
            <div className="settings-preview-row"><div><strong>Check for updates</strong><p>This is a fictional local check. It never contacts an update server.</p></div><button type="button" className="settings-action-button" disabled={checkingUpdates} onClick={startUpdateCheck}>{checkingUpdates ? 'CHECKING…' : 'CHECK FOR UPDATES'}</button></div>
            {checkingUpdates && <div className="settings-update-checking" role="status"><i/><i/><i/> Checking local version records…</div>}
            {updateChecked && <div className="settings-update-result" role="status"><strong>You're already running the latest version.</strong><span>Unfortunately, no update can make you more awesome.</span></div>}
          </SettingsGroup>
          <p className="settings-copyright">© Satwika OS · Developed by CD with Junny's very firm supervision.</p>
        </>}
      </main>
    </div>
    <footer className="settings-statusbar"><span><i/> SETTINGS OPERATIONAL</span><span>Preferences stored on this device</span></footer>

    {confirmReset && <div className="settings-dialog-backdrop" onPointerDown={(event) => { if (event.target === event.currentTarget) closeReset() }}>
      <section ref={resetDialog} className="settings-confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="settings-reset-title" aria-describedby="settings-reset-description">
        <header><span aria-hidden="true">↺</span><h2 id="settings-reset-title">Reset OS preferences?</h2></header>
        <p id="settings-reset-description">Wallpaper, display, sound, personalization, and Junny preferences will return to their defaults. Photos, messages, achievements, and other content will stay untouched.</p>
        <footer><button type="button" onClick={closeReset}>Keep my settings</button><button type="button" className="settings-danger-button" onClick={() => { resetSettings(); closeReset(); flashNotice('Default preferences restored. Your memories are untouched.') }}>Reset preferences</button></footer>
      </section>
    </div>}
  </section>
}
