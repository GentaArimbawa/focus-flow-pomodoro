import { Pencil, Trash2, Check, Clock } from 'lucide-react'
import { useState } from 'react'
import type { Task } from '../../hooks/useTasks'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, title: string) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)

  const handleSave = () => {
    const trimmed = editTitle.trim()
    if (trimmed) {
      onEdit(task.id, trimmed)
    } else {
      setEditTitle(task.title)
    }
    setEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setEditTitle(task.title)
      setEditing(false)
    }
  }

  return (
    <div className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-colors group hover:bg-surface-container-low ${task.completed ? 'opacity-60' : ''}`}>
      <button
        onClick={() => onToggle(task.id)}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          task.completed
            ? 'bg-secondary border-secondary text-on-secondary'
            : 'border-outline-variant hover:border-secondary'
        }`}
      >
        {task.completed && <Check size={12} strokeWidth={3} />}
      </button>

      {editing ? (
        <input
          autoFocus
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg px-2.5 py-1 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/40"
        />
      ) : (
        <span
          onClick={() => { setEditing(true); setEditTitle(task.title) }}
          className={`flex-1 text-sm cursor-pointer transition-colors ${
            task.completed ? 'line-through text-on-surface-variant' : 'text-on-surface'
          }`}
        >
          {task.title}
        </span>
      )}

      <div className="flex items-center gap-1.5 shrink-0">
        {task.estimatedPomodoros > 0 && (
          <span className="flex items-center gap-1 text-xs text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded-full">
            <Clock size={12} />
            {task.estimatedPomodoros}
          </span>
        )}
        {!editing && (
          <>
            <button
              onClick={() => { setEditing(true); setEditTitle(task.title) }}
              className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-on-surface-variant hover:bg-surface-container-high transition-all"
              title="Edit"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-on-surface-variant hover:bg-error-container hover:text-error transition-all"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TaskItem
