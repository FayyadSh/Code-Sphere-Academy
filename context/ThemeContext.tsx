'use client'
// ------------ Context ----------------
import { createContext } from 'react';
// ------------ Hooks ----------------
import { useState, useEffect, use } from 'react';
// ------------ Types ----------------
import { ThemeContextType, TTheme } from '@/types';
import { ReactNode, FC } from 'react';

// Create a context with ThemeContextType or undefined as its type
// The undefined is for when the context is used outside a provider
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider component that will wrap parts of the app that need theme access
const ThemeProvider: FC<{children: ReactNode}> = ({ children }) => {
  // State for theme with initial value from localStorage or default to 'dark'
  // The function version of useState ensures localStorage is only accessed on client side
  const [theme, setTheme] = useState<TTheme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as TTheme) || 'dark';
    }
    return 'dark';
  });
  
  // Function to toggle between themes
  const toggleTheme = (selectedTheme: TTheme) => {
    setTheme(selectedTheme);
  };

  // Effect that runs when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      // Add 'dark' class to HTML element for dark mode styling
      document.documentElement.classList.add('dark');
      // Persist theme preference in localStorage
      localStorage.setItem('theme', 'dark');
    } else {
      // Remove 'dark' class for light mode
      document.documentElement.classList.remove('dark');
      // Persist theme preference in localStorage
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // Value object that will be provided to consumers
  const value = { theme, toggleTheme };

  return (
    // Provide the theme context value to all children components
    <ThemeContext value={value}> 
      {children}
    </ThemeContext>
  );
}

export default ThemeProvider;

// Custom hook for consuming the theme context
export function useTheme() {
  // use() hook is a React experimental feature for reading context
  const context = use(ThemeContext);
  // Error handling if hook is used outside provider
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}