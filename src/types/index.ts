export type TodoStatus = 'not_started' | 'in_progress' | 'done';
export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description: string | null;
  status: TodoStatus;
  created_at: string;
  updated_at: string | null;
  priority: TodoPriority;
  position: number;
}

export type TodoFilter = 'all' | TodoStatus;

export type TodoFormData = {
  title: string;
  description: string;
  priority: TodoPriority;
};