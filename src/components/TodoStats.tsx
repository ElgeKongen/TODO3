import { useTodos } from '../context/TodoContext';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock } from 'lucide-react';

export default function TodoStats() {
  const { todos } = useTodos();

  const notStartedCount = todos.filter((todo) => todo.status === 'not_started').length;
  const inProgressCount = todos.filter((todo) => todo.status === 'in_progress').length;
  const doneCount = todos.filter((todo) => todo.status === 'done').length;
  const totalCount = todos.length;

  const donePercentage = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const stats = [
    {
      label: 'Not Started',
      value: notStartedCount,
      icon: <Circle className="h-5 w-5 text-gray-400" />,
      color: 'bg-gray-100 dark:bg-gray-800',
      textColor: 'text-gray-800 dark:text-gray-200',
    },
    {
      label: 'In Progress',
      value: inProgressCount,
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
      color: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-800 dark:text-yellow-200',
    },
    {
      label: 'Completed',
      value: doneCount,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      color: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-800 dark:text-green-200',
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Progress Overview</h2>
      
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className={`${stat.color} rounded-lg p-3 flex flex-col items-center`}
            whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="flex items-center justify-center mb-1">
              {stat.icon}
            </div>
            <span className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{donePercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <motion.div 
            className="bg-primary h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${donePercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}