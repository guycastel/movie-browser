import { useState, useMemo, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import ThemeContext from './ThemeContext'

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize with saved preference, fallback to system preference
    const savedTheme = localStorage.getItem('chakra-ui-color-mode')
    if (savedTheme) {
      return savedTheme === 'dark'
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    localStorage.setItem('chakra-ui-color-mode', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const toggleColorMode = useCallback(() => {
    setIsDarkMode(!isDarkMode)
  }, [isDarkMode])

  const contextValue = useMemo(() => ({
    isDarkMode,
    toggleColorMode
  }), [isDarkMode, toggleColorMode])

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
