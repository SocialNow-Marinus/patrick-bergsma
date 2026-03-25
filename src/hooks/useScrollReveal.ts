import { useEffect, useRef } from 'react'

function setupReveal(elements: Element[], observer: IntersectionObserver) {
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect()
    // Immediately reveal elements already in viewport
    if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
      el.classList.add('revealed')
    } else {
      observer.observe(el)
    }
  })
}

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = Array.from(el.querySelectorAll('.reveal-on-scroll'))
    if (children.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.01, rootMargin: '100px 0px 0px 0px' }
    )

    // Double-check: rAF for immediate viewport check, plus small delay fallback
    // This ensures elements visible on page load are revealed even if layout isn't final
    requestAnimationFrame(() => {
      setupReveal(children, observer)
    })

    // Fallback: re-check after a brief delay for navigation/transition cases
    const fallbackTimer = setTimeout(() => {
      children.forEach((child) => {
        if (!child.classList.contains('revealed')) {
          const rect = child.getBoundingClientRect()
          if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
            child.classList.add('revealed')
          }
        }
      })
    }, 150)

    return () => {
      observer.disconnect()
      clearTimeout(fallbackTimer)
    }
  }, [])

  return ref
}

export function useElementReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.classList.add('reveal-on-scroll')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold: 0.01, rootMargin: '100px 0px 0px 0px' }
    )

    requestAnimationFrame(() => {
      setupReveal([el], observer)
    })

    const fallbackTimer = setTimeout(() => {
      if (!el.classList.contains('revealed')) {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
          el.classList.add('revealed')
        }
      }
    }, 150)

    return () => {
      observer.disconnect()
      clearTimeout(fallbackTimer)
    }
  }, [])

  return ref
}
