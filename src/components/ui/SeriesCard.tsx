import { Link } from 'react-router-dom'
import LazyImage from './LazyImage'
import type { Series } from '@/types'

interface SeriesCardProps {
  series: Series
  index: number
}

export default function SeriesCard({ series, index }: SeriesCardProps) {
  return (
    <Link
      to={`/series/${series.slug}`}
      className={`group block reveal-on-scroll stagger-${index + 1}`}
    >
      <div className="relative overflow-hidden">
        {/* Image — tall aspect ratio to show artwork prominently */}
        <LazyImage
          src={series.heroImageUrl}
          alt={series.title}
          className="w-full aspect-[3/4] transition-all duration-1000 ease-out group-hover:scale-[1.05]"
          objectFit="cover"
        />

        {/* Full gradient overlay — cinematic bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-charcoal/5 group-hover:from-charcoal/70 transition-all duration-700" />

        {/* Top-right work count badge */}
        <div className="absolute top-4 right-4 md:top-5 md:right-5">
          <span className="text-white/60 text-[10px] uppercase tracking-[0.25em] font-body font-light backdrop-blur-sm bg-charcoal/10 px-3 py-1.5 rounded-full">
            {series.artworkCount} works
          </span>
        </div>

        {/* Bottom title area */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
          <h3 className="font-display text-2xl md:text-3xl font-light text-white drop-shadow-lg leading-tight">
            {series.title}
          </h3>
          {series.description && (
            <p className="mt-2 text-white/60 text-xs md:text-sm font-body font-light line-clamp-2 max-w-[90%]">
              {series.description}
            </p>
          )}
          {/* Explore arrow */}
          <div className="mt-3 flex items-center gap-2 text-white/50 group-hover:text-white/80 transition-all duration-500">
            <span className="text-[10px] uppercase tracking-[0.25em] font-body font-light">
              Explore
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
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
