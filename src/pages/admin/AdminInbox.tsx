import { useState } from 'react'
import { useContactSubmissions, updateDocument } from '@/hooks/useFirestore'
import type { ContactSubmission } from '@/types'

export default function AdminInbox() {
  const [showArchived, setShowArchived] = useState(false)
  const { data: submissions, loading } = useContactSubmissions(showArchived)
  const [selected, setSelected] = useState<ContactSubmission | null>(null)

  const handleMarkRead = async (sub: ContactSubmission) => {
    await updateDocument('contactSubmissions', sub.id, { isRead: !sub.isRead })
  }

  const handleArchive = async (sub: ContactSubmission) => {
    await updateDocument('contactSubmissions', sub.id, { isArchived: true })
    setSelected(null)
  }

  if (loading) return <div className="text-gray-500">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Inbox</h1>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowArchived(false); setSelected(null) }}
            className={`px-3 py-1.5 text-sm rounded-lg ${
              !showArchived ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => { setShowArchived(true); setSelected(null) }}
            className={`px-3 py-1.5 text-sm rounded-lg ${
              showArchived ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Archived
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
        {/* Message List */}
        <div className="space-y-2">
          {submissions.length === 0 ? (
            <p className="text-gray-400 text-sm py-8 text-center">
              {showArchived ? 'No archived messages.' : 'No messages yet.'}
            </p>
          ) : (
            submissions.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  setSelected(sub)
                  if (!sub.isRead) handleMarkRead(sub)
                }}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selected?.id === sub.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                } ${!sub.isRead ? 'border-l-4 border-l-blue-500' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${!sub.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                    {sub.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {sub.createdAt?.toDate?.()?.toLocaleDateString('nl-NL') || ''}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">{sub.subject}</p>
              </button>
            ))
          )}
        </div>

        {/* Message Detail */}
        {selected && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{selected.subject}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  From: {selected.name} ({selected.email})
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {selected.createdAt?.toDate?.()?.toLocaleString('nl-NL') || ''}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {selected.message}
              </p>
            </div>

            <div className="flex gap-2">
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
              >
                Reply via Email
              </a>
              {!showArchived && (
                <button
                  onClick={() => handleArchive(selected)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
                >
                  Archive
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
