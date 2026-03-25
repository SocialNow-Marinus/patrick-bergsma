import { Timestamp } from 'firebase/firestore'

export interface Series {
  id: string
  title: string
  slug: string
  description: string
  heroImageUrl: string
  heroImagePath: string
  order: number
  artworkCount: number
  isVisible: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Artwork {
  id: string
  seriesId: string
  seriesSlug: string
  title: string
  slug: string
  imageUrl: string
  thumbnailUrl: string
  imagePath: string
  thumbnailPath: string
  dimensions: string | null
  medium: string | null
  year: number | null
  order: number
  isVisible: boolean
  isSelectedWork: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CvEntry {
  id: string
  category: 'education' | 'award' | 'solo_exhibition' | 'group_exhibition' | 'public_collection' | 'media'
  title: string
  subtitle: string | null
  year: string | null
  url: string | null
  logoUrl: string | null
  logoPath: string | null
  order: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  isRead: boolean
  isArchived: boolean
  createdAt: Timestamp
}

export interface SiteSettings {
  siteTitle: string
  siteSubtitle: string
  contactEmail: string
  contactPhone: string
  address: string
  instagramUrl: string
  galleryName: string
  galleryUrl: string
  birthYear: number
  birthPlace: string
  metaDescription: string
  logoUrl: string | null
  logoPath: string | null
  updatedAt: Timestamp
}

export const CV_CATEGORIES = [
  { key: 'education' as const, label: 'Education' },
  { key: 'award' as const, label: 'Awards & Recognition' },
  { key: 'solo_exhibition' as const, label: 'Solo Exhibitions' },
  { key: 'group_exhibition' as const, label: 'Group Exhibitions' },
  { key: 'public_collection' as const, label: 'Public Collections' },
  { key: 'media' as const, label: 'Media' },
]
