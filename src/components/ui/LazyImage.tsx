import { useState, useRef, useEffect } from 'react'

interface LazyImageProps {
  src: string
  thumbnailSrc?: string
  alt: string
  className?: string
  aspectRatio?: string
  objectFit?: 'contain' | 'cover'
  onClick?: () => void
}

export default function LazyImage({
  src,
  thumbnailSrc,
  alt,
  className = '',
  aspectRatio,
  objectFit = 'contain',
  onClick,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const displaySrc = thumbnailSrc || src

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      onClick={onClick}
    >
      {inView && (
        <>
          <img
            src={displaySrc}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`w-full ${aspectRatio ? 'h-full' : ''} ${
              objectFit === 'cover' ? 'object-cover' : 'object-contain'
            } transition-all duration-700 ${
              loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
            }`}
          />
          {!loaded && (
            <div className="absolute inset-0 bg-gallery-cream animate-pulse" />
          )}
        </>
      )}
    </div>
  )
}
