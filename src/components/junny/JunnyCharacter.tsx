import type { BirthdayExpression } from '../../config/junny/birthdayDialogue'
import { junnyProfile } from '../../config/junny/profile'

type Props = {
  expression: BirthdayExpression
  canAdvance: boolean
  celebrating: boolean
  onContinue: () => void
}

const marks: Record<BirthdayExpression, string[]> = {
  welcoming: ['✦', '♡', '✦'],
  thoughtful: ['…'],
  proud: ['✧', '★'],
  encouraging: ['✦', '›'],
  gentle: ['♡'],
  celebrating: ['✦', '♥', '✦'],
  playful: ['♪', '✿'],
  anticipation: ['✧', '?', '✧'],
  affectionate: ['♥', '♡', '♥'],
}

const descriptions: Record<BirthdayExpression, string> = {
  welcoming: 'Junny is welcoming Satwika',
  thoughtful: 'Junny is remembering the rescue game',
  proud: 'Junny is proud of the birthday cake',
  encouraging: 'Junny is encouraging Satwika',
  gentle: 'Junny is being gentle and patient',
  celebrating: 'Junny is celebrating',
  playful: 'Junny is being playful',
  anticipation: 'Junny is excited about the present',
  affectionate: 'Junny is sending Satwika a warm birthday wish',
}

export default function JunnyCharacter({ expression, canAdvance, celebrating, onContinue }: Props) {
  const continueLabel = canAdvance ? "Continue Junny's birthday story" : 'Listen to Junny'
  return <div className={`birthday-junny birthday-junny-${expression}${celebrating ? ' is-celebrating' : ''}`}>
    <span className="birthday-sr-only" aria-live="polite">{descriptions[expression]}</span>
    <button type="button" className="birthday-junny-portrait" onClick={onContinue} disabled={!canAdvance} aria-label={continueLabel} title={canAdvance ? 'Click Junny to continue' : 'Junny is waiting for the birthday surprise'}>
      <img src={junnyProfile.portrait} alt="" draggable={false}/>
    </button>
    <button type="button" className="birthday-junny-nose" onClick={onContinue} disabled={!canAdvance} aria-label={continueLabel} title={canAdvance ? 'Continue the birthday story' : 'Junny is waiting for the next birthday step'}>
      <span className="birthday-sr-only">{continueLabel}</span>
    </button>
    {expression === 'thoughtful' && <span className="birthday-junny-thought" aria-hidden="true"><i>…</i><b/><b/></span>}
    <span className={`birthday-junny-mood-marks mood-${expression}`} aria-hidden="true">{marks[expression].map((mark, index) => <i key={`${mark}-${index}`}>{mark}</i>)}</span>
    {celebrating && <span className="birthday-junny-sparkles" aria-hidden="true"><i>✦</i><i>♥</i><i>✦</i></span>}
  </div>
}
