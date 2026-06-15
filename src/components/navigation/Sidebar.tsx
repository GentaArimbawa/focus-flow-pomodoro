import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Timer, ChartArea, Settings, ChevronRight, ChevronLeft, Play } from 'lucide-react'
import Logo from '../common/Logo'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  to: string
  expanded: boolean
}

const SidebarItem = ({ icon, label, to, expanded }: SidebarItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center py-3 px-4 my-1 font-medium rounded-l cursor-pointer transition-colors group relative ${isActive
        ? 'bg-secondary-container text-on-secondary-container'
        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
      }`
    }
  >
    <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
    <span className={`overflow-hidden transition-all duration-300 ${expanded ? 'w-52 ml-3' : 'w-0'}`}>
      {label}
    </span>
    {!expanded && (
      <div className="absolute left-full rounded-lg px-2.5 py-1.5 ml-4 bg-primary text-on-primary text-sm whitespace-nowrap shadow-md z-50 invisible opacity-0 -translate-x-2 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
        {label}
      </div>
    )}
  </NavLink>
)

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside className={`h-screen hidden md:block flex-shrink-0 transition-all duration-300 ${expanded ? 'w-64' : 'w-20'}`}>
      <nav className="h-full flex flex-col bg-surface-container-lowest border-r border-outline-variant/30 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'w-40' : 'w-0'}`}>
            <Logo size={28} className="text-primary" />
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors"
          >
            {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        <div className="flex-1 px-3 mt-4 space-y-1">
          <SidebarItem icon={<Timer size={20} />} label="Focus" to="/timer" expanded={expanded} />
          <SidebarItem icon={<ChartArea size={20} />} label="Stats" to="/stats" expanded={expanded} />
          <SidebarItem icon={<Settings size={20} />} label="Settings" to="/settings" expanded={expanded} />

        </div>

        <div className="border-t border-outline-variant/30 flex flex-col p-3 gap-3">
          <NavLink
            to="/timer"
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-colors ${expanded
                ? 'bg-primary text-on-primary hover:bg-primary/90'
                : 'bg-primary text-on-primary hover:bg-primary/90 w-10 h-10 p-0 flex items-center justify-center'
              }`}
          >
            <Play size={18} />
            <span className={`overflow-hidden transition-all duration-300 ${expanded ? 'w-auto' : 'w-0'}`}>
              Start Focus
            </span>
          </NavLink>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container font-heading font-semibold shrink-0">
              FF
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'w-40 ml-3' : 'w-0'}`}>
              <p className="text-sm font-semibold text-on-surface truncate">Focus Flow</p>
              <p className="text-xs text-on-surface-variant truncate">Focus your time</p>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
