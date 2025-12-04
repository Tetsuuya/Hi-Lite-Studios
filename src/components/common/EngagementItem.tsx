import type { MagazineEngagement } from '@/supabase/supabase_services/Blogs_Stories/reactions_comments'

const EMOJI_MAP = {
  smile: '😊',
  surprised: '😮',
  sad: '😔',
  love: '😍',
  shocked: '😱',
}

interface EngagementItemProps {
  engagement: MagazineEngagement
  onDelete?: (engagementId: number) => void
  onEdit?: (engagement: MagazineEngagement) => void
  isAdmin?: boolean
}

export const EngagementItem = ({
  engagement,
  onDelete,
  onEdit,
  isAdmin = false,
}: EngagementItemProps) => {
  const formattedDate = new Date(engagement.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="flex gap-2 sm:gap-3 md:gap-4 py-2 sm:py-3">
      {/* Emoji - Left */}
      <div className="shrink-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-base sm:text-lg md:text-xl shadow-sm">
          {EMOJI_MAP[engagement.reaction_type as keyof typeof EMOJI_MAP]}
        </div>
      </div>

      {/* Content - Middle/Right */}
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-gray-200 sm:border-2 md:border-2 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 shadow-sm">
          <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-relaxed wrap-break-word">
            {engagement.content}
          </p>
        </div>
        {/* Date - Below content, right aligned */}
        <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 text-right">{formattedDate}</p>
      </div>

      {/* Admin Actions */}
      {isAdmin && (
        <div className="flex gap-1 sm:gap-2 shrink-0 self-start">
          {onEdit && (
            <button
              onClick={() => onEdit(engagement)}
              className="px-2 py-0.5 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition shadow-sm"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(engagement.id)}
              className="px-2 py-0.5 text-xs sm:text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition shadow-sm"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}
