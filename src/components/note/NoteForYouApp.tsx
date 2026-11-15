import { useEffect, useRef, useState } from 'react'
import { noteDocumentTitle, noteLetter } from '../../config/noteContent'

type NoteStage = 'envelope' | 'opening' | 'letter'

function HeartSeal() {
  return <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges">
    <path d="M15 27L4 16V7h8l4 4 4-4h8v9L16 27z" fill="#f6a0ad" stroke="#563e57" strokeWidth="2" />
    <path d="M8 9h4l4 4 4-4h4v6L16 23 8 15z" fill="#ffe7a4" />
    <rect x="10" y="11" width="3" height="3" fill="#fff9e4" />
  </svg>
}

export default function NoteForYouApp() {
  const [stage, setStage] = useState<NoteStage>('envelope')
  const transitionTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(transitionTimer.current), [])

  function openLetter() {
    if (stage !== 'envelope') return
    setStage('opening')
    transitionTimer.current = window.setTimeout(() => setStage('letter'), 880)
  }

  function returnToEnvelope() {
    window.clearTimeout(transitionTimer.current)
    setStage('envelope')
  }

  if (stage === 'letter') return <section className="note-app note-paperwork" aria-label="Note For You letter">
    <header className="note-notepad-titlebar">
      <span className="note-notepad-icon" aria-hidden="true"><span>✎</span></span>
      <strong>{noteDocumentTitle}</strong>
      <button type="button" className="note-back-button" onClick={returnToEnvelope}><span aria-hidden="true">‹</span> Envelope</button>
    </header>
    <div className="note-notepad-menubar" aria-hidden="true"><span>FILE</span><span>EDIT</span><span>FORMAT</span><span>VIEW</span><span>HELP</span></div>
    <div className="note-paper-scroll">
      <article className="note-letter-paper" role="document" aria-label="Read-only birthday letter">
        <div className="note-paper-ruler" aria-hidden="true"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span><span>07</span></div>
        <pre className="note-letter-copy">{noteLetter}</pre>
        <div className="note-paper-signature" aria-hidden="true"><HeartSeal /><span>kept safe in this little world</span></div>
      </article>
    </div>
    <footer className="note-notepad-footer"><span>READ ONLY</span><span>LETTER.DAT</span><span>WRITTEN WITH LOVE</span></footer>
  </section>

  return <section className={`note-app note-envelope-screen${stage === 'opening' ? ' is-opening' : ''}`} aria-label="Note For You envelope">
    <header className="note-envelope-toolbar"><span className="note-postmark">A LITTLE POST</span><span>NO. 01</span></header>
    <div className="note-envelope-content">
      <p className="note-envelope-kicker">A PERSONAL DELIVERY FOR SATWIKA</p>
      <div className="note-envelope-wrap">
        <svg className="note-envelope-art" viewBox="0 0 300 205" aria-hidden="true" shapeRendering="crispEdges">
          <rect x="39" y="55" width="230" height="128" fill="#554356" />
          <rect x="32" y="46" width="230" height="128" fill="#edb3b6" stroke="#514052" strokeWidth="4" />
          <g className="note-letter-sheet">
            <rect x="72" y="13" width="150" height="150" fill="#fff8df" stroke="#604b5d" strokeWidth="3" />
            <rect x="89" y="39" width="83" height="5" fill="#d4bf9b" />
            <rect x="89" y="55" width="111" height="4" fill="#dfcfae" />
            <rect x="89" y="68" width="103" height="4" fill="#dfcfae" />
            <rect x="89" y="81" width="91" height="4" fill="#dfcfae" />
            <rect x="89" y="113" width="81" height="4" fill="#dfcfae" />
          </g>
          <path d="M34 49L147 119L34 174Z" fill="#f5c8bb" stroke="#514052" strokeWidth="3" />
          <path d="M260 49L147 119L260 174Z" fill="#e99fa9" stroke="#514052" strokeWidth="3" />
          <path d="M34 174V102L147 145L260 102V174Z" fill="#edb3b6" stroke="#514052" strokeWidth="3" />
          <path className="note-envelope-flap" d="M34 49L147 124L260 49Z" fill="#f7d5c3" stroke="#514052" strokeWidth="4" />
        </svg>
        <button className="note-heart-seal" type="button" aria-label="Open the sealed letter" onClick={openLetter} disabled={stage === 'opening'}><HeartSeal /></button>
      </div>
      <h1>You've got a little something...</h1>
      <p className="note-envelope-prompt">A small letter, tucked in here just for you.</p>
      <button type="button" className="note-open-letter-button" onClick={openLetter} disabled={stage === 'opening'}>
        <span className="note-button-heart" aria-hidden="true"><HeartSeal /></span>{stage === 'opening' ? 'Opening your letter…' : 'Open Letter'}
      </button>
    </div>
    <footer className="note-envelope-footer"><span>SEALED WITH CARE</span><span>♡</span><span>FOR YOUR EYES ONLY</span></footer>
  </section>
}
