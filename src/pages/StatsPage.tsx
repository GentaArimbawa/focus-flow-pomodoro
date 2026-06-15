import { useState, useEffect } from 'react'
import { Flame, CheckCircle, Clock, CalendarDays } from 'lucide-react'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const useTaskData = () => {
  const [totalTasksComplete, setTotalTasksComplete] = useState<number>(0)

  useEffect(() => {
    const storedTasks = localStorage.getItem('totalTasksComplete')
    if (storedTasks) {
      setTotalTasksComplete(parseInt(storedTasks, 10))
    }
  }, [])

  return { totalTasksComplete }
}

const useStreakData = () => {
  const [totalStreak, setTotalStreak] = useState<number>(0)

  useEffect(() => {
    const storedStreak = localStorage.getItem('totalStreak')
    if (storedStreak) {
      setTotalStreak(parseInt(storedStreak, 10))
    }
  }, [])

  return { totalStreak }
}

const useSectionData = () => {
  const [totalSectionsComplete, setTotalSectionsComplete] = useState<number>(0)

  useEffect(() => {
    const storedSections = localStorage.getItem('totalSectionsComplete')
    if (storedSections) {
      setTotalSectionsComplete(parseInt(storedSections, 10))
    }
  }, [])

  return { totalSectionsComplete }
}

interface DayActivity {
  date: string
  dayName: string
  active: boolean
}

const useWeeklyActivity = () => {
  const [days, setDays] = useState<DayActivity[]>([])

  useEffect(() => {
    const raw = localStorage.getItem('dailyActivity')
    const activityLog: string[] = raw ? JSON.parse(raw) : []

    const today = new Date()
    const dayOfWeek = today.getDay()
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    const monday = new Date(today)
    monday.setDate(today.getDate() + mondayOffset)

    const week: DayActivity[] = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      const dateStr = d.toISOString().split('T')[0]
      week.push({
        date: dateStr,
        dayName: WEEKDAYS[i],
        active: activityLog.includes(dateStr),
      })
    }
    setDays(week)
  }, [])

  return { days }
}

const StatsPage = () => {
  useEffect(() => {
    document.title = 'FocusFlow - Statistics'
  }, [])

  const { totalTasksComplete } = useTaskData()
  const { totalStreak } = useStreakData()
  const { totalSectionsComplete } = useSectionData()
  const { days } = useWeeklyActivity()

  const activeDays = days.filter((d) => d.active).length

  return (
    <div className="px-4 md:px-10 py-6 md:py-12 w-full mx-auto space-y-6">
      <h1 className="font-heading text-3xl text-primary mb-2">Statistics</h1>
      <p className="text-on-surface-variant text-sm mb-6">Track your focus journey</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white/80 backdrop-blur-[12px] border border-black/5 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center py-10">
          <div className="relative mb-3">
            <Flame size={56} className="text-orange-500" fill="currentColor" />
            {totalStreak > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalStreak}
              </span>
            )}
          </div>
          <h3 className="font-heading text-5xl text-primary mb-1">{totalStreak}</h3>
          <p className="text-on-surface-variant text-sm font-medium">Day Streak</p>
          <div className="flex items-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <Flame
                key={i}
                size={14}
                className={i < Math.min(totalStreak, 5) ? 'text-orange-500' : 'text-gray-300'}
                fill={i < Math.min(totalStreak, 5) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        </section>

        <section className="bg-white/80 backdrop-blur-[12px] border border-black/5 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center py-10">
          <CheckCircle size={40} className="text-green-600 mb-3" />
          <h3 className="font-heading text-5xl text-primary mb-1">{totalTasksComplete}</h3>
          <p className="text-on-surface-variant text-sm font-medium">Tasks Complete</p>
        </section>

        <section className="bg-white/80 backdrop-blur-[12px] border border-black/5 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center py-10">
          <Clock size={40} className="text-indigo-500 mb-3" />
          <h3 className="font-heading text-5xl text-primary mb-1">{totalSectionsComplete}</h3>
          <p className="text-on-surface-variant text-sm font-medium">Sessions Complete</p>
        </section>

        <section className="bg-white/80 backdrop-blur-[12px] border border-black/5 rounded-2xl p-6 shadow-sm py-10">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <CalendarDays size={20} className="text-primary" />
            <h2 className="font-heading text-lg text-primary">This Week</h2>
          </div>
          <div className="flex justify-center gap-3">
            {days.map((day) => (
              <div key={day.date} className="flex flex-col items-center gap-2">
                <span className="text-xs text-on-surface-variant font-medium">{day.dayName}</span>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    day.active
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-surface-container-highest text-on-surface-variant'
                  }`}
                >
                  {day.active ? (
                    <Flame size={16} fill="currentColor" />
                  ) : (
                    <span className="text-xs font-medium">{new Date(day.date).getDate()}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-1 mt-5 text-sm text-on-surface-variant">
            <Flame size={16} className="text-orange-500" fill="currentColor" />
            <span>{activeDays}/7 days this week</span>
          </div>
        </section>
      </div>
    </div>
  )
}

export default StatsPage
