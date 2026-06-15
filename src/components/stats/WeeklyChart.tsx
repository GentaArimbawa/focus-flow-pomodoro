import { TrendingUp } from 'lucide-react'

interface DayData {
  day: string
  value: number
}

const defaultData: DayData[] = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 60 },
  { day: 'Wed', value: 85 },
  { day: 'Thu', value: 50 },
  { day: 'Fri', value: 70 },
  { day: 'Sat', value: 30 },
  { day: 'Sun', value: 20 },
]

interface WeeklyChartProps {
  data?: DayData[]
}

const WeeklyChart: React.FC<WeeklyChartProps> = ({ data = defaultData }) => {
  return (
    <div className="bg-white/80 backdrop-blur-[12px] border border-black/5 rounded-2xl p-6 shadow-sm flex flex-col min-h-[300px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-on-surface">Weekly Distribution</h3>
        <TrendingUp size={16} className="text-on-surface-variant" />
      </div>
      <div className="flex-grow flex items-end justify-between gap-2 px-2">
        {data.map((d) => (
          <div
            key={d.day}
            className="w-full bg-surface-container-high rounded-t-lg hover:bg-secondary transition-colors group relative cursor-pointer"
            style={{ height: `${d.value}%` }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap">
              {d.day}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeeklyChart
