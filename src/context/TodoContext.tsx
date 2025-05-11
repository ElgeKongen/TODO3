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
  addTodo: (data: TodoFormData) => Promise<void>;
  updateTodo: (id: string, data: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleStatus: (id: string, newStatus: TodoStatus) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<TodoFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtered todos based on status and search query
  const filteredTodos = todos
    .filter(todo => {
      if (currentFilter === 'all') return true;
      return todo.status === currentFilter;
    })
    .filter(todo => {
      if (!searchQuery.trim()) return true;
      return (
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (todo.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => a.position - b.position);

  // Fetch todos from Supabase
  useEffect(() => {
    const fetchTodos = async () => {
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

    // Subscribe to changes
    const subscription = supabase
      .channel('todos-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, (payload) => {
        console.log('Change received!', payload);
        fetchTodos();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Add a new todo
  const addTodo = async (data: TodoFormData) => {
    try {
      const maxPositionResult = await supabase
        .from('todos')
        .select('position')
        .order('position', { ascending: false })
        .limit(1);

      const maxPosition = maxPositionResult.data && maxPositionResult.data.length > 0
        ? maxPositionResult.data[0].position + 1
        : 0;

      const newTodo: Todo = {
        id: uuidv4(),
        title: data.title,
        description: data.description || null,
        status: 'not_started',
        created_at: new Date().toISOString(),
        updated_at: null,
        priority: data.priority,
        position: maxPosition,
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

  // Update a todo
  const updateTodo = async (id: string, data: Partial<Todo>) => {
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

  // Delete a todo
  const deleteTodo = async (id: string) => {
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

  // Toggle status
  const toggleStatus = async (id: string, newStatus: TodoStatus) => {
    try {
      await updateTodo(id, { status: newStatus });
    } catch (err) {
      console.error('Error toggling status:', err);
    }
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