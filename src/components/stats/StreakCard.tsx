import { Flame } from 'lucide-react'

interface StreakCardProps {
  days: number
}

const StreakCard: React.FC<StreakCardProps> = ({ days }) => {
  return (
    <div className="bg-white/80 backdrop-blur-[12px] border rounded-2xl p-6 shadow-sm border-l-4 border-tertiary-fixed-dim">
      <p className="text-sm font-medium text-on-surface-variant mb-2">Daily Streak</p>
      <div className="flex items-end gap-3">
        <h3 className="font-heading text-3xl text-primary">{days} days</h3>
        <Flame size={24} className="text-tertiary-container pb-1" fill="currentColor" />
      </div>
    </div>
  )
}

export default StreakCard
