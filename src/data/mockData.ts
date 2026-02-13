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

/** Default module item arrays for new workspaces (cloned per workspace) */
function getDefaultModules(): WorkspaceModules {
  return {
    fit: [...fitModuleItems],
    build: [...buildModuleItems],
    launch: [...launchModuleItems],
  }
}

/** Create a new workspace with default Fit/Build/Launch modules */
export function createDefaultWorkspace(
  id: string,
  name: string,
  summary: string
): Workspace {
  return {
    id,
    name,
    summary,
    progressPercent: 0,
    modules: getDefaultModules(),
    counts: { initiatives: 0 },
  }
}

export const workspaces: Workspace[] = [
  {
    id: '1',
    name: 'Agentum-Framework',
    summary: "We're building a python product that quickly...",
    progressPercent: 42,
    modules: getDefaultModules(),
    counts: { initiatives: 24 },
  },
  {
    id: '2',
    name: 'Dyson Sphere Inc',
    summary: "We're building a scalable space energy infra...",
    progressPercent: 18,
    modules: getDefaultModules(),
    counts: { initiatives: 12 },
  },
  {
    id: '3',
    name: 'Project Lumina',
    summary: "We're building an ambient context engine in t...",
    progressPercent: 8,
    modules: getDefaultModules(),
    counts: { initiatives: 15 },
  },
]
