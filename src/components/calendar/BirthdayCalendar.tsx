import { useMemo, useState } from 'react'

function PixelArrow({ direction }: { direction: 'left' | 'right' }) {
  const path = direction === 'left'
    ? 'M8 1H6v2H4v2H2v2H0v2h2v2h2v2h2v2h2v-4h4V5H8z'
    : 'M4 1h2v2h2v2h2v2h2v2h-2v2H8v2H6v2H4v-4H0V5h4z'
  return <svg className="pixel-arrow" viewBox="0 0 12 16" aria-hidden="true" shapeRendering="crispEdges"><path d={path} fill="currentColor" /></svg>
}

function PixelCake() {
  return <svg className="calendar-cake-icon" viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges">
    <rect x="4" y="0" width="2" height="4" fill="#e58b73"/><rect x="10" y="0" width="2" height="4" fill="#e58b73"/>
    <rect x="3" y="4" width="10" height="3" fill="#fff0b9"/><rect x="2" y="7" width="12" height="2" fill="#f2a6ae"/>
    <rect x="3" y="9" width="10" height="5" fill="#d98a6d"/><rect x="1" y="14" width="14" height="2" fill="#61465c"/>
  </svg>
}

export default function BirthdayCalendar({ today }: { today: Date }) {
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [selected, setSelected] = useState(() => new Date(today.getFullYear(), today.getMonth(), today.getDate()))
  const days = useMemo(() => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    const cells: (number | null)[] = Array(firstDay).fill(null)
    for (let day = 1; day <= count; day += 1) cells.push(day)
    while (cells.length < 42) cells.push(null)
    return cells
  }, [month])

  const birthdaySelected = selected.getMonth() === 10 && selected.getDate() === 16
  const todayMatches = (day: number) => day === today.getDate() && month.getMonth() === today.getMonth() && month.getFullYear() === today.getFullYear()

  function changeMonth(delta: number) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1))
  }

  return (
    <section className="calendar-popover" aria-label="Calendar">
      <header className="calendar-heading">
        <button type="button" className="calendar-nav" aria-label="Previous month" onClick={() => changeMonth(-1)}><PixelArrow direction="left" /></button>
        <div><strong>{month.toLocaleDateString(undefined, { month: 'long' })}</strong><span>{month.getFullYear()}</span></div>
        <button type="button" className="calendar-nav" aria-label="Next month" onClick={() => changeMonth(1)}><PixelArrow direction="right" /></button>
      </header>
      <div className="calendar-grid calendar-weekdays">{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div>
      <div className="calendar-grid calendar-days">
        {days.map((day, index) => {
          if (day === null) return <span className="calendar-empty" key={`empty-${index}`} />
          const birthday = month.getMonth() === 10 && day === 16
          const current = todayMatches(day)
          const active = selected.getDate() === day && selected.getMonth() === month.getMonth() && selected.getFullYear() === month.getFullYear()
          return <button key={day} type="button" className={`calendar-day${current ? ' is-today' : ''}${active ? ' is-active' : ''}${birthday ? ' is-birthday' : ''}`} aria-label={birthday ? `November ${day}, birthday` : `${month.toLocaleDateString(undefined, { month: 'long' })} ${day}`} onClick={() => setSelected(new Date(month.getFullYear(), month.getMonth(), day))}>
            {day}{birthday && <PixelCake />}
          </button>
        })}
      </div>
      <footer className={`calendar-note${birthdaySelected ? ' birthday-note' : ''}`}>
        {birthdaySelected ? <><span className="tiny-heart">♥</span> Today is the day <span className="tiny-heart">♥</span></> : <><span className="calendar-dot" /> {today.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</>}
      </footer>
    </section>
  )
}
