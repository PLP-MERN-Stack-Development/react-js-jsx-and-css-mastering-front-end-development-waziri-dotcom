import { useState, useCallback } from 'react'

export default function useLocalStorage(key, initialValue) {
  const readValue = () => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch (e) {
      console.warn('useLocalStorage read error', e)
      return initialValue
    }
  }

  const [value, setValue] = useState(readValue)

  const setStoredValue = useCallback((val) => {
    try {
      const valueToStore = val instanceof Function ? val(value) : val
      setValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (e) {
      console.warn('useLocalStorage set error', e)
    }
  }, [key, value])

  return [value, setStoredValue]
}
