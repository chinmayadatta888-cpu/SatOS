import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? ''

export type SupabaseConfigState = 'missing' | 'ready' | 'invalid'
export type SupabaseConfigIssue =
  | 'none'
  | 'missing-url-and-key'
  | 'missing-url'
  | 'missing-key'
  | 'invalid-url'
  | 'https-required'
  | 'initialization-failed'

let client: ReturnType<typeof createClient<Database>> | null = null
let configState: SupabaseConfigState = 'missing'
let configIssue: SupabaseConfigIssue = 'missing-url-and-key'

if (!supabaseUrl || !supabaseAnonKey) {
  if (supabaseUrl) {
    configState = 'invalid'
    configIssue = 'missing-key'
  } else if (supabaseAnonKey) {
    configState = 'invalid'
    configIssue = 'missing-url'
  }
} else {
  let parsedUrl: URL | null = null
  try {
    parsedUrl = new URL(supabaseUrl)
  } catch {
    configState = 'invalid'
    configIssue = 'invalid-url'
  }

  if (parsedUrl) {
    const localHttp = parsedUrl.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(parsedUrl.hostname)
    const secureProtocol = parsedUrl.protocol === 'https:' || localHttp
    if (!secureProtocol || parsedUrl.username || parsedUrl.password) {
      configState = 'invalid'
      configIssue = 'https-required'
    } else {
      try {
        client = createClient<Database>(supabaseUrl, supabaseAnonKey)
        configState = 'ready'
        configIssue = 'none'
      } catch {
        configState = 'invalid'
        configIssue = 'initialization-failed'
      }
    }
  }
}

/** The anon/publishable key is intended for the browser; database access is restricted by RLS. */
export const supabaseClient = client
export const supabaseConfigState = configState
/** Safe diagnostic category only; never includes the URL or API key values. */
export const supabaseConfigIssue = configIssue
