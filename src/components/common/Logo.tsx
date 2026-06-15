interface LogoProps {
  showText?: boolean
  size?: number
  className?: string
}

const Logo = ({ showText = true, size = 32, className = '' }: LogoProps) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
      <path d="M12.5 10.5L23 16L12.5 21.5V10.5Z" fill="currentColor" />
      <circle cx="16" cy="3" r="2" fill="currentColor" />
      <circle cx="16" cy="29" r="2" fill="currentColor" />
      <circle cx="3" cy="16" r="2" fill="currentColor" />
      <circle cx="29" cy="16" r="2" fill="currentColor" />
    </svg>
    {showText && (
      <span className="font-heading text-lg font-semibold whitespace-nowrap">
        FocusFlow
      </span>
    )}
  </div>
)

export default Logo
