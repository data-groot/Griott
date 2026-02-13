import { useState } from 'react'
import { ChevronDown, ChevronUp, CheckCircle2, CircleDot, Circle, Plus } from 'lucide-react'
import type { ModuleItem, ModuleItemStatus } from '../data/mockData'
import { getAccordionOpenStates, setAccordionOpenStates } from '../lib/storage'
import { useWorkspaces } from '../contexts/WorkspacesContext'

function StatusIcon({ status }: { status: ModuleItemStatus }) {
  if (status === 'done')
    return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden />
  if (status === 'in_progress')
    return <CircleDot className="w-4 h-4 text-amber-500 shrink-0" aria-hidden />
  return <Circle className="w-4 h-4 text-gray-300 shrink-0" aria-hidden />
}

function ModuleColumn({ title, items }: { title: string; items: ModuleItem[] }) {
  return (
    <div>
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
  const { workspaces } = useWorkspaces()
  const [openStates, setOpenStates] = useState<Record<string, boolean>>(getAccordionOpenStates)
  const persistStates = (next: Record<string, boolean>) => {
    setOpenStates(next)
    setAccordionOpenStates(next)
  }

  const toggle = (id: string) => {
    const next = { ...openStates, [id]: !openStates[id] }
    persistStates(next)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100">
        <h3 className="text-title font-semibold text-gray-900">Workspace Progress</h3>
        <button
          type="button"
          onClick={onCreateWorkspace}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Workspace
        </button>
      </div>
      <ul className="divide-y divide-gray-100">
        {workspaces.map((workspace) => {
          const expanded = openStates[workspace.id] ?? true
          return (
            <li key={workspace.id}>
              <button
                type="button"
                onClick={() => toggle(workspace.id)}
                className="flex items-center justify-between w-full px-5 sm:px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50/80 transition-colors duration-150"
                aria-expanded={expanded}
              >
                <span className="font-medium text-gray-900">{workspace.name}</span>
                {expanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>
              <div
                className={`accordion-grid ${expanded ? 'expanded' : 'collapsed'}`}
                aria-hidden={!expanded}
              >
                <div className="accordion-inner">
                  <div className="px-5 sm:px-6 pb-5 pt-0 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50/50">
                    <ModuleColumn title="Fit" items={workspace.modules?.fit ?? []} />
                    <ModuleColumn title="Build" items={workspace.modules?.build ?? []} />
                    <ModuleColumn title="Launch" items={workspace.modules?.launch ?? []} />
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
