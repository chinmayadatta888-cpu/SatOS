import { supabaseClient } from '../config/supabase'

export type MessageStorageMode = 'demo' | 'supabase'
export type DemoMessage = { id: string; message: string; createdAt: string; isRead: boolean }
export type MessageReceipt = { storage: MessageStorageMode; createdAt: string }

export const DEMO_MESSAGE_STORAGE_KEY = 'satwika.message-to-cd.demo.v1'
const MAX_MESSAGE_LENGTH = 2000

function normalizeMessage(message: string): string {
  const trimmed = message.trim()
  const length = Array.from(trimmed).length
  if (!trimmed) throw new Error('Write a little message before sending.')
  if (length > MAX_MESSAGE_LENGTH) throw new Error(`Messages can be up to ${MAX_MESSAGE_LENGTH} characters.`)
  return trimmed
}

function makeId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `demo-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function getMessageStorageMode(): MessageStorageMode {
  return supabaseClient ? 'supabase' : 'demo'
}

/** Demo submissions are local to this browser and are never sent to Supabase. */
export function readDemoMessages(): DemoMessage[] {
  try {
    const raw = localStorage.getItem(DEMO_MESSAGE_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed as DemoMessage[] : []
  } catch {
    return []
  }
}

export async function submitMessage(message: string): Promise<MessageReceipt> {
  const normalized = normalizeMessage(message)
  const createdAt = new Date().toISOString()

  if (supabaseClient) {
    // Supabase insert does not return rows unless .select() is chained; we intentionally
    // omit it because the public role must not have SELECT access.
    const { error } = await supabaseClient.from('messages').insert({ message: normalized })
    if (error) throw new Error('The message could not be stored remotely.')
    return { storage: 'supabase', createdAt }
  }

  const demoMessage: DemoMessage = { id: makeId(), message: normalized, createdAt, isRead: false }
  const messages = readDemoMessages()
  try {
    localStorage.setItem(DEMO_MESSAGE_STORAGE_KEY, JSON.stringify([...messages, demoMessage]))
  } catch {
    throw new Error('This browser could not save the demo message. Check local storage and try again.')
  }
  return { storage: 'demo', createdAt }
}
