export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      classroom_students: {
        Row: {
          classroom_id: string
          id: string
          joined_at: string
          status: Database["public"]["Enums"]["classroom_student_status"]
          user_id: string
        }
        Insert: {
          classroom_id: string
          id?: string
          joined_at?: string
          status?: Database["public"]["Enums"]["classroom_student_status"]
          user_id: string
        }
        Update: {
          classroom_id?: string
          id?: string
          joined_at?: string
          status?: Database["public"]["Enums"]["classroom_student_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "classroom_students_classroom_id_fkey"
            columns: ["classroom_id"]
            isOneToOne: false
            referencedRelation: "classrooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "classroom_students_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      classrooms: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
          user_id: string
          visibility: Database["public"]["Enums"]["classroom_visibility"]
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
          user_id: string
          visibility?: Database["public"]["Enums"]["classroom_visibility"]
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
          visibility?: Database["public"]["Enums"]["classroom_visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "classrooms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      game_items: {
        Row: {
          answer: string
          created_at: string
          game_id: string
          id: string
          points: number
          question: string
          time_limit: number | null
          updated_at: string
        }
        Insert: {
          answer: string
          created_at?: string
          game_id: string
          id?: string
          points?: number
          question: string
          time_limit?: number | null
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          game_id?: string
          id?: string
          points?: number
          question?: string
          time_limit?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_items_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          category: Database["public"]["Enums"]["game_category"]
          created_at: string
          description: string | null
          difficulty: Database["public"]["Enums"]["game_difficulty"]
          id: string
          title: string
          type: Database["public"]["Enums"]["game_type"]
          updated_at: string
          user_id: string
          visibility: Database["public"]["Enums"]["game_visibility"]
        }
        Insert: {
          category: Database["public"]["Enums"]["game_category"]
          created_at?: string
          description?: string | null
          difficulty: Database["public"]["Enums"]["game_difficulty"]
          id?: string
          title: string
          type: Database["public"]["Enums"]["game_type"]
          updated_at?: string
          user_id: string
          visibility?: Database["public"]["Enums"]["game_visibility"]
        }
        Update: {
          category?: Database["public"]["Enums"]["game_category"]
          created_at?: string
          description?: string | null
          difficulty?: Database["public"]["Enums"]["game_difficulty"]
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["game_type"]
          updated_at?: string
          user_id?: string
          visibility?: Database["public"]["Enums"]["game_visibility"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          family_name: string
          given_name: string
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          family_name: string
          given_name: string
          id: string
          role: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          family_name?: string
          given_name?: string
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      quiz_items: {
        Row: {
          choices: Json
          created_at: string
          id: string
          question: string
          quiz_id: string
          updated_at: string
        }
        Insert: {
          choices: Json
          created_at?: string
          id?: string
          question: string
          quiz_id: string
          updated_at?: string
        }
        Update: {
          choices?: Json
          created_at?: string
          id?: string
          question?: string
          quiz_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_items_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string
          description: string | null
          difficulty: Database["public"]["Enums"]["quiz_difficulty"] | null
          id: string
          title: string
          type: Database["public"]["Enums"]["quiz_type"]
          updated_at: string
          user_id: string
          visibility: Database["public"]["Enums"]["quiz_visibility"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty?: Database["public"]["Enums"]["quiz_difficulty"] | null
          id?: string
          title: string
          type: Database["public"]["Enums"]["quiz_type"]
          updated_at?: string
          user_id: string
          visibility?: Database["public"]["Enums"]["quiz_visibility"]
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty?: Database["public"]["Enums"]["quiz_difficulty"] | null
          id?: string
          title?: string
          type?: Database["public"]["Enums"]["quiz_type"]
          updated_at?: string
          user_id?: string
          visibility?: Database["public"]["Enums"]["quiz_visibility"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: {
          user_id: string
        }
        Returns: string
      }
    }
    Enums: {
      classroom_student_status: "pending" | "approved" | "rejected"
      classroom_visibility: "public" | "invite-only"
      game_category:
        | "title-of-stories"
        | "author"
        | "periods"
        | "epic"
        | "music"
      game_difficulty: "easy" | "average" | "difficult"
      game_type: "individual" | "group"
      game_visibility: "public" | "invite-only" | "only-me"
      quiz_difficulty: "easy" | "average" | "difficult"
      quiz_type: "subject" | "topic" | "questions"
      quiz_visibility: "public" | "invite-only" | "only-me"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      classroom_student_status: ["pending", "approved", "rejected"],
      classroom_visibility: ["public", "invite-only"],
      game_category: ["title-of-stories", "author", "periods", "epic", "music"],
      game_difficulty: ["easy", "average", "difficult"],
      game_type: ["individual", "group"],
      game_visibility: ["public", "invite-only", "only-me"],
      quiz_difficulty: ["easy", "average", "difficult"],
      quiz_type: ["subject", "topic", "questions"],
      quiz_visibility: ["public", "invite-only", "only-me"],
    },
  },
} as const

