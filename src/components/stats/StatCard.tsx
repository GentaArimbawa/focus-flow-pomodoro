import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string
  trend?: string
  trendIcon?: ReactNode
  borderColor: string
  children?: ReactNode
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  trend,
  trendIcon,
  borderColor,
  children,
}) => {
  return (
    <div className={`bg-white/80 backdrop-blur-[12px] border border-black/5 rounded-2xl p-6 shadow-sm border-l-4 ${borderColor}`}>
      <p className="text-sm font-medium text-on-surface-variant mb-2">{label}</p>
      <h3 className="font-heading text-3xl text-primary">{value}</h3>
      {trend && (
        <p className="text-secondary text-sm mt-2 flex items-center gap-1">
          {trendIcon}
          {trend}
        </p>
      )}
      {children}
    </div>
  )
}

export default StatCard
