import { useState } from 'react'
import { useCvEntries, addDocument, updateDocument, deleteDocument } from '@/hooks/useFirestore'
import { CV_CATEGORIES, type CvEntry } from '@/types'

export default function AdminCv() {
  const { data: entries, loading } = useCvEntries()
  const [activeTab, setActiveTab] = useState<string>('education')
  const [editing, setEditing] = useState<CvEntry | null>(null)
  const [creating, setCreating] = useState(false)

  const filteredEntries = entries.filter((e) => e.category === activeTab)

  const handleDelete = async (entry: CvEntry) => {
    if (!confirm(`Delete "${entry.title}"?`)) return
    await deleteDocument('cvEntries', entry.id)
  }

  if (loading) return <div className="text-gray-500">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">CV / Resume</h1>
        <button
          onClick={() => setCreating(true)}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          + New Entry
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1 mb-6 border-b border-gray-200">
        {CV_CATEGORIES.map((cat) => {
          const count = entries.filter((e) => e.category === cat.key).length
          return (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === cat.key
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {cat.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Form */}
      {(creating || editing) && (
        <CvEntryForm
          entry={editing}
          category={activeTab}
          existingCount={filteredEntries.length}
          onClose={() => { setEditing(null); setCreating(false) }}
        />
      )}

      {/* Entries List */}
      <div className="space-y-2">
        {filteredEntries.map((entry) => (
          <div key={entry.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">{entry.title}</p>
              <div className="flex gap-2 text-sm text-gray-500">
                {entry.subtitle && <span>{entry.subtitle}</span>}
                {entry.year && <span>({entry.year})</span>}
              </div>
            </div>
            <button
              onClick={() => setEditing(entry)}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(entry)}
              className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
        {filteredEntries.length === 0 && (
          <p className="text-gray-400 text-sm py-8 text-center">No entries yet. Add one above.</p>
        )}
      </div>
    </div>
  )
}

function CvEntryForm({
  entry,
  category,
  existingCount,
  onClose,
}: {
  entry: CvEntry | null
  category: string
  existingCount: number
  onClose: () => void
}) {
  const [title, setTitle] = useState(entry?.title || '')
  const [subtitle, setSubtitle] = useState(entry?.subtitle || '')
  const [year, setYear] = useState(entry?.year || '')
  const [url, setUrl] = useState(entry?.url || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!title.trim()) return
    setSaving(true)

    const data = {
      category: entry?.category || category,
      title,
      subtitle: subtitle || null,
      year: year || null,
      url: url || null,
      logoUrl: entry?.logoUrl || null,
      logoPath: entry?.logoPath || null,
      order: entry?.order ?? existingCount,
    }

    if (entry) {
      await updateDocument('cvEntries', entry.id, data)
    } else {
      await addDocument('cvEntries', data)
    }

    setSaving(false)
    onClose()
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {entry ? 'Edit Entry' : 'New Entry'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='e.g., "Royal Academy the Hague" or "PAN Amsterdam"'
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle / Location</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder='e.g., "Galerie Franzis Engels, Amsterdam"'
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder='e.g., "2024" or "1992-1996"'
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">URL (optional)</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
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
        <button onClick={onClose} className="px-4 py-2 text-gray-600 text-sm">Cancel</button>
      </div>
    </div>
  )
}
