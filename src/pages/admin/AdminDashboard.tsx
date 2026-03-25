import { Link } from 'react-router-dom'
import { useAllSeries, useUnreadCount } from '@/hooks/useFirestore'

export default function AdminDashboard() {
  const { data: series } = useAllSeries()
  const unreadCount = useUnreadCount()

  const totalArtworks = series.reduce((sum, s) => sum + (s.artworkCount || 0), 0)

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Series" value={series.length} link="/admin/series" />
        <DashboardCard title="Total Artworks" value={totalArtworks} link="/admin/series" />
        <DashboardCard
          title="Unread Messages"
          value={unreadCount}
          link="/admin/inbox"
          highlight={unreadCount > 0}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link
            to="/admin/series"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm text-gray-700"
          >
            <span className="text-lg">🖼</span>
            Manage Series & Artworks
          </Link>
          <Link
            to="/admin/cv"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm text-gray-700"
          >
            <span className="text-lg">📄</span>
            Edit CV / Resume
          </Link>
          <Link
            to="/admin/inbox"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm text-gray-700"
          >
            <span className="text-lg">📬</span>
            View Messages {unreadCount > 0 && `(${unreadCount} new)`}
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm text-gray-700"
          >
            <span className="text-lg">⚙</span>
            Site Settings
          </Link>
        </div>
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  value,
  link,
  highlight = false,
}: {
  title: string
  value: number
  link: string
  highlight?: boolean
}) {
  return (
    <Link
      to={link}
      className={`p-6 rounded-xl border transition-all hover:shadow-sm ${
        highlight
          ? 'bg-red-50 border-red-200 hover:border-red-300'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className={`text-3xl font-semibold ${highlight ? 'text-red-600' : 'text-gray-900'}`}>
        {value}
      </p>
    </Link>
  )
}
