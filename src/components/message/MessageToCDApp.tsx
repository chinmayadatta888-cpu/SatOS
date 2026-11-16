import { useState, type ChangeEvent, type FormEvent } from 'react'
import { supabaseConfigIssue, supabaseConfigState } from '../../config/supabase'
import { getMessageStorageMode, MessageSubmissionError, submitMessage, type MessageReceipt } from '../../services/messageService'

const MAX_MESSAGE_LENGTH = 2000

function getStorageNotice(): string {
  if (supabaseConfigState === 'ready') {
    return 'REMOTE READY · Settings are present; a successful save confirms Supabase delivery.'
  }

  switch (supabaseConfigIssue) {
    case 'missing-url-and-key':
      return 'DEMO MODE · This build is missing VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    case 'missing-url':
      return 'DEMO MODE · This build is missing VITE_SUPABASE_URL.'
    case 'missing-key':
      return 'DEMO MODE · This build is missing VITE_SUPABASE_ANON_KEY.'
    case 'invalid-url':
      return 'DEMO MODE · VITE_SUPABASE_URL is not a valid URL.'
    case 'https-required':
      return 'DEMO MODE · VITE_SUPABASE_URL must use HTTPS.'
    case 'initialization-failed':
      return 'DEMO MODE · Supabase could not initialize. Check the URL and public key formatting.'
    default:
      return 'DEMO MODE · Messages are saved on this device only.'
  }
}

function getSubmissionErrorMessage(cause: unknown): string {
  if (!(cause instanceof MessageSubmissionError)) {
    return 'SEND FAILED · Your writing is still here. Please try again.'
  }

  switch (cause.failure) {
    case 'network':
      return 'REMOTE SEND FAILED · Could not reach Supabase. Check the connection and Project URL; your draft is preserved.'
    case 'credentials':
      return 'REMOTE SEND FAILED · Supabase rejected the project URL/key pair. Check they belong to the same project; your draft is preserved.'
    case 'permission':
      return 'REMOTE SEND FAILED · The database denied this insert. Check its INSERT grant and RLS policy; your draft is preserved.'
    case 'schema':
      return 'REMOTE SEND FAILED · The expected message table/schema was not found. Check the migration; your draft is preserved.'
    default:
      return 'REMOTE SEND FAILED · Supabase returned an error. Your draft is preserved; check the project logs.'
  }
}

function LetterEnvelope({ delivered = false }: { delivered?: boolean }) {
  return <svg className={`message-envelope-art${delivered ? ' is-delivered' : ''}`} viewBox="0 0 116 92" aria-hidden="true" shapeRendering="crispEdges">
    <rect x="16" y="23" width="84" height="54" fill="#73586c" />
    <rect x="12" y="18" width="84" height="54" fill="#fff2d5" stroke="#4c4057" strokeWidth="4" />
    <rect x="24" y="27" width="48" height="4" fill="#d6c49f" />
    <rect x="24" y="37" width="58" height="4" fill="#d6c49f" />
    <rect x="24" y="47" width="42" height="4" fill="#d6c49f" />
    <path d="M14 22l40 30 40-30v47H14z" fill="#e69da7" stroke="#4c4057" strokeWidth="4" />
    <path d="M16 69l28-22 10 8 10-8 28 22v1H16z" fill="#f2b2ad" />
    <path d="M51 49l-8-8v-7h6l4 4 4-4h6v7l-8 8z" fill="#ffe7a0" stroke="#4c4057" strokeWidth="2" />
    <rect x="8" y="74" width="92" height="5" fill="#54465d" />
    {delivered && <><rect className="message-spark message-spark-one" x="5" y="10" width="7" height="7" fill="#f0c75f"/><rect className="message-spark message-spark-two" x="100" y="12" width="6" height="6" fill="#cf7e91"/><rect className="message-spark message-spark-three" x="100" y="64" width="7" height="7" fill="#82b89b"/></>}
  </svg>
}

export default function MessageToCDApp() {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [receipt, setReceipt] = useState<MessageReceipt | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const storageMode = getMessageStorageMode()
  const characterCount = Array.from(message).length
  const hasContent = Boolean(message.trim())

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value
    const characters = Array.from(value)
    setMessage(characters.length > MAX_MESSAGE_LENGTH ? characters.slice(0, MAX_MESSAGE_LENGTH).join('') : value)
    if (error) setError('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!hasContent || sending) return
    setSending(true)
    setError('')
    try {
      const storedMessage = await submitMessage(message)
      setReceipt(storedMessage)
      setShowSuccess(true)
    } catch (cause) {
      setError(getSubmissionErrorMessage(cause))
    } finally {
      setSending(false)
    }
  }

  function writeAnother() {
    setMessage('')
    setError('')
    setReceipt(null)
    setShowSuccess(false)
  }

  if (showSuccess && receipt) return <section className="message-app message-success-view" aria-label="Message delivery status">
    <div className="message-success-paper">
      <span className="message-postmark">A LITTLE LETTER, ON ITS WAY</span>
      <LetterEnvelope delivered />
      <span className={`message-storage-ribbon ${receipt.storage === 'demo' ? 'is-demo' : 'is-remote'}`}>
        {receipt.storage === 'demo' ? 'DEMO COPY · THIS DEVICE ONLY' : 'SAVED SECURELY · SUPABASE'}
      </span>
      <h1>{receipt.storage === 'demo' ? 'Message saved for this demo!' : 'Message successfully delivered!'}</h1>
      <p>{receipt.storage === 'demo' ? "It's safe on this device, but hasn't been sent to CD yet." : 'Your little message has found its way to CD.'}</p>
      <small>{new Date(receipt.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</small>
      <button type="button" className="message-another-button" onClick={writeAnother}>Write another message</button>
      {receipt.storage === 'demo' && <span className="message-demo-reminder">Add Supabase settings to deliver messages across devices.</span>}
    </div>
    <footer className="message-app-footer"><span>SEALED WITH CARE</span><span>✦</span><span>MESSAGE TO CD</span></footer>
  </section>

  return <section className="message-app" aria-label="Write a message to CD">
    <header className="message-heading">
      <div className="message-envelope-mark"><LetterEnvelope /></div>
      <div className="message-heading-copy"><span className="message-eyebrow">A PERSONAL LITTLE POST OFFICE</span><h1>Leave a little something behind.</h1><p>Anything you'd like to tell me? This little corner of the internet is yours.</p></div>
      <span className="message-heart-stamp" aria-hidden="true">♡</span>
    </header>

    <div className={`message-storage-notice ${storageMode === 'demo' ? 'is-demo' : 'is-remote'}`} role="status">
      <span className="message-storage-light" aria-hidden="true" />
      {getStorageNotice()}
    </div>

    <form className="message-compose-form" onSubmit={handleSubmit}>
      <div className="message-editor-label"><label htmlFor="message-to-cd-text">Your letter</label><span>PRIVATE LITTLE NOTE</span></div>
      <textarea
        id="message-to-cd-text"
        value={message}
        onChange={handleChange}
        maxLength={MAX_MESSAGE_LENGTH * 2}
        disabled={sending}
        placeholder="Anything you'd like to tell me... no restrictions, no particular topic. Just write."
        aria-describedby="message-character-counter message-editor-hint"
      />
      <div className="message-editor-bottom"><span id="message-editor-hint">Your words are kept just as you write them.</span><span id="message-character-counter" className={characterCount >= MAX_MESSAGE_LENGTH ? 'is-at-limit' : ''}>{characterCount} / {MAX_MESSAGE_LENGTH}</span></div>
      {error && <p className="message-submit-error" role="alert">{error}</p>}
      <div className="message-submit-row">
        <span className="message-footer-note"><span aria-hidden="true">✦</span> No name or account needed.</span>
        <button type="submit" className="message-send-button" disabled={!hasContent || sending}>
          {sending ? <><span className="message-sending-pixels" aria-hidden="true"><i /><i /><i /></span> Sending…</> : error ? 'Try Sending Again' : 'Send Message'}
        </button>
      </div>
      {sending && <div className="message-sending-line" role="status">{storageMode === 'demo' ? 'Saving your demo message…' : 'Waiting for the private inbox to confirm…'}</div>}
    </form>

    <footer className="message-app-footer"><span>MADE OF PIXELS & KIND WORDS</span><span>♡</span><span>MESSAGE TO CD</span></footer>
  </section>
}
