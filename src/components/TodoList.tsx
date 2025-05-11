import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';
import { AnimatePresence, motion } from 'framer-motion';
import { LucideLoader2 } from 'lucide-react';

export default function TodoList() {
  const { filteredTodos, loading, error } = useTodos();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LucideLoader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-4">
        <p className="text-red-800 dark:text-red-200">{error}</p>
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center my-8"
      >
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">No todos found</h3>
        <p className="text-gray-400 dark:text-gray-500 mt-1">
          Add a new todo to get started
        </p>
      </motion.div>
    );
  }

  return (
    <div className="py-4">
      <AnimatePresence>
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </AnimatePresence>
    </div>
  );
}