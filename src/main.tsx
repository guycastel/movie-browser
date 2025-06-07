import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import ThemeProvider from '@contexts/ThemeProvider'
import './index.css'
import App from './App.tsx'

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#eff6ff' },
          500: { value: '#3b82f6' },
          600: { value: '#2563eb' },
        },
      },
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>
)
