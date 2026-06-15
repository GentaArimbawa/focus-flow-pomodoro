import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { PomodoroProvider } from './context/PomodoroContext'
import MainLayout from './layouts/MainLayout'
import TimerPage from './pages/TimerPage'
import SettingsPage from './pages/SettingsPage'
import StatsPage from './pages/StatsPage'

const App = () => {
  return (
    <PomodoroProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/timer" replace />} />
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
