import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? ''

export type SupabaseConfigState = 'missing' | 'ready' | 'invalid'

let client: ReturnType<typeof createClient<Database>> | null = null
let configState: SupabaseConfigState = 'missing'

if (supabaseUrl || supabaseAnonKey) {
  try {
    const parsedUrl = new URL(supabaseUrl)
    const localHttp = parsedUrl.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(parsedUrl.hostname)
    const secureProtocol = parsedUrl.protocol === 'https:' || localHttp
    if (supabaseUrl && supabaseAnonKey && secureProtocol) {
      client = createClient<Database>(supabaseUrl, supabaseAnonKey)
      configState = 'ready'
    } else {
      configState = 'invalid'
    }
  } catch {
    configState = 'invalid'
  }
}

/** The anon/publishable key is intended for the browser; database access is restricted by RLS. */
export const supabaseClient = client
export const supabaseConfigState = configState
