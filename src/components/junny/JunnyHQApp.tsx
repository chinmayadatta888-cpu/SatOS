import { useEffect, useRef, useState } from 'react'
import { birthdayDialogue } from '../../config/junny/birthdayDialogue'
import { advanceBirthdayFlow, canContinueBirthdayFlow, createBirthdayFlow, type BirthdayFlow, type BirthdayFlowAction } from './birthdayFlow'
import { useLocalTime } from '../../hooks/useLocalTime'
import BirthdayDialoguePanel from './BirthdayDialoguePanel'
import BirthdayGiftReveal from './BirthdayGiftReveal'
import BirthdayRoomScene from './BirthdayRoomScene'
import JunnyProfilePage from './JunnyProfilePage'
import JunnyScrapbook from './JunnyScrapbook'
import './junny.css'

type Tab = 'home' | 'scrapbook' | 'profile'

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'scrapbook', label: 'Scrapbook', icon: '▧' },
  { id: 'profile', label: 'Profile', icon: '▣' },
]

function getRoomLight(nightAmount: number): 'day' | 'evening' | 'night' {
  if (nightAmount >= 0.72) return 'night'
  if (nightAmount >= 0.22) return 'evening'
  return 'day'
}

export default function JunnyHQApp() {
  const { nightAmount } = useLocalTime()
  const light = getRoomLight(nightAmount)
  const [tab, setTab] = useState<Tab>('home')
  const [flow, setFlow] = useState<BirthdayFlow>(createBirthdayFlow)
  const [celebrating, setCelebrating] = useState(false)
  const [smoke, setSmoke] = useState(false)
  const [storyInputLocked, setStoryInputLocked] = useState(false)
  const celebrationTimer = useRef<number | undefined>()
  const smokeTimer = useRef<number | undefined>()
  const storyInputTimer = useRef<number | undefined>()
  const storyInputLock = useRef(false)
  const currentLine = birthdayDialogue[flow.phase][flow.lineIndex]
  const canAdvance = canContinueBirthdayFlow(flow)
  const roomActionLabel = flow.phase === 'light-candles' ? 'Light the candles' : flow.phase === 'blow-candles' ? 'Blow out the candles' : flow.phase === 'cut-cake' ? 'Cut the cake' : undefined

  useEffect(() => () => {
    window.clearTimeout(celebrationTimer.current)
    window.clearTimeout(smokeTimer.current)
    window.clearTimeout(storyInputTimer.current)
  }, [])

  function send(action: BirthdayFlowAction) {
    setFlow((current) => advanceBirthdayFlow(current, action))
  }

  function beginStoryInput() {
    if (storyInputLock.current) return false
    storyInputLock.current = true
    setStoryInputLocked(true)
    storyInputTimer.current = window.setTimeout(() => {
      storyInputLock.current = false
      setStoryInputLocked(false)
    }, 400)
    return true
  }

  function blowCandles() {
    setFlow((current) => advanceBirthdayFlow(current, 'blow-candles'))
    setCelebrating(true)
    setSmoke(true)
    window.clearTimeout(celebrationTimer.current)
    window.clearTimeout(smokeTimer.current)
    celebrationTimer.current = window.setTimeout(() => setCelebrating(false), 1150)
    smokeTimer.current = window.setTimeout(() => setSmoke(false), 1400)
  }

  function replayBirthday() {
    window.clearTimeout(celebrationTimer.current)
    window.clearTimeout(smokeTimer.current)
    window.clearTimeout(storyInputTimer.current)
    storyInputLock.current = false
    setCelebrating(false)
    setSmoke(false)
    setStoryInputLocked(false)
    setTab('home')
    send('replay')
  }

  function handleStoryAction() {
    if (flow.phase === 'complete') {
      replayBirthday()
      return
    }
    if (!beginStoryInput()) return
    switch (flow.phase) {
      case 'light-candles': send('light-candles'); break
      case 'make-wish': send(canAdvance ? 'continue' : 'make-wish'); break
      case 'blow-candles': blowCandles(); break
      case 'cut-cake': send('cut-cake'); break
      case 'gift-wait': send('open-gift'); break
      default: send('continue')
    }
  }

  function handleCakeAction() {
    if (!['light-candles', 'blow-candles', 'cut-cake'].includes(flow.phase) || !beginStoryInput()) return
    if (flow.phase === 'light-candles') send('light-candles')
    else if (flow.phase === 'blow-candles') blowCandles()
    else if (flow.phase === 'cut-cake') send('cut-cake')
  }

  function handleOpenGift() {
    if (beginStoryInput()) send('open-gift')
  }

  const openedPresent = flow.phase === 'gift-wait' || flow.giftOpened

  return <section className="junny-hq-app" aria-label="Junny HQ birthday surprise">
    <header className="junny-topbar">
      <div className="junny-topbar-brand"><span aria-hidden="true">✿</span><strong>Junny HQ</strong></div>
      <span className="junny-topbar-location">CHIEF HAPPINESS OFFICER · FACE OF SATWIKA OS</span>
    </header>

    <nav className="junny-main-nav" aria-label="Junny HQ sections">
      <div className="junny-nav-profile"><span aria-hidden="true">J</span><span><strong>JUNNY HQ</strong><small>YOUR BIRTHDAY CELEBRATION</small></span></div>
      <div className="junny-nav-tabs">{tabs.map((item) => <button key={item.id} type="button" className={tab === item.id ? 'is-active' : ''} aria-current={tab === item.id ? 'page' : undefined} onClick={() => setTab(item.id)}><span aria-hidden="true">{item.icon}</span>{item.label}</button>)}</div>
    </nav>

    <main className="junny-app-main">
      {tab === 'home' && <section className="junny-home-view" aria-label="Birthday room">
        <BirthdayRoomScene
          light={light}
          phase={flow.phase}
          expression={currentLine.expression}
          canAdvance={canAdvance && !storyInputLocked}
          candlesLit={flow.candlesLit}
          cakeCut={flow.cakeCut}
          smoke={smoke}
          cakeActionLabel={roomActionLabel}
          cakeActionDisabled={storyInputLocked}
          showPresent={openedPresent}
          celebrating={celebrating}
          onContinue={handleStoryAction}
          onCakeAction={handleCakeAction}
          onOpenGift={handleOpenGift}
        />
        <BirthdayDialoguePanel flow={flow} line={currentLine} onAction={handleStoryAction} disabled={storyInputLocked}/>
      </section>}
      {tab === 'scrapbook' && <JunnyScrapbook onBack={() => setTab('home')}/>}
      {tab === 'profile' && <JunnyProfilePage/>}
    </main>

    <footer className="junny-statusbar"><span>JUNNY ONLINE <b aria-hidden="true">♡</b></span><span><b aria-hidden="true">♥</b> Happiness Level: 100%</span><span>✿ &nbsp;Birthday Mode: ON</span></footer>
    {flow.giftDialogOpen && <BirthdayGiftReveal onClose={() => send('close-gift')} onReplay={replayBirthday}/>}
  </section>
}
