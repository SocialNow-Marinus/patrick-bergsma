import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useSeriesBySlug, useArtworks } from '@/hooks/useFirestore'
import LazyImage from '@/components/ui/LazyImage'
import Lightbox from '@/components/ui/Lightbox'

export default function SeriesPage() {
  const { slug } = useParams<{ slug: string }>()
  const { series, loading: seriesLoading } = useSeriesBySlug(slug || '')
  const { data: artworks, loading: artworksLoading } = useArtworks(slug || '')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const headerRef = useScrollReveal<HTMLElement>()
  const gridRef = useScrollReveal<HTMLElement>()

  if (seriesLoading || artworksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border border-stone-light border-t-stone rounded-full animate-spin" />
      </div>
    )
  }

  if (!series) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-light text-charcoal mb-4">Series not found</h1>
          <p className="text-stone font-light">The series you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section ref={headerRef} className="px-4 md:px-8 lg:px-12 py-12 md:py-16 max-w-[1600px] mx-auto">
        <div className="max-w-3xl reveal-on-scroll">
          <p className="text-[11px] uppercase tracking-[0.3em] text-stone font-body font-light mb-4">
            Series
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mb-8">
            {series.title}
          </h1>
          {series.description && (
            <p className="text-base md:text-lg font-body font-light text-stone leading-relaxed max-w-[65ch]">
              {series.description}
            </p>
          )}
        </div>

        <div className="mt-10 flex items-center gap-4">
          <span className="text-xs text-stone-light font-body font-light uppercase tracking-[0.2em]">
            {artworks.length} works
          </span>
          <span className="flex-1 h-px bg-gallery-cream" />
        </div>
      </section>

      {/* Artwork Grid — CSS columns masonry */}
      <section ref={gridRef} className="px-4 md:px-8 lg:px-12 pb-16 md:pb-20 max-w-[1600px] mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-x-4 md:gap-x-5">
          {artworks.map((artwork, i) => (
            <div
              key={artwork.id}
              className={`break-inside-avoid mb-4 md:mb-5 reveal-on-scroll stagger-${(i % 6) + 1}`}
            >
              <div className="group cursor-pointer" onClick={() => setLightboxIndex(i)}>
                {/* Image — natural aspect ratio */}
                <div className="relative overflow-hidden bg-gallery-white">
                  <LazyImage
                    src={artwork.thumbnailUrl || artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full transition-all duration-700 group-hover:scale-[1.02]"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-all duration-500" />
                </div>

                {/* Metadata block */}
                <div className="mt-3 space-y-0.5">
                  {artwork.title && (
                    <p className="font-display text-base font-light text-charcoal tracking-tight">
                      {artwork.title}
                    </p>
                  )}
                  {(artwork.medium || artwork.dimensions || artwork.year) && (
                    <div className="flex items-baseline gap-2 text-[11px] text-stone font-body font-light tracking-wide">
                      {artwork.medium && <span>{artwork.medium}</span>}
                      {artwork.medium && artwork.dimensions && <span className="text-stone-light">|</span>}
                      {artwork.dimensions && <span>{artwork.dimensions}</span>}
                      {(artwork.medium || artwork.dimensions) && artwork.year && <span className="text-stone-light">|</span>}
                      {artwork.year && <span>{artwork.year}</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={artworks.map((a) => ({
            src: a.imageUrl,
            title: a.title,
            medium: a.medium,
            dimensions: a.dimensions,
            year: a.year,
          }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  )
}
