import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import Button from './Button'

export default function Navbar(){
  const { theme, toggle } = useTheme()
  const linkClass = ({ isActive }) => isActive
    ? 'text-brand font-semibold'
    : 'text-gray-600 dark:text-gray-300'

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="text-xl font-bold">SoftMaster</NavLink>
          <div className="hidden md:flex gap-3">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/tasks" className={linkClass}>Tasks</NavLink>
            <NavLink to="/api" className={linkClass}>API</NavLink>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={toggle}>
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </Button>
        </div>
      </div>
    </nav>
  )
}
