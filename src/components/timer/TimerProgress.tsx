import type { ReactNode } from 'react'

interface TimerProgressProps {
  progress: number
  size?: number
  strokeWidth?: number
  children?: ReactNode
}

const TimerProgress: React.FC<TimerProgressProps> = ({
  progress,
  size = 320,
  strokeWidth = 6,
  children,
}) => {
  const radius = size * 0.48
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className="stroke-surface-container-highest"
          cx="50%"
          cy="50%"
          fill="transparent"
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="stroke-secondary transition-[stroke-dashoffset] duration-1000 linear"
          cx="50%"
          cy="50%"
          fill="transparent"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </svg>
      {children && (
        <div className="text-center z-10">
          {children}
        </div>
      )}
    </div>
  )
}

export default TimerProgress
