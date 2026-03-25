import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useCvEntries } from '@/hooks/useFirestore'
import LazyImage from '@/components/ui/LazyImage'
import { CV_CATEGORIES, type CvEntry } from '@/types'

export default function ResumePage() {
  const { data: entries, loading } = useCvEntries()
  const heroRef = useScrollReveal<HTMLElement>()
  const contentRef = useScrollReveal<HTMLElement>()

  const groupedEntries = CV_CATEGORIES.map((cat) => ({
    ...cat,
    entries: entries.filter((e) => e.category === cat.key),
  })).filter((group) => group.entries.length > 0)

  return (
    <div className="page-enter">
      {/* Header */}
      <section ref={heroRef} className="px-6 md:px-12 py-16 md:py-24 max-w-[1600px] mx-auto">
        <div className="reveal-on-scroll">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mb-6">
            Resume & Media
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-base font-body font-light text-stone">
              Patrick Bergsma — b. 1965, Purmerend
            </p>
            <span className="flex-1 h-px bg-gallery-cream" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="px-6 md:px-12 pb-24 md:pb-32 max-w-[1600px] mx-auto">
        {loading ? (
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-5 bg-gallery-cream rounded w-48 mb-6" />
                <div className="space-y-3">
                  <div className="h-4 bg-gallery-cream rounded w-full max-w-xl" />
                  <div className="h-4 bg-gallery-cream rounded w-full max-w-lg" />
                  <div className="h-4 bg-gallery-cream rounded w-full max-w-md" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-16 md:space-y-20">
            {groupedEntries.map((group, gi) => (
              <div key={group.key} className={`reveal-on-scroll stagger-${gi + 1}`}>
                <div className="flex items-center gap-6 mb-8">
                  <h2 className="font-display text-2xl md:text-3xl font-light text-charcoal whitespace-nowrap">
                    {group.label}
                  </h2>
                  <span className="flex-1 h-px bg-gallery-cream" />
                </div>

                {group.key === 'media' ? (
                  <MediaGrid entries={group.entries} />
                ) : (
                  <div className="space-y-4">
                    {group.entries.map((entry) => (
                      <CvEntryRow key={entry.id} entry={entry} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function CvEntryRow({ entry }: { entry: CvEntry }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-4 md:grid-cols-[auto_1fr_auto] md:gap-8 items-baseline py-2 border-b border-gallery-cream last:border-0">
      {entry.year && (
        <span className="hidden md:block text-sm font-body font-light text-stone-light w-24">
          {entry.year}
        </span>
      )}
      <div className="min-w-0">
        <p className="text-sm md:text-base font-body font-light text-charcoal">
          {entry.url ? (
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-300"
            >
              {entry.title}
            </a>
          ) : (
            entry.title
          )}
        </p>
        {entry.subtitle && (
          <p className="text-sm font-body font-light text-stone mt-0.5">
            {entry.subtitle}
          </p>
        )}
      </div>
      {entry.year && (
        <span className="md:hidden text-xs font-body font-light text-stone-light">
          {entry.year}
        </span>
      )}
    </div>
  )
}

function MediaGrid({ entries }: { entries: CvEntry[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
      {entries.map((entry) => (
        <a
          key={entry.id}
          href={entry.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center p-4 md:p-6 rounded-lg hover:bg-gallery-warm transition-colors duration-300"
        >
          {entry.logoUrl ? (
            <LazyImage
              src={entry.logoUrl}
              alt={entry.title}
              className="max-h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
            />
          ) : (
            <span className="text-sm font-body font-light text-stone group-hover:text-charcoal transition-colors duration-300">
              {entry.title}
            </span>
          )}
        </a>
      ))}
    </div>
  )
}
