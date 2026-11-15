import { useEffect, useState } from 'react'
import { junnyPhotos } from '../../config/junny/photos'

export default function JunnyScrapbook({ onBack }: { onBack: () => void }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const photo = selectedIndex === null ? null : junnyPhotos[selectedIndex]

  useEffect(() => {
    if (selectedIndex === null) return
    function handleKeys(event: KeyboardEvent) {
      if (event.key === 'Escape') setSelectedIndex(null)
      if (event.key === 'ArrowRight' && junnyPhotos.length > 1) setSelectedIndex((current) => current === null ? null : (current + 1) % junnyPhotos.length)
      if (event.key === 'ArrowLeft' && junnyPhotos.length > 1) setSelectedIndex((current) => current === null ? null : (current - 1 + junnyPhotos.length) % junnyPhotos.length)
    }
    window.addEventListener('keydown', handleKeys)
    return () => window.removeEventListener('keydown', handleKeys)
  }, [selectedIndex])

  function stepPhoto(step: number) {
    setSelectedIndex((current) => current === null ? null : (current + step + junnyPhotos.length) % junnyPhotos.length)
  }

  return <section className="junny-scrapbook-view" aria-label="Junny's scrapbook">
    <header className="junny-scrapbook-header"><button type="button" onClick={onBack}>← Back to the room</button><div><span>CAREFULLY PINNED MEMORIES</span><h2>Junny's scrapbook</h2></div><span className="junny-scrapbook-count">{junnyPhotos.length} {junnyPhotos.length === 1 ? 'photo' : 'photos'}</span></header>
    <div className="junny-scrapbook-paper">
      <p className="junny-scrapbook-intro">A little wall of important Junny moments, saved with care.</p>
      <div className="junny-photo-wall">
        {junnyPhotos.map((item, index) => <button type="button" className="junny-polaroid" key={item.id} onClick={() => setSelectedIndex(index)} aria-label={`Open ${item.title}`}>
          <span className="junny-washi-tape" aria-hidden="true"/>
          <span className="junny-polaroid-image"><img src={item.image} alt={item.alt} draggable={false}/></span>
          <strong>{item.title}</strong><span className="junny-polaroid-caption">{item.caption}</span>
          {item.note && <small>{item.note}</small>}
        </button>)}
      </div>
      {junnyPhotos.length === 0 && <p className="junny-scrapbook-empty">No photos are pinned yet. Add Junny's photos in <code>src/config/junny/photos.ts</code>.</p>}
      <footer className="junny-scrapbook-footer">PIXEL-PERFECT MEMORIES · STORED IN THIS LITTLE HQ</footer>
    </div>

    {photo && <div className="junny-photo-viewer-backdrop">
      <section className="junny-photo-viewer" role="dialog" aria-modal="true" aria-labelledby="junny-photo-viewer-title">
        <header><div><span>JUNNY'S SCRAPBOOK</span><h3 id="junny-photo-viewer-title">{photo.title}</h3></div><button type="button" onClick={() => setSelectedIndex(null)} aria-label="Close photo">×</button></header>
        <div className="junny-photo-viewer-stage"><button type="button" onClick={() => stepPhoto(-1)} disabled={junnyPhotos.length < 2} aria-label="Previous photo">‹</button><img src={photo.image} alt={photo.alt} draggable={false}/><button type="button" onClick={() => stepPhoto(1)} disabled={junnyPhotos.length < 2} aria-label="Next photo">›</button></div>
        <p>{photo.caption}{photo.note && <small>{photo.note}</small>}</p>
        <footer>{(selectedIndex ?? 0) + 1} / {junnyPhotos.length}<span>ESC TO CLOSE</span></footer>
      </section>
    </div>}
  </section>
}
