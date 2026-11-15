import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { photoEntries, type PhotoEntry } from '../../config/photos'

type ImageMode = 'pixelated' | 'original'
type ImageStatus = 'loading' | 'ready' | 'error'

function PhotoPlaceholder({ loading, title }: { loading: boolean; title: string }) {
  return <div className={`photos-image-state${loading ? ' is-loading' : ' is-error'}`} role="status">
    {loading ? <span className="photos-pixel-loader" aria-hidden="true"><i /><i /><i /><i /></span> : <svg className="photos-placeholder-art" viewBox="0 0 48 40" aria-hidden="true" shapeRendering="crispEdges">
      <rect x="4" y="5" width="40" height="31" fill="#fff8df" stroke="#314462" strokeWidth="3" />
      <rect x="8" y="9" width="32" height="23" fill="#cfe4e7" />
      <rect x="11" y="23" width="26" height="9" fill="#85bd82" />
      <path d="M9 25l9-9 7 7 5-5 10 10v4H9z" fill="#83b6cb" />
      <rect x="27" y="12" width="5" height="5" fill="#f4c864" />
      <path d="M20 12h4v4h-4zm-2 4h4v4h-4zm4 0h4v4h-4zm-2 4h4v4h-4z" fill="#cb6c70" />
    </svg>}
    <strong>{loading ? 'Opening photo…' : 'Photo unavailable'}</strong>
    {!loading && <small>{title}<br />Check the image path in <code>src/config/photos.ts</code>.</small>}
  </div>
}

function PhotoSurface({ photo, mode, pixelation, className = '' }: { photo: PhotoEntry; mode: ImageMode; pixelation: number; className?: string }) {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [status, setStatus] = useState<ImageStatus>('loading')
  const [pixelatedSrc, setPixelatedSrc] = useState('')

  useEffect(() => {
    let current = true
    setStatus('loading')
    setPixelatedSrc('')
    imageRef.current = null
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => {
      if (!current) return
      imageRef.current = image
      setStatus('ready')
    }
    image.onerror = () => { if (current) setStatus('error') }
    image.src = photo.src
    return () => {
      current = false
      image.onload = null
      image.onerror = null
    }
  }, [photo.src])

  useEffect(() => {
    if (status !== 'ready' || mode !== 'pixelated' || pixelation === 0) return
    const source = imageRef.current
    if (!source) {
      setStatus('error')
      return
    }
    try {
      setPixelatedSrc('')
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) throw new Error('Canvas is unavailable')
      const longestSide = Math.max(source.naturalWidth, source.naturalHeight)
      const pixelSide = Math.min(longestSide, Math.max(48, 164 - pixelation * 14))
      const scale = pixelSide / longestSide
      canvas.width = Math.max(1, Math.round(source.naturalWidth * scale))
      canvas.height = Math.max(1, Math.round(source.naturalHeight * scale))
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.imageSmoothingEnabled = true
      context.drawImage(source, 0, 0, canvas.width, canvas.height)
      setPixelatedSrc(canvas.toDataURL('image/png'))
    } catch {
      setStatus('error')
    }
  }, [mode, pixelation, photo.src, status])

  const renderPixelated = mode === 'pixelated' && pixelation > 0
  const visible = status === 'ready' && (!renderPixelated || pixelatedSrc.length > 0)
  const visibleSrc = renderPixelated ? pixelatedSrc : photo.src

  return <div className={`photos-image-surface ${className}`}>
    {(status === 'loading' || status === 'ready' && renderPixelated && !pixelatedSrc) && <PhotoPlaceholder loading title={photo.title} />}
    {status === 'error' && <PhotoPlaceholder loading={false} title={photo.title} />}
    {visible && <img
      className={renderPixelated ? 'photos-pixelated-image' : 'photos-original-image'}
      src={visibleSrc}
      alt={renderPixelated ? `${photo.title}, pixelated preview` : photo.title}
      draggable={false}
      onError={() => setStatus('error')}
    />}
  </div>
}

function AlbumMark() {
  return <svg className="photos-album-mark" viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges">
    <rect x="5" y="4" width="22" height="24" fill="#ef8e78" stroke="#463950" strokeWidth="2" />
    <rect x="8" y="8" width="16" height="14" fill="#e5f0df" />
    <rect x="10" y="16" width="12" height="6" fill="#84ba7c" />
    <path d="M9 17l5-5 4 4 2-2 4 4v4H9z" fill="#72b7d0" />
    <rect x="10" y="24" width="12" height="2" fill="#ffe6a3" />
  </svg>
}

function PixelationControl({ value, onChange, compact = false }: { value: number; onChange: (value: number) => void; compact?: boolean }) {
  function update(event: ChangeEvent<HTMLInputElement>) {
    onChange(Number(event.currentTarget.value))
  }

  return <label className={`photos-pixelation-control${compact ? ' is-compact' : ''}`}>
    <span><span>Pixel look</span><b>{value}</b></span>
    <input aria-label="Pixelation intensity" type="range" min="1" max="8" step="1" value={value} onChange={update} />
  </label>
}

function compactDate(date: string): string {
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? date : parsed.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function Gallery({ selectedId, pixelation, onPixelationChange, onSelect, onOpen }: {
  selectedId: string
  pixelation: number
  onPixelationChange: (value: number) => void
  onSelect: (id: string) => void
  onOpen: (index: number, id: string) => void
}) {
  return <div className="photos-gallery">
    <div className="photos-gallery-toolbar">
      <div className="photos-album-heading"><span className="photos-album-icon"><AlbumMark /></span><span><strong>Satwika’s album</strong><small>{photoEntries.length} little moments</small></span></div>
      <PixelationControl value={pixelation} onChange={onPixelationChange} />
    </div>
    <div className="photos-gallery-scroll" aria-label="Photo gallery">
      <div className="photos-grid">
        {photoEntries.map((photo, index) => {
          const selected = selectedId === photo.id
          return <button
            className={`photos-card${selected ? ' is-selected' : ''}`}
            key={photo.id}
            type="button"
            aria-label={`${photo.title}, ${photo.date}`}
            aria-pressed={selected}
            onFocus={() => onSelect(photo.id)}
            onMouseEnter={() => onSelect(photo.id)}
            onClick={() => onOpen(index, photo.id)}
          >
            <span className="photos-thumbnail-frame"><PhotoSurface photo={photo} mode="pixelated" pixelation={pixelation} className="photos-thumbnail-media" /></span>
            <span className="photos-card-title">{photo.title}</span>
            <span className="photos-card-date">{compactDate(photo.date)}</span>
          </button>
        })}
      </div>
    </div>
    <div className="photos-gallery-footer"><span className="photos-footer-spark" aria-hidden="true">✦</span><span>Every little moment belongs here.</span><span className="photos-footer-count">{photoEntries.length} / {photoEntries.length}</span></div>
  </div>
}

function PhotoViewer({ photo, index, pixelation, mode, onModeChange, onPixelationChange, onBack, onPrevious, onNext }: {
  photo: PhotoEntry
  index: number
  pixelation: number
  mode: ImageMode
  onModeChange: (mode: ImageMode) => void
  onPixelationChange: (value: number) => void
  onBack: () => void
  onPrevious: () => void
  onNext: () => void
}) {
  return <div className="photos-viewer">
    <div className="photos-viewer-toolbar">
      <button type="button" className="photos-back-button" onClick={onBack}><span aria-hidden="true">‹</span> Album</button>
      <span className="photos-counter">{String(index + 1).padStart(2, '0')} <i>/</i> {String(photoEntries.length).padStart(2, '0')}</span>
      <div className="photos-viewer-navigation">
        <button type="button" aria-label="Previous photo" title="Previous photo" onClick={onPrevious}><span aria-hidden="true">◀</span></button>
        <button type="button" aria-label="Next photo" title="Next photo" onClick={onNext}><span aria-hidden="true">▶</span></button>
      </div>
    </div>
    <div className="photos-viewer-body">
      <div className="photos-viewer-stage" aria-label="Photo viewing area">
        <PhotoSurface key={`${photo.id}-${mode}`} photo={photo} mode={mode} pixelation={pixelation} className="photos-viewer-media" />
      </div>
      <aside className="photos-information">
        <span className="photos-note-label">PHOTO NOTE</span>
        <h2>{photo.title}</h2>
        <time>{photo.date}</time>
        <div className="photos-quality-switch" role="group" aria-label="Photo quality">
          <button type="button" aria-pressed={mode === 'pixelated'} className={mode === 'pixelated' ? 'is-active' : ''} onClick={() => onModeChange('pixelated')}>Pixel</button>
          <button type="button" aria-pressed={mode === 'original'} className={mode === 'original' ? 'is-active' : ''} onClick={() => onModeChange('original')}>Original</button>
        </div>
        {mode === 'pixelated' && <PixelationControl value={pixelation} onChange={onPixelationChange} compact />}
        <small className="photos-original-note">Original keeps the supplied image untouched.</small>
        <p className="photos-caption">{photo.caption}</p>
        {photo.description && <p className="photos-description">{photo.description}</p>}
      </aside>
    </div>
  </div>
}

export default function PhotosApp() {
  const rootRef = useRef<HTMLElement>(null)
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const [selectedId, setSelectedId] = useState(photoEntries[0]?.id ?? '')
  const [pixelation, setPixelation] = useState(4)
  const [mode, setMode] = useState<ImageMode>('pixelated')
  const currentPhoto = viewerIndex === null ? null : photoEntries[viewerIndex]

  function openPhoto(index: number, id: string) {
    setSelectedId(id)
    setMode('pixelated')
    setViewerIndex(index)
    rootRef.current?.focus({ preventScroll: true })
  }

  function movePhoto(direction: number) {
    setViewerIndex((current) => current === null ? current : (current + direction + photoEntries.length) % photoEntries.length)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (viewerIndex === null) return
    if (event.key === 'Escape') {
      event.preventDefault()
      setViewerIndex(null)
      return
    }
    if (event.target instanceof HTMLInputElement) return
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      movePhoto(event.key === 'ArrowLeft' ? -1 : 1)
    }
  }

  return <section ref={rootRef} className="photos-app" aria-label="Photos application" tabIndex={-1} onKeyDown={handleKeyDown}>
    {currentPhoto && viewerIndex !== null ? <PhotoViewer
      photo={currentPhoto}
      index={viewerIndex}
      pixelation={pixelation}
      mode={mode}
      onModeChange={setMode}
      onPixelationChange={setPixelation}
      onBack={() => setViewerIndex(null)}
      onPrevious={() => movePhoto(-1)}
      onNext={() => movePhoto(1)}
    /> : <Gallery
      selectedId={selectedId}
      pixelation={pixelation}
      onPixelationChange={setPixelation}
      onSelect={setSelectedId}
      onOpen={openPhoto}
    />}
  </section>
}
