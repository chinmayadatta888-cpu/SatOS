import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { DEFAULT_SETTINGS, loadSettings, parseSettings, SETTINGS_STORAGE_KEY, type OsSettings } from '../config/settings'

type SettingsContextValue = {
  settings: OsSettings
  updateSettings: (changes: Partial<OsSettings>) => void
  resetSettings: () => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<OsSettings>(loadSettings)

  useEffect(() => {
    try { window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings)) } catch { /* Preferences still work until the next reload. */ }
  }, [settings])

  useEffect(() => {
    function syncOtherTab(event: StorageEvent) {
      if (event.key === SETTINGS_STORAGE_KEY) setSettings(parseSettings(event.newValue))
    }
    window.addEventListener('storage', syncOtherTab)
    return () => window.removeEventListener('storage', syncOtherTab)
  }, [])

  const updateSettings = useCallback((changes: Partial<OsSettings>) => {
    setSettings((current) => ({ ...current, ...changes }))
  }, [])
  const resetSettings = useCallback(() => setSettings({ ...DEFAULT_SETTINGS }), [])

  return <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const value = useContext(SettingsContext)
  if (!value) throw new Error('useSettings must be used inside SettingsProvider')
  return value
}
