import { supabase } from '@/supabase/client'

export interface AboutUsData {
  id: string
  created_at: string
  updated_at: string
  meet_team_title: string
  meet_team_subtitle: string
  what_we_do_title: string
  what_we_do_description: string
  main_image_url: string
  description: string
}

export interface TeamMember {
  id: string
  about_us_id: string
  display_order: number
  created_at: string
  name: string
}

export const fetchAboutUs = async (): Promise<AboutUsData | null> => {
  try {
    // Optimized: Select only needed columns instead of all (*)
    const { data, error } = await supabase
      .from('about_us')
      .select('id, created_at, updated_at, meet_team_title, meet_team_subtitle, what_we_do_title, what_we_do_description, main_image_url, description')
      .single()

    if (error) {
      console.error('[AboutUs] Error fetching About Us data:', error)
      return null
    }

    return data as AboutUsData
  } catch (error) {
    console.error('[AboutUs] Unexpected error fetching About Us:', error)
    return null
  }
}

export const fetchTeamMembers = async (aboutUsId?: string): Promise<TeamMember[]> => {
  try {
    // Optimized: Select only needed columns instead of all (*)
    let query = supabase
      .from('about_us_staff')
      .select('id, about_us_id, display_order, created_at, name')
      .order('display_order', { ascending: true })

    if (aboutUsId) {
      query = query.eq('about_us_id', aboutUsId)
    }

    const { data, error } = await query

    if (error) {
      console.error('[AboutUs] Error fetching team members:', error)
      return []
    }

    return data as TeamMember[]
  } catch (error) {
    console.error('[AboutUs] Unexpected error fetching team members:', error)
    return []
  }
}
