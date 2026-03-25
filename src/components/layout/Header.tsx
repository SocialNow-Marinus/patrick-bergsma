import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSiteSettings } from '@/hooks/useFirestore'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { data: settings } = useSiteSettings()

  // Use Firebase logo URL if available, otherwise fallback to local
  const logoSrc = settings?.logoUrl || '/branding/logo.png'
  const logoSrcSet = settings?.logoUrl
    ? undefined  // Firebase serves single optimized image
    : '/branding/logo.png 1x, /branding/logo-2x.png 2x'

  // Dynamic Instagram URL from settings
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/patrickbergsma.nl/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const navLinks = [
    { to: '/', label: 'Work' },
    { to: '/resume-media', label: 'Resume & Media' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gallery-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between h-20 md:h-24">
        {/* Logo */}
        <Link
          to="/"
          className="group relative flex items-center gap-3"
        >
          <img
            src={logoSrc}
            srcSet={logoSrcSet}
            alt="PB"
            className="h-10 md:h-12 w-auto"
          />
          <div>
            <span className="font-display text-xl md:text-2xl font-light tracking-wide text-charcoal">
              Patrick Bergsma
            </span>
            <span className="block text-[10px] uppercase tracking-[0.3em] text-stone font-body font-light mt-[-2px]">
              Visual Artist
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-[13px] uppercase tracking-[0.2em] font-body font-light transition-colors duration-300 link-underline ${
                location.pathname === link.to
                  ? 'text-charcoal'
                  : 'text-stone hover:text-charcoal'
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-charcoal" />
              )}
            </Link>
          ))}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone hover:text-charcoal transition-colors duration-300 instagram-glow"
            aria-label="Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label="Menu"
        >
          <span className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-20 bg-gallery-white z-40 transition-all duration-500 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-display text-3xl font-light text-charcoal"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone text-sm uppercase tracking-[0.3em] font-light mt-4 flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Instagram
          </a>
        </div>
      </div>
    </header>
  )
}
