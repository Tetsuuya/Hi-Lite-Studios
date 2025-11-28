import { supabase } from '@/supabase/client'

export type ReactionType = 'smile' | 'surprised' | 'sad' | 'love' | 'shocked'

export interface MagazineEngagement {
  id: number
  blog_story_id: number
  reaction_type: ReactionType
  content: string
  created_at: string
  updated_at: string
}

const TABLE_NAME = 'magazine_engagements'

// ============================================================================
// ENGAGEMENTS ENDPOINTS (Emoji + Comment combined)
// ============================================================================

/**
 * Get all engagements for a specific blog story
 */
export async function getEngagementsForBlog(blogStoryId: number): Promise<MagazineEngagement[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('blog_story_id', blogStoryId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching engagements:', error)
    return []
  }

  return (data ?? []) as MagazineEngagement[]
}

/**
 * Create a new engagement (emoji + comment) on a blog story
 */
export async function createEngagement(
  blogStoryId: number,
  reactionType: ReactionType,
  content: string,
): Promise<MagazineEngagement | null> {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({
        blog_story_id: blogStoryId,
        reaction_type: reactionType,
        content: content.trim(),
      })
      .select()
      .single()

    if (error) throw error
    return data as MagazineEngagement
  } catch (err) {
    console.error('Error creating engagement:', err)
    return null
  }
}

/**
 * Delete an engagement
 */
export async function deleteEngagement(engagementId: number): Promise<boolean> {
  try {
    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', engagementId)

    if (error) throw error
    return true
  } catch (err) {
    console.error('Error deleting engagement:', err)
    return false
  }
}

/**
 * Update an engagement
 */
export async function updateEngagement(
  engagementId: number,
  reactionType?: ReactionType,
  content?: string,
): Promise<MagazineEngagement | null> {
  try {
    const updates: any = {}
    if (reactionType) updates.reaction_type = reactionType
    if (content) updates.content = content.trim()

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updates)
      .eq('id', engagementId)
      .select()
      .single()

    if (error) throw error
    return data as MagazineEngagement
  } catch (err) {
    console.error('Error updating engagement:', err)
    return null
  }
}
