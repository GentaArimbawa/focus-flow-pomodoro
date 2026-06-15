import { useState, useEffect } from 'react'
import { TrendingUp } from 'lucide-react'
import TimerCard from '../components/timer/TimerCard'
import TaskList from '../components/tasks/TaskList'
import StatCard from '../components/stats/StatCard'
import StreakCard from '../components/stats/StreakCard'
import WeeklyChart from '../components/stats/WeeklyChart'
import { useTimerSettings } from '../hooks/useTimerSettings'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getWeekData(activity: string[]) {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const monday = new Date(today)
  monday.setDate(today.getDate() + mondayOffset)

  return WEEKDAYS.map((day, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const dateStr = d.toISOString().split('T')[0]
    const count = activity.filter((a) => a === dateStr).length
    return { day, value: Math.min(count * 25, 100) }
  })
}

function calcStreak(activity: string[]) {
  let count = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    if (activity.includes(d.toISOString().split('T')[0])) {
      count++
    } else {
      break
    }
  }
  return count
}

const TimerPage: React.FC = () => {
  useEffect(() => {
    document.title = 'FocusFlow - Pomodoro Timer'
  }, [])

  const [settings] = useTimerSettings()
  const [totalSessions] = useState(() => {
    const stored = localStorage.getItem('totalSectionsComplete')
    return stored ? parseInt(stored, 10) : 0
  })
  const [dailyActivity] = useState(() => {
    const raw = localStorage.getItem('dailyActivity')
    return raw ? JSON.parse(raw) as string[] : []
  })
  const [streak] = useState(() => calcStreak(dailyActivity))

  const totalFocusMinutes = totalSessions * settings.pomodoro
  const hours = Math.floor(totalFocusMinutes / 60)
  const mins = totalFocusMinutes % 60
  const focusTimeStr = `${hours}h ${mins}m`
  const weekData = getWeekData(dailyActivity)

  return (
    <div className="px-4 md:px-10 py-6 md:py-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-8 flex flex-col gap-6 md:gap-12">
          <TimerCard />
          <TaskList />
        </div>
        <div className="md:col-span-4 flex flex-col gap-6">
          <StatCard
            label="Total Focus Time"
            value={focusTimeStr}
            trend="12% from last week"
            trendIcon={<TrendingUp size={14} />}
            borderColor="border-primary"
          />
          <StatCard
            label="Total Sessions"
            value={String(totalSessions)}
            borderColor="border-secondary"
          >
            <div className="flex gap-1 mt-4">
              <div className="h-1 flex-1 bg-secondary rounded-full" />
              <div className="h-1 flex-1 bg-secondary rounded-full" />
              <div className="h-1 flex-1 bg-secondary rounded-full" />
              <div className="h-1 flex-1 bg-surface-container-highest rounded-full" />
              <div className="h-1 flex-1 bg-surface-container-highest rounded-full" />
            </div>
          </StatCard>
          <StreakCard days={streak} />
          <WeeklyChart data={weekData} />
        </div>
      </div>
    </div>
  )
}

export default TimerPage
