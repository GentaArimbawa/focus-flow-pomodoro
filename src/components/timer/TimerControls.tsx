import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'

interface TimerControlsProps {
  isRunning: boolean
  onToggle: () => void
  onReset: () => void
  onSkip: () => void
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onToggle,
  onReset,
  onSkip,
}) => {
  return (
    <div className="flex items-center gap-8 mt-12">
      <button
        className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-95"
        title="Reset"
        onClick={onReset}
      >
        <RotateCcw size={20} />
      </button>

      <button
        className={`h-16 px-10 rounded-full text-lg font-medium hover:opacity-90 active:scale-95 transition-all shadow-lg flex items-center gap-3 ${
          isRunning
            ? 'bg-surface-container-highest text-primary'
            : 'bg-primary text-on-primary'
        }`}
        onClick={onToggle}
      >
        {isRunning ? (
          <>
            <Pause size={20} fill="currentColor" />
            <span>Pause Session</span>
          </>
        ) : (
          <>
            <Play size={20} fill="currentColor" />
            <span>Start Focus</span>
          </>
        )}
      </button>

      <button
        className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-95"
        title="Skip"
        onClick={onSkip}
      >
        <SkipForward size={20} />
      </button>
    </div>
  )
}

export default TimerControls
