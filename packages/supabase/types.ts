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
          issue_id: string | null
          page_number: string | null
          pdf_url: string | null
        }
        Insert: Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at' | 'updated_at' | 'view_count'>
        Update: Partial<Database['public']['Tables']['articles']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'articles_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'authors'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'articles_issue_id_fkey'
            columns: ['issue_id']
            isOneToOne: false
            referencedRelation: 'issues'
            referencedColumns: ['id']
          },
        ]
      }
      issues: {
        Row: {
          id: string
          volume: number
          issue_no: number
          title: string | null
          theme: string | null
          doi: string | null
          cover_image: string | null
          editorial: string | null
          editorial_author: string | null
          pdf_url: string | null
          is_current: boolean
          published_at: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['issues']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['issues']['Insert']>
        Relationships: []
      }
      summit: {
        Row: {
          id: string
          created_at: string
          theme: string | null
          location: string | null
          summary: string | null
          details: string[] | null
          note: string | null
          outcomes: string[] | null
          host: string | null
          start_date: string | null
          images: string[] | null
          end_date: string | null
        }
        Insert: Omit<Database['public']['Tables']['summit']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['summit']['Insert']>
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
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
        Relationships: []
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
