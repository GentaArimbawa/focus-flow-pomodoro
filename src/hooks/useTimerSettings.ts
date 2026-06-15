import { useLocalStorage } from './useLocalStorage'

export interface TimerSettings {
  pomodoro: number
  shortBreak: number
  longBreak: number
  soundEnabled: boolean
  desktopEnabled: boolean
}

const DEFAULT_SETTINGS: TimerSettings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  soundEnabled: true,
  desktopEnabled: false,
}

export function useTimerSettings() {
  return useLocalStorage<TimerSettings>('focusflow-settings', DEFAULT_SETTINGS)
}
