import { useState, useEffect } from 'react'
import {
  collection, doc, query, where, orderBy, onSnapshot,
  addDoc, updateDoc, deleteDoc,
  type DocumentData, type QueryConstraint, serverTimestamp
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { Series, Artwork, CvEntry, ContactSubmission, SiteSettings } from '@/types'
import { demoSeries, demoArtworks, demoCvEntries, demoSettings } from '@/data/demoData'

// Check if Firebase is configured with real credentials
const isFirebaseConfigured = import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== 'PLACEHOLDER'

function useCollection<T>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
  enabled = true
) {
  const [data, setData] = useState<T[]>([])
  // Start with loading: false when in demo mode to prevent flash
  const [loading, setLoading] = useState(isFirebaseConfigured && enabled)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }

    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }

    const q = query(collection(db, collectionName), ...constraints)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[]
        setData(items)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [collectionName, enabled])

  return { data, loading, error }
}

function useDocument<T>(collectionName: string, docId: string, enabled = true) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(isFirebaseConfigured && enabled)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!enabled || !docId) {
      setLoading(false)
      return
    }

    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }

    const unsubscribe = onSnapshot(
      doc(db, collectionName, docId),
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() } as T)
        } else {
          setData(null)
        }
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [collectionName, docId, enabled])

  return { data, loading, error }
}

// Public hooks — with demo fallback
export function useSeries() {
  const result = useCollection<Series>('series', [
    where('isVisible', '==', true),
    orderBy('order', 'asc'),
  ])

  if (!isFirebaseConfigured) {
    return {
      data: demoSeries.filter(s => s.isVisible) as Series[],
      loading: false,
      error: null,
    }
  }

  return result
}

export function useAllSeries() {
  const result = useCollection<Series>('series', [orderBy('order', 'asc')])

  if (!isFirebaseConfigured) {
    return {
      data: demoSeries as Series[],
      loading: false,
      error: null,
    }
  }

  return result
}

export function useSeriesBySlug(slug: string) {
  // For demo mode: resolve data immediately to avoid loading flash
  const initialSeries = !isFirebaseConfigured && slug
    ? (demoSeries.find(s => s.slug === slug) as Series | null) ?? null
    : null
  const [series, setSeries] = useState<Series | null>(initialSeries)
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!slug) return

    if (!isFirebaseConfigured) {
      const found = demoSeries.find(s => s.slug === slug) || null
      setSeries(found as Series | null)
      setLoading(false)
      return
    }

    const q = query(collection(db, 'series'), where('slug', '==', slug))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0]
        setSeries({ id: doc.id, ...doc.data() } as Series)
      } else {
        setSeries(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [slug])

  return { series, loading }
}

export function useArtworks(seriesSlug: string) {
  const result = useCollection<Artwork>('artworks', [
    where('seriesSlug', '==', seriesSlug),
    where('isVisible', '==', true),
    orderBy('order', 'asc'),
  ], !!seriesSlug)

  if (!isFirebaseConfigured) {
    return {
      data: demoArtworks.filter(a => a.seriesSlug === seriesSlug && a.isVisible) as Artwork[],
      loading: false,
      error: null,
    }
  }

  return result
}

export function useAllArtworks(seriesId?: string) {
  const constraints: QueryConstraint[] = seriesId
    ? [where('seriesId', '==', seriesId), orderBy('order', 'asc')]
    : [orderBy('order', 'asc')]
  const result = useCollection<Artwork>('artworks', constraints)

  if (!isFirebaseConfigured) {
    const filtered = seriesId
      ? demoArtworks.filter(a => a.seriesId === seriesId)
      : demoArtworks
    return {
      data: filtered as Artwork[],
      loading: false,
      error: null,
    }
  }

  return result
}

export function useSelectedWorks() {
  const result = useCollection<Artwork>('artworks', [
    where('isSelectedWork', '==', true),
    where('isVisible', '==', true),
    orderBy('order', 'asc'),
  ])

  if (!isFirebaseConfigured) {
    return {
      data: demoArtworks.filter(a => a.isSelectedWork && a.isVisible) as Artwork[],
      loading: false,
      error: null,
    }
  }

  return result
}

export function useCvEntries(category?: string) {
  const constraints: QueryConstraint[] = category
    ? [where('category', '==', category), orderBy('order', 'asc')]
    : [orderBy('category', 'asc'), orderBy('order', 'asc')]
  const result = useCollection<CvEntry>('cvEntries', constraints)

  if (!isFirebaseConfigured) {
    const filtered = category
      ? demoCvEntries.filter(e => e.category === category)
      : demoCvEntries
    return {
      data: filtered as CvEntry[],
      loading: false,
      error: null,
    }
  }

  return result
}

export function useContactSubmissions(archived = false) {
  return useCollection<ContactSubmission>('contactSubmissions', [
    where('isArchived', '==', archived),
    orderBy('createdAt', 'desc'),
  ])
}

export function useUnreadCount() {
  const { data } = useCollection<ContactSubmission>('contactSubmissions', [
    where('isRead', '==', false),
    where('isArchived', '==', false),
  ])
  return data.length
}

export function useSiteSettings() {
  const result = useDocument<SiteSettings>('siteSettings', 'general')

  if (!isFirebaseConfigured) {
    return {
      data: demoSettings as SiteSettings,
      loading: false,
      error: null,
    }
  }

  return result
}

// Write operations
export async function addDocument(collectionName: string, data: DocumentData) {
  return addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateDocument(collectionName: string, docId: string, data: DocumentData) {
  return updateDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteDocument(collectionName: string, docId: string) {
  return deleteDoc(doc(db, collectionName, docId))
}

export async function submitContactForm(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  return addDoc(collection(db, 'contactSubmissions'), {
    ...data,
    isRead: false,
    isArchived: false,
    createdAt: serverTimestamp(),
  })
}

export async function reorderDocuments(
  collectionName: string,
  items: { id: string; order: number }[]
) {
  const promises = items.map(({ id, order }) =>
    updateDoc(doc(db, collectionName, id), { order, updatedAt: serverTimestamp() })
  )
  return Promise.all(promises)
}
