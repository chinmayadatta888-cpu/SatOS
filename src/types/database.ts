export type Database = {
  public: {
    Tables: {
      messages: {
        Row: {
          id: string
          message: string
          created_at: string
          is_read: boolean
        }
        Insert: {
          id?: string
          message: string
          created_at?: string
          is_read?: boolean
        }
        Update: {
          id?: string
          message?: string
          created_at?: string
          is_read?: boolean
        }
        Relationships: []
      }
    }
    Views: Record<never, never>
    Functions: {
      is_message_owner: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: Record<never, never>
    CompositeTypes: Record<never, never>
  }
}
