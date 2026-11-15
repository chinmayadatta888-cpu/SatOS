import { useEffect, useState } from 'react'
import { useSettings } from '../context/SettingsContext'

function getMinutes(now: Date): number {
  const params = new URLSearchParams(window.location.search)
  const override = params.get('satwikaTime')
  const match = override?.match(/^(\d{1,2}):(\d{2})$/)
  if (match) {
    const hours = Number(match[1])
    const minutes = Number(match[2])
    if (hours < 24 && minutes < 60) return hours * 60 + minutes
  }
  return now.getHours() * 60 + now.getMinutes()
}

function smoothstep(value: number): number {
  const t = Math.min(1, Math.max(0, value))
  return t * t * (3 - 2 * t)
}

function getNightAmount(minutes: number): number {
  // Blend across the dawn and dusk hour so the same landscape gently changes light.
  if (minutes >= 330 && minutes <= 390) return 1 - smoothstep((minutes - 330) / 60)
  if (minutes >= 1050 && minutes <= 1110) return smoothstep((minutes - 1050) / 60)
  return minutes > 390 && minutes < 1050 ? 0 : 1
}

export function useLocalTime() {
  const { settings } = useSettings()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const automaticNightAmount = getNightAmount(getMinutes(now))
  const nightAmount = settings.wallpaperMode === 'day' ? 0 : settings.wallpaperMode === 'night' ? 1 : automaticNightAmount
  return { now, nightAmount }
}
