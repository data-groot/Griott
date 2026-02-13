import { useState, useEffect } from 'react'
import { Bot, ChevronRight, List, X } from 'lucide-react'
import { getGettingStartedSteps, setGettingStartedSteps } from '../lib/storage'
import type { GettingStartedStep } from '../types'

interface GettingStartedModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GettingStartedModal({ isOpen, onClose }: GettingStartedModalProps) {
  const [steps, setSteps] = useState<GettingStartedStep[]>(() => getGettingStartedSteps())

  useEffect(() => {
    if (isOpen) setSteps(getGettingStartedSteps())
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const completedCount = steps.filter((s) => s.completed).length
  const total = steps.length
  const percent = total ? Math.round((completedCount / total) * 100) : 0

  const toggleStep = (id: string) => {
    const next = steps.map((s) =>
      s.id === id ? { ...s, completed: !s.completed } : s
    )
    setSteps(next)
    setGettingStartedSteps(next)
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        aria-hidden
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="getting-started-title"
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col rounded-l-xl border border-gray-200 border-r-0"
      >
        <div className="flex items-center justify-between shrink-0 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary-500 shrink-0" />
            <h2 id="getting-started-title" className="text-lg font-semibold text-gray-900">
              Getting Started
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-4 min-h-0">
          <p className="text-sm text-gray-600 mb-4">
            Welcome! Follow these quick steps to see what's been set up for you and unlock the full
            power of the dashboard including prototype creation.
          </p>
          <div className="mb-5">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-medium text-gray-700">{percent}% complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
          <ul className="space-y-2">
            {steps
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((step, index) => (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => toggleStep(step.id)}
                    className="flex items-center gap-3 w-full p-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-left transition-colors"
                  >
                    {step.completed ? (
                      <span
                        className="flex w-8 h-8 items-center justify-center rounded-full bg-emerald-500 text-white shrink-0"
                        aria-hidden
                      >
                        ✓
                      </span>
                    ) : (
                      <span
                        className="flex w-8 h-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 text-sm font-medium shrink-0"
                        aria-hidden
                      >
                        {index + 1}
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900">{step.title}</div>
                      <div className="text-sm text-gray-500 mt-0.5">{step.description}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" aria-hidden />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export function GettingStartedButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 focus:outline-none"
    >
      <List className="w-5 h-5" />
      <span className="font-medium">Getting Started</span>
    </button>
  )
}
