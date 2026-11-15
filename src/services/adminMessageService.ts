import type { Session } from '@supabase/supabase-js'
import { supabaseClient } from '../config/supabase'

export type OwnerMessage = { id: string; message: string; created_at: string; is_read: boolean }

function requireClient() {
  if (!supabaseClient) throw new Error('Supabase is not configured for this deployment.')
  return supabaseClient
}

export async function getAdminSession(): Promise<Session | null> {
  const client = requireClient()
  const { data, error } = await client.auth.getSession()
  if (error) throw error
  return data.session
}

export function subscribeToAdminAuth(callback: (session: Session | null) => void): () => void {
  const client = requireClient()
  const { data } = client.auth.onAuthStateChange((_event, session) => callback(session))
  return () => data.subscription.unsubscribe()
}

export async function signInOwner(email: string, password: string): Promise<Session> {
  const client = requireClient()
  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error) throw error
  if (!data.session) throw new Error('The sign-in completed without an active session.')
  return data.session
}

export async function signOutOwner(): Promise<void> {
  const { error } = await requireClient().auth.signOut()
  if (error) throw error
}

/** This only returns the authenticated account's owner flag; message access remains RLS-protected. */
export async function checkOwnerAccess(): Promise<boolean> {
  const { data, error } = await requireClient().rpc('is_message_owner')
  if (error) throw error
  return data === true
}

export async function listOwnerMessages(): Promise<OwnerMessage[]> {
  const { data, error } = await requireClient()
    .from('messages')
    .select('id, message, created_at, is_read')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function setOwnerMessageRead(id: string, isRead: boolean): Promise<void> {
  const { data, error } = await requireClient()
    .from('messages')
    .update({ is_read: isRead })
    .eq('id', id)
    .select('id')
    .maybeSingle()
  if (error) throw error
  if (!data) throw new Error('That message is unavailable to this owner account.')
}

export async function deleteOwnerMessage(id: string): Promise<void> {
  const { data, error } = await requireClient()
    .from('messages')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle()
  if (error) throw error
  if (!data) throw new Error('That message is unavailable to this owner account.')
}
