import { Link } from 'react-router-dom'
import { useSiteSettings } from '@/hooks/useFirestore'

export default function Footer() {
  const { data: settings } = useSiteSettings()

  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/patrickbergsma.nl/'
  const contactEmail = settings?.contactEmail || 'info@patrickbergsma.nl'
  const contactPhone = settings?.contactPhone || '06-55 88 59 63'
  const address = settings?.address || 'Van der Valckertlaan 32\n1701KR Heerhugowaard'
  const galleryName = settings?.galleryName || 'Galerie Franzis Engels'
  const galleryUrl = settings?.galleryUrl || 'https://www.franzisengels.nl/'

  return (
    <footer className="bg-charcoal text-gallery-white">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-light mb-2">
              Patrick Bergsma
            </h3>
            <p className="text-stone-light text-sm font-light mb-6">Visual Artist</p>
            {/* Instagram CTA */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
                </svg>
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-stone-light group-hover:text-white transition-colors duration-300 font-body font-light">
                Follow on Instagram
              </span>
            </a>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-stone-light mb-4 font-body">
              Contact
            </p>
            <div className="space-y-2 text-sm font-light">
              <a
                href={`mailto:${contactEmail}`}
                className="block text-gallery-cream hover:text-white transition-all duration-300 footer-link"
              >
                {contactEmail}
              </a>
              {contactPhone && (
                <a
                  href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
                  className="block text-gallery-cream hover:text-white transition-all duration-300 footer-link"
                >
                  {contactPhone}
                </a>
              )}
              <p className="text-stone-light whitespace-pre-line">
                {address}
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-stone-light mb-4 font-body">
              Navigate
            </p>
            <div className="space-y-2 text-sm font-light">
              <Link to="/" className="block text-gallery-cream hover:text-white transition-all duration-300 footer-link">
                Work
              </Link>
              <Link to="/resume-media" className="block text-gallery-cream hover:text-white transition-all duration-300 footer-link">
                Resume & Media
              </Link>
              <Link to="/contact" className="block text-gallery-cream hover:text-white transition-all duration-300 footer-link">
                Contact
              </Link>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gallery-cream hover:text-white transition-all duration-300 footer-link"
              >
                Instagram
              </a>
              {galleryUrl && (
                <a
                  href={galleryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gallery-cream hover:text-white transition-all duration-300 footer-link"
                >
                  {galleryName}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone text-xs font-light">
            &copy; {new Date().getFullYear()} Patrick Bergsma. All rights reserved.
          </p>
          <p className="text-stone/50 text-xs font-light">
            Represented by {galleryName}, Amsterdam
          </p>
        </div>
      </div>
    </footer>
  )
}
