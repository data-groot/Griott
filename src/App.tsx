import { Routes, Route } from 'react-router-dom'
import { DashboardProvider, useDashboard } from './contexts/DashboardContext'
import { WorkspacesProvider, useWorkspaces } from './contexts/WorkspacesContext'
import { Dashboard } from './pages/Dashboard'
import { AccountSettings } from './pages/AccountSettings'
import { SectionPage } from './pages/SectionPage'
import { HowItWorks } from './pages/HowItWorks'
import { CreateWorkspaceModal } from './components/CreateWorkspaceModal'
import { GettingStartedModal } from './components/GettingStartedModal'

function AppModals() {
  const {
    isCreateWorkspaceOpen,
    setOpenCreateWorkspace,
    isGettingStartedOpen,
    setOpenGettingStarted,
  } = useDashboard()
  const { addWorkspace, refreshWorkspaces } = useWorkspaces()
  return (
    <>
      <CreateWorkspaceModal
        isOpen={isCreateWorkspaceOpen}
        onClose={() => setOpenCreateWorkspace(false)}
        onCreated={refreshWorkspaces}
        addWorkspace={addWorkspace}
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
      <WorkspacesProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<AccountSettings />} />
          <Route path="/fit/:page" element={<SectionPage />} />
          <Route path="/build/:page" element={<SectionPage />} />
          <Route path="/launch/:page" element={<SectionPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
        <AppModals />
      </WorkspacesProvider>
    </DashboardProvider>
  )
}
