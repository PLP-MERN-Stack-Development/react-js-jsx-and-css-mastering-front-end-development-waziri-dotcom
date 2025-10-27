import React, { useEffect, useMemo, useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import useLocalStorage from '../hooks/useLocalStorage'

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between gap-4 p-2">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <div className={`text-sm ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.text}</div>
      </div>
      <div>
        <Button variant="danger" onClick={() => onDelete(task.id)}>Delete</Button>
      </div>
    </div>
  )
}

export default function TasksPage(){
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all') // all, active, completed

  useEffect(() => {
    // Example: load sample tasks if empty (optional)
    if (tasks.length === 0) {
      setTasks([
        { id: Date.now(), text: 'Welcome — add your first task', completed: false }
      ])
    }
    // eslint-disable-next-line
  }, [])

  const addTask = () => {
    if (!text.trim()) return
    const newTask = { id: Date.now() + Math.random(), text: text.trim(), completed: false }
    setTasks(prev => [newTask, ...prev])
    setText('')
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const filtered = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed)
    if (filter === 'completed') return tasks.filter(t => t.completed)
    return tasks
  }, [tasks, filter])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Task Manager</h1>

      <Card>
        <div className="flex gap-2">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent"
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <Button onClick={addTask}>Add</Button>
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant={filter === 'all' ? 'primary' : 'secondary'} onClick={() => setFilter('all')}>All</Button>
          <Button variant={filter === 'active' ? 'primary' : 'secondary'} onClick={() => setFilter('active')}>Active</Button>
          <Button variant={filter === 'completed' ? 'primary' : 'secondary'} onClick={() => setFilter('completed')}>Completed</Button>
        </div>

        <div className="mt-4 divide-y">
          {filtered.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No tasks</div>
          ) : (
            filtered.map(task => (
              <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
