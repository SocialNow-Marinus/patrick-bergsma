import { useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '@/config/firebase'
import { useAllArtworks, addDocument, updateDocument, deleteDocument } from '@/hooks/useFirestore'
import type { Artwork } from '@/types'

export default function AdminArtworks() {
  const { seriesId } = useParams<{ seriesId: string }>()
  const { data: artworks, loading } = useAllArtworks(seriesId)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string[]>([])
  const [editing, setEditing] = useState<Artwork | null>(null)

  const onDrop = useCallback(async (files: File[]) => {
    if (!seriesId) return
    setUploading(true)
    setUploadProgress([])

    for (const file of files) {
      const name = file.name.replace(/\.[^/.]+$/, '')
      const ext = file.name.split('.').pop()
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const path = `artworks/${seriesId}/${slug}.${ext}`

      try {
        setUploadProgress((prev) => [...prev, `Uploading ${file.name}...`])
        const storageRef = ref(storage, path)
        await uploadBytes(storageRef, file)
        const imageUrl = await getDownloadURL(storageRef)

        // Generate thumbnail path (same image for now, can be optimized later)
        const thumbnailUrl = imageUrl

        await addDocument('artworks', {
          seriesId,
          seriesSlug: '',
          title: name.replace(/-/g, ' '),
          slug,
          imageUrl,
          thumbnailUrl,
          imagePath: path,
          thumbnailPath: path,
          dimensions: null,
          medium: null,
          year: null,
          order: artworks.length + files.indexOf(file),
          isVisible: true,
          isSelectedWork: false,
        })

        setUploadProgress((prev) =>
          prev.map((p) => (p.includes(file.name) ? `${file.name} uploaded` : p))
        )
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error)
        setUploadProgress((prev) =>
          prev.map((p) => (p.includes(file.name) ? `${file.name} FAILED` : p))
        )
      }
    }

    setUploading(false)
  }, [seriesId, artworks.length])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    disabled: uploading,
  })

  const handleDelete = async (artwork: Artwork) => {
    if (!confirm(`Delete "${artwork.title}"?`)) return
    try {
      if (artwork.imagePath) {
        await deleteObject(ref(storage, artwork.imagePath))
      }
    } catch { /* file might not exist */ }
    await deleteDocument('artworks', artwork.id)
  }

  const handleToggleSelected = async (artwork: Artwork) => {
    await updateDocument('artworks', artwork.id, { isSelectedWork: !artwork.isSelectedWork })
  }

  const handleToggleVisibility = async (artwork: Artwork) => {
    await updateDocument('artworks', artwork.id, { isVisible: !artwork.isVisible })
  }

  if (loading) return <div className="text-gray-500">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link to="/admin/series" className="text-gray-400 hover:text-gray-600 transition-colors">
            &larr;
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">Artworks</h1>
          <span className="text-sm text-gray-400">({artworks.length})</span>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 mb-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-gray-900 bg-gray-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600 text-sm">
          {uploading
            ? 'Uploading...'
            : isDragActive
              ? 'Drop images here...'
              : 'Drag & drop artwork images here, or click to select files'}
        </p>
      </div>

      {uploadProgress.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg text-sm space-y-1">
          {uploadProgress.map((msg, i) => (
            <p key={i} className={msg.includes('FAILED') ? 'text-red-600' : 'text-gray-600'}>
              {msg}
            </p>
          ))}
        </div>
      )}

      {/* Edit Form */}
      {editing && (
        <ArtworkEditForm artwork={editing} onClose={() => setEditing(null)} />
      )}

      {/* Artwork Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className={`bg-white rounded-lg border overflow-hidden ${
              !artwork.isVisible ? 'opacity-50' : ''
            } ${artwork.isSelectedWork ? 'border-yellow-400 ring-2 ring-yellow-100' : 'border-gray-200'}`}
          >
            <img
              src={artwork.thumbnailUrl || artwork.imageUrl}
              alt={artwork.title}
              className="w-full aspect-square object-cover"
            />
            <div className="p-3">
              <p className="text-sm font-medium text-gray-900 truncate">{artwork.title}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                <button
                  onClick={() => setEditing(artwork)}
                  className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggleSelected(artwork)}
                  className={`px-2 py-1 text-xs rounded ${
                    artwork.isSelectedWork
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {artwork.isSelectedWork ? 'Featured' : 'Feature'}
                </button>
                <button
                  onClick={() => handleToggleVisibility(artwork)}
                  className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
                >
                  {artwork.isVisible ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => handleDelete(artwork)}
                  className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArtworkEditForm({ artwork, onClose }: { artwork: Artwork; onClose: () => void }) {
  const [title, setTitle] = useState(artwork.title)
  const [dimensions, setDimensions] = useState(artwork.dimensions || '')
  const [medium, setMedium] = useState(artwork.medium || '')
  const [year, setYear] = useState(artwork.year?.toString() || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await updateDocument('artworks', artwork.id, {
      title,
      dimensions: dimensions || null,
      medium: medium || null,
      year: year ? parseInt(year) : null,
    })
    setSaving(false)
    onClose()
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Edit Artwork</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
          <input
            type="text"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
            placeholder="e.g., 50 x 35 x 25 cm"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Medium</label>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            placeholder="e.g., Mixed media"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g., 2024"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button onClick={onClose} className="px-4 py-2 text-gray-600 text-sm">
          Cancel
        </button>
      </div>
    </div>
  )
}
