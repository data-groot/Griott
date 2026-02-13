import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Workspace } from '../data/mockData'
import {
  getWorkspaces,
  getCreatedWorkspaces,
  setCreatedWorkspaces,
  setSelectedWorkspaceId,
  getAccordionOpenStates,
  setAccordionOpenStates,
} from '../lib/storage'

interface WorkspacesContextValue {
  workspaces: Workspace[]
  refreshWorkspaces: () => void
  /** Add a workspace, persist to localStorage, and set it as selected */
  addWorkspace: (workspace: Workspace) => void
}

const WorkspacesContext = createContext<WorkspacesContextValue | null>(null)

export function WorkspacesProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => getWorkspaces())

  const refreshWorkspaces = useCallback(() => {
    setWorkspaces(getWorkspaces())
  }, [])

  const addWorkspace = useCallback((workspace: Workspace) => {
    const created = getCreatedWorkspaces()
    setCreatedWorkspaces([...created, workspace])
    setSelectedWorkspaceId(workspace.id)
    setAccordionOpenStates({ ...getAccordionOpenStates(), [workspace.id]: true })
    setWorkspaces(getWorkspaces())
  }, [])

  return (
    <WorkspacesContext.Provider
      value={{ workspaces, refreshWorkspaces, addWorkspace }}
    >
      {children}
    </WorkspacesContext.Provider>
  )
}

export function useWorkspaces() {
  const ctx = useContext(WorkspacesContext)
  if (!ctx) throw new Error('useWorkspaces must be used within WorkspacesProvider')
  return ctx
}
