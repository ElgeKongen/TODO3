import { useState } from 'react';
import { Todo, TodoStatus } from '../types';
import { useTodos } from '../context/TodoContext';
import { motion } from 'framer-motion';
import Badge from './ui/Badge';
import { Button } from './ui/Button';
import { CheckCircle, Circle, Clock, Edit, Trash } from 'lucide-react';
import TodoForm from './TodoForm';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleStatus, deleteTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleToggleStatus = () => {
    const statusMap: Record<TodoStatus, TodoStatus> = {
      not_started: 'in_progress',
      in_progress: 'done',
      done: 'not_started',
    };
    
    toggleStatus(todo.id, statusMap[todo.status]);
  };

  const priorityColor = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  const statusIcon = {
    not_started: <Circle className="h-5 w-5 text-gray-400" />,
    in_progress: <Clock className="h-5 w-5 text-yellow-500" />,
    done: <CheckCircle className="h-5 w-5 text-green-500" />,
  };

  if (isEditing) {
    return (
      <motion.div 
        layout
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-3"
      >
        <TodoForm 
          initialData={{
            title: todo.title,
            description: todo.description || '',
            priority: todo.priority,
          }}
          onSubmit={(data) => {
            updateTodo(todo.id, data);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-3 relative ${
        todo.status === 'done' ? 'border-l-4 border-green-500' : 
        todo.status === 'in_progress' ? 'border-l-4 border-yellow-500' : 
        'border-l-4 border-gray-300'
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <button 
            onClick={handleToggleStatus}
            className="mt-1 focus:outline-none transition-transform hover:scale-110"
            aria-label={`Mark as ${todo.status === 'not_started' ? 'in progress' : todo.status === 'in_progress' ? 'done' : 'not started'}`}
          >
            {statusIcon[todo.status]}
          </button>
          
          <div className="flex-1">
            <h3 className={`text-lg font-medium ${todo.status === 'done' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {todo.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Badge 
                variant="secondary" 
                className={priorityColor[todo.priority]}
              >
                {todo.priority}
              </Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(todo.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showActions ? 1 : 0 }}
          className="flex items-center gap-1"
        >
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Edit"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
            aria-label="Delete"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}