import { ListChecks } from 'lucide-react'
import { useTasks } from '../../hooks/useTasks'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'

const TaskList: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask, editTask, completedCount, totalCount } = useTasks()

  return (
    <section className="bg-white/80 backdrop-blur-[12px] border border-black/5 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <ListChecks size={20} className="text-primary" />
          <h2 className="font-heading text-xl text-primary">Tasks</h2>
        </div>
        {totalCount > 0 && (
          <span className="text-xs text-on-surface-variant bg-surface-container-high px-2.5 py-1 rounded-full">
            {completedCount}/{totalCount}
          </span>
        )}
      </div>

      <div className="space-y-0.5">
        {tasks.length === 0 ? (
          <p className="text-sm text-on-surface-variant/60 text-center py-8">No tasks yet. Add one below.</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))
        )}
      </div>

      <TaskForm onAdd={addTask} />
    </section>
  )
}

export default TaskList
