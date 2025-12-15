import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ConfirmModal from '@/components/ui/ConfirmModal'
export interface MediaItem {
  id: string
  image_url: string
}

interface MediaGalleryProps {
  media: MediaItem[]
  uploading?: boolean
  onDelete?: (mediaId: string) => Promise<void> | void
  onReorder?: (mediaIds: string[]) => Promise<void> | void
  emptyMessage?: string
  columns?: number
  editMode?: boolean
  onEditModeChange?: (editing: boolean) => void
}

export default function MediaGallery({
  media,
  uploading = false,
  onDelete,
  onReorder,
  emptyMessage = 'No media added yet.',
  columns = 4,
  editMode: externalEditMode,
  onEditModeChange,
}: MediaGalleryProps) {
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(!!externalEditMode)
    // Sync with external edit mode if provided
    const prevExternal = useRef<boolean | undefined>(externalEditMode)
    if (prevExternal.current !== externalEditMode && externalEditMode !== undefined) {
      prevExternal.current = externalEditMode
      setEditMode(!!externalEditMode)
    }
  const [order, setOrder] = useState(() => media.map(m => m.id))
  const holdTimer = useRef<number | null>(null)
  const dragId = useRef<string | null>(null)
  const prevMediaRef = useRef<string>('')
  const isSavingRef = useRef<boolean>(false)
  const saveDebounceTimer = useRef<number | null>(null)

  // Reset order when media changes (e.g., after reload from database)
  // This ensures the order matches the database order after reordering
  // BUT: Don't reset if we're currently in edit mode OR if we just saved
  useEffect(() => {
    if (editMode || isSavingRef.current) {
      // Don't reset order while user is editing or while saving
      return
    }
    
    const currentMediaIds = media.map(m => m.id).join(',')
    const currentMediaIdsArray = media.map(m => m.id)
    
    // Only update if the media IDs string changed (different items or different order)
    if (prevMediaRef.current !== currentMediaIds) {
      // Check if it's the same IDs (just reordered) or different IDs (items added/removed)
      const mediaIdsSet = new Set(currentMediaIdsArray)
      const orderIdsSet = new Set(order)
      const hasSameIds = mediaIdsSet.size === orderIdsSet.size && 
                         [...mediaIdsSet].every(id => orderIdsSet.has(id))
      
      if (hasSameIds && prevMediaRef.current !== '') {
        // Same IDs - this is likely a reload after save
        // IMPORTANT: Don't reset the order if IDs are the same - preserve the order state
        // The order state already has the correct order (including pending items in their positions)
        // The media array might be reconstructed as [...pendingMedia, ...selectedWorkMedia]
        // which doesn't match the saved order, so we should preserve the order state
        // DON'T update order - preserve the current order state which has the correct order
        // Just update the ref to prevent repeated checks
        prevMediaRef.current = currentMediaIds
        return // Exit early to prevent any order update
      } else {
        // Different IDs - items were added/removed, or initial load
        setOrder(currentMediaIdsArray)
        prevMediaRef.current = currentMediaIds
      }
    }
  }, [media, editMode]) // Removed 'order' from dependencies to avoid infinite loop

  // Keep local order in sync when media list changes (e.g., after upload/delete)
  const orderedMedia = useMemo(() => {
    const map = new Map(media.map(m => [m.id, m]))
    return order.map(id => map.get(id)).filter(Boolean) as MediaItem[]
  }, [media, order])

  const startHold = useCallback(() => {
    if (holdTimer.current) window.clearTimeout(holdTimer.current)
    holdTimer.current = window.setTimeout(() => {
      setEditMode(true)
      if (onEditModeChange) onEditModeChange(true)
    }, 500)
  }, [])

  const cancelHold = useCallback(() => {
    if (holdTimer.current) {
      window.clearTimeout(holdTimer.current)
      holdTimer.current = null
    }
  }, [])

  // Save order with debouncing - waits until user stops dragging
  const debouncedSave = useCallback(() => {
    if (saveDebounceTimer.current) {
      window.clearTimeout(saveDebounceTimer.current)
    }
    
    saveDebounceTimer.current = window.setTimeout(async () => {
      if (onReorder && order.length > 0 && editMode) {
        isSavingRef.current = true // Prevent order reset during save
        try {
          await onReorder([...order]) // Create a copy to ensure we have the latest
          // Wait for reload to complete before allowing order reset
          setTimeout(() => {
            isSavingRef.current = false
          }, 500)
        } catch (err) {
          isSavingRef.current = false
          console.error('[MediaGallery] Error saving order:', err)
        }
      }
    }, 800) // Wait 800ms after last drag before saving
  }, [onReorder, order, editMode])

  // Notify parent when edit mode changes and save order when exiting edit mode
  const prevEdit = useRef<boolean>(editMode)
  useEffect(() => {
    const wasEditing = prevEdit.current
    const isEditing = editMode
    
    if (wasEditing !== isEditing) {
      prevEdit.current = isEditing
      
      if (onEditModeChange) {
        onEditModeChange(isEditing)
      }
      
      // When exiting edit mode (clicking "Done"), save immediately and clear debounce
      if (wasEditing && !isEditing && onReorder && order.length > 0) {
        // Clear any pending debounced save
        if (saveDebounceTimer.current) {
          window.clearTimeout(saveDebounceTimer.current)
          saveDebounceTimer.current = null
        }
        
        isSavingRef.current = true // Prevent order reset during save
        setTimeout(async () => {
          try {
            await onReorder([...order]) // Create a copy to ensure we have the latest
            // Wait for reload to complete before allowing order reset
            setTimeout(() => {
              isSavingRef.current = false
            }, 500)
          } catch (err) {
            isSavingRef.current = false
            console.error('[MediaGallery] Error saving order:', err)
          }
        }, 0)
      }
    }
  }, [editMode, onEditModeChange, onReorder, order])

  const onDragStart = (id: string) => {
    dragId.current = id
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>, overId: string) => {
    e.preventDefault()
    const from = dragId.current
    if (!from || from === overId) return
    const newOrder = [...order]
    const fromIdx = newOrder.indexOf(from)
    const overIdx = newOrder.indexOf(overId)
    if (fromIdx === -1 || overIdx === -1) return
    newOrder.splice(fromIdx, 1)
    newOrder.splice(overIdx, 0, from)
    setOrder(newOrder)
  }

  const onDragEnd = () => {
    dragId.current = null
    // Trigger debounced save - will save after user stops dragging for 800ms
    debouncedSave()
  }

  const handleDelete = async (mediaId: string) => {
    if (!onDelete) return
    setDeleteTargetId(mediaId)
  }

  if (media.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center">
        <p className="text-sm text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <>
      {/* Toggle button removed; controlled via parent */}
      {/* Shake animation keyframes for edit mode */}
      <style>{`
        @keyframes media-shake { 0% { transform: rotate(-1.2deg) } 50% { transform: rotate(1.2deg) } 100% { transform: rotate(-1.2deg) } }
      `}</style>
      <div className={`grid gap-4 md:grid-cols-3 lg:grid-cols-${columns}`}>
        {orderedMedia.map((item) => (
          <div
            key={item.id}
            className={`relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 ${editMode ? 'cursor-move' : ''}`}
            draggable={editMode}
            onDragStart={() => onDragStart(item.id)}
            onDragOver={(e) => onDragOver(e, item.id)}
            onDragEnd={onDragEnd}
            onPointerDown={startHold}
            onPointerUp={cancelHold}
            onPointerLeave={cancelHold}
            style={editMode ? { animation: 'media-shake 0.4s linear infinite' } : undefined}
          >
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
                className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white hover:bg-red-700 disabled:cursor-not-allowed"
                title="Delete"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a 1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Media"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={uploading}
        onConfirm={async () => {
          if (!onDelete || !deleteTargetId) return
          await onDelete(deleteTargetId)
          setDeleteTargetId(null)
        }}
        onCancel={() => setDeleteTargetId(null)}
      />
    </>
  )
}
