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
