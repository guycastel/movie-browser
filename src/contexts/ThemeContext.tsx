import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import type { ReactNode } from 'react'

interface ThemeContextType {
  isDarkMode: boolean
  toggleColorMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Initialize with saved preference, fallback to system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('chakra-ui-color-mode')
    if (savedTheme) {
      // User has a saved preference, respect it
      return savedTheme === 'dark'
    } else {
      // No saved preference, use system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  })

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    localStorage.setItem('chakra-ui-color-mode', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const toggleColorMode = useCallback(() => {
    setIsDarkMode(!isDarkMode)
  }, [isDarkMode])

  const value = useMemo(() => ({
    isDarkMode,
    toggleColorMode,
  }), [isDarkMode, toggleColorMode])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
