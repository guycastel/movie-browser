import { createContext } from 'react'

interface ThemeContextType {
  isDarkMode: boolean
  toggleColorMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default ThemeContext
