import { useDashboard } from '../contexts/DashboardContext'
import { user } from '../data/mockData'
import { useWorkspaces } from '../contexts/WorkspacesContext'
import { Header } from '../components/Header'
import { StatCard } from '../components/StatCard'
import { WorkspaceProgress } from '../components/WorkspaceProgress'
import { GettingStartedButton } from '../components/GettingStartedModal'
import { FeedbackTab } from '../components/FeedbackTab'

export function Dashboard() {
  const { openCreateWorkspace, openGettingStarted } = useDashboard()
  const { workspaces } = useWorkspaces()

  const totalInitiatives = workspaces.reduce((acc, w) => acc + w.counts.initiatives, 0)

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-display font-bold text-gray-900">Welcome, {user.username}!</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            <aside className="lg:col-span-1 flex flex-col gap-4 sm:gap-5 min-w-0" aria-label="Summary stats">
              <StatCard label="Workspaces" value={workspaces.length} />
              <StatCard label="Users" value={1} />
              <StatCard label="Initiatives" value={totalInitiatives} />
            </aside>
            <div className="lg:col-span-2 min-w-0">
              <WorkspaceProgress onCreateWorkspace={openCreateWorkspace} />
            </div>
          </div>
        </div>
      </main>
      <GettingStartedButton onClick={openGettingStarted} />
      <FeedbackTab />
    </div>
  )
}
