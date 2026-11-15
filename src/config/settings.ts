export const SETTINGS_STORAGE_KEY = 'satwika.os-settings.v1'

export type WallpaperMode = 'automatic' | 'day' | 'night'
export type ClockFormat = '12h' | '24h'
export type CeoAuthority = 'normal' | 'elevated' | 'unquestionable'

export type OsSettings = {
  wallpaperMode: WallpaperMode
  showDesktopIcons: boolean
  pixelCursor: boolean
  uiAnimations: boolean
  reducedMotion: boolean
  systemSounds: boolean
  systemVolume: number
  clockFormat: ClockFormat
  ceoAuthority: CeoAuthority
  mandatoryHugs: boolean
  junnyNaps: boolean
  bearProtection: boolean
  cuteness: number
  potatoMode: boolean
  mainCharacterMode: boolean
  dramaticStartup: boolean
  happyNotifications: boolean
  seriousness: number
}

export const DEFAULT_SETTINGS: Readonly<OsSettings> = {
  wallpaperMode: 'automatic',
  showDesktopIcons: true,
  pixelCursor: true,
  uiAnimations: true,
  reducedMotion: false,
  systemSounds: true,
  systemVolume: 30,
  clockFormat: '12h',
  ceoAuthority: 'normal',
  mandatoryHugs: false,
  junnyNaps: true,
  bearProtection: true,
  cuteness: 50,
  potatoMode: false,
  mainCharacterMode: false,
  dramaticStartup: false,
  happyNotifications: true,
  seriousness: 10,
}

function storedBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback
}

function storedNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.round(Math.min(100, Math.max(0, value)))
    : fallback
}

export function parseSettings(raw: string | null): OsSettings {
  if (!raw) return { ...DEFAULT_SETTINGS }
  try {
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== 'object' || Array.isArray(value)) return { ...DEFAULT_SETTINGS }
    const saved = value as Record<string, unknown>
    return {
      wallpaperMode: saved.wallpaperMode === 'day' || saved.wallpaperMode === 'night' ? saved.wallpaperMode : 'automatic',
      showDesktopIcons: storedBoolean(saved.showDesktopIcons, DEFAULT_SETTINGS.showDesktopIcons),
      pixelCursor: storedBoolean(saved.pixelCursor, DEFAULT_SETTINGS.pixelCursor),
      uiAnimations: storedBoolean(saved.uiAnimations, DEFAULT_SETTINGS.uiAnimations),
      reducedMotion: storedBoolean(saved.reducedMotion, DEFAULT_SETTINGS.reducedMotion),
      systemSounds: storedBoolean(saved.systemSounds, DEFAULT_SETTINGS.systemSounds),
      systemVolume: storedNumber(saved.systemVolume, DEFAULT_SETTINGS.systemVolume),
      clockFormat: saved.clockFormat === '24h' ? '24h' : '12h',
      ceoAuthority: saved.ceoAuthority === 'elevated' || saved.ceoAuthority === 'unquestionable' ? saved.ceoAuthority : 'normal',
      mandatoryHugs: storedBoolean(saved.mandatoryHugs, DEFAULT_SETTINGS.mandatoryHugs),
      junnyNaps: storedBoolean(saved.junnyNaps, DEFAULT_SETTINGS.junnyNaps),
      bearProtection: storedBoolean(saved.bearProtection, DEFAULT_SETTINGS.bearProtection),
      cuteness: storedNumber(saved.cuteness, DEFAULT_SETTINGS.cuteness),
      potatoMode: storedBoolean(saved.potatoMode, DEFAULT_SETTINGS.potatoMode),
      mainCharacterMode: storedBoolean(saved.mainCharacterMode, DEFAULT_SETTINGS.mainCharacterMode),
      dramaticStartup: storedBoolean(saved.dramaticStartup, DEFAULT_SETTINGS.dramaticStartup),
      happyNotifications: storedBoolean(saved.happyNotifications, DEFAULT_SETTINGS.happyNotifications),
      seriousness: storedNumber(saved.seriousness, DEFAULT_SETTINGS.seriousness),
    }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function loadSettings(): OsSettings {
  try {
    return parseSettings(window.localStorage.getItem(SETTINGS_STORAGE_KEY))
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}
