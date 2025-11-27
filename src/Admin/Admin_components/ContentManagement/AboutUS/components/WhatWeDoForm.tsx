type WhatWeDoValues = {
  title: string
  description: string
}

type WhatWeDoFormProps = {
  values: WhatWeDoValues
  submitting: boolean
  onChange: (changes: Partial<WhatWeDoValues>) => void
  onSubmit: () => void
  editing: boolean
  onEditToggle: () => void
  onCancel: () => void
}

export default function WhatWeDoForm({
  values,
  submitting,
  onChange,
  onSubmit,
  editing,
  onEditToggle,
  onCancel,
}: WhatWeDoFormProps) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Title</p>
          <h2 className="text-2xl font-semibold text-gray-900">{values.title || 'Title'}</h2>
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

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-800">Title</label>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            value={values.title}
            onChange={(e) => onChange({ title: e.target.value })}
            disabled={!editing || submitting}
            placeholder="Title"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-800">Description</label>
          <textarea
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            rows={6}
            value={values.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Describe your craft..."
            disabled={!editing || submitting}
          />
        </div>
      </div>
    </section>
  )
}

