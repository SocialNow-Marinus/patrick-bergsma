import { useEffect, useCallback, useState } from 'react'

interface LightboxImage {
  src: string
  title?: string
  medium?: string | null
  dimensions?: string | null
  year?: number | null
}

interface LightboxProps {
  images: LightboxImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const [loaded, setLoaded] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const goNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setLoaded(false)
      onNavigate(currentIndex + 1)
    }
  }, [currentIndex, images.length, onNavigate])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setLoaded(false)
      onNavigate(currentIndex - 1)
    }
  }, [currentIndex, onNavigate])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goNext, goPrev])

  // Preload adjacent images
  useEffect(() => {
    setLoaded(false)
    const preload = [currentIndex - 1, currentIndex + 1]
      .filter((i) => i >= 0 && i < images.length)
    preload.forEach((i) => {
      const img = new Image()
      img.src = images[i].src
    })
  }, [currentIndex, images])

  const current = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 lightbox-backdrop flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-white/60 hover:text-white transition-colors duration-300 p-2"
        aria-label="Close"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 text-white/40 text-sm font-body font-light tracking-wider">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev() }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors duration-300 p-4"
          aria-label="Previous"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext() }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors duration-300 p-4"
          aria-label="Next"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return
          const diff = touchStart - e.changedTouches[0].clientX
          if (Math.abs(diff) > 50) {
            diff > 0 ? goNext() : goPrev()
          }
          setTouchStart(null)
        }}
      >
        <img
          src={current.src}
          alt={current.title || ''}
          onLoad={() => setLoaded(true)}
          className={`max-w-full max-h-[80vh] object-contain transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Artwork info — gallery wall label style */}
        <div className="mt-6 text-center space-y-1">
          {current.title && (
            <p className="text-white/70 font-display text-lg font-light italic tracking-wide">
              {current.title}
            </p>
          )}
          {(current.medium || current.dimensions || current.year) && (
            <p className="text-white/40 text-[11px] font-body font-light tracking-wider uppercase">
              {[current.medium, current.dimensions, current.year?.toString()].filter(Boolean).join(' — ')}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
