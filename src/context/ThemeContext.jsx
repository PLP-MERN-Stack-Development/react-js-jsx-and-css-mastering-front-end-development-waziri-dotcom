import React, { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [stored, setStored] = useLocalStorage('theme', 'light')
  const [theme, setTheme] = useState(stored)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    setStored(theme)
  }, [theme, setStored])

  const toggle = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
