# Full file contents reference

All paths relative to project root. Use these to recreate the codebase or verify contents.

---

## package.json

```json
{
  "name": "pm-dashboard",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.460.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "typescript": "~5.6.2",
    "vite": "^5.4.10"
  }
}
```

---

## vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": "."
  },
  "include": ["src"]
}
```

---

## tsconfig.node.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true
  },
  "include": ["vite.config.ts"]
}
```

---

## tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}
```

---

## postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PM Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## src/main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

---

## src/App.tsx

```tsx
import { Routes, Route } from 'react-router-dom'
import { DashboardProvider, useDashboard } from './contexts/DashboardContext'
import { Dashboard } from './pages/Dashboard'
import { AccountSettings } from './pages/AccountSettings'
import { CreateWorkspaceModal } from './components/CreateWorkspaceModal'
import { GettingStartedModal } from './components/GettingStartedModal'

function AppModals() {
  const {
    isCreateWorkspaceOpen,
    setOpenCreateWorkspace,
    isGettingStartedOpen,
    setOpenGettingStarted,
  } = useDashboard()
  return (
    <>
      <CreateWorkspaceModal
        isOpen={isCreateWorkspaceOpen}
        onClose={() => setOpenCreateWorkspace(false)}
      />
      <GettingStartedModal
        isOpen={isGettingStartedOpen}
        onClose={() => setOpenGettingStarted(false)}
      />
    </>
  )
}

export default function App() {
  return (
    <DashboardProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<AccountSettings />} />
      </Routes>
      <AppModals />
    </DashboardProvider>
  )
}
```

---

## src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-50 text-gray-900 font-sans antialiased;
}

*:focus-visible {
  @apply outline-2 outline-offset-2 outline-primary-500;
}
```

---

## src/vite-env.d.ts

```ts
/// <reference types="vite/client" />
```

---

## src/types.ts

```ts
export interface GettingStartedStep {
  id: string
  title: string
  description: string
  completed: boolean
  order: number
}

export interface CreateWorkspaceForm {
  name: string
  solution: string
  industry: string
  problem: string
  additionalDetails?: string
}
```

---

## src/data/mockData.ts

```ts
/**
 * Single source of truth for dashboard data.
 * Persisted in localStorage: selectedWorkspaceId, accordion open states only.
 */

export type ModuleItemStatus = 'done' | 'in_progress' | 'todo'

export interface ModuleItem {
  id: string
  title: string
  subtitle: string
  status: ModuleItemStatus
}

export interface WorkspaceModules {
  fit: ModuleItem[]
  build: ModuleItem[]
  launch: ModuleItem[]
}

export interface WorkspaceCounts {
  initiatives: number
}

export interface Workspace {
  id: string
  name: string
  summary: string
  progressPercent: number
  modules: WorkspaceModules
  counts: WorkspaceCounts
}

export interface User {
  username: string
  email: string
}

export const user: User = {
  username: 'User Name',
  email: 'user@example.com',
}

const fitModuleItems: ModuleItem[] = [
  { id: 'canvas', title: 'Canvas', subtitle: 'FIT > Build > Launch Canvas', status: 'done' },
  { id: 'problem-map', title: 'Problem Map', subtitle: 'Map the Problem-Opportunity Space', status: 'in_progress' },
  { id: 'story-map', title: 'Story Map', subtitle: 'Visualize and organize Initiatives into Epics and User Stories', status: 'in_progress' },
  { id: 'goals-metrics', title: 'Goals & Metrics', subtitle: 'Key Product Goals and Results', status: 'todo' },
]

const buildModuleItems: ModuleItem[] = [
  { id: 'product-strategy', title: 'Product Strategy', subtitle: 'Theme based Product Strategy', status: 'in_progress' },
  { id: 'planning-board', title: 'Planning Board', subtitle: 'Product Planning Board', status: 'in_progress' },
  { id: 'initiative-board', title: 'Initiative Board', subtitle: 'Product Initiative Board', status: 'in_progress' },
  { id: 'roadmap', title: 'Roadmap', subtitle: 'Visual Timeline for your Product', status: 'in_progress' },
]

const launchModuleItems: ModuleItem[] = [
  { id: 'launch-plan', title: 'Launch Plan', subtitle: 'Checklist and Plan for launching your Product', status: 'todo' },
  { id: 'growth-plan', title: 'Growth Plan', subtitle: 'Checklist and Plan for growing Users', status: 'todo' },
  { id: 'ideas-feedback', title: 'Ideas & Feedback', subtitle: 'Capture and plan for ideas and feedback', status: 'todo' },
]

export const workspaces: Workspace[] = [
  {
    id: '1',
    name: 'Agentum-Framework',
    summary: "We're building a python product that quickly...",
    progressPercent: 42,
    modules: {
      fit: [...fitModuleItems],
      build: [...buildModuleItems],
      launch: [...launchModuleItems],
    },
    counts: { initiatives: 24 },
  },
  {
    id: '2',
    name: 'Dyson Sphere Inc',
    summary: "We're building a scalable space energy infra...",
    progressPercent: 18,
    modules: {
      fit: [...fitModuleItems],
      build: [...buildModuleItems],
      launch: [...launchModuleItems],
    },
    counts: { initiatives: 12 },
  },
  {
    id: '3',
    name: 'Project Lumina',
    summary: "We're building an ambient context engine in t...",
    progressPercent: 8,
    modules: {
      fit: [...fitModuleItems],
      build: [...buildModuleItems],
      launch: [...launchModuleItems],
    },
    counts: { initiatives: 15 },
  },
]
```

---

## src/lib/storage.ts

```ts
import type { GettingStartedStep } from '../types'
import { user } from '../data/mockData'

const STORAGE_KEYS = {
  selectedWorkspaceId: 'pm-dashboard-selected-workspace-id',
  accordionOpenStates: 'pm-dashboard-accordion-open-states',
  userProfile: 'pm-dashboard-user-profile',
  gettingStartedSteps: 'pm-dashboard-getting-started-steps',
  feedbackOpen: 'pm-dashboard-feedback-open',
} as const

export function getSelectedWorkspaceId(): string {
  return getItem(STORAGE_KEYS.selectedWorkspaceId, '1')
}

export function setSelectedWorkspaceId(id: string): void {
  setItem(STORAGE_KEYS.selectedWorkspaceId, id)
}

export type AccordionOpenStates = Record<string, boolean>

export function getAccordionOpenStates(): AccordionOpenStates {
  return getItem(STORAGE_KEYS.accordionOpenStates, { '1': true })
}

export function setAccordionOpenStates(states: AccordionOpenStates): void {
  setItem(STORAGE_KEYS.accordionOpenStates, states)
}

export interface UserProfile {
  firstName: string
  lastName: string
  phone: string
  email: string
  passwordMask: string
}

const defaultProfile: UserProfile = {
  firstName: user.username.split(' ')[0] || 'User',
  lastName: user.username.split(' ').slice(1).join(' ') || 'Name',
  phone: '',
  email: user.email,
  passwordMask: '************',
}

export function getUserProfile(): UserProfile {
  return getItem(STORAGE_KEYS.userProfile, defaultProfile)
}

export function setUserProfile(profile: UserProfile): void {
  setItem(STORAGE_KEYS.userProfile, profile)
}

const defaultSteps: GettingStartedStep[] = [
  { id: '1', title: 'Workspace Setup', description: 'Enter your product overview, and let our AI get you started', completed: true, order: 1 },
  { id: '2', title: 'Explore the Canvas', description: 'See your product vision and strategy at a glance', completed: true, order: 2 },
  { id: '3', title: 'Map Problems', description: 'Define problem and opportunity space', completed: true, order: 3 },
  { id: '4', title: 'Build Roadmap', description: 'Plan initiatives and timeline', completed: true, order: 4 },
  { id: '5', title: 'Launch Plan', description: 'Prepare your launch checklist', completed: true, order: 5 },
  { id: '6', title: 'Invite Your Team', description: 'Collaborate with your stakeholders', completed: false, order: 6 },
]

export function getGettingStartedSteps(): GettingStartedStep[] {
  return getItem(STORAGE_KEYS.gettingStartedSteps, defaultSteps)
}

export function setGettingStartedSteps(steps: GettingStartedStep[]): void {
  setItem(STORAGE_KEYS.gettingStartedSteps, steps)
}

export function getFeedbackOpen(): boolean {
  return getItem(STORAGE_KEYS.feedbackOpen, false)
}

export function setFeedbackOpen(open: boolean): void {
  setItem(STORAGE_KEYS.feedbackOpen, open)
}

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return defaultValue
    return JSON.parse(raw) as T
  } catch {
    return defaultValue
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}
```

---

## src/contexts/DashboardContext.tsx

```tsx
import { createContext, useContext, useState, type ReactNode } from 'react'

interface DashboardContextValue {
  openCreateWorkspace: () => void
  openGettingStarted: () => void
  setOpenCreateWorkspace: (open: boolean) => void
  setOpenGettingStarted: (open: boolean) => void
  isCreateWorkspaceOpen: boolean
  isGettingStartedOpen: boolean
}

const DashboardContext = createContext<DashboardContextValue | null>(null)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [isCreateWorkspaceOpen, setOpenCreateWorkspace] = useState(false)
  const [isGettingStartedOpen, setOpenGettingStarted] = useState(false)
  return (
    <DashboardContext.Provider
      value={{
        openCreateWorkspace: () => setOpenCreateWorkspace(true),
        openGettingStarted: () => setOpenGettingStarted(true),
        setOpenCreateWorkspace,
        setOpenGettingStarted,
        isCreateWorkspaceOpen,
        isGettingStartedOpen,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider')
  return ctx
}
```

---

## src/pages/Dashboard.tsx

```tsx
import { useDashboard } from '../contexts/DashboardContext'
import { user, workspaces } from '../data/mockData'
import { Header } from '../components/Header'
import { StatCard } from '../components/StatCard'
import { WorkspaceProgress } from '../components/WorkspaceProgress'
import { GettingStartedButton } from '../components/GettingStartedModal'
import { FeedbackTab } from '../components/FeedbackTab'

export function Dashboard() {
  const { openCreateWorkspace, openGettingStarted } = useDashboard()

  const totalInitiatives = workspaces.reduce((acc, w) => acc + w.counts.initiatives, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 lg:px-6 py-6 max-w-6xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.username}!</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <StatCard label="Workspaces" value={workspaces.length} />
            <StatCard label="Users" value={1} />
            <StatCard label="Initiatives" value={totalInitiatives} />
          </div>
          <div className="lg:col-span-2">
            <WorkspaceProgress onCreateWorkspace={openCreateWorkspace} />
          </div>
        </div>
      </main>
      <GettingStartedButton onClick={openGettingStarted} />
      <FeedbackTab />
    </div>
  )
}
```

---

## src/components/Header.tsx

```tsx
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ChevronDown,
  User,
  Gauge,
  HelpCircle,
  Lightbulb,
  GitBranch,
  LayoutGrid,
  Flag,
  Rocket,
  TrendingUp,
  MessageSquare,
  Settings,
  ClipboardList,
  Puzzle,
  Map,
} from 'lucide-react'
import { Dropdown } from './Dropdown'
import { useDashboard } from '../contexts/DashboardContext'
import { workspaces } from '../data/mockData'
import { getSelectedWorkspaceId, setSelectedWorkspaceId, getUserProfile } from '../lib/storage'

const navItems = [
  {
    key: 'fit',
    label: 'Fit',
    items: [
      { icon: Lightbulb, title: 'Canvas', desc: 'FIT > Build > Launch Canvas' },
      { icon: GitBranch, title: 'Problem Map', desc: 'Map the Problem-Opportunity Space' },
      { icon: LayoutGrid, title: 'Story Map', desc: 'Visualize and organize Initiatives into Epics and User Stories' },
      { icon: Flag, title: 'Goals & Metrics', desc: 'Key Product Goals and Results' },
    ],
  },
  {
    key: 'build',
    label: 'Build',
    items: [
      { icon: Settings, title: 'Product Strategy', desc: 'Theme based Product Strategy' },
      { icon: ClipboardList, title: 'Planning Board', desc: 'Product Planning Board' },
      { icon: Puzzle, title: 'Initiative Board', desc: 'Product Initiative Board' },
      { icon: Map, title: 'Roadmap', desc: 'Visual Timeline for your Product' },
    ],
  },
  {
    key: 'launch',
    label: 'Launch',
    items: [
      { icon: Rocket, title: 'Launch Plan', desc: 'Checklist and Plan for launching your Product' },
      { icon: TrendingUp, title: 'Growth Plan', desc: 'Checklist and Plan for growing Users' },
      { icon: MessageSquare, title: 'Ideas & Feedback', desc: 'Capture and plan for ideas and feedback' },
    ],
  },
]

export function Header() {
  const location = useLocation()
  const { openCreateWorkspace } = useDashboard()
  const currentId = getSelectedWorkspaceId()
  const currentWorkspace = workspaces.find((w) => w.id === currentId) ?? workspaces[0]
  const profile = getUserProfile()
  const [openNav, setOpenNav] = useState<string | null>(null)
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-900 font-semibold hover:text-primary-600"
          >
            <Gauge className="w-5 h-5 text-primary-600" />
            <span>PM Dashboard</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1" aria-label="Main">
            {navItems.map(({ key, label, items }) => (
              <Dropdown
                key={key}
                isOpen={openNav === key}
                onClose={() => setOpenNav(null)}
                align="left"
                anchor={
                  <button
                    type="button"
                    onClick={() => setOpenNav(openNav === key ? null : key)}
                    className="flex items-center gap-0.5 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    aria-expanded={openNav === key}
                    aria-haspopup="true"
                  >
                    {label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                }
              >
                {items.map(({ icon: Icon, title, desc }) => (
                  <button
                    key={title}
                    type="button"
                    role="menuitem"
                    className="flex items-start gap-3 w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50"
                  >
                    <Icon className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">{title}</div>
                      <div className="text-xs text-gray-500">{desc}</div>
                    </div>
                  </button>
                ))}
              </Dropdown>
            ))}
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Files
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Dropdown
            isOpen={workspaceOpen}
            onClose={() => setWorkspaceOpen(false)}
            align="right"
            anchor={
              <button
                type="button"
                onClick={() => setWorkspaceOpen(!workspaceOpen)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                aria-expanded={workspaceOpen}
                aria-haspopup="true"
              >
                {currentWorkspace?.name ?? 'Workspace'}
                <ChevronDown className="w-4 h-4" />
              </button>
            }
          >
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Workspaces
            </div>
            {workspaces.map((w) => (
              <button
                key={w.id}
                type="button"
                role="menuitem"
                onClick={() => {
                  setSelectedWorkspaceId(w.id)
                  setWorkspaceOpen(false)
                }}
                className={`flex flex-col items-start w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${w.id === currentId ? 'bg-primary-50' : ''}`}
              >
                <span className="font-medium text-gray-900">{w.name}</span>
                {w.summary && (
                  <span className="text-xs text-gray-500 truncate w-full">{w.summary}</span>
                )}
              </button>
            ))}
            <button
              type="button"
              role="menuitem"
              className="flex items-center justify-center gap-2 w-full mx-2 mb-2 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-primary-400 hover:text-primary-600"
              onClick={() => {
                setWorkspaceOpen(false)
                openCreateWorkspace()
              }}
            >
              <span className="text-lg">+</span> New workspace
            </button>
          </Dropdown>
          <button
            type="button"
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Chat"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <Dropdown
            isOpen={userOpen}
            onClose={() => setUserOpen(false)}
            align="right"
            anchor={
              <button
                type="button"
                onClick={() => setUserOpen(!userOpen)}
                className="flex items-center gap-1 p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                aria-expanded={userOpen}
                aria-haspopup="true"
                aria-label="User menu"
              >
                <User className="w-5 h-5" />
                <ChevronDown className="w-4 h-4" />
              </button>
            }
          >
            <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
              Signed in as {profile.email}
            </div>
            <Link
              to="/settings"
              role="menuitem"
              className="block px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
              onClick={() => setUserOpen(false)}
            >
              Account Settings
            </Link>
            <button
              type="button"
              role="menuitem"
              className="block w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setUserOpen(false)}
            >
              Sign out
            </button>
          </Dropdown>
        </div>
      </div>
      {location.pathname === '/' && (
        <div className="flex items-center justify-between px-4 lg:px-6 py-2 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Gauge className="w-4 h-4 text-primary-500" />
            <span>Dashboard</span>
          </div>
          <a
            href="#help"
            className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700"
          >
            <HelpCircle className="w-4 h-4" />
            How it works
          </a>
        </div>
      )}
    </header>
  )
}
```

---

## src/components/Dropdown.tsx

```tsx
import { useEffect, useRef, type ReactNode } from 'react'

interface DropdownProps {
  isOpen: boolean
  onClose: () => void
  anchor: ReactNode
  children: ReactNode
  align?: 'left' | 'right'
  className?: string
}

export function Dropdown({
  isOpen,
  onClose,
  anchor,
  children,
  align = 'left',
  className = '',
}: DropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {anchor}
      {isOpen && (
        <div
          role="menu"
          className={`absolute top-full left-0 mt-1 z-50 min-w-[220px] py-1 bg-white rounded-lg shadow-lg border border-gray-200 ${align === 'right' ? 'left-auto right-0' : ''}`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
```

---

## src/components/Modal.tsx

```tsx
import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const titleId = `modal-title-${Math.random().toString(36).slice(2)}`

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return
    const focusables = overlayRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusables?.[0] as HTMLElement | undefined
    first?.focus()
  }, [isOpen])

  if (!isOpen) return null

  const content = (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`bg-white rounded-xl shadow-xl max-h-[90vh] flex flex-col w-full max-w-lg ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between shrink-0 px-6 py-4 border-b border-gray-200">
          <h2 id={titleId} className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-auto px-6 py-4">{children}</div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
```

---

## src/components/StatCard.tsx

```tsx
interface StatCardProps {
  label: string
  value: number | string
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}
```

---

## src/components/WorkspaceProgress.tsx

```tsx
import { ChevronDown, ChevronUp } from 'lucide-react'
import { CheckCircle2, CircleDot, Circle } from 'lucide-react'
import type { ModuleItem, ModuleItemStatus } from '../data/mockData'
import { workspaces } from '../data/mockData'
import { getAccordionOpenStates, setAccordionOpenStates } from '../lib/storage'
import { useState, useCallback } from 'react'

function StatusIcon({ status }: { status: ModuleItemStatus }) {
  if (status === 'done')
    return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden />
  if (status === 'in_progress')
    return <CircleDot className="w-4 h-4 text-amber-500 shrink-0" aria-hidden />
  return <Circle className="w-4 h-4 text-gray-300 shrink-0" aria-hidden />
}

function ProgressColumn({ title, items }: { title: string; items: ModuleItem[] }) {
  return (
    <div className="flex-1 min-w-0">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {title}
      </h4>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-2 text-sm text-gray-700">
            <StatusIcon status={item.status} />
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface WorkspaceProgressProps {
  onCreateWorkspace: () => void
}

export function WorkspaceProgress({ onCreateWorkspace }: WorkspaceProgressProps) {
  const [accordionStates, setAccordionStates] = useState<Record<string, boolean>>(() =>
    getAccordionOpenStates()
  )

  const isExpanded = useCallback(
    (id: string) => accordionStates[id] ?? (id === workspaces[0]?.id),
    [accordionStates]
  )

  const toggleExpanded = useCallback(
    (id: string) => {
      const next = { ...accordionStates, [id]: !isExpanded(id) }
      setAccordionStates(next)
      setAccordionOpenStates(next)
    },
    [accordionStates, isExpanded]
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Workspace Progress</h3>
        <button
          type="button"
          onClick={onCreateWorkspace}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 focus:outline-none"
        >
          Create Workspace
        </button>
      </div>
      <ul className="divide-y divide-gray-100">
        {workspaces.map((workspace) => {
          const expanded = isExpanded(workspace.id)
          return (
            <li key={workspace.id}>
              <button
                type="button"
                onClick={() => toggleExpanded(workspace.id)}
                className="flex items-center justify-between w-full px-5 py-4 text-left hover:bg-gray-50 focus:outline-none"
                aria-expanded={expanded}
              >
                <span className="font-medium text-gray-900">{workspace.name}</span>
                {expanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {expanded && (
                <div className="px-5 pb-5 pt-0 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50/50">
                  <ProgressColumn title="Fit" items={workspace.modules.fit} />
                  <ProgressColumn title="Build" items={workspace.modules.build} />
                  <ProgressColumn title="Launch" items={workspace.modules.launch} />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
```

---

## src/components/FeedbackTab.tsx

```tsx
import { useState, useEffect } from 'react'
import { getFeedbackOpen, setFeedbackOpen } from '../lib/storage'
import { MessageSquare, X } from 'lucide-react'

export function FeedbackTab() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsOpen(getFeedbackOpen())
  }, [])

  useEffect(() => {
    if (mounted) setFeedbackOpen(isOpen)
  }, [mounted, isOpen])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 w-10 py-12 bg-primary-700 text-white rounded-l-lg shadow-md hover:bg-primary-800 focus:outline-none flex items-center justify-center"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        aria-label="Open feedback"
      >
        <span className="tracking-widest text-xs font-medium">Feedback</span>
      </button>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Feedback"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary-500" />
                Feedback
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">
                Share your feedback to help us improve the dashboard.
              </p>
              <textarea
                placeholder="Your feedback..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
                >
                  Send feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
```

---

## src/components/GettingStartedModal.tsx

```tsx
import { useState, useEffect } from 'react'
import { Bot, ChevronRight, List } from 'lucide-react'
import { getGettingStartedSteps, setGettingStartedSteps } from '../lib/storage'
import type { GettingStartedStep } from '../types'

interface GettingStartedModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GettingStartedModal({ isOpen, onClose }: GettingStartedModalProps) {
  const [steps, setSteps] = useState<GettingStartedStep[]>(() => getGettingStartedSteps())

  useEffect(() => {
    if (isOpen) setSteps(getGettingStartedSteps())
  }, [isOpen])

  const completedCount = steps.filter((s) => s.completed).length
  const total = steps.length
  const percent = total ? Math.round((completedCount / total) * 100) : 0

  const toggleStep = (id: string) => {
    const next = steps.map((s) =>
      s.id === id ? { ...s, completed: !s.completed } : s
    )
    setSteps(next)
    setGettingStartedSteps(next)
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        aria-hidden
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="getting-started-title"
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-xl flex flex-col"
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
      >
        <div className="flex items-center justify-between shrink-0 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary-500" />
            <h2 id="getting-started-title" className="text-lg font-semibold text-gray-900">
              Getting Started
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>
        <div className="flex-1 overflow-auto px-6 py-4">
          <p className="text-sm text-gray-600 mb-4">
            Welcome! Follow these quick steps to see what's been set up for you and unlock the full
            power of the dashboard including prototype creation.
          </p>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">{percent}% complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
          <ul className="space-y-2">
            {steps
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((step, index) => (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => toggleStep(step.id)}
                    className="flex items-center gap-3 w-full p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-left"
                  >
                    {step.completed ? (
                      <span
                        className="flex w-7 h-7 items-center justify-center rounded-full bg-emerald-500 text-white shrink-0"
                        aria-hidden
                      >
                        ✓
                      </span>
                    ) : (
                      <span
                        className="flex w-7 h-7 items-center justify-center rounded-full bg-gray-200 text-gray-600 text-sm font-medium shrink-0"
                        aria-hidden
                      >
                        {index + 1}
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900">{step.title}</div>
                      <div className="text-sm text-gray-500">{step.description}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export function GettingStartedButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 focus:outline-none"
    >
      <List className="w-5 h-5" />
      <span className="font-medium">Getting Started</span>
    </button>
  )
}
```

---

## src/components/CreateWorkspaceModal.tsx

```tsx
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Modal } from './Modal'

interface CreateWorkspaceModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated?: () => void
}

const initialForm = {
  name: '',
  solution: '',
  industry: '',
  problem: '',
  additionalDetails: '',
}

export function CreateWorkspaceModal({
  isOpen,
  onClose,
  onCreated,
}: CreateWorkspaceModalProps) {
  const [form, setForm] = useState(initialForm)
  const [additionalOpen, setAdditionalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setForm(initialForm)
    onClose()
    onCreated?.()
  }

  const handleClose = () => {
    setForm(initialForm)
    setAdditionalOpen(false)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Workspace"
      className="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <p className="text-sm text-gray-600">
          Your workspace is where all your product ideas, plans, and strategy come together. Give a
          quick overview — our AI will use this to kickstart your product discovery. A few clear
          sentences are enough to get started.
        </p>
        <div>
          <label htmlFor="workspace-name" className="block text-sm font-medium text-gray-700 mb-1">
            What's the name of your product or feature?
          </label>
          <input
            id="workspace-name"
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Enter workspace name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What will you use this workspace for?
          </label>
          <p className="text-xs text-gray-500 mb-2">
            This product overview will be used to run an initial product discovery.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-600">We're building</span>
              <input
                type="text"
                value={form.solution}
                onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))}
                placeholder="Solution"
                className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-600">in the</span>
              <input
                type="text"
                value={form.industry}
                onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                placeholder="Industry"
                className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="text-gray-600">industry,</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-600">because</span>
              <input
                type="text"
                value={form.problem}
                onChange={(e) => setForm((f) => ({ ...f, problem: e.target.value }))}
                placeholder="Problem"
                className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Example: We're building a 2-sided marketplace to match drivers with passengers in the
            transportation industry because taxis are expensive and hard to find.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setAdditionalOpen((o) => !o)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Additional Details (Optional)
            <ChevronDown
              className={`w-4 h-4 transition-transform ${additionalOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {additionalOpen && (
            <textarea
              value={form.additionalDetails}
              onChange={(e) => setForm((f) => ({ ...f, additionalDetails: e.target.value }))}
              placeholder="Any other context..."
              rows={3}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          )}
        </div>
        <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
          >
            Create Workspace
          </button>
        </div>
      </form>
    </Modal>
  )
}
```

---

## src/pages/AccountSettings.tsx

```tsx
import { useState } from 'react'
import { Header } from '../components/Header'
import { FeedbackTab } from '../components/FeedbackTab'
import { getUserProfile, setUserProfile } from '../lib/storage'
import { Pencil, Hexagon } from 'lucide-react'

const tabs = [
  { id: 'profile', label: 'My Profile' },
  { id: 'company', label: 'Company' },
  { id: 'workspaces', label: 'Workspaces' },
  { id: 'billing', label: 'Billing' },
  { id: 'integrations', label: 'Integrations' },
]

export function AccountSettings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfileState] = useState(getUserProfile())
  const [editingProfile, setEditingProfile] = useState(false)
  const [editingEmail, setEditingEmail] = useState(false)
  const [editingPassword, setEditingPassword] = useState(false)

  const setProfile = (next: typeof profile) => {
    setProfileState(next)
    setUserProfile(next)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 lg:px-6 py-8 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-1">
          <Hexagon className="w-8 h-8 text-primary-500" />
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        </div>
        <p className="text-gray-500 text-sm mb-6">Settings for your account</p>
        <div
          className="flex flex-wrap gap-2 mb-6"
          role="tablist"
          aria-label="Settings sections"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">My Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Profile</h3>
                  <button
                    type="button"
                    onClick={() => setEditingProfile(!editingProfile)}
                    className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      First Name
                    </label>
                    {editingProfile ? (
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) =>
                          setProfile({ ...profile, firstName: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Last Name
                    </label>
                    {editingProfile ? (
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) =>
                          setProfile({ ...profile, lastName: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Phone
                    </label>
                    {editingProfile ? (
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.phone || '—'}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Security</h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Email
                      </label>
                      {editingEmail ? (
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      ) : (
                        <p className="text-gray-900 truncate">{profile.email}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingEmail(!editingEmail)}
                      className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 shrink-0"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Password
                      </label>
                      <p className="text-gray-900">{profile.passwordMask}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingPassword(!editingPassword)}
                      className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 shrink-0"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab !== 'profile' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center text-gray-500">
            <p>{tabs.find((t) => t.id === activeTab)?.label} settings coming soon.</p>
          </div>
        )}
      </main>
      <FeedbackTab />
    </div>
  )
}
```

---

## public/vite.svg

Use the default Vite logo SVG from [vitejs.dev](https://vitejs.dev) or any small SVG favicon; the app runs without it.
