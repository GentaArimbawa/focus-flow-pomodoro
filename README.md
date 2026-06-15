# FocusFlow - Pomodoro Timer

A modern Pomodoro timer built with React 19, TypeScript, Tailwind CSS v4, and Vite. Helps you stay focused with timed work sessions, task tracking, and progress statistics.

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** for build tooling
- **Tailwind CSS v4** with Material Design 3 color system
- **React Router v7** for client-side routing
- **Lucide React** for icons
- **localStorage** for data persistence (Firebase planned)

## Features

- **Pomodoro Timer** — Customizable focus/break intervals with circular progress ring, audio + desktop notifications, and auto-cycle support.
- **Task Management** — Add, edit, complete, and delete tasks with estimated pomodoro counts. Tracks total completed tasks.
- **Statistics Dashboard** — View daily streak, total tasks completed, total sessions completed, and weekly activity heatmap.
- **Session Tracking** — Automatically logs completed pomodoro sessions and builds a daily activity log.
- **Responsive Layout** — Collapsible desktop sidebar and mobile bottom navigation.

## Getting Started

```bash
git clone <repo-url>
cd pomdoro-technicue
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  main.tsx                   Entry point with PomodoroProvider
  App.tsx                    Router setup (/timer, /settings, /stats)
  index.css                  Tailwind imports + custom theme tokens
  context/
    PomodoroContext.tsx       Timer state machine, session logging
  layouts/
    MainLayout.tsx            Sidebar + mobile navbar + outlet
  hooks/
    useLocalStorage.ts        Generic localStorage persistence
    useTimerSettings.ts       Timer duration & notification prefs
    useTasks.ts               Task CRUD with localStorage sync
  pages/
    TimerPage.tsx             Main dashboard (timer + tasks + stats)
    SettingsPage.tsx          Timer config, notifications, display
    StatsPage.tsx             Full statistics dashboard
  components/
    timer/                    TimerCard, TimerDisplay, TimerProgress,
                              TimerControls, SessionStatus
    tasks/                    TaskList, TaskItem, TaskForm
    stats/                    StatCard, StreakCard, WeeklyChart
    navigation/               Sidebar, MobileNavbar
    common/                   Logo
  utils/
    notification.ts           Sound & desktop notification helpers
  services/                   (placeholder for Firebase integration)
```

## How It Works

### Timer
The Pomodoro timer cycles through three modes: **Pomodoro** (focus), **Short Break**, and **Long Break**. Every 4 pomodoros triggers a long break. Sessions auto-advance when the timer reaches zero, with optional sound and desktop notifications.

### Task Tracking
Tasks are stored in `localStorage` under `focusflow-tasks`. Completing a task toggles its `completed` flag and syncs the total count to the stats page. Each task can have an estimated pomodoro count to help plan your focus sessions.

### Statistics
Session completions are logged to `localStorage` (`totalSectionsComplete`, `dailyActivity`). The stats page reads this data to display:
- **Day Streak** — Consecutive days with at least one completed session
- **Tasks Complete** — Running count of completed tasks
- **Sessions Complete** — Total pomodoro sessions finished
- **This Week** — 7-day activity heatmap
- **Weekly Distribution** — Bar chart of daily focus activity

### Settings
Configure pomodoro (1-60 min), short break (1-30 min), and long break (1-60 min) durations. Toggle sound effects and desktop notifications. Display options include language selection.

## Deployment

The app is a static SPA and can be deployed to any static hosting provider:

```bash
npm run build
# Deploy the dist/ folder to Vercel, Netlify, Cloudflare Pages, etc.
```

## Design

See [DESIGN.md](./DESIGN.md) for the full design system documentation, including color tokens, typography scale, layout guidelines, and component specifications.
