import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center page-enter">
        <p className="text-[11px] uppercase tracking-[0.3em] text-stone font-body font-light mb-4">
          404
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-light text-charcoal mb-6">
          Page Not Found
        </h1>
        <p className="text-stone font-body font-light mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-body font-light text-charcoal hover:text-accent transition-colors duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  )
}
