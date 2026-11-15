import { useState } from 'react'
import { emptyBinMessages, recycleMemories, type RecycleMemory } from '../../config/recycleBin'
import { useSettings } from '../../context/SettingsContext'

function MemoryIcon({ kind }: { kind: RecycleMemory['kind'] }) {
  return <svg viewBox="0 0 40 40" className={`recycle-memory-art memory-${kind}`} aria-hidden="true" shapeRendering="crispEdges">
    <rect x="7" y="5" width="26" height="30" fill="#fff8df" stroke="#493a57" strokeWidth="2" />
    {kind === 'text' && <><rect x="12" y="12" width="15" height="3" fill="#82b8bd" /><rect x="12" y="19" width="13" height="2" fill="#d2bd98" /><rect x="12" y="24" width="16" height="2" fill="#d2bd98" /><rect x="12" y="29" width="10" height="2" fill="#d2bd98" /></>}
    {kind === 'memory' && <><path d="M11 27l4-11 5-4 5 4 4 11-4 4H15z" fill="#ef9dad" stroke="#493a57" strokeWidth="2" /><path d="M20 17l2 3 4 1-3 3-3 4-3-4-3-3 4-1z" fill="#fff2c4" /></>}
    {kind === 'data' && <><rect x="11" y="12" width="18" height="17" fill="#98c6dc" stroke="#493a57" strokeWidth="2" /><rect x="15" y="16" width="3" height="3" fill="#fff8df" /><rect x="22" y="16" width="3" height="3" fill="#fff8df" /><rect x="15" y="23" width="10" height="2" fill="#5284a1" /></>}
    {kind === 'program' && <><path d="M20 10l3 4 5-1-1 5 4 3-4 3 1 5-5-1-3 4-3-4-5 1 1-5-4-3 4-3-1-5 5 1z" fill="#f1c960" stroke="#493a57" strokeWidth="2" /><rect x="18" y="18" width="3" height="5" fill="#493a57" /><rect x="18" y="25" width="3" height="3" fill="#493a57" /></>}
  </svg>
}

function BinArtwork() {
  return <svg viewBox="0 0 100 100" className="recycle-bin-art" aria-hidden="true" shapeRendering="crispEdges">
    <rect x="24" y="25" width="54" height="56" fill="#8dc7cf" stroke="#453a54" strokeWidth="4" />
    <rect x="19" y="18" width="64" height="9" fill="#c8e6df" stroke="#453a54" strokeWidth="4" />
    <rect x="40" y="11" width="22" height="7" fill="#c8e6df" stroke="#453a54" strokeWidth="4" />
    <rect x="35" y="37" width="6" height="31" fill="#e8f6e8" />
    <rect x="56" y="37" width="6" height="31" fill="#e8f6e8" />
    <path d="M37 72l9-16 5 3-5 8h13l-4-6 5-3 8 14H50v-5l-8 5z" fill="#397e78" stroke="#453a54" strokeWidth="2" />
  </svg>
}

export default function RecycleBinApp() {
  const { settings } = useSettings()
  const [messageIndex, setMessageIndex] = useState<number | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [protectionMessage, setProtectionMessage] = useState('')

  function refuseEmpty() {
    setMessageIndex(attempts % emptyBinMessages.length)
    setProtectionMessage(settings.bearProtection ? "Junny's extra protection flag is active for Happiness.exe." : 'This bin is a simulation; no apps or real files can be deleted.')
    setAttempts(attempts + 1)
  }

  return <section className="recycle-app" aria-label="Recycle Bin">
    <header className="recycle-heading">
      <span className="recycle-heading-art"><BinArtwork /></span>
      <div><p className="recycle-eyebrow">A VERY SAFE LITTLE CORNER</p><h1>Recycle Bin</h1><p className="recycle-status"><span aria-hidden="true">●</span> Your memories are safe here.</p><p className="recycle-protection-state">Junny protection: {settings.bearProtection ? 'ENABLED' : 'disabled · bin remains non-destructive'}</p></div>
      <div className="recycle-entry-count"><strong>{recycleMemories.length}</strong><span>kept safe</span></div>
    </header>
    <div className="recycle-toolbar"><span>NAME <i>⌄</i></span><span>TYPE</span><span>SIZE</span><span>ADDED</span></div>
    <ul className="recycle-file-list" aria-label="Fictional memories">
      {recycleMemories.map((memory) => <li className="recycle-file-row" key={memory.id}>
        <span className="recycle-file-name"><MemoryIcon kind={memory.kind} /><strong>{memory.name}</strong></span>
        <span className="recycle-file-type">{memory.kind === 'program' ? 'Tiny program' : `${memory.kind} keepsake`}</span>
        <span className="recycle-file-size">{memory.size}</span>
        <span className="recycle-file-date">{memory.removed}</span>
      </li>)}
    </ul>
    <div className="recycle-footer">
      <span>{recycleMemories.length} special things are being kept safe.</span>
      <button type="button" className="recycle-empty-button" onClick={refuseEmpty}><span aria-hidden="true"><BinArtwork /></span> Empty Recycle Bin</button>
    </div>
    {messageIndex !== null && <div className="recycle-refusal" role="alert">
      <span className="recycle-refusal-icon" aria-hidden="true">!</span>
      <div><strong>Operation protected</strong><p>{emptyBinMessages[messageIndex]}</p><p>{protectionMessage}</p></div>
      <button type="button" aria-label="Dismiss message" onClick={() => setMessageIndex(null)}>×</button>
    </div>}
    <span className="recycle-attempt-count" aria-live="polite">{attempts > 0 ? `Safe attempts: ${attempts}` : 'Nothing here can be erased.'}</span>
  </section>
}
