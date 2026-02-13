import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { createDefaultWorkspace } from '../data/mockData'
import type { Workspace } from '../data/mockData'
import { Modal } from './Modal'

interface CreateWorkspaceModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated?: () => void
  addWorkspace: (workspace: Workspace) => void
}

const initialForm = {
  name: '',
  solution: '',
  industry: '',
  problem: '',
  additionalDetails: '',
}

function buildSummary(solution: string, industry: string, problem: string): string {
  const parts = [
    solution || 'a solution',
    industry ? `in the ${industry} industry` : '',
    problem ? `because ${problem}` : '',
  ].filter(Boolean)
  if (parts.length === 0) return ''
  return "We're building " + parts.join(', ') + (parts.length > 1 ? '.' : '...')
}

export function CreateWorkspaceModal({
  isOpen,
  onClose,
  onCreated,
  addWorkspace,
}: CreateWorkspaceModalProps) {
  const [form, setForm] = useState(initialForm)
  const [additionalOpen, setAdditionalOpen] = useState(false)
  const [nameError, setNameError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = form.name.trim()
    if (!trimmedName) {
      setNameError('Workspace name is required')
      return
    }
    setNameError('')
    const id = `created-${Date.now()}`
    const summary =
      buildSummary(form.solution, form.industry, form.problem) ||
      `Workspace ${trimmedName}`
    const workspace = createDefaultWorkspace(id, trimmedName, summary)
    addWorkspace(workspace)
    setForm(initialForm)
    setAdditionalOpen(false)
    onClose()
    onCreated?.()
  }

  const handleClose = () => {
    setForm(initialForm)
    setAdditionalOpen(false)
    setNameError('')
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
          quick overview. Our AI will use this to kickstart your product discovery. A few clear
          sentences are enough to get started.
        </p>
        <div>
          <label htmlFor="workspace-name" className="block text-sm font-medium text-gray-700 mb-1">
            What is the name of your product or feature? <span className="text-red-500">*</span>
          </label>
          <input
            id="workspace-name"
            type="text"
            value={form.name}
            onChange={(e) => {
              setForm((f) => ({ ...f, name: e.target.value }))
              if (nameError) setNameError('')
            }}
            placeholder="Enter workspace name"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
              nameError ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={!!nameError}
            aria-describedby={nameError ? 'workspace-name-error' : undefined}
          />
          {nameError && (
            <p id="workspace-name-error" className="mt-1 text-sm text-red-600" role="alert">
              {nameError}
            </p>
          )}
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
              <span className="text-gray-600">We are building</span>
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
            Example: We are building a 2-sided marketplace to match drivers with passengers in the
            transportation industry because taxis are expensive and hard to find.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setAdditionalOpen((o) => !o)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            aria-expanded={additionalOpen}
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
