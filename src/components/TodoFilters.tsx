import { useTodos } from '../context/TodoContext';
import { Button } from './ui/Button';
import { CheckCircle, Circle, Clock, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TodoFilters() {
  const { currentFilter, setCurrentFilter, searchQuery, setSearchQuery } = useTodos();

  const filters = [
    { id: 'all', label: 'All', icon: null },
    { id: 'not_started', label: 'Not Started', icon: <Circle className="h-4 w-4" /> },
    { id: 'in_progress', label: 'In Progress', icon: <Clock className="h-4 w-4" /> },
    { id: 'done', label: 'Done', icon: <CheckCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search todos..."
          className="pl-10 pr-10 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <motion.div key={filter.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={currentFilter === filter.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentFilter(filter.id as any)}
              className="flex items-center gap-1"
            >
              {filter.icon}
              {filter.label}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}