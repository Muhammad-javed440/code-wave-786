
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700 transition-all active:scale-95 group"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <div className={`absolute inset-0 transition-transform duration-500 ${theme === 'dark' ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          <Moon className="w-5 h-5" />
        </div>
        <div className={`absolute inset-0 transition-transform duration-500 ${theme === 'light' ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <Sun className="w-5 h-5" />
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
