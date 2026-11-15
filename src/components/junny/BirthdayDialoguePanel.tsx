import { birthdayHiddenMessage } from '../../config/junny/birthdayGift'
import { birthdayDialogue, type BirthdayLine } from '../../config/junny/birthdayDialogue'
import { junnyProfile } from '../../config/junny/profile'
import type { BirthdayFlow } from './birthdayFlow'

type Props = { flow: BirthdayFlow; line: BirthdayLine; onAction: () => void }

function actionCopy(flow: BirthdayFlow) {
  switch (flow.phase) {
    case 'light-candles': return 'Light the candles'
    case 'make-wish': return flow.lineIndex === birthdayDialogue['make-wish'].length - 1 ? 'I made my wish' : 'Continue'
    case 'blow-candles': return 'Blow out the candles'
    case 'cut-cake': return 'Cut the cake'
    case 'gift-wait': return 'Open the present'
    case 'complete': return 'Replay the birthday'
    default: return 'Continue'
  }
}

export default function BirthdayDialoguePanel({ flow, line, onAction, disabled = false }: Props & { disabled?: boolean }) {
  const phaseIndex = Object.keys(birthdayDialogue).indexOf(flow.phase)
  const total = Object.keys(birthdayDialogue).length - 1
  return <section className={`birthday-dialogue-panel birthday-dialogue-${line.expression}`} aria-label="Junny's birthday story">
    <div className="birthday-dialogue-portrait" aria-hidden="true"><img src={junnyProfile.portrait} alt="" draggable={false}/></div>
    <div className="birthday-dialogue-copy" aria-live="polite" aria-atomic="true">
      <div className="birthday-dialogue-heading"><strong>Junny <span aria-hidden="true">♡</span></strong><small>YOUR CHIEF HAPPINESS OFFICER</small></div>
      <p key={`${flow.phase}-${flow.lineIndex}`}>{line.text}</p>
      {flow.phase === 'hidden-message' && <blockquote className="birthday-hidden-message">{birthdayHiddenMessage}</blockquote>}
    </div>
    <div className="birthday-dialogue-actions">
      <span className="birthday-story-progress">{Math.min(phaseIndex + 1, total)} <i>/</i> {total}</span>
      <button type="button" className={flow.phase === 'complete' ? 'birthday-replay-button' : ''} onClick={onAction} disabled={disabled}>{actionCopy(flow)} <span aria-hidden="true">{flow.phase === 'complete' ? '↺' : '›'}</span></button>
    </div>
  </section>
}
