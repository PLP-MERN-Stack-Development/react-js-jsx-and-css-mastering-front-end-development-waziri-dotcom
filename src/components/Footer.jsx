import React from 'react'

export default function Footer(){
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <div>© {new Date().getFullYear()} SoftMaster — All rights reserved.</div>
        <div className="mt-1">
          <a className="underline" href="/privacy">Privacy</a> · <a className="underline" href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  )
}
