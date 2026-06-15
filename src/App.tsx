import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PomodoroProvider } from './context/PomodoroContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import TimerPage from './pages/TimerPage'
import SettingsPage from './pages/SettingsPage'
import StatsPage from './pages/StatsPage'

const App = () => {
  return (
    <PomodoroProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<MainLayout />}>
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Route>
        </Routes>
      </Router>
    </PomodoroProvider>
  )
}

export default App
