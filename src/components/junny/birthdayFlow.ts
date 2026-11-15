import { birthdayDialogue, type BirthdayPhase } from '../../config/junny/birthdayDialogue'

export type BirthdayFlow = {
  phase: BirthdayPhase
  lineIndex: number
  candlesLit: boolean
  wishMade: boolean
  cakeCut: boolean
  giftOpened: boolean
  giftDialogOpen: boolean
}

export type BirthdayFlowAction = 'continue' | 'light-candles' | 'make-wish' | 'blow-candles' | 'cut-cake' | 'open-gift' | 'close-gift' | 'replay'

export function createBirthdayFlow(): BirthdayFlow {
  return { phase: 'welcome', lineIndex: 0, candlesLit: false, wishMade: false, cakeCut: false, giftOpened: false, giftDialogOpen: false }
}

function moveTo(state: BirthdayFlow, phase: BirthdayPhase): BirthdayFlow {
  return { ...state, phase, lineIndex: 0 }
}

export function canContinueBirthdayFlow(state: BirthdayFlow): boolean {
  if (state.phase === 'light-candles' || state.phase === 'blow-candles' || state.phase === 'cut-cake' || state.phase === 'gift-wait' || state.phase === 'complete') return false
  const lastLine = birthdayDialogue[state.phase].length - 1
  return state.lineIndex < lastLine || state.phase !== 'make-wish'
}

export function advanceBirthdayFlow(state: BirthdayFlow, action: BirthdayFlowAction): BirthdayFlow {
  if (action === 'replay') return createBirthdayFlow()
  if (action === 'close-gift') return state.giftDialogOpen ? { ...state, giftDialogOpen: false } : state
  if (action === 'open-gift') {
    if (state.phase !== 'gift-wait' && state.phase !== 'complete') return state
    return { ...state, phase: 'complete', lineIndex: 0, giftOpened: true, giftDialogOpen: true }
  }
  if (action === 'light-candles') {
    if (state.phase !== 'light-candles' || state.candlesLit) return state
    return { ...state, candlesLit: true, phase: 'after-light', lineIndex: 0 }
  }
  if (action === 'make-wish') {
    const lastLine = birthdayDialogue[state.phase].length - 1
    if (state.phase !== 'make-wish' || state.lineIndex !== lastLine) return state
    return { ...state, wishMade: true, phase: 'blow-candles', lineIndex: 0 }
  }
  if (action === 'blow-candles') {
    if (state.phase !== 'blow-candles' || !state.candlesLit || !state.wishMade) return state
    return { ...state, candlesLit: false, phase: 'after-blow', lineIndex: 0 }
  }
  if (action === 'cut-cake') {
    if (state.phase !== 'cut-cake' || state.cakeCut) return state
    return { ...state, cakeCut: true, phase: 'after-cut', lineIndex: 0 }
  }
  if (action !== 'continue' || !canContinueBirthdayFlow(state)) return state

  const lastLine = birthdayDialogue[state.phase].length - 1
  if (state.lineIndex < lastLine) return { ...state, lineIndex: state.lineIndex + 1 }
  switch (state.phase) {
    case 'welcome': return moveTo(state, 'rescue-memory')
    case 'rescue-memory': return moveTo(state, 'cake-intro')
    case 'cake-intro': return moveTo(state, 'light-candles')
    case 'after-light': return moveTo(state, 'make-wish')
    case 'after-blow': return moveTo(state, 'cut-cake')
    case 'after-cut': return moveTo(state, 'hidden-message')
    case 'hidden-message': return moveTo(state, 'gift-intro')
    case 'gift-intro': return moveTo(state, 'gift-wait')
    default: return state
  }
}
