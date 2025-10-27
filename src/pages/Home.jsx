import React from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold">Welcome</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            This project demonstrates React + Tailwind, hooks, context, and API integration.
          </p>
          <div className="mt-4">
            <Link to="/tasks"><Button>Open Task Manager</Button></Link>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">API Demo</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Browse posts fetched from JSONPlaceholder with search and pagination.
          </p>
          <div className="mt-4">
            <Link to="/api"><Button variant="secondary">Explore API</Button></Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
