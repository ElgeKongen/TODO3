import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import CreateTodoButton from './components/CreateTodoButton';
import TodoStats from './components/TodoStats';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
          <Header />
          
          <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sticky top-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Filters</h2>
                  <TodoFilters />
                  
                  <div className="mt-8">
                    <TodoStats />
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3 order-1 lg:order-2">
                <CreateTodoButton />
                <TodoList />
              </div>
            </div>
          </main>
        </div>
        
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--toast-bg, #fff)',
              color: 'var(--toast-color, #000)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#06d6a0',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef476f',
                secondary: '#fff',
              },
            },
          }}
        />
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;