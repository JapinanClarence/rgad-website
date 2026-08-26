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
          editorial: string | null;
          editorial_author: string | null;
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
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
