type Props = {
  candlesLit: boolean
  cakeCut: boolean
  smoke: boolean
  actionLabel?: string
  actionDisabled?: boolean
  onAction?: () => void
}

export default function BirthdayCake({ candlesLit, cakeCut, smoke, actionLabel, actionDisabled = false, onAction }: Props) {
  return <div className={`birthday-cake${candlesLit ? ' is-lit' : ''}${cakeCut ? ' is-cut' : ''}`}>
    <svg viewBox="0 0 260 210" role="img" aria-label={`Junny's pink birthday cake${candlesLit ? ' with glowing candles' : ''}${cakeCut ? ' with a slice served' : ''}`} shapeRendering="crispEdges">
      <ellipse cx="130" cy="181" rx="116" ry="17" fill="#72465c" />
      <ellipse cx="130" cy="177" rx="109" ry="14" fill="#fff0cf" stroke="#544155" strokeWidth="4" />
      {cakeCut ? <path d="M43 103h130v59H43z" fill="#ef819d" stroke="#593e54" strokeWidth="5" /> : <path d="M43 103h174v59H43z" fill="#ef819d" stroke="#593e54" strokeWidth="5" />}
      {cakeCut ? <path d="M39 93h137v22H39z" fill="#ffe7dc" stroke="#593e54" strokeWidth="4" /> : <path d="M39 93h182v22H39z" fill="#ffe7dc" stroke="#593e54" strokeWidth="4" />}
      {cakeCut ? <path d="M44 112h18v14h14v-14h16v14h15v-14h17v14h15v-14h17v14h17v-14h5v23h-5v-7h-17v7h-15v-7h-17v7h-15v-7h-17v7H76v-7H62v7H44z" fill="#fff7e8" stroke="#d76e91" strokeWidth="3" /> : <path d="M44 112h18v14h14v-14h16v14h15v-14h17v14h15v-14h17v14h15v-14h16v14h15v-14h8v23h-8v-7h-15v7h-15v-7h-16v7h-15v-7h-17v7h-15v-7h-17v7H76v-7H62v7H44z" fill="#fff7e8" stroke="#d76e91" strokeWidth="3" />}
      {cakeCut ? <path d="M43 97h133v14H43z" fill="#f398b1" /> : <path d="M43 97h174v14H43z" fill="#f398b1" />}
      <path d="M51 99h11v7H51zM76 99h12v7H76zM104 99h11v7h-11zM133 99h12v7h-12zM162 99h12v7h-12zM192 99h12v7h-12z" fill="#fff8dc" />
      <path d="M83 143l12-10 12 10-12 10zM150 143l12-10 12 10-12 10z" fill="#e7436e" stroke="#8d3c5b" strokeWidth="3" />
      <path d="M87 143h16M154 143h16" stroke="#fff3dc" strokeWidth="3" />
      {cakeCut && <g className="birthday-cake-slice"><path d="M178 148h63v21h-63z" fill="#fff0cf" stroke="#544155" strokeWidth="4"/><path d="M185 119l44 19v14h-44z" fill="#ef819d" stroke="#593e54" strokeWidth="4"/><path d="M183 116l47 19v10l-47-18z" fill="#fff3df" stroke="#d76e91" strokeWidth="3"/><path d="M196 140l9-7 9 7-9 6z" fill="#e7436e"/></g>}
      <g className="birthday-cake-candles">
        <path d="M74 60h15v39H74z" fill="#75b4c2" stroke="#59465a" strokeWidth="3"/><path d="M77 67h9M77 80h9" stroke="#fff2d8" strokeWidth="4"/>
        <path d="M123 48h15v51h-15z" fill="#f2b94f" stroke="#59465a" strokeWidth="3"/><path d="M126 58h9M126 73h9M126 88h9" stroke="#fff3df" strokeWidth="4"/>
        <path d="M172 60h15v39h-15z" fill="#be78a3" stroke="#59465a" strokeWidth="3"/><path d="M175 67h9M175 80h9" stroke="#fff2d8" strokeWidth="4"/>
        {candlesLit && <g className="birthday-cake-flames" fill="#ffd65e" stroke="#9d4d57" strokeWidth="2"><path d="M75 56h4v-7h5v-7h5v7h4v7h-4v5H79v-5z"/><path d="M124 44h4v-8h5v-8h5v8h4v8h-4v5h-10v-5z"/><path d="M173 56h4v-7h5v-7h5v7h4v7h-4v5h-10v-5z"/><path d="M82 53h4v4h-4zM131 41h4v4h-4zM180 53h4v4h-4z" fill="#fff5bb" stroke="none"/></g>}
        {smoke && !candlesLit && <g className="birthday-cake-smoke" fill="#c6aec5"><rect x="78" y="44" width="6" height="5"/><rect x="84" y="36" width="6" height="5"/><rect x="128" y="29" width="6" height="6"/><rect x="135" y="21" width="6" height="6"/><rect x="177" y="44" width="6" height="5"/><rect x="183" y="36" width="6" height="5"/></g>}
      </g>
      <path d="M94 87h72v5H94z" fill="#fff3d6"/><text x="130" y="91" textAnchor="middle" fill="#9c486d" fontFamily="var(--font-title)" fontSize="8">HAPPY BIRTHDAY</text>
      <path d="M39 158h182v7H39z" fill="#f5bdd0" stroke="#593e54" strokeWidth="3"/>
      <rect x="24" y="171" width="212" height="5" fill="#ebb0bd"/><rect x="35" y="175" width="190" height="4" fill="#d97a95"/>
    </svg>
    {actionLabel && <button type="button" className="birthday-cake-action" onClick={onAction} disabled={actionDisabled} aria-label={actionLabel} title={actionLabel}><span className="birthday-sr-only">{actionLabel}</span></button>}
  </div>
}
