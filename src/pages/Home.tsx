import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Timer, CheckCircle, BarChart3, Bell, ArrowRight, ExternalLink, Mail, Menu, X, Play, Clock, Flame } from 'lucide-react'
import Logo from '../components/common/Logo'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'features', label: 'Features' },
  { id: 'contact', label: 'Contact' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  desc: string
}

const FeatureCard = ({ icon: Icon, title, desc }: FeatureCardProps) => (
  <div className="bg-white/80 backdrop-blur-[12px] border border-black/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-10 h-10 bg-secondary-container rounded-xl flex items-center justify-center mb-4">
      <Icon size={20} className="text-on-secondary-container" />
    </div>
    <h3 className="font-heading text-lg text-primary mb-2">{title}</h3>
    <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
  </div>
)

const Home = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.title = 'FocusFlow - Focus to Your Goals'
  }, [])

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-[12px] border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 md:px-10 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
            <Logo size={28} className="text-primary" showText />
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/timer"
              className="bg-primary text-on-primary text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>

          <button className="md:hidden p-1 text-on-surface" onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-black/5 px-4 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { scrollTo(item.id); setMobileOpen(false) }}
                className="text-sm font-medium text-left text-on-surface-variant hover:text-primary py-1"
              >
                {item.label}
              </button>
            ))}
            <Link to="/timer" className="bg-primary text-on-primary text-sm font-medium px-5 py-2.5 rounded-lg text-center mt-1">
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="pt-28 md:pt-36 pb-16 md:pb-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* text */}
            <div className="flex-1 text-center md:text-left">
              <p className="inline-flex items-center gap-1.5 bg-secondary-container text-on-secondary-container text-xs font-medium px-3 py-1.5 rounded-full mb-5">
                <Flame size={14} className="text-orange-500" fill="currentColor" />
                Pomodoro Technique
              </p>
              <h1 className="font-heading text-4xl md:text-6xl font-semibold text-primary leading-[1.1]">
                Focus to your<br />
                <span className="text-secondary">goals</span>
              </h1>
              <p className="text-on-surface-variant text-base md:text-lg mt-4 max-w-md leading-relaxed">
                Master your time with the Pomodoro technique. Stay focused, track your progress, and achieve more — one session at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center md:justify-start">
                <Link
                  to="/timer"
                  className="bg-primary text-on-primary font-medium px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Start Focusing <ArrowRight size={18} />
                </Link>
                <button
                  onClick={() => scrollTo('features')}
                  className="border border-outline-variant text-on-surface font-medium px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
                >
                  <Play size={16} /> See Features
                </button>
              </div>
            </div>

            {/* app capture mockup */}
            <div className="flex-1 w-full max-w-sm mx-auto md:mx-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-secondary/20 via-primary/5 to-transparent rounded-3xl blur-xl" />
                <div className="relative bg-white rounded-2xl shadow-xl border border-black/5 p-6">
                  {/* window dots */}
                  <div className="flex items-center gap-1.5 mb-6">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="ml-2 text-[10px] font-medium text-on-surface-variant/60">FocusFlow — Pomodoro</span>
                  </div>

                  {/* timer circle */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="44" fill="none" stroke="#e0e3e5" strokeWidth="4" />
                        <circle cx="50" cy="50" r="44" fill="none" stroke="#006a61" strokeWidth="4" strokeDasharray="276.46" strokeDashoffset="69.1" strokeLinecap="round" />
                      </svg>
                      <div className="text-center">
                        <p className="text-[10px] font-medium text-on-surface-variant tracking-[0.2em]">POMODORO</p>
                        <p className="font-heading text-4xl text-primary font-semibold tracking-tight mt-1">25:00</p>
                      </div>
                    </div>

                    {/* controls */}
                    <div className="flex items-center gap-4 mt-5">
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center cursor-pointer">
                        <div className="w-0 h-0 border-t-6 border-t-transparent border-l-[10px] border-l-on-surface-variant border-b-6 border-b-transparent ml-0.5" />
                      </div>
                    </div>

                    {/* session dots */}
                    <div className="flex items-center gap-1.5 mt-5">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i < 1 ? 'bg-secondary' : 'bg-surface-container-highest'}`} />
                      ))}
                      <span className="text-[11px] text-on-surface-variant ml-2">Session 1 / 4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-16 md:py-24 bg-surface-container-low">
        <div className="max-w-6xl mx-auto px-4 md:px-10 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-primary">About FocusFlow</h2>
          <div className="w-12 h-1 bg-secondary rounded-full mx-auto mt-4 mb-6" />
          <p className="text-on-surface-variant text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            FocusFlow is a Pomodoro timer built to help you work smarter, not harder.
            By breaking your work into focused intervals with short breaks, you maintain
            high concentration while avoiding burnout. Track your tasks, monitor your
            streaks, and build a productive rhythm that sticks — all in a clean,
            distraction-free interface.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="bg-white/60 rounded-2xl p-6">
              <Clock size={28} className="text-secondary mx-auto mb-3" />
              <h3 className="font-heading text-primary font-semibold">25 min Focus</h3>
              <p className="text-sm text-on-surface-variant mt-1">Deep work intervals</p>
            </div>
            <div className="bg-white/60 rounded-2xl p-6">
              <Timer size={28} className="text-secondary mx-auto mb-3" />
              <h3 className="font-heading text-primary font-semibold">5 min Break</h3>
              <p className="text-sm text-on-surface-variant mt-1">Recharge between sessions</p>
            </div>
            <div className="bg-white/60 rounded-2xl p-6">
              <CheckCircle size={28} className="text-secondary mx-auto mb-3" />
              <h3 className="font-heading text-primary font-semibold">Track Progress</h3>
              <p className="text-sm text-on-surface-variant mt-1">Stats & streaks that motivate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-10">
          <div className="text-center">
            <h2 className="font-heading text-3xl md:text-4xl text-primary">Features</h2>
            <div className="w-12 h-1 bg-secondary rounded-full mx-auto mt-4 mb-4" />
            <p className="text-on-surface-variant max-w-xl mx-auto">Everything you need to stay in the zone</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <FeatureCard icon={Timer} title="Pomodoro Timer" desc="Customizable focus and break intervals with auto-cycle between sessions." />
            <FeatureCard icon={CheckCircle} title="Task Management" desc="Create, edit, and track tasks with estimated pomodoro counts per task." />
            <FeatureCard icon={BarChart3} title="Statistics" desc="View streaks, completed sessions, task counts, and a weekly activity heatmap." />
            <FeatureCard icon={Bell} title="Notifications" desc="Audio alerts and desktop notifications when your focus session ends." />
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-16 md:py-24 bg-surface-container-low">
        <div className="max-w-6xl mx-auto px-4 md:px-10 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-primary">Get in Touch</h2>
          <div className="w-12 h-1 bg-secondary rounded-full mx-auto mt-4 mb-4" />
          <p className="text-on-surface-variant max-w-md mx-auto">
            Have feedback, suggestions, or just want to say hi? I'd love to hear from you.
          </p>
          <a
            href="mailto:gustibagus826@gmail.com"
            className="inline-flex items-center gap-2 mt-6 bg-primary text-on-primary font-medium px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Mail size={18} /> Send Email
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-primary text-on-primary py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-80">
            &copy; {new Date().getFullYear()} FocusFlow. Built with focus.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/GentaArimbawa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              <ExternalLink size={16} /> GentaArimbawa
            </a>
            <a
              href="mailto:gustibagus826@gmail.com"
              className="flex items-center gap-1.5 text-sm opacity-80 hover:opacity-100 transition-opacity"
            >
              <Mail size={16} /> gustibagus826@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
