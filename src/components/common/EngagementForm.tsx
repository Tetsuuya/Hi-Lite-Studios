import { useState } from 'react'
import type { ReactionType } from '@/supabase/supabase_services/Blogs_Stories/reactions_comments'

interface EngagementFormProps {
  onSubmit: (reactionType: ReactionType, content: string) => Promise<void>
  isLoading?: boolean
}

const EMOJI_MAP: Record<ReactionType, string> = {
  smile: '😊',
  surprised: '😮',
  sad: '😔',
  love: '😍',
  shocked: '😱',
}

export const EngagementForm = ({ onSubmit, isLoading = false }: EngagementFormProps) => {
  const [selectedReaction, setSelectedReaction] = useState<ReactionType | null>(null)
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!selectedReaction) {
      setError('Please select a reaction')
      return
    }

    if (!content.trim()) {
      setError('Feedback cannot be empty')
      return
    }

    if (content.trim().length > 500) {
      setError('Feedback must be less than 500 characters')
      return
    }

    try {
      await onSubmit(selectedReaction, content)
      setSelectedReaction(null)
      setContent('')
    } catch (err: any) {
      setError(err.message || 'Failed to submit')
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Share Your Thoughts!</h3>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mt-1 sm:mt-2">What did you think about the story?</p>
      </div>

      {/* Emoji Selection */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="flex gap-3 sm:gap-4 md:gap-6 justify-center flex-wrap">
          {(Object.keys(EMOJI_MAP) as ReactionType[]).map((reactionType) => {
            const isSelected = selectedReaction === reactionType
            return (
              <button
                key={reactionType}
                type="button"
                onClick={() => {
                  setSelectedReaction(reactionType)
                  setError('')
                }}
                className={`group relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full transition-all duration-200 ease-out
                  ${isSelected
                    ? 'bg-linear-to-br from-blue-600 to-blue-500 ring-4 ring-blue-300 shadow-2xl scale-105'
                    : 'bg-white border border-gray-300 shadow-md hover:shadow-lg hover:border-gray-400'
                  } hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300`}
              >
                <span className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl transition-transform duration-200
                  ${isSelected ? 'drop-shadow-[2px_6px_8px_rgba(59,130,246,0.35)]' : 'drop-shadow-[2px_6px_8px_rgba(0,0,0,0.25)]'}
                  group-hover:scale-[1.06] group-active:scale-95`}
                >
                  {EMOJI_MAP[reactionType]}
                </span>
                {/* Label below on hover/selected */}
                <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium transition-opacity duration-200
                  ${isSelected ? 'opacity-100 text-blue-700' : 'opacity-0 group-hover:opacity-100 text-gray-600'}`}
                >
                </span>
              </button>
            )
          })}
        </div>

        {/* Feedback Textarea */}
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
            setError('')
          }}
          placeholder="Share feedback..."
          disabled={isLoading}
          rows={3}
          maxLength={500}
          className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base border-2 border-gray-300 rounded-lg sm:rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100 placeholder-gray-400 shadow"
        />
        
        {/* Counter and Submit Button Row */}
        <div className="flex justify-between items-center gap-2 sm:gap-4 mt-2">
          <div className="flex-1">
            {error && <p className="text-xs sm:text-sm text-red-600">{error}</p>}
            {!error && <p className="text-xs sm:text-sm text-gray-500">{content.length}/500</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading || !selectedReaction || !content.trim()}
            className="px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 rounded-ee-2xl rounded-tl-2xl bg-linear-to-r from-[#1E1E1E] to-gray-600 text-white font-semibold text-xs sm:text-sm shadow hover:shadow-md hover:brightness-105 active:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
