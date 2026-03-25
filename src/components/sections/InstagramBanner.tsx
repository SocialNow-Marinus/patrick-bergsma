import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useSiteSettings } from '@/hooks/useFirestore'

interface InstagramBannerProps {
  /** Elfsight widget app ID (e.g. "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx") */
  elfsightAppId?: string
}

export default function InstagramBanner({ elfsightAppId }: InstagramBannerProps) {
  const sectionRef = useScrollReveal<HTMLElement>()
  const scriptLoaded = useRef(false)
  const [widgetReady, setWidgetReady] = useState(false)
  const { data: settings } = useSiteSettings()

  // Dynamic Instagram URL and handle from settings
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/patrickbergsma.nl/'
  const instagramHandle = instagramUrl.replace(/\/$/, '').split('/').pop() || 'patrickbergsma.nl'
  const displayHandle = `@${instagramHandle}`

  // Load Elfsight platform script if widget ID is provided
  useEffect(() => {
    if (!elfsightAppId || scriptLoaded.current) return

    // Check if script already exists
    if (document.querySelector('script[src*="elfsight"]')) {
      scriptLoaded.current = true
      setWidgetReady(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://static.elfsight.com/platform/platform.js'
    script.async = true
    script.onload = () => {
      scriptLoaded.current = true
      setWidgetReady(true)
    }
    document.head.appendChild(script)

    return () => {
      // Don't remove script on cleanup — other instances may need it
    }
  }, [elfsightAppId])

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal overflow-hidden"
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:24px_24px]" />

      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-12 reveal-on-scroll">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* Instagram gradient icon */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center shadow-lg shadow-[#dc2743]/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
                </svg>
              </div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-body font-light">
                Instagram
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-white">
              Follow the Journey
            </h2>
            <p className="mt-3 text-white/50 text-sm font-body font-light max-w-md">
              Discover new works, studio moments, and behind-the-scenes of the creative process.
            </p>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 md:mt-0 group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-500"
          >
            <span className="text-[11px] uppercase tracking-[0.25em] font-body font-light">
              {displayHandle}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>

        {/* Elfsight Widget or Fallback */}
        {elfsightAppId && widgetReady ? (
          <div className="reveal-on-scroll stagger-2">
            <div className={`elfsight-app-${elfsightAppId}`} data-elfsight-app-lazy />
          </div>
        ) : (
          /* Fallback: visually appealing CTA when Elfsight is not configured */
          <div className="reveal-on-scroll stagger-2">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] transition-all duration-700">
                {/* Subtle inner glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f09433]/0 via-[#dc2743]/0 to-[#bc1888]/0 group-hover:from-[#f09433]/5 group-hover:via-[#dc2743]/5 group-hover:to-[#bc1888]/5 transition-all duration-700" />

                <div className="relative flex items-center justify-center py-16 md:py-24">
                  <div className="text-center">
                    {/* Animated Instagram gradient ring */}
                    <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[2px] group-hover:scale-110 transition-transform duration-700 shadow-lg shadow-[#dc2743]/20">
                      <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <circle cx="12" cy="12" r="5" />
                          <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
                        </svg>
                      </div>
                    </div>
                    <p className="font-display text-xl md:text-2xl font-light text-white mb-2">
                      {displayHandle}
                    </p>
                    <p className="text-white/40 text-sm font-body font-light mb-6">
                      See the latest works and studio updates
                    </p>
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-body font-light text-white/50 group-hover:text-white/80 transition-colors duration-500">
                      Follow on Instagram
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
