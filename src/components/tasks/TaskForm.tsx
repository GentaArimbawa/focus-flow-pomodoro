import { useState } from 'react'
import { Plus } from 'lucide-react'

interface TaskFormProps {
  onAdd: (title: string, estimatedPomodoros: number) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('')
  const [pomodoros, setPomodoros] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed, pomodoros)
    setTitle('')
    setPomodoros(1)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-3 border-t border-outline-variant/30">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 bg-surface-container-low border border-outline-variant rounded-xl px-3.5 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all"
      />
      <input
        type="number"
        min={1}
        max={99}
        value={pomodoros}
        onChange={(e) => setPomodoros(Math.max(1, Number(e.target.value)))}
        className="w-14 bg-surface-container-low border border-outline-variant rounded-xl px-2.5 py-2 text-sm text-center text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all"
        title="Estimated pomodoros"
      />
      <button
        type="submit"
        className="h-9 w-9 flex items-center justify-center rounded-xl bg-secondary text-on-secondary hover:bg-secondary/90 transition-colors active:scale-95 shrink-0"
        title="Add task"
      >
        <Plus size={18} />
      </button>
    </form>
  )
}

export default TaskForm
