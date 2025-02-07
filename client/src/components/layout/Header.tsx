import React from 'react';
import { useTheme } from '../theme/ThemeProvider';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <header className="bg-blue-500 dark:bg-blue-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
          {/* Logo placeholder */}
          <span className="text-blue-500 font-bold text-xl">F</span>
        </div>
        <h1 className="text-white text-2xl font-bold">Fantastweet</h1>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20"
      >
        {isDarkMode ? '🌙' : '☀️'}
      </button>
    </header>
  );
};

export default Header;
