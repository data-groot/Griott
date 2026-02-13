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
