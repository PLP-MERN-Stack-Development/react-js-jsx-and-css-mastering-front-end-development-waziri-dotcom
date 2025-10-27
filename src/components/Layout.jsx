import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout(){
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
