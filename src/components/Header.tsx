import { Button } from './ui/Button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <motion.div 
            className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3"
            whileHover={{ rotate: 5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-white text-xl font-bold">T</span>
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TaskMaster</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
}