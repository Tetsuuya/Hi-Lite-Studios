import type { ChangeEvent } from 'react'

type MainDetailsValues = {
  main_image_url: string
  description: string
}

type MainDetailsFormProps = {
  values: MainDetailsValues
  onChange: (changes: Partial<MainDetailsValues>) => void
  onSubmit: () => void
  onImageUpload: (file: File) => void
  submitting: boolean
  uploadingImage: boolean
  editing: boolean
  onEditToggle: () => void
  onCancel: () => void
}

export default function MainDetailsForm({
  values,
  onChange,
  onSubmit,
  onImageUpload,
  submitting,
  uploadingImage,
  editing,
  onEditToggle,
  onCancel,
}: MainDetailsFormProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onImageUpload(file)
      event.target.value = ''
    }
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Main & Description
          </p>
          <h2 className="text-2xl font-semibold text-gray-900">
            {values.description ? 'About Hi-Lite' : 'Main Section'}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {editing ? (
            <>
              <button
                type="button"
                onClick={onSubmit}
                disabled={submitting}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                disabled={submitting}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onEditToggle}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr,3fr]">
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-800">Main image URL</label>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            value={values.main_image_url}
            onChange={(e) => onChange({ main_image_url: e.target.value })}
            placeholder="Paste image link..."
            disabled={!editing || submitting}
          />
          <label className="inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50">
            <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={!editing || uploadingImage || submitting}
            />
          </label>

          {values.main_image_url ? (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
              <img src={values.main_image_url} alt="About Us" className="h-64 w-full object-cover" />
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-gray-300 text-sm text-gray-400">
              No image selected yet.
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-800">Description</label>
          {editing ? (
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              rows={9}
              value={values.description}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Share your story..."
              disabled={submitting}
            />
          ) : (
            <p className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
              {values.description || 'No description yet.'}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

