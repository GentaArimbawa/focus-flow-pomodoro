import { useState, useEffect } from 'react'
import { User, Clock, Bell, Monitor, ChevronDown } from 'lucide-react'
import { usePomodoro } from '../context/PomodoroContext'
import { useLocalStorage } from '../hooks/useLocalStorage'

const TOGGLE_CLASSES = "w-11 h-6 bg-surface-container-highest rounded-full peer-checked:bg-secondary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"

const SettingsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'FocusFlow - Settings'
  }, [])

  const [name, setName] = useLocalStorage('focusflow-name', '')
  const [email, setEmail] = useLocalStorage('focusflow-email', '')
  const { settings: timerSettings, setSettings: setTimerSettings, refreshTimer } = usePomodoro()
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')

  return (
    <div className="px-4 md:px-10 py-6 md:py-12 w-full  mx-auto space-y-6">
      <h1 className="font-heading text-3xl text-primary mb-2">Settings</h1>
      <p className="text-on-surface-variant text-sm mb-6">Customize your FocusFlow experience</p>

      {/* Row 1: Profile */}
      <section className="bg-white/80 backdrop-blur-[12px] border border-black/5 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <User size={20} className="text-primary" />
          <h2 className="font-heading text-xl text-primary">Profile</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-on-surface-variant block mb-1.5">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-on-surface-variant block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all"
            />
          </div>
        </div>
      </section>

      {/* Row 2: Time Duration */}
      <section className="bg-white/80 backdrop-blur-[12px] border border-black/5 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-primary" />
            <h2 className="font-heading text-xl text-primary">Time Duration</h2>
          </div>
          <button
            onClick={refreshTimer}
            className="text-sm font-medium text-on-secondary-container bg-secondary-container hover:bg-secondary-fixed-dim px-4 py-2 rounded-xl transition-colors hover:cursor-pointer active:scale-95"
          >
            Apply to Timer
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DurationSlider
            label="Pomodoro"
            value={timerSettings.pomodoro}
            min={1}
            max={60}
            unit="min"
            onChange={(v) => setTimerSettings((prev) => ({ ...prev, pomodoro: v }))}
          />
          <DurationSlider
            label="Short Break"
            value={timerSettings.shortBreak}
            min={1}
            max={30}
            unit="min"
            onChange={(v) => setTimerSettings((prev) => ({ ...prev, shortBreak: v }))}
          />
          <DurationSlider
            label="Long Break"
            value={timerSettings.longBreak}
            min={1}
            max={60}
            unit="min"
            onChange={(v) => setTimerSettings((prev) => ({ ...prev, longBreak: v }))}
          />
        </div>
      </section>

      {/* Row 3: Notifications + Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Notifications */}
        <section className="bg-white/80 backdrop-blur-[12px] border border-black/5 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Bell size={20} className="text-primary" />
            <h2 className="font-heading text-xl text-primary">Notifications</h2>
          </div>
          <div className="space-y-5">
            <ToggleRow
              id="sound-notif"
              label="Sound Notification"
              description="Play a sound when a session ends"
              checked={timerSettings.soundEnabled}
              onChange={(v) => setTimerSettings((prev) => ({ ...prev, soundEnabled: v }))}
            />
            <ToggleRow
              id="desktop-notif"
              label="Desktop Notification"
              description="Show a desktop alert when a session ends"
              checked={timerSettings.desktopEnabled}
              onChange={(v) => setTimerSettings((prev) => ({ ...prev, desktopEnabled: v }))}
            />
          </div>
        </section>

        {/* Right: Display */}
        <section className="bg-white/80 backdrop-blur-[12px] border border-black/5 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Monitor size={20} className="text-primary" />
            <h2 className="font-heading text-xl text-primary">Display</h2>
          </div>
          <div className="space-y-5">
            <ToggleRow
              id="dark-mode"
              label="Dark Mode"
              description="Switch between light and dark themes"
              checked={darkMode}
              onChange={setDarkMode}
            />
            <div>
              <label className="text-sm font-medium text-on-surface block mb-1">Language</label>
              <p className="text-xs text-on-surface-variant mb-2">Choose your preferred language</p>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all cursor-pointer"
                >
                  <option value="en">English</option>
                  <option value="id">Bahasa Indonesia</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="ja">日本語</option>
                  <option value="zh">中文</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

interface DurationSliderProps {
  label: string
  value: number
  min: number
  max: number
  unit: string
  onChange: (v: number) => void
}

const DurationSlider: React.FC<DurationSliderProps> = ({ label, value, min, max, unit, onChange }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-on-surface">{label}</span>
      <span className="font-heading text-2xl text-primary">{value}<span className="text-sm text-on-surface-variant ml-1">{unit}</span></span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-container-highest accent-secondary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
    />
    <div className="flex justify-between text-xs text-on-surface-variant mt-1">
      <span>{min}{unit}</span>
      <span>{max}{unit}</span>
    </div>
  </div>
)

interface ToggleRowProps {
  id: string
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}

const ToggleRow: React.FC<ToggleRowProps> = ({ id, label, description, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <div>
      <label htmlFor={id} className="text-sm font-medium text-on-surface cursor-pointer">{label}</label>
      <p className="text-xs text-on-surface-variant mt-0.5">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className={TOGGLE_CLASSES} />
    </label>
  </div>
)

export default SettingsPage
