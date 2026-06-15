import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export interface Task {
  id: string
  title: string
  estimatedPomodoros: number
  completed: boolean
  createdAt: string
}

export interface UseTasksReturn {
  tasks: Task[]
  addTask: (title: string, estimatedPomodoros: number) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  editTask: (id: string, title: string) => void
  completedCount: number
  totalCount: number
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useLocalStorage<Task[]>('focusflow-tasks', [])
  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length

  useEffect(() => {
    localStorage.setItem('totalTasksComplete', String(completedCount))
  }, [completedCount])

  const addTask = (title: string, estimatedPomodoros: number) => {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      estimatedPomodoros,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [task, ...prev])
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const editTask = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title } : t)),
    )
  }

  return { tasks, addTask, toggleTask, deleteTask, editTask, completedCount, totalCount }
}
