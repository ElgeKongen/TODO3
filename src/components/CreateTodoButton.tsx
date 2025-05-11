import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Plus, X } from 'lucide-react';
import TodoForm from './TodoForm';
import { useTodos } from '../context/TodoContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateTodoButton() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { addTodo } = useTodos();

  const handleSubmit = async (data: any) => {
    await addTodo(data);
    setIsFormOpen(false);
  };

  return (
    <div className="mb-6">
      <AnimatePresence>
        {isFormOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 overflow-hidden mb-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Add New Todo</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <TodoForm onSubmit={handleSubmit} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => setIsFormOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3"
            >
              <Plus className="h-5 w-5" />
              <span>Add New Todo</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}