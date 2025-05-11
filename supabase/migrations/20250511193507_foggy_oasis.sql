/*
  # Create todos table

  1. New Tables
    - `todos`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `description` (text, nullable)
      - `status` (enum: not_started, in_progress, done)
      - `created_at` (timestamp)
      - `updated_at` (timestamp, nullable)
      - `priority` (enum: low, medium, high)
      - `position` (integer)

  2. Security
    - No RLS policies as per requirements
*/

-- Create the todos table
CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'done')) DEFAULT 'not_started',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  position INTEGER NOT NULL DEFAULT 0
);

-- Create indexes
CREATE INDEX IF NOT EXISTS todos_status_idx ON todos (status);
CREATE INDEX IF NOT EXISTS todos_priority_idx ON todos (priority);
CREATE INDEX IF NOT EXISTS todos_position_idx ON todos (position);