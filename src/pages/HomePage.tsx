import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useSeries, useSelectedWorks } from '@/hooks/useFirestore'
import SeriesCard from '@/components/ui/SeriesCard'
import LazyImage from '@/components/ui/LazyImage'
import Lightbox from '@/components/ui/Lightbox'
import InstagramBanner from '@/components/sections/InstagramBanner'

export default function HomePage() {
  const { data: seriesList, loading: seriesLoading } = useSeries()
  const { data: selectedWorks, loading: worksLoading } = useSelectedWorks()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const heroRef = useScrollReveal<HTMLElement>()
  const seriesRef = useScrollReveal<HTMLElement>()
  const worksRef = useScrollReveal<HTMLElement>()

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[55vh] md:min-h-[65vh] flex items-center justify-center px-6">
        {/* Subtle background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(196,168,108,0.04)_0%,_transparent_60%)]" />

        <div className="text-center reveal-on-scroll relative">
          {/* Decorative top line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-8 h-px bg-stone-light/60" />
            <span className="text-[9px] uppercase tracking-[0.5em] text-stone-light/80 font-body font-light">
              Visual Artist
            </span>
            <span className="w-8 h-px bg-stone-light/60" />
          </div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-charcoal leading-[0.9] hero-text-shadow tracking-tight">
            Patrick<br />
            <span className="italic text-stone/70">Bergsma</span>
          </h1>

          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="w-16 h-px bg-stone-light/40" />
            <p className="text-[10px] uppercase tracking-[0.5em] text-stone/60 font-body font-light">
              b. 1965 · Purmerend
            </p>
            <span className="w-16 h-px bg-stone-light/40" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 reveal-on-scroll animate-float">
          <span className="text-[9px] uppercase tracking-[0.3em] text-stone-light/60 font-body">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-stone-light/40 to-transparent" />
        </div>
      </section>

      {/* Thin accent divider */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-gallery-cream to-transparent" />
      </div>

      {/* Series Section */}
      <section ref={seriesRef} className="px-4 md:px-8 lg:px-12 py-16 md:py-24 max-w-[1600px] mx-auto">
        <div className="mb-10 md:mb-14 reveal-on-scroll flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-stone font-body font-light mb-3">
              Latest Series
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-charcoal">
              Selected Series
            </h2>
          </div>
          <span className="hidden md:block text-[11px] uppercase tracking-[0.2em] text-stone-light font-body font-light">
            {seriesList.length} series
          </span>
        </div>

        {seriesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full aspect-[3/4] bg-gallery-cream" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {seriesList.map((series, i) => (
              <SeriesCard key={series.id} series={series} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Thin accent divider */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-gallery-cream to-transparent" />
      </div>

      {/* Selected Works */}
      <section ref={worksRef} className="px-4 md:px-8 lg:px-12 py-16 md:py-24 max-w-[1600px] mx-auto">
        <div className="mb-10 md:mb-14 reveal-on-scroll flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-stone font-body font-light mb-3">
              Highlights
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-charcoal">
              Selected Works
            </h2>
          </div>
          {!worksLoading && selectedWorks.length > 0 && (
            <span className="hidden md:block text-[11px] uppercase tracking-[0.2em] text-stone-light font-body font-light">
              {selectedWorks.length} works
            </span>
          )}
        </div>

        {worksLoading ? (
          <div className="columns-1 md:columns-2 gap-x-5 md:gap-x-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="break-inside-avoid mb-5 md:mb-6 animate-pulse">
                <div className="w-full aspect-[4/3] bg-gallery-cream" />
                <div className="mt-3 h-5 bg-gallery-cream w-3/4" />
                <div className="mt-1 h-3 bg-gallery-cream w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="columns-1 md:columns-2 gap-x-5 md:gap-x-6">
            {selectedWorks.map((work, i) => (
              <div key={work.id} className={`break-inside-avoid mb-5 md:mb-6 reveal-on-scroll stagger-${(i % 6) + 1}`}>
                <div className="group cursor-pointer" onClick={() => setLightboxIndex(i)}>
                  <div className="relative overflow-hidden bg-gallery-white">
                    <LazyImage
                      src={work.imageUrl}
                      thumbnailSrc={work.thumbnailUrl}
                      alt={work.title}
                      className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/5 transition-all duration-500" />
                    {/* Subtle view indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-charcoal">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal font-body font-light">View</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-baseline">
                    <p className="font-display text-lg font-light text-charcoal">
                      {work.title}
                    </p>
                    {work.year && (
                      <p className="text-[11px] text-stone font-body font-light tracking-wider">{work.year}</p>
                    )}
                  </div>
                  {(work.medium || work.dimensions) && (
                    <p className="mt-0.5 text-[11px] text-stone font-body font-light tracking-wide">
                      {[work.medium, work.dimensions].filter(Boolean).join(' — ')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Instagram Banner */}
      <InstagramBanner
        elfsightAppId={import.meta.env.VITE_ELFSIGHT_APP_ID}
      />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={selectedWorks.map((w) => ({
            src: w.imageUrl,
            title: w.title,
            medium: w.medium,
            dimensions: w.dimensions,
            year: w.year,
          }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  )
}
