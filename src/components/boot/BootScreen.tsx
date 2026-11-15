import { useEffect } from 'react'

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 3700)
    return () => window.clearTimeout(timer)
  }, [onComplete])

  return <main className="boot-screen" aria-label="Satwika OS is starting">
    <div className="boot-title-block">
      <h1>SATWIKA OS</h1>
      <p>Booting up...</p>
    </div>
    <div className="boot-loader" role="progressbar" aria-label="Booting up" aria-valuemin={0} aria-valuemax={100}>
      <div className="boot-loader-segments" />
    </div>
    <button type="button" className="skip-boot" onClick={onComplete}>skip intro</button>
  </main>
}
