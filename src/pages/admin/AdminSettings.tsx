import { useState, useEffect, useRef } from 'react'
import { useSiteSettings } from '@/hooks/useFirestore'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '@/config/firebase'

export default function AdminSettings() {
  const { data: settings, loading } = useSiteSettings()
  const [form, setForm] = useState({
    siteTitle: '',
    siteSubtitle: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    instagramUrl: '',
    galleryName: '',
    galleryUrl: '',
    metaDescription: '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [logoPath, setLogoPath] = useState<string | null>(null)
  const [logoUploading, setLogoUploading] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (settings) {
      setForm({
        siteTitle: settings.siteTitle || '',
        siteSubtitle: settings.siteSubtitle || '',
        contactEmail: settings.contactEmail || '',
        contactPhone: settings.contactPhone || '',
        address: settings.address || '',
        instagramUrl: settings.instagramUrl || '',
        galleryName: settings.galleryName || '',
        galleryUrl: settings.galleryUrl || '',
        metaDescription: settings.metaDescription || '',
      })
      setLogoUrl(settings.logoUrl || null)
      setLogoPath(settings.logoPath || null)
    }
  }, [settings])

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLogoUploading(true)
    try {
      // Delete old logo if it exists
      if (logoPath) {
        try { await deleteObject(ref(storage, logoPath)) } catch { /* ignore */ }
      }

      const ext = file.name.split('.').pop()?.toLowerCase() || 'png'
      const path = `branding/logo.${ext}`
      const storageRef = ref(storage, path)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)

      setLogoUrl(url)
      setLogoPath(path)

      // Save to Firestore immediately
      await setDoc(doc(db, 'siteSettings', 'general'), {
        logoUrl: url,
        logoPath: path,
        updatedAt: serverTimestamp(),
      }, { merge: true })
    } catch (error) {
      console.error('Error uploading logo:', error)
      alert('Failed to upload logo.')
    } finally {
      setLogoUploading(false)
      if (logoInputRef.current) logoInputRef.current.value = ''
    }
  }

  const handleLogoDelete = async () => {
    if (!logoPath || !confirm('Remove logo?')) return

    try {
      await deleteObject(ref(storage, logoPath))
      setLogoUrl(null)
      setLogoPath(null)

      await setDoc(doc(db, 'siteSettings', 'general'), {
        logoUrl: null,
        logoPath: null,
        updatedAt: serverTimestamp(),
      }, { merge: true })
    } catch (error) {
      console.error('Error deleting logo:', error)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)

    try {
      await setDoc(doc(db, 'siteSettings', 'general'), {
        ...form,
        logoUrl,
        logoPath,
        updatedAt: serverTimestamp(),
      }, { merge: true })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings.')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  if (loading) return <div className="text-gray-500">Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Settings</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        <div className="space-y-5">
          {/* Logo Upload */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Logo</h3>
            <div className="flex items-center gap-4">
              {logoUrl ? (
                <div className="flex items-center gap-4">
                  <img src={logoUrl} alt="Logo" className="h-14 w-auto bg-gray-50 rounded-lg p-2" />
                  <button
                    onClick={handleLogoDelete}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="h-14 w-14 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                  No logo
                </div>
              )}
              <div>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className={`inline-block px-3 py-1.5 text-sm border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 ${
                    logoUploading ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  {logoUploading ? 'Uploading...' : logoUrl ? 'Replace' : 'Upload Logo'}
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
          <div className="grid grid-cols-2 gap-4">
            <SettingsField label="Site Title" value={form.siteTitle} onChange={(v) => updateField('siteTitle', v)} />
            <SettingsField label="Subtitle" value={form.siteSubtitle} onChange={(v) => updateField('siteSubtitle', v)} />
          </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <SettingsField label="Email" value={form.contactEmail} onChange={(v) => updateField('contactEmail', v)} />
              <SettingsField label="Phone" value={form.contactPhone} onChange={(v) => updateField('contactPhone', v)} />
            </div>
            <div className="mt-4">
              <SettingsField label="Address" value={form.address} onChange={(v) => updateField('address', v)} />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Social & Gallery</h3>
            <div className="grid grid-cols-2 gap-4">
              <SettingsField label="Instagram URL" value={form.instagramUrl} onChange={(v) => updateField('instagramUrl', v)} />
              <SettingsField label="Gallery Name" value={form.galleryName} onChange={(v) => updateField('galleryName', v)} />
            </div>
            <div className="mt-4">
              <SettingsField label="Gallery URL" value={form.galleryUrl} onChange={(v) => updateField('galleryUrl', v)} />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">SEO</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea
                value={form.metaDescription}
                onChange={(e) => updateField('metaDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {saved && (
            <span className="text-sm text-green-600">Settings saved!</span>
          )}
        </div>
      </div>
    </div>
  )
}

function SettingsField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
    </div>
  )
}
