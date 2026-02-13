import type { GettingStartedStep } from '../types'
import type { Workspace } from '../data/mockData'
import { user, workspaces as defaultWorkspaces } from '../data/mockData'

const STORAGE_KEYS = {
  selectedWorkspaceId: 'pm-dashboard-selected-workspace-id',
  accordionOpenStates: 'pm-dashboard-accordion-open-states',
  createdWorkspaces: 'pm-dashboard-created-workspaces',
  userProfile: 'pm-dashboard-user-profile',
  gettingStartedSteps: 'pm-dashboard-getting-started-steps',
  feedbackOpen: 'pm-dashboard-feedback-open',
} as const

/** Persisted: selected workspace id (default first workspace) */
export function getSelectedWorkspaceId(): string {
  return getItem(STORAGE_KEYS.selectedWorkspaceId, '1')
}

export function setSelectedWorkspaceId(id: string): void {
  setItem(STORAGE_KEYS.selectedWorkspaceId, id)
}

/** Persisted: which workspace accordion sections are open. Key = workspace id, value = boolean */
export type AccordionOpenStates = Record<string, boolean>

export function getAccordionOpenStates(): AccordionOpenStates {
  return getItem(STORAGE_KEYS.accordionOpenStates, { '1': true })
}

export function setAccordionOpenStates(states: AccordionOpenStates): void {
  setItem(STORAGE_KEYS.accordionOpenStates, states)
}

/** User-created workspaces (persisted). Seed workspaces come from mockData. */
export function getCreatedWorkspaces(): Workspace[] {
  return getItem(STORAGE_KEYS.createdWorkspaces, [])
}

export function setCreatedWorkspaces(workspaces: Workspace[]): void {
  setItem(STORAGE_KEYS.createdWorkspaces, workspaces)
}

/** All workspaces: seed (mockData) + user-created, in order */
export function getWorkspaces(): Workspace[] {
  return [...defaultWorkspaces, ...getCreatedWorkspaces()]
}

/** Profile for Account Settings (derived from mockData.user with overrides) */
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

/** Sign out: clear all dashboard localStorage so app resets to default mock data (no real auth) */
export function clearStorageForSignOut(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key))
  } catch {
    // ignore
  }
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
