export interface MediaItem {
  id: string
  image_url: string
}

interface MediaGalleryProps {
  media: MediaItem[]
  uploading?: boolean
  onDelete?: (mediaId: string) => Promise<void> | void
  emptyMessage?: string
  columns?: number
}

export default function MediaGallery({
  media,
  uploading = false,
  onDelete,
  emptyMessage = 'No media added yet.',
  columns = 4,
}: MediaGalleryProps) {
  const handleDelete = async (mediaId: string) => {
    if (!onDelete) return
    if (confirm('Are you sure you want to delete this image?')) {
      await onDelete(mediaId)
    }
  }

  if (media.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center">
        <p className="text-sm text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={`grid gap-4 md:grid-cols-3 lg:grid-cols-${columns}`}>
      {media.map((item) => (
        <div key={item.id} className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          <img
            src={item.image_url}
            alt="Gallery item"
            className="h-48 w-full object-cover"
          />
          {onDelete && (
            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              disabled={uploading}
              className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-700 disabled:cursor-not-allowed"
              title="Delete"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
