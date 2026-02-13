import { useState, useEffect } from 'react'
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
  Plus,
  Menu,
  X,
} from 'lucide-react'
import { Dropdown } from './Dropdown'
import { useDashboard } from '../contexts/DashboardContext'
import { useWorkspaces } from '../contexts/WorkspacesContext'
import { getSelectedWorkspaceId, setSelectedWorkspaceId, getUserProfile, clearStorageForSignOut } from '../lib/storage'

const navItems = [
  {
    key: 'fit',
    label: 'Fit',
    items: [
      { path: 'canvas', icon: Lightbulb, title: 'Canvas', desc: 'FIT > Build > Launch Canvas' },
      { path: 'problem-map', icon: GitBranch, title: 'Problem Map', desc: 'Map the Problem-Opportunity Space' },
      { path: 'story-map', icon: LayoutGrid, title: 'Story Map', desc: 'Visualize and organize Initiatives into Epics and User Stories' },
      { path: 'goals-metrics', icon: Flag, title: 'Goals & Metrics', desc: 'Key Product Goals and Results' },
    ],
  },
  {
    key: 'build',
    label: 'Build',
    items: [
      { path: 'product-strategy', icon: Settings, title: 'Product Strategy', desc: 'Theme based Product Strategy' },
      { path: 'planning-board', icon: ClipboardList, title: 'Planning Board', desc: 'Product Planning Board' },
      { path: 'initiative-board', icon: Puzzle, title: 'Initiative Board', desc: 'Product Initiative Board' },
      { path: 'roadmap', icon: Map, title: 'Roadmap', desc: 'Visual Timeline for your Product' },
    ],
  },
  {
    key: 'launch',
    label: 'Launch',
    items: [
      { path: 'launch-plan', icon: Rocket, title: 'Launch Plan', desc: 'Checklist and Plan for launching your Product' },
      { path: 'growth-plan', icon: TrendingUp, title: 'Growth Plan', desc: 'Checklist and Plan for growing Users' },
      { path: 'ideas-feedback', icon: MessageSquare, title: 'Ideas & Feedback', desc: 'Capture and plan for ideas and feedback' },
    ],
  },
]

export function Header() {
  const location = useLocation()
  const { openCreateWorkspace } = useDashboard()
  const { workspaces } = useWorkspaces()
  const currentId = getSelectedWorkspaceId()
  const currentWorkspace = workspaces.find((w) => w.id === currentId) ?? workspaces[0]
  const profile = getUserProfile()
  const [openNav, setOpenNav] = useState<string | null>(null)
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    if (!drawerOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-900 font-semibold hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
          >
            <Gauge className="w-5 h-5 text-primary-600" />
            <span>Griot</span>
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
                {items.map(({ path, icon: Icon, title, desc }) => (
                  <Link
                    key={path}
                    to={`/${key}/${path}`}
                    role="menuitem"
                    className="flex items-start gap-3 w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 rounded-md"
                    onClick={() => setOpenNav(null)}
                  >
                    <Icon className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">{title}</div>
                      <div className="text-xs text-gray-500">{desc}</div>
                    </div>
                  </Link>
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
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/how-it-works"
            className="hidden sm:inline-flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <HelpCircle className="w-4 h-4" />
            How it works
          </Link>
          <Dropdown
            isOpen={workspaceOpen}
            onClose={() => setWorkspaceOpen(false)}
            align="right"
            contentClassName="min-w-[300px] p-2"
            anchor={
              <button
                type="button"
                onClick={() => setWorkspaceOpen(!workspaceOpen)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 border border-transparent hover:border-gray-200 aria-expanded:border-gray-300 aria-expanded:bg-gray-50"
                aria-expanded={workspaceOpen}
                aria-haspopup="true"
                aria-label="Select workspace"
              >
                <span className="max-w-[140px] sm:max-w-[200px] truncate">{currentWorkspace?.name ?? 'Workspace'}</span>
                <ChevronDown className="w-4 h-4 shrink-0" />
              </button>
            }
          >
            <div className="px-2 py-1.5">
              <span className="text-sm font-semibold text-gray-900">Workspaces</span>
            </div>
            <div className="space-y-1">
              {workspaces.map((w) => {
                const isSelected = w.id === currentId
                return (
                  <button
                    key={w.id}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setSelectedWorkspaceId(w.id)
                      setWorkspaceOpen(false)
                    }}
                    className={`flex flex-col items-start w-full px-3 py-2.5 rounded-md text-left transition-colors ${
                      isSelected
                        ? 'bg-primary-50 text-primary-900'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-semibold text-sm">{w.name}</span>
                    {w.summary && (
                      <span className={`text-xs mt-0.5 block w-full truncate ${isSelected ? 'text-primary-600' : 'text-gray-500'}`}>
                        {w.summary}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                role="menuitem"
                className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-colors"
                onClick={() => {
                  setWorkspaceOpen(false)
                  openCreateWorkspace()
                }}
              >
                <Plus className="w-4 h-4" />
                New workspace
              </button>
            </div>
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
            contentClassName="min-w-[220px] py-1"
            anchor={
              <button
                type="button"
                onClick={() => setUserOpen(!userOpen)}
                className="flex items-center gap-1 p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none"
                aria-expanded={userOpen}
                aria-haspopup="true"
                aria-label="User menu"
              >
                <User className="w-5 h-5" />
                <ChevronDown className="w-4 h-4" />
              </button>
            }
          >
            <div className="px-4 py-2.5 text-sm text-gray-500 border-b border-gray-100">
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
              onClick={() => {
                setUserOpen(false)
                clearStorageForSignOut()
                window.location.href = '/'
              }}
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
          <Link
            to="/how-it-works"
            className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            <HelpCircle className="w-4 h-4" />
            How it works
          </Link>
        </div>
      )}

      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            aria-hidden
            onClick={() => setDrawerOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-dropdown md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-4 h-14 border-b border-gray-200">
              <span className="font-semibold text-gray-900">Menu</span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1" aria-label="Main">
              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-900 font-medium hover:bg-gray-100"
                onClick={() => setDrawerOpen(false)}
              >
                <Gauge className="w-5 h-5 text-primary-500" />
                Dashboard
              </Link>
              {navItems.map(({ key, label, items }) => (
                <div key={key} className="pt-2">
                  <p className="px-3 text-caption font-semibold uppercase tracking-wider text-gray-500">{label}</p>
                  {items.map(({ path, icon: Icon, title }) => (
                    <Link
                      key={path}
                      to={`/${key}/${path}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <Icon className="w-5 h-5 text-primary-500 shrink-0" />
                      {title}
                    </Link>
                  ))}
                </div>
              ))}
              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100"
                onClick={() => setDrawerOpen(false)}
              >
                Files
              </Link>
              <div className="border-t border-gray-100 pt-2 mt-2">
                <Link
                  to="/how-it-works"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary-600 font-medium hover:bg-primary-50"
                  onClick={() => setDrawerOpen(false)}
                >
                  <HelpCircle className="w-5 h-5 shrink-0" />
                  How it works
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
