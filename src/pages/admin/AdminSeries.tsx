import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAllSeries, addDocument, updateDocument, deleteDocument } from '@/hooks/useFirestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '@/config/firebase'
import type { Series } from '@/types'

export default function AdminSeries() {
  const { data: series, loading } = useAllSeries()
  const [editing, setEditing] = useState<Series | null>(null)
  const [creating, setCreating] = useState(false)

  const handleDelete = async (s: Series) => {
    if (!confirm(`Delete "${s.title}" and all its artworks?`)) return
    await deleteDocument('series', s.id)
  }

  const handleToggleVisibility = async (s: Series) => {
    await updateDocument('series', s.id, { isVisible: !s.isVisible })
  }

  if (loading) return <div className="text-gray-500">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Series</h1>
        <button
          onClick={() => setCreating(true)}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          + New Series
        </button>
      </div>

      {(creating || editing) && (
        <SeriesForm
          series={editing}
          existingCount={series.length}
          onClose={() => { setEditing(null); setCreating(false) }}
        />
      )}

      <div className="space-y-3">
        {series.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            {s.heroImageUrl && (
              <img src={s.heroImageUrl} alt={s.title} className="w-20 h-14 object-cover rounded-lg" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.artworkCount || 0} works</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleVisibility(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  s.isVisible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {s.isVisible ? 'Visible' : 'Hidden'}
              </button>
              <Link
                to={`/admin/series/${s.id}/artworks`}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Artworks
              </Link>
              <button
                onClick={() => setEditing(s)}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s)}
                className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SeriesForm({
  series,
  existingCount,
  onClose,
}: {
  series: Series | null
  existingCount: number
  onClose: () => void
}) {
  const [title, setTitle] = useState(series?.title || '')
  const [slug, setSlug] = useState(series?.slug || '')
  const [description, setDescription] = useState(series?.description || '')
  const [heroFile, setHeroFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  const generateSlug = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!series) setSlug(generateSlug(value))
  }

  const handleSave = async () => {
    if (!title.trim()) return
    setSaving(true)

    try {
      let heroImageUrl = series?.heroImageUrl || ''
      let heroImagePath = series?.heroImagePath || ''

      if (heroFile) {
        const path = `series/${slug || generateSlug(title)}/hero.${heroFile.name.split('.').pop()}`
        const storageRef = ref(storage, path)
        await uploadBytes(storageRef, heroFile)
        heroImageUrl = await getDownloadURL(storageRef)
        heroImagePath = path

        if (series?.heroImagePath) {
          try { await deleteObject(ref(storage, series.heroImagePath)) } catch { /* ok */ }
        }
      }

      const data = {
        title,
        slug: slug || generateSlug(title),
        description,
        heroImageUrl,
        heroImagePath,
        isVisible: series?.isVisible ?? true,
        order: series?.order ?? existingCount,
        artworkCount: series?.artworkCount ?? 0,
      }

      if (series) {
        await updateDocument('series', series.id, data)
      } else {
        await addDocument('series', data)
      }

      onClose()
    } catch (error) {
      console.error('Error saving series:', error)
      alert('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {series ? 'Edit Series' : 'New Series'}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 font-mono"
            placeholder="auto-generated-from-title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
          {series?.heroImageUrl && !heroFile && (
            <img src={series.heroImageUrl} alt="Current hero" className="w-40 h-28 object-cover rounded-lg mb-2" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setHeroFile(e.target.files?.[0] || null)}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
