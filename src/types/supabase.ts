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
      todos: {
        Row: {
          id: string
          title: string
          description: string | null
          status: 'not_started' | 'in_progress' | 'done'
          created_at: string
          updated_at: string | null
          priority: 'low' | 'medium' | 'high'
          position: number
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: 'not_started' | 'in_progress' | 'done'
          created_at?: string
          updated_at?: string | null
          priority?: 'low' | 'medium' | 'high'
          position?: number
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: 'not_started' | 'in_progress' | 'done'
          created_at?: string
          updated_at?: string | null
          priority?: 'low' | 'medium' | 'high'
          position?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}