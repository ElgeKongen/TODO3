import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Todo, TodoFilter, TodoFormData, TodoStatus } from '../types';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  currentFilter: TodoFilter;
  searchQuery: string;
  filteredTodos: Todo[];
  setCurrentFilter: (filter: TodoFilter) => void;
  setSearchQuery: (query: string) => void;
  addTodo: (data: TodoFormData) => Promise<string | undefined>;
  updateTodo: (id: string, data: Partial<Todo>) => Promise<string | undefined>;
  deleteTodo: (id: string) => Promise<string | undefined>;
  toggleStatus: (id: string, newStatus: TodoStatus) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<TodoFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTodos = todos
    .filter(todo => (currentFilter === 'all' ? true : todo.status === currentFilter))
    .filter(todo => {
      if (!searchQuery.trim()) return true;
      return (
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (todo.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => a.position - b.position);

  useEffect(() => {
    if (!supabase) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    const fetchTodos = async () => {
     if (!supabase) return toast.error('Supabase not available');
      try {
        const { data, error } = await supabase
          .from('todos')
          .select('*')
          .order('position');

        if (error) throw error;
        setTodos(data || []);
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Failed to load todos. Please try again later.');
        toast.error('Failed to load todos');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();

    const subscription = supabase
      .channel('todos-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, () => {
        fetchTodos();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addTodo = async (data: TodoFormData) => {
    if (!supabase) return toast.error('Supabase not available');

    try {
      const maxPositionResult = await supabase
        .from('todos')
        .select('position')
        .order('position', { ascending: false })
        .limit(1);

      const maxPosition = maxPositionResult.data?.[0]?.position ?? -1;

      const newTodo: Todo = {
        id: uuidv4(),
        title: data.title,
        description: data.description || null,
        status: 'not_started',
        created_at: new Date().toISOString(),
        updated_at: null,
        priority: data.priority,
        position: maxPosition + 1,
      };

      const { error } = await supabase.from('todos').insert(newTodo);

      if (error) throw error;

      setTodos(prev => [...prev, newTodo]);
      toast.success('Todo added successfully!');
    } catch (err) {
      console.error('Error adding todo:', err);
      toast.error('Failed to add todo');
    }
  };

  const updateTodo = async (id: string, data: Partial<Todo>) => {
    if (!supabase) return toast.error('Supabase not available');

    try {
      const { error } = await supabase
        .from('todos')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setTodos(prev =>
        prev.map(todo => (todo.id === id ? { ...todo, ...data, updated_at: new Date().toISOString() } : todo))
      );
      toast.success('Todo updated successfully!');
    } catch (err) {
      console.error('Error updating todo:', err);
      toast.error('Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    if (!supabase) return toast.error('Supabase not available');

    try {
      const { error } = await supabase.from('todos').delete().eq('id', id);

      if (error) throw error;

      setTodos(prev => prev.filter(todo => todo.id !== id));
      toast.success('Todo deleted successfully!');
    } catch (err) {
      console.error('Error deleting todo:', err);
      toast.error('Failed to delete todo');
    }
  };

  const toggleStatus = async (id: string, newStatus: TodoStatus) => {
    await updateTodo(id, { status: newStatus });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        currentFilter,
        searchQuery,
        filteredTodos,
        setCurrentFilter,
        setSearchQuery,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleStatus,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};
