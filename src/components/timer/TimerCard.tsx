import TimerProgress from './TimerProgress'
import TimerDisplay from './TimerDisplay'
import TimerControls from './TimerControls'
import SessionStatus from './SessionStatus'
import { usePomodoro } from '../../context/PomodoroContext'

const MODE_LABEL: Record<string, string> = {
  POMODORO: 'POMODORO',
  SHORT_BREAK: 'SHORT BREAK',
  LONG_BREAK: 'LONG BREAK',
}

const TimerCard: React.FC = () => {
  const {
    mode, minutes, remainingSeconds, isRunning,
    currentSession, progress, autoCycle, setAutoCycle,
    settings, handleToggle, handleReset, handleSkip,
  } = usePomodoro()

  return (
    <section className="w-full max-w-270 mx-auto bg-white/80 backdrop-blur-[12px] border border-black/5 rounded-[2rem] p-6 md:p-10 flex flex-col items-center justify-center shadow-[0px_4px_20px_rgba(0,0,0,0.05)] relative overflow-hidden">
      <TimerProgress progress={progress}>
        <TimerDisplay
          minutes={minutes}
          seconds={remainingSeconds}
          label={MODE_LABEL[mode]}
        />
      </TimerProgress>

      <TimerControls
        isRunning={isRunning}
        onToggle={handleToggle}
        onReset={handleReset}
        onSkip={handleSkip}
      />

      <SessionStatus
        currentSession={currentSession}
        totalSessions={4}
        autoCycle={autoCycle}
        onAutoCycleChange={setAutoCycle}
        desktopAlerts={settings.desktopEnabled}
        onDesktopAlertsChange={() => {}}
      />
    </section>
  )
}

export default TimerCard
