import { CheckCircle } from 'lucide-react'

interface SessionStatusProps {
  currentSession: number
  totalSessions: number
  autoCycle: boolean
  onAutoCycleChange: (value: boolean) => void
  desktopAlerts: boolean
  onDesktopAlertsChange: (value: boolean) => void
}

const SessionStatus: React.FC<SessionStatusProps> = ({
  currentSession,
  totalSessions,
  autoCycle,
  onAutoCycleChange,
  desktopAlerts,
  onDesktopAlertsChange,
}) => {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-8 w-full border-t border-surface-container pt-8">
      <div className="flex items-center gap-2">
        <CheckCircle size={20} className="text-secondary" />
        <span className="text-sm font-medium text-on-surface">
          Session {currentSession}/{totalSessions}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={autoCycle}
            onChange={(e) => onAutoCycleChange(e.target.checked)}
          />
          <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:bg-secondary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          <span className="ml-3 text-sm font-medium text-on-surface">Auto-cycle</span>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={desktopAlerts}
            onChange={(e) => onDesktopAlertsChange(e.target.checked)}
          />
          <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:bg-secondary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          <span className="ml-3 text-sm font-medium text-on-surface">Desktop Alerts</span>
        </label>
      </div>
    </div>
  )
}

export default SessionStatus
