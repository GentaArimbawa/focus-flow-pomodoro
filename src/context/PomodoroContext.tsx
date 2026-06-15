import { createContext, useContext, useState, useRef, useMemo, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useTimerSettings } from '../hooks/useTimerSettings'
import type { TimerSettings } from '../hooks/useTimerSettings'
import { playNotificationSound, requestNotificationPermission, showDesktopNotification } from '../utils/notification'


export type TimerMode = 'POMODORO' | 'SHORT_BREAK' | 'LONG_BREAK'

interface PomodoroContextType {
  mode: TimerMode
  seconds: number
  isRunning: boolean
  currentSession: number
  autoCycle: boolean
  progress: number
  totalSeconds: number
  minutes: number
  remainingSeconds: number
  settings: TimerSettings
  setSettings: (value: TimerSettings | ((prev: TimerSettings) => TimerSettings)) => void
  refreshTimer: () => void
  handleToggle: () => void
  handleReset: () => void
  handleSkip: () => void
  setAutoCycle: (v: boolean) => void
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined)

export const PomodoroProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useTimerSettings()

  const modeDuration = useMemo((): Record<TimerMode, number> => ({
    POMODORO: settings.pomodoro * 60,
    SHORT_BREAK: settings.shortBreak * 60,
    LONG_BREAK: settings.longBreak * 60,
  }), [settings])

  const [mode, setMode] = useState<TimerMode>('POMODORO')
  const [seconds, setSeconds] = useState(modeDuration.POMODORO)
  const [isRunning, setIsRunning] = useState(false)
  const [currentSession, setCurrentSession] = useState(1)
  const [autoCycle, setAutoCycle] = useState(true)

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  useEffect(() => {
    if (!isRunning) {
      setSeconds(modeDuration[mode])
    }
  }, [settings, mode, isRunning, modeDuration])

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalSeconds = modeDuration[mode]
  const progress = ((totalSeconds - seconds) / totalSeconds) * 100
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const switchMode = useCallback((newMode: TimerMode) => {
    setMode(newMode)
    setSeconds(modeDuration[newMode])
    setIsRunning(false)
  }, [modeDuration])

  const MODE_LABEL: Record<TimerMode, string> = {
    POMODORO: 'POMODORO',
    SHORT_BREAK: 'SHORT BREAK',
    LONG_BREAK: 'LONG BREAK',
  }

  const handleSessionComplete = useCallback(() => {
    clearTimer()
    setIsRunning(false)

    if (settings.soundEnabled) playNotificationSound()
    if (settings.desktopEnabled) showDesktopNotification('FocusFlow', `${MODE_LABEL[mode]} session complete!`)

    if (mode === 'POMODORO') {
      setCurrentSession((prev) => prev + 1)

      const stored = localStorage.getItem('totalSectionsComplete')
      const count = stored ? parseInt(stored, 10) + 1 : 1
      localStorage.setItem('totalSectionsComplete', String(count))

      const today = new Date().toISOString().split('T')[0]
      const raw = localStorage.getItem('dailyActivity')
      const activity: string[] = raw ? JSON.parse(raw) : []
      if (!activity.includes(today)) {
        activity.push(today)
        localStorage.setItem('dailyActivity', JSON.stringify(activity))
      }

      if (currentSession % 4 === 0) {
        switchMode('LONG_BREAK')
      } else {
        switchMode('SHORT_BREAK')
      }
    } else {
      switchMode('POMODORO')
    }
  }, [mode, currentSession, settings.soundEnabled, settings.desktopEnabled, clearTimer, switchMode])

  const refreshTimer = useCallback(() => {
    clearTimer()
    setSeconds(modeDuration[mode])
  }, [mode, modeDuration, clearTimer])

  const handleToggle = useCallback(() => {
    if (isRunning) {
      clearTimer()
      setIsRunning(false)
    } else {
      setIsRunning(true)
    }
  }, [isRunning, clearTimer])

  const handleReset = useCallback(() => {
    clearTimer()
    setSeconds(modeDuration[mode])
    setIsRunning(false)
  }, [mode, modeDuration, clearTimer])

  const handleSkip = useCallback(() => {
    clearTimer()
    if (mode === 'POMODORO') {
      setCurrentSession((prev) => prev + 1)
      if (currentSession % 4 === 0) {
        switchMode('LONG_BREAK')
      } else {
        switchMode('SHORT_BREAK')
      }
    } else {
      switchMode('POMODORO')
    }
  }, [mode, currentSession, clearTimer, switchMode])

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          handleSessionComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return clearTimer
  }, [isRunning, clearTimer, handleSessionComplete])

  return (
    <PomodoroContext.Provider
      value={{
        mode,
        seconds,
        isRunning,
        currentSession,
        autoCycle,
        progress,
        totalSeconds,
        minutes,
        remainingSeconds,
        settings,
        setSettings,
        refreshTimer,
        handleToggle,
        handleReset,
        handleSkip,
        setAutoCycle,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  )
}

export const usePomodoro = () => {
  const context = useContext(PomodoroContext)
  if (!context) {
    throw new Error('usePomodoro must be used within PomodoroProvider')
  }
  return context
}
