import { NavLink } from 'react-router-dom'
import { Timer, BarChart, Settings } from 'lucide-react'

const navItems = [
  { to: '/timer', icon: Timer, label: 'Focus' },
  { to: '/stats', icon: BarChart, label: 'Stats' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

const MobileNavbar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 bg-surface-container-lowest shadow-sm md:hidden">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center px-4 py-1 rounded-xl transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-secondary-container text-on-secondary-container'
                : 'text-on-surface-variant'
            }`
          }
        >
          <Icon size={20} />
          <span className="text-xs font-medium">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default MobileNavbar
