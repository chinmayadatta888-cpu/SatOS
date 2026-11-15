import { useState, type CSSProperties, type KeyboardEvent } from 'react'
import { achievements, type Achievement, type AchievementBadge as BadgeKind } from '../../config/achievements'

function BadgeArtwork({ kind }: { kind: BadgeKind }) {
  const outline = { stroke: '#493a52', strokeWidth: 2, strokeLinejoin: 'round' as const, shapeRendering: 'crispEdges' as const }
  let art
  switch (kind) {
    case 'birthday': art = <><path d="M24 3l5 9 11 2-8 8 2 12-10-5-10 5 2-12-8-8 11-2z" fill="#ffdd78" {...outline} /><rect x="21" y="15" width="6" height="10" fill="#ef8297" /><rect x="22" y="12" width="2" height="4" fill="#fff4c4" /></>; break
    case 'heart': art = <><path d="M24 39L7 23V12h10l7 7 7-7h10v11z" fill="#ef8da8" {...outline} /><path d="M11 14h5l8 8 8-8h5v7L24 34 11 21z" fill="#ffe3e0" /></>; break
    case 'crown': art = <><path d="M7 13l9 7 8-13 8 13 9-7-3 22H10z" fill="#f6c85d" {...outline} /><rect x="11" y="30" width="26" height="4" fill="#fff0aa" /><rect x="6" y="10" width="4" height="4" fill="#ef8297" /><rect x="22" y="4" width="4" height="4" fill="#ef8297" /><rect x="38" y="10" width="4" height="4" fill="#ef8297" /></>; break
    case 'diamond': art = <><path d="M11 8h26l8 10-21 25L3 18z" fill="#8bd1d5" {...outline} /><path d="M11 8l5 10h16l5-10M16 18l8 25 8-25" fill="none" stroke="#f5ffff" strokeWidth="3" shapeRendering="crispEdges" /></>; break
    case 'sun': art = <><path d="M20 3h8v6h7v7h6v8h-6v7h-7v6h-8v-6h-7v-7H7v-8h6V9h7z" fill="#f5d36c" {...outline} /><rect x="18" y="16" width="4" height="4" fill="#fff7c8" /><rect x="27" y="16" width="4" height="4" fill="#fff7c8" /><path d="M18 26h12v3H18z" fill="#d77d69" /></>; break
    case 'moon': art = <><path d="M32 5v6h-5v6h-5v7h5v6h7v5h6v-6h4V16h-6v-6h-6z" fill="#bbc8ee" {...outline} /><rect x="28" y="18" width="3" height="3" fill="#fff6c7" /><rect x="16" y="11" width="3" height="3" fill="#fff6c7" /><rect x="12" y="29" width="3" height="3" fill="#fff6c7" /></>; break
    case 'bolt': art = <><path d="M26 3L10 25h11l-3 20 20-27H26z" fill="#ffbd69" {...outline} /><rect x="28" y="8" width="4" height="4" fill="#fff5c6" /></>; break
    case 'hearts': art = <><path d="M17 33L5 22V14h7l5 5 5-5h7v8z" fill="#f6a0ae" {...outline} /><path d="M32 27l-9-9v-6h6l3 3 3-3h6v6z" fill="#ef7190" {...outline} /><rect x="12" y="15" width="3" height="3" fill="#fff4d4" /></>; break
    case 'flower': art = <><rect x="21" y="22" width="6" height="19" fill="#72a66d" stroke="#493a52" strokeWidth="2" /><path d="M20 4h8v7h7v8h-7v7h-8v-7h-7v-8h7z" fill="#dc9dc4" {...outline} /><rect x="21" y="12" width="6" height="6" fill="#ffe483" stroke="#493a52" strokeWidth="2" /><rect x="17" y="30" width="6" height="3" fill="#8dba79" /></>; break
    case 'level': art = <><path d="M7 27h8v13H7zM20 18h8v22h-8zM33 7h8v33h-8z" fill="#91c786" {...outline} /><path d="M10 19l11-9 7 3 10-8" fill="none" stroke="#fff5c5" strokeWidth="4" /><path d="M33 5h7v7" fill="none" stroke="#fff5c5" strokeWidth="4" /></>; break
  }
  return <svg viewBox="0 0 48 48" className="achievement-badge-art" aria-hidden="true">{art}</svg>
}

function AchievementCard({ achievement, onOpen }: { achievement: Achievement; onOpen: () => void }) {
  return <button
    type="button"
    className="achievement-card"
    style={{ '--achievement-accent': achievement.color } as CSSProperties}
    onClick={onOpen}
    aria-label={`${achievement.code}: ${achievement.title}`}
  >
    <span className="achievement-badge"><BadgeArtwork kind={achievement.badge} /></span>
    <span className="achievement-copy">
      <span className="achievement-code">{achievement.code}</span>
      <strong className="achievement-title">{achievement.title}</strong>
      <span className="achievement-description">{achievement.description}</span>
      <span className="achievement-reward"><span aria-hidden="true">✦</span> {achievement.reward}</span>
    </span>
    <span className="achievement-corner" aria-hidden="true">✓</span>
  </button>
}

function AchievementDetail({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
  return <div className="achievement-detail-shade" onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="achievement-detail" role="dialog" aria-modal="true" aria-labelledby="achievement-detail-title" style={{ '--achievement-accent': achievement.color } as CSSProperties}>
      <button type="button" className="achievement-detail-close" aria-label="Close achievement details" onClick={onClose}>×</button>
      <span className="achievement-detail-badge"><BadgeArtwork kind={achievement.badge} /></span>
      <span className="achievement-code">{achievement.code}</span>
      <h2 id="achievement-detail-title">{achievement.title}</h2>
      <p>{achievement.description}</p>
      <div className="achievement-detail-reward"><small>REWARD</small><strong>{achievement.reward}</strong></div>
      {achievement.unlockDate && <time>Logged {achievement.unlockDate}</time>}
      <span className="achievement-unlocked-stamp">UNLOCKED</span>
    </section>
  </div>
}

export default function AchievementsApp() {
  const [selected, setSelected] = useState<Achievement | null>(null)
  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && selected) setSelected(null)
  }

  const unlockedCount = achievements.length
  return <section className="achievements-app" aria-label="Satwika achievements" onKeyDown={handleKeyDown}>
    <header className="achievements-heading">
      <div className="achievement-heading-mark" aria-hidden="true"><BadgeArtwork kind="crown" /></div>
      <div className="achievement-heading-copy"><span>THE LITTLE HALL OF FAME</span><h1>SATWIKA'S ACHIEVEMENTS</h1><p>A collection of extraordinary accomplishments.</p></div>
      <div className="achievement-count"><strong>{unlockedCount}</strong><span>achievements<br />unlocked</span></div>
    </header>
    <div className="achievements-scroll"><div className="achievement-grid">
      {achievements.map((achievement) => <AchievementCard key={achievement.id} achievement={achievement} onOpen={() => setSelected(achievement)} />)}
    </div></div>
    <footer className="achievements-footer"><span>✦</span><span>ALL BADGES EARNED WITH LOVE</span><span>{unlockedCount} / {unlockedCount}</span></footer>
    {selected && <AchievementDetail achievement={selected} onClose={() => setSelected(null)} />}
  </section>
}
