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

const EMOJI_LABELS: Record<ReactionType, string> = {
  smile: 'Like',
  surprised: 'Surprised',
  sad: 'Sad',
  love: 'Love',
  shocked: 'Shocked',
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
    <div className="space-y-8">
      {/* Header - Outside Box */}
      <div>
        <h3 className="text-4xl font-bold text-gray-900">Share Your Thoughts!</h3>
        <p className="text-base text-gray-600 mt-2">What did you think about the story?</p>
      </div>

      {/* Emoji Selection - NO BOX */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-6 justify-center">
          {(Object.keys(EMOJI_MAP) as ReactionType[]).map((reactionType) => (
            <button
              key={reactionType}
              type="button"
              onClick={() => {
                setSelectedReaction(reactionType)
                setError('')
              }}
              className={`
                flex items-center justify-center w-20 h-20 rounded-full transition-all
                ${selectedReaction === reactionType
                  ? 'bg-blue-600 ring-4 ring-blue-300 shadow-lg scale-110'
                  : 'bg-white border-2 border-gray-300 hover:border-gray-400 hover:shadow-md'
                }
              `}
              title={EMOJI_LABELS[reactionType]}
            >
              <span className="text-5xl">{EMOJI_MAP[reactionType]}</span>
            </button>
          ))}
        </div>

        {/* Feedback Textarea - NO BOX */}
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
            setError('')
          }}
          placeholder="Share feedback..."
          disabled={isLoading}
          rows={5}
          maxLength={500}
          className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100 placeholder-gray-400 text-base"
        />
        
        {/* Counter and Submit Button Row */}
        <div className="flex justify-between items-center">
          <div>
            {error && <p className="text-base text-red-600">{error}</p>}
            {!error && <p className="text-sm text-gray-500">{content.length}/500</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading || !selectedReaction || !content.trim()}
            className="px-6 py-2 bg-[#808080] text-white font-semibold rounded-lg hover:bg-[#696969] transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
