import { useEffect } from 'react'
import { birthdayGiftLetter } from '../../config/junny/birthdayGift'

type Props = { onClose: () => void; onReplay: () => void }

export default function BirthdayGiftReveal({ onClose, onReplay }: Props) {
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return <div className="birthday-gift-backdrop" onPointerDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="birthday-gift-letter" role="dialog" aria-modal="true" aria-labelledby="birthday-gift-title">
      <header><span aria-hidden="true">✿</span><div><small>A LITTLE PRESENT FROM JUNNY</small><h2 id="birthday-gift-title">A letter for Satwika</h2></div><button type="button" onClick={onClose} aria-label="Close letter">×</button></header>
      <div className="birthday-letter-paper"><pre>{birthdayGiftLetter}</pre><span className="birthday-letter-stamp" aria-hidden="true">♡</span></div>
      <footer><button type="button" onClick={onClose}>Keep this close</button><button type="button" onClick={onReplay}>Replay the birthday from the beginning ↺</button></footer>
    </section>
  </div>
}
