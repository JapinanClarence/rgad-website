// packages/supabase/src/types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          cover_image: string | null
          category: string
          tags: string[] | null
          author_id: string
          published: boolean
          featured: boolean
          view_count: number
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at' | 'updated_at' | 'view_count'>
        Update: Partial<Database['public']['Tables']['articles']['Insert']>
      }
      authors: {
        Row: {
          id: string
          name: string
          email: string
          avatar: string | null
          bio: string | null
          role: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['authors']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['authors']['Insert']>
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
      }
      organization: {
        Row: {
          id: string
          name: string
          tagline: string | null
          description: string | null
          mission: string | null
          vision: string | null
          email: string | null
          phone: string | null
          address: string | null
          facebook: string | null
          twitter: string | null
          logo_url: string | null
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['organization']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['organization']['Insert']>
      }
      team_members: {
        Row: {
          id: string
          name: string
          position: string
          department: string | null
          bio: string | null
          avatar: string | null
          email: string | null
          order_index: number
          active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['team_members']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['team_members']['Insert']>
      }
      research_areas: {
        Row: {
          id: string
          title: string
          description: string
          icon: string | null
          order_index: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['research_areas']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['research_areas']['Insert']>
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
