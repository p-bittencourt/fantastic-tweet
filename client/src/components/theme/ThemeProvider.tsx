import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const shouldBeDark =
        savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

      setIsDarkMode(shouldBeDark);
    } catch (error) {
      // Fallback to system preferences if localStorage fails
      console.warn('Failed to access localStorage:', error);
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  // Separate useEffect for DOM manipulation
  useEffect(() => {
    if (isDarkMode === null) return;

    document.documentElement.classList.toggle('dark', isDarkMode);

    try {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }

    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => (prev === null ? false : !prev));
  };

  if (isDarkMode === null) return null;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
