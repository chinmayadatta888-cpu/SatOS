import type { CSSProperties } from 'react'
import type { BirthdayExpression, BirthdayPhase } from '../../config/junny/birthdayDialogue'
import type { RoomLight } from '../../config/junny/types'
import { junnyProfile } from '../../config/junny/profile'
import BirthdayCake from './BirthdayCake'
import JunnyCharacter from './JunnyCharacter'

type Props = {
  light: RoomLight
  phase: BirthdayPhase
  expression: BirthdayExpression
  canAdvance: boolean
  candlesLit: boolean
  cakeCut: boolean
  smoke: boolean
  cakeActionLabel?: string
  cakeActionDisabled: boolean
  showPresent: boolean
  celebrating: boolean
  onContinue: () => void
  onCakeAction: () => void
  onOpenGift: () => void
}

function PresentArtwork() {
  return <svg viewBox="0 0 120 112" aria-hidden="true" shapeRendering="crispEdges">
    <path d="M17 42h88v61H17z" fill="#d976a7" stroke="#563d58" strokeWidth="5"/>
    <path d="M11 34h100v18H11z" fill="#f7b1cf" stroke="#563d58" strokeWidth="5"/>
    <path d="M53 35h17v68H53z" fill="#fff0d0" stroke="#8d5574" strokeWidth="3"/>
    <path d="M48 15h10v16h-9v-8h-8v-8h7zM67 15h10v16h-9v-8h8v-8h-9z" fill="#f6c85d" stroke="#563d58" strokeWidth="4"/>
    <path d="M13 55h96M23 67h76M23 85h76" stroke="#ef9ac0" strokeWidth="4"/>
    <path d="M25 57h7v7h-7zM88 77h7v7h-7zM34 91h6v6h-6z" fill="#fff0d0"/>
  </svg>
}

export default function BirthdayRoomScene({ light, phase, expression, canAdvance, candlesLit, cakeCut, smoke, cakeActionLabel, cakeActionDisabled, showPresent, celebrating, onContinue, onCakeAction, onOpenGift }: Props) {
  return <section className={`birthday-room-scene birthday-phase-${phase}`} data-light={light} data-cake-lit={candlesLit ? 'yes' : 'no'} aria-label={`Junny's birthday room, ${light} outside`}>
    <svg className="birthday-room-art" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true" shapeRendering="crispEdges">
      <rect width="1200" height="405" fill="#c77d70"/>
      <rect width="1200" height="25" fill="#714f5b"/>
      <path d="M0 34h1200v9H0zM0 374h1200v36H0z" fill="#e6a27c"/>
      <path d="M0 52h1200M0 143h1200M0 240h1200M0 329h1200" stroke="#b96d69" strokeWidth="3"/>
      <path d="M20 26v380M1177 26v380M289 25v340M900 25v350" stroke="#9c5c5e" strokeWidth="6"/>
      <path d="M18 375h1165v18H18z" fill="#efba91"/>
      <rect y="410" width="1200" height="150" fill="#9a5e48"/>
      <path d="M0 434h1200M0 477h1200M0 520h1200" stroke="#71483f" strokeWidth="5"/>
      <path d="M32 417h105M176 450h245M522 424h196M820 492h265M35 537h280M447 493h212M986 432h161" stroke="#bb7952" strokeWidth="4"/>
      <path d="M140 412v23M337 412v23M595 412v23M868 412v23M1089 412v23M263 435v42M722 435v42M1021 477v43M88 477v43M491 520v40M845 520v40" stroke="#7f5142" strokeWidth="4"/>
      <path d="M57 69h222v205H57z" fill="#5b3e55" stroke="#4d394d" strokeWidth="7"/>
      <rect className="birthday-window-sky" x="70" y="82" width="196" height="179" fill="#72bfe1"/>
      <path d="M70 213h196v48H70z" fill="#83aa69"/>
      <path d="M70 229l43-43 26 29 36-51 45 52 21-27 25 27v45H70z" fill="#5a8a5b"/>
      <path d="M70 247l36-30 39 22 31-36 39 30 23-17 28 22v23H70z" fill="#6b9b5e"/>
      <path className="birthday-window-sun" d="M215 101h14v8h8v16h-8v8h-14v-8h-8v-16h8z" fill="#ffe18b"/>
      <path className="birthday-window-moon" d="M219 99h14v8h8v16h-8v8h-14v-8h-8v-16h8z" fill="#fff2bf"/>
      <g className="birthday-window-stars" fill="#fff2c2"><rect x="104" y="116" width="5" height="5"/><rect x="153" y="147" width="4" height="4"/><rect x="235" y="175" width="5" height="5"/><path d="M184 115h5v6h6v5h-6v6h-5v-6h-6v-5h6z"/></g>
      <path d="M163 81v181M68 169h200" stroke="#60445b" strokeWidth="9"/>
      <path d="M45 67h21v191H45zM268 67h21v191h-21z" fill="#d77d9e" stroke="#69485c" strokeWidth="4"/>
      <path d="M47 75h16v18H47zM270 75h16v18h-16zM47 111h16v18H47zM270 111h16v18h-16zM47 148h16v18H47zM270 148h16v18h-16zM47 185h16v18H47zM270 185h16v18h-16z" fill="#f4b0c2"/>
      <path d="M54 274h222" stroke="#5b3e55" strokeWidth="7"/>

      <path d="M302 107h196v154H302z" fill="#65444f" stroke="#4e384c" strokeWidth="6"/>
      <path d="M311 116h178v136H311z" fill="#8f5b50"/>
      <path d="M311 163h178v9H311zM311 208h178v9H311z" fill="#5a3d4e"/>
      <path d="M320 124h19v36h-19zM345 121h25v39h-25zM377 132h17v28h-17zM400 120h21v40h-21zM427 129h25v31h-25zM459 123h18v37h-18z" fill="#d55a70"/>
      <path d="M321 176h27v25h-27zM355 180h17v21h-17zM380 175h28v26h-28zM416 181h18v20h-18zM443 176h34v25h-34z" fill="#e4bd68"/>
      <path d="M320 225h39v17h-39zM367 223h21v19h-21zM398 228h34v14h-34zM442 222h34v20h-34z" fill="#819b70"/>
      <path d="M511 121h20v17h-20zM501 110h13v12h-13zM531 104h13v17h-13z" fill="#74935e"/>

      <path d="M939 110h207v172H939z" fill="#63434f" stroke="#4d3749" strokeWidth="6"/>
      <path d="M948 119h189v155H948z" fill="#935e51"/>
      <path d="M948 170h189v9H948zM948 222h189v9H948z" fill="#573a4a"/>
      <path d="M958 127h15v37h-15zM980 133h24v31h-24zM1011 123h17v41h-17zM1036 130h24v34h-24zM1067 124h18v40h-18zM1094 132h30v32h-30z" fill="#d45b74"/>
      <path d="M958 185h28v28h-28zM993 185h15v28h-15zM1016 188h28v25h-28zM1050 183h19v30h-19zM1078 187h47v26h-47z" fill="#e5c46b"/>
      <path d="M958 238h22v27h-22zM986 241h36v24h-36zM1030 237h16v28h-16zM1054 240h31v25h-31zM1092 235h30v30h-30z" fill="#7d9b74"/>
      <path d="M915 111h30v-19h18v19h22" fill="none" stroke="#739360" strokeWidth="9"/>
      <path d="M940 91h12v18h-12zM963 83h13v18h-13zM988 96h11v15h-11z" fill="#84a06d"/>

      <path d="M303 42h582" stroke="#493547" strokeWidth="4"/>
      <path d="M315 44l22 44 21-44 23 44 22-44 22 44 22-44 22 44 23-44 22 44 22-44 22 44 23-44 22 44 22-44 22 44 23-44 22 44 22-44" fill="#e9a9be" stroke="#69455a" strokeWidth="3"/>
      <path d="M56 31c190 22 321-20 525 7s377 15 566-1" fill="none" stroke="#48344b" strokeWidth="4"/>
      <path d="M59 37v-9h12v10h-4v8h-5v-8zM185 42v-8h11v9h-3v8h-5v-9zM331 38v-9h12v10h-4v9h-5v-10zM476 37v-8h11v9h-3v8h-5v-9zM622 39v-9h12v10h-4v8h-5v-9zM771 41v-8h11v9h-3v8h-5v-9zM923 38v-9h12v10h-4v8h-5v-9zM1076 35v-8h11v9h-3v8h-5v-9z" fill="#f4c85e" stroke="#78465b" strokeWidth="3"/>
      <path d="M523 77h162v58H523z" fill="#6c4351" stroke="#3e3045" strokeWidth="5"/>
      <path d="M531 85h146v42H531z" fill="#a65f55" stroke="#e8bd72" strokeWidth="3"/>
      <text x="604" y="111" textAnchor="middle" fill="#ffedc5" fontFamily="var(--font-title)" fontSize="17">JUNNY HQ</text>
      <path d="M545 118h118" stroke="#e7be6a" strokeWidth="2"/>
      <path d="M547 91h8v8h-8zM653 91h8v8h-8z" fill="#f3cf72"/>

      <path d="M33 310h263v32H33z" fill="#754a44" stroke="#513b47" strokeWidth="5"/>
      <path d="M46 255h237v55H46z" fill="#d39a71" stroke="#62464b" strokeWidth="5"/>
      <path d="M58 266h56v34H58zM125 267h61v33h-61zM198 265h72v35h-72z" fill="#fff0cd" stroke="#5f4652" strokeWidth="4"/>
      <path d="M63 294l17-17 15 13 13-10 6 8v9H63z" fill="#78a76d"/><circle cx="97" cy="275" r="5" fill="#f4c760"/>
      <path d="M135 278h39v4h-39zM135 287h43v4h-43z" fill="#8c6682"/><path d="M207 278h49v5h-49zM207 290h39v5h-39z" fill="#78a19d"/>
      <path d="M52 342v58h24v-58M248 342v58h24v-58" fill="#583e46"/>
      <path d="M296 286h63v63h-63z" fill="#efc984" stroke="#634a54" strokeWidth="5"/>
      <path d="M304 294h47v47h-47z" fill="#5c84a0"/><path d="M309 329h38v8h-38z" fill="#82ad72"/><path d="M315 326l9-12 9 8 6-7 9 11v4h-33z" fill="#8db978"/>
      <path d="M322 303h7v7h-7zM310 315h6v6h-6z" fill="#fff5d1"/>
      <path d="M320 352h16v5h-16zM310 360h36v4h-36z" fill="#554454"/>
      <path d="M103 247h24v10h-24zM108 238h14v10h-14zM101 232h10v10h-10z" fill="#83a571"/>
      <path d="M65 264v-7h5v-5h13v5h5v7M55 307h44v6H55z" fill="#493747" stroke="#493747" strokeWidth="3"/>
      <path d="M61 268h31v35H61z" fill="#704950" stroke="#493747" strokeWidth="4"/><path d="M67 274h19v22H67z" fill="#ffd76d"/><path d="M71 277h11v16H71z" fill="#fff0a6"/>
      <path d="M57 265h40v7H57zM63 302h27v5H63z" fill="#a96b50" stroke="#493747" strokeWidth="3"/>
      <path d="M72 280h3v9h-3zM78 278h3v11h-3z" fill="#fff7c8"/>

      <ellipse cx="610" cy="510" rx="380" ry="34" fill="#bd7180" stroke="#614553" strokeWidth="6"/>
      <ellipse cx="610" cy="510" rx="348" ry="22" fill="none" stroke="#e6a0a4" strokeWidth="4" strokeDasharray="12 10"/>

      <path d="M278 344h646v24H278z" fill="#855548" stroke="#533a48" strokeWidth="5"/>
      <path d="M302 367h598v74H302z" fill="#cd7b83" stroke="#614453" strokeWidth="5"/>
      <path d="M310 375h581v58H310z" fill="#efb7c1"/>
      <path d="M310 375h581v58H310z" fill="url(#birthday-checks)"/>
      <path d="M331 441h29v82h-29zM841 441h29v82h-29z" fill="#745047" stroke="#503c47" strokeWidth="4"/>
      <path d="M273 523h657v12H273z" fill="#e2a487" stroke="#604550" strokeWidth="4"/>
      <path d="M368 444h510v59H368z" fill="#b77b91" stroke="#644757" strokeWidth="5"/>
      <path d="M387 455h471v37H387z" fill="#d99aac"/>
      <path d="M410 475h20v-12h18v12h20v17h-58z" fill="#f0c5c2"/><path d="M728 463h12v12h-12zM781 476h10v10h-10z" fill="#f6dfad"/>
      <path d="M902 318h52v93h-52z" fill="#bd8f5e" stroke="#58434d" strokeWidth="4"/>
      <path d="M910 327h36v40h-36z" fill="#fff0ce" stroke="#624756" strokeWidth="3"/>
      <path d="M916 353h24v10h-24zM918 344h5v5h-5zM931 344h5v5h-5z" fill="#7a9b75"/>
      <path d="M911 379h34v20h-34z" fill="#7c5165"/><path d="M918 385h20v4h-20zM918 392h14v3h-14z" fill="#f4d583"/>
      <path d="M1030 358h126v38h-126z" fill="#8c6455" stroke="#57414c" strokeWidth="4"/>
      <path d="M1042 339h100v18h-100z" fill="#e8bc80" stroke="#57414c" strokeWidth="4"/>
      <path d="M1085 337h18v58h-18z" fill="#f4e0c0" stroke="#8e5d70" strokeWidth="3"/>
      <path d="M1081 321h12v13h-12zM1097 314h12v20h-12zM1113 321h11v13h-11z" fill="#78a16b"/>
      <path d="M47 410h81v14H47z" fill="#e6b39c"/><path d="M171 407h52v12h-52z" fill="#f1d081"/>
      <defs><pattern id="birthday-checks" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M0 0h12v12H0zM12 12h12v12H12z" fill="#d98c9f"/><path d="M12 0h12v12H12zM0 12h12v12H0z" fill="#f6c4ca"/></pattern></defs>
    </svg>

    <div className="birthday-scene-banner" aria-hidden="true"><span>✦</span> A VERY IMPORTANT BIRTHDAY <span>✦</span></div>
    <div className="birthday-game-keepsake" aria-hidden="true"><span className="birthday-game-icon">✚</span><small>THE RESCUE GAME</small></div>
    <div className="birthday-framed-portrait" aria-hidden="true"><img src={junnyProfile.portrait} alt="" draggable={false}/></div>
    <JunnyCharacter expression={expression} canAdvance={canAdvance} celebrating={celebrating} onContinue={onContinue}/>
    <svg className="birthday-table-front" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true" shapeRendering="crispEdges"><defs><pattern id="birthday-front-checks" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M0 0h12v12H0zM12 12h12v12H12z" fill="#d98c9f"/><path d="M12 0h12v12H12zM0 12h12v12H0z" fill="#f6c4ca"/></pattern></defs><path d="M302 367h598v74H302z" fill="#efb7c1" stroke="#614453" strokeWidth="6"/><path d="M310 375h581v58H310z" fill="url(#birthday-front-checks)"/><path d="M302 367h598v9H302z" fill="#ffe0ce"/><path d="M302 438h598v8H302z" fill="#9b625a"/></svg>
    <BirthdayCake candlesLit={candlesLit} cakeCut={cakeCut} smoke={smoke} actionLabel={cakeActionLabel} actionDisabled={cakeActionDisabled} onAction={onCakeAction}/>
    {showPresent && <button type="button" className="birthday-present" onClick={onOpenGift} aria-label="Open the birthday present Junny picked for Satwika" title="A present from Junny"><PresentArtwork/><span>FOR SATWIKA</span></button>}
    {celebrating && <div className="birthday-confetti" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i key={index} style={{ '--confetti-x': `${(index * 37 + 11) % 100}%`, '--confetti-delay': `${(index % 5) * 55}ms`, '--confetti-color': ['#f4c860', '#ec7d9e', '#fff0c1', '#86b4a0'][index % 4] } as CSSProperties}/>)}</div>}
    <span className="birthday-room-signature">JUNNY HQ · HAPPINESS DEPARTMENT</span>
  </section>
}
