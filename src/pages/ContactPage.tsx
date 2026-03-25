import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { submitContactForm, useSiteSettings } from '@/hooks/useFirestore'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const heroRef = useScrollReveal<HTMLElement>()
  const formRef = useScrollReveal<HTMLElement>()
  const { data: settings } = useSiteSettings()

  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/patrickbergsma.nl/'
  const contactEmail = settings?.contactEmail || 'info@patrickbergsma.nl'
  const contactPhone = settings?.contactPhone || '06-55 88 59 63'
  const galleryName = settings?.galleryName || 'Galerie Franzis Engels'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    try {
      setError(null)
      await submitContactForm(data)
      setSubmitted(true)
      reset()
    } catch {
      setError('Something went wrong. Please try again or send an email directly.')
    }
  }

  return (
    <div className="page-enter">
      {/* Header */}
      <section ref={heroRef} className="px-4 md:px-8 lg:px-12 py-16 md:py-24 max-w-[1600px] mx-auto">
        <div className="reveal-on-scroll">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal mb-4">
            Contact
          </h1>
          <p className="text-base font-body font-light text-stone max-w-xl">
            Feel free to reach out for inquiries about artworks, exhibitions, or collaborations.
          </p>
        </div>
      </section>

      {/* Content */}
      <section ref={formRef} className="px-4 md:px-8 lg:px-12 pb-24 md:pb-32 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 md:gap-0">
          {/* Contact Form */}
          <div className="reveal-on-scroll stagger-1">
            {submitted ? (
              <div className="py-16 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gallery-cream mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl font-light text-charcoal mb-3">
                  Message Sent
                </h2>
                <p className="text-stone font-body font-light">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-body font-light text-accent hover:text-accent-dark transition-colors duration-300 underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-stone font-body font-light mb-2">
                    Name
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full bg-transparent border-b border-gallery-cream focus:border-charcoal text-charcoal font-body font-light py-3 outline-none transition-colors duration-300 placeholder:text-stone-light"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500 font-light">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-stone font-body font-light mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                    })}
                    className="w-full bg-transparent border-b border-gallery-cream focus:border-charcoal text-charcoal font-body font-light py-3 outline-none transition-colors duration-300 placeholder:text-stone-light"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500 font-light">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-stone font-body font-light mb-2">
                    Subject
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full bg-transparent border-b border-gallery-cream focus:border-charcoal text-charcoal font-body font-light py-3 outline-none transition-colors duration-300 placeholder:text-stone-light"
                    placeholder="Regarding..."
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-500 font-light">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-stone font-body font-light mb-2">
                    Message
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={5}
                    className="w-full bg-transparent border-b border-gallery-cream focus:border-charcoal text-charcoal font-body font-light py-3 outline-none transition-colors duration-300 resize-none placeholder:text-stone-light"
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500 font-light">{errors.message.message}</p>
                  )}
                </div>

                {error && (
                  <p className="text-sm text-red-500 font-light">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] font-body font-light text-charcoal hover:text-accent-dark transition-colors duration-300 pt-4 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:flex justify-center px-12 lg:px-16">
            <div className="w-px h-full bg-gallery-cream" />
          </div>

          {/* Contact Info */}
          <div className="reveal-on-scroll stagger-2">
            <div className="space-y-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-stone font-body font-light mb-3">
                  Email
                </p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-base font-body font-light text-charcoal hover:text-accent transition-colors duration-300"
                >
                  {contactEmail}
                </a>
              </div>

              {contactPhone && (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-stone font-body font-light mb-3">
                    Phone
                  </p>
                  <a
                    href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
                    className="text-base font-body font-light text-charcoal hover:text-accent transition-colors duration-300"
                  >
                    {contactPhone}
                  </a>
                </div>
              )}

              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-stone font-body font-light mb-3">
                  Studio
                </p>
                <p className="text-base font-body font-light text-charcoal leading-relaxed">
                  Van der Valckertlaan 32<br />
                  1701KR Heerhugowaard<br />
                  The Netherlands
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-stone font-body font-light mb-3">
                  Represented by
                </p>
                <p className="text-base font-body font-light text-charcoal">
                  {galleryName}, Amsterdam
                </p>
              </div>

              <div className="pt-4">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
                    </svg>
                  </div>
                  <span className="text-sm font-body font-light text-stone group-hover:text-charcoal transition-colors duration-300">
                    Follow on Instagram
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
