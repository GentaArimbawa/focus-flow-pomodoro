interface TimerDisplayProps {
  minutes: number
  seconds: number
  label: string
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ minutes, seconds, label }) => {
  const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return (
    <>
      <span className="font-mono text-xs tracking-[0.08em] uppercase text-on-surface-variant mb-2 block">
        {label}
      </span>
      <div className="font-heading text-[60px] leading-[80px] md:text-[100px] md:leading-[110px] text-primary tabular-nums">
        {formatted}
      </div>
    </>
  )
}

export default TimerDisplay
