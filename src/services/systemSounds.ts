export type SystemSound = 'open' | 'click' | 'close' | 'confirm'

let audioContext: AudioContext | null = null

export function playSystemSound(kind: SystemSound, volume: number) {
  try {
    const AudioContextClass = window.AudioContext
    if (!AudioContextClass) return
    audioContext ??= new AudioContextClass()
    if (audioContext.state === 'suspended') void audioContext.resume()

    const notes = kind === 'open' ? [523, 659] : kind === 'confirm' ? [659, 784] : kind === 'close' ? [494, 392] : [587]
    const start = audioContext.currentTime
    const master = audioContext.createGain()
    master.gain.value = Math.min(1, Math.max(0, volume / 100)) * 0.075
    master.connect(audioContext.destination)

    notes.forEach((frequency, index) => {
      const oscillator = audioContext!.createOscillator()
      const envelope = audioContext!.createGain()
      const noteStart = start + index * 0.055
      oscillator.type = 'square'
      oscillator.frequency.setValueAtTime(frequency, noteStart)
      envelope.gain.setValueAtTime(0.001, noteStart)
      envelope.gain.linearRampToValueAtTime(0.9, noteStart + 0.008)
      envelope.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.075)
      oscillator.connect(envelope)
      envelope.connect(master)
      oscillator.start(noteStart)
      oscillator.stop(noteStart + 0.08)
    })

    window.setTimeout(() => { try { master.disconnect() } catch { /* Already disconnected by the browser. */ } }, 240)
  } catch {
    // Audio is an optional enhancement; the setting itself remains available without audio hardware.
  }
}
