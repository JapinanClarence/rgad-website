// packages/supabase/src/types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      archive: {
        Row: {
          id: string;
          created_at: string;
          volume_no: number;
          issue_no: number;
          doi: string | null;
          issn: string;
          cover_image: string | null;
          published_at: string;
          is_current: boolean;
        };
        Insert: Omit<
          Database["public"]["Tables"]["archive"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["archive"]["Insert"]>;
        Relationships: [];
      };
      articles: {
        Row: {
          id: string;
          created_at: string;
          pdf_url: string;
          pages: string;
          title: string;
          abstract: string;
          doi: string | null;
          correspondence: string | null;
          keywords: string[] | null;
          archive_id: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["articles"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["articles"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "articles_archive_id_fkey";
            columns: ["archive_id"];
            isOneToOne: false;
            referencedRelation: "archive";
            referencedColumns: ["id"];
          },
        ];
      };
      authors: {
        Row: {
          id: string;
          created_at: string;
          firstname: string;
          middlename: string | null;
          lastname: string;
          department: string | null;
          school: string;
          city: string | null;
          country: string | null;
          article_id: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["authors"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["authors"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "authors_article_id_fkey";
            columns: ["article_id"];
            isOneToOne: false;
            referencedRelation: "articles";
            referencedColumns: ["id"];
          },
        ];
      };
      summit: {
        Row: {
          id: string;
          created_at: string;
          theme: string | null;
          location: string | null;
          summary: string | null;
          details: string[] | null;
          note: string | null;
          outcomes: string[] | null;
          host: string | null;
          start_date: string | null;
          images: string[] | null;
          end_date: string | null;
        };
        Insert: Omit<
          Database["public"]["Tables"]["summit"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["summit"]["Insert"]>;
        Relationships: [];
      };
      reviewers: {
        Row: {
          id: string;
          created_at: string;
          firstname: string;
          middlename: string | null;
          lastname: string;
          school: string;
          country: string | null;
        };
        Insert: Omit<
          Database["public"]["Tables"]["reviewers"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["reviewers"]["Insert"]>;
        Relationships: [];
      };
      announcements: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string;
          slug: string;
          published_at: string;
          external_url: string | null;
          is_pinned: boolean;
        };
        Insert: Omit<
          Database["public"]["Tables"]["announcements"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["announcements"]["Insert"]
        >;
        Relationships: [];
      };
      article_metrics: {
        Row: {
          article_id: string;
          total_views: number;
          total_downloads: number;
          updated_at: string;
        };
        Insert: Partial<
          Omit<
            Database["public"]["Tables"]["article_metrics"]["Row"],
            "article_id"
          >
        > & {
          article_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["article_metrics"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "article_metrics_article_id_fkey";
            columns: ["article_id"];
            isOneToOne: true;
            referencedRelation: "articles";
            referencedColumns: ["id"];
          },
        ];
      };
      article_metric_events: {
        Row: {
          id: string;
          article_id: string;
          event_type: "view" | "download";
          visitor_hash: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["article_metric_events"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["article_metric_events"]["Insert"]
        >;
        Relationships: [
          {
            foreignKeyName: "article_metric_events_article_id_fkey";
            columns: ["article_id"];
            isOneToOne: false;
            referencedRelation: "articles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {};
    Functions: {
      record_article_view: {
        Args: {
          p_article_id: string;
          p_visitor_hash?: string | null;
        };
        Returns: void;
      };
      record_article_download: {
        Args: {
          p_article_id: string;
          p_visitor_hash?: string | null;
        };
        Returns: void;
      };
    };
    Enums: {};
  };
}
