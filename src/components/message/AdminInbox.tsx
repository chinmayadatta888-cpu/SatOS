import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabaseConfigState } from '../../config/supabase'
import { checkOwnerAccess, deleteOwnerMessage, getAdminSession, listOwnerMessages, setOwnerMessageRead, signInOwner, signOutOwner, subscribeToAdminAuth, type OwnerMessage } from '../../services/adminMessageService'

type InboxState = 'loading' | 'signed-out' | 'checking-owner' | 'owner' | 'denied' | 'failed'

export default function AdminInbox() {
  const [session, setSession] = useState<Session | null>(null)
  const [inboxState, setInboxState] = useState<InboxState>('loading')
  const [messages, setMessages] = useState<OwnerMessage[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [busyMessageId, setBusyMessageId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [authLoaded, setAuthLoaded] = useState(false)
  const accessRequest = useRef(0)

  useEffect(() => {
    if (supabaseConfigState !== 'ready') { setInboxState('signed-out'); setAuthLoaded(true); return }
    let mounted = true
    let unsubscribe: (() => void) | undefined
    try {
      unsubscribe = subscribeToAdminAuth((nextSession) => {
        if (mounted) { setSession(nextSession); setAuthLoaded(true) }
      })
    } catch (cause) {
      if (mounted) { setError(cause instanceof Error ? cause.message : 'Authentication is unavailable.'); setInboxState('failed') }
    }
    getAdminSession().then((savedSession) => {
      if (mounted) { setSession(savedSession); setAuthLoaded(true) }
    }).catch(() => {
      if (mounted) { setError('Could not check the saved sign-in. Please reload and try again.'); setInboxState('failed'); setAuthLoaded(true) }
    })
    return () => { mounted = false; unsubscribe?.() }
  }, [])

  useEffect(() => {
    if (!authLoaded) return
    const request = ++accessRequest.current
    if (!session) {
      setMessages([])
      setSelectedId(null)
      setInboxState('signed-out')
      return
    }
    setInboxState('checking-owner')
    setError('')
    checkOwnerAccess().then(async (isOwner) => {
      if (request !== accessRequest.current) return
      if (!isOwner) { setInboxState('denied'); setMessages([]); return }
      const initialMessages = await listOwnerMessages()
      if (request !== accessRequest.current) return
      setMessages(initialMessages)
      setSelectedId(initialMessages[0]?.id ?? null)
      setInboxState('owner')
    }).catch(() => {
      if (request !== accessRequest.current) return
      setInboxState('failed')
      setError('Could not verify owner access or load the inbox. Check the database migration and owner setup, then retry.')
    })
    return () => { accessRequest.current += 1 }
  }, [authLoaded, session?.user.id])

  const selectedMessage = messages.find((item) => item.id === selectedId) ?? null

  async function submitSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    try {
      const signedInSession = await signInOwner(email.trim(), password)
      setPassword('')
      setSession(signedInSession)
    } catch {
      setError('Sign-in failed. Check the owner email and password, then try again.')
    } finally { setBusy(false) }
  }

  async function refreshInbox() {
    if ((inboxState !== 'owner' && inboxState !== 'failed') || busy) return
    setBusy(true)
    setError('')
    try {
      if (!session) {
        const savedSession = await getAdminSession()
        setSession(savedSession)
        if (!savedSession) { setInboxState('signed-out'); return }
      }
      if (inboxState === 'failed') {
        const isOwner = await checkOwnerAccess()
        if (!isOwner) { setMessages([]); setInboxState('denied'); return }
        setInboxState('owner')
      }
      const freshMessages = await listOwnerMessages()
      setMessages(freshMessages)
      setSelectedId((current) => current && freshMessages.some((item) => item.id === current) ? current : freshMessages[0]?.id ?? null)
    } catch {
      setError('The inbox could not be refreshed. Your current list is still shown.')
    } finally { setBusy(false) }
  }

  async function toggleRead(message: OwnerMessage) {
    setBusyMessageId(message.id)
    setError('')
    try {
      await setOwnerMessageRead(message.id, !message.is_read)
      setMessages((current) => current.map((item) => item.id === message.id ? { ...item, is_read: !message.is_read } : item))
    } catch {
      setError('That message could not be updated. Check your owner access and try again.')
    } finally { setBusyMessageId(null) }
  }

  async function removeMessage(message: OwnerMessage) {
    if (!window.confirm('Permanently delete this message? This cannot be undone.')) return
    setBusyMessageId(message.id)
    setError('')
    try {
      await deleteOwnerMessage(message.id)
      const remaining = messages.filter((item) => item.id !== message.id)
      setMessages(remaining)
      setSelectedId(remaining[0]?.id ?? null)
    } catch {
      setError('That message could not be deleted. Check your owner access and try again.')
    } finally { setBusyMessageId(null) }
  }

  async function handleSignOut() {
    setBusy(true)
    setError('')
    try {
      await signOutOwner()
      setSession(null)
      setInboxState('signed-out')
    } catch {
      setError('Sign-out did not finish. Please try again.')
    } finally { setBusy(false) }
  }

  return <main className="admin-inbox-shell">
    <header className="admin-inbox-header"><a className="admin-brand" href="/" aria-label="Return to Satwika OS"><span className="admin-brand-mark" aria-hidden="true">✉</span><span>SATWIKA OS <small>PRIVATE MAILROOM</small></span></a>
      {inboxState === 'owner' && <div className="admin-account"><span>{session?.user.email}</span><button type="button" onClick={handleSignOut} disabled={busy}>Sign out</button></div>}
    </header>

    {supabaseConfigState !== 'ready' ? <section className="admin-gate-card"><span className="admin-lock-art" aria-hidden="true">▣</span><span className="admin-eyebrow">OWNER INBOX NOT CONFIGURED</span><h1>The private inbox is not connected yet.</h1><p>Set the Supabase URL and anon key, apply the database migration, and add your signed-in account to the owner allowlist before opening this inbox.</p><a href="/">Return to Satwika OS</a></section>
      : inboxState === 'loading' ? <section className="admin-loading-card" role="status">Checking your sign-in…</section>
      : inboxState === 'signed-out' ? <section className="admin-gate-card admin-login-card"><span className="admin-lock-art" aria-hidden="true">▣</span><span className="admin-eyebrow">OWNER ACCESS ONLY</span><h1>Sign in to your little inbox.</h1><p>This page is for the authenticated owner. Messages stay protected by the database policies.</p>
        <form onSubmit={submitSignIn}><label htmlFor="owner-email">Owner email</label><input id="owner-email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required/><label htmlFor="owner-password">Password</label><input id="owner-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required/><button type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button></form>
      </section>
      : inboxState === 'checking-owner' ? <section className="admin-loading-card" role="status">Verifying owner access…</section>
      : inboxState === 'denied' ? <section className="admin-gate-card"><span className="admin-lock-art" aria-hidden="true">▣</span><span className="admin-eyebrow">NOT ON THE OWNER LIST</span><h1>This account cannot open the inbox.</h1><p>The account is signed in, but it is not in <code>private.message_owners</code>. The database will not reveal any messages to it.</p><div className="admin-gate-actions"><button type="button" onClick={handleSignOut} disabled={busy}>Sign out</button><a href="/">Return to Satwika OS</a></div></section>
      : inboxState === 'failed' ? <section className="admin-gate-card"><span className="admin-lock-art" aria-hidden="true">!</span><span className="admin-eyebrow">INBOX CHECK FAILED</span><h1>We couldn't open the private inbox.</h1><p>Check that the migration is installed and this account is allowlisted.</p><button type="button" onClick={refreshInbox} disabled={busy}>{busy ? 'Checking…' : 'Try again'}</button></section>
      : <section className="admin-inbox-content">
        <div className="admin-inbox-title"><div><span className="admin-eyebrow">A SMALL PLACE FOR BIG FEELINGS</span><h1>CD's little inbox</h1><p>Messages from the Message to CD app, newest first.</p></div><button type="button" className="admin-refresh-button" onClick={refreshInbox} disabled={busy} aria-label="Refresh inbox">↻ <span>Refresh</span></button></div>
        {error && <p className="admin-inbox-error" role="alert">{error}</p>}
        {messages.length === 0 ? <div className="admin-empty-inbox"><span aria-hidden="true">✉</span><h2>No messages yet.</h2><p>Your little inbox is waiting.</p></div>
          : <div className="admin-message-layout">
            <nav className="admin-message-list" aria-label="Messages">{messages.map((item) => <button type="button" key={item.id} className={`admin-message-row${item.id === selectedId ? ' is-selected' : ''}${item.is_read ? '' : ' is-unread'}`} onClick={() => setSelectedId(item.id)}>
              <span className="admin-unread-dot" aria-hidden="true"/><strong>{item.message.split(/\r?\n/).find((line) => line.trim())?.slice(0, 46) || 'A little message'}</strong><time>{new Date(item.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</time><small>{Array.from(item.message).length} characters</small>
            </button>)}</nav>
            {selectedMessage && <article className="admin-message-detail"><header><div><span className={`admin-read-label${selectedMessage.is_read ? ' is-read' : ''}`}>{selectedMessage.is_read ? 'READ' : 'UNREAD'}</span><time>{new Date(selectedMessage.created_at).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })}</time></div><div className="admin-detail-actions"><button type="button" onClick={() => toggleRead(selectedMessage)} disabled={busyMessageId === selectedMessage.id}>{selectedMessage.is_read ? 'Mark unread' : 'Mark read'}</button><button type="button" className="admin-delete-button" onClick={() => removeMessage(selectedMessage)} disabled={busyMessageId === selectedMessage.id}>Delete</button></div></header><pre>{selectedMessage.message}</pre></article>}
          </div>}
      </section>}

    {error && inboxState !== 'owner' && <p className="admin-gate-error" role="alert">{error}</p>}
  </main>
}
